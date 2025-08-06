import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  FlaskConical, 
  Brain, 
  TrendingUp, 
  Microscope,
  Beaker,
  Database,
  GitBranch,
  BookOpen,
  Trophy,
  Clock,
  Users,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResearchProject {
  id: string;
  title: string;
  description: string;
  category: 'neural-networks' | 'nlp' | 'computer-vision' | 'reinforcement-learning' | 'quantum-ai';
  progress: number;
  status: 'active' | 'completed' | 'paused' | 'planning';
  startDate: string;
  estimatedCompletion: string;
  researchers: number;
  priority: 'high' | 'medium' | 'low';
  findings: string[];
}

interface Experiment {
  id: string;
  name: string;
  type: 'benchmark' | 'ablation' | 'hyperparameter' | 'architecture';
  accuracy: number;
  loss: number;
  epochs: number;
  status: 'running' | 'completed' | 'failed';
  duration: string;
}

export function AIResearchLab() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<ResearchProject[]>([
    {
      id: '1',
      title: 'Advanced Transformer Architecture',
      description: 'Research on next-generation transformer models with enhanced attention mechanisms',
      category: 'neural-networks',
      progress: 78,
      status: 'active',
      startDate: '2024-01-15',
      estimatedCompletion: '2024-03-30',
      researchers: 12,
      priority: 'high',
      findings: [
        'Multi-head attention with quantum enhancement shows 23% improvement',
        'New positional encoding reduces computation by 15%',
        'Cross-layer connections improve long-term dependencies'
      ]
    },
    {
      id: '2',
      title: 'Emotional AI Understanding',
      description: 'Developing AI models that can understand and respond to human emotions',
      category: 'nlp',
      progress: 92,
      status: 'active',
      startDate: '2023-11-10',
      estimatedCompletion: '2024-02-15',
      researchers: 8,
      priority: 'high',
      findings: [
        'Emotion detection accuracy reached 94.7%',
        'Context-aware responses show better user satisfaction',
        'Multimodal emotion analysis improves accuracy by 12%'
      ]
    },
    {
      id: '3',
      title: 'Quantum Neural Networks',
      description: 'Exploring quantum computing applications in neural network optimization',
      category: 'quantum-ai',
      progress: 45,
      status: 'active',
      startDate: '2024-02-01',
      estimatedCompletion: '2024-06-30',
      researchers: 15,
      priority: 'medium',
      findings: [
        'Quantum entanglement improves feature extraction',
        'Reduced training time by 40% on quantum simulators',
        'Novel quantum activation functions show promise'
      ]
    }
  ]);

  const [experiments, setExperiments] = useState<Experiment[]>([
    {
      id: '1',
      name: 'GPT-5 Benchmark Test',
      type: 'benchmark',
      accuracy: 96.8,
      loss: 0.032,
      epochs: 150,
      status: 'running',
      duration: '2h 34m'
    },
    {
      id: '2',
      name: 'Attention Mechanism Ablation',
      type: 'ablation',
      accuracy: 94.2,
      loss: 0.045,
      epochs: 100,
      status: 'completed',
      duration: '1h 52m'
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'neural-networks' as const
  });

  const createProject = () => {
    if (!newProject.title || !newProject.description) {
      toast({
        title: "❌ Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const project: ResearchProject = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      category: newProject.category,
      progress: 0,
      status: 'planning',
      startDate: new Date().toISOString().split('T')[0],
      estimatedCompletion: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      researchers: 1,
      priority: 'medium',
      findings: []
    };

    setProjects(prev => [...prev, project]);
    setNewProject({ title: '', description: '', category: 'neural-networks' });
    
    toast({
      title: "🧪 Research Project Created",
      description: `"${project.title}" has been added to the research lab`,
    });
  };

  const startExperiment = () => {
    const experiment: Experiment = {
      id: Date.now().toString(),
      name: `Experiment-${Date.now()}`,
      type: 'benchmark',
      accuracy: 0,
      loss: 1.0,
      epochs: 0,
      status: 'running',
      duration: '0m'
    };

    setExperiments(prev => [...prev, experiment]);
    
    toast({
      title: "🔬 Experiment Started",
      description: "New AI model training experiment initiated",
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'neural-networks': return <Brain className="w-4 h-4" />;
      case 'nlp': return <BookOpen className="w-4 h-4" />;
      case 'computer-vision': return <Microscope className="w-4 h-4" />;
      case 'reinforcement-learning': return <TrendingUp className="w-4 h-4" />;
      case 'quantum-ai': return <Zap className="w-4 h-4" />;
      default: return <FlaskConical className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'running': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      case 'planning': return 'bg-purple-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">AI Research Laboratory</h1>
          <p className="text-muted-foreground mt-2">
            Advanced AI research, experiments, and breakthrough discoveries
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            <FlaskConical className="w-4 h-4 mr-2" />
            {projects.filter(p => p.status === 'active').length} Active Projects
          </Badge>
          <Button 
            onClick={startExperiment}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <Beaker className="w-4 h-4 mr-2" />
            Start Experiment
          </Button>
        </div>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="projects">Research Projects</TabsTrigger>
          <TabsTrigger value="experiments">Experiments</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="create">Create Project</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(project.status)}`} />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(project.category)}
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge variant="outline" className={`${getStatusColor(project.status)} text-white border-none`}>
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {project.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{project.progress}%</div>
                      <div className="text-xs text-muted-foreground">Progress</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={project.progress} className="h-2" />
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span>{project.researchers} Researchers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span>Started: {project.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-green-600" />
                        <span>Priority: {project.priority}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-purple-600" />
                        <span>{project.findings.length} Findings</span>
                      </div>
                    </div>

                    {project.findings.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Recent Findings:</h4>
                        <ul className="space-y-1">
                          {project.findings.slice(0, 2).map((finding, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {finding}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="experiments" className="space-y-6">
          <div className="grid gap-6">
            {experiments.map((experiment) => (
              <Card key={experiment.id} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(experiment.status)}`} />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{experiment.name}</CardTitle>
                      <CardDescription>
                        Type: {experiment.type} • Duration: {experiment.duration}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={`${getStatusColor(experiment.status)} text-white border-none`}>
                      {experiment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{experiment.accuracy}%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{experiment.loss}</div>
                      <div className="text-sm text-muted-foreground">Loss</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{experiment.epochs}</div>
                      <div className="text-sm text-muted-foreground">Epochs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{experiment.duration}</div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="findings" className="space-y-6">
          <div className="grid gap-6">
            {projects.filter(p => p.findings.length > 0).map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getCategoryIcon(project.category)}
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.findings.map((finding, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm">{finding}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Research Project</CardTitle>
              <CardDescription>
                Start a new AI research project in our laboratory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter project title"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your research project"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Research Category</Label>
                <select
                  id="category"
                  value={newProject.category}
                  onChange={(e) => setNewProject(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="neural-networks">Neural Networks</option>
                  <option value="nlp">Natural Language Processing</option>
                  <option value="computer-vision">Computer Vision</option>
                  <option value="reinforcement-learning">Reinforcement Learning</option>
                  <option value="quantum-ai">Quantum AI</option>
                </select>
              </div>

              <Button onClick={createProject} className="w-full">
                <FlaskConical className="w-4 h-4 mr-2" />
                Create Research Project
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}