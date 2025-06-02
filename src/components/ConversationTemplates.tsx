import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Code,
  FileText,
  Lightbulb,
  Mail,
  Search,
  Plus,
  Star,
  Edit,
  Trash2,
  Copy,
  Filter,
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  category: string;
  icon: string;
  prompt: string;
  systemMessage: string;
  tags: string[];
  isStarred: boolean;
  usageCount: number;
}

interface ConversationTemplatesProps {
  onTemplateSelect: (template: Template) => void;
}

export function ConversationTemplates({ onTemplateSelect }: ConversationTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Creative Writing",
      category: "creative",
      icon: "MessageSquare",
      prompt: "Help me write a creative story about",
      systemMessage: "You are a creative writing assistant. Help users craft engaging stories with vivid descriptions and compelling narratives.",
      tags: ["writing", "creative", "story"],
      isStarred: true,
      usageCount: 45,
    },
    {
      id: "2",
      name: "Code Review",
      category: "development",
      icon: "Code",
      prompt: "Please review this code and provide suggestions for improvement:",
      systemMessage: "You are a senior software engineer. Provide constructive code reviews focusing on best practices, performance, and maintainability.",
      tags: ["code", "review", "development"],
      isStarred: false,
      usageCount: 32,
    },
    {
      id: "3",
      name: "Document Analysis",
      category: "analysis",
      icon: "FileText",
      prompt: "Analyze this document and provide key insights:",
      systemMessage: "You are a document analysis expert. Extract key information, summarize main points, and provide actionable insights.",
      tags: ["analysis", "document", "insights"],
      isStarred: true,
      usageCount: 28,
    },
    {
      id: "4",
      name: "Brainstorming Session",
      category: "creative",
      icon: "Lightbulb",
      prompt: "Let's brainstorm ideas for",
      systemMessage: "You are a creative brainstorming partner. Generate diverse, innovative ideas and help users explore different perspectives.",
      tags: ["brainstorm", "ideas", "creative"],
      isStarred: false,
      usageCount: 19,
    },
    {
      id: "5",
      name: "Email Composer",
      category: "business",
      icon: "Mail",
      prompt: "Help me write a professional email about",
      systemMessage: "You are a professional communication expert. Write clear, concise, and appropriate business emails.",
      tags: ["email", "business", "communication"],
      isStarred: false,
      usageCount: 37,
    },
  ]);

  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    name: "",
    category: "general",
    prompt: "",
    systemMessage: "",
    tags: [],
  });

  const categories = [
    { id: "all", name: "All Templates", count: templates.length },
    { id: "creative", name: "Creative", count: templates.filter(t => t.category === "creative").length },
    { id: "development", name: "Development", count: templates.filter(t => t.category === "development").length },
    { id: "business", name: "Business", count: templates.filter(t => t.category === "business").length },
    { id: "analysis", name: "Analysis", count: templates.filter(t => t.category === "analysis").length },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.prompt) return;

    const template: Template = {
      id: Date.now().toString(),
      name: newTemplate.name,
      category: newTemplate.category || "general",
      icon: "MessageSquare",
      prompt: newTemplate.prompt,
      systemMessage: newTemplate.systemMessage || "",
      tags: Array.isArray(newTemplate.tags) ? newTemplate.tags : [],
      isStarred: false,
      usageCount: 0
    };

    setTemplates(prev => [template, ...prev]);
    setNewTemplate({ name: "", category: "general", prompt: "", systemMessage: "", tags: [] });
    setShowCreateDialog(false);
  };

  const handleToggleStar = (templateId: string) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, isStarred: !t.isStarred } : t
    ));
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const handleUseTemplate = (template: Template) => {
    setTemplates(prev => prev.map(t => 
      t.id === template.id ? { ...t, usageCount: t.usageCount + 1 } : t
    ));
    onTemplateSelect(template);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Conversation Templates</h3>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-3 h-3 mr-1" />
              Create
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Template Name</label>
                  <Input
                    value={newTemplate.name || ""}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter template name"
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <select
                    value={newTemplate.category || "general"}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  >
                    <option value="general">General</option>
                    <option value="creative">Creative</option>
                    <option value="development">Development</option>
                    <option value="business">Business</option>
                    <option value="analysis">Analysis</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Prompt Template</label>
                <Textarea
                  value={newTemplate.prompt || ""}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, prompt: e.target.value }))}
                  placeholder="Enter the prompt template..."
                  className="bg-gray-700 border-gray-600 min-h-20"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">System Message (Optional)</label>
                <Textarea
                  value={newTemplate.systemMessage || ""}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, systemMessage: e.target.value }))}
                  placeholder="Enter system message to guide AI behavior..."
                  className="bg-gray-700 border-gray-600 min-h-16"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Tags (comma-separated)</label>
                <Input
                  value={Array.isArray(newTemplate.tags) ? newTemplate.tags.join(', ') : ""}
                  onChange={(e) => setNewTemplate(prev => ({ 
                    ...prev, 
                    tags: e.target.value.split(',').map(t => t.trim()).filter(t => t.length > 0)
                  }))}
                  placeholder="tag1, tag2, tag3"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateDialog(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateTemplate}
                  disabled={!newTemplate.name || !newTemplate.prompt}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Create Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search templates..."
          className="pl-8 bg-gray-800 border-gray-600 text-white text-sm"
        />
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 bg-gray-800">
          {categories.slice(0, 3).map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="text-xs"
            >
              {category.name}
              <Badge variant="secondary" className="ml-1 text-xs bg-gray-600">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1 mt-4">
          <ScrollArea className="h-full">
            <div className="space-y-3">
              {filteredTemplates.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No templates found</p>
                  <p className="text-xs mt-1">Try adjusting your search or create a new template</p>
                </div>
              ) : (
                filteredTemplates.map((template) => (
                  <Card key={template.id} className="bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <MessageSquare className="w-3 h-3 text-blue-400 flex-shrink-0" />
                            <h4 className="text-sm font-medium text-white truncate">{template.name}</h4>
                            {template.isStarred && (
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mb-2 line-clamp-2">{template.prompt}</p>
                          <div className="flex items-center gap-1 mb-2">
                            {template.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                                {tag}
                              </Badge>
                            ))}
                            {template.tags.length > 3 && (
                              <span className="text-xs text-gray-500">+{template.tags.length - 3}</span>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Used {template.usageCount} times</span>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleToggleStar(template.id)}
                                className="h-6 w-6 p-0 text-gray-400 hover:text-yellow-400"
                              >
                                <Star className={`w-3 h-3 ${template.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => navigator.clipboard.writeText(template.prompt)}
                                className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteTemplate(template.id)}
                                className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleUseTemplate(template)}
                        className="w-full mt-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-600/30"
                      >
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
}
