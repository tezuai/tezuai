
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Workflow, 
  Play, 
  Pause, 
  Plus, 
  Settings,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkflowTask {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'active' | 'paused' | 'completed';
  lastRun?: Date;
}

export function WorkflowAutomation() {
  const [workflows, setWorkflows] = useState<WorkflowTask[]>([
    {
      id: '1',
      name: 'Daily Report Generation',
      trigger: 'Schedule: Every 9:00 AM',
      action: 'Generate and email analytics report',
      status: 'active',
      lastRun: new Date()
    },
    {
      id: '2',
      name: 'Auto-backup Conversations',
      trigger: 'After 10 new conversations',
      action: 'Backup to cloud storage',
      status: 'active'
    }
  ]);
  
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    trigger: '',
    action: ''
  });

  const { toast } = useToast();

  const handleCreateWorkflow = () => {
    if (!newWorkflow.name || !newWorkflow.trigger || !newWorkflow.action) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields to create workflow",
        variant: "destructive"
      });
      return;
    }

    const workflow: WorkflowTask = {
      id: Date.now().toString(),
      name: newWorkflow.name,
      trigger: newWorkflow.trigger,
      action: newWorkflow.action,
      status: 'active'
    };

    setWorkflows(prev => [...prev, workflow]);
    setNewWorkflow({ name: '', trigger: '', action: '' });
    
    toast({
      title: "🤖 Workflow Created!",
      description: "Your automation workflow is now active",
    });
  };

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, status: w.status === 'active' ? 'paused' : 'active' }
        : w
    ));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">🤖 Workflow Automation</h3>
        <p className="text-sm text-gray-400">Automate repetitive tasks with AI-powered workflows</p>
      </div>

      {/* Create New Workflow */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Workflow
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Workflow name"
            value={newWorkflow.name}
            onChange={(e) => setNewWorkflow(prev => ({ ...prev, name: e.target.value }))}
            className="bg-gray-700/50 border-gray-600 text-white"
          />
          <Input
            placeholder="Trigger (e.g., Every day at 9 AM)"
            value={newWorkflow.trigger}
            onChange={(e) => setNewWorkflow(prev => ({ ...prev, trigger: e.target.value }))}
            className="bg-gray-700/50 border-gray-600 text-white"
          />
          <Input
            placeholder="Action (e.g., Send summary email)"
            value={newWorkflow.action}
            onChange={(e) => setNewWorkflow(prev => ({ ...prev, action: e.target.value }))}
            className="bg-gray-700/50 border-gray-600 text-white"
          />
          <Button 
            onClick={handleCreateWorkflow}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <Workflow className="w-4 h-4 mr-2" />
            Create Automation
          </Button>
        </CardContent>
      </Card>

      {/* Active Workflows */}
      <div className="space-y-3">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-medium">{workflow.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {workflow.trigger}
                  </p>
                  <p className="text-sm text-gray-400">
                    <Zap className="w-3 h-3 inline mr-1" />
                    {workflow.action}
                  </p>
                  {workflow.lastRun && (
                    <p className="text-xs text-gray-500 mt-1">
                      Last run: {workflow.lastRun.toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={
                      workflow.status === 'active' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }
                  >
                    {workflow.status === 'active' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {workflow.status}
                  </Badge>
                  <Switch
                    checked={workflow.status === 'active'}
                    onCheckedChange={() => toggleWorkflow(workflow.id)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
