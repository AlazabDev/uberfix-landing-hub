
-- Chat conversations table
CREATE TABLE public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  language TEXT DEFAULT 'ar',
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Chat messages table
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'bot')),
  content TEXT NOT NULL DEFAULT '',
  message_type TEXT DEFAULT 'text',
  file_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow public insert and select (no auth required for chatbot)
CREATE POLICY "Allow public insert conversations" ON public.chat_conversations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public select conversations" ON public.chat_conversations FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public update conversations" ON public.chat_conversations FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow public insert messages" ON public.chat_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public select messages" ON public.chat_messages FOR SELECT TO anon USING (true);

-- Index for faster queries
CREATE INDEX idx_chat_messages_conversation ON public.chat_messages(conversation_id);
CREATE INDEX idx_chat_conversations_session ON public.chat_conversations(session_id);
