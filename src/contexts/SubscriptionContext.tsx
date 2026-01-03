import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionContextType {
  currentPlan: string;
  isSubscribed: boolean;
  isDemoMode: boolean;
  features: {
    unlimitedChat: boolean;
    allAIModels: boolean;
    voiceFeatures: boolean;
    fileUpload: boolean;
    analytics: boolean;
    teamCollaboration: boolean;
    apiAccess: boolean;
    customTemplates: boolean;
    prioritySupport: boolean;
    workflowAutomation: boolean;
    customAITraining: boolean;
    businessIntelligence: boolean;
    cloudComputing: boolean;
    dataAnalytics: boolean;
  };
  usage: {
    messagesUsed: number;
    messagesLimit: number;
    templatesUsed: number;
    templatesLimit: number;
    workflowsUsed: number;
    workflowsLimit: number;
  };
  upgradeToPlan: (planId: string) => void;
  checkFeatureAccess: (feature: string) => boolean;
  refreshPlan: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Demo mode only in development
const DEMO_MODE = import.meta.env.DEV;

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [isDemoMode] = useState(DEMO_MODE);
  const [usage, setUsage] = useState({
    messagesUsed: 0,
    messagesLimit: 10,
    templatesUsed: 0,
    templatesLimit: 5,
    workflowsUsed: 0,
    workflowsLimit: 2,
  });

  // Fetch user plan from database
  const refreshPlan = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('plan')
          .eq('user_id', user.id)
          .single();
        
        if (profile?.plan) {
          setCurrentPlan(profile.plan);
          updateUsageLimits(profile.plan);
        }
      } else {
        setCurrentPlan('free');
      }
    } catch (error) {
      console.error('Error fetching plan:', error);
    }
  };

  const updateUsageLimits = (plan: string) => {
    if (plan === 'starter') {
      setUsage(prev => ({
        ...prev,
        messagesLimit: 500,
        templatesLimit: 20,
        workflowsLimit: 5,
      }));
    } else if (plan === 'professional' || plan === 'enterprise' || plan === 'premium') {
      setUsage(prev => ({
        ...prev,
        messagesLimit: -1,
        templatesLimit: -1,
        workflowsLimit: -1,
      }));
    } else {
      setUsage(prev => ({
        ...prev,
        messagesLimit: 10,
        templatesLimit: 5,
        workflowsLimit: 2,
      }));
    }
  };

  useEffect(() => {
    refreshPlan();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      setTimeout(() => {
        refreshPlan();
      }, 0);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isSubscribed = currentPlan !== 'free';

  const features = {
    unlimitedChat: currentPlan === 'starter' || currentPlan === 'professional' || currentPlan === 'enterprise' || currentPlan === 'premium',
    allAIModels: currentPlan === 'professional' || currentPlan === 'enterprise' || currentPlan === 'premium',
    voiceFeatures: currentPlan === 'starter' || currentPlan === 'professional' || currentPlan === 'enterprise' || currentPlan === 'premium',
    fileUpload: currentPlan === 'starter' || currentPlan === 'professional' || currentPlan === 'enterprise' || currentPlan === 'premium',
    analytics: currentPlan === 'starter' || currentPlan === 'professional' || currentPlan === 'enterprise' || currentPlan === 'premium',
    teamCollaboration: currentPlan === 'professional' || currentPlan === 'enterprise',
    apiAccess: currentPlan === 'enterprise',
    customTemplates: currentPlan === 'starter' || currentPlan === 'professional' || currentPlan === 'enterprise' || currentPlan === 'premium',
    prioritySupport: currentPlan === 'professional' || currentPlan === 'enterprise',
    workflowAutomation: currentPlan === 'starter' || currentPlan === 'professional' || currentPlan === 'enterprise' || currentPlan === 'premium',
    customAITraining: currentPlan === 'professional' || currentPlan === 'enterprise',
    businessIntelligence: currentPlan === 'professional' || currentPlan === 'enterprise',
    cloudComputing: currentPlan === 'professional' || currentPlan === 'enterprise',
    dataAnalytics: currentPlan === 'professional' || currentPlan === 'enterprise',
  };

  const upgradeToPlan = async (planId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ plan: planId })
          .eq('user_id', user.id);
        
        if (!error) {
          setCurrentPlan(planId);
          updateUsageLimits(planId);
        }
      }
    } catch (error) {
      console.error('Error upgrading plan:', error);
    }
  };

  const checkFeatureAccess = (feature: string): boolean => {
    switch (feature) {
      case 'unlimitedChat':
        return features.unlimitedChat || usage.messagesUsed < usage.messagesLimit;
      case 'allAIModels':
        return features.allAIModels;
      case 'voiceFeatures':
        return features.voiceFeatures;
      case 'fileUpload':
        return features.fileUpload;
      case 'analytics':
        return features.analytics;
      case 'teamCollaboration':
        return features.teamCollaboration;
      case 'apiAccess':
        return features.apiAccess;
      case 'customTemplates':
        return features.customTemplates || usage.templatesUsed < usage.templatesLimit;
      case 'prioritySupport':
        return features.prioritySupport;
      case 'workflowAutomation':
        return features.workflowAutomation || usage.workflowsUsed < usage.workflowsLimit;
      case 'customAITraining':
        return features.customAITraining;
      case 'businessIntelligence':
        return features.businessIntelligence;
      case 'cloudComputing':
        return features.cloudComputing;
      case 'dataAnalytics':
        return features.dataAnalytics;
      default:
        return false;
    }
  };

  return (
    <SubscriptionContext.Provider value={{
      currentPlan,
      isSubscribed,
      isDemoMode,
      features,
      usage,
      upgradeToPlan,
      checkFeatureAccess,
      refreshPlan,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
