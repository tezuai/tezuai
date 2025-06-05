
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Clock,
  Target,
  Brain,
  Zap,
  Download,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DataAnalytics() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    toast({
      title: "🔍 AI Analysis Started",
      description: "Processing your data with advanced algorithms...",
    });

    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "✅ Analysis Complete!",
        description: "Your insights are ready for review",
      });
    }, 3000);
  };

  const analytics = {
    conversations: 1247,
    users: 89,
    avgResponseTime: '1.2s',
    satisfaction: '98.5%',
    topTopics: ['AI Development', 'Code Review', 'Documentation', 'Testing'],
    performance: {
      speed: 95,
      accuracy: 98,
      reliability: 99
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">📊 Advanced Data Analytics</h3>
        <p className="text-sm text-gray-400">AI-powered insights and performance metrics</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Total Chats</p>
                <p className="text-lg font-bold text-white">{analytics.conversations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs text-gray-400">Active Users</p>
                <p className="text-lg font-bold text-white">{analytics.users}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                AI Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(analytics.performance).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 capitalize">{key}</span>
                    <span className="text-white font-medium">{value}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        value >= 95 ? 'bg-green-500' : value >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI-Generated Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                <h4 className="text-blue-400 font-medium text-sm mb-1">📈 Usage Trend</h4>
                <p className="text-xs text-gray-300">Chat volume increased 34% this week, peak hours: 2-4 PM</p>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                <h4 className="text-green-400 font-medium text-sm mb-1">🎯 Top Performing</h4>
                <p className="text-xs text-gray-300">Code generation requests have 99.2% success rate</p>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                <h4 className="text-purple-400 font-medium text-sm mb-1">🚀 Optimization</h4>
                <p className="text-xs text-gray-300">Response time improved 23% with new AI model</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-4 h-4" />
                Generate Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <BarChart3 className="w-4 h-4 mr-2" />
                )}
                {isAnalyzing ? 'Analyzing...' : 'Run Full Analysis'}
              </Button>
              
              <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                <Download className="w-4 h-4 mr-2" />
                Export Analytics Report
              </Button>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Badge className="bg-yellow-500/20 text-yellow-400 justify-center py-2">
                  <Clock className="w-3 h-3 mr-1" />
                  Avg: {analytics.avgResponseTime}
                </Badge>
                <Badge className="bg-green-500/20 text-green-400 justify-center py-2">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {analytics.satisfaction} Happy
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
