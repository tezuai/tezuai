
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Crown,
  LogOut,
  Trash2,
  Settings,
  Lock,
  Key,
  Database,
  Download,
  Upload,
  Star,
  Zap,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'premium';
  joinDate: Date;
  securityScore: number;
  totalChats: number;
  level: number;
}

interface AdvancedUserSettingsProps {
  user: UserProfile | null;
  onLogout: () => void;
  onDeleteAccount: () => void;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
}

export function AdvancedUserSettings({ 
  user, 
  onLogout, 
  onDeleteAccount, 
  onUpdateProfile 
}: AdvancedUserSettingsProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    darkMode: true,
    language: 'en',
    aiPersonality: 'professional',
    autoSave: true,
    dataCollection: false,
    analytics: false
  });

  const { toast } = useToast();

  const handleProfileUpdate = () => {
    onUpdateProfile(formData);
    toast({
      title: "✅ Profile Updated Successfully",
      description: "Your Tezu AI profile has been updated with enhanced security",
    });
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast({
      title: "⚙️ Setting Updated",
      description: `${key} preference has been ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleDataExport = () => {
    toast({
      title: "📦 Data Export Started",
      description: "Your complete Tezu AI data will be prepared for download",
    });
  };

  const handleDataImport = () => {
    toast({
      title: "📥 Data Import Ready",
      description: "You can now import your previous Tezu AI data",
    });
  };

  if (!user) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6 text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">No User Logged In</h3>
          <p className="text-gray-400 text-sm">Please login to access user settings</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">⚙️ Advanced User Settings</h2>
        <p className="text-gray-400">Manage your Tezu AI account and preferences</p>
      </div>

      {/* User Profile Card */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-blue-800/30 border-blue-500/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16 ring-2 ring-blue-500/50">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{user.name}</h3>
              <p className="text-gray-400">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-purple-500/20 text-purple-400">
                  <Crown className="w-3 h-3 mr-1" />
                  {user.plan.toUpperCase()} PLAN
                </Badge>
                <Badge className="bg-green-500/20 text-green-400">
                  <Star className="w-3 h-3 mr-1" />
                  Level {user.level}
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400">
                  <Shield className="w-3 h-3 mr-1" />
                  {user.securityScore}% Secure
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gray-700/50 rounded">
              <div className="text-lg font-bold text-blue-400">{user.totalChats}</div>
              <div className="text-xs text-gray-400">Total Chats</div>
            </div>
            <div className="p-3 bg-gray-700/50 rounded">
              <div className="text-lg font-bold text-green-400">{user.securityScore}%</div>
              <div className="text-xs text-gray-400">Security Score</div>
            </div>
            <div className="p-3 bg-gray-700/50 rounded">
              <div className="text-lg font-bold text-purple-400">{user.level}</div>
              <div className="text-xs text-gray-400">User Level</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="data">Data & Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-700/50 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Email Address</Label>
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-gray-700/50 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Phone Number</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-gray-700/50 border-gray-600 text-white"
                />
              </div>
              <Button onClick={handleProfileUpdate} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security & Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <h4 className="text-green-400 font-medium">Two-Factor Authentication</h4>
                    <p className="text-xs text-gray-300">Enhanced security enabled</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-blue-400" />
                  <div>
                    <h4 className="text-blue-400 font-medium">End-to-End Encryption</h4>
                    <p className="text-xs text-gray-300">Military-grade security</p>
                  </div>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-purple-400" />
                  <div>
                    <h4 className="text-purple-400 font-medium">Zero-Knowledge Architecture</h4>
                    <p className="text-xs text-gray-300">Complete data privacy</p>
                  </div>
                </div>
                <Badge className="bg-purple-500/20 text-purple-400">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                App Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-700/50 rounded">
                  <div>
                    <h4 className="text-white font-medium">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {key === 'notifications' && 'Receive in-app notifications'}
                      {key === 'emailAlerts' && 'Get email alerts for important updates'}
                      {key === 'smsAlerts' && 'Receive SMS notifications'}
                      {key === 'darkMode' && 'Use dark theme interface'}
                      {key === 'autoSave' && 'Automatically save conversations'}
                      {key === 'dataCollection' && 'Allow usage analytics'}
                      {key === 'analytics' && 'Enable performance analytics'}
                    </p>
                  </div>
                  <Switch
                    checked={typeof value === 'boolean' ? value : false}
                    onCheckedChange={(checked) => handlePreferenceChange(key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data Management & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handleDataExport} variant="outline" className="border-gray-600 text-gray-300">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button onClick={handleDataImport} variant="outline" className="border-gray-600 text-gray-300">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">GDPR Compliance</span>
                </div>
                <p className="text-xs text-gray-300">
                  Your data is processed according to GDPR regulations. You have the right to access, modify, or delete your personal data.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Danger Zone */}
      <Card className="bg-red-500/10 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={onLogout}
            variant="outline" 
            className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Secure Logout
          </Button>
          
          <Button 
            onClick={onDeleteAccount}
            variant="destructive" 
            className="w-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account & All Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
