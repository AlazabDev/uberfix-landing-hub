import { useState } from "react";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  label: string;
  files: File[];
  onChange: (files: File[]) => void;
}

export default function PhotoUploader({ label, files, onChange }: Props) {
  const [previews, setPreviews] = useState<string[]>([]);

  const add = (list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list).filter((f) => f.type.startsWith("image/") && f.size < 15 * 1024 * 1024);
    const newFiles = [...files, ...arr].slice(0, 8);
    onChange(newFiles);
    setPreviews(newFiles.map((f) => URL.createObjectURL(f)));
  };

  const remove = (idx: number) => {
    const next = files.filter((_, i) => i !== idx);
    onChange(next);
    setPreviews(next.map((f) => URL.createObjectURL(f)));
  };

  return (
    <div className="space-y-2">
      <label className="font-semibold text-sm">{label}</label>
      <div className="flex flex-wrap gap-2">
        {previews.map((src, i) => (
          <div key={i} className="relative">
            <img src={src} alt="" className="h-20 w-20 object-cover rounded-md border" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute -top-2 -left-2 bg-destructive text-destructive-foreground rounded-full p-1"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <label className="h-20 w-20 border-2 border-dashed border-border rounded-md flex items-center justify-center cursor-pointer hover:bg-accent">
          <Camera className="h-5 w-5" />
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => add(e.target.files)}
          />
        </label>
      </div>
    </div>
  );
}
