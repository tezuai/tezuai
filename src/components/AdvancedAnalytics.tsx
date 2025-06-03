
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  Target, 
  Brain,
  Zap,
  Star,
  Calendar,
  Activity
} from "lucide-react";

interface AnalyticsData {
  totalMessages: number;
  todayMessages: number;
  averageResponseTime: number;
  favoriteTopics: { name: string, count: number, color: string }[];
  weeklyActivity: { day: string, messages: number }[];
  monthlyProgress: { month: string, messages: number, satisfaction: number }[];
  personalityUsage: { name: string, usage: number }[];
  goals: { name: string, current: number, target: number }[];
}

export function AdvancedAnalytics({ conversations }: { conversations: any[] }) {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalMessages: 0,
    todayMessages: 0,
    averageResponseTime: 1.2,
    favoriteTopics: [],
    weeklyActivity: [],
    monthlyProgress: [],
    personalityUsage: [],
    goals: []
  });

  useEffect(() => {
    // Calculate analytics from conversations
    const calculateAnalytics = () => {
      const totalMessages = conversations.reduce((sum, conv) => sum + conv.messages.length, 0);
      const today = new Date().toDateString();
      const todayMessages = conversations.reduce((sum, conv) => {
        return sum + conv.messages.filter((msg: any) => 
          new Date(msg.timestamp).toDateString() === today
        ).length;
      }, 0);

      // Mock data for demo - in real app, this would come from actual usage
      const favoriteTopics = [
        { name: "General Chat", count: 45, color: "#8884d8" },
        { name: "Learning", count: 32, color: "#82ca9d" },
        { name: "Creative", count: 28, color: "#ffc658" },
        { name: "Business", count: 15, color: "#ff7300" },
        { name: "Technical", count: 12, color: "#0088fe" }
      ];

      const weeklyActivity = [
        { day: "Mon", messages: 12 },
        { day: "Tue", messages: 19 },
        { day: "Wed", messages: 8 },
        { day: "Thu", messages: 25 },
        { day: "Fri", messages: 18 },
        { day: "Sat", messages: 7 },
        { day: "Sun", messages: 15 }
      ];

      const monthlyProgress = [
        { month: "Jan", messages: 120, satisfaction: 85 },
        { month: "Feb", messages: 180, satisfaction: 88 },
        { month: "Mar", messages: 245, satisfaction: 92 },
        { month: "Apr", messages: 320, satisfaction: 90 }
      ];

      const personalityUsage = [
        { name: "Friendly", usage: 65 },
        { name: "Teacher", usage: 20 },
        { name: "Creative", usage: 10 },
        { name: "Business", usage: 3 },
        { name: "Coder", usage: 2 }
      ];

      const goals = [
        { name: "Daily Messages", current: todayMessages, target: 10 },
        { name: "Weekly Learning", current: 5, target: 7 },
        { name: "Creative Projects", current: 2, target: 3 },
        { name: "Skill Building", current: 8, target: 10 }
      ];

      setAnalytics({
        totalMessages,
        todayMessages,
        averageResponseTime: 1.2,
        favoriteTopics,
        weeklyActivity,
        monthlyProgress,
        personalityUsage,
        goals
      });
    };

    calculateAnalytics();
  }, [conversations]);

  return (
    <div className="space-y-6 p-4 bg-gradient-to-b from-gray-900/50 to-gray-800/50 min-h-screen">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">📊 Your Tezu Analytics</h2>
        <p className="text-gray-400">Detailed insights into your AI interactions</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{analytics.totalMessages}</div>
            <div className="text-xs text-gray-400">Total Messages</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{analytics.todayMessages}</div>
            <div className="text-xs text-gray-400">Today's Messages</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{analytics.averageResponseTime}s</div>
            <div className="text-xs text-gray-400">Avg Response</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">4.9</div>
            <div className="text-xs text-gray-400">Satisfaction</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Chart */}
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Weekly Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analytics.weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="messages" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Favorite Topics & Personality Usage */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Favorite Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={analytics.favoriteTopics}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={(entry) => entry.name}
                >
                  {analytics.favoriteTopics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Daily Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.goals.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-white">{goal.name}</span>
                  <span className="text-xs text-gray-400">{goal.current}/{goal.target}</span>
                </div>
                <Progress 
                  value={(goal.current / goal.target) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Personality Usage */}
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Personality Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.personalityUsage.map((personality, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-white">{personality.name}</span>
                <div className="flex items-center gap-2">
                  <Progress value={personality.usage} className="w-24 h-2" />
                  <span className="text-xs text-gray-400 w-8">{personality.usage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Brain className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">AI Insights</h4>
              <p className="text-sm text-gray-300 mb-2">
                You're most active on Thursdays and prefer friendly conversations. 
                Try exploring creative topics to enhance your experience!
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                  Peak Usage: Thursday
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                  Improving Daily
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
