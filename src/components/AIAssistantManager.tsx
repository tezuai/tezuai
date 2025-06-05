
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Bot, 
  Brain, 
  Zap, 
  Settings,
  Star,
  Play,
  Pause,
  Plus,
  Users,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIAssistant {
  id: string;
  name: string;
  role: string;
  personality: string;
  expertise: string[];
  performance: number;
  status: 'active' | 'training' | 'idle';
  tasks: number;
  color: string;
}

export function AIAssistantManager() {
  const [assistants, setAssistants] = useState<AIAssistant[]>([
    {
      id: '1',
      name: 'Tezu Pro',
      role: 'General Assistant',
      personality: 'Friendly & Professional',
      expertise: ['Customer Support', 'Content Writing', 'Analysis'],
      performance: 95,
      status: 'active',
      tasks: 127,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '2',
      name: 'CodeMaster AI',
      role: 'Programming Expert',
      personality: 'Technical & Precise',
      expertise: ['React', 'Python', 'DevOps', 'System Design'],
      performance: 92,
      status: 'active',
      tasks: 89,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '3',
      name: 'BusinessBot',
      role: 'Business Consultant',
      personality: 'Strategic & Data-driven',
      expertise: ['Strategy', 'Analytics', 'Marketing', 'Finance'],
      performance: 88,
      status: 'training',
      tasks: 45,
      color: 'from-purple-500 to-pink-500'
    }
  ]);

  const [newAssistant, setNewAssistant] = useState({
    name: '',
    role: '',
    personality: '',
    expertise: ''
  });

  const { toast } = useToast();

  const handleCreateAssistant = () => {
    if (!newAssistant.name || !newAssistant.role) {
      toast({
        title: "Missing Information",
        description: "Please provide assistant name and role",
        variant: "destructive"
      });
      return;
    }

    const assistant: AIAssistant = {
      id: Date.now().toString(),
      name: newAssistant.name,
      role: newAssistant.role,
      personality: newAssistant.personality || 'Professional',
      expertise: newAssistant.expertise.split(',').map(e => e.trim()),
      performance: 85,
      status: 'training',
      tasks: 0,
      color: 'from-orange-500 to-red-500'
    };

    setAssistants(prev => [...prev, assistant]);
    setNewAssistant({ name: '', role: '', personality: '', expertise: '' });
    
    toast({
      title: "🤖 AI Assistant Created!",
      description: "Your new AI assistant is being trained",
    });
  };

  const toggleAssistantStatus = (id: string) => {
    setAssistants(prev => prev.map(a => 
      a.id === id 
        ? { ...a, status: a.status === 'active' ? 'idle' : 'active' }
        : a
    ));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">🤖 AI Assistant Manager</h3>
        <p className="text-sm text-gray-400">Create and manage specialized AI assistants</p>
      </div>

      {/* Create New Assistant */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-blue-800/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Assistant name (e.g., Sales Expert)"
            value={newAssistant.name}
            onChange={(e) => setNewAssistant(prev => ({ ...prev, name: e.target.value }))}
            className="bg-gray-700/50 border-blue-500/30 text-white"
          />
          <Input
            placeholder="Role (e.g., Customer Support Specialist)"
            value={newAssistant.role}
            onChange={(e) => setNewAssistant(prev => ({ ...prev, role: e.target.value }))}
            className="bg-gray-700/50 border-blue-500/30 text-white"
          />
          <Input
            placeholder="Personality (e.g., Friendly & Helpful)"
            value={newAssistant.personality}
            onChange={(e) => setNewAssistant(prev => ({ ...prev, personality: e.target.value }))}
            className="bg-gray-700/50 border-blue-500/30 text-white"
          />
          <Input
            placeholder="Expertise (comma separated)"
            value={newAssistant.expertise}
            onChange={(e) => setNewAssistant(prev => ({ ...prev, expertise: e.target.value }))}
            className="bg-gray-700/50 border-blue-500/30 text-white"
          />
          <Button 
            onClick={handleCreateAssistant}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600"
          >
            <Bot className="w-4 h-4 mr-2" />
            Create Assistant
          </Button>
        </CardContent>
      </Card>

      {/* AI Assistants */}
      <div className="space-y-3">
        {assistants.map((assistant) => (
          <Card key={assistant.id} className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${assistant.color} flex items-center justify-center`}>
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{assistant.name}</h4>
                    <p className="text-sm text-gray-400">{assistant.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${
                    assistant.status === 'active' 
                      ? 'bg-green-500/20 text-green-400'
                      : assistant.status === 'training'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {assistant.status}
                  </Badge>
                  <Switch
                    checked={assistant.status === 'active'}
                    onCheckedChange={() => toggleAssistantStatus(assistant.id)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Performance:</span>
                  <span className="text-green-400">{assistant.performance}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${assistant.performance}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Brain className="w-3 h-3 text-purple-400" />
                  <span className="text-xs text-gray-400">Personality:</span>
                  <span className="text-xs text-purple-300">{assistant.personality}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {assistant.expertise.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs text-blue-300 border-blue-500/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Tasks completed: {assistant.tasks}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span>Expert Level</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
