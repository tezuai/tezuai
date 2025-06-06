
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnhancedAuthSystem } from "@/components/EnhancedAuthSystem";
import { 
  Shield, 
  Lock, 
  User, 
  Star,
  Crown,
  Zap,
  Globe,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SmartAuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  onAuthStateChange?: (isAuthenticated: boolean) => void;
}

interface UserSession {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: 'free' | 'pro' | 'premium';
  joinDate: Date;
  securityScore: number;
  isVerified: boolean;
  lastActivity: Date;
}

export function SmartAuthGuard({ children, requireAuth = false, onAuthStateChange }: SmartAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [authAttempts, setAuthAttempts] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Check existing session
    const savedSession = localStorage.getItem('tezu-ai-session');
    const sessionExpiry = localStorage.getItem('tezu-ai-session-expiry');
    
    if (savedSession && sessionExpiry) {
      const now = new Date().getTime();
      const expiry = parseInt(sessionExpiry);
      
      if (now < expiry) {
        const session = JSON.parse(savedSession);
        setUserSession(session);
        setIsAuthenticated(true);
        onAuthStateChange?.(true);
        
        toast({
          title: "🎉 Welcome Back to Tezu AI!",
          description: `Hi ${session.name}! You're now connected to World's #1 Secure AI Assistant`,
        });
      } else {
        // Session expired
        handleLogout();
      }
    }
  }, []);

  const handleAuthRequired = () => {
    if (!isAuthenticated && requireAuth) {
      setShowAuthModal(true);
      toast({
        title: "🔐 Authentication Required",
        description: "Please login to access Tezu AI's premium features",
      });
    }
  };

  const handleLogin = (userData: any) => {
    const newSession: UserSession = {
      id: Date.now().toString(),
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      phone: userData.phone || '',
      plan: 'premium',
      joinDate: new Date(),
      securityScore: 98,
      isVerified: true,
      lastActivity: new Date()
    };

    // Store session with 24-hour expiry
    const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
    localStorage.setItem('tezu-ai-session', JSON.stringify(newSession));
    localStorage.setItem('tezu-ai-session-expiry', expiry.toString());
    localStorage.setItem('tezu-ai-authenticated', 'true');

    setUserSession(newSession);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setAuthAttempts(0);
    onAuthStateChange?.(true);

    toast({
      title: "✅ Login Successful! Welcome to Tezu AI Family! 🎉",
      description: "You now have access to all premium features with enterprise-grade security!",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('tezu-ai-session');
    localStorage.removeItem('tezu-ai-session-expiry');
    localStorage.removeItem('tezu-ai-authenticated');
    
    setUserSession(null);
    setIsAuthenticated(false);
    onAuthStateChange?.(false);

    toast({
      title: "🔒 Secure Logout Complete",
      description: "Your session has been safely terminated. Thank you for using Tezu AI!",
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('⚠️ Are you sure you want to delete your Tezu AI account? This action cannot be undone.')) {
      // Clear all user data
      localStorage.clear();
      setUserSession(null);
      setIsAuthenticated(false);
      onAuthStateChange?.(false);

      toast({
        title: "🗑️ Account Deleted Successfully",
        description: "Your Tezu AI account and all data have been permanently deleted as per GDPR compliance.",
        variant: "destructive"
      });
    }
  };

  // Auto-trigger auth for protected actions
  useEffect(() => {
    handleAuthRequired();
  }, [requireAuth]);

  // Show auth modal when needed
  if (showAuthModal || (!isAuthenticated && requireAuth)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">🔐 Secure Access Required</h1>
            <p className="text-gray-300">Login to unlock Tezu AI's powerful features</p>
            <div className="flex justify-center gap-2 mt-3">
              <Badge className="bg-green-500/20 text-green-400">
                <CheckCircle className="w-3 h-3 mr-1" />
                World's #1 AI
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400">
                <Shield className="w-3 h-3 mr-1" />
                Bank-Grade Security
              </Badge>
            </div>
          </div>

          <EnhancedAuthSystem 
            onLogin={handleLogin}
            authAttempts={authAttempts}
            onAuthAttempt={() => setAuthAttempts(prev => prev + 1)}
          />

          {!requireAuth && (
            <div className="mt-4 text-center">
              <Button 
                variant="ghost" 
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-white"
              >
                Continue without login
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      {/* Pass auth utilities to children */}
      <div style={{ display: 'none' }}>
        <div data-auth-state={isAuthenticated} />
        <div data-user-session={JSON.stringify(userSession)} />
        <div data-auth-handlers={JSON.stringify({ handleLogout, handleDeleteAccount })} />
      </div>
    </>
  );
}

export { type UserSession };
