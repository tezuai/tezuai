import { useState, useEffect } from "react";
import { Users, Award, Sparkles, Target, Star, Gift, Smile, Timer, UserPlus, CheckCircle, Bot, Zap } from "lucide-react";

const leaderboard = [
  { name: "Rohit", xp: 198, streak: 9, avatar: "🦸‍♂️" },
  { name: "Meena", xp: 186, streak: 7, avatar: "🦸‍♀️" },
  { name: "Krishna", xp: 170, streak: 11, avatar: "🦸" }
];

const achievements = [
  { label: "Active Streak 🔥", when: "Today" },
  { label: "100 XP 💯", when: "Yesterday" },
  { label: "Quiz Master 🧠", when: "2d ago" },
];

function usePomodoroTimer() {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setTime(t => t > 0 ? t - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  function start() { setActive(true); }
  function pause() { setActive(false); }
  function reset() { setTime(25 * 60); setActive(false); }

  return {
    time,
    active,
    start,
    pause,
    reset,
    minutes: Math.floor(time / 60),
    seconds: time % 60
  }
}

export function ProDashboardWidget() {
  const [spinResult, setSpinResult] = useState<string | null>(null);

  const rewardItems = [
    "🎁 Extra 10 XP!",
    "⭐ New Badge!",
    "🔥 Double streak!",
    "📝 Special prompt!",
    "💡 Productivity Boost",
    "🔓 Beta feature!"
  ];

  function spin() {
    setSpinResult("...");
    setTimeout(() => {
      const idx = Math.floor(Math.random() * rewardItems.length);
      setSpinResult(rewardItems[idx]);
      setTimeout(() => setSpinResult(null), 3200);
    }, 800);
  }

  const [goal, setGoal] = useState("");
  const [goalMsg, setGoalMsg] = useState<string | null>(null);

  function handleGoalSet(e: React.FormEvent) {
    e.preventDefault();
    if (goal.trim().length === 0) return;
    setGoalMsg(`🎯 Goal set: "${goal}"`);
    setGoal("");
    setTimeout(() => setGoalMsg(null), 2000);
  }

  const pomodoro = usePomodoroTimer();

  const avatars = ["🦸‍♀️", "🦸‍♂️", "🧙‍♂️", "👩‍🎨", "🤴", "👩‍🔬"];
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const communityNotices = [
    { name: "Deepak", msg: "TezuAI ने मेरी productivity 2x की!", time: "1 min ago" },
    { name: "Aarti", msg: "Image generator amazing है!", time: "3 min ago" },
    { name: "Vikas", msg: "200+ XP in 1 week!", time: "5 min ago" }
  ];

  const [inviteStatus, setInviteStatus] = useState<string | null>(null);
  const handleInvite = () => {
    setInviteStatus("Link Copied! Share with friends!");
    setTimeout(() => setInviteStatus(null), 2000);
  }

  return (
    <div className="mb-4 max-w-2xl w-full mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900/90 via-emerald-950/40 to-gray-900/90 py-6 px-6 border border-emerald-800/30 animate-fade-in">
      
      {/* Leaderboard */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-emerald-400" />
          <span className="text-lg font-bold text-emerald-400">Leaderboard</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {leaderboard.map((u, i) => (
            <div key={i} className="flex flex-col items-center w-24 rounded-xl px-2 py-2 text-center border border-emerald-800/30 bg-gray-800/30">
              <span className="text-3xl">{u.avatar}</span>
              <span className="font-bold text-gray-200 text-sm">{u.name}</span>
              <span className="text-xs text-emerald-400">XP {u.xp}</span>
              <span className="text-xs text-yellow-400">🔥 {u.streak}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Reward Spinner */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Gift className="w-5 h-5 text-teal-400" />
          <span className="text-sm font-bold text-teal-400">Daily Reward</span>
        </div>
        <button
          className="bg-emerald-900/40 hover:bg-emerald-800/50 transition px-6 py-2 rounded-xl text-base font-semibold text-emerald-300 shadow-lg border border-emerald-700/30"
          onClick={spin}
          disabled={!!spinResult}
        >
          {spinResult ?? "🎡 Spin Now"}
        </button>
        {spinResult && <div className="text-sm text-emerald-400 animate-pulse mt-1">{spinResult}</div>}
      </div>

      {/* Avatar Selection */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Smile className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-cyan-400 text-sm">Choose Avatar</span>
        </div>
        <div className="flex gap-2">
          {avatars.map(av => (
            <button
              key={av}
              onClick={() => setSelectedAvatar(av)}
              className={`text-2xl ${selectedAvatar === av ? "ring-2 ring-emerald-400 scale-110" : ""} bg-gray-800/50 px-3 py-1 rounded-full transition`}
            >
              {av}
            </button>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-400">Selected: <span className="font-bold text-emerald-400">{selectedAvatar}</span></div>
      </div>

      {/* Achievements */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-emerald-400 text-sm">Achievements</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {achievements.map((a, i) => (
            <span key={i} className="bg-emerald-900/30 rounded-full px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-700/30">
              {a.label} <span className="text-[10px] text-gray-400">({a.when})</span>
            </span>
          ))}
        </div>
      </div>

      {/* Productivity Timer */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Timer className="w-5 h-5 text-teal-400" />
          <span className="font-bold text-teal-400 text-sm">Focus Timer</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-mono text-emerald-300">{pomodoro.minutes.toString().padStart(2, '0')}:{pomodoro.seconds.toString().padStart(2, '0')}</span>
          <button onClick={pomodoro.start} className="bg-emerald-600/30 px-3 py-1 rounded font-bold text-emerald-300 text-sm border border-emerald-600/30">Start</button>
          <button onClick={pomodoro.pause} className="bg-yellow-600/20 px-3 py-1 rounded font-bold text-yellow-300 text-sm border border-yellow-600/30">Pause</button>
          <button onClick={pomodoro.reset} className="bg-red-600/20 px-3 py-1 rounded font-bold text-red-300 text-sm border border-red-600/30">Reset</button>
        </div>
      </div>

      {/* Goal Tracker */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-cyan-400 text-sm">Set Daily Goal</span>
        </div>
        <form className="flex gap-2" onSubmit={handleGoalSet}>
          <input
            value={goal}
            onChange={e => setGoal(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-gray-800/50 border border-emerald-700/30 text-gray-200 text-sm w-40 focus:border-emerald-500 focus:outline-none"
            placeholder="Aaj ka goal..."
            maxLength={40}
          />
          <button className="bg-emerald-600/30 px-4 py-1.5 rounded-lg text-emerald-300 font-bold text-sm border border-emerald-600/30" type="submit">Set</button>
        </form>
        {goalMsg && <div className="text-xs mt-1 text-emerald-400 animate-pulse">{goalMsg}</div>}
      </div>

      {/* Invite Friends */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <UserPlus className="w-5 h-5 text-teal-400" />
          <span className="font-bold text-teal-400 text-sm">Invite Friends</span>
        </div>
        <button
          className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 rounded-lg text-white font-bold hover:scale-105 transition text-sm"
          onClick={handleInvite}
        >
          Copy Invite Link
        </button>
        {inviteStatus && <div className="text-xs mt-1 text-emerald-400 animate-pulse">{inviteStatus}</div>}
      </div>

      {/* Community Notice Board */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-emerald-400 text-sm">Community</span>
        </div>
        <div className="flex flex-col gap-2">
          {communityNotices.map((n, i) => (
            <div key={i} className="bg-gray-800/30 rounded-lg px-3 py-2 flex items-center gap-2 border border-emerald-800/20">
              <span className="font-bold text-emerald-300 text-sm">{n.name}:</span>
              <span className="text-gray-300 text-sm">{n.msg}</span>
              <span className="ml-auto text-xs text-gray-500">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}