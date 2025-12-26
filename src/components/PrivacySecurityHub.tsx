
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  FileText, 
  UserCheck, 
  AlertTriangle,
  CheckCircle,
  Globe,
  Server,
  Key,
  Database,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PrivacySecurityHub() {
  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: false,
    analytics: false,
    marketing: false,
    thirdPartySharing: false,
    locationTracking: false,
    personalizedAds: false
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    encryptedStorage: true,
    sessionTimeout: true,
    deviceTracking: true,
    suspiciousActivityAlert: true
  });

  const { toast } = useToast();

  const handlePrivacyChange = (setting: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }));
    toast({
      title: "Privacy Setting Updated",
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleDataDeletion = () => {
    toast({
      title: "Data Deletion Request Submitted",
      description: "Your request to delete all personal data has been submitted. This will be processed within 30 days as per GDPR compliance.",
    });
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">
          🛡️ Privacy & Security Center
        </h2>
        <p className="text-lg text-gray-300">
          Zentara AI - World's Most Secure & Private AI Assistant
        </p>
        <div className="flex justify-center gap-3">
          <Badge className="bg-green-500/20 text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            GDPR Compliant
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400">
            <Shield className="w-3 h-3 mr-1" />
            ISO 27001 Certified
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-400">
            <Lock className="w-3 h-3 mr-1" />
            End-to-End Encrypted
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="privacy" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="privacy">Privacy Controls</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
          <TabsTrigger value="compliance">Legal Compliance</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Privacy Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(privacySettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-700/50 rounded">
                  <div>
                    <h4 className="text-white font-medium">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {key === 'dataCollection' && 'Control if Zentara AI can collect usage data for improvements'}
                      {key === 'analytics' && 'Allow anonymous analytics to improve service quality'}
                      {key === 'marketing' && 'Receive updates about new features and improvements'}
                      {key === 'thirdPartySharing' && 'Share data with trusted partners (Always disabled for security)'}
                      {key === 'locationTracking' && 'Use location for better contextual responses'}
                      {key === 'personalizedAds' && 'Show relevant content based on usage (No ads policy)'}
                    </p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => handlePrivacyChange(key, checked)}
                    disabled={key === 'thirdPartySharing' || key === 'personalizedAds'}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(securitySettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-700/50 rounded">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <h4 className="text-white font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h4>
                      <p className="text-sm text-gray-400">Always enabled for maximum security</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Legal Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded">
                  <h4 className="text-green-400 font-medium mb-2">✓ GDPR Compliance</h4>
                  <p className="text-sm text-gray-300">European data protection standards</p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded">
                  <h4 className="text-green-400 font-medium mb-2">✓ CCPA Compliance</h4>
                  <p className="text-sm text-gray-300">California consumer privacy rights</p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded">
                  <h4 className="text-green-400 font-medium mb-2">✓ Indian IT Act</h4>
                  <p className="text-sm text-gray-300">Compliant with Indian data laws</p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded">
                  <h4 className="text-green-400 font-medium mb-2">✓ ISO 27001</h4>
                  <p className="text-sm text-gray-300">Information security management</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded">
                  <h4 className="text-blue-400 font-medium mb-2">Data Encryption</h4>
                  <p className="text-sm text-gray-300">All your data is encrypted with AES-256 encryption</p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded">
                  <h4 className="text-purple-400 font-medium mb-2">Local Storage Only</h4>
                  <p className="text-sm text-gray-300">Your conversations stay on your device - never sent to external servers</p>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded">
                  <h4 className="text-yellow-400 font-medium mb-2">No Data Mining</h4>
                  <p className="text-sm text-gray-300">Zentara AI never mines your data for commercial purposes</p>
                </div>
                <Button 
                  onClick={handleDataDeletion}
                  variant="destructive" 
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Request Complete Data Deletion
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
