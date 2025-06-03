
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  Clock, 
  Tag, 
  Search, 
  Trash2, 
  Star,
  TrendingUp,
  User,
  Calendar
} from "lucide-react";

interface MemoryItem {
  id: string;
  content: string;
  category: string;
  importance: number;
  timestamp: Date;
  frequency: number;
  tags: string[];
  isStarred: boolean;
}

interface SmartContextMemoryProps {
  userId: string;
  onMemoryUpdate: (memories: MemoryItem[]) => void;
}

export function SmartContextMemory({ userId, onMemoryUpdate }: SmartContextMemoryProps) {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", icon: Brain },
    { id: "personal", name: "Personal", icon: User },
    { id: "work", name: "Work", icon: TrendingUp },
    { id: "preferences", name: "Preferences", icon: Star },
    { id: "facts", name: "Facts", icon: Tag }
  ];

  // Load memories from localStorage
  useEffect(() => {
    const savedMemories = localStorage.getItem(`tezu-memories-${userId}`);
    if (savedMemories) {
      const parsed = JSON.parse(savedMemories).map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      }));
      setMemories(parsed);
    }
  }, [userId]);

  // Save memories to localStorage
  useEffect(() => {
    if (memories.length > 0) {
      localStorage.setItem(`tezu-memories-${userId}`, JSON.stringify(memories));
      onMemoryUpdate(memories);
    }
  }, [memories, userId, onMemoryUpdate]);

  // Add new memory
  const addMemory = (content: string, category: string = "personal") => {
    const newMemory: MemoryItem = {
      id: Date.now().toString(),
      content,
      category,
      importance: 1,
      timestamp: new Date(),
      frequency: 1,
      tags: extractTags(content),
      isStarred: false
    };

    setMemories(prev => [newMemory, ...prev.slice(0, 49)]); // Keep only 50 memories
  };

  // Extract tags from content
  const extractTags = (content: string): string[] => {
    const words = content.toLowerCase().split(' ');
    return words.filter(word => 
      word.length > 3 && 
      !['this', 'that', 'with', 'from', 'they', 'have', 'been', 'were'].includes(word)
    ).slice(0, 3);
  };

  // Toggle star
  const toggleStar = (id: string) => {
    setMemories(prev => prev.map(m => 
      m.id === id ? { ...m, isStarred: !m.isStarred } : m
    ));
  };

  // Delete memory
  const deleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
  };

  // Filter memories
  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.tags.some(tag => tag.includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || memory.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Auto-learn from conversation (this would be called from ChatInterface)
  const learnFromMessage = (message: string, isUser: boolean) => {
    if (isUser && message.length > 10) {
      // Extract personal information
      const personalPatterns = [
        /my name is (\w+)/i,
        /i am (\w+)/i,
        /i like (\w+)/i,
        /i work at (\w+)/i,
        /i live in (\w+)/i
      ];

      personalPatterns.forEach(pattern => {
        const match = message.match(pattern);
        if (match) {
          addMemory(`User: ${match[0]}`, "personal");
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-2">🧠 Smart Memory</h3>
        <p className="text-sm text-gray-400">Tezu remembers important details about you</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search memories..."
          className="pl-10 bg-gray-800/50 border-gray-600 text-white"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-1 whitespace-nowrap"
            >
              <Icon className="w-3 h-3" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Memories List */}
      <ScrollArea className="h-64">
        <div className="space-y-2">
          {filteredMemories.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No memories found</p>
              <p className="text-xs text-gray-500">Start chatting to build your memory</p>
            </div>
          ) : (
            filteredMemories.map((memory) => (
              <Card key={memory.id} className="bg-gray-800/30 border-gray-700/50">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white mb-1">{memory.content}</p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {memory.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {memory.timestamp.toLocaleDateString()}
                        </div>
                      </div>

                      {memory.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {memory.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStar(memory.id)}
                        className={`p-1 h-6 w-6 ${memory.isStarred ? 'text-yellow-400' : 'text-gray-400'}`}
                      >
                        <Star className="w-3 h-3" fill={memory.isStarred ? 'currentColor' : 'none'} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMemory(memory.id)}
                        className="p-1 h-6 w-6 text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-800/30 rounded-lg p-2">
          <div className="text-lg font-bold text-blue-400">{memories.length}</div>
          <div className="text-xs text-gray-400">Memories</div>
        </div>
        <div className="bg-gray-800/30 rounded-lg p-2">
          <div className="text-lg font-bold text-yellow-400">{memories.filter(m => m.isStarred).length}</div>
          <div className="text-xs text-gray-400">Starred</div>
        </div>
        <div className="bg-gray-800/30 rounded-lg p-2">
          <div className="text-lg font-bold text-green-400">{new Set(memories.map(m => m.category)).size}</div>
          <div className="text-xs text-gray-400">Categories</div>
        </div>
      </div>
    </div>
  );
}
