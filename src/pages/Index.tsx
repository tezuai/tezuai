import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { SubscriptionPage } from "@/pages/Subscription";
import { CheckoutPage } from "@/pages/Checkout";
import { LandingPage } from "@/components/LandingPage";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { PrivacySecurityHub } from "@/components/PrivacySecurityHub";
import { SmartAuthGuard, type UserSession } from "@/components/SmartAuthGuard";
import { AdvancedUserSettings } from "@/components/AdvancedUserSettings";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { ProfessionalFooter } from "@/components/ProfessionalFooter";
import { FloatingActions } from "@/components/FloatingActions";
import { TezuImageGenerator } from "@/components/TezuImageGenerator";
import { TezuTemplates } from "@/components/TezuTemplates";
import { CreativeStudio } from "@/components/CreativeStudio";
import type { ViewName } from "@/types/views";

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<ViewName>('chat');
  const [showLanding, setShowLanding] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [requireAuth, setRequireAuth] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{
    planId: string;
    planName: string;
    amount: number;
    billingPeriod: "monthly" | "yearly";
  } | null>(null);

  // Check if user is returning
  useEffect(() => {
    const hasUsedBefore = localStorage.getItem('zentara-ai-used');
    const savedSession = localStorage.getItem('zentara-ai-session');
    
    if (hasUsedBefore) {
      setShowLanding(false);
    }
    
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        setCurrentUser(session);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved session:', error);
      }
    }
  }, []);

  const handleStartFromLanding = () => {
    setShowLanding(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('zentara-ai-used', 'true');
    handleNewConversation();
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    localStorage.setItem('zentara-ai-used', 'true');
  };

  const handleNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: "नया Chat - Zentara AI",
      messages: [],
      createdAt: new Date(),
      isStarred: false,
      isArchived: false,
    };
    setConversations(prev => [newConversation, ...prev]);
    setSelectedConversation(newConversation.id);
    setCurrentView('chat');
    setShowLanding(false);
    setShowOnboarding(false);
    setRequireAuth(false);
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    setCurrentView('chat');
  };

  const handleUpdateConversation = (updatedConversation: any) => {
    setConversations(prev => prev.map(c => 
      c.id === updatedConversation.id ? updatedConversation : c
    ));
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (selectedConversation === id) {
      setSelectedConversation(null);
    }
  };

  const handleArchiveConversation = (id: string) => {
    setConversations(prev => prev.map(c => 
      c.id === id ? { ...c, isArchived: !c.isArchived } : c
    ));
  };

  const handleDuplicateConversation = (conversation: any) => {
    const duplicatedConversation = {
      ...conversation,
      id: Date.now().toString(),
      title: `Copy of ${conversation.title}`,
      createdAt: new Date(),
    };
    setConversations(prev => [duplicatedConversation, ...prev]);
  };

  const handleAuthStateChange = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
    
    if (authenticated) {
      const sessionElement = document.querySelector('[data-user-session]');
      if (sessionElement) {
        try {
          const sessionData = sessionElement.getAttribute('data-user-session');
          if (sessionData && sessionData !== 'null') {
            const session = JSON.parse(sessionData);
            setCurrentUser(session);
          }
        } catch (error) {
          console.error('Failed to parse user session:', error);
        }
      }
      setRequireAuth(false);
    } else {
      setCurrentUser(null);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('zentara-ai-session');
  };

  const handleDeleteAccount = () => {
    handleLogout();
    localStorage.clear();
  };

  const handleViewChange = (view: ViewName) => {
    const authRequiredViews = ['subscription', 'privacy', 'settings'];
    
    if (authRequiredViews.includes(view) && !isAuthenticated) {
      setRequireAuth(true);
      return;
    }
    
    setCurrentView(view);
    setRequireAuth(false);
  };

  const handleUpdateProfile = (profileData: Partial<UserSession>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...profileData };
      setCurrentUser(updatedUser);
      localStorage.setItem('zentara-ai-session', JSON.stringify(updatedUser));
    }
  };

  const convertUserSessionToProfile = (user: UserSession) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      plan: user.plan,
      joinDate: user.joinDate,
      securityScore: user.securityScore,
      totalChats: user.totalChats || 0,
      level: user.level || 'Beginner'
    };
  };

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  // Show landing page for new users
  if (showLanding) {
    return <LandingPage onStartChat={handleStartFromLanding} />;
  }

  // Show onboarding flow
  if (showOnboarding) {
    return (
      <OnboardingFlow 
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    );
  }

  const handleCheckout = (planId: string, planName: string, amount: number, billingPeriod: "monthly" | "yearly") => {
    setCheckoutData({ planId, planName, amount, billingPeriod });
  };

  const handleCheckoutComplete = () => {
    setCheckoutData(null);
    setCurrentView('chat');
  };

  // Show checkout if checkout data exists
  if (checkoutData) {
    return (
      <SubscriptionProvider>
        <CheckoutPage
          {...checkoutData}
          onBack={() => setCheckoutData(null)}
          onComplete={handleCheckoutComplete}
        />
      </SubscriptionProvider>
    );
  }

  const handleUseTemplate = (prompt: string) => {
    // Switch to chat and create new conversation with the template
    handleNewConversation();
    // The prompt will be used by ChatInterface
  };

  const renderContent = () => {
    switch (currentView) {
      case 'subscription':
        return (
          <SubscriptionPage 
            onBack={() => setCurrentView('chat')}
            onCheckout={handleCheckout}
          />
        );
      case 'privacy':
        return <PrivacySecurityHub />;
      case 'settings':
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <AdvancedUserSettings
              user={currentUser ? convertUserSessionToProfile(currentUser) : null}
              onLogout={handleLogout}
              onDeleteAccount={handleDeleteAccount}
              onUpdateProfile={handleUpdateProfile}
            />
          </div>
        );
      case 'analytics':
        return <AnalyticsDashboard conversations={conversations} />;
      case 'image-generator':
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <TezuImageGenerator />
          </div>
        );
      case 'templates':
        return (
          <div className="p-6 max-w-6xl mx-auto">
            <TezuTemplates onUseTemplate={handleUseTemplate} />
          </div>
        );
      case 'creative-studio':
        return (
          <div className="p-6">
            <CreativeStudio />
          </div>
        );
      case 'chat':
      default:
        if (selectedConversation && currentConversation) {
          return (
            <ChatInterface
              conversation={currentConversation}
              onUpdateConversation={handleUpdateConversation}
              allConversations={conversations}
            />
          );
        }
        return <WelcomeScreen onStartChat={handleNewConversation} />;
    }
  };

  return (
    <SubscriptionProvider>
      <SidebarProvider>
        <SmartAuthGuard 
          requireAuth={requireAuth}
          onAuthStateChange={handleAuthStateChange}
        >
          <div className="min-h-screen flex flex-col w-full bg-background">
            <div className="flex flex-1">
              <Sidebar
                conversations={conversations}
                selectedConversation={selectedConversation}
                onNewConversation={handleNewConversation}
                onSelectConversation={handleSelectConversation}
                onUpdateConversation={handleUpdateConversation}
                onDeleteConversation={handleDeleteConversation}
                onArchiveConversation={handleArchiveConversation}
                onDuplicateConversation={handleDuplicateConversation}
                currentView={currentView}
                onViewChange={handleViewChange}
                onLogout={handleLogout}
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
              />
              <main className="flex-1 flex flex-col overflow-auto">
                {renderContent()}
              </main>
            </div>
            <ProfessionalFooter />
            <FloatingActions />
          </div>
        </SmartAuthGuard>
      </SidebarProvider>
    </SubscriptionProvider>
  );
};

export default Index;
