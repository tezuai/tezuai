
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  MessageSquare,
  User,
  Zap,
  Target,
  Award,
  Calendar,
  Activity
} from "lucide-react";

export function AdvancedAnalytics() {
  const [analyticsData] = useState({
    totalChats: 145,
    totalMessages: 1250,
    avgResponseTime: 1.2,
    userSatisfaction: 96,
    topFeatures: [
      { name: "AI Chat", usage: 85, trend: "+12%" },
      { name: "Voice Interface", usage: 72, trend: "+8%" },
      { name: "File Processing", usage: 58, trend: "+15%" },
      { name: "Code Compiler", usage: 45, trend: "+22%" },
      { name: "Templates", usage: 38, trend: "+5%" }
    ],
    dailyStats: {
      today: 25,
      yesterday: 22,
      thisWeek: 156,
      thisMonth: 678
    },
    performanceMetrics: {
      aiAccuracy: 94,
      responseSpeed: 88,
      userEngagement: 92,
      systemUptime: 99.8
    }
  });

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">📊 Advanced Analytics</h3>
        <p className="text-sm text-gray-400">Deep insights and performance metrics</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{analyticsData.totalChats}</div>
                <div className="text-xs text-gray-400">Total Conversations</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{analyticsData.totalMessages}</div>
                <div className="text-xs text-gray-400">Messages Sent</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{analyticsData.avgResponseTime}s</div>
                <div className="text-xs text-gray-400">Avg Response Time</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{analyticsData.userSatisfaction}%</div>
                <div className="text-xs text-gray-400">Satisfaction Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Activity */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Daily Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Today</span>
                <Badge className="bg-green-500/20 text-green-400">
                  {analyticsData.dailyStats.today} chats
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Yesterday</span>
                <Badge className="bg-blue-500/20 text-blue-400">
                  {analyticsData.dailyStats.yesterday} chats
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">This Week</span>
                <Badge className="bg-purple-500/20 text-purple-400">
                  {analyticsData.dailyStats.thisWeek} chats
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">This Month</span>
                <Badge className="bg-orange-500/20 text-orange-400">
                  {analyticsData.dailyStats.thisMonth} chats
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Feature Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analyticsData.topFeatures.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{feature.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-500/20 text-blue-400">{feature.usage}%</Badge>
                      <Badge className="bg-green-500/20 text-green-400">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {feature.trend}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={feature.usage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">AI Accuracy</span>
                  <Badge className="bg-green-500/20 text-green-400">
                    {analyticsData.performanceMetrics.aiAccuracy}%
                  </Badge>
                </div>
                <Progress value={analyticsData.performanceMetrics.aiAccuracy} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Response Speed</span>
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {analyticsData.performanceMetrics.responseSpeed}%
                  </Badge>
                </div>
                <Progress value={analyticsData.performanceMetrics.responseSpeed} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">User Engagement</span>
                  <Badge className="bg-purple-500/20 text-purple-400">
                    {analyticsData.performanceMetrics.userEngagement}%
                  </Badge>
                </div>
                <Progress value={analyticsData.performanceMetrics.userEngagement} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">System Uptime</span>
                  <Badge className="bg-green-500/20 text-green-400">
                    {analyticsData.performanceMetrics.systemUptime}%
                  </Badge>
                </div>
                <Progress value={analyticsData.performanceMetrics.systemUptime} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Top Performance</span>
                </div>
                <p className="text-xs text-gray-300">
                  Voice interface usage increased by 15% this week
                </p>
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Trending Feature</span>
                </div>
                <p className="text-xs text-gray-300">
                  Code compiler is your most used new feature
                </p>
              </div>

              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-400">User Behavior</span>
                </div>
                <p className="text-xs text-gray-300">
                  Most active during afternoon hours (2-5 PM)
                </p>
              </div>

              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium text-orange-400">Communication</span>
                </div>
                <p className="text-xs text-gray-300">
                  Hindi-English mixed responses preferred 85% of time
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
