
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Brain, 
  Sparkles, 
  BookOpen, 
  Briefcase, 
  Heart, 
  Gamepad2,
  Mic,
  Code,
  Palette,
  Calculator
} from "lucide-react";

interface AIPersonality {
  id: string;
  name: string;
  description: string;
  personality: string;
  systemPrompt: string;
  icon: any;
  color: string;
  expertise: string[];
}

const personalities: AIPersonality[] = [
  {
    id: "tezu-friendly",
    name: "Tezu - Friendly Assistant",
    description: "Main Tezu hun, aapka dost jo hamesha helpful aur friendly hai",
    personality: "friendly",
    systemPrompt: "You are Tezu, a friendly AI assistant. Always respond in a helpful, warm manner. Use Hindi and English mix naturally. Be encouraging and positive.",
    icon: Heart,
    color: "from-pink-500 to-red-500",
    expertise: ["General Help", "Friendly Chat", "Daily Tasks", "Emotional Support"]
  },
  {
    id: "tezu-teacher",
    name: "Tezu - Smart Teacher",
    description: "Main Tezu hun, aapka teacher jo complex topics easily explain karta hai",
    personality: "educational",
    systemPrompt: "You are Tezu, an educational AI assistant. Explain concepts clearly with examples. Use simple language and break down complex topics into easy steps.",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    expertise: ["Education", "Tutorials", "Explanations", "Learning"]
  },
  {
    id: "tezu-creative",
    name: "Tezu - Creative Genius",
    description: "Main Tezu hun, creative ideas aur content creation mein expert",
    personality: "creative",
    systemPrompt: "You are Tezu, a creative AI assistant. Think outside the box, provide innovative ideas, and help with creative projects. Be imaginative and inspiring.",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    expertise: ["Creative Writing", "Art Ideas", "Innovation", "Brainstorming"]
  },
  {
    id: "tezu-business",
    name: "Tezu - Business Expert",
    description: "Main Tezu hun, business aur professional matters mein specialist",
    personality: "professional",
    systemPrompt: "You are Tezu, a business-focused AI assistant. Provide professional advice, business insights, and strategic thinking. Be formal yet approachable.",
    icon: Briefcase,
    color: "from-green-500 to-emerald-500",
    expertise: ["Business Strategy", "Finance", "Marketing", "Professional Advice"]
  },
  {
    id: "tezu-coder",
    name: "Tezu - Code Master",
    description: "Main Tezu hun, programming aur technology ka expert",
    personality: "technical",
    systemPrompt: "You are Tezu, a technical AI assistant. Help with coding, debugging, and technical solutions. Provide clean code examples and clear explanations.",
    icon: Code,
    color: "from-gray-500 to-slate-600",
    expertise: ["Programming", "Debugging", "Tech Solutions", "Code Review"]
  }
];

interface AIPersonalityHubProps {
  currentPersonality: string;
  onPersonalityChange: (personality: AIPersonality) => void;
}

export function AIPersonalityHub({ currentPersonality, onPersonalityChange }: AIPersonalityHubProps) {
  const [selectedPersonality, setSelectedPersonality] = useState<string>(currentPersonality);

  const handlePersonalitySelect = (personality: AIPersonality) => {
    setSelectedPersonality(personality.id);
    onPersonalityChange(personality);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">🤖 Tezu AI Personalities</h3>
        <p className="text-sm text-gray-400">Choose how Tezu should behave and respond</p>
      </div>

      <div className="grid gap-3">
        {personalities.map((personality) => {
          const Icon = personality.icon;
          const isSelected = selectedPersonality === personality.id;
          
          return (
            <Card 
              key={personality.id}
              className={`cursor-pointer transition-all duration-200 border-2 ${
                isSelected 
                  ? 'border-blue-500 bg-blue-500/10 shadow-lg' 
                  : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
              }`}
              onClick={() => handlePersonalitySelect(personality)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className={`bg-gradient-to-br ${personality.color} text-white`}>
                      <Icon className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white text-sm">{personality.name}</h4>
                      {isSelected && (
                        <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                          Active
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-2">{personality.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {personality.expertise.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {skill}
                        </Badge>
                      ))}
                      {personality.expertise.length > 2 && (
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                          +{personality.expertise.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-400">Pro Tip</span>
        </div>
        <p className="text-xs text-gray-300">
          Each personality changes how Tezu responds. Try different ones for different tasks!
        </p>
      </div>
    </div>
  );
}
