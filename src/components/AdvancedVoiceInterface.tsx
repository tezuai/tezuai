
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mic, 
  Square, 
  Settings, 
  Bot, 
  Languages,
  Zap,
  User,
  PlayCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceSettings {
  language: string;
  accent: string;
  speed: number;
  pitch: number;
  volume: number;
  enableNoise: boolean;
  enableEcho: boolean;
  voicePersonality: string;
}

interface AdvancedVoiceInterfaceProps {
  onVoiceInput: (text: string, confidence: number) => void;
  onSettingsChange: (settings: VoiceSettings) => void;
  isEnabled: boolean;
}

export function AdvancedVoiceInterface({ 
  onVoiceInput, 
  onSettingsChange, 
  isEnabled 
}: AdvancedVoiceInterfaceProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceLevel, setVoiceLevel] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState("hi-IN");
  const [confidence, setConfidence] = useState(0);
  const [transcribedText, setTranscribedText] = useState("");
  const { toast } = useToast();

  const [settings, setSettings] = useState<VoiceSettings>({
    language: "hi-IN",
    accent: "indian",
    speed: 1.0,
    pitch: 1.0,
    volume: 0.8,
    enableNoise: true,
    enableEcho: false,
    voicePersonality: "tezu-friendly"
  });

  const languages = [
    { value: "hi-IN", label: "Hindi (India)", flag: "🇮🇳" },
    { value: "en-IN", label: "English (India)", flag: "🇮🇳" },
    { value: "en-US", label: "English (US)", flag: "🇺🇸" },
    { value: "en-GB", label: "English (UK)", flag: "🇬🇧" },
  ];

  const voicePersonalities = [
    { id: "tezu-friendly", name: "Tezu Friendly", desc: "Warm & conversational" },
    { id: "tezu-professional", name: "Tezu Professional", desc: "Business tone" },
    { id: "tezu-creative", name: "Tezu Creative", desc: "Artistic & expressive" },
    { id: "tezu-teacher", name: "Tezu Teacher", desc: "Educational & clear" },
  ];

  useEffect(() => {
    if (isRecording) {
      // Simulate voice level detection
      const interval = setInterval(() => {
        setVoiceLevel(Math.random() * 100);
      }, 100);

      return () => clearInterval(interval);
    } else {
      setVoiceLevel(0);
    }
  }, [isRecording]);

  const handleStartRecording = () => {
    if (!isEnabled) {
      toast({
        title: "Premium Feature 🔒",
        description: "Please login to access advanced voice features",
        variant: "destructive"
      });
      return;
    }

    setIsRecording(true);
    setIsListening(true);
    setTranscribedText("");
    
    // Simulate speech recognition
    setTimeout(() => {
      const mockTranscriptions = [
        "Namaste Tezu, main aapse kuch puchna chahta hun",
        "Hello Tezu, can you help me with this problem?",
        "Tezu ji, ye question solve karne mein help kariye",
        "Hey Tezu, I need assistance with my project"
      ];
      
      const randomText = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
      const mockConfidence = 85 + Math.random() * 15;
      
      setTranscribedText(randomText);
      setConfidence(mockConfidence);
      onVoiceInput(randomText, mockConfidence);
      
      toast({
        title: "Voice Recognition Complete! 🎤",
        description: `Confidence: ${mockConfidence.toFixed(1)}%`,
      });
    }, 3000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsListening(false);
  };

  const handleSettingChange = (key: keyof VoiceSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const testVoice = () => {
    if (!isEnabled) return;
    
    toast({
      title: "Voice Test 🔊",
      description: "Namaste! Main Tezu hun, aapka AI assistant!",
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">🎤 Advanced Voice Interface</h3>
        <p className="text-sm text-gray-400">Professional voice AI by Tezu</p>
      </div>

      {!isEnabled && (
        <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Premium Feature</span>
            </div>
            <p className="text-xs text-gray-300">
              Login to unlock advanced voice recognition and synthesis
            </p>
          </CardContent>
        </Card>
      )}

      {/* Voice Recording */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Voice Input
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative">
              <Button
                size="lg"
                variant={isRecording ? "destructive" : "outline"}
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`w-20 h-20 rounded-full ${
                  isRecording 
                    ? "bg-red-600 hover:bg-red-700 animate-pulse" 
                    : "border-gray-600 hover:bg-gray-700"
                }`}
                disabled={!isEnabled}
              >
                {isRecording ? (
                  <Square className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
              
              {isRecording && (
                <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping"></div>
              )}
            </div>
          </div>

          {isRecording && (
            <div className="space-y-2">
              <Label className="text-sm text-gray-300">Voice Level</Label>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${voiceLevel}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Listening...</span>
              </div>
            </div>
          )}

          {transcribedText && (
            <div className="p-3 bg-gray-700/50 rounded border-l-4 border-blue-500">
              <Label className="text-sm text-gray-300">Transcribed Text</Label>
              <p className="text-sm text-white mt-1">{transcribedText}</p>
              <div className="mt-2">
                <Badge className="bg-green-500/20 text-green-400">
                  Confidence: {confidence.toFixed(1)}%
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voice Settings */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Voice Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm text-gray-300 mb-2 block">Language</Label>
            <Select 
              value={settings.language} 
              onValueChange={(value) => handleSettingChange('language', value)}
              disabled={!isEnabled}
            >
              <SelectTrigger className="bg-gray-700/50 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm text-gray-300 mb-2 block">Voice Personality</Label>
            <Select 
              value={settings.voicePersonality} 
              onValueChange={(value) => handleSettingChange('voicePersonality', value)}
              disabled={!isEnabled}
            >
              <SelectTrigger className="bg-gray-700/50 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {voicePersonalities.map((personality) => (
                  <SelectItem key={personality.id} value={personality.id}>
                    <div>
                      <div className="font-medium">{personality.name}</div>
                      <div className="text-xs text-gray-400">{personality.desc}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-300 mb-2 block">
                Speed: {settings.speed}x
              </Label>
              <Slider
                value={[settings.speed]}
                onValueChange={([value]) => handleSettingChange('speed', value)}
                min={0.5}
                max={2.0}
                step={0.1}
                disabled={!isEnabled}
              />
            </div>
            
            <div>
              <Label className="text-sm text-gray-300 mb-2 block">
                Pitch: {settings.pitch}x
              </Label>
              <Slider
                value={[settings.pitch]}
                onValueChange={([value]) => handleSettingChange('pitch', value)}
                min={0.5}
                max={2.0}
                step={0.1}
                disabled={!isEnabled}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-300 mb-2 block">
              Volume: {Math.round(settings.volume * 100)}%
            </Label>
            <Slider
              value={[settings.volume]}
              onValueChange={([value]) => handleSettingChange('volume', value)}
              min={0}
              max={1}
              step={0.1}
              disabled={!isEnabled}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-300">Noise Reduction</Label>
              <Switch
                checked={settings.enableNoise}
                onCheckedChange={(checked) => handleSettingChange('enableNoise', checked)}
                disabled={!isEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-300">Echo Cancellation</Label>
              <Switch
                checked={settings.enableEcho}
                onCheckedChange={(checked) => handleSettingChange('enableEcho', checked)}
                disabled={!isEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="border-gray-600 text-gray-300"
          onClick={testVoice}
          disabled={!isEnabled}
        >
          <PlayCircle className="w-4 h-4 mr-2" />
          Test Voice
        </Button>
        <Button 
          variant="outline" 
          className="border-gray-600 text-gray-300"
          disabled={!isEnabled}
        >
          <Languages className="w-4 h-4 mr-2" />
          Voice Training
        </Button>
      </div>
    </div>
  );
}
