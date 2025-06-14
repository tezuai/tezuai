
import { useState } from "react";
import { Plus, MessageSquare, Lightbulb, User, Sparkles, HelpCircle, Palette, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    icon: MessageSquare,
    label: "Ask Tezu AI",
    onClick: (setMenuOpen: (open: boolean) => void) => {
      document.querySelector<HTMLInputElement>('input[placeholder*="Tezu"]')?.focus();
      setMenuOpen(false);
    },
    color: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  {
    icon: Lightbulb,
    label: "Idea Generator",
    onClick: (setMenuOpen: (open: boolean) => void) => {
      alert("Try brainstorming an idea! (Feature coming soon)");
      setMenuOpen(false);
    },
    color: "bg-gradient-to-r from-yellow-400 to-orange-400",
  },
  {
    icon: Palette,
    label: "Theme Picker",
    onClick: (setMenuOpen: (open: boolean) => void) => {
      alert("Theme picker coming soon! Try Settings for now.");
      setMenuOpen(false);
    },
    color: "bg-gradient-to-r from-pink-500 to-fuchsia-500",
  },
  {
    icon: Sparkles,
    label: "Templates",
    onClick: (setMenuOpen: (open: boolean) => void) => {
      alert("Templates explorer coming soon!");
      setMenuOpen(false);
    },
    color: "bg-gradient-to-r from-green-400 to-cyan-500",
  },
  {
    icon: HelpCircle,
    label: "Help / Support",
    onClick: (setMenuOpen: (open: boolean) => void) => {
      window.open("https://docs.lovable.dev/", "_blank");
      setMenuOpen(false);
    },
    color: "bg-gradient-to-r from-slate-500 to-slate-800",
  },
];

export function FloatingActions() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed z-50 bottom-6 right-6 flex flex-col items-end gap-3">
      {menuOpen && (
        <div className="mb-2 flex flex-col items-end gap-2 animate-fade-in">
          {actions.map((action, i) => (
            <button
              key={i}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg shadow-lg text-white cursor-pointer transition-transform hover:scale-105 ${action.color}`}
              onClick={() => action.onClick(setMenuOpen)}
              style={{ minWidth: 160 }}
            >
              <action.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{action.label}</span>
            </button>
          ))}
        </div>
      )}
      <Button
        onClick={() => setMenuOpen((open) => !open)}
        className={`rounded-full size-14 shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center transition-all duration-200 hover:scale-110 ${menuOpen ? "rotate-45" : ""}`}
        aria-label={menuOpen ? "Close" : "Actions"}
        style={{ boxShadow: "0 8px 24px 2px rgba(70,40,200, .24)" }}
      >
        {menuOpen ? <Zap className="w-7 h-7" /> : <Plus className="w-7 h-7" />}
      </Button>
    </div>
  );
}
