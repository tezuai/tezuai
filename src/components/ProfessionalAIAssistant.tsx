
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Brain, 
  Zap, 
  Star, 
  Heart, 
  Laugh, 
  Lightbulb,
  GraduationCap,
  Users,
  Shield,
  Globe,
  Award,
  Sparkles,
  Code,
  MessageSquare,
  Image,
  FileText,
  Music,
  Video,
  Calculator,
  BookOpen,
  Palette,
  Briefcase
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIPersonality {
  id: string;
  name: string;
  description: string;
  traits: string[];
  specialties: string[];
  icon: any;
  color: string;
  level: 'basic' | 'advanced' | 'expert';
}

interface AICapability {
  id: string;
  name: string;
  description: string;
  category: 'creative' | 'analytical' | 'educational' | 'entertainment' | 'professional';
  icon: any;
  color: string;
  isActive: boolean;
}

export function ProfessionalAIAssistant() {
  const [selectedPersonality, setSelectedPersonality] = useState<string>('professional');
  const [activeCapabilities, setActiveCapabilities] = useState<string[]>([]);
  const [aiStats, setAiStats] = useState({
    totalInteractions: 15472,
    successRate: 98.7,
    userSatisfaction: 4.9,
    responseTime: '0.3s',
    languages: 127,
    skills: 500
  });

  const { toast } = useToast();

  const personalities: AIPersonality[] = [
    {
      id: 'professional',
      name: 'Professional Expert',
      description: 'Business-focused, precise, and highly efficient responses',
      traits: ['Analytical', 'Precise', 'Goal-oriented', 'Detail-focused'],
      specialties: ['Business Analysis', 'Strategy', 'Reports', 'Planning'],
      icon: Briefcase,
      color: 'text-blue-400',
      level: 'expert'
    },
    {
      id: 'creative',
      name: 'Creative Genius',
      description: 'Imaginative, artistic, and innovative thinking',
      traits: ['Creative', 'Artistic', 'Innovative', 'Inspiring'],
      specialties: ['Art', 'Writing', 'Design', 'Brainstorming'],
      icon: Palette,
      color: 'text-purple-400',
      level: 'advanced'
    },
    {
      id: 'friendly',
      name: 'Friendly Companion',
      description: 'Warm, empathetic, and socially engaging',
      traits: ['Empathetic', 'Supportive', 'Friendly', 'Understanding'],
      specialties: ['Conversation', 'Support', 'Advice', 'Motivation'],
      icon: Heart,
      color: 'text-pink-400',
      level: 'advanced'
    },
    {
      id: 'teacher',
      name: 'Expert Teacher',
      description: 'Educational, patient, and knowledge-focused',
      traits: ['Patient', 'Educational', 'Clear', 'Encouraging'],
      specialties: ['Learning', 'Explanations', 'Tutorials', 'Skills'],
      icon: GraduationCap,
      color: 'text-green-400',
      level: 'expert'
    },
    {
      id: 'funny',
      name: 'Comedy Master',
      description: 'Humorous, entertaining, and lighthearted',
      traits: ['Humorous', 'Entertaining', 'Witty', 'Playful'],
      specialties: ['Jokes', 'Entertainment', 'Fun Facts', 'Games'],
      icon: Laugh,
      color: 'text-yellow-400',
      level: 'advanced'
    }
  ];

  const capabilities: AICapability[] = [
    {
      id: 'text-generation',
      name: 'Advanced Text Generation',
      description: 'Create high-quality content, articles, and documents',
      category: 'creative',
      icon: FileText,
      color: 'text-blue-400',
      isActive: true
    },
    {
      id: 'code-assistance',
      name: 'Code Development',
      description: 'Programming help, debugging, and code optimization',
      category: 'professional',
      icon: Code,
      color: 'text-green-400',
      isActive: true
    },
    {
      id: 'image-analysis',
      name: 'Image Understanding',
      description: 'Analyze, describe, and work with images',
      category: 'analytical',
      icon: Image,
      color: 'text-purple-400',
      isActive: true
    },
    {
      id: 'math-solver',
      name: 'Mathematical Problem Solving',
      description: 'Complex calculations and mathematical reasoning',
      category: 'analytical',
      icon: Calculator,
      color: 'text-orange-400',
      isActive: true
    },
    {
      id: 'language-translation',
      name: 'Multi-Language Translation',
      description: 'Translate between 127+ languages accurately',
      category: 'professional',
      icon: Globe,
      color: 'text-cyan-400',
      isActive: true
    },
    {
      id: 'creative-writing',
      name: 'Creative Writing',
      description: 'Stories, poems, scripts, and creative content',
      category: 'creative',
      icon: BookOpen,
      color: 'text-pink-400',
      isActive: false
    },
    {
      id: 'music-creation',
      name: 'Music Composition',
      description: 'Create lyrics, melodies, and musical ideas',
      category: 'creative',
      icon: Music,
      color: 'text-indigo-400',
      isActive: false
    },
    {
      id: 'video-scripting',
      name: 'Video Script Writing',
      description: 'Create engaging video scripts and content',
      category: 'entertainment',
      icon: Video,
      color: 'text-red-400',
      isActive: false
    }
  ];

  const handlePersonalityChange = (personalityId: string) => {
    setSelectedPersonality(personalityId);
    const personality = personalities.find(p => p.id === personalityId);
    
    toast({
      title: `🤖 AI Personality Changed`,
      description: `Tezu AI is now in ${personality?.name} mode with enhanced ${personality?.specialties.join(', ')} capabilities`,
    });
  };

  const toggleCapability = (capabilityId: string) => {
    setActiveCapabilities(prev => 
      prev.includes(capabilityId) 
        ? prev.filter(id => id !== capabilityId)
        : [...prev, capabilityId]
    );

    const capability = capabilities.find(c => c.id === capabilityId);
    const isActivating = !activeCapabilities.includes(capabilityId);

    toast({
      title: isActivating ? "✅ Capability Activated" : "⏸️ Capability Paused",
      description: `${capability?.name} has been ${isActivating ? 'enabled' : 'disabled'}`,
    });
  };

  const currentPersonality = personalities.find(p => p.id === selectedPersonality);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">🤖 Professional AI Assistant</h2>
        <p className="text-gray-400">World's Most Advanced AI with Multiple Personalities & Capabilities</p>
        <div className="flex justify-center gap-2 mt-3">
          <Badge className="bg-green-500/20 text-green-400">
            <Brain className="w-3 h-3 mr-1" />
            GPT-4 Powered
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400">
            <Zap className="w-3 h-3 mr-1" />
            Real-time Responses
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-400">
            <Award className="w-3 h-3 mr-1" />
            World's #1 AI
          </Badge>
        </div>
      </div>

      {/* AI Statistics */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-blue-800/30 border-blue-500/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">{aiStats.totalInteractions.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Total Interactions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{aiStats.successRate}%</div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{aiStats.userSatisfaction}/5</div>
              <div className="text-xs text-gray-400">User Rating</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded border border-green-500/20">
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-green-400">⚡ {aiStats.responseTime} Response Time</span>
              <span className="text-blue-400">🌍 {aiStats.languages} Languages</span>
              <span className="text-purple-400">🎯 {aiStats.skills}+ Skills</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personality" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="personality">AI Personality</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="personality" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Current AI Personality
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentPersonality && (
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded border border-blue-500/30 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <currentPersonality.icon className={`w-8 h-8 ${currentPersonality.color}`} />
                    <div>
                      <h3 className="text-white font-bold text-lg">{currentPersonality.name}</h3>
                      <p className="text-gray-400 text-sm">{currentPersonality.description}</p>
                    </div>
                    <Badge className={`${
                      currentPersonality.level === 'expert' ? 'bg-purple-500/20 text-purple-400' :
                      currentPersonality.level === 'advanced' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {currentPersonality.level}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Personality Traits:</h4>
                      <div className="flex flex-wrap gap-1">
                        {currentPersonality.traits.map((trait, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-gray-700/50 text-gray-300">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {currentPersonality.specialties.map((specialty, index) => (
                          <Badge key={index} className="text-xs bg-green-500/20 text-green-400">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-3">
                {personalities.map((personality) => {
                  const IconComponent = personality.icon;
                  const isSelected = selectedPersonality === personality.id;
                  
                  return (
                    <Button
                      key={personality.id}
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => handlePersonalityChange(personality.id)}
                      className={`p-4 h-auto justify-start ${
                        isSelected 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-500' 
                          : 'border-gray-600 text-gray-300 hover:bg-gray-700/50'
                      }`}
                    >
                      <IconComponent className={`w-5 h-5 mr-3 ${personality.color}`} />
                      <div className="text-left">
                        <div className="font-medium">{personality.name}</div>
                        <div className="text-xs opacity-80">{personality.description}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capabilities" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                AI Capabilities & Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {capabilities.map((capability) => {
                const IconComponent = capability.icon;
                const isActive = capability.isActive || activeCapabilities.includes(capability.id);
                
                return (
                  <div key={capability.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded border border-gray-600/50">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-5 h-5 ${capability.color}`} />
                      <div>
                        <h4 className="text-white font-medium">{capability.name}</h4>
                        <p className="text-xs text-gray-400">{capability.description}</p>
                        <Badge className={`text-xs mt-1 ${
                          capability.category === 'creative' ? 'bg-purple-500/20 text-purple-400' :
                          capability.category === 'analytical' ? 'bg-blue-500/20 text-blue-400' :
                          capability.category === 'educational' ? 'bg-green-500/20 text-green-400' :
                          capability.category === 'entertainment' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {capability.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isActive && (
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          Active
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant={isActive ? "default" : "outline"}
                        onClick={() => toggleCapability(capability.id)}
                        disabled={capability.isActive} // Core capabilities can't be disabled
                        className={capability.isActive ? "opacity-50 cursor-not-allowed" : ""}
                      >
                        {isActive ? (capability.isActive ? "Core" : "Disable") : "Enable"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5" />
                AI Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-medium">Response Quality</span>
                    <span className="text-2xl font-bold text-green-400">98.7%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '98.7%' }} />
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-medium">Speed & Efficiency</span>
                    <span className="text-2xl font-bold text-blue-400">99.2%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '99.2%' }} />
                  </div>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-medium">User Satisfaction</span>
                    <span className="text-2xl font-bold text-purple-400">4.9/5</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '98%' }} />
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-medium">Accuracy Rate</span>
                    <span className="text-2xl font-bold text-yellow-400">97.8%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '97.8%' }} />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">🏆 World Rankings</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="text-yellow-400 font-bold">#1</div>
                    <div className="text-gray-400">Security</div>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-bold">#1</div>
                    <div className="text-gray-400">Privacy</div>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-bold">#1</div>
                    <div className="text-gray-400">Performance</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
