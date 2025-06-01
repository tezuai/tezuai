
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Zap, 
  Settings, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Cpu,
  BarChart3,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIModel {
  id: string;
  name: string;
  provider: string;
  version: string;
  description: string;
  capabilities: string[];
  performance: {
    speed: number;
    accuracy: number;
    creativity: number;
    reasoning: number;
  };
  pricing: {
    input: number;
    output: number;
    unit: string;
  };
  limits: {
    maxTokens: number;
    contextWindow: number;
    rateLimit: number;
  };
  status: "available" | "limited" | "maintenance";
  isRecommended?: boolean;
}

interface ModelConfig {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  systemPrompt: string;
  streamResponse: boolean;
  enableFunctionCalling: boolean;
}

interface AIModelSwitcherProps {
  currentModel: string;
  onModelChange: (modelId: string, config: ModelConfig) => void;
  usage?: {
    tokensUsed: number;
    requestsToday: number;
    costToday: number;
  };
}

const availableModels: AIModel[] = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    version: "gpt-4-0125-preview",
    description: "Most capable model with superior reasoning and creativity",
    capabilities: ["Text Generation", "Code", "Analysis", "Creative Writing", "Function Calling"],
    performance: { speed: 75, accuracy: 95, creativity: 90, reasoning: 95 },
    pricing: { input: 0.01, output: 0.03, unit: "per 1K tokens" },
    limits: { maxTokens: 4096, contextWindow: 128000, rateLimit: 500 },
    status: "available",
    isRecommended: true
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI", 
    version: "gpt-3.5-turbo-0125",
    description: "Fast and efficient for most conversational tasks",
    capabilities: ["Text Generation", "Code", "Basic Analysis", "Function Calling"],
    performance: { speed: 95, accuracy: 85, creativity: 80, reasoning: 80 },
    pricing: { input: 0.0005, output: 0.0015, unit: "per 1K tokens" },
    limits: { maxTokens: 4096, contextWindow: 16385, rateLimit: 3500 },
    status: "available"
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    version: "claude-3-opus-20240229",
    description: "Excellent for complex reasoning and analysis tasks",
    capabilities: ["Text Generation", "Analysis", "Math", "Code", "Creative Writing"],
    performance: { speed: 70, accuracy: 92, creativity: 85, reasoning: 92 },
    pricing: { input: 0.015, output: 0.075, unit: "per 1K tokens" },
    limits: { maxTokens: 4096, contextWindow: 200000, rateLimit: 50 },
    status: "available"
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet", 
    provider: "Anthropic",
    version: "claude-3-sonnet-20240229",
    description: "Balanced performance and speed for everyday tasks",
    capabilities: ["Text Generation", "Analysis", "Code", "Creative Writing"],
    performance: { speed: 85, accuracy: 88, creativity: 82, reasoning: 87 },
    pricing: { input: 0.003, output: 0.015, unit: "per 1K tokens" },
    limits: { maxTokens: 4096, contextWindow: 200000, rateLimit: 100 },
    status: "available"
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    version: "gemini-1.0-pro",
    description: "Google's advanced AI with multimodal capabilities",
    capabilities: ["Text Generation", "Image Understanding", "Code", "Analysis"],
    performance: { speed: 80, accuracy: 85, creativity: 78, reasoning: 83 },
    pricing: { input: 0.00025, output: 0.0005, unit: "per 1K tokens" },
    limits: { maxTokens: 2048, contextWindow: 32768, rateLimit: 60 },
    status: "available"
  }
];

