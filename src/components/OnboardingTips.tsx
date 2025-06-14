
import { useState } from "react";
import { Lightbulb, X } from "lucide-react";

const onboardingTips = [
  "नमस्ते! 👋 Tezu AI में आपका स्वागत है। अपने सवाल नीचे chat box में टाइप करें।",
  "आप सीधे ‘+’ बटन से अपनी पसंद का कोई एक्स्ट्रा फीचर चुन सकते हैं।",
  "Theme बदलने के लिए थीम बटन पर क्लिक करें और अपना पसंदीदा रंग चुनें!",
  "“Quick Templates” पर one-click से कोई नया काम शुरू करें—जैसे कहानी, कोड, विश्लेषण।",
  "हर AI जवाब को Like, Star, या Emoji से react कर सकते हैं।",
  "निश्चित रहें, आपकी privacy पूरी तरह सुरक्षित है।"
];

export function OnboardingTips() {
  const [open, setOpen] = useState(true);

  // Demo ke liye sirf ek tip random show ho rahi hai
  const tip = onboardingTips[Math.floor(Math.random() * onboardingTips.length)];

  if (!open) return null;
  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 bg-gradient-to-r from-blue-700 to-purple-700 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in">
      <Lightbulb className="w-5 h-5 text-yellow-300" />
      <span className="text-base">{tip}</span>
      <button
        className="ml-4"
        aria-label="Close tips"
        onClick={() => setOpen(false)}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
