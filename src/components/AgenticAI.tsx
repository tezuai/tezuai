import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { 
  Bot, 
  Brain, 
  Target, 
  Zap, 
  CheckCircle, 
  Play,
  Pause,
  RotateCcw,
  Settings,
  Activity,
  TrendingUp,
  AlertTriangle,
  Clock,
  Cpu,
  Network,
  Database,
  Shield
} from "lucide-react";

interface AgentTask {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'executing' | 'completed' | 'failed' | 'paused';
  progress: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedTime: string;
  steps: TaskStep[];
  dependencies?: string[];
}

interface TaskStep {
  id: string;
  action: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: string;
  confidence: number;
}

interface AgentCapability {
  name: string;
  description: string;
  enabled: boolean;
  performance: number;
  icon: any;
}

export const AgenticAI = () => {
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [activeAgents, setActiveAgents] = useState(0);
  const [agentGoal, setAgentGoal] = useState('');
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentPerformance, setAgentPerformance] = useState({
    tasksCompleted: 0,
    successRate: 0,
    avgResponseTime: 0,
    autonomyLevel: 0
  });

  const [capabilities, setCapabilities] = useState<AgentCapability[]>([
    {
      name: 'स्वचालित निर्णय लेना',
      description: 'बिना मानवीय हस्तक्षेप के निर्णय',
      enabled: true,
      performance: 94,
      icon: Brain
    },
    {
      name: 'लक्ष्य निर्धारण',
      description: 'खुद से लक्ष्य बनाना और पूरा करना',
      enabled: true,
      performance: 89,
      icon: Target
    },
    {
      name: 'IoT नियंत्रण',
      description: 'स्मार्ट डिवाइस को कंट्रोल करना',
      enabled: true,
      performance: 92,
      icon: Network
    },
    {
      name: 'डेटा विश्लेषण',
      description: 'वास्तविक समय डेटा एनालिसिस',
      enabled: true,
      performance: 96,
      icon: Database
    },
    {
      name: 'सुरक्षा निगरानी',
      description: 'स्वचालित सुरक्षा चेकिंग',
      enabled: true,
      performance: 98,
      icon: Shield
    },
    {
      name: 'प्रदर्शन अनुकूलन',
      description: 'खुद को बेहतर बनाना',
      enabled: true,
      performance: 91,
      icon: TrendingUp
    }
  ]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAgentRunning) {
      intervalRef.current = setInterval(() => {
        // Simulate agent task execution
        setTasks(prevTasks => 
          prevTasks.map(task => {
            if (task.status === 'executing' && task.progress < 100) {
              const newProgress = Math.min(task.progress + Math.random() * 15, 100);
              const newStatus = newProgress === 100 ? 'completed' : 'executing';
              
              if (newStatus === 'completed') {
                setAgentPerformance(prev => ({
                  ...prev,
                  tasksCompleted: prev.tasksCompleted + 1,
                  successRate: Math.min(prev.successRate + 1, 99),
                  autonomyLevel: Math.min(prev.autonomyLevel + 2, 100)
                }));
              }
              
              return { ...task, progress: newProgress, status: newStatus };
            }
            return task;
          })
        );

        // Update active agents count
        setActiveAgents(prev => Math.min(prev + Math.floor(Math.random() * 3), 25));
        
        // Update performance metrics
        setAgentPerformance(prev => ({
          ...prev,
          avgResponseTime: Math.random() * 50 + 100,
          autonomyLevel: Math.min(prev.autonomyLevel + 0.5, 100)
        }));
      }, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAgentRunning]);

  const createAutonomousTask = async () => {
    if (!agentGoal.trim()) return;

    const newTask: AgentTask = {
      id: Date.now().toString(),
      title: `एजेंट टास्क: ${agentGoal}`,
      description: `स्वचालित रूप से "${agentGoal}" को पूरा करने के लिए AI एजेंट काम कर रहा है`,
      status: 'planning',
      progress: 0,
      priority: 'high',
      estimatedTime: `${Math.floor(Math.random() * 10) + 5} मिनट`,
      steps: [
        {
          id: '1',
          action: 'लक्ष्य विश्लेषण और योजना बनाना',
          status: 'pending',
          confidence: 95
        },
        {
          id: '2', 
          action: 'आवश्यक रिसोर्स की पहचान',
          status: 'pending',
          confidence: 88
        },
        {
          id: '3',
          action: 'कार्य निष्पादन रणनीति',
          status: 'pending',
          confidence: 92
        },
        {
          id: '4',
          action: 'परिणाम का मूल्यांकन',
          status: 'pending',
          confidence: 90
        }
      ]
    };

    setTasks(prev => [newTask, ...prev]);
    setAgentGoal('');
    
    // Start task execution after a short delay
    setTimeout(() => {
      setTasks(prev => 
        prev.map(task => 
          task.id === newTask.id 
            ? { ...task, status: 'executing' }
            : task
        )
      );
    }, 1000);

    toast.success("स्वचालित AI एजेंट शुरू किया गया!");
  };

  const toggleAgent = () => {
    setIsAgentRunning(!isAgentRunning);
    toast.success(isAgentRunning ? "AI एजेंट रोक दिया गया" : "AI एजेंट चालू किया गया");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'executing': return 'text-blue-400';
      case 'failed': return 'text-red-400';
      case 'paused': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <Bot className="h-8 w-8 text-blue-400" />
              एजेंटिक AI सिस्टम
              <Badge className={`${isAgentRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-500'} text-white`}>
                {isAgentRunning ? 'Active' : 'Standby'}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Performance Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-300/30">
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-white">{activeAgents}</div>
              <div className="text-blue-200 text-sm">Active Agents</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-300/30">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-white">{agentPerformance.tasksCompleted}</div>
              <div className="text-green-200 text-sm">Tasks Done</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-300/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-white">{agentPerformance.successRate.toFixed(1)}%</div>
              <div className="text-purple-200 text-sm">Success Rate</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-300/30">
            <CardContent className="p-4 text-center">
              <Cpu className="h-8 w-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-white">{agentPerformance.autonomyLevel.toFixed(0)}%</div>
              <div className="text-orange-200 text-sm">Autonomy</div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Control Panel */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6">
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="AI एजेंट को कोई लक्ष्य दें... (यह खुद से काम पूरा करेगा)"
                value={agentGoal}
                onChange={(e) => setAgentGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && createAutonomousTask()}
                className="bg-white/10 text-white placeholder-white/70 border-white/20"
              />
              <Button
                onClick={createAutonomousTask}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Target className="h-4 w-4 mr-2" />
                Deploy Agent
              </Button>
              <Button
                onClick={toggleAgent}
                variant={isAgentRunning ? "destructive" : "default"}
                className="flex items-center gap-2"
              >
                {isAgentRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isAgentRunning ? 'Stop' : 'Start'}
              </Button>
            </div>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {capabilities.map((capability, index) => {
                const IconComponent = capability.icon;
                return (
                  <Card key={index} className="bg-white/5 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <IconComponent className="h-6 w-6 text-blue-400" />
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-sm">{capability.name}</h4>
                          <p className="text-white/70 text-xs">{capability.description}</p>
                        </div>
                        <Badge className={capability.enabled ? 'bg-green-500' : 'bg-gray-500'}>
                          {capability.enabled ? 'ON' : 'OFF'}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Performance</span>
                          <span className="text-white">{capability.performance}%</span>
                        </div>
                        <Progress value={capability.performance} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Tasks */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-400" />
                स्वचालित कार्य ({tasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {tasks.length === 0 ? (
                    <div className="text-center py-8">
                      <Bot className="h-12 w-12 mx-auto text-blue-400/50 mb-4" />
                      <p className="text-white/70">कोई लक्ष्य दें और AI एजेंट काम शुरू करेगा</p>
                    </div>
                  ) : (
                    tasks.map((task) => (
                      <Card key={task.id} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="text-white font-semibold text-sm mb-1">{task.title}</h4>
                              <p className="text-white/70 text-xs mb-2">{task.description}</p>
                              <div className="flex items-center gap-2 mb-3">
                                <Badge className={`${getPriorityColor(task.priority)} text-white text-xs`}>
                                  {task.priority}
                                </Badge>
                                <Badge className="bg-gray-500/20 text-gray-300 text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {task.estimatedTime}
                                </Badge>
                              </div>
                            </div>
                            <div className={`${getStatusColor(task.status)}`}>
                              {task.status === 'executing' && <Activity className="h-4 w-4 animate-pulse" />}
                              {task.status === 'completed' && <CheckCircle className="h-4 w-4" />}
                              {task.status === 'failed' && <AlertTriangle className="h-4 w-4" />}
                              {task.status === 'planning' && <Brain className="h-4 w-4" />}
                            </div>
                          </div>
                          
                          <div className="space-y-1 mb-3">
                            <div className="flex justify-between text-xs">
                              <span className="text-white/70">Progress</span>
                              <span className="text-white">{task.progress.toFixed(0)}%</span>
                            </div>
                            <Progress value={task.progress} className="h-2" />
                          </div>

                          <div className="space-y-2">
                            {task.steps.map((step, stepIndex) => (
                              <div key={step.id} className="flex items-center gap-2 text-xs">
                                <div className={`w-2 h-2 rounded-full ${
                                  step.status === 'completed' ? 'bg-green-400' :
                                  step.status === 'running' ? 'bg-blue-400 animate-pulse' :
                                  step.status === 'failed' ? 'bg-red-400' :
                                  'bg-gray-400'
                                }`} />
                                <span className="text-white/70 flex-1">{step.action}</span>
                                <Badge className="bg-blue-500/20 text-blue-300 text-xs">
                                  {step.confidence}%
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Agent Analytics */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Agent Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Real-time Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">Task Success Rate</span>
                        <span className="text-white">{agentPerformance.successRate.toFixed(1)}%</span>
                      </div>
                      <Progress value={agentPerformance.successRate} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">Autonomy Level</span>
                        <span className="text-white">{agentPerformance.autonomyLevel.toFixed(0)}%</span>
                      </div>
                      <Progress value={agentPerformance.autonomyLevel} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">Response Time</span>
                        <span className="text-white">{agentPerformance.avgResponseTime.toFixed(0)}ms</span>
                      </div>
                      <Progress value={Math.max(0, 100 - agentPerformance.avgResponseTime/10)} className="h-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Agent Capabilities Status</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {capabilities.slice(0, 4).map((cap, index) => {
                      const IconComponent = cap.icon;
                      return (
                        <div key={index} className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="h-4 w-4 text-blue-400" />
                            <span className="text-white text-xs font-medium">{cap.name}</span>
                          </div>
                          <Progress value={cap.performance} className="h-1" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-4 border border-green-300/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-green-400" />
                    <span className="text-white font-semibold">AI Agent Status</span>
                  </div>
                  <p className="text-green-200 text-sm">
                    {isAgentRunning ? 
                      "स्वचालित AI एजेंट सक्रिय है और निरंतर कार्य कर रहा है" :
                      "AI एजेंट स्टैंडबाई मोड में है"
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};