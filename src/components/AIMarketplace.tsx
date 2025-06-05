
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Store, 
  Search, 
  Star, 
  Download,
  ShoppingCart,
  TrendingUp,
  Code,
  Briefcase,
  Palette,
  Zap,
  Heart,
  Users,
  Crown,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIModel {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  downloads: number;
  price: number;
  developer: string;
  avatar: string;
  tags: string[];
  featured: boolean;
  trending: boolean;
}

export function AIMarketplace() {
  const [aiModels, setAiModels] = useState<AIModel[]>([
    {
      id: '1',
      name: 'CodeGenius Pro',
      category: 'Development',
      description: 'Advanced coding assistant with multi-language support',
      rating: 4.9,
      downloads: 12500,
      price: 299,
      developer: 'TechCorp AI',
      avatar: '/placeholder.svg',
      tags: ['React', 'Python', 'AI', 'Code Generation'],
      featured: true,
      trending: true
    },
    {
      id: '2',
      name: 'BusinessAnalyzer',
      category: 'Business',
      description: 'AI-powered business intelligence and analytics',
      rating: 4.8,
      downloads: 8900,
      price: 499,
      developer: 'DataInsights Inc',
      avatar: '/placeholder.svg',
      tags: ['Analytics', 'Business', 'Reports', 'Insights'],
      featured: true,
      trending: false
    },
    {
      id: '3',
      name: 'CreativeStudio AI',
      category: 'Design',
      description: 'Generate stunning visuals and creative content',
      rating: 4.7,
      downloads: 15600,
      price: 199,
      developer: 'ArtFlow Studio',
      avatar: '/placeholder.svg',
      tags: ['Design', 'Graphics', 'Creative', 'Art'],
      featured: false,
      trending: true
    },
    {
      id: '4',
      name: 'SecureGuard AI',
      category: 'Security',
      description: 'Advanced threat detection and security monitoring',
      rating: 4.9,
      downloads: 7800,
      price: 599,
      developer: 'CyberShield Pro',
      avatar: '/placeholder.svg',
      tags: ['Security', 'Threat Detection', 'Monitoring', 'Privacy'],
      featured: false,
      trending: false
    },
    {
      id: '5',
      name: 'CustomerCare Bot',
      category: 'Customer Service',
      description: 'Intelligent customer support automation',
      rating: 4.6,
      downloads: 11200,
      price: 399,
      developer: 'ServiceAI Solutions',
      avatar: '/placeholder.svg',
      tags: ['Customer Service', 'Automation', 'Support', 'Chat'],
      featured: false,
      trending: true
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [installedModels, setInstalledModels] = useState<string[]>(['1']);

  const { toast } = useToast();

  const categories = ['All', 'Development', 'Business', 'Design', 'Security', 'Customer Service'];

  const filteredModels = aiModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || model.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstallModel = (modelId: string) => {
    const model = aiModels.find(m => m.id === modelId);
    
    if (installedModels.includes(modelId)) {
      toast({
        title: "Already Installed",
        description: `${model?.name} is already in your collection`,
        variant: "destructive"
      });
      return;
    }

    setInstalledModels(prev => [...prev, modelId]);
    toast({
      title: "🎉 AI Model Installed!",
      description: `${model?.name} has been added to your AI collection`,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Development': return Code;
      case 'Business': return Briefcase;
      case 'Design': return Palette;
      case 'Security': return Zap;
      default: return Store;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">🏪 AI Marketplace</h3>
        <p className="text-sm text-gray-400">Discover and install powerful AI models</p>
      </div>

      {/* Search and Filter */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-purple-800/30 border-purple-500/30">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
              <Input
                placeholder="Search AI models, features, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700/50 border-purple-500/30 text-white"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => {
                const IconComponent = getCategoryIcon(category);
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'border-gray-600 text-gray-300'
                    }`}
                  >
                    <IconComponent className="w-3 h-3 mr-1" />
                    {category}
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Models */}
      <div className="space-y-3">
        <h4 className="text-white font-medium flex items-center gap-2">
          <Crown className="w-4 h-4 text-yellow-400" />
          Featured AI Models
        </h4>
        {filteredModels.filter(model => model.featured).map((model) => (
          <Card key={model.id} className="bg-gradient-to-r from-gray-800/50 to-yellow-800/20 border-yellow-500/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={model.avatar} />
                  <AvatarFallback className="bg-yellow-600 text-white">
                    {model.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-medium">{model.name}</h4>
                    {model.trending && (
                      <Badge className="bg-red-500/20 text-red-400">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{model.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      {model.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {model.downloads.toLocaleString()}
                    </span>
                    <span>by {model.developer}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {model.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs text-blue-300 border-blue-500/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-400">₹{model.price}</span>
                    <Button
                      size="sm"
                      onClick={() => handleInstallModel(model.id)}
                      disabled={installedModels.includes(model.id)}
                      className={`${
                        installedModels.includes(model.id)
                          ? 'bg-green-600/20 text-green-400'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600'
                      }`}
                    >
                      {installedModels.includes(model.id) ? (
                        <>
                          <Heart className="w-3 h-3 mr-1 fill-current" />
                          Installed
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Install
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* All Models */}
      <div className="space-y-3">
        <h4 className="text-white font-medium flex items-center gap-2">
          <Store className="w-4 h-4 text-blue-400" />
          All AI Models ({filteredModels.length})
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {filteredModels.filter(model => !model.featured).map((model) => (
            <Card key={model.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={model.avatar} />
                    <AvatarFallback className="bg-blue-600 text-white text-xs">
                      {model.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium text-sm">{model.name}</h4>
                      {model.trending && (
                        <Badge className="bg-red-500/20 text-red-400 text-xs">
                          <TrendingUp className="w-2 h-2 mr-1" />
                          Hot
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{model.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Star className="w-2 h-2 text-yellow-400 fill-current" />
                          {model.rating}
                        </span>
                        <span className="text-green-400 font-medium">₹{model.price}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleInstallModel(model.id)}
                        disabled={installedModels.includes(model.id)}
                        className={`text-xs ${
                          installedModels.includes(model.id)
                            ? 'border-green-500/30 text-green-400'
                            : 'border-gray-600 text-gray-300'
                        }`}
                      >
                        {installedModels.includes(model.id) ? 'Installed' : 'Install'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button variant="outline" className="border-gray-600 text-gray-300">
          <Users className="w-4 h-4 mr-2" />
          Browse Community Models
        </Button>
      </div>
    </div>
  );
}
