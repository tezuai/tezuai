
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bot,
  MessageSquare,
  Zap,
  Brain,
  FileText,
  Mic,
  Image,
  Code,
  Sparkles,
} from "lucide-react";

interface WelcomeScreenProps {
  onStartChat: () => void;
}

const features = [
  {
    icon: Brain,
    title: "Advanced AI Models",
    description: "Access to multiple AI models including GPT-4, Claude, and custom models",
  },
  {
    icon: FileText,
    title: "Document Analysis",
    description: "Upload and analyze documents, PDFs, and text files",
  },
  {
    icon: Mic,
    title: "Voice Interface",
    description: "Natural voice conversations with speech-to-text and text-to-speech",
  },
  {
    icon: Image,
    title: "Image Processing",
    description: "Generate, analyze, and edit images with AI assistance",
  },
  {
    icon: Code,
    title: "Code Assistant",
    description: "Advanced coding help with multiple programming languages",
  },
  {
    icon: Zap,
    title: "Real-time Responses",
    description: "Lightning-fast responses with streaming capabilities",
  },
];

const quickActions = [
  "Write a creative story",
  "Analyze this document",
  "Help me code a function",
  "Explain a complex topic",
  "Generate an image",
  "Plan my schedule",
];

export function WelcomeScreen({ onStartChat }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl w-full space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome to AI Agent Pro
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your advanced AI assistant with cutting-edge capabilities for all your creative and analytical needs
          </p>
        </div>

        {/* Quick Actions */}
        <div className="text-center space-y-4">
          <Button
            onClick={onStartChat}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start New Conversation
          </Button>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto mt-6">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={onStartChat}
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-200"
              >
                {action}
              </Button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-6 text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-700/50">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Powered by advanced AI technology</span>
          </div>
        </div>
      </div>
    </div>
  );
}
