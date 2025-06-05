
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Cloud, 
  Server, 
  Database, 
  Cpu,
  HardDrive,
  Activity,
  Globe,
  Shield,
  Zap,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CloudResource {
  id: string;
  name: string;
  type: 'compute' | 'storage' | 'database' | 'cdn';
  status: 'running' | 'stopped' | 'pending';
  usage: number;
  cost: number;
}

export function CloudComputing() {
  const [resources, setResources] = useState<CloudResource[]>([
    {
      id: '1',
      name: 'AI Processing Cluster',
      type: 'compute',
      status: 'running',
      usage: 67,
      cost: 45.80
    },
    {
      id: '2',
      name: 'Conversation Storage',
      type: 'storage',
      status: 'running',
      usage: 34,
      cost: 12.50
    },
    {
      id: '3',
      name: 'Analytics Database',
      type: 'database',
      status: 'running',
      usage: 78,
      cost: 28.30
    }
  ]);

  const [isScaling, setIsScaling] = useState(false);
  const { toast } = useToast();

  const handleAutoScale = () => {
    setIsScaling(true);
    toast({
      title: "☁️ Auto-scaling Initiated",
      description: "Optimizing cloud resources based on current demand...",
    });

    setTimeout(() => {
      setIsScaling(false);
      setResources(prev => prev.map(r => ({
        ...r,
        usage: Math.max(20, r.usage - 10 - Math.random() * 20)
      })));
      
      toast({
        title: "✅ Auto-scaling Complete!",
        description: "Resources optimized. Cost reduced by 15%",
      });
    }, 3000);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'compute': return <Cpu className="w-4 h-4" />;
      case 'storage': return <HardDrive className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'cdn': return <Globe className="w-4 h-4" />;
      default: return <Server className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500/20 text-green-400';
      case 'stopped': return 'bg-red-500/20 text-red-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const totalCost = resources.reduce((sum, r) => sum + r.cost, 0);
  const avgUsage = resources.reduce((sum, r) => sum + r.usage, 0) / resources.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">☁️ Cloud Computing</h3>
        <p className="text-sm text-gray-400">Scalable cloud infrastructure management</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Avg Usage</p>
                <p className="text-lg font-bold text-white">{avgUsage.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs text-gray-400">Monthly Cost</p>
                <p className="text-lg font-bold text-white">${totalCost.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cloud Resources */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Cloud className="w-4 h-4" />
            Cloud Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {resources.map((resource) => (
            <div key={resource.id} className="p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getResourceIcon(resource.type)}
                  <span className="text-white font-medium">{resource.name}</span>
                </div>
                <Badge className={getStatusColor(resource.status)}>
                  {resource.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Usage</span>
                  <span className="text-white">{resource.usage}%</span>
                </div>
                <Progress value={resource.usage} className="h-1.5" />
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 capitalize">{resource.type}</span>
                  <span className="text-green-400 font-medium">${resource.cost}/month</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cloud Controls */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={handleAutoScale}
          disabled={isScaling}
          className="bg-gradient-to-r from-blue-600 to-cyan-600"
        >
          {isScaling ? (
            <Activity className="w-4 h-4 mr-2 animate-pulse" />
          ) : (
            <Zap className="w-4 h-4 mr-2" />
          )}
          {isScaling ? 'Scaling...' : 'Auto Scale'}
        </Button>
        
        <Button variant="outline" className="border-gray-600 text-gray-300">
          <Shield className="w-4 h-4 mr-2" />
          Security Scan
        </Button>
      </div>

      {/* Cloud Features */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-4">
          <h4 className="text-white font-medium mb-3">Cloud Features</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-green-400" />
              <span className="text-gray-300">Auto Backup</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-blue-400" />
              <span className="text-gray-300">Load Balancing</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-purple-400" />
              <span className="text-gray-300">Global CDN</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-yellow-400" />
              <span className="text-gray-300">Auto Monitoring</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
