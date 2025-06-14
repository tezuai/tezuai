
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeaderBar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-[#26125e]/90 via-[#6a218b]/80 to-[#120c24]/90 backdrop-blur border-b border-fuchsia-400/30 shadow-2xl">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 flex items-center justify-between h-[84px]">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3 select-none">
          <span className="inline-flex flex-col sm:flex-row items-center gap-1.5 group relative">

            {/* Main Gradient Brand */}
            <span className="relative flex flex-col items-start pb-2">
              <span
                className="font-black text-4xl sm:text-5xl bg-gradient-to-tr from-[#ffd700] via-[#7f41de] to-[#fe9fff] bg-clip-text text-transparent tracking-[.3em] drop-shadow-[0_4px_32px_rgba(255,186,16,0.45)] animate-gradient-x"
                style={{ letterSpacing: "3px" }}
              >
                <span className="inline-block align-top mr-2">
                  <Sparkles className="w-10 h-10 text-[#ffd700] animate-pulse drop-shadow-xl" />
                </span>
                Tezu <span className="font-black text-fuchsia-400">AI</span> <span className="font-black text-yellow-400 text-2xl align-super pl-1">Pro</span>
              </span>
              <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-yellow-500 via-fuchsia-400 to-indigo-500 rounded-full blur-md animate-pulse group-hover:scale-x-105 transition-transform duration-300" />
              {/* Hindi Branding Below */}
              <span className="text-xs sm:text-sm mt-2 leading-4 font-bold bg-gradient-to-tr from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x select-none tracking-widest whitespace-nowrap shadow-fuchsia-100 drop-shadow">
                <span className="font-serif">तेज़ू</span> <span className="mx-1 font-bold">ए.आई.</span> <span className="tracking-wide font-black">प्रो</span>
              </span>
            </span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="rounded-full opacity-70 hover:opacity-100 transition shadow-fuchsia-500/20 bg-gradient-to-r from-yellow-300/30 to-pink-200/40 px-3 py-2">
            <Sparkles className="w-6 h-6 text-fuchsia-400 animate-spin" />
            <span className="sr-only">Coming Soon: Notifications/Account</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

