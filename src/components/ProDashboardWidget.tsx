
import { useState, useEffect } from "react";
import { Users, Award, RefreshCw, Sparkles, Target, Star, Gift, Smile, Timer, UserPlus, CheckCircle } from "lucide-react";

// Dummy leaderboard data
const leaderboard = [
  { name: "Rohit Pro", xp: 198, streak: 9, avatar: "🦸‍♂️" },
  { name: "Meena Maker", xp: 186, streak: 7, avatar: "🦸‍♀️" },
  { name: "Krishna Dev", xp: 170, streak: 11, avatar: "🦸" }
];

// Dummy recent achievements
const achievements = [
  { label: "Pro Streak 5 🔥", when: "Today" },
  { label: "100 XP Earned 💯", when: "Yesterday" },
  { label: "Quiz King 🧠", when: "2d ago" },
];

// Pomodoro-style Timer
function usePomodoroTimer() {
  const [time, setTime] = useState(25*60);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setTime(t => t > 0 ? t - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  function start() { setActive(true);}
  function pause() { setActive(false);}
  function reset() { setTime(25*60); setActive(false);}

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
  // Lucky Draw Spinner - daily reward
  const [spinResult, setSpinResult] = useState<string | null>(null);

  const rewardItems = [
    "🎁 Extra 10 XP!", 
    "⭐ New 'Motivator' Badge!", 
    "🔥 Double streak today!", 
    "📝 Special prompt unlocked!", 
    "💡 Productivity Tip Boost",
    "🔓 Beta feature access!"
  ];

  function spin() {
    setSpinResult("...");
    setTimeout(() => {
      const idx = Math.floor(Math.random() * rewardItems.length);
      setSpinResult(rewardItems[idx]);
      setTimeout(() => setSpinResult(null), 3200);
    }, 800);
  }

  // Goal Tracker Demo
  const [goal, setGoal] = useState("");
  const [goalMsg, setGoalMsg] = useState<string | null>(null);

  function handleGoalSet(e: React.FormEvent) {
    e.preventDefault();
    if (goal.trim().length === 0) return;
    setGoalMsg(`🎯 Goal set: "${goal}" - AI will cheer you on!`);
    setGoal("");
    setTimeout(() => setGoalMsg(null), 2000);
  }

  // Pomodoro
  const pomodoro = usePomodoroTimer();

  // Theme Customizer (just show avatars for now)
  const avatars = ["🦸‍♀️", "🦸‍♂️", "🧙‍♂️", "👩‍🎨", "🤴", "👩‍🔬"];
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  // Notice board dummy data
  const communityNotices = [
    { name: "Deepak", msg: "AI ne mere resume ko 2x improve kiya!", time: "1 min ago" },
    { name: "Aarti", msg: "Photo edit shortcut discovered, try it out!", time: "3 min ago" },
    { name: "Vikas", msg: "Got 200+ XP in 1 week using workflow automation!", time: "5 min ago" }
  ];

  // Referral demo
  const [inviteStatus, setInviteStatus] = useState<string | null>(null);
  const handleInvite = () => {
    setInviteStatus("Link Copied! Friends joining will earn you XP!");
    setTimeout(() => setInviteStatus(null), 2000);
  }

  // Animations on achievement (simply pulse for now)
  return (
    <div className="mb-4 max-w-2xl w-full mx-auto rounded-xl shadow-2xl bg-gradient-to-br from-fuchsia-950/65 via-blue-900/80 to-yellow-400/10 py-6 px-6 border-2 border-blue-300/10 animate-fade-in">
      {/* Pro Leaderboard */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-5 h-5 text-yellow-300 animate-pulse" />
          <span className="text-lg font-bold text-yellow-200">Pro Leaderboard</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 bg-gradient-to-r from-fuchsia-800/30 to-blue-800/20 px-2 py-2 rounded-xl">
          {leaderboard.map((u,i) => (
            <div key={i} className="flex flex-col items-center w-28 rounded-xl px-2 py-1 text-center border border-fuchsia-400/30 bg-fuchsia-900/10">
              <span className="text-3xl">{u.avatar}</span>
              <span className="font-bold text-yellow-100">{u.name}</span>
              <span className="text-xs text-fuchsia-200">XP {u.xp}</span>
              <span className="text-xs text-yellow-300">🔥 Streak {u.streak}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Spinner - Daily Reward */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Gift className="w-5 h-5 text-pink-400 animate-bounce" />
          <span className="text-sm font-bold text-pink-200">Spin for Daily Reward</span>
        </div>
        <button
          className="bg-yellow-400/20 hover:bg-pink-300/30 transition px-6 py-2 rounded-xl text-lg font-semibold text-yellow-100 shadow-lg mb-1"
          onClick={spin}
          disabled={!!spinResult}
        >{spinResult ?? "🎡 Spin Now"}</button>
        {spinResult && <div className="text-sm text-pink-300 animate-pulse mt-1">{spinResult}</div>}
      </div>
      {/* Avatar Customization */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Smile className="w-5 h-5 text-green-300" />
          <span className="font-bold text-green-100 text-sm">Choose Your AI Avatar</span>
        </div>
        <div className="flex gap-2">
          {avatars.map(av => (
            <button
              key={av}
              onClick={() => setSelectedAvatar(av)}
              className={`text-2xl ${selectedAvatar === av ? "ring-4 ring-yellow-300 scale-125" : ""} bg-fuchsia-950/50 px-3 py-1 rounded-full`}
            >{av}</button>
          ))}
        </div>
        <div className="mt-2 text-xs text-fuchsia-100">Selected: <span className="font-bold">{selectedAvatar}</span></div>
      </div>
      {/* Achievements */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle className="w-5 h-5 text-fuchsia-300 animate-pulse" />
          <span className="font-bold text-fuchsia-100 text-sm">Recent Achievements</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {achievements.map((a,i) => (
            <span key={i} className="bg-fuchsia-900/30 rounded-full px-3 py-1 text-xs font-semibold text-yellow-100 animate-pulse">{a.label} <span className="text-[10px] text-fuchsia-200">({a.when})</span></span>
          ))}
        </div>
      </div>
      {/* Productivity Timer */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Timer className="w-5 h-5 text-blue-400 animate-pulse" />
          <span className="font-bold text-blue-100 text-sm">Productivity Timer</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-mono text-yellow-200">{pomodoro.minutes.toString().padStart(2,'0')}:{pomodoro.seconds.toString().padStart(2,'0')}</span>
          <button onClick={pomodoro.start} className="bg-green-400/30 px-3 py-1 rounded font-bold text-green-100 mr-1">Start</button>
          <button onClick={pomodoro.pause} className="bg-yellow-400/20 px-3 py-1 rounded font-bold text-yellow-100">Pause</button>
          <button onClick={pomodoro.reset} className="bg-red-400/20 px-3 py-1 rounded font-bold text-pink-200">Reset</button>
        </div>
        <div className="text-xs text-fuchsia-200 mt-1">Pro Tip: Kaam 25 min, phir 5 min break!</div>
      </div>
      {/* Goal Tracker */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Target className="w-5 h-5 text-yellow-300" />
          <span className="font-bold text-yellow-100 text-sm">Set Your Daily Goal</span>
        </div>
        <form className="flex gap-2" onSubmit={handleGoalSet}>
          <input
            value={goal}
            onChange={e => setGoal(e.target.value)}
            className="px-3 py-1 rounded bg-fuchsia-950/40 border border-fuchsia-700/40 text-fuchsia-100 text-xs w-40"
            placeholder="Aaj ka goal..."
            maxLength={40}
          />
          <button className="bg-blue-400/20 px-3 py-1 rounded text-blue-100 font-bold" type="submit">Set</button>
        </form>
        {goalMsg && <div className="text-xs mt-1 text-green-200 animate-pulse">{goalMsg}</div>}
      </div>
      {/* Invite Friends */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <UserPlus className="w-5 h-5 text-fuchsia-300" />
          <span className="font-bold text-fuchsia-100 text-sm">Invite Friends (Referral Bonus)</span>
        </div>
        <button
          className="bg-gradient-to-r from-blue-400 to-fuchsia-400 px-3 py-1 rounded text-white font-bold hover:scale-105"
          onClick={handleInvite}
        >Copy Invite Link</button>
        {inviteStatus && <div className="text-xs mt-1 text-green-200 animate-pulse">{inviteStatus}</div>}
      </div>
      {/* Pro Notice Board (read-only demo) */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-5 h-5 text-fuchsia-400" />
          <span className="font-bold text-fuchsia-100 text-sm">Pro Community Notice Board</span>
        </div>
        <div className="flex flex-col gap-1">
          {communityNotices.map((n,i) => (
            <div key={i} className="bg-blue-900/20 rounded px-3 py-1 flex items-center gap-2">
              <span className="font-bold text-yellow-100">{n.name}:</span>
              <span className="text-fuchsia-100">{n.msg}</span>
              <span className="ml-auto text-xs text-fuchsia-200">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
