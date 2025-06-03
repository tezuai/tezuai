
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Settings, 
  Bot, 
  Palette,
  Languages,
  BarChart3,
  Zap,
  Brain
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'premium';
  joinDate: Date;
  totalChats: number;
  level: number;
  badges: string[];
  preferences: {
    theme: string;
    language: string;
    fontSize: number;
    autoSave: boolean;
    notifications: boolean;
    voiceEnabled: boolean;
  };
}

interface UserProfileManagerProps {
  user: UserProfile;
  onProfileUpdate: (updates: Partial<UserProfile>) => void;
}

export function UserProfileManager({ user, onProfileUpdate }: UserProfileManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    ...user.preferences
  });
  const { toast } = useToast();

  const themes = [
    { value: "dark", label: "🌙 Dark Mode" },
    { value: "light", label: "☀️ Light Mode" },
    { value: "auto", label: "🔄 Auto Switch" },
  ];

  const languages = [
    { value: "hi", label: "🇮🇳 Hindi" },
    { value: "en", label: "🇬🇧 English" },
    { value: "hi-en", label: "🌐 Hindi + English" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    const updates = {
      name: formData.name,
      email: formData.email,
      preferences: {
        theme: formData.theme,
        language: formData.language,
        fontSize: formData.fontSize,
        autoSave: formData.autoSave,
        notifications: formData.notifications,
        voiceEnabled: formData.voiceEnabled,
      }
    };
    
    onProfileUpdate(updates);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated! ✨",
      description: "Your preferences have been saved successfully.",
    });
  };

  const getPlanColor = (plan: string) => {
    switch(plan) {
      case 'free': return 'bg-gray-500/20 text-gray-400';
      case 'pro': return 'bg-blue-500/20 text-blue-400';
      case 'premium': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getExperienceLevel = (totalChats: number) => {
    if (totalChats < 10) return { level: "Beginner", color: "text-green-400", icon: "🌱" };
    if (totalChats < 50) return { level: "Intermediate", color: "text-blue-400", icon: "🚀" };
    if (totalChats < 100) return { level: "Advanced", color: "text-purple-400", icon: "⭐" };
    return { level: "Expert", color: "text-yellow-400", icon: "👑" };
  };

  const experience = getExperienceLevel(user.totalChats);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">👤 Profile Manager</h3>
        <p className="text-sm text-gray-400">Customize your Tezu AI experience</p>
      </div>

      {/* Profile Overview */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white">{user.name}</h4>
              <p className="text-sm text-gray-400">{user.email}</p>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge className={`text-xs ${getPlanColor(user.plan)}`}>
                  {user.plan.toUpperCase()}
                </Badge>
                <Badge className={`text-xs bg-yellow-500/20 ${experience.color}`}>
                  {experience.icon} {experience.level}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-gray-700/50 rounded">
              <div className="text-lg font-bold text-blue-400">{user.totalChats}</div>
              <div className="text-xs text-gray-400">Total Chats</div>
            </div>
            <div className="text-center p-3 bg-gray-700/50 rounded">
              <div className="text-lg font-bold text-green-400">{user.level}</div>
              <div className="text-xs text-gray-400">User Level</div>
            </div>
            <div className="text-center p-3 bg-gray-700/50 rounded">
              <div className="text-lg font-bold text-purple-400">{user.badges.length}</div>
              <div className="text-xs text-gray-400">Badges</div>
            </div>
          </div>

          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            size="sm"
            className="w-full border-gray-600"
          >
            <Settings className="w-4 h-4 mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </CardContent>
      </Card>

      {/* Edit Form */}
      {isEditing && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              Edit Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-gray-300">Full Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label className="text-sm text-gray-300">Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label className="text-sm text-gray-300 mb-2 block">Theme</Label>
              <Select 
                value={formData.theme} 
                onValueChange={(value) => handleInputChange('theme', value)}
              >
                <SelectTrigger className="bg-gray-700/50 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm text-gray-300 mb-2 block">Language</Label>
              <Select 
                value={formData.language} 
                onValueChange={(value) => handleInputChange('language', value)}
              >
                <SelectTrigger className="bg-gray-700/50 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-300">Auto Save</Label>
                <Switch
                  checked={formData.autoSave}
                  onCheckedChange={(checked) => handleInputChange('autoSave', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-300">Notifications</Label>
                <Switch
                  checked={formData.notifications}
                  onCheckedChange={(checked) => handleInputChange('notifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-300">Voice Enabled</Label>
                <Switch
                  checked={formData.voiceEnabled}
                  onCheckedChange={(checked) => handleInputChange('voiceEnabled', checked)}
                />
              </div>
            </div>

            <Button
              onClick={handleSaveProfile}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Achievements */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {user.badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-yellow-500/20 text-yellow-400 justify-center p-2"
              >
                🏆 {badge}
              </Badge>
            ))}
          </div>
          
          <div className="text-center pt-3 border-t border-gray-600">
            <p className="text-xs text-gray-400">
              Member since {user.joinDate.toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="border-gray-600 text-gray-300">
          <Brain className="w-4 h-4 mr-2" />
          AI Usage
        </Button>
        <Button variant="outline" className="border-gray-600 text-gray-300">
          <Zap className="w-4 h-4 mr-2" />
          Performance
        </Button>
      </div>
    </div>
  );
}
