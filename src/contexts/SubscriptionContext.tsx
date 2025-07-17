
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
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [usage, setUsage] = useState({
    messagesUsed: 0,
    messagesLimit: 10,
    templatesUsed: 0,
    templatesLimit: 5,
    workflowsUsed: 0,
    workflowsLimit: 2,
  });

  const isSubscribed = currentPlan !== 'free';

  const features = {
    unlimitedChat: currentPlan === 'starter' || currentPlan === 'professional' || currentPlan === 'enterprise',
    allAIModels: currentPlan === 'professional' || currentPlan === 'enterprise',
    voiceFeatures: currentPlan === 'starter' || currentPlan === 'professional' || currentPlan === 'enterprise',
    fileUpload: currentPlan === 'starter' || currentPlan === 'professional' || currentPlan === 'enterprise',
    analytics: currentPlan === 'starter' || currentPlan === 'professional' || currentPlan === 'enterprise',
    teamCollaboration: currentPlan === 'professional' || currentPlan === 'enterprise',
    apiAccess: currentPlan === 'enterprise',
    customTemplates: currentPlan === 'starter' || currentPlan === 'professional' || currentPlan === 'enterprise',
    prioritySupport: currentPlan === 'professional' || currentPlan === 'enterprise',
    workflowAutomation: currentPlan === 'starter' || currentPlan === 'professional' || currentPlan === 'enterprise',
    customAITraining: currentPlan === 'professional' || currentPlan === 'enterprise',
    businessIntelligence: currentPlan === 'professional' || currentPlan === 'enterprise',
    cloudComputing: currentPlan === 'professional' || currentPlan === 'enterprise',
    dataAnalytics: currentPlan === 'professional' || currentPlan === 'enterprise',
  };

  const upgradeToPlan = (planId: string) => {
    setCurrentPlan(planId);
    
    // Update usage limits based on plan
    if (planId === 'starter') {
      setUsage(prev => ({
        ...prev,
        messagesLimit: 500,
        templatesLimit: 20,
        workflowsLimit: 5,
      }));
    } else if (planId === 'professional' || planId === 'enterprise') {
      setUsage(prev => ({
        ...prev,
        messagesLimit: -1, // Unlimited
        templatesLimit: -1, // Unlimited
        workflowsLimit: -1, // Unlimited
      }));
    }
    
    // Plan upgrade completed successfully
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

  // Simulate usage tracking
  useEffect(() => {
    const interval = setInterval(() => {
      // This would normally track actual usage
      setUsage(prev => ({
        ...prev,
        messagesUsed: Math.min(prev.messagesUsed, prev.messagesLimit === -1 ? prev.messagesUsed : prev.messagesLimit),
        workflowsUsed: Math.min(prev.workflowsUsed, prev.workflowsLimit === -1 ? prev.workflowsUsed : prev.workflowsLimit),
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
