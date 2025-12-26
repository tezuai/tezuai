import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <Bot className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 max-w-3xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-emerald-400">TezuAI</span>
          <span className="text-xs text-gray-500">typing...</span>
        </div>

        <div className="rounded-2xl p-4 bg-gray-800/70 border border-emerald-700/50 shadow-lg backdrop-blur-sm mr-12">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
            <span className="text-sm text-gray-400">Tezu सोच रहा है...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
