
import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";

const facts = [
  "हर दिन एक नई शुरुआत है! 🚀",
  "सीखना कभी बंद न करें।",
  "अपना बेस्ट देने की कोशिश करें!",
  "Tezu AI के साथ, हर सवाल का जवाब मिलेगा।",
  "कभी हार मत मानो, कोशिश जारी रखो।",
  "सपने देखो, उन्हें पूरा भी करो!",
  "AI Future hai – apna dost bhi!"
];

export function FunFacts() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % facts.length), 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="fixed z-40 bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-blue-700 shadow-lg text-white flex items-center gap-2 animate-fade-in">
      <Lightbulb className="w-4 h-4 text-yellow-300 animate-pulse" />
      <span className="text-xs font-medium">{facts[idx]}</span>
    </div>
  );
}
