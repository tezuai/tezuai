
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Link, 
  Zap, 
  Globe, 
  Database,
  Mail,
  Calendar,
  FileText,
  ShoppingCart,
  Users,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'pending';
  description: string;
  icon: any;
  color: string;
  features: string[];
}

export function SmartIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Gmail',
      type: 'Email',
      status: 'connected',
      description: 'Smart email management and responses',
      icon: Mail,
      color: 'from-red-500 to-pink-500',
      features: ['Auto-reply', 'Email Analytics', 'Smart Filters']
    },
    {
      id: '2',
      name: 'Google Calendar',
      type: 'Productivity',
      status: 'connected',
      description: 'AI-powered scheduling and meeting management',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      features: ['Smart Scheduling', 'Meeting Notes', 'Reminders']
    },
    {
      id: '3',
      name: 'Slack',
      type: 'Communication',
      status: 'disconnected',
      description: 'Team collaboration with AI assistance',
      icon: Users,
      color: 'from-purple-500 to-indigo-500',
      features: ['Auto-responses', 'Message Summaries', 'Task Tracking']
    },
    {
      id: '4',
      name: 'Shopify',
      type: 'E-commerce',
      status: 'pending',
      description: 'AI-powered store management and customer service',
      icon: ShoppingCart,
      color: 'from-green-500 to-emerald-500',
      features: ['Customer Support', 'Inventory Management', 'Sales Analytics']
    },
    {
      id: '5',
      name: 'Google Analytics',
      type: 'Analytics',
      status: 'connected',
      description: 'Advanced data insights and reporting',
      icon: BarChart3,
      color: 'from-orange-500 to-yellow-500',
      features: ['AI Insights', 'Automated Reports', 'Predictions']
    }
  ]);

  const [customIntegration, setCustomIntegration] = useState({
    name: '',
    apiUrl: '',
    apiKey: ''
  });

  const { toast } = useToast();

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { 
            ...integration, 
            status: integration.status === 'connected' ? 'disconnected' : 'connected' 
          }
        : integration
    ));

    const integration = integrations.find(i => i.id === id);
    toast({
      title: integration?.status === 'connected' ? "Integration Disconnected" : "Integration Connected",
      description: `${integration?.name} has been ${integration?.status === 'connected' ? 'disconnected' : 'connected'} successfully`,
    });
  };

  const handleCustomIntegration = () => {
    if (!customIntegration.name || !customIntegration.apiUrl) {
      toast({
        title: "Missing Information",
        description: "Please provide integration name and API URL",
        variant: "destructive"
      });
      return;
    }

    const newIntegration: Integration = {
      id: Date.now().toString(),
      name: customIntegration.name,
      type: 'Custom',
      status: 'pending',
      description: 'Custom API integration',
      icon: Globe,
      color: 'from-gray-500 to-slate-500',
      features: ['Custom API', 'Data Sync', 'Webhooks']
    };

    setIntegrations(prev => [...prev, newIntegration]);
    setCustomIntegration({ name: '', apiUrl: '', apiKey: '' });
    
    toast({
      title: "🔗 Custom Integration Added!",
      description: "Your custom integration is being configured",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">🔗 Smart Integrations</h3>
        <p className="text-sm text-gray-400">Connect with 500+ apps and services</p>
      </div>

      {/* Custom Integration */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-purple-800/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Link className="w-4 h-4" />
            Custom Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Integration name"
            value={customIntegration.name}
            onChange={(e) => setCustomIntegration(prev => ({ ...prev, name: e.target.value }))}
            className="bg-gray-700/50 border-purple-500/30 text-white"
          />
          <Input
            placeholder="API URL"
            value={customIntegration.apiUrl}
            onChange={(e) => setCustomIntegration(prev => ({ ...prev, apiUrl: e.target.value }))}
            className="bg-gray-700/50 border-purple-500/30 text-white"
          />
          <Input
            placeholder="API Key (optional)"
            type="password"
            value={customIntegration.apiKey}
            onChange={(e) => setCustomIntegration(prev => ({ ...prev, apiKey: e.target.value }))}
            className="bg-gray-700/50 border-purple-500/30 text-white"
          />
          <Button 
            onClick={handleCustomIntegration}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <Zap className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </CardContent>
      </Card>

      {/* Available Integrations */}
      <div className="grid grid-cols-1 gap-3">
        {integrations.map((integration) => {
          const IconComponent = integration.icon;
          return (
            <Card key={integration.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${integration.color} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{integration.name}</h4>
                      <p className="text-xs text-gray-400">{integration.description}</p>
                      <Badge variant="outline" className="text-xs text-gray-400 border-gray-600 mt-1">
                        {integration.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${
                      integration.status === 'connected' 
                        ? 'bg-green-500/20 text-green-400'
                        : integration.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {integration.status === 'connected' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : integration.status === 'pending' ? (
                        <AlertCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <Settings className="w-3 h-3 mr-1" />
                      )}
                      {integration.status}
                    </Badge>
                    <Switch
                      checked={integration.status === 'connected'}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {integration.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs text-blue-300 border-blue-500/30 bg-blue-500/10">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button variant="outline" className="border-gray-600 text-gray-300">
          <Globe className="w-4 h-4 mr-2" />
          Browse 500+ More Integrations
        </Button>
      </div>
    </div>
  );
}
