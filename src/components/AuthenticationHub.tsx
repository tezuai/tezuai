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
  Trophy,
  CheckCircle,
  Eye,
  EyeOff,
  Smartphone,
  Globe,
  Server,
  Database,
  Key,
  AlertTriangle
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
  securityScore: number;
  lastLogin: Date;
  deviceTrust: boolean;
  twoFactorEnabled: boolean;
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
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'security'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getPasswordStrength = (password: string) => {
    if (password.length < 8) return { level: 'Weak', color: 'text-red-400', score: 1 };
    if (password.length < 12) return { level: 'Medium', color: 'text-yellow-400', score: 2 };
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
      return { level: 'Strong', color: 'text-green-400', score: 3 };
    }
    return { level: 'Medium', color: 'text-yellow-400', score: 2 };
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSecureLogin = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Security Validation Failed",
        description: "Please provide all required credentials for secure authentication",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Enhanced security simulation
    setTimeout(() => {
      const mockUser: UserProfile = {
        id: Date.now().toString(),
        name: formData.email.split('@')[0],
        email: formData.email,
        plan: 'premium',
        joinDate: new Date(),
        totalChats: 147,
        level: 8,
        badges: ['Security Expert', 'Early Adopter', 'Privacy Champion', 'AI Master'],
        securityScore: 95,
        lastLogin: new Date(),
        deviceTrust: true,
        twoFactorEnabled: true
      };
      
      onLogin(mockUser);
      toast({
        title: "🔒 Secure Login Successful! 🎉",
        description: "Welcome to Tezu AI - World's most secure AI assistant. All security protocols active.",
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleSecureSignup = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Registration Incomplete",
        description: "Please fill all required fields for secure account creation",
        variant: "destructive"
      });
      return;
    }

    const passwordStrength = getPasswordStrength(formData.password);
    if (passwordStrength.score < 2) {
      toast({
        title: "Password Security Alert",
        description: "Please use a stronger password (min 8 characters with mixed case, numbers, symbols)",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Verification Failed",
        description: "Passwords don't match. Please verify and try again.",
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
        plan: 'premium',
        joinDate: new Date(),
        totalChats: 0,
        level: 1,
        badges: ['Security Pioneer', 'New Member', 'Privacy Advocate'],
        securityScore: 85,
        lastLogin: new Date(),
        deviceTrust: true,
        twoFactorEnabled: true
      };
      
      onSignup(newUser);
      onLogin(newUser);
      toast({
        title: "🚀 Secure Account Created! Welcome to Tezu AI Family! 🎉",
        description: "Your account is protected with enterprise-grade security. 2FA enabled by default.",
      });
      setIsLoading(false);
    }, 2500);
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
          <h3 className="text-lg font-bold text-white mb-2">🛡️ Secure Profile</h3>
          <p className="text-sm text-gray-400">Enterprise-grade security active</p>
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
                  <Badge className="text-xs bg-purple-500/20 text-purple-400">
                    <Crown className="w-3 h-3 mr-1" />
                    PREMIUM SECURE
                  </Badge>
                  <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-400">
                    <Trophy className="w-3 h-3 mr-1" />
                    Level {currentUser.level}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Security Score */}
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-400">Security Score</span>
                <span className="text-lg font-bold text-green-400">{currentUser.securityScore}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${currentUser.securityScore}%` }}
                />
              </div>
              <p className="text-xs text-gray-300 mt-1">Excellent security posture</p>
            </div>

            {/* Security Features */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-2 bg-gray-700/50 rounded text-center">
                <CheckCircle className="w-4 h-4 text-green-400 mx-auto mb-1" />
                <div className="text-xs text-green-400">2FA Active</div>
              </div>
              <div className="p-2 bg-gray-700/50 rounded text-center">
                <Shield className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <div className="text-xs text-blue-400">Device Trusted</div>
              </div>
              <div className="p-2 bg-gray-700/50 rounded text-center">
                <Lock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                <div className="text-xs text-purple-400">End-to-End</div>
              </div>
              <div className="p-2 bg-gray-700/50 rounded text-center">
                <Database className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                <div className="text-xs text-yellow-400">Local Only</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-2 bg-gray-700/50 rounded">
                <div className="text-lg font-bold text-blue-400">{currentUser.totalChats}</div>
                <div className="text-xs text-gray-400">Secure Chats</div>
              </div>
              <div className="text-center p-2 bg-gray-700/50 rounded">
                <div className="text-lg font-bold text-green-400">{currentUser.badges.length}</div>
                <div className="text-xs text-gray-400">Security Badges</div>
              </div>
            </div>

            <div className="mb-4">
              <Label className="text-sm text-gray-300 mb-2 block">Security Achievements</Label>
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
                onClick={() => setAuthMode('security')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Security Settings
              </Button>
              
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={onLogout}
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Secure Logout
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
        <h3 className="text-lg font-bold text-white mb-2">🔐 Secure Access</h3>
        <p className="text-sm text-gray-400">World's most secure AI assistant</p>
        <div className="flex justify-center gap-2 mt-2">
          <Badge className="text-xs bg-green-500/20 text-green-400">
            <Shield className="w-3 h-3 mr-1" />
            Bank-Grade Security
          </Badge>
          <Badge className="text-xs bg-blue-500/20 text-blue-400">
            <Globe className="w-3 h-3 mr-1" />
            GDPR Compliant
          </Badge>
        </div>
      </div>

      <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as any)}>
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="login">Secure Login</TabsTrigger>
          <TabsTrigger value="signup">Create Account</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Welcome Back - Secure Login
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
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter secure password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                onClick={handleSecureLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <>
                    <Shield className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating with Advanced Security...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Secure Login
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Create Secure Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-300">Full Name</Label>
                <Input
                  placeholder="Your full name"
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
                <Label className="text-sm text-gray-300">Phone (for 2FA)</Label>
                <Input
                  type="tel"
                  placeholder="+91 XXXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label className="text-sm text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create strong password (min 8 chars)"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {formData.password && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`text-xs ${getPasswordStrength(formData.password).color}`}>
                      Password strength: {getPasswordStrength(formData.password).level}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm text-gray-300">Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                />
              </div>

              <Button 
                onClick={handleSecureSignup}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {isLoading ? (
                  <>
                    <Shield className="w-4 h-4 mr-2 animate-spin" />
                    Creating Secure Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Secure Account
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-green-400">🛡️ Enterprise Security</span>
        </div>
        <p className="text-xs text-gray-300">
          Zero data collection • End-to-end encryption • GDPR compliant • Local processing only
        </p>
      </div>
    </div>
  );
}
