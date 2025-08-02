import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { 
  Brain, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Award,
  Clock,
  Zap,
  Eye,
  Lightbulb,
  Users,
  BarChart3,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Star,
  Book,
  GraduationCap,
  Trophy,
  Flame
} from "lucide-react";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedTime: string;
  skills: string[];
  isActive: boolean;
}

interface LearningSession {
  id: string;
  topic: string;
  duration: number;
  score: number;
  date: string;
  insights: string[];
}

interface LearningGoal {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
}

interface AIInsight {
  type: 'strength' | 'weakness' | 'recommendation' | 'achievement';
  title: string;
  description: string;
  actionable: boolean;
}

export const SmartLearning = () => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [recentSessions, setRecentSessions] = useState<LearningSession[]>([]);
  const [learningGoals, setLearningGoals] = useState<LearningGoal[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [learningQuery, setLearningQuery] = useState('');
  const [isStudying, setIsStudying] = useState(false);
  const [studyTimer, setStudyTimer] = useState(0);
  const [learningStats, setLearningStats] = useState({
    totalHours: 0,
    streakDays: 0,
    skillsLearned: 0,
    certificatesEarned: 0,
    learningScore: 0
  });

  const studyTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize learning data
    const mockPaths: LearningPath[] = [
      {
        id: '1',
        title: 'AI और Machine Learning मास्टरी',
        description: 'आर्टिफिशियल इंटेलिजेंस की संपूर्ण समझ',
        difficulty: 'intermediate',
        category: 'Technology',
        progress: 65,
        totalLessons: 50,
        completedLessons: 32,
        estimatedTime: '120 घंटे',
        skills: ['Python', 'TensorFlow', 'Neural Networks', 'Deep Learning'],
        isActive: true
      },
      {
        id: '2',
        title: 'डिजिटल मार्केटिंग एक्सपर्ट',
        description: 'आधुनिक मार्केटिंग तकनीकें',
        difficulty: 'beginner',
        category: 'Business',
        progress: 40,
        totalLessons: 30,
        completedLessons: 12,
        estimatedTime: '80 घंटे',
        skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
        isActive: false
      },
      {
        id: '3',
        title: 'वेब डेवलपमेंट प्रो',
        description: 'Modern web applications बनाना सीखें',
        difficulty: 'advanced',
        category: 'Programming',
        progress: 85,
        totalLessons: 75,
        completedLessons: 64,
        estimatedTime: '200 घंटे',
        skills: ['React', 'Node.js', 'TypeScript', 'Database'],
        isActive: true
      }
    ];

    const mockGoals: LearningGoal[] = [
      {
        id: '1',
        title: 'AI Certification पूरा करना',
        targetDate: '2024-03-15',
        progress: 70,
        priority: 'high',
        status: 'active'
      },
      {
        id: '2',
        title: 'React Expert बनना',
        targetDate: '2024-02-28',
        progress: 90,
        priority: 'medium',
        status: 'active'
      }
    ];

    const mockSessions: LearningSession[] = [
      {
        id: '1',
        topic: 'Neural Networks Basics',
        duration: 45,
        score: 92,
        date: 'आज',
        insights: ['बेहतरीन फोकस', 'अच्छी समझ', 'और practice की जरूरत']
      },
      {
        id: '2',
        topic: 'React Hooks Advanced',
        duration: 60,
        score: 88,
        date: 'कल',
        insights: ['तेज़ सीखने की गति', 'प्रैक्टिकल एप्रोच अच्छा', 'डॉक्यूमेंटेशन पढ़ें']
      }
    ];

    const mockInsights: AIInsight[] = [
      {
        type: 'strength',
        title: 'तेज़ सीखने की क्षमता',
        description: 'आप नए concepts को जल्दी समझते हैं',
        actionable: false
      },
      {
        type: 'weakness',
        title: 'Practice की कमी',
        description: 'Hands-on coding में और समय दें',
        actionable: true
      },
      {
        type: 'recommendation',
        title: 'Advanced Projects शुरू करें',
        description: 'आपका level advanced projects के लिए तैयार है',
        actionable: true
      },
      {
        type: 'achievement',
        title: '30-दिन learning streak!',
        description: 'लगातार 30 दिन से सीख रहे हैं',
        actionable: false
      }
    ];

    setLearningPaths(mockPaths);
    setLearningGoals(mockGoals);
    setRecentSessions(mockSessions);
    setAiInsights(mockInsights);
    
    setLearningStats({
      totalHours: 245,
      streakDays: 30,
      skillsLearned: 15,
      certificatesEarned: 3,
      learningScore: 92
    });
  }, []);

  useEffect(() => {
    if (isStudying) {
      studyTimerRef.current = setInterval(() => {
        setStudyTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (studyTimerRef.current) {
        clearInterval(studyTimerRef.current);
      }
    }

    return () => {
      if (studyTimerRef.current) {
        clearInterval(studyTimerRef.current);
      }
    };
  }, [isStudying]);

  const startStudySession = () => {
    setIsStudying(true);
    setStudyTimer(0);
    toast.success("स्टडी सेशन शुरू!");
  };

  const pauseStudySession = () => {
    setIsStudying(false);
    toast.info("स्टडी सेशन रोका गया");
  };

  const endStudySession = () => {
    setIsStudying(false);
    const sessionMinutes = Math.floor(studyTimer / 60);
    const newSession: LearningSession = {
      id: Date.now().toString(),
      topic: selectedPath?.title || 'General Study',
      duration: sessionMinutes,
      score: Math.floor(Math.random() * 20) + 80,
      date: 'अभी',
      insights: ['अच्छा focus', 'नियमित progress', 'बेहतरीन performance']
    };
    
    setRecentSessions(prev => [newSession, ...prev.slice(0, 4)]);
    setStudyTimer(0);
    toast.success(`${sessionMinutes} मिनट का सेशन पूरा!`);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-orange-500';
      case 'expert': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return Star;
      case 'weakness': return AlertCircle;
      case 'recommendation': return Lightbulb;
      case 'achievement': return Trophy;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'strength': return 'text-green-400 bg-green-500/20';
      case 'weakness': return 'text-red-400 bg-red-500/20';
      case 'recommendation': return 'text-blue-400 bg-blue-500/20';
      case 'achievement': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <Brain className="h-8 w-8 text-purple-400" />
              Tezu AI Smart Learning System
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Adaptive Learning
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Learning Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-300/30">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-white">{learningStats.totalHours}</div>
              <div className="text-blue-200 text-sm">Total Hours</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-300/30">
            <CardContent className="p-4 text-center">
              <Flame className="h-8 w-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-white">{learningStats.streakDays}</div>
              <div className="text-green-200 text-sm">Day Streak</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-300/30">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-white">{learningStats.skillsLearned}</div>
              <div className="text-purple-200 text-sm">Skills</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-300/30">
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{learningStats.certificatesEarned}</div>
              <div className="text-yellow-200 text-sm">Certificates</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-300/30">
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 mx-auto text-indigo-400 mb-2" />
              <div className="text-2xl font-bold text-white">{learningStats.learningScore}</div>
              <div className="text-indigo-200 text-sm">AI Score</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Study Timer & Control */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-400" />
                Study Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-white mb-4">
                {formatTime(studyTimer)}
              </div>
              
              <div className="flex gap-2 justify-center mb-4">
                {!isStudying ? (
                  <Button
                    onClick={startStudySession}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Start
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={pauseStudySession}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                    >
                      <PauseCircle className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                    <Button
                      onClick={endStudySession}
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      End
                    </Button>
                  </>
                )}
              </div>

              {selectedPath && (
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/70 text-sm">Current Path:</p>
                  <p className="text-white font-semibold text-sm">{selectedPath.title}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-400" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsights.map((insight, index) => {
                  const IconComponent = getInsightIcon(insight.type);
                  return (
                    <div key={index} className={`p-3 rounded-lg ${getInsightColor(insight.type).split(' ')[1]}`}>
                      <div className="flex items-start gap-3">
                        <IconComponent className={`h-5 w-5 mt-1 ${getInsightColor(insight.type).split(' ')[0]}`} />
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-sm mb-1">{insight.title}</h4>
                          <p className="text-white/70 text-xs">{insight.description}</p>
                          {insight.actionable && (
                            <Button size="sm" className="mt-2 bg-white/20 hover:bg-white/30 text-white">
                              Action करें
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-400" />
                Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div key={session.id} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold text-sm">{session.topic}</h4>
                      <Badge className="bg-green-500 text-white">
                        {session.score}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/70 mb-2">
                      <span>{session.duration} min</span>
                      <span>{session.date}</span>
                    </div>
                    <div className="space-y-1">
                      {session.insights.map((insight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-400 rounded-full" />
                          <span className="text-white/80 text-xs">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Paths */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-400" />
              Active Learning Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <Card 
                  key={path.id} 
                  className={`bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer ${
                    selectedPath?.id === path.id ? 'ring-2 ring-purple-400' : ''
                  }`}
                  onClick={() => setSelectedPath(path)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Book className="h-5 w-5 text-blue-400" />
                        <Badge className={`${getDifficultyColor(path.difficulty)} text-white text-xs`}>
                          {path.difficulty}
                        </Badge>
                      </div>
                      {path.isActive && (
                        <Badge className="bg-green-500 text-white animate-pulse">
                          Active
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-white font-semibold mb-2">{path.title}</h3>
                    <p className="text-white/70 text-sm mb-3">{path.description}</p>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Progress</span>
                        <span className="text-white">{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-white/60">
                        <span>{path.completedLessons}/{path.totalLessons} lessons</span>
                        <span>{path.estimatedTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {path.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} className="bg-purple-500/20 text-purple-300 text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {path.skills.length > 3 && (
                        <Badge className="bg-gray-500/20 text-gray-300 text-xs">
                          +{path.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Goals */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-yellow-400" />
              Learning Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningGoals.map((goal) => (
                <div key={goal.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{goal.title}</h4>
                    <Badge className={`${
                      goal.priority === 'high' ? 'bg-red-500' :
                      goal.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    } text-white`}>
                      {goal.priority}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Progress</span>
                      <span className="text-white">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Target: {goal.targetDate}</span>
                    <Badge className={`${
                      goal.status === 'active' ? 'bg-blue-500' :
                      goal.status === 'completed' ? 'bg-green-500' :
                      'bg-gray-500'
                    } text-white`}>
                      {goal.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};