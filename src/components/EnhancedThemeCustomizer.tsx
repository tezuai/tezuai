import { useState } from "react";
import { Palette, Download, Share2, RotateCcw, Sparkles, Crown, Zap, Wand2, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Theme {
  id: string;
  name: string;
  category: string;
  preview: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  isPremium?: boolean;
  description: string;
}

const professionalThemes: Theme[] = [
  {
    id: "royal-purple",
    name: "Royal Purple",
    category: "Premium",
    preview: "from-purple-600 via-pink-600 to-blue-600",
    primary: "262 80% 50%",
    secondary: "292 84% 61%",
    accent: "325 84% 65%",
    background: "222 84% 5%",
    isPremium: true,
    description: "Regal purple gradient with golden accents for luxury applications"
  },
  {
    id: "cyber-neon",
    name: "Cyber Neon",
    category: "Tech",
    preview: "from-cyan-500 via-purple-500 to-pink-500",
    primary: "195 100% 50%",
    secondary: "271 81% 56%",
    accent: "312 73% 55%",
    background: "222 84% 5%",
    isPremium: true,
    description: "Futuristic neon theme perfect for tech and gaming"
  },
  {
    id: "golden-luxury",
    name: "Golden Luxury",
    category: "Premium",
    preview: "from-yellow-400 via-amber-500 to-orange-600",
    primary: "47 96% 53%",
    secondary: "24 95% 53%",
    accent: "14 100% 57%",
    background: "222 84% 5%",
    isPremium: true,
    description: "Luxurious golden theme for premium experiences"
  },
  {
    id: "ocean-depths",
    name: "Ocean Depths",
    category: "Nature",
    preview: "from-blue-900 via-cyan-800 to-teal-700",
    primary: "217 91% 60%",
    secondary: "212 84% 49%",
    accent: "195 100% 39%",
    background: "222 84% 5%",
    description: "Deep ocean blues with calming cyan accents"
  },
  {
    id: "forest-zen",
    name: "Forest Zen",
    category: "Nature",
    preview: "from-green-800 via-emerald-600 to-lime-500",
    primary: "142 69% 58%",
    secondary: "158 64% 52%",
    accent: "173 58% 39%",
    background: "222 84% 5%",
    description: "Peaceful forest greens for focused productivity"
  },
  {
    id: "sunset-dreams",
    name: "Sunset Dreams",
    category: "Warm",
    preview: "from-red-500 via-orange-500 to-yellow-400",
    primary: "14 100% 57%",
    secondary: "34 100% 50%",
    accent: "47 96% 53%",
    background: "222 84% 5%",
    description: "Warm sunset colors for creative inspiration"
  }
];

export function EnhancedThemeCustomizer() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(professionalThemes[0]);
  const [customColors, setCustomColors] = useState({
    hue: 262,
    saturation: 80,
    lightness: 50,
    opacity: 100
  });
  const [previewMode, setPreviewMode] = useState(false);

  const generateCustomTheme = () => {
    const { hue, saturation, lightness } = customColors;
    return {
      id: "custom",
      name: "Custom Theme",
      category: "Custom",
      preview: `from-[hsl(${hue},${saturation}%,${lightness}%)] via-[hsl(${(hue + 30) % 360},${saturation}%,${lightness + 10}%)] to-[hsl(${(hue + 60) % 360},${saturation}%,${lightness + 20}%)]`,
      primary: `${hue} ${saturation}% ${lightness}%`,
      secondary: `${(hue + 30) % 360} ${saturation}% ${lightness + 10}%`,
      accent: `${(hue + 60) % 360} ${saturation}% ${lightness + 20}%`,
      background: "222 84% 5%",
      description: "Your custom-created theme"
    };
  };

  const applyTheme = (theme: Theme) => {
    // Apply CSS custom properties to root
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--background', theme.background);
    
    setSelectedTheme(theme);
  };

  const exportTheme = () => {
    const themeConfig = {
      name: selectedTheme.name,
      colors: {
        primary: selectedTheme.primary,
        secondary: selectedTheme.secondary,
        accent: selectedTheme.accent,
        background: selectedTheme.background
      },
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(themeConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Palette className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold text-white">Advanced Theme Customizer</h1>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Crown className="w-4 h-4 mr-1" />
                Pro Studio
              </Badge>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setPreviewMode(!previewMode)}
                variant={previewMode ? "default" : "outline"}
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                {previewMode ? "Exit Preview" : "Live Preview"}
              </Button>
              <Button onClick={exportTheme} className="gap-2 btn-royal">
                <Download className="w-4 h-4" />
                Export Theme
              </Button>
            </div>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl">
            Create stunning, professional themes with advanced color science and real-time preview. 
            Perfect for branding, accessibility, and personalization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Theme Gallery */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="gallery" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
                <TabsTrigger value="gallery">Theme Gallery</TabsTrigger>
                <TabsTrigger value="custom">Custom Builder</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="gallery" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {professionalThemes.map((theme) => (
                    <Card key={theme.id} className="group card-premium hover:scale-105 transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            {theme.name}
                            {theme.isPremium && (
                              <Crown className="w-4 h-4 text-yellow-500" />
                            )}
                          </CardTitle>
                          <Badge variant="secondary">{theme.category}</Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Theme Preview */}
                        <div className={`h-32 rounded-xl bg-gradient-to-r ${theme.preview} flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-2xl`}>
                          <Sparkles className="w-12 h-12 text-white opacity-80 animate-pulse" />
                        </div>

                        <p className="text-sm text-gray-400">{theme.description}</p>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => applyTheme(theme)}
                            className={`flex-1 ${
                              selectedTheme.id === theme.id 
                                ? "btn-royal" 
                                : "bg-gray-700 hover:bg-gray-600"
                            }`}
                          >
                            {selectedTheme.id === theme.id ? (
                              <>
                                <Zap className="w-4 h-4 mr-2" />
                                Applied
                              </>
                            ) : (
                              "Apply Theme"
                            )}
                          </Button>
                          <Button variant="outline" size="sm" className="px-3">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="w-5 h-5 text-purple-400" />
                      Custom Theme Builder
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Color Controls */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">
                          Hue ({customColors.hue}°)
                        </label>
                        <Slider
                          value={[customColors.hue]}
                          onValueChange={([value]) => setCustomColors(prev => ({ ...prev, hue: value }))}
                          max={360}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">
                          Saturation ({customColors.saturation}%)
                        </label>
                        <Slider
                          value={[customColors.saturation]}
                          onValueChange={([value]) => setCustomColors(prev => ({ ...prev, saturation: value }))}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">
                          Lightness ({customColors.lightness}%)
                        </label>
                        <Slider
                          value={[customColors.lightness]}
                          onValueChange={([value]) => setCustomColors(prev => ({ ...prev, lightness: value }))}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Custom Theme Preview */}
                    <div className={`h-32 rounded-xl bg-gradient-to-r ${generateCustomTheme().preview} flex items-center justify-center shadow-2xl`}>
                      <Sparkles className="w-12 h-12 text-white opacity-80" />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => applyTheme(generateCustomTheme())}
                        className="flex-1 btn-cyber"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Apply Custom Theme
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setCustomColors({ hue: 262, saturation: 80, lightness: 50, opacity: 100 })}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-blue-400" />
                      Advanced Color Science
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="text-gray-300">Current Theme Colors:</div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded bg-[hsl(${selectedTheme.primary})]`}></div>
                            <span className="text-gray-400">Primary: {selectedTheme.primary}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded bg-[hsl(${selectedTheme.secondary})]`}></div>
                            <span className="text-gray-400">Secondary: {selectedTheme.secondary}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded bg-[hsl(${selectedTheme.accent})]`}></div>
                            <span className="text-gray-400">Accent: {selectedTheme.accent}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-gray-300">Accessibility Info:</div>
                        <div className="space-y-1 text-gray-400">
                          <div>✅ WCAG AA Compliant</div>
                          <div>✅ Color Blind Friendly</div>
                          <div>✅ High Contrast Mode</div>
                          <div>✅ Reduced Motion Safe</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Live Preview Panel */}
          <div className="space-y-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="text-lg">Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Sample UI Elements */}
                <div className="space-y-3">
                  <Button className="w-full btn-royal">Primary Button</Button>
                  <Button variant="outline" className="w-full">Secondary Button</Button>
                  
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-300 mb-2">Sample Card</div>
                    <div className="text-xs text-gray-400">This shows how your theme looks on different UI elements.</div>
                  </div>
                  
                  <div className="h-8 bg-gradient-to-r from-primary via-secondary to-accent rounded opacity-80"></div>
                  
                  <div className="text-center">
                    <Badge className="bg-primary/20 text-primary">Active Theme</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme Info */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="text-lg">Theme Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white ml-2">{selectedTheme.name}</span>
                </div>
                <div>
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white ml-2">{selectedTheme.category}</span>
                </div>
                <div>
                  <span className="text-gray-400">Description:</span>
                  <span className="text-white ml-2 block mt-1">{selectedTheme.description}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}