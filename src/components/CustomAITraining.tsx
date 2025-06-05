
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Upload, 
  Play, 
  Pause, 
  CheckCircle,
  AlertCircle,
  BookOpen,
  Zap,
  Target,
  Cpu
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrainingData {
  id: string;
  name: string;
  type: 'text' | 'conversation' | 'domain';
  status: 'pending' | 'training' | 'completed';
  progress: number;
  accuracy?: number;
}

export function CustomAITraining() {
  const [trainingJobs, setTrainingJobs] = useState<TrainingData[]>([
    {
      id: '1',
      name: 'Customer Support Model',
      type: 'conversation',
      status: 'completed',
      progress: 100,
      accuracy: 94.5
    },
    {
      id: '2',
      name: 'Technical Documentation',
      type: 'text',
      status: 'training',
      progress: 67,
    }
  ]);

  const [newTraining, setNewTraining] = useState({
    name: '',
    description: '',
    data: ''
  });

  const { toast } = useToast();

  const handleStartTraining = () => {
    if (!newTraining.name || !newTraining.data) {
      toast({
        title: "Missing Data",
        description: "Please provide training name and data",
        variant: "destructive"
      });
      return;
    }

    const training: TrainingData = {
      id: Date.now().toString(),
      name: newTraining.name,
      type: 'text',
      status: 'training',
      progress: 0
    };

    setTrainingJobs(prev => [...prev, training]);
    setNewTraining({ name: '', description: '', data: '' });
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingJobs(prev => prev.map(t => 
        t.id === training.id && t.progress < 100
          ? { ...t, progress: Math.min(t.progress + 10, 100) }
          : t
      ));
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setTrainingJobs(prev => prev.map(t => 
        t.id === training.id 
          ? { ...t, status: 'completed', progress: 100, accuracy: 92 + Math.random() * 6 }
          : t
      ));
      toast({
        title: "🎓 Training Complete!",
        description: "Your custom AI model is ready for use",
      });
    }, 10000);

    toast({
      title: "🤖 Training Started",
      description: "AI is learning from your custom data...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">🎓 Custom AI Training</h3>
        <p className="text-sm text-gray-400">Train AI models with your specific data</p>
      </div>

      {/* Create Training Job */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Train New Model
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Model name (e.g., Sales Assistant)"
            value={newTraining.name}
            onChange={(e) => setNewTraining(prev => ({ ...prev, name: e.target.value }))}
            className="bg-gray-700/50 border-gray-600 text-white"
          />
          <Input
            placeholder="Description (optional)"
            value={newTraining.description}
            onChange={(e) => setNewTraining(prev => ({ ...prev, description: e.target.value }))}
            className="bg-gray-700/50 border-gray-600 text-white"
          />
          <Textarea
            placeholder="Training data (paste your text, conversations, or domain-specific content)"
            value={newTraining.data}
            onChange={(e) => setNewTraining(prev => ({ ...prev, data: e.target.value }))}
            className="bg-gray-700/50 border-gray-600 text-white min-h-24"
          />
          <div className="flex gap-2">
            <Button 
              onClick={handleStartTraining}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Training
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300">
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Training Jobs */}
      <div className="space-y-3">
        <h4 className="text-white font-medium">Training Progress</h4>
        {trainingJobs.map((job) => (
          <Card key={job.id} className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">{job.name}</h4>
                    <p className="text-sm text-gray-400 capitalize">
                      <BookOpen className="w-3 h-3 inline mr-1" />
                      {job.type} model
                    </p>
                  </div>
                  <Badge 
                    className={
                      job.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400'
                        : job.status === 'training'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }
                  >
                    {job.status === 'completed' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : job.status === 'training' ? (
                      <Cpu className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {job.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                </div>

                {job.accuracy && (
                  <div className="flex items-center gap-4 pt-2 border-t border-gray-700">
                    <div className="flex items-center gap-1">
                      <Target className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-gray-400">Accuracy:</span>
                      <span className="text-xs text-green-400 font-medium">{job.accuracy}%</span>
                    </div>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      <Zap className="w-3 h-3 mr-1" />
                      Deploy
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
