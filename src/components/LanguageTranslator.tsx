
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Languages, 
  Volume2, 
  Copy, 
  RefreshCw,
  Globe,
  Mic,
  Speaker
} from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" }
];

interface LanguageTranslatorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onTranslationToggle: (enabled: boolean) => void;
  isTranslationEnabled: boolean;
}

export function LanguageTranslator({ 
  currentLanguage, 
  onLanguageChange, 
  onTranslationToggle,
  isTranslationEnabled 
}: LanguageTranslatorProps) {
  const [autoDetect, setAutoDetect] = useState(true);
  const [realtimeTranslation, setRealtimeTranslation] = useState(false);
  const [voiceLanguage, setVoiceLanguage] = useState("hi");

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  // Mock translation function (in real app, use Google Translate API)
  const translateText = async (text: string, targetLang: string): Promise<string> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock translations for demo
    const mockTranslations: Record<string, Record<string, string>> = {
      "Hello": {
        "hi": "नमस्ते",
        "mr": "नमस्कार",
        "bn": "হ্যালো",
        "ta": "வணக்கம்",
        "te": "హలో",
        "gu": "હેલો",
        "kn": "ಹಲೋ",
        "ml": "ഹലോ",
        "pa": "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
        "ur": "ہیلو",
        "es": "Hola",
        "fr": "Bonjour",
        "de": "Hallo",
        "ja": "こんにちは",
        "ko": "안녕하세요",
        "zh": "你好",
        "ar": "مرحبا",
        "ru": "Привет",
        "pt": "Olá"
      }
    };

    return mockTranslations[text]?.[targetLang] || `[${targetLang.toUpperCase()}] ${text}`;
  };

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChange(langCode);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const speakText = (text: string, langCode: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-2">🌍 Language & Translation</h3>
        <p className="text-sm text-gray-400">Tezu speaks your language perfectly</p>
      </div>

      {/* Current Language */}
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-white">Primary Language</Label>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
              {currentLang.flag} {currentLang.nativeName}
            </Badge>
          </div>
          
          <Select value={currentLanguage} onValueChange={handleLanguageSelect}>
            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 max-h-60">
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-gray-700">
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                    <span className="text-gray-400 text-sm">({lang.nativeName})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Translation Settings */}
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Languages className="w-5 h-5" />
            Translation Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Enable Translation</Label>
              <p className="text-xs text-gray-400">Translate messages automatically</p>
            </div>
            <Switch
              checked={isTranslationEnabled}
              onCheckedChange={onTranslationToggle}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Auto-Detect Language</Label>
              <p className="text-xs text-gray-400">Automatically detect input language</p>
            </div>
            <Switch
              checked={autoDetect}
              onCheckedChange={setAutoDetect}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Real-time Translation</Label>
              <p className="text-xs text-gray-400">Translate as you type</p>
            </div>
            <Switch
              checked={realtimeTranslation}
              onCheckedChange={setRealtimeTranslation}
            />
          </div>
        </CardContent>
      </Card>

      {/* Voice Language */}
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Speaker className="w-5 h-5" />
            Voice Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Voice Language</Label>
            <Select value={voiceLanguage} onValueChange={setVoiceLanguage}>
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {languages.slice(0, 10).map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-gray-700">
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => speakText("नमस्ते, मैं तेज़ू हूँ", voiceLanguage)}
            className="w-full border-gray-600 text-gray-300"
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Test Voice
          </Button>
        </CardContent>
      </Card>

      {/* Supported Languages */}
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Supported Languages ({languages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {languages.map((lang) => (
              <div key={lang.code} className="flex items-center gap-2 p-2 rounded bg-gray-700/30">
                <span className="text-lg">{lang.flag}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-white font-medium">{lang.name}</div>
                  <div className="text-xs text-gray-400 truncate">{lang.nativeName}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Phrases */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Languages className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Pro Tip</h4>
              <p className="text-sm text-gray-300 mb-2">
                Tezu can understand and respond in any of these {languages.length} languages. 
                Just start typing in your preferred language!
              </p>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                Multilingual AI
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
