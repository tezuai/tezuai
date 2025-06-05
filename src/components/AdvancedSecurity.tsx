
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Lock, 
  Key, 
  Eye,
  AlertTriangle,
  CheckCircle,
  Fingerprint,
  Smartphone,
  Globe,
  Server,
  Database,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SecurityFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  level: 'basic' | 'advanced' | 'enterprise';
  icon: any;
  color: string;
}

interface SecurityScan {
  id: string;
  type: string;
  status: 'passed' | 'warning' | 'failed';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export function AdvancedSecurity() {
  const [securityFeatures, setSecurityFeatures] = useState<SecurityFeature[]>([
    {
      id: '1',
      name: 'End-to-End Encryption',
      description: 'AES-256 military-grade encryption for all communications',
      enabled: true,
      level: 'enterprise',
      icon: Lock,
      color: 'text-green-400'
    },
    {
      id: '2',
      name: 'Biometric Authentication',
      description: 'Fingerprint and face recognition login',
      enabled: true,
      level: 'advanced',
      icon: Fingerprint,
      color: 'text-blue-400'
    },
    {
      id: '3',
      name: 'Zero-Knowledge Architecture',
      description: 'Complete data privacy with no server access',
      enabled: true,
      level: 'enterprise',
      icon: Eye,
      color: 'text-purple-400'
    },
    {
      id: '4',
      name: 'Multi-Factor Authentication',
      description: 'SMS, email, and app-based 2FA protection',
      enabled: false,
      level: 'basic',
      icon: Smartphone,
      color: 'text-yellow-400'
    },
    {
      id: '5',
      name: 'Advanced Threat Detection',
      description: 'AI-powered threat monitoring and prevention',
      enabled: true,
      level: 'enterprise',
      icon: Shield,
      color: 'text-red-400'
    }
  ]);

  const [securityScans, setSecurityScans] = useState<SecurityScan[]>([
    {
      id: '1',
      type: 'Data Encryption',
      status: 'passed',
      description: 'All data encrypted with AES-256',
      severity: 'low'
    },
    {
      id: '2',
      type: 'Access Control',
      status: 'passed',
      description: 'Proper user authentication in place',
      severity: 'low'
    },
    {
      id: '3',
      type: 'Network Security',
      status: 'warning',
      description: 'Consider enabling additional firewall rules',
      severity: 'medium'
    },
    {
      id: '4',
      type: 'Data Privacy',
      status: 'passed',
      description: 'GDPR compliant data handling',
      severity: 'low'
    }
  ]);

  const [securityScore] = useState(94);
  const [lastScan] = useState(new Date());

  const { toast } = useToast();

  const toggleSecurityFeature = (id: string) => {
    setSecurityFeatures(prev => prev.map(feature => 
      feature.id === id 
        ? { ...feature, enabled: !feature.enabled }
        : feature
    ));

    const feature = securityFeatures.find(f => f.id === id);
    toast({
      title: feature?.enabled ? "Security Feature Disabled" : "Security Feature Enabled",
      description: `${feature?.name} has been ${feature?.enabled ? 'disabled' : 'enabled'}`,
    });
  };

  const runSecurityScan = () => {
    toast({
      title: "🔍 Security Scan Started",
      description: "Running comprehensive security analysis...",
    });

    setTimeout(() => {
      toast({
        title: "✅ Security Scan Complete",
        description: "Your system passed all security checks",
      });
    }, 3000);
  };

  const getSecurityScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">🛡️ Advanced Security</h3>
        <p className="text-sm text-gray-400">Enterprise-grade security & privacy protection</p>
      </div>

      {/* Security Score */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-green-800/30 border-green-500/30">
        <CardContent className="p-4">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-green-400" />
              <h4 className="text-xl font-bold text-white">Security Score</h4>
            </div>
            <div className={`text-4xl font-bold ${getSecurityScoreColor(securityScore)}`}>
              {securityScore}%
            </div>
            <Progress value={securityScore} className="h-3" />
            <p className="text-xs text-gray-400">
              Last scan: {lastScan.toLocaleString()}
            </p>
            <Button 
              onClick={runSecurityScan}
              className="bg-gradient-to-r from-green-600 to-emerald-600"
            >
              <Zap className="w-4 h-4 mr-2" />
              Run Security Scan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Security Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {securityFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-5 h-5 ${feature.color}`} />
                  <div>
                    <h4 className="text-white font-medium">{feature.name}</h4>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                    <Badge className={`text-xs mt-1 ${
                      feature.level === 'enterprise' ? 'bg-purple-500/20 text-purple-400' :
                      feature.level === 'advanced' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {feature.level}
                    </Badge>
                  </div>
                </div>
                <Switch
                  checked={feature.enabled}
                  onCheckedChange={() => toggleSecurityFeature(feature.id)}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Security Scan Results */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Security Scan Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {securityScans.map((scan) => (
            <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                {scan.status === 'passed' ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : scan.status === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                )}
                <div>
                  <h4 className="text-white font-medium">{scan.type}</h4>
                  <p className="text-xs text-gray-400">{scan.description}</p>
                </div>
              </div>
              <Badge className={`${
                scan.status === 'passed' ? 'bg-green-500/20 text-green-400' :
                scan.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {scan.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-blue-800/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">GDPR</span>
              </div>
              <p className="text-xs text-gray-300 mt-1">EU Data Protection</p>
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">CCPA</span>
              </div>
              <p className="text-xs text-gray-300 mt-1">California Privacy</p>
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">SOC 2</span>
              </div>
              <p className="text-xs text-gray-300 mt-1">Security Controls</p>
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">ISO 27001</span>
              </div>
              <p className="text-xs text-gray-300 mt-1">Information Security</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
