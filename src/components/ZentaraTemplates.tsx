import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Mail, 
  MessageSquare, 
  Briefcase,
  Heart,
  GraduationCap,
  Sparkles,
  Copy,
  Send,
  Instagram,
  Youtube,
  Twitter
} from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  prompt: string;
  category: string;
  icon: any;
  color: string;
  popular?: boolean;
}

const templates: Template[] = [
  // Business Templates
  {
    id: "1",
    title: "Business Email",
    titleHindi: "बिज़नेस ईमेल",
    description: "Professional business email लिखें",
    prompt: "एक professional business email लिखें जो [विषय] के बारे में हो। Formal tone में लिखें।",
    category: "business",
    icon: Mail,
    color: "from-blue-500 to-cyan-500",
    popular: true
  },
  {
    id: "2",
    title: "Marketing Copy",
    titleHindi: "मार्केटिंग कॉपी",
    description: "Product/service के लिए compelling copy",
    prompt: "मेरे [product/service] के लिए एक engaging marketing copy लिखें जो customers को attract करे।",
    category: "business",
    icon: Briefcase,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "3",
    title: "Job Application",
    titleHindi: "नौकरी आवेदन",
    description: "Professional job application letter",
    prompt: "[Job Title] के लिए एक impressive job application letter लिखें।",
    category: "business",
    icon: FileText,
    color: "from-green-500 to-emerald-500"
  },
  // Social Media Templates
  {
    id: "4",
    title: "Instagram Caption",
    titleHindi: "Instagram कैप्शन",
    description: "Viral Instagram post caption",
    prompt: "[विषय] के बारे में एक catchy Instagram caption लिखें with relevant hashtags।",
    category: "social",
    icon: Instagram,
    color: "from-pink-500 to-orange-500",
    popular: true
  },
  {
    id: "5",
    title: "YouTube Script",
    titleHindi: "YouTube स्क्रिप्ट",
    description: "Engaging YouTube video script",
    prompt: "[विषय] पर 5-10 minute की YouTube video का engaging script लिखें।",
    category: "social",
    icon: Youtube,
    color: "from-red-500 to-pink-500"
  },
  {
    id: "6",
    title: "Twitter Thread",
    titleHindi: "Twitter थ्रेड",
    description: "Viral Twitter thread",
    prompt: "[विषय] पर एक informative और engaging Twitter thread लिखें (8-10 tweets)।",
    category: "social",
    icon: Twitter,
    color: "from-blue-400 to-blue-600"
  },
  // Personal Templates
  {
    id: "7",
    title: "Love Letter",
    titleHindi: "प्रेम पत्र",
    description: "Romantic love letter",
    prompt: "अपने प्रिय के लिए एक romantic और heartfelt love letter लिखें।",
    category: "personal",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    popular: true
  },
  {
    id: "8",
    title: "Birthday Wish",
    titleHindi: "जन्मदिन शुभकामना",
    description: "Special birthday message",
    prompt: "[व्यक्ति का नाम] के लिए एक special और heartfelt birthday wish लिखें।",
    category: "personal",
    icon: Sparkles,
    color: "from-yellow-500 to-orange-500"
  },
  // Education Templates
  {
    id: "9",
    title: "Essay Writing",
    titleHindi: "निबंध लेखन",
    description: "Academic essay writing",
    prompt: "[विषय] पर 500 words का well-structured essay लिखें with introduction, body और conclusion।",
    category: "education",
    icon: GraduationCap,
    color: "from-indigo-500 to-purple-500",
    popular: true
  },
  {
    id: "10",
    title: "Study Notes",
    titleHindi: "Study नोट्स",
    description: "Comprehensive study notes",
    prompt: "[विषय] के comprehensive study notes बनाएं with key points और examples।",
    category: "education",
    icon: FileText,
    color: "from-teal-500 to-cyan-500"
  }
];

interface ZentaraTemplatesProps {
  onUseTemplate?: (prompt: string) => void;
}

export function ZentaraTemplates({ onUseTemplate }: ZentaraTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "सभी", emoji: "✨" },
    { id: "business", name: "Business", emoji: "💼" },
    { id: "social", name: "Social Media", emoji: "📱" },
    { id: "personal", name: "Personal", emoji: "💝" },
    { id: "education", name: "Education", emoji: "📚" }
  ];

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const copyPrompt = async (template: Template) => {
    await navigator.clipboard.writeText(template.prompt);
    setCopiedId(template.id);
    toast.success("📋 Prompt copy हो गया!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const useTemplate = (template: Template) => {
    if (onUseTemplate) {
      onUseTemplate(template.prompt);
      toast.success(`✨ "${template.titleHindi}" template use हो रहा है`);
    } else {
      copyPrompt(template);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
            <FileText className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Zentara Templates
          </h2>
        </div>
        <p className="text-muted-foreground">Ready-made prompts से तुरंत content बनाएं 🚀</p>
      </div>

      {/* Popular Templates */}
      <Card className="bg-gradient-to-br from-background/95 to-secondary/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Popular Templates ⭐
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {templates.filter(t => t.popular).map((template) => {
              const IconComponent = template.icon;
              return (
                <Card 
                  key={template.id}
                  className={`bg-gradient-to-br ${template.color} p-4 border-0 cursor-pointer hover:scale-[1.02] transition-transform`}
                  onClick={() => useTemplate(template)}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{template.titleHindi}</h3>
                      <p className="text-white/80 text-sm">{template.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.id)}
            className={selectedCategory === cat.id 
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0" 
              : "hover:border-cyan-500/50"}
          >
            <span className="mr-2">{cat.emoji}</span>
            {cat.name}
          </Button>
        ))}
      </div>

      {/* All Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => {
          const IconComponent = template.icon;
          return (
            <Card 
              key={template.id}
              className="bg-gradient-to-br from-background/95 to-secondary/50 border-border/50 hover:border-cyan-500/30 transition-all group"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${template.color}`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  {template.popular && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      ⭐ Popular
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg text-foreground">{template.titleHindi}</CardTitle>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-background/50 rounded-lg text-sm text-muted-foreground mb-4 line-clamp-2">
                  {template.prompt}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => useTemplate(template)}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Use करें
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyPrompt(template)}
                    className="border-border/50 hover:border-cyan-500/50"
                  >
                    <Copy className={`w-4 h-4 ${copiedId === template.id ? "text-green-400" : ""}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
