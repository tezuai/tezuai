
import { Palette, CheckCircle, X, Zap } from "lucide-react";

const themes = [
  { name: "Royal Blue", class: "from-[#1A237E] to-[#7C4DFF]" },
  { name: "Regal Gold", class: "from-[#FFD700] to-[#FFB300]" },
  { name: "Maharaja Purple", class: "from-[#6A1B9A] to-[#C158DC]" },
  { name: "Neela", class: "from-blue-700 to-purple-600" },
  { name: "Peela", class: "from-yellow-400 to-orange-500" },
  { name: "Hara", class: "from-green-500 to-teal-500" },
  { name: "Gulabi", class: "from-pink-500 to-fuchsia-500" },
  { name: "Kaala", class: "from-gray-900 to-gray-800" },
  { name: "Retro", class: "from-orange-900 to-yellow-400" },
  { name: "Magic Neon", class: "from-fuchsia-600 via-violet-700 to-cyan-400 animate-gradient-x" },
  { name: "Luxury", class: "from-[#2f2e77] via-[#fe4a8a] to-[#fdedee]" },
  { name: "Deep Space", class: "from-[#18144a] via-[#4e2661] to-[#1f254e]" },
  { name: "Random", class: "from-sky-500 to-emerald-400" } // Randomize on select
];

export function ThemePicker({ open, onClose, onChange }: { open: boolean, onClose: () => void; onChange: (theme: string) => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55">
      <div className="bg-white rounded-2xl p-7 shadow-2xl min-w-[360px] animate-fade-in border-4 border-yellow-300/50">
        <div className="flex items-center gap-3 mb-5">
          <Palette className="w-7 h-7 text-purple-600 animate-pulse" />
          <span className="font-black text-xl text-fuchsia-800 tracking-widest">Shahi रंग Theme चुनें</span>
          <button className="ml-auto" onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {themes.map((t) => (
            <button
              key={t.name}
              className={`rounded-xl px-3 py-2 font-semibold text-white bg-gradient-to-r ${t.class} flex items-center gap-2 hover:scale-110 transition shadow-lg border-2 border-yellow-100/20`}
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
                <Zap className="w-4 h-4 text-yellow-200 animate-pulse" />
              ) : (
                <CheckCircle className="w-4 h-4 text-yellow-100" />
              )}
              {t.name}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-700 mt-5 tracking-wide px-1">Royal theme तुरंत लागू होगी!</div>
      </div>
    </div>
  );
}
