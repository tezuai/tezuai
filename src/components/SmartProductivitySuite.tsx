import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Target, 
  Calendar, 
  CheckSquare, 
  Clock, 
  TrendingUp,
  Lightbulb,
  FileText,
  Users,
  BarChart3,
  Settings,
  PlusCircle,
  Star,
  Trophy,
  Zap,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: string;
  category: string;
  estimatedTime: number; // in minutes
  actualTime?: number;
  createdAt: string;
  tags: string[];
}

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  category: string;
  milestones: string[];
  completedMilestones: number;
  priority: 'low' | 'medium' | 'high';
}

interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  streak: number;
  bestStreak: number;
  completedToday: boolean;
  category: string;
  points: number;
}

interface ProductivityMetrics {
  tasksCompleted: number;
  averageCompletionTime: number;
  productivityScore: number;
  weeklyProgress: number[];
  topCategories: string[];
  totalPoints: number;
  level: number;
  streakDays: number;
}

export function SmartProductivitySuite() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [metrics, setMetrics] = useState<ProductivityMetrics>({
    tasksCompleted: 0,
    averageCompletionTime: 0,
    productivityScore: 85,
    weeklyProgress: [65, 72, 80, 85, 78, 90, 88],
    topCategories: ['Work', 'Learning', 'Health'],
    totalPoints: 1250,
    level: 8,
    streakDays: 15
  });
  
  const [newTask, setNewTask] = useState<Partial<Task>>({});
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({});
  const [newHabit, setNewHabit] = useState<Partial<Habit>>({});
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  // Initialize with sample data
  useEffect(() => {
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Complete project presentation',
        description: 'Prepare slides for quarterly review meeting',
        priority: 'high',
        status: 'in-progress',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Work',
        estimatedTime: 120,
        actualTime: 90,
        createdAt: new Date().toISOString(),
        tags: ['presentation', 'quarterly', 'important']
      },
      {
        id: '2',
        title: 'Learn React advanced concepts',
        description: 'Study hooks, context, and performance optimization',
        priority: 'medium',
        status: 'todo',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Learning',
        estimatedTime: 300,
        createdAt: new Date().toISOString(),
        tags: ['programming', 'react', 'learning']
      },
      {
        id: '3',
        title: 'Exercise for 30 minutes',
        description: 'Morning workout routine',
        priority: 'medium',
        status: 'completed',
        dueDate: new Date().toISOString(),
        category: 'Health',
        estimatedTime: 30,
        actualTime: 35,
        createdAt: new Date().toISOString(),
        tags: ['health', 'exercise', 'routine']
      }
    ];

    const sampleGoals: Goal[] = [
      {
        id: '1',
        title: 'Master Full-Stack Development',
        description: 'Become proficient in React, Node.js, and databases',
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 65,
        category: 'Learning',
        milestones: ['Complete React course', 'Build portfolio project', 'Learn backend', 'Deploy full-stack app'],
        completedMilestones: 2,
        priority: 'high'
      },
      {
        id: '2',
        title: 'Improve Physical Fitness',
        description: 'Lose 10kg and build strength',
        targetDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 40,
        category: 'Health',
        milestones: ['Join gym', 'Create diet plan', 'Lose 5kg', 'Build muscle mass'],
        completedMilestones: 2,
        priority: 'medium'
      }
    ];

    const sampleHabits: Habit[] = [
      {
        id: '1',
        name: 'Daily Reading',
        description: 'Read for at least 30 minutes',
        frequency: 'daily',
        streak: 15,
        bestStreak: 23,
        completedToday: true,
        category: 'Learning',
        points: 5
      },
      {
        id: '2',
        name: 'Morning Exercise',
        description: 'Exercise for 30 minutes every morning',
        frequency: 'daily',
        streak: 8,
        bestStreak: 15,
        completedToday: false,
        category: 'Health',
        points: 10
      },
      {
        id: '3',
        name: 'Weekly Planning',
        description: 'Plan upcoming week every Sunday',
        frequency: 'weekly',
        streak: 4,
        bestStreak: 6,
        completedToday: false,
        category: 'Productivity',
        points: 15
      }
    ];

    setTasks(sampleTasks);
    setGoals(sampleGoals);
    setHabits(sampleHabits);
  }, []);

  const addTask = () => {
    if (!newTask.title) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description || '',
      priority: newTask.priority || 'medium',
      status: 'todo',
      dueDate: newTask.dueDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      category: newTask.category || 'General',
      estimatedTime: newTask.estimatedTime || 60,
      createdAt: new Date().toISOString(),
      tags: newTask.tags || []
    };
    
    setTasks(prev => [...prev, task]);
    setNewTask({});
    
    toast({
      title: "✅ Task Added",
      description: `"${task.title}" has been added to your task list`,
    });
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
    
    if (status === 'completed') {
      setMetrics(prev => ({
        ...prev,
        tasksCompleted: prev.tasksCompleted + 1,
        totalPoints: prev.totalPoints + 10
      }));
      
      toast({
        title: "🎉 Task Completed!",
        description: "Great job! +10 points earned",
      });
    }
  };

  const completeHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completedToday: true, 
            streak: habit.streak + 1,
            bestStreak: Math.max(habit.bestStreak, habit.streak + 1)
          }
        : habit
    ));
    
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      setMetrics(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + habit.points
      }));
      
      toast({
        title: "🔥 Habit Completed!",
        description: `${habit.name} streak continues! +${habit.points} points`,
      });
    }
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, progress } : goal
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'todo': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateLevel = (points: number) => {
    return Math.floor(points / 100) + 1;
  };

  const getNextLevelProgress = (points: number) => {
    return (points % 100);
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Smart Productivity Suite</h1>
            <p className="text-slate-600 dark:text-slate-300">Advanced task management और goal tracking</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{metrics.totalPoints}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">Level {metrics.level}</div>
            <Progress value={getNextLevelProgress(metrics.totalPoints)} className="w-16 mt-1" />
          </div>
        </div>
      </div>

      {/* Productivity Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Tasks Completed</p>
                <p className="text-2xl font-bold text-green-600">{metrics.tasksCompleted}</p>
              </div>
              <CheckSquare className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Productivity Score</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.productivityScore}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Current Streak</p>
                <p className="text-2xl font-bold text-orange-600">{metrics.streakDays} days</p>
              </div>
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Level Progress</p>
                <Progress value={getNextLevelProgress(metrics.totalPoints)} className="mt-2" />
              </div>
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="habits">Habits</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5" />
                  Recent Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {tasks.slice(0, 5).map(task => (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{task.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`${getPriorityColor(task.priority)} text-white text-xs`}>
                              {task.priority}
                            </Badge>
                            <Badge className={`${getStatusColor(task.status)} text-white text-xs`}>
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                        {task.status !== 'completed' && (
                          <Button
                            size="sm"
                            onClick={() => updateTaskStatus(task.id, 'completed')}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Active Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Active Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-4">
                    {goals.map(goal => (
                      <div key={goal.id} className="p-3 border rounded-lg">
                        <h4 className="font-medium mb-2">{goal.title}</h4>
                        <Progress value={goal.progress} className="mb-2" />
                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                          <span>{goal.progress}% complete</span>
                          <span>{goal.completedMilestones}/{goal.milestones.length} milestones</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Today's Habits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Today's Habits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {habits.map(habit => (
                  <div key={habit.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{habit.name}</h4>
                      <Badge variant="outline">{habit.streak} day streak</Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{habit.description}</p>
                    <Button
                      size="sm"
                      onClick={() => completeHabit(habit.id)}
                      disabled={habit.completedToday}
                      className="w-full"
                    >
                      {habit.completedToday ? '✅ Completed' : 'Mark Complete'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Task title"
                  value={newTask.title || ''}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                />
                <select
                  className="px-3 py-2 border rounded-md"
                  value={newTask.priority || 'medium'}
                  onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
                <Textarea
                  placeholder="Description"
                  value={newTask.description || ''}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                />
                <Input
                  type="datetime-local"
                  value={newTask.dueDate || ''}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <Button onClick={addTask} className="mt-4">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task List</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {tasks.map(task => (
                    <div key={task.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{task.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={`${getPriorityColor(task.priority)} text-white text-xs`}>
                              {task.priority}
                            </Badge>
                            <Badge className={`${getStatusColor(task.status)} text-white text-xs`}>
                              {task.status}
                            </Badge>
                            <Badge variant="outline">{task.category}</Badge>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {task.status !== 'completed' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateTaskStatus(task.id, task.status === 'todo' ? 'in-progress' : 'completed')}
                              >
                                {task.status === 'todo' ? 'Start' : 'Complete'}
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goals.map(goal => (
                  <div key={goal.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-lg">{goal.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400">{goal.description}</p>
                      </div>
                      <Badge className={`${getPriorityColor(goal.priority)} text-white`}>
                        {goal.priority}
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress: {goal.progress}%</span>
                        <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
                      </div>
                      <Progress value={goal.progress} />
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium">Milestones:</h5>
                      {goal.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckSquare 
                            className={`w-4 h-4 ${index < goal.completedMilestones ? 'text-green-600' : 'text-gray-400'}`} 
                          />
                          <span className={index < goal.completedMilestones ? 'line-through text-gray-500' : ''}>
                            {milestone}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Habits Tab */}
        <TabsContent value="habits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Habit Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {habits.map(habit => (
                  <div key={habit.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{habit.name}</h4>
                      <Badge variant="outline">{habit.frequency}</Badge>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{habit.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current: {habit.streak} days</span>
                        <span>Best: {habit.bestStreak} days</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Points: {habit.points}</span>
                        <span>Category: {habit.category}</span>
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={() => completeHabit(habit.id)}
                        disabled={habit.completedToday}
                        className="w-full"
                      >
                        {habit.completedToday ? '✅ Done Today' : 'Mark Complete'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="flex items-center gap-4">
                      <span className="w-8 text-sm">{day}</span>
                      <Progress value={metrics.weeklyProgress[index]} className="flex-1" />
                      <span className="text-sm w-12">{metrics.weeklyProgress[index]}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200">💡 Insight</h5>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      आपकी productivity Tuesday और Friday को सबसे अच्छी रहती है।
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                    <h5 className="font-medium text-green-800 dark:text-green-200">🎯 Achievement</h5>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      आपने इस हफ्ते 85% productivity score maintain किया है!
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                    <h5 className="font-medium text-yellow-800 dark:text-yellow-200">⚡ Suggestion</h5>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Weekend planning habits से आपकी weekly productivity बढ़ सकती है।
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}