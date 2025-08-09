import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Type, 
  Image, 
  Music, 
  Video, 
  Sparkles, 
  Brush,
  Eye,
  Download,
  Upload,
  Wand2,
  Heart,
  Star,
  Crown,
  Zap
} from 'lucide-react';

interface ThemeCustomization {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: string;
  fontSize: number;
  borderRadius: number;
  shadowIntensity: number;
  animationSpeed: string;
  gradientType: string;
}

interface MediaCustomization {
  backgroundVideo: string;
  backgroundImage: string;
  soundEffects: boolean;
  backgroundMusic: string;
  voiceStyle: string;
  avatarStyle: string;
}

export function CustomizationStudio() {
  const [currentTheme, setCurrentTheme] = useState<ThemeCustomization>({
    name: "Tezu Royal",
    primaryColor: "#8B5CF6",
    secondaryColor: "#EC4899", 
    accentColor: "#06B6D4",
    backgroundColor: "#0F172A",
    fontFamily: "Inter",
    fontSize: 16,
    borderRadius: 12,
    shadowIntensity: 50,
    animationSpeed: "normal",
    gradientType: "royal"
  });

  const [mediaSettings, setMediaSettings] = useState<MediaCustomization>({
    backgroundVideo: "cosmic",
    backgroundImage: "gradient",
    soundEffects: true,
    backgroundMusic: "ambient",
    voiceStyle: "professional",
    avatarStyle: "modern"
  });

  const [previewMode, setPreviewMode] = useState(false);

  const gradientPresets = [
    { name: "Royal", value: "royal", gradient: "from-purple-600 via-pink-600 to-blue-600" },
    { name: "Cyber", value: "cyber", gradient: "from-cyan-500 via-purple-500 to-pink-500" },
    { name: "Ocean", value: "ocean", gradient: "from-blue-600 via-cyan-500 to-teal-500" },
    { name: "Sunset", value: "sunset", gradient: "from-orange-500 via-red-500 to-pink-500" },
    { name: "Forest", value: "forest", gradient: "from-green-600 via-emerald-500 to-teal-500" },
    { name: "Galaxy", value: "galaxy", gradient: "from-purple-900 via-blue-900 to-indigo-900" },
    { name: "Fire", value: "fire", gradient: "from-red-600 via-orange-500 to-yellow-500" },
    { name: "Ice", value: "ice", gradient: "from-blue-200 via-cyan-200 to-indigo-200" }
  ];

  const fontOptions = [
    "Inter", "Roboto", "Poppins", "Montserrat", "Open Sans", "Lato", "Nunito", "Source Sans Pro"
  ];

  const backgroundVideos = [
    { name: "Cosmic", value: "cosmic", preview: "🌌" },
    { name: "Matrix", value: "matrix", preview: "💚" },
    { name: "Particles", value: "particles", preview: "✨" },
    { name: "Waves", value: "waves", preview: "🌊" },
    { name: "Neural", value: "neural", preview: "🧠" },
    { name: "Quantum", value: "quantum", preview: "⚛️" }
  ];

  const voiceStyles = [
    { name: "Professional", value: "professional", icon: "🎙️" },
    { name: "Friendly", value: "friendly", icon: "😊" },
    { name: "Energetic", value: "energetic", icon: "⚡" },
    { name: "Calm", value: "calm", icon: "🧘" },
    { name: "Technical", value: "technical", icon: "🤖" },
    { name: "Creative", value: "creative", icon: "🎨" }
  ];

  const musicTracks = [
    { name: "Ambient Space", value: "ambient", icon: "🌌" },
    { name: "Lo-Fi Beats", value: "lofi", icon: "🎵" },
    { name: "Cyberpunk", value: "cyberpunk", icon: "🌆" },
    { name: "Nature Sounds", value: "nature", icon: "🌿" },
    { name: "Focus Mode", value: "focus", icon: "🎯" },
    { name: "Silent", value: "none", icon: "🔇" }
  ];

  const saveTheme = () => {
    localStorage.setItem('tezu-custom-theme', JSON.stringify(currentTheme));
    localStorage.setItem('tezu-media-settings', JSON.stringify(mediaSettings));
    alert('Theme saved successfully! / थीम सफलतापूर्वक save हो गई!');
  };

  const exportTheme = () => {
    const themeData = {
      theme: currentTheme,
      media: mediaSettings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tezu-theme-${currentTheme.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateRandomTheme = () => {
    const colors = ['#8B5CF6', '#EC4899', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];
    const gradients = gradientPresets;
    
    setCurrentTheme({
      ...currentTheme,
      name: `Random Theme ${Date.now()}`,
      primaryColor: colors[Math.floor(Math.random() * colors.length)],
      secondaryColor: colors[Math.floor(Math.random() * colors.length)],
      accentColor: colors[Math.floor(Math.random() * colors.length)],
      gradientType: gradients[Math.floor(Math.random() * gradients.length)].value,
      borderRadius: Math.floor(Math.random() * 20) + 8,
      shadowIntensity: Math.floor(Math.random() * 80) + 20
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-royal">🎨 Customization Studio</h1>
          <p className="text-muted-foreground mt-2">
            अपनी AI को पूरी तरह customize करें - colors, themes, sounds और भी बहुत कुछ
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? 'Exit Preview' : 'Preview'}
          </Button>
          <Button onClick={generateRandomTheme} className="btn-cyber">
            <Wand2 className="h-4 w-4 mr-2" />
            Random Theme
          </Button>
          <Button onClick={saveTheme} className="btn-royal">
            <Heart className="h-4 w-4 mr-2" />
            Save Theme
          </Button>
        </div>
      </div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Media
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="effects" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Effects
          </TabsTrigger>
        </TabsList>

        {/* Colors Tab */}
        <TabsContent value="colors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Color Scheme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Primary Color</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="color"
                        value={currentTheme.primaryColor}
                        onChange={(e) => setCurrentTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="w-12 h-8 rounded border-gray-600"
                      />
                      <Input
                        value={currentTheme.primaryColor}
                        onChange={(e) => setCurrentTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="input-premium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Secondary Color</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="color"
                        value={currentTheme.secondaryColor}
                        onChange={(e) => setCurrentTheme(prev => ({ ...prev, secondaryColor: e.target.value }))}
                        className="w-12 h-8 rounded border-gray-600"
                      />
                      <Input
                        value={currentTheme.secondaryColor}
                        onChange={(e) => setCurrentTheme(prev => ({ ...prev, secondaryColor: e.target.value }))}
                        className="input-premium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Accent Color</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="color"
                        value={currentTheme.accentColor}
                        onChange={(e) => setCurrentTheme(prev => ({ ...prev, accentColor: e.target.value }))}
                        className="w-12 h-8 rounded border-gray-600"
                      />
                      <Input
                        value={currentTheme.accentColor}
                        onChange={(e) => setCurrentTheme(prev => ({ ...prev, accentColor: e.target.value }))}
                        className="input-premium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Background</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="color"
                        value={currentTheme.backgroundColor}
                        onChange={(e) => setCurrentTheme(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className="w-12 h-8 rounded border-gray-600"
                      />
                      <Input
                        value={currentTheme.backgroundColor}
                        onChange={(e) => setCurrentTheme(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className="input-premium"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Gradient Presets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {gradientPresets.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setCurrentTheme(prev => ({ ...prev, gradientType: preset.value }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        currentTheme.gradientType === preset.value 
                          ? 'border-purple-500 ring-2 ring-purple-500/20' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className={`w-full h-8 rounded mb-2 bg-gradient-to-r ${preset.gradient}`}></div>
                      <p className="text-sm font-medium">{preset.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Typography Tab */}
        <TabsContent value="typography" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Typography Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Font Family</label>
                  <select
                    value={currentTheme.fontFamily}
                    onChange={(e) => setCurrentTheme(prev => ({ ...prev, fontFamily: e.target.value }))}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg"
                  >
                    {fontOptions.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Font Size: {currentTheme.fontSize}px
                  </label>
                  <Slider
                    value={[currentTheme.fontSize]}
                    onValueChange={(value) => setCurrentTheme(prev => ({ ...prev, fontSize: value[0] }))}
                    min={12}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Border Radius: {currentTheme.borderRadius}px
                  </label>
                  <Slider
                    value={[currentTheme.borderRadius]}
                    onValueChange={(value) => setCurrentTheme(prev => ({ ...prev, borderRadius: value[0] }))}
                    min={0}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Shadow Intensity: {currentTheme.shadowIntensity}%
                  </label>
                  <Slider
                    value={[currentTheme.shadowIntensity]}
                    onValueChange={(value) => setCurrentTheme(prev => ({ ...prev, shadowIntensity: value[0] }))}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-800/30 rounded-lg">
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: currentTheme.fontFamily, fontSize: `${currentTheme.fontSize}px` }}>
                  Preview Text / प्रीव्यू टेक्स्ट
                </h3>
                <p className="text-muted-foreground" style={{ fontFamily: currentTheme.fontFamily, fontSize: `${currentTheme.fontSize - 2}px` }}>
                  This is how your text will look with the selected settings. / यह आपका टेक्स्ट इस तरह दिखेगा।
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Background Video</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {backgroundVideos.map((video) => (
                    <button
                      key={video.value}
                      onClick={() => setMediaSettings(prev => ({ ...prev, backgroundVideo: video.value }))}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        mediaSettings.backgroundVideo === video.value
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-2xl mb-2">{video.preview}</div>
                      <p className="text-sm font-medium">{video.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Voice Style</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {voiceStyles.map((voice) => (
                    <button
                      key={voice.value}
                      onClick={() => setMediaSettings(prev => ({ ...prev, voiceStyle: voice.value }))}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        mediaSettings.voiceStyle === voice.value
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-2xl mb-2">{voice.icon}</div>
                      <p className="text-sm font-medium">{voice.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audio Tab */}
        <TabsContent value="audio" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Background Music</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {musicTracks.map((track) => (
                  <button
                    key={track.value}
                    onClick={() => setMediaSettings(prev => ({ ...prev, backgroundMusic: track.value }))}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      mediaSettings.backgroundMusic === track.value
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">{track.icon}</div>
                    <p className="text-sm font-medium">{track.name}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Effects Tab */}
        <TabsContent value="effects" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Visual Effects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Animation Speed</label>
                  <select
                    value={currentTheme.animationSpeed}
                    onChange={(e) => setCurrentTheme(prev => ({ ...prev, animationSpeed: e.target.value }))}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg"
                  >
                    <option value="slow">Slow</option>
                    <option value="normal">Normal</option>
                    <option value="fast">Fast</option>
                    <option value="instant">Instant</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sound Effects</span>
                  <input
                    type="checkbox"
                    checked={mediaSettings.soundEffects}
                    onChange={(e) => setMediaSettings(prev => ({ ...prev, soundEffects: e.target.checked }))}
                    className="w-4 h-4"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={exportTheme} variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export Theme
                </Button>
                <Button variant="outline" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Theme
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Theme Preview */}
      {previewMode && (
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="p-6 rounded-lg border-2"
              style={{
                backgroundColor: currentTheme.backgroundColor,
                borderColor: currentTheme.primaryColor,
                borderRadius: `${currentTheme.borderRadius}px`,
                fontFamily: currentTheme.fontFamily,
                fontSize: `${currentTheme.fontSize}px`
              }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: currentTheme.primaryColor }}>
                Tezu AI Pro Preview
              </h3>
              <p className="mb-4" style={{ color: currentTheme.secondaryColor }}>
                यह आपकी customized theme का preview है। कैसा लग रहा है?
              </p>
              <div className="flex gap-2">
                <Badge style={{ backgroundColor: currentTheme.accentColor }}>Custom Theme</Badge>
                <Badge variant="outline">Preview Mode</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}