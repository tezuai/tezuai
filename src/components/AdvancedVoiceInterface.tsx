
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  Square,
  Settings,
  Waveform,
  Radio,
  Headphones,
  MessageSquare,
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
  voiceType: 'male' | 'female' | 'robotic';
  enableEmotion: boolean;
  noiseReduction: boolean;
  autoTranscribe: boolean;
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
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [transcriptText, setTranscriptText] = useState('');
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    language: 'hi-IN',
    accent: 'indian',
    speed: 1.0,
    pitch: 1.0,
    volume: 0.8,
    voiceType: 'female',
    enableEmotion: true,
    noiseReduction: true,
    autoTranscribe: true
  });
  
  const { toast } = useToast();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Voice recognition simulation
  const startListening = async () => {
    if (!isEnabled) {
      toast({
        title: "Voice not enabled",
        description: "Please enable voice features first",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsListening(true);
      setTranscriptText('');
      
      // Simulate getting microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Simulate voice recognition
      setTimeout(() => {
        const sampleTexts = [
          "Namaste Tezu, mujhe help chahiye",
          "Kya aap Hindi mein baat kar sakte hain?",
          "Please explain this topic in detail",
          "Create a summary of this document",
          "How can I improve my productivity?"
        ];
        
        const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        const confidence = 0.85 + Math.random() * 0.15;
        
        setTranscriptText(randomText);
        setConfidence(confidence);
        onVoiceInput(randomText, confidence);
        
        toast({
          title: "Voice recognized! 🎤",
          description: `Confidence: ${Math.round(confidence * 100)}%`,
        });
        
        setIsListening(false);
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Microphone Error",
        description: "Could not access microphone",
        variant: "destructive"
      });
      setIsListening(false);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const speakText = (text: string) => {
    if (!isEnabled) return;
    
    setIsSpeaking(true);
    
    // Simulate text-to-speech
    setTimeout(() => {
      setIsSpeaking(false);
      toast({
        title: "Speech completed",
        description: "AI response has been spoken",
      });
    }, text.length * 50); // Simulate speaking duration
  };

  const updateSetting = (key: keyof VoiceSettings, value: any) => {
    const newSettings = { ...voiceSettings, [key]: value };
    setVoiceSettings(newSettings);
    onSettingsChange(newSettings);
  };

  // Simulate audio level animation
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [isListening]);

  const languages = [
    { code: 'hi-IN', name: 'Hindi (India)' },
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-IN', name: 'English (India)' },
    { code: 'bn-IN', name: 'Bengali' },
    { code: 'ta-IN', name: 'Tamil' },
    { code: 'te-IN', name: 'Telugu' },
    { code: 'mr-IN', name: 'Marathi' },
    { code: 'gu-IN', name: 'Gujarati' }
  ];

  const accents = [
    { value: 'indian', name: 'Indian' },
    { value: 'american', name: 'American' },
    { value: 'british', name: 'British' },
    { value: 'australian', name: 'Australian' }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">🎤 Advanced Voice AI</h3>
        <p className="text-sm text-gray-400">Natural voice conversations with Tezu</p>
      </div>

      {/* Voice Control Panel */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Radio className="w-5 h-5" />
            Voice Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={isListening ? stopListening : startListening}
              className={`${
                isListening
                  ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-700'
              } rounded-full w-16 h-16`}
              disabled={!isEnabled}
            >
              {isListening ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>

            <div className="flex flex-col items-center gap-2">
              <div className="text-xs text-gray-400">
                {isListening ? 'Listening...' : 'Tap to speak'}
              </div>
              
              {/* Audio Level Indicator */}
              <div className="flex items-center gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-6 rounded-full transition-all duration-100 ${
                      audioLevel > i * 10 
                        ? 'bg-blue-400' 
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => speakText("Hello, I am Tezu AI assistant")}
              className="bg-green-600 hover:bg-green-700 rounded-full w-16 h-16"
              disabled={!isEnabled || isSpeaking}
            >
              {isSpeaking ? (
                <Waveform className="w-6 h-6 animate-pulse" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </Button>
          </div>

          {/* Status Display */}
          <div className="text-center space-y-2">
            {transcriptText && (
              <div className="p-3 bg-gray-700/50 rounded-lg">
                <div className="text-sm text-gray-300 mb-1">Last Transcript:</div>
                <div className="text-white">{transcriptText}</div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                    Confidence: {Math.round(confidence * 100)}%
                  </Badge>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-400' : 'bg-gray-600'}`} />
                {isListening ? 'Recording' : 'Ready'}
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-green-400' : 'bg-gray-600'}`} />
                {isSpeaking ? 'Speaking' : 'Silent'}
              </div>
            </div>
          </div>
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
          {/* Language Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Language</label>
              <Select value={voiceSettings.language} onValueChange={(value) => updateSetting('language', value)}>
                <SelectTrigger className="bg-gray-700/50 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Accent</label>
              <Select value={voiceSettings.accent} onValueChange={(value) => updateSetting('accent', value)}>
                <SelectTrigger className="bg-gray-700/50 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {accents.map((accent) => (
                    <SelectItem key={accent.value} value={accent.value}>
                      {accent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Voice Type */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Voice Type</label>
            <div className="flex gap-2">
              {['female', 'male', 'robotic'].map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant={voiceSettings.voiceType === type ? "default" : "outline"}
                  onClick={() => updateSetting('voiceType', type)}
                  className={`${
                    voiceSettings.voiceType === type
                      ? 'bg-blue-600 text-white'
                      : 'border-gray-600 text-gray-300'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Speed: {voiceSettings.speed.toFixed(1)}x
              </label>
              <Slider
                value={[voiceSettings.speed]}
                onValueChange={([value]) => updateSetting('speed', value)}
                min={0.5}
                max={2.0}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Pitch: {voiceSettings.pitch.toFixed(1)}
              </label>
              <Slider
                value={[voiceSettings.pitch]}
                onValueChange={([value]) => updateSetting('pitch', value)}
                min={0.5}
                max={2.0}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Volume: {Math.round(voiceSettings.volume * 100)}%
              </label>
              <Slider
                value={[voiceSettings.volume]}
                onValueChange={([value]) => updateSetting('volume', value)}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          {/* Toggle Options */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Emotional Voice</span>
              <Button
                size="sm"
                variant={voiceSettings.enableEmotion ? "default" : "outline"}
                onClick={() => updateSetting('enableEmotion', !voiceSettings.enableEmotion)}
              >
                {voiceSettings.enableEmotion ? 'On' : 'Off'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Noise Reduction</span>
              <Button
                size="sm"
                variant={voiceSettings.noiseReduction ? "default" : "outline"}
                onClick={() => updateSetting('noiseReduction', !voiceSettings.noiseReduction)}
              >
                {voiceSettings.noiseReduction ? 'On' : 'Off'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Auto Transcribe</span>
              <Button
                size="sm"
                variant={voiceSettings.autoTranscribe ? "default" : "outline"}
                onClick={() => updateSetting('autoTranscribe', !voiceSettings.autoTranscribe)}
              >
                {voiceSettings.autoTranscribe ? 'On' : 'Off'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
          <MessageSquare className="w-4 h-4 mr-2" />
          Voice Commands
        </Button>
        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
          <Languages className="w-4 h-4 mr-2" />
          Test Voice
        </Button>
      </div>

      {/* Voice Tips */}
      <div className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-400">Voice Tips</span>
        </div>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>• Speak clearly and at normal pace</li>
          <li>• Use "Hey Tezu" to wake up voice mode</li>
          <li>• Try different languages for better experience</li>
        </ul>
      </div>
    </div>
  );
}
