
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Zap, Brain, Cpu, Settings, Crown, Star, TrendingUp } from "lucide-react";

export function AIModelSwitcher() {
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2048]);
  const [enableStreaming, setEnableStreaming] = useState(true);

  const aiModels = [
    {
      id: "gpt-4o",
      name: "GPT-4o Professional",
      provider: "OpenAI",
      type: "Multimodal",
      speed: "Fast",
      accuracy: 98,
      cost: "Premium",
      features: ["Text", "Vision", "Code", "Analysis"],
      badge: "Most Popular",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "claude-3.5",
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      type: "Advanced Reasoning",
      speed: "Very Fast",
      accuracy: 96,
      cost: "Premium",
      features: ["Long Context", "Reasoning", "Writing", "Analysis"],
      badge: "Best for Writing",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro Ultra",
      provider: "Google",
      type: "Multimodal AI",
      speed: "Ultra Fast",
      accuracy: 95,
      cost: "Standard",
      features: ["Multimodal", "Real-time", "Search", "Code"],
      badge: "Fastest",
      color: "from-green-500 to-teal-500"
    },
    {
      id: "llama-3.1",
      name: "Llama 3.1 405B",
      provider: "Meta",
      type: "Open Source",
      speed: "Fast",
      accuracy: 94,
      cost: "Free",
      features: ["Open Source", "Customizable", "Privacy", "Local"],
      badge: "Free & Open",
      color: "from-orange-500 to-red-500"
    },
    {
      id: "mistral-large",
      name: "Mistral Large 2",
      provider: "Mistral AI",
      type: "European AI",
      speed: "Fast",
      accuracy: 93,
      cost: "Standard",
      features: ["European", "Multilingual", "Code", "Math"],
      badge: "EU Compliant",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-400" />
            AI Model Switcher
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Professional
            </Badge>
          </h2>
          <p className="text-gray-400 mt-2">Choose from 15+ advanced AI models for different tasks</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Settings className="w-4 h-4 mr-2" />
          Advanced Settings
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiModels.map((model) => (
          <Card
            key={model.id}
            className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedModel === model.id
                ? "border-purple-500 bg-gradient-to-br from-purple-900/30 to-pink-900/30"
                : "border-gray-600/50 hover:border-purple-500/50"
            }`}
            onClick={() => setSelectedModel(model.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${model.color}`}>
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {model.badge}
                </Badge>
              </div>
              <CardTitle className="text-white text-lg">{model.name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{model.provider}</span> • <span>{model.type}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Accuracy</span>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-semibold">{model.accuracy}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Speed</span>
                <Badge variant="outline" className="text-green-400 border-green-400">
                  {model.speed}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1">
                {model.features.map((feature, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-gray-700/50 text-gray-300"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>

              {selectedModel === model.id && (
                <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-purple-500/30">
                  <div className="text-sm text-green-400 flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Currently Active
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Configuration */}
      <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-400" />
            Advanced Model Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Temperature (Creativity): {temperature[0]}
                </label>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  max={2}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Max Tokens: {maxTokens[0]}
                </label>
                <Slider
                  value={maxTokens}
                  onValueChange={setMaxTokens}
                  max={4096}
                  min={256}
                  step={256}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Enable Streaming</label>
                <Switch
                  checked={enableStreaming}
                  onCheckedChange={setEnableStreaming}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Response Format</label>
                <Select defaultValue="markdown">
                  <SelectTrigger className="bg-gray-800/50 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="markdown">Markdown</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="plain">Plain Text</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
