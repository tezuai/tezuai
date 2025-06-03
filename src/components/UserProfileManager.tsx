
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Crown, 
  Trophy,
  Target,
  Calendar,
  Star,
  Zap,
  Gift,
  Download,
  Upload,
  Edit3,
  Save,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserStats {
  totalChats: number;
  dailyStreak: number;
  level: number;
  experience: number;
  nextLevelExp: number;
  badges: string[];
  achievements: string[];
  joinDate: Date;
  lastActive: Date;
  favoriteFeatures: string[];
  timeSpent: number; // in minutes
}

interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
    updates: boolean;
  };
  privacy: {
    shareUsage: boolean;
    personalizedAds: boolean;
    analyticsTracking: boolean;
  };
  aiSettings: {
    defaultPersonality: string;
    responseLength: 'short' | 'medium' | 'long';
    creativity: number;
    formality: number;
  };
}

interface UserProfileManagerProps {
  user: any;
  onProfileUpdate: (updates: any) => void;
}

export function UserProfileManager({ user, onProfileUpdate }: UserProfileManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || ''
  });

  const [userStats] = useState<UserStats>({
    totalChats: 1247,
    dailyStreak: 12,
    level: 8,
    experience: 2840,
    nextLevelExp: 3000,
    badges: ['Early Adopter', 'Power User', 'AI Explorer', 'Streak Master'],
    achievements: ['First Chat', '100 Conversations', 'Week Streak', 'Feature Explorer'],
    joinDate: new Date('2024-01-15'),
    lastActive: new Date(),
    favoriteFeatures: ['Voice Chat', 'Personalities', 'File Analysis'],
    timeSpent: 2150
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'dark',
    language: 'hi-IN',
    notifications: {
      email: true,
      push: true,
      marketing: false,
      updates: true
    },
    privacy: {
      shareUsage: true,
      personalizedAds: false,
      analyticsTracking: true
    },
    aiSettings: {
      defaultPersonality: 'tezu-friendly',
      responseLength: 'medium',
      creativity: 0.7,
      formality: 0.3
    }
  });

  const { toast } = useToast();

  const experiencePercentage = (userStats.experience / userStats.nextLevelExp) * 100;

  const getBadgeColor = (badge: string) => {
    const colors = {
      'Early Adopter': 'bg-purple-500/20 text-purple-400',
      'Power User': 'bg-blue-500/20 text-blue-400',
      'AI Explorer': 'bg-green-500/20 text-green-400',
      'Streak Master': 'bg-yellow-500/20 text-yellow-400'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
  };

  const handleSaveProfile = () => {
    onProfileUpdate(editData);
    setIsEditing(false);
    toast({
      title: "Profile Updated! ✨",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handlePreferenceUpdate = (category: string, key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof UserPreferences],
        [key]: value
      }
    }));
    
    toast({
      title: "Settings Updated",
      description: "Your preferences have been saved.",
    });
  };

  const exportUserData = () => {
    const userData = {
      profile: user,
      stats: userStats,
      preferences: preferences,
      exportDate: new Date()
    };
    
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tezu-ai-user-data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported",
      description: "Your user data has been downloaded.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">👤 Profile Manager</h3>
        <p className="text-sm text-gray-400">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-gray-600"
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl">
                    {editData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400">
                      Level {userStats.level}
                    </Badge>
                    <Badge className="bg-yellow-500/20 text-yellow-400">
                      <Crown className="w-3 h-3 mr-1" />
                      {user?.plan || 'Free'}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Progress to Level {userStats.level + 1}</span>
                      <span>{userStats.experience}/{userStats.nextLevelExp} XP</span>
                    </div>
                    <Progress value={experiencePercentage} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Profile Fields */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="text-sm text-gray-300">Full Name</Label>
                  {isEditing ? (
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  ) : (
                    <div className="p-2 bg-gray-700/50 rounded text-white">{editData.name}</div>
                  )}
                </div>

                <div>
                  <Label className="text-sm text-gray-300">Email</Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  ) : (
                    <div className="p-2 bg-gray-700/50 rounded text-white">{editData.email}</div>
                  )}
                </div>

                <div>
                  <Label className="text-sm text-gray-300">Bio</Label>
                  {isEditing ? (
                    <Input
                      value={editData.bio}
                      onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  ) : (
                    <div className="p-2 bg-gray-700/50 rounded text-white">
                      {editData.bio || 'No bio added yet'}
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm text-gray-300">Location</Label>
                  {isEditing ? (
                    <Input
                      value={editData.location}
                      onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Your location"
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  ) : (
                    <div className="p-2 bg-gray-700/50 rounded text-white">
                      {editData.location || 'Not specified'}
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700 flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="border-gray-600"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats">
          <div className="space-y-4">
            {/* Usage Stats */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Usage Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-700/50 rounded">
                    <div className="text-2xl font-bold text-blue-400">{userStats.totalChats}</div>
                    <div className="text-xs text-gray-400">Total Chats</div>
                  </div>
                  <div className="text-center p-3 bg-gray-700/50 rounded">
                    <div className="text-2xl font-bold text-green-400">{userStats.dailyStreak}</div>
                    <div className="text-xs text-gray-400">Day Streak</div>
                  </div>
                  <div className="text-center p-3 bg-gray-700/50 rounded">
                    <div className="text-2xl font-bold text-purple-400">{Math.round(userStats.timeSpent / 60)}h</div>
                    <div className="text-xs text-gray-400">Time Spent</div>
                  </div>
                  <div className="text-center p-3 bg-gray-700/50 rounded">
                    <div className="text-2xl font-bold text-yellow-400">{userStats.level}</div>
                    <div className="text-xs text-gray-400">Current Level</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Badges & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h6 className="text-sm font-medium text-gray-300 mb-2">Earned Badges</h6>
                  <div className="flex flex-wrap gap-2">
                    {userStats.badges.map((badge, index) => (
                      <Badge key={index} className={`${getBadgeColor(badge)}`}>
                        🏆 {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h6 className="text-sm font-medium text-gray-300 mb-2">Recent Achievements</h6>
                  <div className="space-y-2">
                    {userStats.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-700/50 rounded">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-white">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="space-y-4">
            {/* General Settings */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">Theme</Label>
                    <div className="flex gap-2">
                      {['dark', 'light', 'auto'].map((theme) => (
                        <Button
                          key={theme}
                          size="sm"
                          variant={preferences.theme === theme ? "default" : "outline"}
                          onClick={() => handlePreferenceUpdate('theme', 'theme', theme)}
                          className={`${
                            preferences.theme === theme
                              ? 'bg-blue-600 text-white'
                              : 'border-gray-600 text-gray-300'
                          }`}
                        >
                          {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">Language</Label>
                    <div className="flex gap-2">
                      {['hi-IN', 'en-US'].map((lang) => (
                        <Button
                          key={lang}
                          size="sm"
                          variant={preferences.language === lang ? "default" : "outline"}
                          onClick={() => handlePreferenceUpdate('language', 'language', lang)}
                          className={`${
                            preferences.language === lang
                              ? 'bg-blue-600 text-white'
                              : 'border-gray-600 text-gray-300'
                          }`}
                        >
                          {lang === 'hi-IN' ? 'Hindi' : 'English'}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Settings */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI Behavior
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">Response Length</Label>
                  <div className="flex gap-2">
                    {['short', 'medium', 'long'].map((length) => (
                      <Button
                        key={length}
                        size="sm"
                        variant={preferences.aiSettings.responseLength === length ? "default" : "outline"}
                        onClick={() => handlePreferenceUpdate('aiSettings', 'responseLength', length)}
                        className={`${
                          preferences.aiSettings.responseLength === length
                            ? 'bg-blue-600 text-white'
                            : 'border-gray-600 text-gray-300'
                        }`}
                      >
                        {length.charAt(0).toUpperCase() + length.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(preferences.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <Button
                      size="sm"
                      variant={value ? "default" : "outline"}
                      onClick={() => handlePreferenceUpdate('notifications', key, !value)}
                      className={`${
                        value ? 'bg-green-600 text-white' : 'border-gray-600 text-gray-300'
                      }`}
                    >
                      {value ? 'On' : 'Off'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <div className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(preferences.privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-300 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <p className="text-xs text-gray-500">
                        {key === 'shareUsage' && 'Help improve Tezu by sharing anonymous usage data'}
                        {key === 'personalizedAds' && 'Show ads based on your interests'}
                        {key === 'analyticsTracking' && 'Allow analytics to improve user experience'}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant={value ? "default" : "outline"}
                      onClick={() => handlePreferenceUpdate('privacy', key, !value)}
                      className={`${
                        value ? 'bg-blue-600 text-white' : 'border-gray-600 text-gray-300'
                      }`}
                    >
                      {value ? 'On' : 'Off'}
                    </Button>
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-600">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="border-gray-600 flex-1"
                      onClick={exportUserData}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="border-gray-600 flex-1">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Data
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Download your data or import from another account
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
