import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Brain, 
  Target, 
  Zap, 
  Activity,
  BarChart3,
  Lightbulb,
  Compass,
  Clock,
  Star
} from "lucide-react";

interface Prediction {
  id: string;
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  category: "market" | "technology" | "behavior" | "trend";
  impact: "low" | "medium" | "high";
}

interface Insight {
  type: string;
  message: string;
  confidence: number;
  actionable: boolean;
}

export function PredictiveIntelligence() {
  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      id: "1",
      title: "AI Technology Adoption Surge",
      description: "Massive increase in AI adoption across industries expected",
      confidence: 94,
      timeframe: "Next 6 months",
      category: "technology",
      impact: "high"
    },
    {
      id: "2", 
      title: "Remote Work Preference Shift",
      description: "Hybrid work models will become the dominant preference",
      confidence: 87,
      timeframe: "Next 12 months",
      category: "behavior",
      impact: "high"
    },
    {
      id: "3",
      title: "Voice Interface Revolution",
      description: "Voice-based interactions will overtake text in AI applications",
      confidence: 82,
      timeframe: "Next 18 months",
      category: "trend",
      impact: "medium"
    },
    {
      id: "4",
      title: "Sustainable Tech Growth",
      description: "Green technology investments will double in emerging markets",
      confidence: 79,
      timeframe: "Next 24 months",
      category: "market",
      impact: "high"
    }
  ]);

  const [realTimeInsights, setRealTimeInsights] = useState<Insight[]>([
    {
      type: "Market Trend",
      message: "AI chatbot usage increased 340% in the last week",
      confidence: 95,
      actionable: true
    },
    {
      type: "User Behavior",
      message: "Users prefer voice commands during evening hours",
      confidence: 88,
      actionable: true
    },
    {
      type: "Technology Shift",
      message: "Multimodal AI requests growing exponentially",
      confidence: 92,
      actionable: false
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "market": return "bg-green-500/20 text-green-400";
      case "technology": return "bg-blue-500/20 text-blue-400";
      case "behavior": return "bg-purple-500/20 text-purple-400";
      case "trend": return "bg-yellow-500/20 text-yellow-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  const runPredictiveAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Simulate new predictions
      const newPrediction: Prediction = {
        id: Date.now().toString(),
        title: "Personalized AI Assistants Boom",
        description: "Custom AI personalities will become mainstream",
        confidence: Math.floor(Math.random() * 20) + 80,
        timeframe: "Next 3 months",
        category: "technology",
        impact: "high"
      };
      setPredictions(prev => [newPrediction, ...prev.slice(0, 3)]);
    }, 3000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Update confidence scores and add new insights
      setPredictions(prev => prev.map(p => ({
        ...p,
        confidence: Math.max(70, Math.min(99, p.confidence + (Math.random() - 0.5) * 3))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">🔮 Predictive Intelligence Engine</h2>
        <p className="text-gray-400">Advanced AI-powered forecasting and trend analysis</p>
      </div>

      {/* Predictive Analysis Control */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Neural Prediction Engine</h3>
                <p className="text-sm text-gray-400">AI-powered future insights and trend forecasting</p>
              </div>
            </div>
            <Button 
              onClick={runPredictiveAnalysis}
              disabled={isAnalyzing}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Real-Time Insights */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            Real-Time Intelligence Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {realTimeInsights.map((insight, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white">{insight.type}</span>
                  <Badge variant="outline" className="text-xs">
                    {insight.confidence}% confident
                  </Badge>
                  {insight.actionable && (
                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                      Actionable
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-400">{insight.message}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Predictions Grid */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-400" />
          Future Predictions & Forecasts
        </h3>
        
        {predictions.map((prediction) => (
          <Card key={prediction.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-white">{prediction.title}</h4>
                    <Badge className={getCategoryColor(prediction.category)}>
                      {prediction.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{prediction.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-400" />
                      <span className="text-gray-300">{prediction.timeframe}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className={`w-3 h-3 ${getImpactColor(prediction.impact)}`} />
                      <span className={getImpactColor(prediction.impact)}>
                        {prediction.impact.charAt(0).toUpperCase() + prediction.impact.slice(1)} Impact
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-white mb-1">
                    {prediction.confidence}%
                  </div>
                  <div className="w-16">
                    <Progress value={prediction.confidence} className="h-2" />
                  </div>
                  <span className="text-xs text-gray-400">Confidence</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Dashboard */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="w-5 h-5 text-green-400" />
            Predictive Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">94.2%</div>
              <p className="text-sm text-gray-400">Prediction Accuracy</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
              <Compass className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">12,847</div>
              <p className="text-sm text-gray-400">Data Points Analyzed</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
              <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">156</div>
              <p className="text-sm text-gray-400">Active Predictions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}