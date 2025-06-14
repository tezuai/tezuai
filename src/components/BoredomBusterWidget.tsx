
import { useState, useEffect } from "react";
import { Sparkles, Smile, Lightbulb, Crown } from "lucide-react";

const tips = [
  { icon: <Lightbulb className="w-6 h-6 text-yellow-400" />, text: "Pro Tip: AI voice command se tez aur asaan kaam karein!" },
  { icon: <Smile className="w-6 h-6 text-pink-400" />, text: "Joke: AI se puchho, 'Ek joke sunao', har din naya fun milega!" },
  { icon: <Crown className="w-6 h-6 text-fuchsia-400" />, text: "Shahi Advice: Apna theme personalize karein, Royal feel ke liye!" },
  { icon: <Sparkles className="w-6 h-6 text-blue-400" />, text: "Motivation: 'Jo khud par yakeen karta hai, usse AI bhi rok nahi sakta!'" },
  { icon: <Smile className="w-6 h-6 text-green-400" />, text: "Just try: 'Workflow Automation' tab pe click karein, business automate ho jayega!" },
  { icon: <Lightbulb className="w-6 h-6 text-orange-400" />, text: "Kya aapko pata hai? Tezu AI Pro mein 15+ models available hain, free mein!" },
  { icon: <Crown className="w-6 h-6 text-yellow-600" />, text: "Royal: Settings mein jaake 'Professional Template' enable karein aur advanced output paayein." },
];

export function BoredomBusterWidget() {
  const [tip, setTip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);

  // Change tip every 20s (optional: only randomize on mount)
  useEffect(() => {
    const id = setInterval(() => {
      setTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 20000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="max-w-md mx-auto my-10 animate-fade-in rounded-2xl border-2 border-fuchsia-400/40 bg-gradient-to-br from-purple-900 via-blue-900 to-fuchsia-900/80 shadow-2xl px-5 py-6 flex items-center gap-4">
      <div className="rounded-full bg-gradient-to-br from-yellow-300 via-fuchsia-400 to-blue-400 p-2 shadow-lg">
        {tip.icon}
      </div>
      <div className="text-lg font-semibold text-fuchsia-100 tracking-wide">{tip.text}</div>
    </div>
  );
}
