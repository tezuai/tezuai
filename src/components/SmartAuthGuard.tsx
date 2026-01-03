import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: 'free' | 'pro' | 'premium' | 'enterprise';
  joinDate: Date;
  securityScore: number;
  isVerified: boolean;
  lastActivity: Date;
  avatar?: string;
  totalChats?: number;
  level?: string;
}

interface SmartAuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  onAuthStateChange?: (isAuthenticated: boolean, user?: UserSession | null) => void;
}

export function SmartAuthGuard({ children, requireAuth = false, onAuthStateChange }: SmartAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Only synchronous state updates here
      if (session?.user) {
        const userData = mapUserToSession(session.user);
        setUserSession(userData);
        setIsAuthenticated(true);
        onAuthStateChange?.(true, userData);
      } else {
        setUserSession(null);
        setIsAuthenticated(false);
        onAuthStateChange?.(false, null);
      }
      setIsLoading(false);

      // Defer profile fetch with setTimeout to prevent deadlock
      if (session?.user) {
        setTimeout(() => {
          fetchUserProfile(session.user.id);
        }, 0);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const userData = mapUserToSession(session.user);
        setUserSession(userData);
        setIsAuthenticated(true);
        onAuthStateChange?.(true, userData);
        
        // Fetch profile data
        setTimeout(() => {
          fetchUserProfile(session.user.id);
        }, 0);
      } else {
        setIsAuthenticated(false);
        onAuthStateChange?.(false, null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const mapUserToSession = (user: User): UserSession => {
    return {
      id: user.id,
      name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'User',
      email: user.email || '',
      phone: user.phone || '',
      plan: 'free', // Default, will be updated from profile
      joinDate: new Date(user.created_at),
      securityScore: 95,
      isVerified: !!user.email_confirmed_at,
      lastActivity: new Date(),
      avatar: user.user_metadata?.avatar_url,
      totalChats: 0,
      level: 'User'
    };
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profile && !error) {
        setUserSession(prev => prev ? {
          ...prev,
          name: profile.display_name || prev.name,
          phone: profile.phone || prev.phone,
          plan: (profile.plan as UserSession['plan']) || 'free',
          avatar: profile.avatar_url || prev.avatar,
          totalChats: profile.total_chats || 0,
          securityScore: profile.security_score || 85,
          isVerified: profile.is_verified || false,
        } : null);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUserSession(null);
      setIsAuthenticated(false);
      onAuthStateChange?.(false, null);

      toast({
        title: "🔒 Logged Out",
        description: "Your session has been safely terminated. Thank you for using TezuAI!",
      });
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Redirect to auth if authentication is required
  useEffect(() => {
    if (!isLoading && requireAuth && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isLoading, requireAuth, isAuthenticated, navigate]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-2xl">🚀</span>
          </div>
          <p className="text-gray-400">Loading TezuAI...</p>
        </div>
      </div>
    );
  }

  // If auth required but not authenticated, redirect handled by useEffect
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export { type UserSession as UserSessionType };
