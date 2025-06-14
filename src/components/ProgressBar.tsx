
export function ProgressBar({ value, max }: { value: number; max: number }) {
  const percent = Math.round((value / max) * 100);
  const isAchiever = percent >= 100;
  return (
    <div className="my-3">
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all ${isAchiever ? "shadow-pulse" : ""}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-xs text-gray-600 mt-1 flex items-center gap-2 justify-between">
        <span>प्रगति: {percent}% पूरा!</span>
        {isAchiever ? (
          <span className="bg-gradient-to-r from-yellow-300 to-pink-400 text-white rounded px-2 py-0.5 ml-2 animate-bounce">🏆 Achiever!</span>
        ) : (
          percent >= 50 && <span className="bg-green-300/70 text-green-900 rounded px-2 py-0.5 ml-2 animate-pulse">🔰 Halfway!</span>
        )}
      </div>
    </div>
  );
}
