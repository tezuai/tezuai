
export function ProgressBar({ value, max }: { value: number; max: number }) {
  const percent = Math.round((value / max) * 100);
  return (
    <div className="my-3">
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-xs text-gray-600 mt-1 text-right">
        प्रगति: {percent}% पूरा!
      </div>
    </div>
  );
}
