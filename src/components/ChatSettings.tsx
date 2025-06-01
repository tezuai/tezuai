
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  X,
  Brain,
  Settings,
  Palette,
  Shield,
  Zap,
  FileText,
  Mic,
  Volume2,
} from "lucide-react";

interface ChatSettingsProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
  onClose: () => void;
}

const models = [
  { id: "gpt-4", name: "GPT-4", description: "Most capable model", type: "OpenAI" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and efficient", type: "OpenAI" },
  { id: "claude-3", name: "Claude 3", description: "Anthropic's latest", type: "Anthropic" },
  { id: "gemini-pro", name: "Gemini Pro", description: "Google's advanced model", type: "Google" },
];

const personas = [
  { id: "assistant", name: "AI Assistant", prompt: "You are a helpful AI assistant." },
  { id: "creative", name: "Creative Writer", prompt: "You are a creative writing assistant focused on storytelling and imagination." },
  { id: "analyst", name: "Data Analyst", prompt: "You are a data analyst who provides insights and explanations." },
  { id: "teacher", name: "Teacher", prompt: "You are an educational assistant who explains concepts clearly." },
  { id: "developer", name: "Developer", prompt: "You are a programming assistant with expertise in software development." },
];

export function ChatSettings({ settings, onSettingsChange, onClose }: ChatSettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const updateSetting = (key: string, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="border-b border-gray-700/50 bg-gray-900/95 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Chat Settings</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <Tabs defaultValue="model" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
            <TabsTrigger value="model" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Model
            </TabsTrigger>
            <TabsTrigger value="persona" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Persona
            </TabsTrigger>
            <TabsTrigger value="behavior" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Behavior
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Voice
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="model" className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Model Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        localSettings.model === model.id
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-600 hover:border-gray-500 bg-gray-700/30"
                      }`}
                      onClick={() => updateSetting("model", model.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white">{model.name}</h3>
                        <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                          {model.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">{model.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="persona" className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  AI Persona & Behavior
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="persona" className="text-gray-300">Select Persona</Label>
                  <Select value={localSettings.persona || "assistant"} onValueChange={(value) => {
                    const selectedPersona = personas.find(p => p.id === value);
                    updateSetting("persona", value);
                    updateSetting("systemPrompt", selectedPersona?.prompt || "");
                  }}>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {personas.map((persona) => (
                        <SelectItem key={persona.id} value={persona.id} className="text-white hover:bg-gray-700">
                          {persona.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="systemPrompt" className="text-gray-300">Custom System Prompt</Label>
                  <Textarea
                    id="systemPrompt"
                    value={localSettings.systemPrompt}
                    onChange={(e) => updateSetting("systemPrompt", e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                    placeholder="Define how the AI should behave..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Response Behavior
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Temperature: {localSettings.temperature}</Label>
                    <span className="text-xs text-gray-400">Creativity level</span>
                  </div>
                  <Slider
                    value={[localSettings.temperature]}
                    onValueChange={(value) => updateSetting("temperature", value[0])}
                    max={2}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Max Tokens: {localSettings.maxTokens}</Label>
                    <span className="text-xs text-gray-400">Response length</span>
                  </div>
                  <Slider
                    value={[localSettings.maxTokens]}
                    onValueChange={(value) => updateSetting("maxTokens", value[0])}
                    max={4000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Stream Responses</Label>
                    <p className="text-xs text-gray-400">Show responses as they are generated</p>
                  </div>
                  <Switch
                    checked={localSettings.streaming !== false}
                    onCheckedChange={(checked) => updateSetting("streaming", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voice" className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  Voice & Audio Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Voice Model</Label>
                    <Select value={localSettings.voiceModel || "alloy"} onValueChange={(value) => updateSetting("voiceModel", value)}>
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="alloy" className="text-white hover:bg-gray-700">Alloy</SelectItem>
                        <SelectItem value="echo" className="text-white hover:bg-gray-700">Echo</SelectItem>
                        <SelectItem value="fable" className="text-white hover:bg-gray-700">Fable</SelectItem>
                        <SelectItem value="onyx" className="text-white hover:bg-gray-700">Onyx</SelectItem>
                        <SelectItem value="nova" className="text-white hover:bg-gray-700">Nova</SelectItem>
                        <SelectItem value="shimmer" className="text-white hover:bg-gray-700">Shimmer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Speech Speed</Label>
                    <Slider
                      value={[localSettings.speechSpeed || 1]}
                      onValueChange={(value) => updateSetting("speechSpeed", value[0])}
                      max={2}
                      min={0.5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Auto-play Responses</Label>
                    <p className="text-xs text-gray-400">Automatically read AI responses aloud</p>
                  </div>
                  <Switch
                    checked={localSettings.autoPlay || false}
                    onCheckedChange={(checked) => updateSetting("autoPlay", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Context Memory</Label>
                      <p className="text-xs text-gray-400">Remember conversation history</p>
                    </div>
                    <Switch
                      checked={localSettings.contextMemory !== false}
                      onCheckedChange={(checked) => updateSetting("contextMemory", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Safety Filter</Label>
                      <p className="text-xs text-gray-400">Content moderation</p>
                    </div>
                    <Switch
                      checked={localSettings.safetyFilter !== false}
                      onCheckedChange={(checked) => updateSetting("safetyFilter", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Analytics</Label>
                      <p className="text-xs text-gray-400">Usage statistics</p>
                    </div>
                    <Switch
                      checked={localSettings.analytics !== false}
                      onCheckedChange={(checked) => updateSetting("analytics", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Data Export</Label>
                      <p className="text-xs text-gray-400">Allow conversation export</p>
                    </div>
                    <Switch
                      checked={localSettings.dataExport !== false}
                      onCheckedChange={(checked) => updateSetting("dataExport", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-700/50">
          <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300 hover:text-white">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
