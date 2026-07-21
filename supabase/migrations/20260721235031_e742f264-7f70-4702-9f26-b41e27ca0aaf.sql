
CREATE TYPE public.voice_report_status AS ENUM (
  'voice_report_received','transcription_pending','transcription_ready',
  'technician_confirmed','awaiting_branch_approval','approved',
  'approved_with_notes','rejected','expired','superseded'
);
CREATE TYPE public.branch_decision AS ENUM ('approved','approved_with_notes','rejected');
CREATE TYPE public.report_media_kind AS ENUM ('audio','before','after','location');
CREATE TYPE public.email_match_result AS ENUM ('matched','mismatched','unknown');
CREATE TYPE public.email_delivery_status AS ENUM ('pending','sent','failed','configuration_required');

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  official_email TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.branches TO service_role;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_branches_updated_at BEFORE UPDATE ON public.branches
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.maintenance_voice_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_number TEXT NOT NULL,
  technician_name TEXT NOT NULL,
  technician_phone TEXT NOT NULL,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  status public.voice_report_status NOT NULL DEFAULT 'voice_report_received',
  audio_path TEXT,
  audio_duration_sec INTEGER,
  transcript_raw TEXT,
  structured_data JSONB,
  manual_summary TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  technician_confirmed_at TIMESTAMPTZ,
  content_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_voice_reports_request_number ON public.maintenance_voice_reports(request_number);
CREATE INDEX idx_voice_reports_status ON public.maintenance_voice_reports(status);
CREATE INDEX idx_voice_reports_created ON public.maintenance_voice_reports(created_at DESC);
GRANT ALL ON public.maintenance_voice_reports TO service_role;
ALTER TABLE public.maintenance_voice_reports ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_voice_reports_updated_at BEFORE UPDATE ON public.maintenance_voice_reports
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.maintenance_report_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.maintenance_voice_reports(id) ON DELETE CASCADE,
  kind public.report_media_kind NOT NULL,
  storage_path TEXT NOT NULL,
  mime TEXT,
  size_bytes INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_report_media_report ON public.maintenance_report_media(report_id);
GRANT ALL ON public.maintenance_report_media TO service_role;
ALTER TABLE public.maintenance_report_media ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.branch_approval_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.maintenance_voice_reports(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  email_delivery_status public.email_delivery_status NOT NULL DEFAULT 'pending',
  email_sent_at TIMESTAMPTZ,
  email_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_approval_requests_report ON public.branch_approval_requests(report_id);
CREATE INDEX idx_approval_requests_hash ON public.branch_approval_requests(token_hash);
GRANT ALL ON public.branch_approval_requests TO service_role;
ALTER TABLE public.branch_approval_requests ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.branch_approval_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  approval_request_id UUID NOT NULL REFERENCES public.branch_approval_requests(id) ON DELETE CASCADE,
  decision public.branch_decision NOT NULL,
  approver_name TEXT NOT NULL,
  approver_email TEXT NOT NULL,
  email_match public.email_match_result NOT NULL DEFAULT 'unknown',
  notes TEXT,
  ip TEXT,
  user_agent TEXT,
  content_hash_at_decision TEXT NOT NULL,
  decided_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_approval_decisions_req ON public.branch_approval_decisions(approval_request_id);
GRANT ALL ON public.branch_approval_decisions TO service_role;
ALTER TABLE public.branch_approval_decisions ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.maintenance_audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.maintenance_voice_reports(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  actor TEXT,
  payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_audit_events_report ON public.maintenance_audit_events(report_id, created_at DESC);
GRANT ALL ON public.maintenance_audit_events TO service_role;
ALTER TABLE public.maintenance_audit_events ENABLE ROW LEVEL SECURITY;
