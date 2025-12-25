import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MessageSquare,
  Bot,
  Sparkles,
  Users,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Zap,
  Shield,
  Brain,
  ImageIcon,
  Code
} from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Zentara AI! 🎉",
      description: "ज़ेंतारा AI में आपका स्वागत है!",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Namaste! Main Zentara AI hun
            </h3>
            <p className="text-gray-400">
              Main aapki har sawal ka jawab de sakta hun - coding se lekar creative writing tak!
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-emerald-900/20 rounded-xl border border-emerald-700/30">
              <MessageSquare className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-sm text-gray-300">Natural Chat</div>
            </div>
            <div className="text-center p-4 bg-teal-900/20 rounded-xl border border-teal-700/30">
              <Sparkles className="w-6 h-6 text-teal-400 mx-auto mb-2" />
              <div className="text-sm text-gray-300">Creative Studio</div>
            </div>
            <div className="text-center p-4 bg-cyan-900/20 rounded-xl border border-cyan-700/30">
              <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-sm text-gray-300">Instant Results</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Zentara AI Features 🆓",
      description: "Dekho aapko kya-kya milta hai!",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl">
              <Brain className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-white font-medium">Advanced AI Chat</div>
                <div className="text-sm text-gray-400">Gemini 2.5 Flash powered intelligence</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-teal-900/20 border border-teal-500/30 rounded-xl">
              <ImageIcon className="w-5 h-5 text-teal-400" />
              <div>
                <div className="text-white font-medium">AI Image Generator</div>
                <div className="text-sm text-gray-400">किसी भी prompt से images बनाएं</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-xl">
              <Code className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-white font-medium">Code Assistant</div>
                <div className="text-sm text-gray-400">Coding help in multiple languages</div>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/20">
            <div className="text-center">
              <Badge className="bg-emerald-600 text-white mb-2">Pro Tips</Badge>
              <p className="text-sm text-gray-300">
                Detailed questions pucho better answers ke liye!
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "How to Get Started 🚀",
      description: "Simple steps mein shuru karo!",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <div className="text-white font-medium">Type Your Question</div>
                <div className="text-sm text-gray-400">
                  Hindi ya English mein kuch bhi pucho - "Mujhe resume banane mein help karo"
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <div className="text-white font-medium">Get Instant Response</div>
                <div className="text-sm text-gray-400">
                  Zentara AI turant detailed answer dega
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <div className="text-white font-medium">Continue Conversation</div>
                <div className="text-sm text-gray-400">
                  Follow-up questions pucho ya new topic start karo
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-xl">
            <div className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400 mt-0.5" />
              <div>
                <div className="text-emerald-400 font-medium text-sm">Example Questions:</div>
                <div className="text-sm text-gray-300 space-y-1 mt-1">
                  <div>• "Python mein loop kaise likhte hain?"</div>
                  <div>• "Creative story likhna hai"</div>
                  <div>• "एक beautiful image generate करो"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Privacy & Security 🔒",
      description: "Aapka data bilkul safe hai!",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl">
              <Shield className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-white font-medium">End-to-End Encryption</div>
                <div className="text-sm text-gray-400">Saare messages encrypted rehte hain</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-teal-900/20 border border-teal-500/30 rounded-xl">
              <CheckCircle className="w-5 h-5 text-teal-400" />
              <div>
                <div className="text-white font-medium">No Data Selling</div>
                <div className="text-sm text-gray-400">Hum kabhi aapka data nahi bechte</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-xl">
              <Users className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-white font-medium">GDPR Compliant</div>
                <div className="text-sm text-gray-400">International privacy standards</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-xl border border-emerald-800/30">
            <div className="text-center">
              <p className="text-sm text-gray-300">
                🇮🇳 <strong className="text-emerald-400">Made in India</strong> - Local data centers se faster response
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-gray-900 via-emerald-950/30 to-gray-900 border-emerald-800/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-white">{steps[currentStep].title}</CardTitle>
              <p className="text-emerald-400 mt-1">{steps[currentStep].description}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onSkip}
              className="text-gray-400 hover:text-white"
            >
              Skip Tour
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {steps[currentStep].content}
          
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="border-emerald-700/50 text-gray-300 hover:bg-emerald-900/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {currentStep === steps.length - 1 ? "Start Zentara AI" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}