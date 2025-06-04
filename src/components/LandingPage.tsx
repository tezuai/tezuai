
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
  BarChart3,
  Workflow,
  Database,
  Cpu,
  CloudLightning,
  Briefcase
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
      title: "15+ Advanced AI Models",
      description: "GPT-4o, Claude 3.5, Gemini Pro, Llama 3, और भी कई models एक साथ",
      highlight: "सब Free में",
      color: "from-blue-500 via-cyan-500 to-teal-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      description: "Sub-second responses with advanced caching और optimization",
      highlight: "99.9% Uptime",
      color: "from-yellow-500 via-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Military Grade Security",
      description: "End-to-end encryption, zero data logging, complete privacy",
      highlight: "Bank Level Security",
      color: "from-green-500 via-emerald-500 to-teal-500"
    },
    {
      icon: Users,
      title: "Enterprise Team Features",
      description: "100,000+ active users, collaborative workspace, team management",
      highlight: "100K+ Users",
      color: "from-purple-500 via-pink-500 to-rose-500"
    },
    {
      icon: Workflow,
      title: "AI Workflow Automation",
      description: "Smart task automation, workflow builder, process optimization",
      highlight: "NEW Professional",
      color: "from-indigo-500 via-purple-500 to-pink-500"
    },
    {
      icon: Database,
      title: "Smart Data Analytics",
      description: "Advanced data processing, insights generation, predictive analytics",
      highlight: "AI Powered",
      color: "from-cyan-500 via-blue-500 to-indigo-500"
    },
    {
      icon: Cpu,
      title: "AI Model Training",
      description: "Custom model training, fine-tuning, personalized AI responses",
      highlight: "Enterprise Only",
      color: "from-orange-500 via-red-500 to-pink-500"
    },
    {
      icon: CloudLightning,
      title: "Cloud Computing Power",
      description: "Unlimited compute resources, distributed processing, scalable infrastructure",
      highlight: "Unlimited Power",
      color: "from-teal-500 via-green-500 to-emerald-500"
    },
    {
      icon: Briefcase,
      title: "Business Intelligence",
      description: "Market analysis, business insights, competitive intelligence",
      highlight: "Pro Feature",
      color: "from-rose-500 via-pink-500 to-purple-500"
    }
  ];

  const newProfessionalFeatures = [
    { icon: Workflow, title: "Workflow Automation", desc: "Smart task automation & process optimization" },
    { icon: Database, title: "Data Analytics", desc: "Advanced insights & predictive analytics" },
    { icon: Cpu, title: "Custom AI Training", desc: "Train personalized AI models" },
    { icon: CloudLightning, title: "Cloud Computing", desc: "Unlimited compute resources" },
    { icon: Briefcase, title: "Business Intelligence", desc: "Market analysis & insights" }
  ];

  const testimonials = [
    {
      name: "Raj Kumar Sharma",
      role: "Senior Software Engineer, Google India",
      content: "Best AI assistant ever! Workflow automation saved me 5 hours daily. Better than any tool I've used!",
      rating: 5,
      avatar: "🧑‍💻"
    },
    {
      name: "Priya Singh",
      role: "Content Creator & Influencer, Mumbai",
      content: "Custom AI training feature है incredible! Content creation में revolutionary change आया है।",
      rating: 5,
      avatar: "👩‍🎨"
    },
    {
      name: "Dr. Amit Patel",
      role: "Data Scientist, Microsoft",
      content: "Data analytics और business intelligence features are game-changing. ROI increased by 300%!",
      rating: 5,
      avatar: "👨‍🔬"
    },
    {
      name: "Sneha Gupta",
      role: "Startup Founder, Bangalore",
      content: "Cloud computing power unlimited है! Scalability के लिए perfect solution मिला।",
      rating: 5,
      avatar: "👩‍💼"
    }
  ];

  const demoSections = {
    chat: {
      title: "Advanced Multi-Model Chat",
      description: "15+ AI models with workflow automation and context memory",
      preview: "https://via.placeholder.com/600x400/1a1a1a/white?text=Advanced+Chat+Demo"
    },
    workflow: {
      title: "AI Workflow Automation",
      description: "Smart task automation and process optimization tools",
      preview: "https://via.placeholder.com/600x400/1a1a1a/white?text=Workflow+Demo"
    },
    analytics: {
      title: "Data Analytics Dashboard",
      description: "Advanced insights, predictive analytics, and business intelligence",
      preview: "https://via.placeholder.com/600x400/1a1a1a/white?text=Analytics+Demo"
    },
    training: {
      title: "Custom AI Model Training",
      description: "Train and fine-tune personalized AI models for your business",
      preview: "https://via.placeholder.com/600x400/1a1a1a/white?text=Training+Demo"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-6000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <Badge className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 text-lg font-bold animate-bounce shadow-2xl">
              🚀 India's Most Advanced AI Assistant - Professional Edition
            </Badge>
            
            <h1 className="text-6xl md:text-9xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tezu AI
              </span>
              <br />
              <span className="text-4xl md:text-6xl">
                Professional{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Enterprise
                </span>
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
              15+ AI Models • Workflow Automation • Custom Training • Business Intelligence<br />
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold">
                Professional Features से Business को Next Level पर ले जाएं!
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={onStartChat}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-xl px-16 py-8 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 transform"
              >
                <Rocket className="w-7 h-7 mr-4" />
                Start Professional AI Now
                <ArrowRight className="w-7 h-7 ml-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowDemo(true)}
                className="border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 text-xl px-16 py-8 hover:border-pink-500 transition-all duration-300 hover:scale-105"
              >
                <Play className="w-7 h-7 mr-4" />
                Watch Professional Demo
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center mt-16">
              <div className="space-y-3 group hover:scale-110 transition-transform duration-300">
                <Crown className="w-10 h-10 text-yellow-400 mx-auto group-hover:animate-pulse" />
                <div className="text-sm text-gray-400">Enterprise Ready</div>
              </div>
              <div className="space-y-3 group hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-green-400 mx-auto group-hover:animate-pulse" />
                <div className="text-sm text-gray-400">Professional Grade</div>
              </div>
              <div className="space-y-3 group hover:scale-110 transition-transform duration-300">
                <Target className="w-10 h-10 text-blue-400 mx-auto group-hover:animate-pulse" />
                <div className="text-sm text-gray-400">15+ AI Models</div>
              </div>
              <div className="space-y-3 group hover:scale-110 transition-transform duration-300">
                <Lightning className="w-10 h-10 text-purple-400 mx-auto group-hover:animate-pulse" />
                <div className="text-sm text-gray-400">Advanced Features</div>
              </div>
              <div className="space-y-3 group hover:scale-110 transition-transform duration-300">
                <Workflow className="w-10 h-10 text-pink-400 mx-auto group-hover:animate-pulse" />
                <div className="text-sm text-gray-400">Automation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="py-24 bg-gradient-to-r from-gray-800/60 via-gray-700/60 to-gray-800/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group hover:scale-125 transition-all duration-500 cursor-pointer">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-cyan-300">100,000+</div>
              <div className="text-gray-300 font-semibold">Enterprise Users</div>
            </div>
            <div className="group hover:scale-125 transition-all duration-500 cursor-pointer">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-emerald-300">50M+</div>
              <div className="text-gray-300 font-semibold">Messages Processed</div>
            </div>
            <div className="group hover:scale-125 transition-all duration-500 cursor-pointer">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300">150+</div>
              <div className="text-gray-300 font-semibold">Countries</div>
            </div>
            <div className="group hover:scale-125 transition-all duration-500 cursor-pointer">
              <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-orange-300">4.9/5</div>
              <div className="text-gray-300 font-semibold">Enterprise Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Features Grid */}
      <div className="py-28 max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-6xl font-bold text-white mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional Enterprise Features
            </span>
          </h2>
          <p className="text-gray-300 text-2xl max-w-4xl mx-auto">
            Advanced AI tools designed for professionals and enterprises
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-800/40 via-gray-700/40 to-gray-800/40 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-110 group backdrop-blur-xl shadow-2xl hover:shadow-purple-500/20">
              <CardHeader className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`p-4 bg-gradient-to-r ${feature.color} rounded-2xl shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-400 text-sm font-bold px-3 py-1">
                    {feature.highlight}
                  </Badge>
                </div>
                <CardTitle className="text-white text-2xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed text-lg">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Professional Features Section */}
        <div className="mt-20 text-center">
          <h3 className="text-4xl font-bold text-white mb-12">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              5 New Professional Features
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {newProfessionalFeatures.map((feature, index) => (
              <div key={index} className="group text-center space-y-4 p-6 rounded-2xl hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-500 hover:scale-110 border border-transparent hover:border-purple-500/30">
                <feature.icon className="w-16 h-16 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mx-auto group-hover:scale-125 transition-transform duration-300" />
                <div>
                  <div className="text-white font-bold text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text">{feature.title}</div>
                  <div className="text-gray-400 text-sm mt-2">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Testimonials */}
      <div className="py-28 bg-gradient-to-r from-gray-800/60 via-purple-900/30 to-gray-800/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Enterprise Success Stories
              </span>
            </h2>
            <p className="text-gray-300 text-xl">
              Join 100,000+ professionals across India and globally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-800/50 via-purple-900/20 to-gray-800/50 border border-purple-500/30 hover:bg-gradient-to-br hover:from-purple-700/40 hover:to-pink-700/40 transition-all duration-500 hover:scale-110 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/30">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-200 mb-6 leading-relaxed text-lg">"{testimonial.content}"</p>
                  <div>
                    <div className="font-bold text-white text-lg">{testimonial.name}</div>
                    <div className="text-sm text-purple-300">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Professional Pricing */}
      <div className="py-28 max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Professional Pricing Plans
            </span>
          </h2>
          <p className="text-gray-300 text-xl">Choose the perfect plan for your business needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-600/50 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl">Starter</CardTitle>
              <div className="text-6xl font-bold text-blue-400">₹399<span className="text-xl text-gray-400">/month</span></div>
              <p className="text-gray-400 text-lg">Perfect for individuals</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "500 messages/day",
                "5 AI models access",
                "Basic workflow automation",
                "Standard voice features",
                "Email support",
                "30-day chat history",
                "Basic analytics",
                "File upload (5MB)"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
              <Button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-lg py-3">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/60 via-pink-900/40 to-purple-900/60 border-2 border-purple-500 relative scale-110 shadow-2xl backdrop-blur-xl">
            <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg px-6 py-2">
              Most Popular
            </Badge>
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl">Professional</CardTitle>
              <div className="text-6xl font-bold text-purple-400">₹599<span className="text-xl text-gray-400">/month</span></div>
              <p className="text-gray-400 text-lg">For professionals & teams</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Unlimited messages",
                "All 15+ AI models",
                "Advanced workflow automation",
                "Custom AI model training",
                "Priority support",
                "Unlimited file uploads",
                "Advanced analytics",
                "Business intelligence",
                "Data processing tools",
                "Cloud computing access"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
              <Button className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-3">
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-yellow-500/50 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl">Enterprise</CardTitle>
              <div className="text-6xl font-bold text-yellow-400">₹2999<span className="text-xl text-gray-400">/month</span></div>
              <p className="text-gray-400 text-lg">For large organizations</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Everything in Professional",
                "Unlimited team members",
                "Custom integrations",
                "Dedicated AI models",
                "24/7 phone support",
                "Advanced security",
                "API access",
                "White-label options",
                "Custom deployment",
                "Enterprise SLA"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
              <Button className="w-full mt-8 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-lg py-3">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final Enhanced CTA */}
      <div className="py-28 bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-6xl font-bold text-white mb-8">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Ready for AI Revolution?
            </span>
          </h2>
          <p className="text-3xl text-gray-200 mb-16 leading-relaxed">
            Join 100,000+ professionals using India's most advanced AI assistant.<br />
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold">
              Transform Your Business Today - Professional Features Included!
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <Button 
              onClick={onStartChat}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-2xl px-20 py-10 shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110 transform"
            >
              <Sparkles className="w-8 h-8 mr-4" />
              Start Professional AI Journey
              <ArrowRight className="w-8 h-8 ml-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div className="space-y-4 group hover:scale-110 transition-transform duration-300">
              <Globe className="w-12 h-12 text-blue-400 mx-auto group-hover:animate-pulse" />
              <div className="text-gray-300 font-semibold">Global Availability</div>
            </div>
            <div className="space-y-4 group hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto group-hover:animate-pulse" />
              <div className="text-gray-300 font-semibold">Fastest Growing</div>
            </div>
            <div className="space-y-4 group hover:scale-110 transition-transform duration-300">
              <Shield className="w-12 h-12 text-purple-400 mx-auto group-hover:animate-pulse" />
              <div className="text-gray-300 font-semibold">Enterprise Secure</div>
            </div>
            <div className="space-y-4 group hover:scale-110 transition-transform duration-300">
              <Heart className="w-12 h-12 text-red-400 mx-auto group-hover:animate-pulse" />
              <div className="text-gray-300 font-semibold">Made in India</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Demo Dialog */}
      <Dialog open={showDemo} onOpenChange={setShowDemo}>
        <DialogContent className="max-w-5xl bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 border border-purple-500/30 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-white text-3xl flex items-center gap-3">
              <Play className="w-8 h-8 text-purple-400" />
              Professional Demo - Advanced Features
            </DialogTitle>
          </DialogHeader>
          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="mt-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 backdrop-blur">
              <TabsTrigger value="chat" className="text-lg">Advanced Chat</TabsTrigger>
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
                  <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 rounded-xl p-8 h-80 flex items-center justify-center border border-purple-500/30">
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                        <Play className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-gray-300 text-lg">Professional interactive demo available</p>
                      <Button onClick={onStartChat} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3">
                        Try Professional Features Live
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
