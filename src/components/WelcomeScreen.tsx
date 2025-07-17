import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Zap,
  Sparkles,
  Bot,
  Code,
  FileText,
  BarChart3,
  Brain,
  Image as ImageIcon,
  Mic,
  Users,
  Layers,
  Database,
  Lock,
  Star,
  Trophy,
  Smile,
  ArrowRight
} from "lucide-react";

import { useState } from "react";

import { ProSuiteWidget } from "./ProSuiteWidget";
import { ProDashboardWidget } from "./ProDashboardWidget";

interface WelcomeScreenProps {
  onStartChat: () => void;
}

const mainFeatures = [
  {
    icon: Bot,
    label: "Advanced AI Models",
    desc: "GPT-4o, Claude 3.5, Gemini Pro, Llama 3 aur apne custom models",
    color: "from-blue-800 to-purple-700",
  },
  {
    icon: FileText,
    label: "Document Analysis",
    desc: "Upload aur analyze karein: PDF, docs, aur text files",
    color: "from-yellow-600 to-orange-500",
  },
  {
    icon: Mic,
    label: "Voice Interface",
    desc: "Bolkar baatein, voice se AI control karein",
    color: "from-purple-700 to-fuchsia-600",
  },
  {
    icon: ImageIcon,
    label: "Image Processing",
    desc: "Image generate, analyze, aur edit karein AI se",
    color: "from-pink-600 to-blue-500",
  },
  {
    icon: Code,
    label: "Code Assistant",
    desc: "Coding help: multiple languages, code explain, error fix",
    color: "from-emerald-700 to-cyan-600",
  }
];

const proBadges = [
  {
    icon: Shield,
    name: "100% Private & Secure",
    color: "bg-green-600/90 text-white",
  },
  {
    icon: Zap,
    name: "Real-time Responses",
    color: "bg-purple-600/90 text-white",
  },
  {
    icon: Star,
    name: "World's #1 Secure AI",
    color: "bg-yellow-500/90 text-black",
  },
];

const quickActions = [
  { icon: FileText, label: "कहानी लिखवाएं", prompt: "मुझे एक creative story लिखकर दो" },
  { icon: Code, label: "कोड मदद", prompt: "एक function code करने में help करो" },
  { icon: BarChart3, label: "Analyze document", prompt: "इस document का analysis करो" },
  { icon: Brain, label: "समझाओ (Explain)", prompt: "कोई complex topic explain करो" },
  { icon: ImageIcon, label: "AI इमेज बनाएं", prompt: "एक image generate करो" },
  { icon: Layers, label: "वीडियो बनवाएं (Mock)", prompt: "एक वीडियो mock banao" }
];

