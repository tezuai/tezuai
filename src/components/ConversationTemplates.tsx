
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Plus, 
  Code, 
  Lightbulb, 
  BookOpen, 
  Calculator, 
  MessageSquare,
  Edit,
  Trash2,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  prompt: string;
  systemMessage?: string;
  tags: string[];
  isStarred: boolean;
  usageCount: number;
}

interface ConversationTemplatesProps {
  onTemplateSelect: (template: Template) => void;
}

const defaultTemplates: Template[] = [
  {
    id: "1",
    name: "Code Review",
    description: "Get detailed code reviews and suggestions",
    category: "Development",
    icon: "Code",
    prompt: "Please review the following code and provide detailed feedback on:\n1. Code quality and best practices\n2. Potential bugs or issues\n3. Performance optimizations\n4. Suggestions for improvement\n\nCode:",
    systemMessage: "You are an expert code reviewer with years of experience in software development. Provide thorough, constructive feedback.",
    tags: ["coding", "review", "development"],
    isStarred: true,
    usageCount: 45
  },
  {
    id: "2",
    name: "Creative Writing",
    description: "Brainstorm and develop creative writing ideas",
    category: "Writing",
    icon: "FileText",
    prompt: "Help me brainstorm and develop creative writing ideas for:\n\nGenre: [Specify genre]\nTheme: [Specify theme]\nTarget audience: [Specify audience]\n\nPlease provide:\n1. Plot ideas\n2. Character suggestions\n3. Setting recommendations\n4. Conflict scenarios",
    systemMessage: "You are a creative writing mentor with expertise in storytelling, character development, and narrative structure.",
    tags: ["writing", "creative", "storytelling"],
    isStarred: false,
    usageCount: 23
  },
  {
    id: "3",
    name: "Business Analysis",
    description: "Analyze business problems and strategies",
    category: "Business",
    icon: "Calculator",
    prompt: "Please analyze the following business scenario and provide:\n1. Problem identification\n2. Market analysis\n3. Strategic recommendations\n4. Risk assessment\n5. Implementation roadmap\n\nBusiness scenario:",
    systemMessage: "You are a senior business consultant with expertise in strategy, operations, and market analysis.",
    tags: ["business", "strategy", "analysis"],
    isStarred: true,
    usageCount: 67
  },
  {
    id: "4",
    name: "Learning Companion",
    description: "Interactive learning and explanation of topics",
    category: "Education",
    icon: "BookOpen",
    prompt: "I want to learn about: [Topic]\n\nPlease provide:\n1. Clear explanation with examples\n2. Key concepts to remember\n3. Practical applications\n4. Related topics to explore\n5. Quiz questions to test understanding",
    systemMessage: "You are an expert educator who excels at breaking down complex topics into understandable lessons.",
    tags: ["education", "learning", "teaching"],
    isStarred: false,
    usageCount: 89
  },
  {
    id: "5",
    name: "Problem Solver",
    description: "Systematic approach to solving complex problems",
    category: "General",
    icon: "Lightbulb",
    prompt: "Help me solve this problem using a systematic approach:\n\nProblem: [Describe your problem]\n\nPlease provide:\n1. Problem breakdown\n2. Root cause analysis\n3. Multiple solution options\n4. Pros and cons of each solution\n5. Recommended action plan",
    systemMessage: "You are a problem-solving expert who uses structured thinking and analytical frameworks.",
    tags: ["problem-solving", "analysis", "strategy"],
    isStarred: true,
    usageCount: 156
  }
];

export function ConversationTemplates({ onTemplateSelect }: ConversationTemplatesProps) {
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    name: "",
    description: "",
    category: "General",
    prompt: "",
    systemMessage: "",
    tags: [],
    isStarred: false
  });
  const { toast } = useToast();

  const categories = ["All", ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Code,
      FileText,
      Calculator,
      BookOpen,
      Lightbulb,
      MessageSquare
    };
    const IconComponent = icons[iconName] || MessageSquare;
    return <IconComponent className="w-5 h-5" />;
  };

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.prompt) {
      toast({
        title: "Error",
        description: "Please fill in required fields (name and prompt).",
        variant: "destructive",
      });
      return;
    }

    const template: Template = {
      id: Date.now().toString(),
      name: newTemplate.name!,
      description: newTemplate.description || "",
      category: newTemplate.category || "General",
      icon: "MessageSquare",
      prompt: newTemplate.prompt!,
      systemMessage: newTemplate.systemMessage || "",
      tags: Array.isArray(newTemplate.tags) ? 
            newTemplate.tags : 
            (typeof newTemplate.tags === 'string' ? 
             newTemplate.tags.split(',').map(t => t.trim()).filter(t => t) : 
             []),
      isStarred: false,
      usageCount: 0
    };

    setTemplates(prev => [...prev, template]);
    setNewTemplate({
      name: "",
      description: "",
      category: "General",
      prompt: "",
      systemMessage: "",
      tags: [],
      isStarred: false
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Template Created",
      description: "Your custom template has been created successfully.",
    });
  };

  const handleTemplateClick = (template: Template) => {
    // Update usage count
    setTemplates(prev => prev.map(t => 
      t.id === template.id ? { ...t, usageCount: t.usageCount + 1 } : t
    ));
    
    onTemplateSelect(template);
    
    toast({
      title: "Template Applied",
      description: `Using template: ${template.name}`,
    });
  };

  const toggleStar = (templateId: string) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, isStarred: !t.isStarred } : t
    ));
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    toast({
      title: "Template Deleted",
      description: "Template has been removed successfully.",
    });
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Conversation Templates
          </CardTitle>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Create
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Custom Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Name *</label>
                    <Input
                      value={newTemplate.name || ""}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Template name"
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <Select
                      value={newTemplate.category}
                      onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Writing">Writing</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Input
                    value={newTemplate.description || ""}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the template"
                    className="bg-gray-700 border-gray-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Prompt *</label>
                  <Textarea
                    value={newTemplate.prompt || ""}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, prompt: e.target.value }))}
                    placeholder="Enter the template prompt..."
                    className="bg-gray-700 border-gray-600 min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">System Message</label>
                  <Textarea
                    value={newTemplate.systemMessage || ""}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, systemMessage: e.target.value }))}
                    placeholder="Optional system message to set AI behavior..."
                    className="bg-gray-700 border-gray-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Tags (comma-separated)</label>
                  <Input
                    value={Array.isArray(newTemplate.tags) ? newTemplate.tags.join(', ') : ""}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) }))}
                    placeholder="tag1, tag2, tag3"
                    className="bg-gray-700 border-gray-600"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateTemplate} className="flex-1">
                    Create Template
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="flex-1 bg-gray-700/50 border-gray-600 text-white"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-32 bg-gray-700/50 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {categories.map(category => (
                <SelectItem key={category} value={category} className="text-white">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Templates */}
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="bg-gray-700/30 border-gray-600 hover:bg-gray-700/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 cursor-pointer" onClick={() => handleTemplateClick(template)}>
                      <div className="flex items-center gap-2 mb-2">
                        {getIcon(template.icon)}
                        <h3 className="font-medium text-white">{template.name}</h3>
                        {template.isStarred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{template.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Used {template.usageCount} times
                        </Badge>
                        {template.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(template.id);
                        }}
                        className="p-1 h-7 w-7"
                      >
                        <Star className={`w-3 h-3 ${template.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                      </Button>
                      {!defaultTemplates.find(dt => dt.id === template.id) && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTemplate(template.id);
                          }}
                          className="p-1 h-7 w-7 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
