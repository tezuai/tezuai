
import { useState } from "react";
import { ThumbsUp, Star } from "lucide-react";

export function ChatReactions() {
  const [like, setLike] = useState(0);
  const [star, setStar] = useState(0);

  return (
    <div className="flex gap-4 mt-2">
      <button
        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 transition"
        onClick={() => setLike(like + 1)}
      >
        <ThumbsUp className="w-4 h-4 text-blue-600" />
        <span>{like}</span>
      </button>
      <button
        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-yellow-100 transition"
        onClick={() => setStar(star + 1)}
      >
        <Star className="w-4 h-4 text-yellow-500" />
        <span>{star}</span>
      </button>
    </div>
  );
}
