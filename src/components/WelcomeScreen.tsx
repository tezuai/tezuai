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
  Layers,
  Star,
  ArrowRight,
  Rocket,
  Wand2,
  MessageSquare
} from "lucide-react";
import { useState } from "react";

interface WelcomeScreenProps {
  onStartChat: () => void;
}

const mainFeatures = [
  {
    icon: Brain,
    label: "Advanced AI Intelligence",
    desc: "Gemini 2.5 Flash powered - Hindi & English में smart responses",
    color: "from-emerald-600 to-teal-500",
  },
  {
    icon: ImageIcon,
    label: "AI Image Generator",
    desc: "किसी भी prompt से stunning images बनाएं",
    color: "from-cyan-600 to-blue-500",
  },
  {
    icon: Mic,
    label: "Voice Interface",
    desc: "बोलकर बातें करें, AI से voice control",
    color: "from-teal-600 to-emerald-500",
  },
  {
    icon: Code,
    label: "Code Assistant",
    desc: "Coding help: multiple languages, debug, explain",
    color: "from-green-600 to-teal-500",
  },
  {
    icon: Wand2,
    label: "Creative Studio",
    desc: "Stories, poems, content - सब कुछ create करें",
    color: "from-emerald-500 to-cyan-500",
  }
];

const proBadges = [
  {
    icon: Shield,
    name: "100% Private & Secure",
    color: "bg-emerald-600/90 text-white",
  },
  {
    icon: Zap,
    name: "Lightning Fast",
    color: "bg-teal-600/90 text-white",
  },
  {
    icon: Star,
    name: "India's #1 AI",
    color: "bg-cyan-500/90 text-white",
  },
];

const quickActions = [
  { icon: FileText, label: "कहानी लिखवाएं", prompt: "मुझे एक creative story लिखकर दो" },
  { icon: Code, label: "कोड मदद", prompt: "एक function code करने में help करो" },
  { icon: BarChart3, label: "Analyze", prompt: "इस topic का analysis करो" },
  { icon: Brain, label: "समझाओ", prompt: "कोई complex topic explain करो" },
  { icon: ImageIcon, label: "AI इमेज", prompt: "एक image generate करो" },
  { icon: Layers, label: "Templates", prompt: "कुछ creative templates दिखाओ" }
];

export function WelcomeScreen({ onStartChat }: WelcomeScreenProps) {
  const [progressValue] = useState(() => {
    const completedTasks = localStorage.getItem('zentara-ai-completed-tasks') || '0';
    const totalFeatures = localStorage.getItem('zentara-ai-features-explored') || '0';
    return Math.min(100, parseInt(completedTasks) * 10 + parseInt(totalFeatures) * 5);
  });

  const [askHover, setAskHover] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-gray-950 via-emerald-950/30 to-gray-950">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Zentara AI Logo Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-pulse">
            <Bot className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Zentara AI
            </span>
          </h1>
          <p className="text-lg text-emerald-400/80 font-medium">ज़ेंतारा ए.आई. - India's Most Intelligent</p>
        </div>

        {/* Progress Bar Section */}
        <div className="w-full flex items-center mb-6">
          <div className="flex-1">
            <div className="w-full h-3 bg-gray-800/50 rounded-full overflow-hidden border border-emerald-900/50">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all duration-700"
                style={{ width: `${progressValue}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-emerald-400/70 mt-1 font-medium">
              <span>Experience: {progressValue}%</span>
              <span>{progressValue >= 100 ? "🎉 Complete!" : "Keep exploring..."}</span>
            </div>
          </div>
          <Badge className="ml-4 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg border-0 text-white">
            ✨ Ready
          </Badge>
        </div>

        {/* Quick Actions Panel */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full mb-6">
          {quickActions.map((action, i) => (
            <Button
              key={i}
              variant="outline"
              onClick={onStartChat}
              className="flex flex-col items-center gap-1.5 px-3 py-4 bg-gray-900/50 border-emerald-800/50 text-gray-300 hover:bg-emerald-900/30 hover:border-emerald-600/50 hover:text-white hover:scale-105 shadow rounded-xl transition-all duration-200"
              title={action.prompt}
            >
              <action.icon className="w-6 h-6 text-emerald-400" />
              <span className="text-xs font-bold">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Zentara AI Branding */}
        <div className="w-full rounded-2xl bg-gradient-to-br from-gray-900/90 via-emerald-950/50 to-gray-900/90 shadow-2xl p-6 mb-6 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 border border-emerald-800/30">
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-2">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <div className="text-white text-xl font-extrabold tracking-wide">
              Zentara <span className="text-emerald-400">AI</span>
            </div>
            <div className="text-xs text-emerald-400/70">ज़ेंतारा ए.आई.</div>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              {proBadges.map((badge, idx) => (
                <span key={idx} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow ${badge.color}`}>
                  <badge.icon className="w-4 h-4" /> {badge.name}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-600/30 px-3 py-1 font-semibold">🧠 Gemini 2.5 Flash</Badge>
              <Badge className="bg-teal-600/20 text-teal-400 border-teal-600/30 px-3 py-1 font-semibold">🎨 Image Generator</Badge>
              <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-600/30 px-3 py-1 font-semibold">📝 Templates</Badge>
              <Badge className="bg-green-600/20 text-green-400 border-green-600/30 px-3 py-1 font-semibold">✨ Creative Studio</Badge>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="w-full grid md:grid-cols-2 gap-4 mb-6">
          {mainFeatures.map((f, i) => (
            <div
              className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${f.color} shadow-lg border border-white/10 hover:scale-105 transition-all duration-200`}
              key={i}
            >
              <f.icon className="w-8 h-8 text-white drop-shadow" />
              <div>
                <div className="text-white font-bold text-base">{f.label}</div>
                <div className="text-xs text-white/80">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tip */}
        <div className="w-full py-3 px-4 bg-emerald-950/50 border border-emerald-800/30 rounded-xl text-emerald-300 mb-8 text-sm">
          <span className="font-semibold">💡 Pro Tip:</span> Zentara AI से Hindi, English या Hinglish में बात करें - जैसे चाहो!
        </div>

        {/* Main Large CTA */}
        <Button
          onClick={onStartChat}
          size="lg"
          className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white px-12 py-6 text-lg rounded-2xl font-bold shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-3"
        >
          <Rocket className="w-6 h-6" />
          Start Zentara AI Journey
          <ArrowRight className="w-6 h-6" />
        </Button>

        {/* Floating Ask Button */}
        <button
          className={`fixed bottom-7 right-7 z-50 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 w-16 h-16 flex items-center justify-center shadow-2xl ring-4 ring-emerald-400/30 hover:scale-110 transition hover:ring-teal-400/50 ${askHover ? "animate-pulse" : ""}`}
          style={{ boxShadow: "0 8px 24px 2px rgba(16,185,129,0.3)" }}
          title="Zentara AI से पूछें"
          onClick={onStartChat}
          onMouseEnter={() => setAskHover(true)}
          onMouseLeave={() => setAskHover(false)}
        >
          <MessageSquare className="w-7 h-7 text-white" />
        </button>
      </div>
    </div>
  );
}