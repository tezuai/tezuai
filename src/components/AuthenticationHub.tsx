
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Lock, 
  LogIn, 
  LogOut, 
  UserPlus,
  Shield,
  Star,
  Crown,
  Settings,
  Trophy
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
}

interface AuthenticationHubProps {
  isAuthenticated: boolean;
  currentUser?: UserProfile;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  onSignup: (userData: any) => void;
}

export function AuthenticationHub({ 
  isAuthenticated, 
  currentUser, 
  onLogin, 
  onLogout, 
  onSignup 
}: AuthenticationHubProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockUser: UserProfile = {
        id: Date.now().toString(),
        name: formData.email.split('@')[0],
        email: formData.email,
        plan: 'free',
        joinDate: new Date(),
        totalChats: 0,
        level: 1,
        badges: ['New User']
      };
      
      onLogin(mockUser);
      toast({
        title: "Welcome to Tezu AI! 🎉",
        description: "Successfully logged in. Let's start chatting!",
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const newUser: UserProfile = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        plan: 'free',
        joinDate: new Date(),
        totalChats: 0,
        level: 1,
        badges: ['New Member', 'Early Adopter']
      };
      
      onSignup(newUser);
      onLogin(newUser);
      toast({
        title: "Account Created! 🚀",
        description: "Welcome to Tezu AI family!",
      });
      setIsLoading(false);
    }, 1500);
  };

  const getPlanColor = (plan: string) => {
    switch(plan) {
      case 'free': return 'bg-gray-500/20 text-gray-400';
      case 'pro': return 'bg-blue-500/20 text-blue-400';
      case 'premium': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPlanIcon = (plan: string) => {
    switch(plan) {
      case 'free': return <User className="w-3 h-3" />;
      case 'pro': return <Star className="w-3 h-3" />;
      case 'premium': return <Crown className="w-3 h-3" />;
      default: return <User className="w-3 h-3" />;
    }
  };

  if (isAuthenticated && currentUser) {
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-white mb-2">👤 User Profile</h3>
          <p className="text-sm text-gray-400">Manage your Tezu AI account</p>
        </div>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {currentUser.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h4 className="font-semibold text-white">{currentUser.name}</h4>
                <p className="text-sm text-gray-400">{currentUser.email}</p>
                
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs ${getPlanColor(currentUser.plan)}`}>
                    {getPlanIcon(currentUser.plan)}
                    {currentUser.plan.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-400">
                    <Trophy className="w-3 h-3 mr-1" />
                    Level {currentUser.level}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-2 bg-gray-700/50 rounded">
                <div className="text-lg font-bold text-blue-400">{currentUser.totalChats}</div>
                <div className="text-xs text-gray-400">Total Chats</div>
              </div>
              <div className="text-center p-2 bg-gray-700/50 rounded">
                <div className="text-lg font-bold text-green-400">{currentUser.badges.length}</div>
                <div className="text-xs text-gray-400">Badges</div>
              </div>
            </div>

            <div className="mb-4">
              <Label className="text-sm text-gray-300 mb-2 block">Achievements</Label>
              <div className="flex flex-wrap gap-1">
                {currentUser.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-yellow-500/20 text-yellow-400">
                    🏆 {badge}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
              
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={onLogout}
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">🔐 Join Tezu AI</h3>
        <p className="text-sm text-gray-400">Login or create account to get started</p>
      </div>

      <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as any)}>
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <LogIn className="w-5 h-5" />
                Welcome Back
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-300">Email</Label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label className="text-sm text-gray-300">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                />
              </div>

              <Button 
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Create Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-300">Full Name</Label>
                <Input
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-300">Email</Label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label className="text-sm text-gray-300">Password</Label>
                <Input
                  type="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-300">Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                />
              </div>

              <Button 
                onClick={handleSignup}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-green-400">100% Secure</span>
        </div>
        <p className="text-xs text-gray-300">
          Your data is encrypted and protected. Join thousands of users!
        </p>
      </div>
    </div>
  );
}
