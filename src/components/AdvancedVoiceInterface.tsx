
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Settings,
  Waveform,
  Languages,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceSettings {
  language: string;
  accent: string;
  speed: number;
  pitch: number;
  volume: number;
  noiseReduction: boolean;
  autoDetectLanguage: boolean;
}

interface AdvancedVoiceInterfaceProps {
  onVoiceInput: (text: string, confidence: number) => void;
  onSettingsChange: (settings: VoiceSettings) => void;
}

export function AdvancedVoiceInterface({ onVoiceInput, onSettingsChange }: AdvancedVoiceInterfaceProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [settings, setSettings] = useState<VoiceSettings>({
    language: "hi-IN",
    accent: "indian",
    speed: 1.0,
    pitch: 1.0,
    volume: 0.8,
    noiseReduction: true,
    autoDetectLanguage: true
  });
  const { toast } = useToast();

  const supportedLanguages = [
    { code: "hi-IN", name: "Hindi (India)", flag: "🇮🇳" },
    { code: "en-IN", name: "English (India)", flag: "🇮🇳" },
    { code: "en-US", name: "English (US)", flag: "🇺🇸" },
    { code: "ta-IN", name: "Tamil", flag: "🇮🇳" },
    { code: "te-IN", name: "Telugu", flag: "🇮🇳" },
    { code: "bn-IN", name: "Bengali", flag: "🇮🇳" }
  ];

  const startListening = () => {
    setIsListening(true);
    // Simulate audio level for visual feedback
    const interval = setInterval(() => {
      setAudioLevel(Math.random() * 100);
    }, 100);

    // Simulate speech recognition
    setTimeout(() => {
      const mockTranscription = "यह एक उदाहरण है voice input का";
      onVoiceInput(mockTranscription, 0.95);
      setIsListening(false);
      setAudioLevel(0);
      clearInterval(interval);
      
      toast({
        title: "Voice Input Captured! 🎤",
        description: "Speech converted to text successfully",
      });
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    setAudioLevel(0);
  };

  const updateSettings = (key: keyof VoiceSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const testVoice = () => {
    setIsSpeaking(true);
    setTimeout(() => {
      setIsSpeaking(false);
      toast({
        title: "Voice Test Complete! 🔊",
        description: "Voice synthesis settings applied",
      });
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">🎤 Advanced Voice</h3>
        <p className="text-sm text-gray-400">Professional voice interface</p>
      </div>

      {/* Voice Control */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Voice Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={isListening ? stopListening : startListening}
              className={`w-20 h-20 rounded-full ${
                isListening 
                  ? "bg-red-600 hover:bg-red-700 animate-pulse" 
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              }`}
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </Button>
          </div>

          {/* Audio Level Indicator */}
          {isListening && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Waveform className="w-4 h-4 text-blue-400" />
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-100"
                    style={{ width: `${audioLevel}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{Math.round(audioLevel)}%</span>
              </div>
            </div>
          )}

          <div className="text-center">
            <Badge className={`${isListening ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
              {isListening ? "🎤 Listening..." : "🔇 Ready to listen"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Voice Settings */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Voice Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language Selection */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Language</label>
            <Select value={settings.language} onValueChange={(value) => updateSettings('language', value)}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {supportedLanguages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Voice Speed */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Speech Speed: {settings.speed}x
            </label>
            <Slider
              value={[settings.speed]}
              onValueChange={(value) => updateSettings('speed', value[0])}
              min={0.5}
              max={2.0}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Voice Pitch */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Voice Pitch: {settings.pitch}x
            </label>
            <Slider
              value={[settings.pitch]}
              onValueChange={(value) => updateSettings('pitch', value[0])}
              min={0.5}
              max={2.0}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Volume */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Volume: {Math.round(settings.volume * 100)}%
            </label>
            <Slider
              value={[settings.volume]}
              onValueChange={(value) => updateSettings('volume', value[0])}
              min={0}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={testVoice}
              disabled={isSpeaking}
              variant="outline"
              className="flex-1 border-gray-600"
            >
              {isSpeaking ? (
                <VolumeX className="w-4 h-4 mr-2 animate-pulse" />
              ) : (
                <Volume2 className="w-4 h-4 mr-2" />
              )}
              {isSpeaking ? "Testing..." : "Test Voice"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Advanced Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Noise Reduction</span>
            <Badge className={settings.noiseReduction ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
              {settings.noiseReduction ? "ON" : "OFF"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Auto Language Detection</span>
            <Badge className={settings.autoDetectLanguage ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"}>
              {settings.autoDetectLanguage ? "ON" : "OFF"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Real-time Translation</span>
            <Badge className="bg-purple-500/20 text-purple-400">
              <Languages className="w-3 h-3 mr-1" />
              ACTIVE
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
