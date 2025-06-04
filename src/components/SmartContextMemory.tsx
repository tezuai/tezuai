
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Brain, 
  Trash2, 
  Star,
  Clock,
  User,
  MessageSquare,
  Lightbulb,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MemoryItem {
  id: string;
  type: 'preference' | 'fact' | 'context' | 'goal';
  content: string;
  importance: 'high' | 'medium' | 'low';
  createdAt: Date;
  lastUsed: Date;
  useCount: number;
  tags: string[];
}

interface SmartContextMemoryProps {
  onMemoryUpdate: (memories: MemoryItem[]) => void;
}

export function SmartContextMemory({ onMemoryUpdate }: SmartContextMemoryProps) {
  const [memories, setMemories] = useState<MemoryItem[]>([
    {
      id: "1",
      type: "preference",
      content: "User prefers Hindi and English mixed responses",
      importance: "high",
      createdAt: new Date(),
      lastUsed: new Date(),
      useCount: 15,
      tags: ["language", "communication"]
    },
    {
      id: "2", 
      type: "fact",
      content: "User is interested in AI development and professional tools",
      importance: "high",
      createdAt: new Date(),
      lastUsed: new Date(),
      useCount: 8,
      tags: ["interests", "professional"]
    },
    {
      id: "3",
      type: "goal",
      content: "Building an advanced AI assistant application",
      importance: "high",
      createdAt: new Date(),
      lastUsed: new Date(),
      useCount: 12,
      tags: ["project", "goal"]
    }
  ]);
  const { toast } = useToast();

  useEffect(() => {
    onMemoryUpdate(memories);
  }, [memories, onMemoryUpdate]);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'preference': return <User className="w-4 h-4" />;
      case 'fact': return <Lightbulb className="w-4 h-4" />;
      case 'context': return <MessageSquare className="w-4 h-4" />;
      case 'goal': return <Target className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'preference': return 'bg-blue-500/20 text-blue-400';
      case 'fact': return 'bg-yellow-500/20 text-yellow-400';
      case 'context': return 'bg-green-500/20 text-green-400';
      case 'goal': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch(importance) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-orange-500/20 text-orange-400';
      case 'low': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const deleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
    toast({
      title: "Memory Deleted",
      description: "Memory item has been removed",
    });
  };

  const toggleImportance = (id: string) => {
    setMemories(prev => prev.map(m => {
      if (m.id === id) {
        const importanceOrder = ['low', 'medium', 'high'];
        const currentIndex = importanceOrder.indexOf(m.importance);
        const nextIndex = (currentIndex + 1) % importanceOrder.length;
        return { ...m, importance: importanceOrder[nextIndex] as any };
      }
      return m;
    }));
  };

  const clearAllMemories = () => {
    setMemories([]);
    toast({
      title: "All Memories Cleared",
      description: "Smart context memory has been reset",
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">🧠 Smart Memory</h3>
        <p className="text-sm text-gray-400">AI learns and remembers context</p>
      </div>

      {/* Memory Stats */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-blue-400">{memories.length}</div>
              <div className="text-xs text-gray-400">Total Memories</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">
                {memories.filter(m => m.importance === 'high').length}
              </div>
              <div className="text-xs text-gray-400">High Priority</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-400">
                {memories.reduce((sum, m) => sum + m.useCount, 0)}
              </div>
              <div className="text-xs text-gray-400">Total Uses</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Memory Items */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Memory Items
            </CardTitle>
            <Button
              variant="destructive"
              size="sm"
              onClick={clearAllMemories}
              disabled={memories.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {memories.map((memory) => (
                <div key={memory.id} className="p-3 bg-gray-700/50 rounded border border-gray-600">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(memory.type)}>
                        {getTypeIcon(memory.type)}
                        {memory.type}
                      </Badge>
                      <Badge 
                        className={`cursor-pointer ${getImportanceColor(memory.importance)}`}
                        onClick={() => toggleImportance(memory.id)}
                      >
                        <Star className="w-3 h-3 mr-1" />
                        {memory.importance}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMemory(memory.id)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-100 mb-2">{memory.content}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Used {memory.useCount}x
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {memory.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-600">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {memories.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No memories stored yet</p>
                  <p className="text-xs">AI will learn from your conversations</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
