import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle,
  Smartphone,
  Globe,
  History,
  FileCheck,
  Fingerprint,
  Scan,
  RefreshCw,
  Download,
  Upload,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'data_access' | 'settings_change' | 'security_scan';
  timestamp: string;
  location: string;
  device: string;
  ipAddress: string;
  status: 'success' | 'warning' | 'blocked';
  description: string;
}

interface SecurityMetrics {
  overallScore: number;
  passwordStrength: number;
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  encryptionLevel: number;
  lastSecurityScan: string;
  threatLevel: 'low' | 'medium' | 'high';
  activeDevices: number;
  dataEncrypted: boolean;
}

interface PrivacySettings {
  dataCollection: boolean;
  analytics: boolean;
  personalization: boolean;
  thirdPartySharing: boolean;
  locationTracking: boolean;
  advertisingData: boolean;
}

export function SecurityCenter() {
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    overallScore: 85,
    passwordStrength: 90,
    twoFactorEnabled: true,
    biometricEnabled: false,
    encryptionLevel: 256,
    lastSecurityScan: new Date().toISOString(),
    threatLevel: 'low',
    activeDevices: 3,
    dataEncrypted: true
  });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    dataCollection: false,
    analytics: false,
    personalization: true,
    thirdPartySharing: false,
    locationTracking: false,
    advertisingData: false
  });

  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with sample security events
    const sampleEvents: SecurityEvent[] = [
      {
        id: '1',
        type: 'login',
        timestamp: new Date().toISOString(),
        location: 'Mumbai, India',
        device: 'Chrome on Windows',
        ipAddress: '49.207.xxx.xxx',
        status: 'success',
        description: 'Successful login with 2FA verification'
      },
      {
        id: '2',
        type: 'security_scan',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        location: 'System',
        device: 'Security Scanner',
        ipAddress: 'Internal',
        status: 'success',
        description: 'Automated security scan completed - No threats detected'
      },
      {
        id: '3',
        type: 'data_access',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        location: 'Delhi, India',
        device: 'Mobile App',
        ipAddress: '203.124.xxx.xxx',
        status: 'warning',
        description: 'Data export request - Requires verification'
      }
    ];

    setSecurityEvents(sampleEvents);
  }, []);

  const runSecurityScan = async () => {
    setIsScanning(true);
    
    // Simulate security scan
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newEvent: SecurityEvent = {
      id: Date.now().toString(),
      type: 'security_scan',
      timestamp: new Date().toISOString(),
      location: 'System',
      device: 'Security Scanner',
      ipAddress: 'Internal',
      status: 'success',
      description: 'Manual security scan completed - System secure'
    };

    setSecurityEvents(prev => [newEvent, ...prev]);
    setSecurityMetrics(prev => ({
      ...prev,
      lastSecurityScan: new Date().toISOString(),
      overallScore: Math.min(100, prev.overallScore + 2)
    }));

    setIsScanning(false);
    
    toast({
      title: "🔒 Security Scan Complete",
      description: "Your system is secure. No threats detected.",
    });
  };

  const enableBiometric = () => {
    setSecurityMetrics(prev => ({
      ...prev,
      biometricEnabled: true,
      overallScore: Math.min(100, prev.overallScore + 10)
    }));
    
    toast({
      title: "🔐 Biometric Authentication Enabled",
      description: "Your security score has increased by 10 points!",
    });
  };

  const exportSecurityData = () => {
    const securityData = {
      metrics: securityMetrics,
      events: securityEvents,
      privacy: privacySettings,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(securityData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tezu-ai-security-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "📥 Security Data Exported",
      description: "Your security data has been downloaded successfully",
    });
  };

  const updatePrivacySetting = (setting: keyof PrivacySettings, value: boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));

    toast({
      title: "🔒 Privacy Setting Updated",
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getEventStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'blocked': return <Shield className="w-4 h-4 text-red-600" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900 dark:to-orange-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-red-600" />
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Security Center</h1>
            <p className="text-slate-600 dark:text-slate-300">Advanced security और privacy controls</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge className={`${getThreatLevelColor(securityMetrics.threatLevel)}`}>
            Threat Level: {securityMetrics.threatLevel.toUpperCase()}
          </Badge>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(securityMetrics.overallScore)}`}>
              {securityMetrics.overallScore}%
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Security Score</div>
          </div>
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Password Strength</p>
                <p className={`text-2xl font-bold ${getScoreColor(securityMetrics.passwordStrength)}`}>
                  {securityMetrics.passwordStrength}%
                </p>
              </div>
              <Key className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Encryption Level</p>
                <p className="text-2xl font-bold text-green-600">{securityMetrics.encryptionLevel}-bit</p>
              </div>
              <Lock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Devices</p>
                <p className="text-2xl font-bold text-purple-600">{securityMetrics.activeDevices}</p>
              </div>
              <Smartphone className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">2FA Status</p>
                <p className={`text-sm font-bold ${securityMetrics.twoFactorEnabled ? 'text-green-600' : 'text-red-600'}`}>
                  {securityMetrics.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <Fingerprint className={`w-8 h-8 ${securityMetrics.twoFactorEnabled ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(securityMetrics.overallScore)} mb-2`}>
                    {securityMetrics.overallScore}%
                  </div>
                  <Progress value={securityMetrics.overallScore} className="mb-4" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Password Protection</span>
                    <Badge className="bg-green-100 text-green-800">Strong</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Two-Factor Authentication</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Encryption</span>
                    <Badge className="bg-green-100 text-green-800">256-bit AES</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Biometric Login</span>
                    <Badge className={securityMetrics.biometricEnabled ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {securityMetrics.biometricEnabled ? 'Enabled' : 'Available'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="w-5 h-5" />
                  Security Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={runSecurityScan} 
                  disabled={isScanning}
                  className="w-full"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Scan className="w-4 h-4 mr-2" />
                      Run Security Scan
                    </>
                  )}
                </Button>
                
                {!securityMetrics.biometricEnabled && (
                  <Button onClick={enableBiometric} variant="outline" className="w-full">
                    <Fingerprint className="w-4 h-4 mr-2" />
                    Enable Biometric Login
                  </Button>
                )}
                
                <Button onClick={exportSecurityData} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Security Data
                </Button>
                
                <Button variant="outline" className="w-full">
                  <FileCheck className="w-4 h-4 mr-2" />
                  Security Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Threat Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Real-time Threat Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>All systems secure.</strong> No active threats detected. Last scan: {new Date(securityMetrics.lastSecurityScan).toLocaleString()}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Authentication Tab */}
        <TabsContent value="authentication" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Password Protection</h4>
                      <p className="text-sm text-slate-600">Strong password with complexity rules</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-slate-600">SMS और authenticator app support</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Fingerprint className="w-6 h-6 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Biometric Authentication</h4>
                      <p className="text-sm text-slate-600">Fingerprint और face recognition</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={securityMetrics.biometricEnabled ? "secondary" : "default"}
                    onClick={enableBiometric}
                    disabled={securityMetrics.biometricEnabled}
                  >
                    {securityMetrics.biometricEnabled ? 'Enabled' : 'Enable'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Current Session</h4>
                      <p className="text-sm text-slate-600">Chrome on Windows - Mumbai</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Mobile App Session</h4>
                      <p className="text-sm text-slate-600">Android App - Delhi</p>
                    </div>
                    <Button size="sm" variant="outline">Revoke</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Tablet Session</h4>
                      <p className="text-sm text-slate-600">Safari on iPad - Bangalore</p>
                    </div>
                    <Button size="sm" variant="outline">Revoke</Button>
                  </div>
                </div>
                
                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Revoke All Sessions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(privacySettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                    <p className="text-sm text-slate-600">
                      {key === 'dataCollection' && 'Control data collection for service improvement'}
                      {key === 'analytics' && 'Allow usage analytics to improve features'}
                      {key === 'personalization' && 'Enable personalized recommendations'}
                      {key === 'thirdPartySharing' && 'Share data with trusted partners'}
                      {key === 'locationTracking' && 'Track location for better service'}
                      {key === 'advertisingData' && 'Use data for targeted advertising'}
                    </p>
                  </div>
                  <Button
                    variant={value ? "default" : "outline"}
                    size="sm"
                    onClick={() => updatePrivacySetting(key as keyof PrivacySettings, !value)}
                  >
                    {value ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Security Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityEvents.map(event => (
                  <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="mt-1">
                      {getEventStatusIcon(event.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{event.type.replace('_', ' ').toUpperCase()}</h4>
                        <Badge variant="outline" className="text-xs">
                          {event.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{new Date(event.timestamp).toLocaleString()}</span>
                        <span>{event.location}</span>
                        <span>{event.device}</span>
                        <span>{event.ipAddress}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  ये settings advanced users के लिए हैं। बिना समझे न बदलें।
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">End-to-End Encryption</h4>
                    <p className="text-sm text-slate-600">All data encrypted with AES-256</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Zero-Knowledge Architecture</h4>
                    <p className="text-sm text-slate-600">Server cannot decrypt your data</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Advanced Threat Detection</h4>
                    <p className="text-sm text-slate-600">AI-powered security monitoring</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Security Audit Logs</h4>
                    <p className="text-sm text-slate-600">Detailed audit trail for compliance</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}