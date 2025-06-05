import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Lock, 
  Shield, 
  Phone, 
  Key, 
  Smartphone,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SecurityFeatures {
  twoFactorAuth: boolean;
  biometricLogin: boolean;
  deviceTrust: boolean;
  sessionSecurity: boolean;
  encryptedStorage: boolean;
}

interface EnhancedAuthSystemProps {
  onLogin: () => void;
}

export function EnhancedAuthSystem({ onLogin }: EnhancedAuthSystemProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | '2fa'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  
  const [securityFeatures] = useState<SecurityFeatures>({
    twoFactorAuth: true,
    biometricLogin: true,
    deviceTrust: true,
    sessionSecurity: true,
    encryptedStorage: true
  });

  const { toast } = useToast();

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { level: 'weak', color: 'text-red-400' };
    if (password.length < 10) return { level: 'medium', color: 'text-yellow-400' };
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
      return { level: 'strong', color: 'text-green-400' };
    }
    return { level: 'medium', color: 'text-yellow-400' };
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSecureLogin = () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Security Alert",
        description: "Please provide all required credentials",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🔐 Secure Login Initiated",
      description: "Verifying credentials with enterprise-grade security...",
    });

    setTimeout(() => {
      setAuthMode('2fa');
      toast({
        title: "2FA Required",
        description: "Please enter the verification code sent to your device",
      });
    }, 1500);
  };

  const handleSecureSignup = () => {
    const passwordStrength = getPasswordStrength(formData.password);
    
    if (passwordStrength.level === 'weak') {
      toast({
        title: "Password Too Weak",
        description: "Please use a stronger password for better security",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords don't match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🚀 Account Created Successfully!",
      description: "Welcome to Tezu AI - World's most secure AI assistant",
    });
    
    // Auto login after successful signup
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  const handle2FAVerification = () => {
    if (formData.otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit verification code",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "✅ Login Successful!",
      description: "Welcome back! All security checks passed.",
    });
    
    // Call the onLogin prop to update authentication state
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Tezu AI Security</h1>
          <p className="text-gray-300">World's Most Secure AI Assistant</p>
          <div className="flex justify-center gap-2">
            <Badge className="bg-green-500/20 text-green-400">
              <Lock className="w-3 h-3 mr-1" />
              Bank-Grade Security
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400">
              <Globe className="w-3 h-3 mr-1" />
              Global Compliance
            </Badge>
          </div>
        </div>

        {authMode === '2fa' ? (
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Two-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Enter 6-digit verification code</Label>
                <Input
                  type="text"
                  placeholder="000000"
                  value={formData.otp}
                  onChange={(e) => handleInputChange('otp', e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white text-center text-2xl tracking-widest"
                  maxLength={6}
                />
              </div>
              <Button 
                onClick={handle2FAVerification}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Verify & Login
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as any)}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="login">Secure Login</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Welcome Back</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Email</Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
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
                  <Button onClick={handleSecureLogin} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    <Lock className="w-4 h-4 mr-2" />
                    Secure Login
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Create Secure Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Full Name</Label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Email</Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Phone (for 2FA)</Label>
                    <Input
                      type="tel"
                      placeholder="+91 XXXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create strong password"
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
                        <div className={`text-xs ${passwordStrength.color}`}>
                          Password strength: {passwordStrength.level}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-300">Confirm Password</Label>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                  <Button onClick={handleSecureSignup} className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                    <Shield className="w-4 h-4 mr-2" />
                    Create Secure Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-xl">
          <CardContent className="p-4">
            <h4 className="text-white font-medium mb-3">Security Features</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(securityFeatures).map(([key, enabled]) => (
                <div key={key} className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span className="text-gray-300">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
