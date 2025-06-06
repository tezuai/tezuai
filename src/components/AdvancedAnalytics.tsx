
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  PieChart,
  LineChart,
  Download,
  FileText,
  Calendar,
  Settings,
  Zap,
  TrendingUp,
  TrendingDown,
  Share,
  RefreshCw,
  ArrowRight,
  Users,
  MessageSquare,
  Clock,
  HelpCircle,
  Target,
  BrainCircuit,
  Lightbulb
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart as RechartsPieChart,
  Pie
} from "recharts";

export function AdvancedAnalytics() {
  const [dateRange, setDateRange] = useState("30d");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Sample data for charts
  const usageData = [
    { name: "Jan 1", messages: 400, queries: 240, interactions: 140 },
    { name: "Jan 5", messages: 300, queries: 139, interactions: 980 },
    { name: "Jan 10", messages: 200, queries: 980, interactions: 200 },
    { name: "Jan 15", messages: 278, queries: 390, interactions: 400 },
    { name: "Jan 20", messages: 189, queries: 480, interactions: 218 },
    { name: "Jan 25", messages: 239, queries: 380, interactions: 250 },
    { name: "Jan 30", messages: 349, queries: 430, interactions: 210 }
  ];

  const modelUsageData = [
    { name: "GPT-4o", value: 35, color: "#16a34a" },
    { name: "Claude 3.5", value: 25, color: "#7e22ce" },
    { name: "Gemini Pro", value: 20, color: "#0ea5e9" },
    { name: "Llama 3", value: 15, color: "#f97316" },
    { name: "Mistral", value: 5, color: "#8b5cf6" }
  ];

  const performanceMetrics = [
    {
      name: "Average Response Time",
      value: "0.45s",
      change: -15,
      status: "improved",
      icon: Clock
    },
    {
      name: "Messages Processed",
      value: "28.5K",
      change: 32,
      status: "improved",
      icon: MessageSquare
    },
    {
      name: "Active Users",
      value: "1,240",
      change: 18,
      status: "improved",
      icon: Users
    },
    {
      name: "Error Rate",
      value: "0.32%",
      change: -25,
      status: "improved",
      icon: HelpCircle
    }
  ];

  const insightData = [
    {
      title: "Usage Pattern Detected",
      description: "Most users access the system during morning hours (9-11 AM)",
      icon: Lightbulb,
      category: "Usage",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Performance Opportunity",
      description: "Responses for technical queries can be optimized - currently 25% slower",
      icon: Zap,
      category: "Performance",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "User Behavior",
      description: "78% of users prefer multimodal interactions vs text-only",
      icon: Users,
      category: "User",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "AI Model Efficiency",
      description: "GPT-4o has 22% better token efficiency than alternative models",
      icon: BrainCircuit,
      category: "AI",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-400" />
            Advanced Analytics
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Professional
            </Badge>
          </h2>
          <p className="text-gray-400 mt-2">Comprehensive analytics and insights for your AI assistant</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex border border-gray-600 rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none ${dateRange === "7d" ? "bg-gray-700/50" : "bg-transparent"}`}
              onClick={() => setDateRange("7d")}
            >
              7D
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none ${dateRange === "30d" ? "bg-gray-700/50" : "bg-transparent"}`}
              onClick={() => setDateRange("30d")}
            >
              30D
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none ${dateRange === "90d" ? "bg-gray-700/50" : "bg-transparent"}`}
              onClick={() => setDateRange("90d")}
            >
              90D
            </Button>
          </div>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-700/50 rounded-xl">
                  <metric.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    metric.status === "improved" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}%
                  {metric.status === "improved" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                </div>
              </div>
              <div className="text-gray-400 text-sm">{metric.name}</div>
              <div className="text-white text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="usage" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="models">AI Model Performance</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="content">Content Analytics</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-6">
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <LineChart className="w-5 h-5 text-blue-400" />
                System Usage Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={usageData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" tick={{ fill: "#9ca3af" }} />
                    <YAxis tick={{ fill: "#9ca3af" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        borderColor: "#4b5563",
                        color: "#f9fafb"
                      }}
                    />
                    <Legend wrapperStyle={{ color: "#e5e7eb" }} />
                    <Line
                      type="monotone"
                      dataKey="messages"
                      stroke="#3b82f6"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="queries"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="interactions"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  AI Model Usage Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={modelUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {modelUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          borderColor: "#4b5563",
                          color: "#f9fafb"
                        }}
                      />
                      <Legend wrapperStyle={{ color: "#e5e7eb" }} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  Performance Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Response Time", "GPT-4o": 0.45, "Claude 3.5": 0.52, "Gemini Pro": 0.48 },
                        { name: "Accuracy", "GPT-4o": 96, "Claude 3.5": 95, "Gemini Pro": 94 },
                        { name: "Token Usage", "GPT-4o": 75, "Claude 3.5": 85, "Gemini Pro": 78 },
                        { name: "Cost Efficiency", "GPT-4o": 85, "Claude 3.5": 80, "Gemini Pro": 90 }
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" tick={{ fill: "#9ca3af" }} />
                      <YAxis tick={{ fill: "#9ca3af" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          borderColor: "#4b5563",
                          color: "#f9fafb"
                        }}
                      />
                      <Legend wrapperStyle={{ color: "#e5e7eb" }} />
                      <Bar dataKey="GPT-4o" fill="#16a34a" />
                      <Bar dataKey="Claude 3.5" fill="#7e22ce" />
                      <Bar dataKey="Gemini Pro" fill="#0ea5e9" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {insightData.map((insight, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50 hover:border-blue-500/50 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${insight.color}`}>
                      <insight.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className="text-blue-400 border-blue-400 mb-2"
                      >
                        {insight.category} Insight
                      </Badge>
                      <h3 className="text-lg font-bold text-white mb-2">{insight.title}</h3>
                      <p className="text-gray-400">{insight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="bg-gray-800/50 rounded-xl p-24 text-center">
            <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">User Analytics</h3>
            <p className="text-gray-400 mb-4">
              Detailed user analytics will be available soon
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Update
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <div className="bg-gray-800/50 rounded-xl p-24 text-center">
            <FileText className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Content Analytics</h3>
            <p className="text-gray-400 mb-4">
              Detailed content analytics will be available soon
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Update
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
