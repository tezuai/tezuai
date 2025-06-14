
import { useState } from "react";
import { Lightbulb, X } from "lucide-react";

const steps = [
  "नमस्ते! 👋 Tezu AI Pro में आपका स्वागत है।",
  "किसी भी समय 'Quick Templates' से आसान शुरुआत लें।",
  "दिख रही रंगीन थीम्स से अपने mood के हिसाब से रंग चुनें।",
  "Floating + बटन से app ke pro features instantly पाएँ।",
  "हर जवाब, image या template pe emoji से react करें।",
  "आपका data surakshit aur private है।"
];

export function OnboardingHindi({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-fuchsia-900 bg-opacity-80">
      <div className="bg-white rounded-3xl shadow-2xl p-8 min-w-[320px] max-w-xs flex flex-col items-center animate-fade-in">
        <Lightbulb className="w-8 h-8 text-yellow-300 mb-2 animate-bounce" />
        <h2 className="text-xl font-bold text-purple-700 text-center mb-4">Tezu AI Pro Onboarding</h2>
        <div className="text-gray-800 text-center mb-6 min-h-[44px]">
          {steps[step]}
        </div>
        <div className="flex gap-2 mt-2">
          {step < steps.length - 1 ? (
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-1.5 rounded-full shadow hover:scale-105 transition"
              onClick={() => setStep(step + 1)}
            >आगे</button>
          ) : (
            <button
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 py-1.5 rounded-full shadow hover:scale-105 transition"
              onClick={onFinish}
            >शुरू करें</button>
          )}
          <button className="bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-500 text-xs ml-2" onClick={onFinish}><X className="w-3 h-3"/></button>
        </div>
        <div className="mt-4 flex gap-1">
          {steps.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i===step?'bg-purple-600':'bg-gray-300'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
