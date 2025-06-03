
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Copy, 
  Star,
  Briefcase,
  Code,
  GraduationCap,
  Mail,
  Heart,
  TrendingUp,
  Lightbulb,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfessionalTemplatesProps {
  onTemplateSelect: (template: any) => void;
}

export function ProfessionalTemplates({ onTemplateSelect }: ProfessionalTemplatesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("business");
  const { toast } = useToast();

  const templateCategories = [
    { id: "business", name: "Business", icon: Briefcase },
    { id: "coding", name: "Coding", icon: Code },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "marketing", name: "Marketing", icon: TrendingUp },
    { id: "creative", name: "Creative", icon: Lightbulb },
    { id: "personal", name: "Personal", icon: Heart }
  ];

  const templates = {
    business: [
      {
        id: "business-email",
        title: "Professional Email",
        description: "Formal business email template",
        prompt: "Write a professional business email about [TOPIC] to [RECIPIENT] with formal tone and clear call-to-action",
        category: "business",
        rating: 4.8,
        uses: 2140
      },
      {
        id: "meeting-agenda",
        title: "Meeting Agenda",
        description: "Structured meeting agenda template",
        prompt: "Create a detailed meeting agenda for [MEETING_TYPE] with objectives, topics, time allocation, and action items",
        category: "business",
        rating: 4.7,
        uses: 1890
      },
      {
        id: "proposal",
        title: "Business Proposal",
        description: "Professional project proposal",
        prompt: "Draft a comprehensive business proposal for [PROJECT_NAME] including executive summary, scope, timeline, and budget",
        category: "business",
        rating: 4.9,
        uses: 1560
      }
    ],
    coding: [
      {
        id: "code-review",
        title: "Code Review",
        description: "Comprehensive code review template",
        prompt: "Perform a detailed code review for [PROGRAMMING_LANGUAGE] code, focusing on best practices, security, and optimization",
        category: "coding",
        rating: 4.8,
        uses: 1340
      },
      {
        id: "api-docs",
        title: "API Documentation",
        description: "Clear API documentation template",
        prompt: "Create comprehensive API documentation for [API_NAME] including endpoints, parameters, responses, and examples",
        category: "coding",
        rating: 4.6,
        uses: 980
      },
      {
        id: "debug-help",
        title: "Debug Assistant",
        description: "Systematic debugging approach",
        prompt: "Help debug [PROGRAMMING_LANGUAGE] code error: [ERROR_DESCRIPTION] with step-by-step troubleshooting",
        category: "coding",
        rating: 4.7,
        uses: 2100
      }
    ],
    education: [
      {
        id: "lesson-plan",
        title: "Lesson Plan",
        description: "Structured educational lesson plan",
        prompt: "Create a detailed lesson plan for [SUBJECT] topic: [TOPIC] for [GRADE_LEVEL] with objectives, activities, and assessment",
        category: "education",
        rating: 4.8,
        uses: 1680
      },
      {
        id: "study-guide",
        title: "Study Guide",
        description: "Comprehensive study guide template",
        prompt: "Generate a comprehensive study guide for [SUBJECT] covering [TOPICS] with key concepts, practice questions, and summaries",
        category: "education",
        rating: 4.7,
        uses: 2340
      }
    ],
    marketing: [
      {
        id: "social-media",
        title: "Social Media Post",
        description: "Engaging social media content",
        prompt: "Create engaging social media content for [PLATFORM] about [TOPIC] with hashtags and call-to-action",
        category: "marketing",
        rating: 4.6,
        uses: 3200
      },
      {
        id: "product-description",
        title: "Product Description",
        description: "Compelling product descriptions",
        prompt: "Write a compelling product description for [PRODUCT_NAME] highlighting features, benefits, and unique selling points",
        category: "marketing",
        rating: 4.8,
        uses: 1950
      }
    ],
    creative: [
      {
        id: "story-writing",
        title: "Creative Story",
        description: "Creative storytelling template",
        prompt: "Write a creative story about [THEME] with engaging characters, plot twists, and vivid descriptions",
        category: "creative",
        rating: 4.9,
        uses: 2800
      },
      {
        id: "poem-generator",
        title: "Poetry Generator",
        description: "Beautiful poetry creation",
        prompt: "Create a beautiful poem about [TOPIC] in [STYLE] with emotional depth and artistic language",
        category: "creative",
        rating: 4.7,
        uses: 1420
      }
    ],
    personal: [
      {
        id: "thank-you-note",
        title: "Thank You Note",
        description: "Heartfelt thank you message",
        prompt: "Write a heartfelt thank you note for [REASON] to [PERSON] expressing genuine gratitude and appreciation",
        category: "personal",
        rating: 4.8,
        uses: 1680
      }
    ]
  };

  const filteredTemplates = templates[selectedCategory as keyof typeof templates]?.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleTemplateSelect = (template: any) => {
    onTemplateSelect(template);
    toast({
      title: "Template Applied! 📝",
      description: `${template.title} template is ready to use`,
    });
  };

  const copyTemplate = (template: any) => {
    navigator.clipboard.writeText(template.prompt);
    toast({
      title: "Template Copied! 📋",
      description: "Template prompt copied to clipboard",
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">📚 Professional Templates</h3>
        <p className="text-sm text-gray-400">Ready-to-use prompts for every need</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-600 text-white"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-gray-800">
          {templateCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="text-xs flex items-center gap-1"
            >
              <category.icon className="w-3 h-3" />
              <span className="hidden lg:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-4">
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1 flex items-center gap-2">
                          {template.title}
                          {template.rating >= 4.8 && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>⭐ {template.rating}</span>
                          <span>📈 {template.uses.toLocaleString()} uses</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 p-3 rounded text-sm text-gray-300 mb-3 font-mono">
                      {template.prompt}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleTemplateSelect(template)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Use Template
                      </Button>
                      <Button
                        onClick={() => copyTemplate(template)}
                        variant="outline"
                        size="sm"
                        className="border-gray-600"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {filteredTemplates.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No templates found matching your search</p>
        </div>
      )}
    </div>
  );
}
