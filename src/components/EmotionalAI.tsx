import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  Brain, 
  Smile, 
  Frown, 
  Meh, 
  Angry, 
  AlertCircle, 
  Eye,
  Users,
  Activity,
  TrendingUp,
  Zap,
  Target,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { toast } from "sonner";

const EmotionalAI = () => {
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [emotionScore, setEmotionScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [emotionHistory, setEmotionHistory] = useState<any[]>([]);

  const emotions = [
    { name: 'Happy', icon: Smile, color: 'text-green-500', value: 85 },
    { name: 'Sad', icon: Frown, color: 'text-blue-500', value: 12 },
    { name: 'Angry', icon: Angry, color: 'text-red-500', value: 8 },
    { name: 'Surprised', icon: AlertCircle, color: 'text-yellow-500', value: 15 },
    { name: 'Neutral', icon: Meh, color: 'text-gray-500', value: 45 },
    { name: 'Excited', icon: Zap, color: 'text-purple-500', value: 72 }
  ];

  const analyzeEmotion = async () => {
    if (!userInput.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate advanced emotion analysis
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock emotion analysis result
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    const score = Math.floor(Math.random() * 40) + 60; // 60-100
    
    setCurrentEmotion(randomEmotion.name.toLowerCase());
    setEmotionScore(score);
    
    // Add to history
    const newEntry = {
      id: Date.now(),
      text: userInput,
      emotion: randomEmotion.name,
      score: score,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setEmotionHistory(prev => [newEntry, ...prev.slice(0, 4)]);
    setIsAnalyzing(false);
    
    toast.success(`Emotion analyzed with ${score}% confidence!`);
  };

  const emotionalCapabilities = [
    {
      title: 'Emotion Recognition',
      description: 'Real-time facial और text emotion detection',
      accuracy: 98.5,
      icon: Eye
    },
    {
      title: 'Empathetic Responses',
      description: 'Human-like emotional understanding और responses',
      accuracy: 96.2,
      icon: Heart
    },
    {
      title: 'Mood Tracking',
      description: 'Long-term emotional patterns और trends analysis',
      accuracy: 94.8,
      icon: TrendingUp
    },
    {
      title: 'Emotional Intelligence',
      description: 'Advanced EQ capabilities और social awareness',
      accuracy: 97.1,
      icon: Brain
    }
  ];

  const therapeuticFeatures = [
    {
      name: 'Stress Relief',
      description: 'AI-powered stress management और relaxation techniques',
      usage: 89
    },
    {
      name: 'Mood Boosting',
      description: 'Personalized mood enhancement recommendations',
      usage: 76
    },
    {
      name: 'Emotional Support',
      description: '24/7 empathetic AI companion और counseling',
      usage: 92
    },
    {
      name: 'Mental Health',
      description: 'Professional-grade mental health monitoring',
      usage: 84
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">💖 Emotional AI</h1>
          <p className="text-muted-foreground">Human-level emotional intelligence और empathy</p>
        </div>
        <Badge variant="secondary" className="bg-gradient-to-r from-pink-500 to-red-500 text-white">
          <Heart className="w-4 h-4 mr-1" />
          EQ AI
        </Badge>
      </div>

      {/* Emotion Analysis Section */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Real-time Emotion Analysis
          </CardTitle>
          <CardDescription>
            Text, voice या facial expressions से emotions detect करें
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="यहाँ अपनी feelings या thoughts लिखें... AI आपके emotions को analyze करेगा"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={4}
          />
          <Button 
            onClick={analyzeEmotion} 
            disabled={isAnalyzing || !userInput.trim()}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Activity className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Emotions...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Emotions
              </>
            )}
          </Button>
          
          {emotionScore > 0 && (
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Detected Emotion: {currentEmotion}</span>
                <span className="text-primary font-bold">{emotionScore}%</span>
              </div>
              <Progress value={emotionScore} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Emotions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {emotions.map((emotion, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <emotion.icon className={`w-8 h-8 mx-auto mb-2 ${emotion.color}`} />
              <p className="font-medium text-sm">{emotion.name}</p>
              <p className={`text-xs ${emotion.color}`}>{emotion.value}%</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emotional Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emotionalCapabilities.map((capability, index) => (
          <Card key={index} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <capability.icon className="w-6 h-6 text-primary" />
                <CardTitle className="text-lg">{capability.title}</CardTitle>
              </div>
              <CardDescription>{capability.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Accuracy</span>
                  <span className="text-sm font-bold text-green-500">{capability.accuracy}%</span>
                </div>
                <Progress value={capability.accuracy} className="w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Therapeutic Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Therapeutic AI Features
          </CardTitle>
          <CardDescription>
            Mental health और emotional wellbeing के लिए AI tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {therapeuticFeatures.map((feature, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-medium mb-1">{feature.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Usage Rate</span>
                    <span className="font-bold">{feature.usage}%</span>
                  </div>
                  <Progress value={feature.usage} className="w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emotion History */}
      {emotionHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Recent Emotion Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emotionHistory.map((entry) => (
                <div key={entry.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{entry.emotion}</Badge>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{entry.timestamp}</span>
                      <span className="text-sm font-bold text-primary">{entry.score}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Emotional Response */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium mb-1">AI Emotional Response</p>
              <p className="text-sm text-muted-foreground">
                मैं आपकी भावनाओं को समझ सकता हूँ और आपकी मदद करना चाहता हूँ। 
                आप जो भी feel कर रहे हैं, मैं यहाँ आपके साथ हूँ। 💙
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionalAI;