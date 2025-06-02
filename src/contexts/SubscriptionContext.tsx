
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SubscriptionContextType {
  currentPlan: string;
  isSubscribed: boolean;
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
  };
  usage: {
    messagesUsed: number;
    messagesLimit: number;
    templatesUsed: number;
    templatesLimit: number;
  };
  upgradeToPlan: (planId: string) => void;
  checkFeatureAccess: (feature: string) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [usage, setUsage] = useState({
    messagesUsed: 0,
    messagesLimit: 10,
    templatesUsed: 0,
    templatesLimit: 5,
  });

  const isSubscribed = currentPlan !== 'free';

  const features = {
    unlimitedChat: currentPlan === 'pro' || currentPlan === 'enterprise',
    allAIModels: currentPlan === 'pro' || currentPlan === 'enterprise',
    voiceFeatures: currentPlan === 'pro' || currentPlan === 'enterprise',
    fileUpload: currentPlan === 'pro' || currentPlan === 'enterprise',
    analytics: currentPlan === 'pro' || currentPlan === 'enterprise',
    teamCollaboration: currentPlan === 'enterprise',
    apiAccess: currentPlan === 'enterprise',
    customTemplates: currentPlan === 'pro' || currentPlan === 'enterprise',
    prioritySupport: currentPlan === 'pro' || currentPlan === 'enterprise',
  };

  const upgradeToPlan = (planId: string) => {
    setCurrentPlan(planId);
    
    // Update usage limits based on plan
    if (planId === 'pro' || planId === 'enterprise') {
      setUsage(prev => ({
        ...prev,
        messagesLimit: -1, // Unlimited
        templatesLimit: -1, // Unlimited
      }));
    }
    
    console.log(`Upgraded to ${planId} plan`);
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
      default:
        return false;
    }
  };

  // Simulate usage tracking
  useEffect(() => {
    const interval = setInterval(() => {
      // This would normally track actual usage
      setUsage(prev => ({
        ...prev,
        messagesUsed: Math.min(prev.messagesUsed, prev.messagesLimit),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SubscriptionContext.Provider value={{
      currentPlan,
      isSubscribed,
      features,
      usage,
      upgradeToPlan,
      checkFeatureAccess,
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
