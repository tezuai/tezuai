
import { useState } from "react";
import { Palette, CheckCircle, X } from "lucide-react";

// Kuchh sample color themes
const themes = [
  { name: "Neela", class: "from-blue-700 to-purple-600" },
  { name: "Peela", class: "from-yellow-400 to-orange-500" },
  { name: "Hara", class: "from-green-500 to-teal-500" },
  { name: "Gulabi", class: "from-pink-500 to-fuchsia-500" },
  { name: "Kaala", class: "from-gray-900 to-gray-800" }
];

export function ThemePicker({ open, onClose, onChange }: { open: boolean, onClose: () => void; onChange: (theme: string) => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-6 shadow-xl min-w-[320px]">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-6 h-6 text-purple-500" />
          <span className="font-bold text-lg text-purple-700">अपनी पसंदीदा थीम चुनें</span>
          <button className="ml-auto" onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((t) => (
            <button
              key={t.name}
              className={`rounded-xl px-3 py-2 font-medium text-white bg-gradient-to-r ${t.class} flex items-center gap-2 hover:scale-110 transition`}
              onClick={() => {
                onChange(t.class);
                onClose();
              }}
            >
              <CheckCircle className="w-4 h-4 text-white" />
              {t.name}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-700 mt-4">Theme instant लागू हो जाएगी!</div>
      </div>
    </div>
  );
}
