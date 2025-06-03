
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Search, 
  Star, 
  Plus,
  Brain,
  Briefcase,
  BookOpen,
  Heart,
  Code,
  Palette,
  Calculator,
  Globe,
  Zap,
  Target
} from "lucide-react";

interface Template {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  icon: any;
  color: string;
  isStarred: boolean;
  useCount: number;
  tags: string[];
}

const predefinedTemplates: Template[] = [
  {
    id: "learning-helper",
    title: "Learning Assistant",
    description: "Help me understand complex topics step by step",
    prompt: "मैं Tezu हूँ, आपका learning assistant। मैं complex topics को simple steps में explain करूंगा। आप कौन सा topic सीखना चाहते हैं?",
    category: "education",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    isStarred: false,
    useCount: 45,
    tags: ["learning", "education", "explain", "study"]
  },
  {
    id: "creative-writer",
    title: "Creative Writing Partner",
    description: "Help with stories, poems, and creative content",
    prompt: "मैं Tezu हूँ, आपका creative writing partner। आज हम कौन सी creative story या content बनाएंगे? Ideas, plots, characters - सब कुछ में help करूंगा!",
    category: "creative",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    isStarred: true,
    useCount: 32,
    tags: ["writing", "creative", "story", "content"]
  },
  {
    id: "business-advisor",
    title: "Business Consultant",
    description: "Business strategy, planning, and advice",
    prompt: "मैं Tezu हूँ, आपका business consultant। Business planning, strategy, marketing, या growth के लिए expert advice चाहिए? Let's discuss your business goals!",
    category: "business",
    icon: Briefcase,
    color: "from-green-500 to-emerald-500",
    isStarred: false,
    useCount: 28,
    tags: ["business", "strategy", "planning", "growth"]
  },
  {
    id: "coding-mentor",
    title: "Programming Mentor",
    description: "Help with coding, debugging, and tech solutions",
    prompt: "मैं Tezu हूँ, आपका programming mentor। Code में कोई problem? New language सीखना है? Debugging help चाहिए? Let's code together!",
    category: "technical",
    icon: Code,
    color: "from-gray-600 to-slate-700",
    isStarred: true,
    useCount: 56,
    tags: ["coding", "programming", "debugging", "tech"]
  },
  {
    id: "life-coach",
    title: "Life Coach & Motivator",
    description: "Personal development and motivation",
    prompt: "मैं Tezu हूँ, आपका life coach। Life में कोई challenge है? Goals achieve करने हैं? Motivation चाहिए? Main आपकी हर step में support करूंगा!",
    category: "personal",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    isStarred: false,
    useCount: 41,
    tags: ["motivation", "life", "goals", "personal"]
  },
  {
    id: "math-tutor",
    title: "Math Problem Solver",
    description: "Solve math problems with detailed explanations",
    prompt: "मैं Tezu हूँ, आपका math tutor। कोई भी math problem हो - algebra, calculus, geometry - step by step solution के साथ explain करूंगा।",
    category: "education",
    icon: Calculator,
    color: "from-orange-500 to-red-500",
    isStarred: false,
    useCount: 23,
    tags: ["math", "problem", "solve", "calculation"]
  },
  {
    id: "language-teacher",
    title: "Language Learning Partner",
    description: "Learn new languages with conversation practice",
    prompt: "मैं Tezu हूँ, आपका language learning partner। कौन सी language सीखना चाहते हैं? Conversation practice, grammar, vocabulary - सब कुछ में help करूंगा!",
    category: "education",
    icon: Globe,
    color: "from-teal-500 to-blue-500",
    isStarred: true,
    useCount: 37,
    tags: ["language", "learning", "conversation", "practice"]
  },
  {
    id: "productivity-coach",
    title: "Productivity Optimizer",
    description: "Improve productivity and time management",
    prompt: "मैं Tezu हूँ, आपका productivity coach। Time management, task planning, efficiency improve करना है? Let's optimize your daily routine!",
    category: "personal",
    icon: Target,
    color: "from-yellow-500 to-orange-500",
    isStarred: false,
    useCount: 19,
    tags: ["productivity", "time", "management", "efficiency"]
  }
];

interface SmartTemplatesProps {
  onTemplateSelect: (template: Template) => void;
}

export function SmartTemplates({ onTemplateSelect }: SmartTemplatesProps) {
  const [templates, setTemplates] = useState<Template[]>(predefinedTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", icon: FileText },
    { id: "education", name: "Education", icon: BookOpen },
    { id: "creative", name: "Creative", icon: Palette },
    { id: "business", name: "Business", icon: Briefcase },
    { id: "technical", name: "Technical", icon: Code },
    { id: "personal", name: "Personal", icon: Heart }
  ];

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle star
  const toggleStar = (id: string) => {
    setTemplates(prev => prev.map(t => 
      t.id === id ? { ...t, isStarred: !t.isStarred } : t
    ));
  };

  // Use template
  const useTemplate = (template: Template) => {
    // Increment use count
    setTemplates(prev => prev.map(t => 
      t.id === template.id ? { ...t, useCount: t.useCount + 1 } : t
    ));
    
    onTemplateSelect(template);
  };

  // Sort templates by popularity
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (a.isStarred && !b.isStarred) return -1;
    if (!a.isStarred && b.isStarred) return 1;
    return b.useCount - a.useCount;
  });

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-2">📝 Smart Templates</h3>
        <p className="text-sm text-gray-400">Ready-made prompts for different tasks</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search templates..."
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

      {/* Templates List */}
      <ScrollArea className="h-80">
        <div className="space-y-3">
          {sortedTemplates.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No templates found</p>
              <p className="text-xs text-gray-500">Try different search terms</p>
            </div>
          ) : (
            sortedTemplates.map((template) => {
              const Icon = template.icon;
              
              return (
                <Card 
                  key={template.id}
                  className="cursor-pointer transition-all duration-200 hover:border-gray-500 bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50"
                  onClick={() => useTemplate(template)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white text-sm">{template.title}</h4>
                          <div className="flex items-center gap-1">
                            {template.isStarred && (
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStar(template.id);
                              }}
                              className={`p-0 h-auto w-auto ${template.isStarred ? 'text-yellow-400' : 'text-gray-400'}`}
                            >
                              <Star className="w-3 h-3" fill={template.isStarred ? 'currentColor' : 'none'} />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-400 mb-2">{template.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1 flex-wrap">
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                              {template.category}
                            </Badge>
                            {template.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Zap className="w-3 h-3" />
                            {template.useCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Create Custom Template */}
      <Button 
        variant="outline" 
        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700/50"
        onClick={() => {
          // In real app, open dialog to create custom template
          alert("Custom template creation coming soon!");
        }}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Custom Template
      </Button>

      {/* Popular Templates */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Star className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Most Popular</h4>
              <p className="text-sm text-gray-300 mb-2">
                "{templates.sort((a, b) => b.useCount - a.useCount)[0]?.title}" is the most used template this week!
              </p>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                {templates.sort((a, b) => b.useCount - a.useCount)[0]?.useCount} uses
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