export function WelcomeScreen({ onStartChat }: WelcomeScreenProps) {
  // Dynamic progress calculation based on user activity
  const [progressValue, setProgressValue] = useState(() => {
    const completedTasks = localStorage.getItem('tezu-ai-completed-tasks') || '0';
    const totalFeatures = localStorage.getItem('tezu-ai-features-explored') || '0';
    return Math.min(100, parseInt(completedTasks) * 10 + parseInt(totalFeatures) * 5);
  });

  // For floating CTA animation (pulse)
  const [askHover, setAskHover] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-blue-900 via-purple-900 to-fuchsia-900">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        
        {/* === NEW: Pro Dashboard Widget (Full advanced demo features) === */}
        <ProDashboardWidget />
        
        {/* === Pro Suite Widget (Full Pro features, badges, gamified etc.) === */}
        <ProSuiteWidget />

        {/* Progress Bar Section */}
        <div className="w-full flex items-center mb-4 relative">
          <div className="flex-1">
            <div className="w-full h-4 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-fuchsia-600 to-yellow-400 transition-all duration-700"
                style={{ width: `${progressValue}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-fuchsia-200 mt-1 font-bold ">
              <span>प्रगति: {progressValue}% पूरी</span>
              <span>{progressValue >= 100 ? "Done!" : ""}</span>
            </div>
          </div>
          <Badge className="ml-4 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-green-400 via-yellow-400 to-blue-400 shadow-lg border-2 border-white/30 text-purple-900 animate-pulse">
            🟢 Halfway!
          </Badge>
        </div>

        {/* Quick Actions Panel */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mb-3 mt-1">
          {quickActions.map((action, i) => (
            <Button
              key={i}
              variant="outline"
              onClick={onStartChat}
              className="flex flex-col items-center gap-1.5 px-2 py-3 bg-gradient-to-br from-blue-900/60 to-fuchsia-900/50 border-fuchsia-700 text-white hover:bg-blue-900/80 hover:scale-105 shadow rounded-lg transition-all duration-200"
              title={action.prompt}
            >
              <action.icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Tezu AI Pro Branding */}
        <div className="w-full rounded-xl bg-gradient-to-br from-blue-900/80 via-purple-800/80 to-fuchsia-900/70 shadow-xl p-5 mb-5 mt-1 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 border-2 border-fuchsia-400/20">
          <div className="flex flex-col items-center justify-center">
            <Bot className="w-16 h-16 text-yellow-300 drop-shadow-md mb-2 animate-bounce" />
            <div className="text-white text-lg font-extrabold tracking-wide">Tezu AI <span className="text-yellow-400">Pro</span></div>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              {proBadges.map((badge, idx) => (
                <span key={idx} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow ${badge.color}`}>
                  <badge.icon className="w-4 h-4" /> {badge.name}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <Badge className="bg-gradient-to-tr from-blue-400 to-purple-400 text-white px-3 py-1 font-semibold shadow">15+ AI Models</Badge>
              <Badge className="bg-gradient-to-tr from-yellow-400 to-pink-400 text-purple-900 px-3 py-1 font-semibold shadow">Workflow Automation</Badge>
              <Badge className="bg-gradient-to-tr from-pink-400 to-fuchsia-500 text-white px-3 py-1 font-semibold shadow">Custom Training</Badge>
              <Badge className="bg-gradient-to-tr from-purple-600 to-yellow-400 text-black px-3 py-1 font-semibold shadow">Enterprise Intelligence</Badge>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="w-full grid md:grid-cols-2 gap-6 mb-7">
          {mainFeatures.map((f, i) => (
            <div
              className={`flex items-center gap-5 p-5 rounded-2xl bg-gradient-to-tr ${f.color} shadow-lg border-2 border-white/10 hover:scale-105 transition-all duration-200`}
              key={i}
            >
              <f.icon className="w-9 h-9 text-yellow-200 drop-shadow" />
              <div>
                <div className="text-white font-bold text-lg">{f.label}</div>
                <div className="text-xs text-fuchsia-100">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info/Hint */}
        <div className="w-full py-2 px-4 bg-gradient-to-r from-blue-900/80 to-purple-900/80 border border-blue-400/30 rounded-lg text-blue-300 mt-2 mb-10 text-sm">
          <span className="font-semibold">Pro Tip:</span> सभी features स्मार्ट तरीके से explore करें – ऊपर “Start Professional AI Journey” दबाएँ या किसी Quick Action से शुरू करें!
        </div>

        {/* Main Large CTA */}
        <Button
          onClick={onStartChat}
          size="lg"
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-5 text-lg rounded-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300 flex items-center"
        >
          <Sparkles className="w-7 h-7 mr-3 text-yellow-200" />
          Start Professional AI Journey
          <ArrowRight className="w-7 h-7 ml-3" />
        </Button>

        {/* Floating Ask Button */}
        <button
          className={`fixed bottom-7 right-7 z-50 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 w-16 h-16 flex items-center justify-center shadow-2xl ring-4 ring-yellow-400/50 hover:scale-110 transition hover:ring-fuchsia-400/70 ${askHover ? "animate-pulse" : ""}`}
          style={{ boxShadow: "0 8px 24px 2px rgba(70,40,200, .22)" }}
          title="AI se poochein / Ask AI"
          onClick={onStartChat}
          onMouseEnter={() => setAskHover(true)}
          onMouseLeave={() => setAskHover(false)}
        >
          <Smile className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}
