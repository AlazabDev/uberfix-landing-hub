import { useEffect, useRef, useState } from "react";
import { Mic, Square, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onReady: (blob: Blob, durationSec: number) => void;
}

export default function VoiceRecorder({ onReady }: Props) {
  const [recording, setRecording] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const durationRef = useRef(0);

  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    if (timerRef.current) window.clearInterval(timerRef.current);
  }, [url]);

  const start = async () => {
    setError(null);
    setBlob(null);
    setUrl(null);
    setSeconds(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4";
      const rec = new MediaRecorder(stream, { mimeType: mime });
      chunksRef.current = [];
      rec.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data);
      rec.onstop = () => {
        const b = new Blob(chunksRef.current, { type: mime });
        setBlob(b);
        setUrl(URL.createObjectURL(b));
        onReady(b, durationRef.current);
        streamRef.current?.getTracks().forEach((t) => t.stop());
      };
      rec.start();
      mediaRef.current = rec;
      setRecording(true);
      const startTs = Date.now();
      timerRef.current = window.setInterval(() => {
        const s = Math.floor((Date.now() - startTs) / 1000);
        durationRef.current = s;
        setSeconds(s);
      }, 250);
    } catch (e) {
      setError("لا يمكن الوصول للميكروفون. تحقق من الصلاحيات.");
    }
  };

  const stop = () => {
    mediaRef.current?.stop();
    if (timerRef.current) window.clearInterval(timerRef.current);
    setRecording(false);
  };

  const reset = () => {
    if (url) URL.revokeObjectURL(url);
    setBlob(null);
    setUrl(null);
    setSeconds(0);
    setPlaying(false);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="rounded-xl border border-border p-4 space-y-3 bg-card">
      <div className="flex items-center justify-between">
        <span className="font-semibold">التسجيل الصوتي</span>
        <span className="tabular-nums text-lg font-mono">{fmt(seconds)}</span>
      </div>
      {error && <div className="text-destructive text-sm">{error}</div>}
      <div className="flex flex-wrap gap-2">
        {!recording && !blob && (
          <Button type="button" onClick={start} className="gap-2">
            <Mic className="h-4 w-4" /> ابدأ التسجيل
          </Button>
        )}
        {recording && (
          <Button type="button" onClick={stop} variant="destructive" className="gap-2">
            <Square className="h-4 w-4" /> إيقاف
          </Button>
        )}
        {blob && !recording && (
          <>
            <Button type="button" onClick={togglePlay} variant="secondary" className="gap-2">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {playing ? "إيقاف مؤقت" : "تشغيل"}
            </Button>
            <Button type="button" onClick={reset} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" /> إعادة التسجيل
            </Button>
          </>
        )}
      </div>
      {url && (
        <audio
          ref={audioRef}
          src={url}
          onEnded={() => setPlaying(false)}
          className="w-full"
          controls
        />
      )}
    </div>
  );
}
