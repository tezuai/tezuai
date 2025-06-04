
import { useState } from "react";
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
  BarChart3
} from "lucide-react";

interface LandingPageProps {
  onStartChat: () => void;
}

export function LandingPage({ onStartChat }: LandingPageProps) {
  const [email, setEmail] = useState("");
  const [showDemo, setShowDemo] = useState(false);
  const [activeDemo, setActiveDemo] = useState("chat");

  const features = [
    {
      icon: Bot,
      title: "10+ Advanced AI Models",
      description: "GPT-4o, Claude 3.5, Gemini Pro, और भी कई models एक साथ",
      highlight: "सब Free में",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      description: "Sub-second responses with advanced caching और optimization",
      highlight: "99.9% Uptime",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Military Grade Security",
      description: "End-to-end encryption, zero data logging, complete privacy",
      highlight: "Bank Level Security",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Massive Growing Community",
      description: "50,000+ active users, collaborative features, shared templates",
      highlight: "50K+ Users",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Mic,
      title: "Advanced Voice AI",
      description: "Natural voice conversations in 15+ Indian languages",
      highlight: "Multi-language",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: Code,
      title: "Code Compiler & Runner",
      description: "Run Python, JavaScript, और 20+ languages directly",
      highlight: "Live Execution",
      color: "from-indigo-500 to-violet-500"
    },
    {
      icon: Image,
      title: "AI Image Generation",
      description: "Professional images, logos, artwork generation with DALL-E",
      highlight: "Unlimited Creation",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: FileText,
      title: "Document Intelligence",
      description: "PDF analysis, document generation, smart templates",
      highlight: "Smart Processing",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  const testimonials = [
    {
      name: "Raj Kumar Sharma",
      role: "Software Engineer, Bangalore",
      content: "Best AI assistant ever! Coding help is incredible. Better than GitHub Copilot!",
      rating: 5,
      avatar: "🧑‍💻"
    },
    {
      name: "Priya Singh",
      role: "Content Creator, Mumbai",
      content: "Voice features are amazing! Creates content in Hindi-English mix perfectly.",
      rating: 5,
      avatar: "👩‍🎨"
    },
    {
      name: "Dr. Amit Patel",
      role: "Researcher, Delhi",
      content: "Document analysis saved me hours. PDF summarization is incredibly accurate.",
      rating: 5,
      avatar: "👨‍🔬"
    },
    {
      name: "Sneha Gupta",
      role: "Student, Chennai",
      content: "Free features हैं amazing! Homework help में बहुत useful है।",
      rating: 5,
      avatar: "👩‍🎓"
    }
  ];

  const demoSections = {
    chat: {
      title: "Smart Chat Interface",
      description: "Multi-model AI conversations with context memory",
      preview: "https://via.placeholder.com/600x400/1a1a1a/white?text=Chat+Demo"
    },
    voice: {
      title: "Advanced Voice AI",
      description: "Natural conversations in multiple Indian languages",
      preview: "https://via.placeholder.com/600x400/1a1a1a/white?text=Voice+Demo"
    },
    code: {
      title: "Live Code Execution",
      description: "Run and debug code in 20+ programming languages",
      preview: "https://via.placeholder.com/600x400/1a1a1a/white?text=Code+Demo"
    },
    docs: {
      title: "Document Intelligence",
      description: "Analyze PDFs, generate reports, smart templates",
      preview: "https://via.placeholder.com/600x400/1a1a1a/white?text=Document+Demo"
    }
  };

  const advancedFeatures = [
    { icon: Brain, title: "Smart Memory", desc: "Remembers context across sessions" },
    { icon: Languages, title: "Multi-language", desc: "15+ Indian & global languages" },
    { icon: Palette, title: "Creative Tools", desc: "Image generation & editing" },
    { icon: BarChart3, title: "Analytics", desc: "Usage insights & optimization" },
    { icon: Camera, title: "Vision AI", desc: "Image analysis & description" },
    { icon: Video, title: "Video Tools", desc: "Video summarization & editing" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 text-sm font-semibold animate-bounce">
              🚀 India's #1 AI Assistant - 100% Free Start
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tezu AI
              </span>
              <br />
              <span className="text-4xl md:text-5xl">
                India ka Sabse{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Advanced
                </span>
              </span>
            </h1>
            
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              10+ AI Models • Advanced Voice • Code Execution • Document Intelligence<br />
              <span className="text-blue-400 font-semibold">सब कुछ Free में! No Credit Card, No Setup, Just Start!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={onStartChat}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xl px-12 py-6 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                <Rocket className="w-6 h-6 mr-3" />
                Start Free Chat Now
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowDemo(true)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xl px-12 py-6 hover:border-blue-500 transition-all duration-300"
              >
                <Play className="w-6 h-6 mr-3" />
                Watch Live Demo
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-12">
              <div className="space-y-2">
                <Crown className="w-8 h-8 text-yellow-400 mx-auto" />
                <div className="text-sm text-gray-400">No Credit Card</div>
              </div>
              <div className="space-y-2">
                <Award className="w-8 h-8 text-green-400 mx-auto" />
                <div className="text-sm text-gray-400">Free Forever</div>
              </div>
              <div className="space-y-2">
                <Target className="w-8 h-8 text-blue-400 mx-auto" />
                <div className="text-sm text-gray-400">10+ AI Models</div>
              </div>
              <div className="space-y-2">
                <Lightning className="w-8 h-8 text-purple-400 mx-auto" />
                <div className="text-sm text-gray-400">Advanced Features</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with Animation */}
      <div className="py-20 bg-gray-800/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">50,000+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">5M+</div>
              <div className="text-gray-400">Messages Sent</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">100+</div>
              <div className="text-gray-400">Countries</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">4.9/5</div>
              <div className="text-gray-400">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Features Grid */}
      <div className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Advanced Features
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Professional-grade AI tools that are completely free to use
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800/30 border-gray-700/50 hover:border-gray-500 transition-all duration-300 hover:scale-105 group backdrop-blur-xl">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-400 text-xs font-semibold">
                    {feature.highlight}
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">और भी Amazing Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {advancedFeatures.map((feature, index) => (
              <div key={index} className="group text-center space-y-3 p-4 rounded-xl hover:bg-gray-800/30 transition-all duration-300">
                <feature.icon className="w-10 h-10 text-blue-400 mx-auto group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-white font-semibold text-sm">{feature.title}</div>
                  <div className="text-gray-400 text-xs">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Testimonials */}
      <div className="py-24 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Real Users, Real Success Stories
            </h2>
            <p className="text-gray-400 text-lg">
              Join thousands of satisfied users across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/40 border-gray-700/50 hover:bg-gray-700/40 transition-all duration-300 hover:scale-105 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{testimonial.avatar}</div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Pricing */}
      <div className="py-24 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Simple, Transparent, Affordable
          </h2>
          <p className="text-gray-400 text-lg">Start free, upgrade when you need advanced features</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">Free Forever</CardTitle>
              <div className="text-5xl font-bold text-blue-400">₹0</div>
              <p className="text-gray-400">Perfect to get started</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "50 messages/day",
                "3 AI models access",
                "Basic voice features",
                "Community support",
                "7-day chat history"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500 relative scale-105 shadow-2xl backdrop-blur-xl">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Most Popular
            </Badge>
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">Pro</CardTitle>
              <div className="text-5xl font-bold text-blue-400">₹999<span className="text-xl text-gray-400">/month</span></div>
              <p className="text-gray-400">For power users</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Unlimited messages",
                "All 10+ AI models",
                "Advanced voice & vision",
                "Code execution",
                "Priority support",
                "Unlimited file uploads"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">Enterprise</CardTitle>
              <div className="text-5xl font-bold text-purple-400">₹4999<span className="text-xl text-gray-400">/month</span></div>
              <p className="text-gray-400">For teams & businesses</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Everything in Pro",
                "Team collaboration",
                "Custom AI training",
                "API access",
                "Dedicated support",
                "White-label options"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Work?
          </h2>
          <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
            Join 50,000+ users who are already using India's most advanced AI assistant.<br />
            <span className="text-blue-400 font-semibold">Start Free Today - No Credit Card Required!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              onClick={onStartChat}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xl px-12 py-6 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Start Your AI Journey Now
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <Globe className="w-8 h-8 text-blue-400 mx-auto" />
              <div className="text-sm text-gray-400">Available Worldwide</div>
            </div>
            <div className="space-y-2">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto" />
              <div className="text-sm text-gray-400">Growing Fast</div>
            </div>
            <div className="space-y-2">
              <Shield className="w-8 h-8 text-purple-400 mx-auto" />
              <div className="text-sm text-gray-400">100% Secure</div>
            </div>
            <div className="space-y-2">
              <Heart className="w-8 h-8 text-red-400 mx-auto" />
              <div className="text-sm text-gray-400">Made in India</div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Dialog */}
      <Dialog open={showDemo} onOpenChange={setShowDemo}>
        <DialogContent className="max-w-4xl bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl flex items-center gap-2">
              <Play className="w-6 h-6 text-blue-400" />
              Live Demo - Tezu AI Features
            </DialogTitle>
          </DialogHeader>
          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="mt-4">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="chat">Smart Chat</TabsTrigger>
              <TabsTrigger value="voice">Voice AI</TabsTrigger>
              <TabsTrigger value="code">Code Runner</TabsTrigger>
              <TabsTrigger value="docs">Documents</TabsTrigger>
            </TabsList>
            {Object.entries(demoSections).map(([key, section]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{section.title}</h3>
                    <p className="text-gray-400">{section.description}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-400">Interactive demo will be available here</p>
                      <Button onClick={onStartChat} className="bg-blue-600 hover:bg-blue-700">
                        Try It Live
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
