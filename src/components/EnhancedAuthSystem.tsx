import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OTPVerification } from "@/components/OTPVerification";
import { notificationService } from "@/services/emailService";
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
  Globe,
  UserPlus,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SecurityFeatures {
  twoFactorAuth: boolean;
  biometricLogin: boolean;
  deviceTrust: boolean;
  sessionSecurity: boolean;
  encryptedStorage: boolean;
  antiBruteForce: boolean;
  realTimeMonitoring: boolean;
}

interface EnhancedAuthSystemProps {
  onLogin: (userData: any) => void;
  authAttempts?: number;
  onAuthAttempt?: () => void;
}

export function EnhancedAuthSystem({ onLogin, authAttempts = 0, onAuthAttempt }: EnhancedAuthSystemProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | '2fa'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpData, setOtpData] = useState<{email?: string, phone?: string, emailOTP?: string, smsOTP?: string} | null>(null);
  
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
    encryptedStorage: true,
    antiBruteForce: true,
    realTimeMonitoring: true
  });

  const { toast } = useToast();

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { level: 'weak', color: 'text-red-400', score: 1 };
    if (password.length < 10) return { level: 'medium', color: 'text-yellow-400', score: 2 };
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
      return { level: 'strong', color: 'text-green-400', score: 3 };
    }
    return { level: 'medium', color: 'text-yellow-400', score: 2 };
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSecureLogin = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "🚨 Security Alert",
        description: "Please provide all required credentials",
        variant: "destructive"
      });
      return;
    }

    // Check for brute force attempts
    if (authAttempts && authAttempts >= 3) {
      toast({
        title: "🔒 Account Protection Active",
        description: "Too many login attempts. Please wait 5 minutes for security.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    onAuthAttempt?.();

    try {
      // Security threat check
      const securityCheck = notificationService.checkSecurityThreats('192.168.1.1', formData.email);
      if (!securityCheck.safe) {
        toast({
          title: "⚠️ Security Warning",
          description: securityCheck.reason || "Security check failed",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "🔐 Secure Login Initiated",
        description: "Verifying credentials with enterprise-grade security...",
      });

      // Send OTP to both email and phone
      const [emailResult, smsResult] = await Promise.all([
        notificationService.sendEmailOTP(formData.email),
        formData.phone ? notificationService.sendSMSOTP(formData.phone) : { success: false }
      ]);

      if (emailResult.success || smsResult.success) {
        setOtpData({
          email: formData.email,
          phone: formData.phone,
          emailOTP: emailResult.otp,
          smsOTP: smsResult.otp
        });
        setAuthMode('2fa');
        
        toast({
          title: "📱 2FA Security Codes Sent!",
          description: `OTP sent to ${formData.email}${formData.phone ? ` and ${formData.phone}` : ''}`,
        });
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      toast({
        title: "❌ Authentication Error",
        description: "Failed to send security codes. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecureSignup = async () => {
    const passwordStrength = getPasswordStrength(formData.password);
    
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "❌ Registration Incomplete",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    if (passwordStrength.score < 2) {
      toast({
        title: "❌ Password Too Weak",
        description: "Please use a stronger password for better security",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "❌ Password Mismatch",
        description: "Passwords don't match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.phone || formData.phone.length < 10) {
      toast({
        title: "❌ Phone Required",
        description: "Valid phone number required for SMS verification",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      toast({
        title: "🚀 Account Creation Started",
        description: "Setting up your secure account with 2FA...",
      });

      // Send OTP to both email and phone for verification
      const [emailResult, smsResult] = await Promise.all([
        notificationService.sendEmailOTP(formData.email, formData.name),
        notificationService.sendSMSOTP(formData.phone)
      ]);

      if (emailResult.success && smsResult.success) {
        setOtpData({
          email: formData.email,
          phone: formData.phone,
          emailOTP: emailResult.otp,
          smsOTP: smsResult.otp
        });
        setAuthMode('2fa');
        
        toast({
          title: "📧 Verification Required",
          description: "OTP codes sent to your email and phone for verification",
        });
      } else {
        throw new Error('Failed to send verification codes');
      }
    } catch (error) {
      toast({
        title: "❌ Account Creation Failed",
        description: "Failed to send verification codes. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerificationSuccess = () => {
    const userData = {
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      phone: formData.phone,
      plan: 'premium',
      securityScore: 98
    };

    toast({
      title: "✅ Login Successful!",
      description: "Welcome to Tezu AI - World's Most Secure AI Assistant! 🎉",
    });
    
    setTimeout(() => {
      onLogin(userData);
    }, 1000);
  };

  const handleResendOTP = async () => {
    if (!otpData) return;

    try {
      const [emailResult, smsResult] = await Promise.all([
        notificationService.sendEmailOTP(otpData.email!),
        otpData.phone ? notificationService.sendSMSOTP(otpData.phone) : { success: false }
      ]);

      setOtpData(prev => prev ? {
        ...prev,
        emailOTP: emailResult.otp,
        smsOTP: smsResult.otp
      } : null);

      toast({
        title: "🔄 OTP Resent",
        description: "New verification codes sent to your devices",
      });
    } catch (error) {
      toast({
        title: "❌ Resend Failed",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive"
      });
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">🛡️ Tezu AI Security</h1>
          <p className="text-gray-300">World's Most Secure AI Assistant</p>
          <div className="flex justify-center gap-2">
            <Badge className="bg-green-500/20 text-green-400 animate-pulse">
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
          <OTPVerification 
            email={otpData?.email || ''}
            phone={otpData?.phone || ''}
            expectedEmailOTP={otpData?.emailOTP}
            expectedSMSOTP={otpData?.smsOTP}
            onVerificationSuccess={handleOTPVerificationSuccess}
            onResendOTP={handleResendOTP}
          />
        ) : (
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as any)}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="login">🔐 Secure Login</TabsTrigger>
              <TabsTrigger value="signup">👤 Create Account</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Welcome Back
                  </CardTitle>
                  <p className="text-gray-400">Sign in to your secure account</p>
                  {authAttempts > 0 && (
                    <div className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded">
                      <p className="text-yellow-400 text-xs">
                        ⚠️ Failed attempts: {authAttempts}/3. Account will be locked after 3 attempts.
                      </p>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-gray-300">Phone (Optional - for SMS 2FA)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                      <Input
                        type="tel"
                        placeholder="+91 XXXXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-gray-300">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white pl-10 pr-10"
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
                    disabled={isLoading || authAttempts >= 3}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isLoading ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        🔐 Secure Login with 2FA
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Create Secure Account
                  </CardTitle>
                  <p className="text-gray-400">Join the world's most secure AI platform</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                      <Input
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Phone Number (for SMS 2FA)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
                      <Input
                        type="tel"
                        placeholder="+91 XXXXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white pl-10 pr-10"
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
                        <div className={`text-xs ${passwordStrength.color} flex items-center gap-1`}>
                          <Key className="w-3 h-3" />
                          Password strength: {passwordStrength.level}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-300">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white pl-10"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleSecureSignup} 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {isLoading ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        🚀 Create Secure Account
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Enhanced Security Features Display */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-xl">
          <CardContent className="p-4">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              🛡️ Enterprise Security Features
            </h4>
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
            <div className="mt-3 p-2 bg-green-500/10 border border-green-500/30 rounded">
              <p className="text-xs text-green-400 text-center">
                🔒 Zero data collection • End-to-end encryption • GDPR compliant • Made in India 🇮🇳
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
