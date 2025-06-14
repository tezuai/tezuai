
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeaderBar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-[#19184b]/80 via-[#431e45]/70 to-[#251A43]/80 backdrop-blur border-b border-fuchsia-400/20 shadow-xl">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 flex items-center justify-between h-[70px]">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3 select-none">
          <span className="inline-flex items-center gap-3 group">
            <Sparkles className="w-8 h-8 text-fuchsia-400 animate-pulse drop-shadow-xl" />
            <span className="relative flex flex-col">
              <span
                className="font-extrabold text-3xl sm:text-4xl bg-gradient-to-r from-[#00e3ee] via-[#9859ef] to-[#fe9fff] bg-clip-text text-transparent tracking-wider drop-shadow-[0_2px_16px_rgba(185,80,255,0.55)] animate-gradient-x transition-all"
                style={{ letterSpacing: "2px" }}
              >
                Tezu <span className="font-black">AI</span> <span className="font-black text-sm align-super pl-1">Pro</span>
              </span>
              <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-gradient-to-r from-blue-400 via-fuchsia-400 to-pink-400 rounded-full blur-sm animate-pulse group-hover:scale-x-110 transition-transform duration-300" />
              <span className="text-xs mt-2 leading-4 font-bold bg-gradient-to-r from-yellow-400 via-blue-300 to-fuchsia-400 bg-clip-text text-transparent animate-gradient-x select-none tracking-wide">
                Professional Enterprise
              </span>
            </span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="rounded-full opacity-70 hover:opacity-100 transition shadow-fuchsia-500/20">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
            <span className="sr-only">Coming Soon: Notifications/Account</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
