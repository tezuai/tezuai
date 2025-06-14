
import { useState, useEffect } from "react";
import { Star, CircleCheck, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

// Dummy badges (real app: link with user stats)
const badges = [
  { icon: <CircleCheck className="w-5 h-5 text-green-400" />, name: "Pro Streak" },
  { icon: <Star className="w-5 h-5 text-yellow-400 animate-pulse" />, name: "Creative Maker" },
  { icon: <ThumbsUp className="w-5 h-5 text-blue-400" />, name: "Helpful User" },
];

const trendingPrompts = [
  "AI se apni kahani likhwao",
  "PDF ya image upload kar analysis lo",
  "Coding bug ya homework solve karwao",
  "Business workflow automate karo",
];

const quizQuestions = [
  {
    q: "Tezu AI Pro kitne models support karta hai?",
    options: ["5+", "10+", "15+", "50+"],
    correct: 2,
    tip: "Hint: Dekho WelcomeScreen pe badges!"
  },
  {
    q: "Voice se kya control kar sakte hain?",
    options: ["Document analysis", "AI ko prompt", "Image generate", "Sabhi"],
    correct: 3,
    tip: "AI Pro mein voice interface pro hai!"
  }
];

function getRandomGreeting() {
  const moods = [
    "🤗 Namaste Pro User!",
    "👋 Welcome back, legend!",
    "🎉 Ready for your next streak?",
    "🔥 Pro power unlocked!",
    "🥇 Aaj kuch naya try karo!"
  ];
  return moods[Math.floor(Math.random() * moods.length)];
}

export function ProSuiteWidget() {
  // Simulated XP/streak system
  const [xp, setXP] = useState(() => Math.floor(Math.random() * 80 + 20));
  const dailyStreak =  Math.floor(xp / 15);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  // On mount, boost XP for demo
  useEffect(() => {
    const t = setInterval(() => setXP(xp => xp > 99 ? 100 : xp + 1), 9000);
    return () => clearInterval(t);
  }, []);

  const quiz = quizQuestions[quizIdx];

  const checkQuiz = (idx: number) => {
    if (idx === quiz.correct) {
      setQuizFeedback("🎉 Bilkul sahi! Pro knowledge unlocked.");
      setTimeout(() => { setQuizIdx((quizIdx + 1)%quizQuestions.length); setQuizFeedback(null); }, 1600);
    } else {
      setQuizFeedback("❌ Galat! " + quiz.tip);
      setTimeout(() => setQuizFeedback(null), 1400);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto my-5 px-6 py-6 rounded-2xl bg-gradient-to-br from-blue-900/80 via-purple-800/70 to-fuchsia-900/70 shadow-lg border-2 border-fuchsia-400/20 animate-fade-in">
      {/* Greeting & avatar */}
      <div className="flex items-center gap-3 mb-3">
        <div className="rounded-full w-12 h-12 bg-gradient-to-br from-fuchsia-400 to-yellow-300 flex items-center justify-center shadow-lg">
          <Star className="w-7 h-7 text-purple-800" />
        </div>
        <div>
          <div className="font-extrabold text-lg text-yellow-200 drop-shadow">{getRandomGreeting()}</div>
          <div className="text-xs text-fuchsia-100/80">Enjoy your exclusive Pro experiences!</div>
        </div>
      </div>
      {/* XP bar and badges */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-2 rounded-full overflow-hidden bg-fuchsia-950/60 mr-2">
          <div className="h-full bg-gradient-to-r from-yellow-400 via-fuchsia-500 to-blue-500 transition-all" style={{ width: `${xp}%` }} />
        </div>
        <span className="text-xs font-bold text-yellow-300">{xp} XP</span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-yellow-400 font-semibold mr-1">Badges:</span>
        {badges.map((b,i) => <span key={i} className="flex items-center gap-1 bg-fuchsia-950/40 rounded-full px-2 py-1 text-xs font-medium">{b.icon}{b.name}</span>)}
        <span className="ml-auto text-xs text-fuchsia-200 font-bold">Daily Streak: {dailyStreak} 🔥</span>
      </div>
      {/* Trending prompts */}
      <div className="mb-4">
        <div className="font-bold text-fuchsia-200 mb-1 text-sm">🔥 Community Trending:</div>
        <div className="flex flex-wrap gap-2">
          {trendingPrompts.map((p,i) => (
            <span key={i} className="bg-gradient-to-tr from-yellow-300/50 to-blue-400/40 text-purple-900 font-bold px-3 py-1.5 rounded-full text-xs shadow cursor-pointer hover:shadow-lg transition hover:scale-105">{p}</span>
          ))}
        </div>
      </div>
      {/* AI mini quiz */}
      <div className="bg-fuchsia-800/40 rounded-xl p-4 shadow-inner">
        <div className="font-bold text-yellow-200 mb-1">🧠 Pro Daily Quiz</div>
        <div className="text-fuchsia-100/90 mb-2 text-sm">{quiz.q}</div>
        <div className="flex flex-wrap gap-2 mb-2">
          {quiz.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => checkQuiz(idx)}
              className="bg-blue-700/70 text-white px-3 py-1 rounded hover:scale-105 transition font-semibold text-xs shadow border-2 border-fuchsia-300/20"
              disabled={!!quizFeedback}
            >{opt}</button>
          ))}
        </div>
        {quizFeedback && (
          <div className="text-xs font-semibold mt-2">{quizFeedback}</div>
        )}
      </div>
      {/* Pro help bubble */}
      <div className="flex items-center gap-2 mt-5 bg-fuchsia-950/50 rounded-xl px-4 py-2">
        <MessageSquare className="w-5 h-5 text-yellow-200 animate-bounce" />
        <span className="text-xs text-fuchsia-100 font-medium">Pro Tip: Koi bhi feature na samjhe? Just click 'AI se poochein' ya chat bubble par help milegi!</span>
      </div>
    </div>
  );
}
