
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, MessageSquare, Clock, TrendingUp, Brain, Zap } from "lucide-react";

interface AnalyticsDashboardProps {
  conversations: any[];
}

export function AnalyticsDashboard({ conversations }: AnalyticsDashboardProps) {
  const totalMessages = conversations.reduce((sum, conv) => sum + conv.messages.length, 0);
  const totalConversations = conversations.length;
  const avgMessagesPerConv = totalConversations > 0 ? Math.round(totalMessages / totalConversations) : 0;

  // Model usage statistics
  const modelUsage = conversations.reduce((acc, conv) => {
    conv.messages.forEach((msg: any) => {
      if (msg.model) {
        acc[msg.model] = (acc[msg.model] || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  // Recent activity (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentConversations = conversations.filter(conv => 
    new Date(conv.createdAt) > weekAgo
  ).length;

  // Most active hours
  const hourlyActivity = conversations.reduce((acc, conv) => {
    conv.messages.forEach((msg: any) => {
      const hour = new Date(msg.timestamp).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
    });
    return acc;
  }, {} as Record<number, number>);

  const peakHour = Object.entries(hourlyActivity).reduce((max, [hour, count]) => 
    count > max.count ? { hour: parseInt(hour), count } : max, 
    { hour: 0, count: 0 }
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <BarChart className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">Usage Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Total Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalMessages}</div>
            <p className="text-xs text-gray-500">Across all conversations</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalConversations}</div>
            <p className="text-xs text-gray-500">{recentConversations} this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Avg. Length
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{avgMessagesPerConv}</div>
            <p className="text-xs text-gray-500">Messages per conversation</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Peak Hour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {peakHour.hour}:00
            </div>
            <p className="text-xs text-gray-500">{peakHour.count} messages</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Model Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(modelUsage)
              .sort(([,a], [,b]) => b - a)
              .map(([model, count]) => (
              <div key={model} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {model}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-300">{count} messages</div>
                  <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${(count / Math.max(...Object.values(modelUsage))) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
