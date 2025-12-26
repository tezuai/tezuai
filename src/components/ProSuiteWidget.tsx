import { useState, useEffect } from "react";
import { Star, CircleCheck, MessageSquare, ThumbsUp, Bot, Zap, Brain } from "lucide-react";

const badges = [
  { icon: <CircleCheck className="w-5 h-5 text-emerald-400" />, name: "Active User" },
  { icon: <Star className="w-5 h-5 text-yellow-400 animate-pulse" />, name: "Creative" },
  { icon: <ThumbsUp className="w-5 h-5 text-teal-400" />, name: "Helpful" },
];

const trendingPrompts = [
  "AI से कहानी लिखवाओ",
  "Image generate करो",
  "Code debug करवाओ",
  "Creative content बनाओ",
];

const quizQuestions = [
  {
    q: "TezuAI किस model पर powered है?",
    options: ["GPT-3", "Claude", "Gemini 2.5", "Llama"],
    correct: 2,
    tip: "Hint: Google का latest model!"
  },
  {
    q: "TezuAI में कौन सी language support है?",
    options: ["Only English", "Only Hindi", "Hindi & English", "French"],
    correct: 2,
    tip: "दोनों languages में बात करो!"
  }
];

function getRandomGreeting() {
  const moods = [
    "🤗 Namaste!",
    "👋 Welcome back!",
    "🎉 Ready to explore?",
    "🔥 Let's create!",
    "🥇 Aaj kuch naya try karo!"
  ];
  return moods[Math.floor(Math.random() * moods.length)];
}

export function ProSuiteWidget() {
  const [xp, setXP] = useState(() => Math.floor(Math.random() * 80 + 20));
  const dailyStreak = Math.floor(xp / 15);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setXP(xp => xp > 99 ? 100 : xp + 1), 9000);
    return () => clearInterval(t);
  }, []);

  const quiz = quizQuestions[quizIdx];

  const checkQuiz = (idx: number) => {
    if (idx === quiz.correct) {
      setQuizFeedback("🎉 Bilkul sahi! Great knowledge.");
      setTimeout(() => { setQuizIdx((quizIdx + 1) % quizQuestions.length); setQuizFeedback(null); }, 1600);
    } else {
      setQuizFeedback("❌ Galat! " + quiz.tip);
      setTimeout(() => setQuizFeedback(null), 1400);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto my-5 px-6 py-6 rounded-2xl bg-gradient-to-br from-gray-900/90 via-emerald-950/50 to-gray-900/90 shadow-lg border border-emerald-800/30 animate-fade-in">
      {/* Greeting */}
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-2xl w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <div>
          <div className="font-extrabold text-lg text-emerald-400 drop-shadow">{getRandomGreeting()}</div>
          <div className="text-xs text-gray-400">TezuAI - Your intelligent companion</div>
        </div>
      </div>

      {/* XP bar and badges */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-gray-800 mr-2">
          <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all" style={{ width: `${xp}%` }} />
        </div>
        <span className="text-xs font-bold text-emerald-400">{xp} XP</span>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs text-gray-400 font-semibold mr-1">Badges:</span>
        {badges.map((b, i) => (
          <span key={i} className="flex items-center gap-1 bg-gray-800/50 rounded-full px-2 py-1 text-xs font-medium border border-emerald-800/30">
            {b.icon}{b.name}
          </span>
        ))}
        <span className="ml-auto text-xs text-emerald-400 font-bold">Streak: {dailyStreak} 🔥</span>
      </div>

      {/* Trending prompts */}
      <div className="mb-4">
        <div className="font-bold text-emerald-400 mb-2 text-sm flex items-center gap-2">
          <Zap className="w-4 h-4" /> Trending:
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingPrompts.map((p, i) => (
            <span key={i} className="bg-emerald-900/30 text-emerald-300 font-medium px-3 py-1.5 rounded-full text-xs border border-emerald-700/30 cursor-pointer hover:bg-emerald-800/40 transition hover:scale-105">
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Quiz */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-emerald-800/30">
        <div className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
          <Brain className="w-4 h-4" /> Quick Quiz
        </div>
        <div className="text-gray-300 mb-3 text-sm">{quiz.q}</div>
        <div className="flex flex-wrap gap-2 mb-2">
          {quiz.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => checkQuiz(idx)}
              className="bg-emerald-900/40 text-emerald-200 px-3 py-1.5 rounded-lg hover:scale-105 transition font-medium text-xs border border-emerald-700/30 hover:bg-emerald-800/50"
              disabled={!!quizFeedback}
            >
              {opt}
            </button>
          ))}
        </div>
        {quizFeedback && (
          <div className="text-xs font-semibold text-emerald-300 animate-pulse">{quizFeedback}</div>
        )}
      </div>

      {/* Help tip */}
      <div className="flex items-center gap-2 mt-4 bg-emerald-950/30 rounded-xl px-4 py-2 border border-emerald-800/20">
        <MessageSquare className="w-5 h-5 text-emerald-400" />
        <span className="text-xs text-gray-400">TezuAI से कुछ भी पूछो - Hindi या English में!</span>
      </div>
    </div>
  );
}