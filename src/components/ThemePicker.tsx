
import { useState } from "react";
import { Palette, CheckCircle, X, Zap } from "lucide-react";

const themes = [
  { name: "Neela", class: "from-blue-700 to-purple-600" },
  { name: "Peela", class: "from-yellow-400 to-orange-500" },
  { name: "Hara", class: "from-green-500 to-teal-500" },
  { name: "Gulabi", class: "from-pink-500 to-fuchsia-500" },
  { name: "Kaala", class: "from-gray-900 to-gray-800" },
  { name: "Retro", class: "from-orange-900 to-yellow-400" },
  { name: "Magic Neon", class: "from-fuchsia-600 via-violet-700 to-cyan-400 animate-gradient-x" },
  { name: "Luxury", class: "from-[#2f2e77] via-[#fe4a8a] to-[#fdedee]" },
  { name: "Deep Space", class: "from-[#18144a] via-[#4e2661] to-[#1f254e]" },
  { name: "Random", class: "from-sky-500 to-emerald-400" } // Will randomize on select
];

export function ThemePicker({ open, onClose, onChange }: { open: boolean, onClose: () => void; onChange: (theme: string) => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-6 shadow-xl min-w-[340px] animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-6 h-6 text-purple-500" />
          <span className="font-bold text-lg text-purple-700">अपनी पसंदीदा थीम चुनें</span>
          <button className="ml-auto" onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {themes.map((t) => (
            <button
              key={t.name}
              className={`rounded-xl px-3 py-2 font-medium text-white bg-gradient-to-r ${t.class} flex items-center gap-2 hover:scale-110 transition`}
              onClick={() => {
                const isRandom = t.name === "Random";
                let chosen = t.class;
                if (isRandom) {
                  const rand = themes[Math.floor(Math.random() * (themes.length - 1))].class;
                  chosen = rand;
                }
                onChange(chosen);
                onClose();
              }}
            >
              {t.name === "Magic Neon" ? (
                <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
              ) : (
                <CheckCircle className="w-4 h-4 text-white" />
              )}
              {t.name}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-700 mt-4">Theme instant लागू हो जाएगी!</div>
      </div>
    </div>
  );
}
