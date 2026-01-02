import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bot,
  Zap,
  Shield,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  MessageSquare,
  Globe,
  Sparkles,
  TrendingUp,
  X,
  Mic,
  FileText,
  Image,
  Code,
  Brain,
  Video,
  Headphones,
  Download,
  Share,
  Heart,
  Crown,
  Rocket,
  Target,
  Award,
  Zap as Lightning,
  Palette,
  Languages,
  Camera,
  BarChart3,
  Workflow,
  Database,
  Cpu,
  CloudLightning,
  Briefcase,
  Clock
} from "lucide-react";
import { BoredomBusterWidget } from "./BoredomBusterWidget";

interface LandingPageProps {
  onStartChat: () => void;
}

export function LandingPage({ onStartChat }: LandingPageProps) {
  const [email, setEmail] = useState("");
  const [showDemo, setShowDemo] = useState(false);
  const [activeDemo, setActiveDemo] = useState("chat");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Bot,
      title: "Next-Gen AI Models 2026",
      description: "GPT-5 Turbo, Claude 4, Gemini Ultra 2.0, Llama 4 - Latest 2026 models",
      highlight: "🆕 2026 Update",
      color: "from-emerald-500 via-teal-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Ultra-Fast Neural Processing",
      description: "Quantum-enhanced responses with 0.1s latency",
      highlight: "⚡ Instant",
      color: "from-yellow-500 via-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Quantum-Grade Security",
      description: "Post-quantum encryption, zero-knowledge proofs",
      highlight: "🔐 Military Grade",
      color: "from-emerald-500 via-teal-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Global Enterprise Network",
      description: "500K+ active users, real-time collaboration",
      highlight: "🌍 500K+ Users",
      color: "from-purple-500 via-pink-500 to-rose-500"
    },
    {
      icon: Workflow,
      title: "AI Workflow Automation 2.0",
      description: "Smart task automation with predictive AI",
      highlight: "🤖 Auto-Pilot",
      color: "from-indigo-500 via-purple-500 to-pink-500"
    },
    {
      icon: Database,
      title: "Neural Analytics Engine",
      description: "Real-time insights, predictive analytics",
      highlight: "📊 Live Data",
      color: "from-cyan-500 via-blue-500 to-indigo-500"
    },
    {
      icon: Cpu,
      title: "Custom AI Training Studio",
      description: "Train your own AI models in minutes",
      highlight: "🧠 Your AI",
      color: "from-orange-500 via-red-500 to-pink-500"
    },
    {
      icon: CloudLightning,
      title: "Edge Computing Power",
      description: "Distributed AI processing across global nodes",
      highlight: "☁️ Edge AI",
      color: "from-teal-500 via-emerald-500 to-green-500"
    },
    {
      icon: Briefcase,
      title: "Business Intelligence Pro",
      description: "Market analysis, competitive intelligence, trend prediction",
      highlight: "📈 AI Insights",
      color: "from-rose-500 via-pink-500 to-purple-500"
    }
  ];

  const testimonials = [
    {
      name: "Raj Kumar Sharma",
      role: "Senior AI Engineer, Google India",
      content: "TezuAI 2026 version is incredible! The quantum processing makes everything lightning fast. Best AI I've ever used!",
      rating: 5,
      avatar: "🧑‍💻"
    },
    {
      name: "Priya Singh",
      role: "Content Creator & Influencer, Mumbai",
      content: "2026 के updates amazing हैं! Custom AI training feature से मेरा content creation revolutionize हो गया।",
      rating: 5,
      avatar: "👩‍🎨"
    },
    {
      name: "Dr. Amit Patel",
      role: "Data Scientist, Microsoft",
      content: "Neural analytics engine is a game-changer. Real-time insights ने हमारी productivity 400% बढ़ा दी!",
      rating: 5,
      avatar: "👨‍🔬"
    },
    {
      name: "Sneha Gupta",
      role: "Startup Founder, Bangalore",
      content: "Edge computing power unlimited है! 2026 में TezuAI ही सबसे best AI assistant है।",
      rating: 5,
      avatar: "👩‍💼"
    }
  ];

  const demoSections = {
    chat: {
      title: "Advanced Multi-Model Chat 2026",
      description: "Next-gen AI models with real-time processing",
      preview: "https://via.placeholder.com/600x400/1a1a1a/white?text=TezuAI+Chat+2026"
    },
    workflow: {
      title: "AI Workflow Automation 2.0",
      description: "Predictive automation with zero-touch processing",
      preview: "https://via.placeholder.com/600x400/1a1a1a/white?text=Workflow+Demo"
    },
    analytics: {
      title: "Neural Analytics Dashboard",
      description: "Real-time insights with quantum processing",
      preview: "https://via.placeholder.com/600x400/1a1a1a/white?text=Analytics+Demo"
    },
    training: {
      title: "Custom AI Model Training",
      description: "Train personalized AI models in minutes",
      preview: "https://via.placeholder.com/600x400/1a1a1a/white?text=Training+Demo"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-teal-950 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-6 left-10 w-[410px] h-96 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-24 right-14 w-[340px] h-64 bg-gradient-to-tr from-teal-400 via-cyan-400 to-emerald-400 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-8 left-1/5 w-[260px] h-64 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full blur-2xl animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-br from-cyan-400 to-teal-300 rounded-full blur-2xl animate-pulse animation-delay-6000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/25 via-teal-700/10 to-cyan-900/10 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center space-y-8">
          
          {/* Real-time Clock Badge */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 px-4 py-2 border border-emerald-500/30 backdrop-blur-sm">
              <Clock className="w-4 h-4 mr-2" />
              {currentTime.toLocaleTimeString('hi-IN')} • {currentTime.toLocaleDateString('hi-IN')}
            </Badge>
          </div>

          <Badge className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-gray-900 px-10 py-4 text-lg font-black animate-bounce drop-shadow-xl tracking-widest mb-5 border-2 border-emerald-400 shadow-emerald-200/40">
            ✨ TezuAI 2026 - India's Most Advanced AI
          </Badge>
          
          {/* Main Logo & Brand */}
          <h1 className="text-6xl md:text-8xl font-extrabold flex flex-col gap-1 items-center justify-center mb-2">
            <span className="bg-gradient-to-tr from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_7px_70px_rgba(16,185,129,0.5)] animate-gradient-x font-black tracking-widest">
              Tezu <span className="font-black drop-shadow">AI</span>
            </span>
            {/* Hindi logo below */}
            <span className="text-sm md:text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mt-1 tracking-widest animate-gradient-x">
              <span className="font-serif">तेज़ू ए.आई.</span>
            </span>
          </h1>
          
          <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg mb-2 animate-gradient-x tracking-wide">
            Next-Gen <span className="font-extrabold">Intelligence 2026</span>
          </div>
          
          <p className="text-lg md:text-2xl text-emerald-100 max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow mb-6">
            Real-Time AI <span className="mx-1 text-teal-400">•</span> Hindi & English <span className="mx-1 text-teal-400">•</span> <span className="text-emerald-400">100% Free</span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-emerald-200 via-teal-400 to-cyan-200 bg-clip-text font-bold animate-gradient-x">
              2026 की सबसे तेज़ AI से बात करें! ⚡
            </span>
          </p>
          
          {/* CTA Button group */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex gap-3 mb-4 sm:mb-0">
              <Badge className="bg-gradient-to-r from-emerald-400/90 to-teal-400/90 text-gray-900 px-4 py-2 font-bold animate-pulse shadow border-emerald-400 shadow-emerald-200/40">
                <Sparkles className="w-4 h-4 mr-2 text-emerald-600" /> Quantum Secure
              </Badge>
              <Badge className="bg-gradient-to-r from-teal-300/90 to-cyan-400/90 text-gray-900 px-4 py-2 font-bold animate-pulse shadow border-teal-400 shadow-teal-200/40">
                <Zap className="w-4 h-4 mr-2 text-teal-600" /> Ultra Fast
              </Badge>
            </div>
            <Button
              onClick={onStartChat}
              size="lg"
              className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 text-xl px-14 py-7 rounded-full shadow-2xl hover:scale-105 transition-all duration-400 font-bold tracking-wider ring-2 ring-emerald-300 border-2 border-teal-500"
            >
              <Sparkles className="w-7 h-7 mr-4 text-white" />
              Start TezuAI 2026
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="py-24 bg-gradient-to-r from-gray-900/60 via-emerald-900/40 to-gray-900/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group hover:scale-125 transition-all duration-500 cursor-pointer">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-cyan-300">500K+</div>
              <div className="text-gray-300 font-semibold">Active Users</div>
            </div>
            <div className="group hover:scale-125 transition-all duration-500 cursor-pointer">
              <div className="text-5xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent group-hover:from-teal-300 group-hover:to-emerald-300">100M+</div>
              <div className="text-gray-300 font-semibold">Messages 2026</div>
            </div>
            <div className="group hover:scale-125 transition-all duration-500 cursor-pointer">
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-teal-300">195+</div>
              <div className="text-gray-300 font-semibold">Countries</div>
            </div>
            <div className="group hover:scale-125 transition-all duration-500 cursor-pointer">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-teal-300">5.0/5</div>
              <div className="text-gray-300 font-semibold">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Features Grid */}
      <div className="py-28 max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-6xl font-bold text-white mb-8">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              TezuAI 2026 Features
            </span>
          </h2>
          <p className="text-gray-300 text-2xl max-w-4xl mx-auto">
            Next-generation AI tools with quantum processing and real-time capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-800/40 via-emerald-900/20 to-gray-800/40 border border-emerald-600/30 hover:border-emerald-500/50 transition-all duration-500 hover:scale-110 group backdrop-blur-xl shadow-2xl hover:shadow-emerald-500/20">
              <CardHeader className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`p-4 bg-gradient-to-r ${feature.color} rounded-2xl shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-sm font-bold px-3 py-1">
                    {feature.highlight}
                  </Badge>
                </div>
                <CardTitle className="text-white text-2xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed text-lg">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-28 bg-gradient-to-r from-gray-900/60 via-emerald-900/30 to-gray-900/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                TezuAI 2026 Success Stories
              </span>
            </h2>
            <p className="text-gray-300 text-xl">
              Join 500K+ professionals across India and globally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-800/50 via-emerald-900/20 to-gray-800/50 border border-emerald-500/30 hover:bg-gradient-to-br hover:from-emerald-700/40 hover:to-teal-700/40 transition-all duration-500 hover:scale-110 backdrop-blur-xl shadow-2xl hover:shadow-emerald-500/30">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-emerald-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-200 mb-6 leading-relaxed text-lg">"{testimonial.content}"</p>
                  <div>
                    <div className="font-bold text-white text-lg">{testimonial.name}</div>
                    <div className="text-sm text-emerald-300">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="py-28 max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              TezuAI 2026 Plans
            </span>
          </h2>
          <p className="text-gray-300 text-xl">Choose the perfect plan for your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-emerald-600/30 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl">Starter</CardTitle>
              <div className="text-6xl font-bold text-emerald-400">Free<span className="text-xl text-gray-400">/forever</span></div>
              <p className="text-gray-400 text-lg">Perfect for everyone</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Unlimited messages",
                "All AI models access",
                "Real-time processing",
                "Voice features",
                "Community support",
                "30-day chat history",
                "Basic analytics",
                "Hindi & English"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
              <Button onClick={onStartChat} className="w-full mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg py-3">
                Start Free
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/60 via-teal-900/40 to-emerald-900/60 border-2 border-emerald-500 relative scale-110 shadow-2xl backdrop-blur-xl">
            <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg px-6 py-2">
              Most Popular
            </Badge>
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl">Pro 2026</CardTitle>
              <div className="text-6xl font-bold text-teal-400">₹299<span className="text-xl text-gray-400">/month</span></div>
              <p className="text-gray-400 text-lg">For professionals</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Everything in Starter",
                "Priority AI processing",
                "Custom AI training",
                "Advanced analytics",
                "Priority support",
                "Unlimited history",
                "API access",
                "Team collaboration",
                "Edge computing",
                "Business intelligence"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
              <Button className="w-full mt-8 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-lg py-3">
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-cyan-500/50 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl">Enterprise</CardTitle>
              <div className="text-6xl font-bold text-cyan-400">Custom</div>
              <p className="text-gray-400 text-lg">For organizations</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Everything in Pro",
                "Unlimited team members",
                "Custom integrations",
                "Dedicated AI models",
                "24/7 phone support",
                "Advanced security",
                "White-label options",
                "Custom deployment",
                "Enterprise SLA",
                "Training sessions"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
              <Button className="w-full mt-8 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-lg py-3">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-28 bg-gradient-to-r from-emerald-900/40 via-teal-900/40 to-cyan-900/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-6xl font-bold text-white mb-8">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Ready for TezuAI 2026?
            </span>
          </h2>
          <p className="text-3xl text-gray-200 mb-16 leading-relaxed">
            Join 500K+ professionals using India's most advanced AI assistant.<br />
            <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text font-bold">
              Experience the Future of AI - अभी शुरू करें! 🚀
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <Button 
              onClick={onStartChat}
              size="lg" 
              className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-2xl px-20 py-10 shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-110 transform"
            >
              <Sparkles className="w-8 h-8 mr-4" />
              Start TezuAI 2026 Now
              <ArrowRight className="w-8 h-8 ml-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div className="space-y-4 group hover:scale-110 transition-transform duration-300">
              <Globe className="w-12 h-12 text-emerald-400 mx-auto group-hover:animate-pulse" />
              <div className="text-gray-300 font-semibold">Global Availability</div>
            </div>
            <div className="space-y-4 group hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-12 h-12 text-teal-400 mx-auto group-hover:animate-pulse" />
              <div className="text-gray-300 font-semibold">#1 AI in India</div>
            </div>
            <div className="space-y-4 group hover:scale-110 transition-transform duration-300">
              <Shield className="w-12 h-12 text-cyan-400 mx-auto group-hover:animate-pulse" />
              <div className="text-gray-300 font-semibold">Quantum Secure</div>
            </div>
            <div className="space-y-4 group hover:scale-110 transition-transform duration-300">
              <Heart className="w-12 h-12 text-red-400 mx-auto group-hover:animate-pulse" />
              <div className="text-gray-300 font-semibold">Made in India 🇮🇳</div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Dialog */}
      <Dialog open={showDemo} onOpenChange={setShowDemo}>
        <DialogContent className="max-w-5xl bg-gradient-to-br from-gray-900 via-emerald-900/30 to-gray-900 border border-emerald-500/30 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-white text-3xl flex items-center gap-3">
              <Play className="w-8 h-8 text-emerald-400" />
              TezuAI 2026 Demo
            </DialogTitle>
          </DialogHeader>
          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="mt-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 backdrop-blur">
              <TabsTrigger value="chat" className="text-lg">AI Chat</TabsTrigger>
              <TabsTrigger value="workflow" className="text-lg">Automation</TabsTrigger>
              <TabsTrigger value="analytics" className="text-lg">Analytics</TabsTrigger>
              <TabsTrigger value="training" className="text-lg">AI Training</TabsTrigger>
            </TabsList>
            {Object.entries(demoSections).map(([key, section]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                    <p className="text-gray-300 text-lg">{section.description}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-800/50 to-emerald-900/20 rounded-xl p-8 h-80 flex items-center justify-center border border-emerald-500/30">
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto">
                        <Play className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-gray-300 text-lg">Interactive demo available</p>
                      <Button onClick={onStartChat} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg px-8 py-3">
                        Try TezuAI 2026 Live
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>

      <BoredomBusterWidget />
    </div>
  );
}
