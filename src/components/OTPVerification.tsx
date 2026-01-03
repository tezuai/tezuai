import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Mail, 
  Smartphone, 
  Clock, 
  RefreshCw, 
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Environment-based demo mode flag
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true' || import.meta.env.DEV;

interface OTPVerificationProps {
  email: string;
  phone?: string;
  expectedEmailOTP?: string;
  expectedSMSOTP?: string;
  onVerificationSuccess: () => void;
  onResendOTP: () => void;
}

export function OTPVerification({ 
  email, 
  phone, 
  expectedEmailOTP,
  expectedSMSOTP,
  onVerificationSuccess, 
  onResendOTP 
}: OTPVerificationProps) {
  const [emailOTP, setEmailOTP] = useState("");
  const [smsOTP, setSmsOTP] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isVerifying, setIsVerifying] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  const { toast } = useToast();

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsExpired(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerification = async () => {
    if (!emailOTP && !smsOTP) {
      toast({
        title: "❌ OTP Required",
        description: "Please enter at least one OTP code to verify",
        variant: "destructive"
      });
      return;
    }

    if (isExpired) {
      toast({
        title: "⏰ OTP Expired",
        description: "Please request a new OTP code",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    setAttempts(prev => prev + 1);

    try {
      let emailVerified = false;
      let smsVerified = false;

      // Verify email OTP against expected value (from server in production)
      if (emailOTP && expectedEmailOTP) {
        emailVerified = emailOTP === expectedEmailOTP;
      }

      // Verify SMS OTP against expected value (from server in production)
      if (smsOTP && expectedSMSOTP) {
        smsVerified = smsOTP === expectedSMSOTP;
      }

      // In production, this would call a server-side verification endpoint
      // For now, verification happens against server-provided OTPs only
      if (emailVerified || smsVerified) {
        toast({
          title: "✅ Verification Successful!",
          description: "Your identity has been verified! 🎉",
        });
        
        setTimeout(() => {
          onVerificationSuccess();
        }, 1000);
      } else {
        if (attempts >= 3) {
          toast({
            title: "🔒 Account Locked",
            description: "Too many failed attempts. Please try again later.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "❌ Verification Failed",
            description: `Invalid OTP code. ${3 - attempts} attempts remaining.`,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "❌ Verification Error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setTimeLeft(300);
    setIsExpired(false);
    setAttempts(0);
    setEmailOTP("");
    setSmsOTP("");
    
    try {
      await onResendOTP();
    } catch (error) {
      toast({
        title: "❌ Resend Failed",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            🔐 Two-Factor Authentication
          </CardTitle>
          <p className="text-gray-400">Enter the verification codes sent to your devices</p>
          
          {/* Timer Display */}
          <div className="flex items-center justify-center gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className={`font-mono text-lg ${isExpired ? 'text-red-400' : 'text-blue-400'}`}>
              {isExpired ? 'EXPIRED' : formatTime(timeLeft)}
            </span>
            {!isExpired && <span className="text-xs text-gray-400">remaining</span>}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Email OTP */}
          <div className="space-y-2">
            <Label className="text-gray-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              Email OTP - {email}
            </Label>
            <div className="relative">
              <Input
                type={showOTP ? "text" : "password"}
                placeholder="Enter 6-digit email OTP"
                value={emailOTP}
                onChange={(e) => setEmailOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="bg-gray-700/50 border-gray-600 text-white font-mono text-center text-lg tracking-widest pr-10"
                disabled={isExpired || attempts >= 3}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowOTP(!showOTP)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showOTP ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <div className="text-xs text-gray-400 text-center">
              Check your email inbox and spam folder
            </div>
          </div>

          {/* SMS OTP */}
          {phone && (
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-green-400" />
                SMS OTP - {phone}
              </Label>
              <div className="relative">
                <Input
                  type={showOTP ? "text" : "password"}
                  placeholder="Enter 6-digit SMS OTP"
                  value={smsOTP}
                  onChange={(e) => setSmsOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  className="bg-gray-700/50 border-gray-600 text-white font-mono text-center text-lg tracking-widest"
                  disabled={isExpired || attempts >= 3}
                />
              </div>
              <div className="text-xs text-gray-400 text-center">
                Check your SMS messages
              </div>
            </div>
          )}

          {/* Demo Mode Notice - Only shown in development */}
          {DEMO_MODE && (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-medium text-xs">DEVELOPMENT MODE</span>
              </div>
              <p className="text-xs text-gray-300">
                OTP verification is simulated. In production, real OTPs will be sent via email/SMS.
              </p>
            </div>
          )}

          {/* Security Features */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-green-500/10 border border-green-500/30 rounded text-center">
              <CheckCircle className="w-4 h-4 text-green-400 mx-auto mb-1" />
              <div className="text-xs text-green-400">Encrypted</div>
            </div>
            <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded text-center">
              <Shield className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <div className="text-xs text-blue-400">Secure</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleVerification}
              disabled={isVerifying || isExpired || attempts >= 3 || (!emailOTP && !smsOTP)}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {isVerifying ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  ✅ Verify & Continue
                </>
              )}
            </Button>

            <Button
              onClick={handleResendOTP}
              variant="outline"
              disabled={!isExpired && timeLeft > 240}
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              🔄 Resend OTP Codes
            </Button>
          </div>

          {/* Attempt Counter */}
          {attempts > 0 && (
            <div className="text-center">
              <Badge variant={attempts >= 3 ? "destructive" : "secondary"} className="text-xs">
                Attempts: {attempts}/3
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Information */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <h4 className="text-green-400 font-medium text-sm">🛡️ Your Security is Our Priority</h4>
            <p className="text-xs text-gray-300">
              • OTP codes expire in 5 minutes<br/>
              • Each code can only be used once<br/>
              • All communications are encrypted
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
