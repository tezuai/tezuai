
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Sparkles, 
  Shield, 
  Zap, 
  MessageSquare,
  FileText,
  Code,
  Image as ImageIcon,
  Mic,
  Brain,
  Calendar,
  BarChart3,
  Cpu,
  Users,
  Layers,
  Database,
  Lock
} from "lucide-react";

interface WelcomeScreenProps {
  onStartChat: () => void;
}

export function WelcomeScreen({ onStartChat }: WelcomeScreenProps) {
  const quickActions = [
    { icon: FileText, label: "Write a creative story", prompt: "मुझे एक creative story लिखकर दो" },
    { icon: BarChart3, label: "Analyze this document", prompt: "इस document का analysis करो" },
    { icon: Code, label: "Help me code a function", prompt: "एक function code करने में help करो" },
    { icon: Brain, label: "Explain a complex topic", prompt: "कोई complex topic explain करो" },
    { icon: ImageIcon, label: "Generate an image", prompt: "एक image generate करो" },
    { icon: Calendar, label: "Plan my schedule", prompt: "मेरे schedule की planning करो" },
  ];

  const newProfessionalFeatures = [
    { icon: Brain, label: "Switch AI Models", description: "Choose from 15+ advanced AI models" },
    { icon: Users, label: "Real-time Collaboration", description: "Work together with your team" },
    { icon: Cpu, label: "Custom AI Training", description: "Train personalized models for your business" },
    { icon: FileText, label: "Professional Templates", description: "Access 150+ business templates" },
    { icon: Layers, label: "Advanced Analytics", description: "Get detailed insights and reports" }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Header */}
        <div className="mb-8">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-6 py-2 rounded-full">
            🚀 India's Most Advanced AI Assistant - Professional Edition
          </Badge>
          
          <h1 className="text-7xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Tezu AI
          </h1>
          
          <h2 className="text-4xl font-bold text-white mb-6">
            Professional <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Enterprise</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            15+ AI Models • Workflow Automation • Custom Training • Business Intelligence
            <br />
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold">
              Professional Features से Business को Next Level पर ले जाएं!
            </span>
          </p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <Badge className="bg-green-500/20 text-green-400 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              🔒 100% Secure & Private
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              ⚡ Lightning Fast
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              ✨ AI Powered
            </Badge>
          </div>
        </div>

        {/* Start Button */}
        <Button 
          onClick={onStartChat}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 mb-12"
        >
          <MessageSquare className="w-6 h-6 mr-3" />
          Start Professional AI Journey
        </Button>

        {/* New Professional Features */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">New Professional Features</h3>
          <div className="grid grid-cols-5 gap-4">
            {newProfessionalFeatures.map((feature, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">{feature.label}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700/50 rounded-xl">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">100,000+</div>
            <div className="text-gray-400">Enterprise Users</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700/50 rounded-xl">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">50M+</div>
            <div className="text-gray-400">Messages Processed</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700/50 rounded-xl">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">150+</div>
            <div className="text-gray-400">Countries</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700/50 rounded-xl">
            <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">4.9/5</div>
            <div className="text-gray-400">Enterprise Rating</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={onStartChat}
                className="p-4 h-auto bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-blue-500/50 transition-all duration-300 rounded-xl"
              >
                <div className="flex flex-col items-center gap-2">
                  <action.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{action.label}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
            <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">15+ AI Models</h4>
            <p className="text-gray-400 text-sm">Access to multiple AI models including GPT-4o, Claude 3.5, Gemini Pro, Llama 3, and more</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
            <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Team Collaboration</h4>
            <p className="text-gray-400 text-sm">Real-time collaboration with team members, shared workspaces, and project management</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
            <Cpu className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Custom AI Training</h4>
            <p className="text-gray-400 text-sm">Train personalized AI models for your specific business needs and use cases</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
            <FileText className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">150+ Templates</h4>
            <p className="text-gray-400 text-sm">Access to professional templates for business, marketing, technical, and creative use cases</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
            <Layers className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Advanced Analytics</h4>
            <p className="text-gray-400 text-sm">Comprehensive analytics dashboard with usage metrics, performance tracking, and AI insights</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
            <Database className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Enterprise Security</h4>
            <p className="text-gray-400 text-sm">Bank-level security with end-to-end encryption, compliance features, and data protection</p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-blue-400 font-medium mb-2">🚀 Professional Edition Features Unlocked!</p>
          <p className="text-gray-300 text-sm">All professional features are now available. Click "Start Professional AI Journey" above to begin exploring!</p>
        </div>
      </div>
    </div>
  );
}
