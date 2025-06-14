
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeaderBar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/10 backdrop-blur border-b border-purple-400/20 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 flex items-center justify-between h-[64px]">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2 select-none">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-fuchsia-400 animate-pulse drop-shadow" />
            <span
              className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-fuchsia-500 to-purple-700 bg-clip-text text-transparent 
                animate-gradient-x tracking-tight drop-shadow-lg relative logo-gradient-text"
              style={{ letterSpacing: "2px" }}
            >
              Tezu AI Pro
              <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-gradient-to-r from-blue-500 via-fuchsia-400 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom-left rounded-full" />
            </span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* Placeholder: Notification, Profile pic, etc */}
          <Button variant="ghost" className="rounded-full opacity-60 hover:opacity-100 transition">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="sr-only">Coming Soon: Notifications/Account</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
