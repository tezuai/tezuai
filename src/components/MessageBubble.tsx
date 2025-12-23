
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Volume2,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  model?: string;
}

interface MessageBubbleProps {
  message: Message;
  onCopy: (content: string) => void;
}

export function MessageBubble({ message, onCopy }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""} group`}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={isUser ? "/api/placeholder/32/32" : undefined} />
        <AvatarFallback
          className={`${
            isUser
              ? "bg-gradient-to-br from-green-500 to-blue-600 text-white"
              : "bg-gradient-to-br from-purple-500 to-pink-600 text-white"
          }`}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={`flex-1 max-w-3xl ${isUser ? "text-right" : ""}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-300">
            {isUser ? "You" : "Zentara AI"}
          </span>
          {message.model && (
            <Badge variant="outline" className="text-xs border-emerald-600 text-emerald-400">
              {message.model}
            </Badge>
          )}
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>

        <div
          className={`rounded-2xl p-4 ${
            isUser
              ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white ml-12"
              : "bg-gray-800/70 text-gray-100 mr-12 border border-gray-700/50"
          } shadow-lg backdrop-blur-sm`}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        </div>

        {!isUser && (
          <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onCopy(message.content)}
              className="text-gray-400 hover:text-white hover:bg-gray-700/50 h-7 px-2"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-700/50 h-7 px-2"
            >
              <Volume2 className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-700/50 h-7 px-2"
            >
              <ThumbsUp className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-700/50 h-7 px-2"
            >
              <ThumbsDown className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-700/50 h-7 px-2"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
