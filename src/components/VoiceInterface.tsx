
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceInterfaceProps {
  onTranscription: (text: string) => void;
  onSpeakText: (text: string) => void;
}

export function VoiceInterface({ onTranscription, onSpeakText }: VoiceInterfaceProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [speechVolume, setSpeechVolume] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;
    
    // Load available voices
    const loadVoices = () => {
      const availableVoices = synthRef.current?.getVoices() || [];
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    synthRef.current?.addEventListener('voiceschanged', loadVoices);

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
        
        if (finalTranscript) {
          onTranscription(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Failed to recognize speech. Please try again.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [onTranscription, selectedVoice, toast]);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("");
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: "Listening",
        description: "Speak now...",
      });
    } else {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthRef.current && text) {
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = voices.find(v => v.name === selectedVoice);
      
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;
      utterance.volume = speechVolume;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        toast({
          title: "Speech Error",
          description: "Failed to speak text.",
          variant: "destructive",
        });
      };

      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Mic className="w-5 h-5" />
          Voice Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Voice Recognition */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Speech to Text</span>
            <Button
              onClick={isListening ? stopListening : startListening}
              variant={isListening ? "destructive" : "default"}
              size="sm"
              className="gap-2"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isListening ? "Stop" : "Listen"}
            </Button>
          </div>
          
          {transcript && (
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-300">{transcript}</p>
            </div>
          )}
        </div>

        {/* Text to Speech */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Text to Speech</span>
            <div className="flex gap-2">
              <Button
                onClick={isSpeaking ? stopSpeaking : () => speakText("This is a test message.")}
                variant={isSpeaking ? "destructive" : "default"}
                size="sm"
                className="gap-2"
              >
                {isSpeaking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isSpeaking ? "Stop" : "Test"}
              </Button>
            </div>
          </div>

          {/* Voice Settings */}
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Voice</label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {voices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name} className="text-white">
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">Speed: {speechRate}</label>
              <Slider
                value={[speechRate]}
                onValueChange={(value) => setSpeechRate(value[0])}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">Pitch: {speechPitch}</label>
              <Slider
                value={[speechPitch]}
                onValueChange={(value) => setSpeechPitch(value[0])}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">Volume: {speechVolume}</label>
              <Slider
                value={[speechVolume]}
                onValueChange={(value) => setSpeechVolume(value[0])}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Auto-speak responses</label>
              <Switch
                checked={autoSpeak}
                onCheckedChange={setAutoSpeak}
              />
            </div>
          </div>
        </div>

        <Badge variant="secondary" className="text-xs">
          {isListening && "🎤 Listening..."}
          {isSpeaking && "🔊 Speaking..."}
          {!isListening && !isSpeaking && "Ready"}
        </Badge>
      </CardContent>
    </Card>
  );
}
