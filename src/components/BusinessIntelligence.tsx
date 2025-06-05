
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  Users,
  Brain,
  PieChart,
  LineChart,
  BarChart3,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function BusinessIntelligence() {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    toast({
      title: "📊 Generating BI Report",
      description: "AI is analyzing business data and trends...",
    });

    setTimeout(() => {
      setIsGeneratingReport(false);
      toast({
        title: "✅ Report Generated!",
        description: "Your business intelligence report is ready",
      });
    }, 3000);
  };

  const businessMetrics = {
    revenue: {
      current: 45780,
      growth: 23.5,
      target: 50000
    },
    customers: {
      total: 1247,
      active: 892,
      growth: 18.2
    },
    efficiency: {
      operational: 87,
      cost: 92,
      satisfaction: 94
    },
    forecasts: [
      { metric: 'Revenue Growth', prediction: '+28%', confidence: 94 },
      { metric: 'Customer Acquisition', prediction: '+156 users', confidence: 89 },
      { metric: 'Cost Optimization', prediction: '-12%', confidence: 92 }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">🧠 Business Intelligence</h3>
        <p className="text-sm text-gray-400">AI-powered business insights and forecasting</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs text-gray-400">Revenue</p>
                <p className="text-lg font-bold text-white">${businessMetrics.revenue.current.toLocaleString()}</p>
                <p className="text-xs text-green-400">+{businessMetrics.revenue.growth}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Customers</p>
                <p className="text-lg font-bold text-white">{businessMetrics.customers.total}</p>
                <p className="text-xs text-blue-400">+{businessMetrics.customers.growth}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(businessMetrics.efficiency).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 capitalize">{key} Efficiency</span>
                    <span className="text-white font-medium">{value}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        value >= 90 ? 'bg-green-500' : value >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <h4 className="text-white font-medium mb-3">Revenue Target Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Current: ${businessMetrics.revenue.current.toLocaleString()}</span>
                  <span className="text-gray-400">Target: ${businessMetrics.revenue.target.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                    style={{ width: `${(businessMetrics.revenue.current / businessMetrics.revenue.target) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-center text-gray-400">
                  {((businessMetrics.revenue.current / businessMetrics.revenue.target) * 100).toFixed(1)}% of target achieved
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasts" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI Predictions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {businessMetrics.forecasts.map((forecast, index) => (
                <div key={index} className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium text-sm">{forecast.metric}</h4>
                      <p className="text-gray-400 text-xs">Next 30 days</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-400">{forecast.prediction}</p>
                      <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                        {forecast.confidence}% confident
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
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
                onClick={handleGenerateReport}
                disabled={isGeneratingReport}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              >
                {isGeneratingReport ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Brain className="w-4 h-4 mr-2" />
                )}
                {isGeneratingReport ? 'Generating...' : 'AI Business Report'}
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                  <PieChart className="w-3 h-3 mr-2" />
                  Charts
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                  <LineChart className="w-3 h-3 mr-2" />
                  Trends
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                  <Calendar className="w-3 h-3 mr-2" />
                  Monthly
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                  <Download className="w-3 h-3 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
