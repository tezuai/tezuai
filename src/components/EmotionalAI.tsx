import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  Heart, 
  Brain, 
  Smile, 
  Frown, 
  Meh, 
  Activity,
  Target,
  Users,
  Sparkles,
  Eye,
  Ear,
  MessageCircle
} from "lucide-react";

interface EmotionalState {
  emotion: string;
  intensity: number;
  color: string;
  icon: any;
}

interface EmpathyMetric {
  category: string;
  score: number;
  description: string;
  icon: any;
}

export function EmotionalAI() {
  const [currentMood, setCurrentMood] = useState("neutral");
  const [emotionalStates, setEmotionalStates] = useState<EmotionalState[]>([
    { emotion: "Joy", intensity: 75, color: "text-yellow-400", icon: Smile },
    { emotion: "Empathy", intensity: 90, color: "text-blue-400", icon: Heart },
    { emotion: "Curiosity", intensity: 85, color: "text-purple-400", icon: Brain },
    { emotion: "Calmness", intensity: 70, color: "text-green-400", icon: Meh }
  ]);

  const [empathyMetrics, setEmpathyMetrics] = useState<EmpathyMetric[]>([
    {
      category: "Emotional Recognition",
      score: 94,
      description: "Understanding user emotions from text and voice",
      icon: Eye
    },
    {
      category: "Contextual Awareness",
      score: 89,
      description: "Recognizing situational and cultural context",
      icon: Brain
    },
    {
      category: "Response Adaptation",
      score: 92,
      description: "Adapting communication style to user needs",
      icon: MessageCircle
    },
    {
      category: "Active Listening",
      score: 96,
      description: "Processing and understanding user concerns",
      icon: Ear
    }
  ]);

  const [emotionalIntelligence, setEmotionalIntelligence] = useState(88);
  const [empathyLevel, setEmpathyLevel] = useState([85]);

  const moodEmojis = {
    happy: "😊",
    sad: "😢", 
    excited: "🤩",
    calm: "😌",
    neutral: "😐",
    thoughtful: "🤔"
  };

  const emotionalInsights = [
    "User seems stressed - suggesting calming response approach",
    "Positive engagement detected - maintaining encouraging tone",
    "Confusion identified - switching to simpler explanations",
    "Excitement present - matching enthusiastic energy level"
  ];

  const adjustEmpathy = (value: number[]) => {
    setEmpathyLevel(value);
    // Simulate adjustment effects
    setEmpathyMetrics(prev => prev.map(metric => ({
      ...metric,
      score: Math.min(100, metric.score + (value[0] - empathyLevel[0]) * 0.1)
    })));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate emotional state changes
      setEmotionalStates(prev => prev.map(state => ({
        ...state,
        intensity: Math.max(50, Math.min(100, state.intensity + (Math.random() - 0.5) * 10))
      })));

      // Update emotional intelligence
      setEmotionalIntelligence(prev => 
        Math.max(80, Math.min(100, prev + (Math.random() - 0.5) * 2))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">❤️ Emotional Intelligence & Empathy</h2>
        <p className="text-gray-400">Advanced emotional understanding and empathetic AI responses</p>
      </div>

      {/* Emotional State Monitor */}
      <Card className="bg-gradient-to-r from-pink-500/10 to-red-500/10 border-pink-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Heart className="w-5 h-5 text-pink-400" />
            Current Emotional State
            <span className="text-2xl ml-auto">{moodEmojis[currentMood as keyof typeof moodEmojis]}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {emotionalStates.map((state) => {
              const Icon = state.icon;
              return (
                <div key={state.emotion} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${state.color}`} />
                      <span className="text-sm text-gray-300">{state.emotion}</span>
                    </div>
                    <span className={`text-sm font-medium ${state.color}`}>
                      {state.intensity}%
                    </span>
                  </div>
                  <Progress value={state.intensity} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Empathy Configuration */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="w-5 h-5 text-blue-400" />
            Empathy Level Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Empathy Sensitivity</label>
              <span className="text-sm font-medium text-blue-400">{empathyLevel[0]}%</span>
            </div>
            <Slider
              value={empathyLevel}
              onValueChange={adjustEmpathy}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-gray-400">
              Higher levels result in more empathetic and emotionally aware responses
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Empathy Metrics */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Target className="w-5 h-5 text-green-400" />
            Empathy & EQ Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {empathyMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.category} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                <Icon className="w-6 h-6 text-blue-400" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-white">{metric.category}</h4>
                    <span className="text-sm font-medium text-green-400">{metric.score}%</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{metric.description}</p>
                  <Progress value={metric.score} className="h-1" />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Real-Time Emotional Insights */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="w-5 h-5 text-purple-400" />
            Real-Time Emotional Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emotionalInsights.map((insight, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">{insight}</span>
              <Badge className="bg-purple-500/20 text-purple-400 ml-auto">Live</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Emotional Intelligence Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
          <CardContent className="p-4 text-center">
            <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{emotionalIntelligence.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">Emotional IQ</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{empathyLevel[0]}%</div>
            <p className="text-sm text-gray-400">Empathy Level</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">2,847</div>
            <p className="text-sm text-gray-400">Emotional Interactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Mood Selection */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Smile className="w-5 h-5 text-yellow-400" />
            Quick Mood Adjustment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(moodEmojis).map(([mood, emoji]) => (
              <Button
                key={mood}
                variant={currentMood === mood ? "default" : "outline"}
                className="h-12 text-lg"
                onClick={() => setCurrentMood(mood)}
              >
                {emoji} {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}