
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
} from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to AI Assistant! 🎉",
      description: "India ka sabse advanced AI assistant mein aapka swagat hai!",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Namaste! Main aapka AI Assistant hun
            </h3>
            <p className="text-gray-400">
              Main aapki har sawal ka jawab de sakta hun - coding se lekar creative writing tak!
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm text-gray-300">Natural Chat</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-sm text-gray-300">Creative Writing</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-sm text-gray-300">Instant Results</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Free Features 🆓",
      description: "Dekho aapko kya-kya free mein milta hai!",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-white font-medium">10 Free Messages Daily</div>
                <div className="text-sm text-gray-400">Har din reset ho jata hai</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-white font-medium">Basic AI Model Access</div>
                <div className="text-sm text-gray-400">Powerful GPT-3.5 model</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-white font-medium">Chat History (7 days)</div>
                <div className="text-sm text-gray-400">Purane conversations save</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 rounded-lg border border-blue-500/20">
            <div className="text-center">
              <Badge className="bg-blue-600 text-white mb-2">Pro Tips</Badge>
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
      description: "Simple steps mein master ban jao!",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
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
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <div className="text-white font-medium">Get Instant Response</div>
                <div className="text-sm text-gray-400">
                  AI turant detailed answer dega with examples
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
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
          
          <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <div className="text-yellow-400 font-medium text-sm">Example Questions:</div>
                <div className="text-sm text-gray-300 space-y-1 mt-1">
                  <div>• "Python mein loop kaise likhte hain?"</div>
                  <div>• "Business plan banane mein help karo"</div>
                  <div>• "Creative story likhna hai love ke baare mein"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Privacy & Security 🔒",
      description: "Aapka data bilkul safe hai hamare saath!",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <Shield className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-white font-medium">End-to-End Encryption</div>
                <div className="text-sm text-gray-400">Saare messages encrypted rehte hain</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-white font-medium">No Data Selling</div>
                <div className="text-sm text-gray-400">Hum kabhi aapka data nahi bechte</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <Users className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-white font-medium">GDPR Compliant</div>
                <div className="text-sm text-gray-400">International privacy standards follow karte hain</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
            <div className="text-center">
              <p className="text-sm text-gray-300">
                🇮🇳 <strong>Made in India</strong> - Local data centers se faster response
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-white">{steps[currentStep].title}</CardTitle>
              <p className="text-gray-400 mt-1">{steps[currentStep].description}</p>
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
              className="border-gray-600 text-gray-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentStep === steps.length - 1 ? "Start Chatting" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
