import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Zap,
  Activity,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Globe,
  Smartphone,
  Cpu,
  Database,
  Shield,
  Star,
  ArrowUp,
  ArrowDown,
  Plus,
  Settings,
  Maximize2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DashboardWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'activity' | 'status';
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
  icon: any;
  color: string;
  size: 'small' | 'medium' | 'large';
}

interface UserActivity {
  id: string;
  action: string;
  timestamp: string;
  user: string;
  type: 'chat' | 'upload' | 'template' | 'workflow' | 'settings';
}

interface SystemMetric {
  name: string;
  value: number;
  target: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

export function SmartDashboard() {
  const { toast } = useToast();
  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    {
      id: '1',
      title: 'Active Users',
      type: 'metric',
      value: '12,847',
      change: 12.3,
      trend: 'up',
      description: 'Total active users this month',
      icon: Users,
      color: 'blue',
      size: 'medium'
    },
    {
      id: '2',
      title: 'AI Responses',
      type: 'metric',
      value: '1.2M',
      change: 8.7,
      trend: 'up',
      description: 'AI responses generated today',
      icon: Brain,
      color: 'purple',
      size: 'medium'
    },
    {
      id: '3',
      title: 'System Performance',
      type: 'metric',
      value: '99.7%',
      change: 0.2,
      trend: 'up',
      description: 'Overall system uptime',
      icon: Activity,
      color: 'green',
      size: 'medium'
    },
    {
      id: '4',
      title: 'Response Time',
      type: 'metric',
      value: '247ms',
      change: -15.2,
      trend: 'up',
      description: 'Average AI response time',
      icon: Zap,
      color: 'orange',
      size: 'medium'
    },
    {
      id: '5',
      title: 'Data Processed',
      type: 'metric',
      value: '847TB',
      change: 23.5,
      trend: 'up',
      description: 'Total data processed this week',
      icon: Database,
      color: 'indigo',
      size: 'large'
    },
    {
      id: '6',
      title: 'Security Score',
      type: 'metric',
      value: '98.2%',
      change: 1.8,
      trend: 'up',
      description: 'Overall security compliance',
      icon: Shield,
      color: 'red',
      size: 'medium'
    }
  ]);

  const [activities, setActivities] = useState<UserActivity[]>([
    {
      id: '1',
      action: 'Created new AI workflow',
      timestamp: '2 minutes ago',
      user: 'Sarah Johnson',
      type: 'workflow'
    },
    {
      id: '2',
      action: 'Uploaded 15 documents',
      timestamp: '5 minutes ago',
      user: 'Alex Chen',
      type: 'upload'
    },
    {
      id: '3',
      action: 'Started AI chat session',
      timestamp: '8 minutes ago',
      user: 'Maria Garcia',
      type: 'chat'
    },
    {
      id: '4',
      action: 'Used template "Business Plan"',
      timestamp: '12 minutes ago',
      user: 'David Kim',
      type: 'template'
    },
    {
      id: '5',
      action: 'Updated security settings',
      timestamp: '15 minutes ago',
      user: 'Admin',
      type: 'settings'
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: 67, target: 80, status: 'good' },
    { name: 'Memory Usage', value: 74, target: 85, status: 'good' },
    { name: 'Storage Usage', value: 45, target: 90, status: 'excellent' },
    { name: 'Network Latency', value: 12, target: 50, status: 'excellent' },
    { name: 'Error Rate', value: 0.3, target: 1, status: 'excellent' },
    { name: 'API Response Time', value: 247, target: 500, status: 'excellent' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setWidgets(prev => prev.map(widget => ({
        ...widget,
        value: typeof widget.value === 'string' && widget.value.includes('ms') 
          ? `${Math.floor(Math.random() * 50 + 200)}ms`
          : widget.value,
        change: Math.random() * 20 - 10
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getMetricStatus = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up' || change > 0) {
      return <ArrowUp className="w-4 h-4 text-green-600" />;
    } else if (trend === 'down' || change < 0) {
      return <ArrowDown className="w-4 h-4 text-red-600" />;
    }
    return <ArrowUp className="w-4 h-4 text-gray-600" />;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'chat': return <Brain className="w-4 h-4 text-blue-600" />;
      case 'upload': return <Database className="w-4 h-4 text-green-600" />;
      case 'template': return <Star className="w-4 h-4 text-purple-600" />;
      case 'workflow': return <Target className="w-4 h-4 text-orange-600" />;
      case 'settings': return <Settings className="w-4 h-4 text-gray-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const addWidget = () => {
    const newWidget: DashboardWidget = {
      id: Date.now().toString(),
      title: 'New Metric',
      type: 'metric',
      value: '0',
      change: 0,
      trend: 'stable',
      description: 'Custom metric',
      icon: BarChart3,
      color: 'blue',
      size: 'medium'
    };

    setWidgets(prev => [...prev, newWidget]);
    toast({
      title: "📊 Widget Added",
      description: "New dashboard widget has been created",
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Smart Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Real-time analytics and intelligent insights for Tezu AI Pro
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="w-4 h-4 mr-2" />
            Live
          </Badge>
          <Button 
            onClick={addWidget}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Widget
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="activity">Activity Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {widgets.map((widget) => (
              <Card key={widget.id} className={`border-${widget.color}-200 dark:border-${widget.color}-800 relative group hover:shadow-lg transition-shadow`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <widget.icon className={`w-8 h-8 text-${widget.color}-600`} />
                    <div className="flex items-center gap-1">
                      {getTrendIcon(widget.trend, widget.change)}
                      <span className={`text-sm font-medium ${widget.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {Math.abs(widget.change).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{widget.value}</div>
                    <h3 className="font-medium">{widget.title}</h3>
                    <p className="text-sm text-muted-foreground">{widget.description}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Global Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">127</div>
                <p className="text-sm text-muted-foreground">Countries served</p>
                <Progress value={85} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Mobile Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">73%</div>
                <p className="text-sm text-muted-foreground">Mobile users</p>
                <Progress value={73} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  User Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">4.9</div>
                <p className="text-sm text-muted-foreground">Average rating</p>
                <Progress value={98} className="mt-3" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Usage Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Chat Sessions</span>
                    <span className="font-medium">94,567</span>
                  </div>
                  <Progress value={94} />
                  
                  <div className="flex justify-between items-center">
                    <span>File Uploads</span>
                    <span className="font-medium">23,891</span>
                  </div>
                  <Progress value={67} />
                  
                  <div className="flex justify-between items-center">
                    <span>Templates Used</span>
                    <span className="font-medium">8,456</span>
                  </div>
                  <Progress value={45} />
                  
                  <div className="flex justify-between items-center">
                    <span>Workflows Created</span>
                    <span className="font-medium">3,234</span>
                  </div>
                  <Progress value={32} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Feature Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      AI Chat
                    </span>
                    <span className="font-medium">45%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Document Processing
                    </span>
                    <span className="font-medium">28%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      Templates
                    </span>
                    <span className="font-medium">18%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      Voice Interface
                    </span>
                    <span className="font-medium">9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                System Health Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {systemMetrics.map((metric) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{metric.name}</span>
                      <span className={`text-sm font-medium ${getMetricStatus(metric.status)}`}>
                        {metric.value}{metric.name.includes('Time') ? 'ms' : metric.name.includes('Rate') ? '%' : '%'}
                      </span>
                    </div>
                    <Progress 
                      value={(metric.value / metric.target) * 100} 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground">
                      Target: {metric.target}{metric.name.includes('Time') ? 'ms' : '%'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Real-time user activity and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        by {activity.user} • {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}