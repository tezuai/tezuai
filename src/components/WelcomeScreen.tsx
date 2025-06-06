
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
  BarChart3
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

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Header */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
            <Bot className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to AI Agent Pro
          </h1>
          
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Your advanced AI assistant with cutting-edge capabilities for all your creative and analytical needs
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
          Start New Conversation
        </Button>

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
            <h4 className="text-xl font-bold text-white mb-2">Advanced AI Models</h4>
            <p className="text-gray-400 text-sm">Access to multiple AI models including GPT-4, Claude, and custom models</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
            <FileText className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Document Analysis</h4>
            <p className="text-gray-400 text-sm">Upload and analyze documents, PDFs, and text files with advanced AI processing</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
            <Mic className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Voice Interface</h4>
            <p className="text-gray-400 text-sm">Natural voice conversations with speech-to-text and text-to-speech capabilities</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
            <ImageIcon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Image Processing</h4>
            <p className="text-gray-400 text-sm">Generate, analyze, and edit images with advanced AI assistance</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
            <Code className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Code Assistant</h4>
            <p className="text-gray-400 text-sm">Advanced coding help with multiple programming languages and frameworks</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
            <Zap className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Real-time Responses</h4>
            <p className="text-gray-400 text-sm">Lightning-fast responses with streaming capabilities for instant feedback</p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-blue-400 font-medium mb-2">🚀 Ready to get started?</p>
          <p className="text-gray-300 text-sm">Click "Start New Conversation" above to begin chatting with your AI assistant. All conversations are 100% private and secure!</p>
        </div>
      </div>
    </div>
  );
}