export function AIModelSwitcher({ currentModel, onModelChange, usage }: AIModelSwitcherProps) {
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [config, setConfig] = useState<ModelConfig>({
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    systemPrompt: "You are a helpful AI assistant.",
    streamResponse: true,
    enableFunctionCalling: false
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const model = availableModels.find(m => m.id === currentModel);
    setSelectedModel(model || availableModels[0]);
  }, [currentModel]);

  const handleModelSelect = (modelId: string) => {
    const model = availableModels.find(m => m.id === modelId);
    if (model) {
      setSelectedModel(model);
      // Reset some config values based on model limits
      const newConfig = {
        ...config,
        maxTokens: Math.min(config.maxTokens, model.limits.maxTokens)
      };
      setConfig(newConfig);
      onModelChange(modelId, newConfig);
      
      toast({
        title: "Model Changed",
        description: `Switched to ${model.name}`,
      });
    }
  };

  const updateConfig = (key: keyof ModelConfig, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    if (selectedModel) {
      onModelChange(selectedModel.id, newConfig);
    }
  };

  const getStatusColor = (status: AIModel["status"]) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "limited": return "bg-yellow-500";
      case "maintenance": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const estimateCost = (tokens: number) => {
    if (!selectedModel) return 0;
    const inputTokens = tokens * 0.7; // Assume 70% input
    const outputTokens = tokens * 0.3; // Assume 30% output
    return ((inputTokens * selectedModel.pricing.input) + (outputTokens * selectedModel.pricing.output)) / 1000;
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="w-5 h-5" />
          AI Model Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Usage Statistics */}
        {usage && (
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-700/30 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{usage.tokensUsed.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Tokens Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{usage.requestsToday}</div>
              <div className="text-xs text-gray-400">Requests Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">${usage.costToday.toFixed(2)}</div>
              <div className="text-xs text-gray-400">Cost Today</div>
            </div>
          </div>
        )}

        {/* Model Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-white">AI Model</label>
          <Select value={selectedModel?.id} onValueChange={handleModelSelect}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {availableModels.map((model) => (
                <SelectItem key={model.id} value={model.id} className="text-white">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(model.status)}`} />
                    {model.name}
                    {model.isRecommended && <Badge variant="secondary" className="text-xs">Recommended</Badge>}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model Information */}
        {selectedModel && (
          <Card className="bg-gray-700/30 border-gray-600">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-white flex items-center gap-2">
                    {selectedModel.name}
                    <Badge variant="outline" className="text-xs">{selectedModel.provider}</Badge>
                    {selectedModel.isRecommended && (
                      <Badge className="text-xs bg-blue-500">Recommended</Badge>
                    )}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">{selectedModel.description}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedModel.status)}`} />
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-gray-400">Speed</span>
                  </div>
                  <Progress value={selectedModel.performance.speed} className="h-2" />
                  <div className="text-xs text-white mt-1">{selectedModel.performance.speed}%</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-gray-400">Accuracy</span>
                  </div>
                  <Progress value={selectedModel.performance.accuracy} className="h-2" />
                  <div className="text-xs text-white mt-1">{selectedModel.performance.accuracy}%</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Brain className="w-3 h-3 text-purple-400" />
                    <span className="text-xs text-gray-400">Creative</span>
                  </div>
                  <Progress value={selectedModel.performance.creativity} className="h-2" />
                  <div className="text-xs text-white mt-1">{selectedModel.performance.creativity}%</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Cpu className="w-3 h-3 text-blue-400" />
                    <span className="text-xs text-gray-400">Reasoning</span>
                  </div>
                  <Progress value={selectedModel.performance.reasoning} className="h-2" />
                  <div className="text-xs text-white mt-1">{selectedModel.performance.reasoning}%</div>
                </div>
              </div>

              {/* Capabilities */}
              <div className="mb-4">
                <span className="text-xs text-gray-400 mb-2 block">Capabilities:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedModel.capabilities.map(cap => (
                    <Badge key={cap} variant="outline" className="text-xs">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Pricing & Limits */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-gray-400">
                    <DollarSign className="w-3 h-3" />
                    Pricing
                  </div>
                  <div className="text-white">
                    Input: ${selectedModel.pricing.input} {selectedModel.pricing.unit}
                  </div>
                  <div className="text-white">
                    Output: ${selectedModel.pricing.output} {selectedModel.pricing.unit}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Info className="w-3 h-3" />
                    Limits
                  </div>
                  <div className="text-white">
                    Max Tokens: {selectedModel.limits.maxTokens.toLocaleString()}
                  </div>
                  <div className="text-white">
                    Context: {selectedModel.limits.contextWindow.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Cost Estimate */}
              <div className="mt-3 p-2 bg-gray-600/30 rounded text-xs">
                <span className="text-gray-400">Estimated cost for {config.maxTokens} tokens: </span>
                <span className="text-green-400 font-medium">
                  ${estimateCost(config.maxTokens).toFixed(4)}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Configuration */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Model Configuration</h4>
          
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Temperature: {config.temperature}
            </label>
            <Slider
              value={[config.temperature]}
              onValueChange={(value) => updateConfig('temperature', value[0])}
              min={0}
              max={2}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-gray-400 mt-1">Controls randomness in responses</p>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Max Tokens: {config.maxTokens}
            </label>
            <Slider
              value={[config.maxTokens]}
              onValueChange={(value) => updateConfig('maxTokens', value[0])}
              min={100}
              max={selectedModel?.limits.maxTokens || 4000}
              step={100}
              className="w-full"
            />
            <p className="text-xs text-gray-400 mt-1">
              Maximum length of response ({selectedModel?.limits.maxTokens.toLocaleString()} max)
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Top P: {config.topP}
            </label>
            <Slider
              value={[config.topP]}
              onValueChange={(value) => updateConfig('topP', value[0])}
              min={0}
              max={1}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-gray-400 mt-1">Controls diversity via nucleus sampling</p>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">System Prompt</label>
            <Textarea
              value={config.systemPrompt}
              onChange={(e) => updateConfig('systemPrompt', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
              placeholder="Set the AI's behavior and personality..."
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-300">Stream Response</label>
              <p className="text-xs text-gray-400">Receive response in real-time</p>
            </div>
            <Switch
              checked={config.streamResponse}
              onCheckedChange={(checked) => updateConfig('streamResponse', checked)}
            />
          </div>

          {selectedModel?.capabilities.includes("Function Calling") && (
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">Function Calling</label>
                <p className="text-xs text-gray-400">Enable tool usage and function calls</p>
              </div>
              <Switch
                checked={config.enableFunctionCalling}
                onCheckedChange={(checked) => updateConfig('enableFunctionCalling', checked)}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
