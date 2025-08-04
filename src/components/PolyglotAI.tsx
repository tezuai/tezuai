import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Globe, 
  Languages, 
  MessageCircle, 
  Mic, 
  Volume2,
  Brain,
  Target,
  Zap,
  Users,
  Flag
} from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  proficiency: number;
  speakers: string;
  flag: string;
  isActive: boolean;
}

interface Translation {
  original: string;
  translated: string;
  fromLang: string;
  toLang: string;
  confidence: number;
}

export function PolyglotAI() {
  const [languages, setLanguages] = useState<Language[]>([
    { code: "hi", name: "Hindi", nativeName: "हिन्दी", proficiency: 99, speakers: "600M+", flag: "🇮🇳", isActive: true },
    { code: "en", name: "English", nativeName: "English", proficiency: 99, speakers: "1.5B+", flag: "🇺🇸", isActive: true },
    { code: "es", name: "Spanish", nativeName: "Español", proficiency: 95, speakers: "500M+", flag: "🇪🇸", isActive: true },
    { code: "fr", name: "French", nativeName: "Français", proficiency: 92, speakers: "280M+", flag: "🇫🇷", isActive: true },
    { code: "de", name: "German", nativeName: "Deutsch", proficiency: 90, speakers: "100M+", flag: "🇩🇪", isActive: true },
    { code: "zh", name: "Chinese", nativeName: "中文", proficiency: 93, speakers: "1.1B+", flag: "🇨🇳", isActive: true },
    { code: "ja", name: "Japanese", nativeName: "日本語", proficiency: 88, speakers: "125M+", flag: "🇯🇵", isActive: false },
    { code: "ko", name: "Korean", nativeName: "한국어", proficiency: 85, speakers: "77M+", flag: "🇰🇷", isActive: false },
    { code: "ar", name: "Arabic", nativeName: "العربية", proficiency: 87, speakers: "400M+", flag: "🇸🇦", isActive: false },
    { code: "pt", name: "Portuguese", nativeName: "Português", proficiency: 91, speakers: "260M+", flag: "🇧🇷", isActive: false },
    { code: "ru", name: "Russian", nativeName: "Русский", proficiency: 89, speakers: "260M+", flag: "🇷🇺", isActive: false },
    { code: "it", name: "Italian", nativeName: "Italiano", proficiency: 86, speakers: "65M+", flag: "🇮🇹", isActive: false }
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [recentTranslations, setRecentTranslations] = useState<Translation[]>([
    {
      original: "Hello, how are you today?",
      translated: "नमस्ते, आज आप कैसे हैं?",
      fromLang: "en",
      toLang: "hi",
      confidence: 98
    },
    {
      original: "Tezu AI is amazing!",
      translated: "Tezu AI शानदार है!",
      fromLang: "en", 
      toLang: "hi",
      confidence: 95
    }
  ]);

  const [isTranslating, setIsTranslating] = useState(false);

  const culturalFeatures = [
    { name: "Context-Aware Translation", description: "Understands cultural nuances and idioms", level: 94 },
    { name: "Regional Dialects", description: "Supports multiple dialects per language", level: 89 },
    { name: "Formal/Informal Recognition", description: "Adapts tone based on cultural context", level: 92 },
    { name: "Cultural Sensitivity", description: "Respects cultural differences in communication", level: 96 }
  ];

  const toggleLanguage = (langCode: string) => {
    setLanguages(prev => prev.map(lang => 
      lang.code === langCode ? { ...lang, isActive: !lang.isActive } : lang
    ));
  };

  const simulateTranslation = () => {
    setIsTranslating(true);
    setTimeout(() => {
      setIsTranslating(false);
      const newTranslation: Translation = {
        original: "AI technology is revolutionizing communication",
        translated: "AI तकनीक संचार में क्रांति ला रही है",
        fromLang: "en",
        toLang: "hi", 
        confidence: Math.floor(Math.random() * 10) + 90
      };
      setRecentTranslations(prev => [newTranslation, ...prev.slice(0, 4)]);
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate proficiency improvements
      setLanguages(prev => prev.map(lang => ({
        ...lang,
        proficiency: Math.min(100, lang.proficiency + (Math.random() - 0.4) * 0.5)
      })));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">🌍 Polyglot AI - Universal Language Engine</h2>
        <p className="text-gray-400">Advanced multilingual AI with cultural understanding</p>
      </div>

      {/* Language Overview */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Globe className="w-5 h-5 text-blue-400" />
            Language Capabilities Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{languages.length}</div>
              <p className="text-sm text-gray-400">Supported Languages</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{languages.filter(l => l.isActive).length}</div>
              <p className="text-sm text-gray-400">Active Languages</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">96.2%</div>
              <p className="text-sm text-gray-400">Avg Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">4.8B+</div>
              <p className="text-sm text-gray-400">Total Speakers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Selection */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Languages className="w-5 h-5 text-purple-400" />
            Active Language Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="text-sm text-gray-300 mb-2 block">Primary Language</label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.filter(l => l.isActive).map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name} ({lang.nativeName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            {languages.map((lang) => (
              <div key={lang.code} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                <span className="text-xl">{lang.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{lang.name}</span>
                      <span className="text-xs text-gray-400">({lang.nativeName})</span>
                      <Badge variant="outline" className="text-xs">
                        {lang.speakers} speakers
                      </Badge>
                    </div>
                    <span className="text-sm font-medium text-green-400">{lang.proficiency.toFixed(1)}%</span>
                  </div>
                  <Progress value={lang.proficiency} className="h-2 mb-2" />
                </div>
                <Button
                  variant={lang.isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleLanguage(lang.code)}
                >
                  {lang.isActive ? "Active" : "Activate"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cultural Understanding Features */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="w-5 h-5 text-orange-400" />
            Cultural Intelligence Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {culturalFeatures.map((feature) => (
            <div key={feature.name} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-white">{feature.name}</h4>
                  <span className="text-sm font-medium text-orange-400">{feature.level}%</span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{feature.description}</p>
                <Progress value={feature.level} className="h-1" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Real-Time Translation Demo */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <MessageCircle className="w-5 h-5 text-green-400" />
            Real-Time Translation Engine
            <Button 
              onClick={simulateTranslation}
              disabled={isTranslating}
              size="sm"
              className="ml-auto"
            >
              {isTranslating ? (
                <>
                  <Zap className="w-4 h-4 mr-1 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-1" />
                  Demo Translation
                </>
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentTranslations.map((translation, index) => (
            <div key={index} className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                      {languages.find(l => l.code === translation.fromLang)?.flag} 
                      {languages.find(l => l.code === translation.fromLang)?.name}
                    </Badge>
                    <span className="text-gray-400">→</span>
                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                      {languages.find(l => l.code === translation.toLang)?.flag}
                      {languages.find(l => l.code === translation.toLang)?.name}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-300">{translation.original}</div>
                  <div className="text-sm text-white font-medium">{translation.translated}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-400">{translation.confidence}%</div>
                  <div className="text-xs text-gray-400">confidence</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Voice & Audio Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Mic className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="font-semibold text-white">Voice Recognition</h3>
                <p className="text-xs text-gray-400">Multi-language speech processing</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">Accuracy Rate</span>
                <span className="text-purple-400">97.8%</span>
              </div>
              <Progress value={97.8} className="h-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Volume2 className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="font-semibold text-white">Text-to-Speech</h3>
                <p className="text-xs text-gray-400">Natural voice synthesis</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">Voice Quality</span>
                <span className="text-blue-400">98.5%</span>
              </div>
              <Progress value={98.5} className="h-1" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}