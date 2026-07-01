
-- =========================================================================
-- Lock down chat_conversations & chat_messages
-- Frontend only INSERTs (via new SECURITY DEFINER RPCs); no direct SELECT/UPDATE.
-- =========================================================================

DROP POLICY IF EXISTS "Allow public insert conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Allow public select conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Allow public update conversations" ON public.chat_conversations;

DROP POLICY IF EXISTS "Allow public insert messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Allow public select messages" ON public.chat_messages;

-- Revoke direct table access from anon/authenticated. Only service_role &
-- SECURITY DEFINER functions can touch these tables now.
REVOKE ALL ON public.chat_conversations FROM anon, authenticated;
REVOKE ALL ON public.chat_messages FROM anon, authenticated;
GRANT ALL ON public.chat_conversations TO service_role;
GRANT ALL ON public.chat_messages TO service_role;

-- Keep RLS enabled; with no policies, direct client access is fully denied.
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Trigger to auto-update conversation timestamp when messages are inserted,
-- so the client no longer needs UPDATE privileges.
CREATE OR REPLACE FUNCTION public.touch_chat_conversation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.chat_conversations
     SET updated_at = now()
   WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_touch_chat_conversation ON public.chat_messages;
CREATE TRIGGER trg_touch_chat_conversation
AFTER INSERT ON public.chat_messages
FOR EACH ROW EXECUTE FUNCTION public.touch_chat_conversation();

-- Public RPC: create a conversation and return its id. Validates inputs.
CREATE OR REPLACE FUNCTION public.create_chat_conversation(
  p_session_id text,
  p_language text
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  IF p_session_id IS NULL OR length(p_session_id) < 8 OR length(p_session_id) > 128 THEN
    RAISE EXCEPTION 'invalid session_id';
  END IF;
  IF p_language IS NULL OR p_language NOT IN ('ar','en') THEN
    p_language := 'ar';
  END IF;

  INSERT INTO public.chat_conversations (session_id, language)
  VALUES (p_session_id, p_language)
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

-- Public RPC: insert a message into a conversation. Enforces sane limits.
CREATE OR REPLACE FUNCTION public.insert_chat_message(
  p_conversation_id uuid,
  p_role text,
  p_content text,
  p_message_type text DEFAULT 'text',
  p_file_name text DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_conversation_id IS NULL THEN
    RAISE EXCEPTION 'conversation_id required';
  END IF;
  IF p_role NOT IN ('user','bot','system') THEN
    RAISE EXCEPTION 'invalid role';
  END IF;
  IF p_content IS NULL OR length(p_content) = 0 OR length(p_content) > 8000 THEN
    RAISE EXCEPTION 'invalid content length';
  END IF;
  IF p_message_type NOT IN ('text','image','audio','file','camera') THEN
    p_message_type := 'text';
  END IF;
  IF p_file_name IS NOT NULL AND length(p_file_name) > 255 THEN
    p_file_name := left(p_file_name, 255);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.chat_conversations WHERE id = p_conversation_id) THEN
    RAISE EXCEPTION 'conversation not found';
  END IF;

  INSERT INTO public.chat_messages (conversation_id, role, content, message_type, file_name)
  VALUES (p_conversation_id, p_role, p_content, p_message_type, p_file_name);
END;
$$;

-- Restrict function execution: anon and authenticated may call these RPCs.
REVOKE ALL ON FUNCTION public.create_chat_conversation(text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.insert_chat_message(uuid, text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_chat_conversation(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.insert_chat_message(uuid, text, text, text, text) TO anon, authenticated;

-- =========================================================================
-- Storage: add RLS policies on storage.objects for the public 'uberfix-bk' bucket.
-- Reads are public (bucket is public); writes/deletes are blocked for anon
-- and authenticated (only service_role can mutate).
-- =========================================================================

DROP POLICY IF EXISTS "uberfix-bk public read" ON storage.objects;
DROP POLICY IF EXISTS "uberfix-bk service write" ON storage.objects;

CREATE POLICY "uberfix-bk public read"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'uberfix-bk');

-- No INSERT/UPDATE/DELETE policies for anon or authenticated => blocked by RLS.
-- service_role bypasses RLS.
