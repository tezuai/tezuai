import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Download, Star, Sparkles, Crown, Zap } from "lucide-react";

const premiumThemes = [
  {
    id: "royal-gold",
    name: "Royal Gold",
    preview: "from-amber-500 via-yellow-600 to-orange-700",
    category: "Premium",
    description: "Luxurious golden theme for professional presentations",
    rating: 4.9,
    downloads: "12.5K"
  },
  {
    id: "deep-ocean",
    name: "Deep Ocean", 
    preview: "from-blue-900 via-cyan-800 to-teal-700",
    category: "Nature",
    description: "Calming ocean depths with professional elegance",
    rating: 4.8,
    downloads: "8.7K"
  },
  {
    id: "neon-cyber",
    name: "Neon Cyber",
    preview: "from-purple-600 via-pink-500 to-cyan-400",
    category: "Tech",
    description: "Futuristic cyberpunk aesthetic for developers",
    rating: 4.7,
    downloads: "15.2K"
  },
  {
    id: "forest-zen",
    name: "Forest Zen",
    preview: "from-green-800 via-emerald-600 to-lime-500",
    category: "Nature",
    description: "Peaceful forest vibes for focus and productivity",
    rating: 4.6,
    downloads: "6.9K"
  },
  {
    id: "sunset-dream",
    name: "Sunset Dream",
    preview: "from-red-500 via-orange-500 to-yellow-400",
    category: "Warm",
    description: "Warm sunset colors for creative workflows",
    rating: 4.8,
    downloads: "9.3K"
  },
  {
    id: "midnight-pro",
    name: "Midnight Pro",
    preview: "from-gray-900 via-slate-800 to-zinc-700",
    category: "Dark",
    description: "Professional dark theme for long coding sessions",
    rating: 4.9,
    downloads: "22.1K"
  }
];

export function ThemeGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [appliedTheme, setAppliedTheme] = useState<string | null>(null);

  const categories = ["All", "Premium", "Nature", "Tech", "Warm", "Dark"];

  const filteredThemes = selectedCategory === "All" 
    ? premiumThemes 
    : premiumThemes.filter(theme => theme.category === selectedCategory);

  const handleApplyTheme = (themeId: string) => {
    setAppliedTheme(themeId);
    // Apply theme logic here
    console.log(`Applied theme: ${themeId}`);
  };

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Theme Gallery</h1>
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
              <Crown className="w-4 h-4 mr-1" />
              Premium Collection
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            Professional themes crafted by world-class designers. Transform your workspace instantly.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThemes.map((theme) => (
            <Card key={theme.id} className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {theme.name}
                    {theme.category === "Premium" && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{theme.rating}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit">
                  {theme.category}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Theme Preview */}
                <div className={`h-24 rounded-lg bg-gradient-to-r ${theme.preview} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                  <Sparkles className="w-8 h-8 text-white opacity-80" />
                </div>

                <p className="text-sm text-muted-foreground">{theme.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Download className="w-4 h-4" />
                    {theme.downloads}
                  </div>
                  <Button
                    onClick={() => handleApplyTheme(theme.id)}
                    className={`${
                      appliedTheme === theme.id 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    {appliedTheme === theme.id ? (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Applied
                      </>
                    ) : (
                      "Apply Theme"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Theme Builder CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Create Your Own Theme</h3>
          <p className="mb-6 opacity-90">
            Need something unique? Use our advanced theme builder to create custom color schemes, 
            gradients, and animations that match your brand perfectly.
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            <Palette className="w-5 h-5 mr-2" />
            Launch Theme Builder
          </Button>
        </div>
      </div>
    </div>
  );
}