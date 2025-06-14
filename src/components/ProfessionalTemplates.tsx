
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Briefcase,
  TrendingUp,
  Users,
  Code,
  Palette,
  Search,
  Star,
  Download,
  Eye,
  Heart,
  Filter,
  Zap,
  Crown
} from "lucide-react";

export function ProfessionalTemplates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const templateCategories = [
    { id: "all", name: "All Templates", icon: FileText, count: 150 },
    { id: "business", name: "Business", icon: Briefcase, count: 45 },
    { id: "marketing", name: "Marketing", icon: TrendingUp, count: 32 },
    { id: "technical", name: "Technical", icon: Code, count: 28 },
    { id: "creative", name: "Creative", icon: Palette, count: 25 },
    { id: "hr", name: "HR & Legal", icon: Users, count: 20 }
  ];

  const featuredTemplates = [
    {
      id: 1,
      title: "Business Plan Generator",
      description: "Comprehensive business plan template with financial projections",
      category: "Business",
      rating: 4.9,
      downloads: "15K+",
      premium: true,
      tags: ["Business", "Planning", "Finance"],
      preview: "Create detailed business plans with market analysis, financial projections, and growth strategies...",
      author: "Business Pro",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Marketing Campaign Strategy",
      description: "Complete marketing campaign template with ROI tracking",
      category: "Marketing",
      rating: 4.8,
      downloads: "12K+",
      premium: true,
      tags: ["Marketing", "Strategy", "ROI"],
      preview: "Develop comprehensive marketing campaigns with target audience analysis, budget planning...",
      author: "Marketing Guru",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      title: "API Documentation",
      description: "Professional API documentation template",
      category: "Technical",
      rating: 4.7,
      downloads: "8K+",
      premium: false,
      tags: ["API", "Documentation", "Technical"],
      preview: "Create clear and comprehensive API documentation with examples, authentication guides...",
      author: "Tech Writer",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Content Calendar",
      description: "Social media and content planning template",
      category: "Creative",
      rating: 4.6,
      downloads: "10K+",
      premium: false,
      tags: ["Content", "Social Media", "Planning"],
      preview: "Plan and organize your content strategy with editorial calendars, social media schedules...",
      author: "Content Creator",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Employee Handbook",
      description: "Comprehensive employee handbook template",
      category: "HR",
      rating: 4.8,
      downloads: "6K+",
      premium: true,
      tags: ["HR", "Policies", "Legal"],
      preview: "Create professional employee handbooks with policies, procedures, benefits information...",
      author: "HR Expert",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      title: "Project Proposal",
      description: "Professional project proposal template",
      category: "Business",
      rating: 4.9,
      downloads: "18K+",
      premium: false,
      tags: ["Project", "Proposal", "Business"],
      preview: "Craft compelling project proposals with scope, timeline, budget, and deliverables...",
      author: "Project Manager",
      color: "from-teal-500 to-green-500"
    }
  ];

  const filteredTemplates = featuredTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" ||
      template.category.toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-400" />
            Professional Templates
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              150+ Templates
            </Badge>
          </h2>
          <p className="text-gray-400 mt-2">Ready-to-use professional templates for all your business needs</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Crown className="w-4 h-4 mr-2" />
          Premium Templates
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search templates..."
            className="bg-gray-800/50 border-gray-600 text-white pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-gray-600 text-gray-300">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="featured" className="space-y-6">
        <TabsList className="bg-gray-800/50">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <div className="flex items-start gap-6">
          {/* Categories Sidebar */}
          <div className="w-64 space-y-2 hidden lg:block">
            {templateCategories.map(category => (
              <div
                key={category.id}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50"
                    : "hover:bg-gray-800/50"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex items-center gap-3">
                  <category.icon
                    className={`w-5 h-5 ${
                      selectedCategory === category.id ? "text-purple-400" : "text-gray-400"
                    }`}
                  />
                  <span className={selectedCategory === category.id ? "text-white" : "text-gray-300"}>
                    {category.name}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className={
                    selectedCategory === category.id
                      ? "border-purple-400 text-purple-400"
                      : "border-gray-500 text-gray-400"
                  }
                >
                  {category.count}
                </Badge>
              </div>
            ))}
          </div>

          {/* Templates Grid and Tab Contents */}
          <div className="flex-1">
            <TabsContent value="featured" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6">
                {filteredTemplates.map(template => (
                  <Card
                    key={template.id}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50 hover:border-blue-500/50 transition-all"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${template.color}`}>
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        {template.premium && (
                          <Badge className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-white">{template.title}</CardTitle>
                      <div className="text-gray-400 text-sm">{template.description}</div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-white">{template.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4 text-blue-400" />
                          <span className="text-white">{template.downloads}</span>
                        </div>
                        <div className="text-gray-400">{template.category}</div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {template.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-gray-700/50 text-gray-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <Zap className="w-4 h-4 mr-2" />
                          Use Template
                        </Button>
                        <Button variant="outline" className="border-gray-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" className="border-gray-600">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="mt-0">
              <div className="bg-gray-800/50 rounded-xl p-24 text-center">
                <FileText className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Recently Added Templates</h3>
                <p className="text-gray-400 mb-4">
                  Check back later for the latest templates or explore our featured collection
                </p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    const btn = document.querySelector('button[value="featured"]');
                    if (btn && btn instanceof HTMLButtonElement) btn.click();
                  }}
                >
                  View Featured Templates
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-0">
              <div className="bg-gray-800/50 rounded-xl p-24 text-center">
                <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Most Popular Templates</h3>
                <p className="text-gray-400 mb-4">
                  Check back later for the most popular templates or explore our featured collection
                </p>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    const btn = document.querySelector('button[value="featured"]');
                    if (btn && btn instanceof HTMLButtonElement) btn.click();
                  }}
                >
                  View Featured Templates
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-0">
              <div className="bg-gray-800/50 rounded-xl p-24 text-center">
                <Heart className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Saved Templates</h3>
                <p className="text-gray-400 mb-4">
                  You haven't saved any templates yet. Save templates for quick access later.
                </p>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    const btn = document.querySelector('button[value="featured"]');
                    if (btn && btn instanceof HTMLButtonElement) btn.click();
                  }}
                >
                  Explore Templates
                </Button>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
