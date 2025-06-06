import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { SubscriptionPage } from "@/pages/Subscription";
import { LandingPage } from "@/components/LandingPage";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { PrivacySecurityHub } from "@/components/PrivacySecurityHub";
import { SmartAuthGuard, type UserSession } from "@/components/SmartAuthGuard";
import { AdvancedUserSettings } from "@/components/AdvancedUserSettings";
import { ProfessionalAIAssistant } from "@/components/ProfessionalAIAssistant";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { Footer } from "@/components/Footer";
import { AIModelSwitcher } from "@/components/AIModelSwitcher";
import { RealTimeCollaboration } from "@/components/RealTimeCollaboration";
import { CustomAITraining } from "@/components/CustomAITraining";
import { ProfessionalTemplates } from "@/components/ProfessionalTemplates";
import { AdvancedAnalytics } from "@/components/AdvancedAnalytics";

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<
    | 'chat'
    | 'analytics'
    | 'subscription'
    | 'privacy'
    | 'settings'
    | 'ai-assistant'
    | 'ai-model-switcher'
    | 'collaboration'
    | 'custom-training'
    | 'templates'
    | 'advanced-analytics'
  >('chat');
  const [showLanding, setShowLanding] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [requireAuth, setRequireAuth] = useState(false);

  // Check if user is returning (has localStorage data)
  useEffect(() => {
    const hasUsedBefore = localStorage.getItem('tezu-ai-assistant-used');
    const savedSession = localStorage.getItem('tezu-ai-session');
    
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
    localStorage.setItem('tezu-ai-assistant-used', 'true');
    handleNewConversation();
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    localStorage.setItem('tezu-ai-assistant-used', 'true');
  };

  const handleNewConversation = () => {
    // Check if advanced features require authentication
    const needsAuth = currentView !== 'chat' && currentView !== 'analytics';
    
    if (needsAuth && !isAuthenticated) {
      setRequireAuth(true);
      return;
    }

    const newConversation = {
      id: Date.now().toString(),
      title: "नया Conversation - Tezu AI Pro",
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
      // Get user session from DOM data attributes (passed by SmartAuthGuard)
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
    // This will be handled by SmartAuthGuard
    const handlersElement = document.querySelector('[data-auth-handlers]');
    if (handlersElement) {
      try {
        const handlersData = handlersElement.getAttribute('data-auth-handlers');
        if (handlersData) {
          const handlers = JSON.parse(handlersData);
          if (handlers.handleLogout) {
            handlers.handleLogout();
          }
        }
      } catch (error) {
        console.error('Failed to parse auth handlers:', error);
      }
    }
  };

  const handleDeleteAccount = () => {
    // This will be handled by SmartAuthGuard
    const handlersElement = document.querySelector('[data-auth-handlers]');
    if (handlersElement) {
      try {
        const handlersData = handlersElement.getAttribute('data-auth-handlers');
        if (handlersData) {
          const handlers = JSON.parse(handlersData);
          if (handlers.handleDeleteAccount) {
            handlers.handleDeleteAccount();
          }
        }
      } catch (error) {
        console.error('Failed to parse auth handlers:', error);
      }
    }
  };

  const handleViewChange = (
    view:
      | 'chat'
      | 'analytics'
      | 'subscription'
      | 'privacy'
      | 'settings'
      | 'ai-assistant'
      | 'ai-model-switcher'
      | 'collaboration'
      | 'custom-training'
      | 'templates'
      | 'advanced-analytics'
  ) => {
    // Check if view requires authentication
    const authRequiredViews = [
      'subscription', 
      'privacy', 
      'settings', 
      'ai-assistant', 
      'ai-model-switcher',
      'collaboration',
      'custom-training',
      'templates',
      'advanced-analytics'
    ];
    
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
      
      // Update localStorage
      localStorage.setItem('tezu-ai-session', JSON.stringify(updatedUser));
    }
  };

  // Convert UserSession to UserProfile format for AdvancedUserSettings
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

  return (
    <SubscriptionProvider>
      <SidebarProvider>
        <SmartAuthGuard 
          requireAuth={requireAuth}
          onAuthStateChange={handleAuthStateChange}
        >
          <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            <div className="flex flex-1">
              {(['chat', 'analytics', 'ai-model-switcher', 'collaboration', 'custom-training', 'templates', 'advanced-analytics'].includes(currentView)) && (
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
              )}
              <main className="flex-1 flex flex-col">
                {currentView === 'subscription' ? (
                  <SubscriptionPage onBack={() => setCurrentView('chat')} />
                ) : currentView === 'privacy' ? (
                  <PrivacySecurityHub />
                ) : currentView === 'settings' ? (
                  <div className="p-6">
                    <AdvancedUserSettings
                      user={currentUser ? convertUserSessionToProfile(currentUser) : null}
                      onLogout={handleLogout}
                      onDeleteAccount={handleDeleteAccount}
                      onUpdateProfile={handleUpdateProfile}
                    />
                  </div>
                ) : currentView === 'ai-assistant' ? (
                  <div className="p-6">
                    <ProfessionalAIAssistant />
                  </div>
                ) : currentView === 'analytics' ? (
                  <AnalyticsDashboard conversations={conversations} />
                ) : currentView === 'ai-model-switcher' ? (
                  <div className="p-6">
                    <AIModelSwitcher />
                  </div>
                ) : currentView === 'collaboration' ? (
                  <div className="p-6">
                    <RealTimeCollaboration />
                  </div>
                ) : currentView === 'custom-training' ? (
                  <div className="p-6">
                    <CustomAITraining />
                  </div>
                ) : currentView === 'templates' ? (
                  <div className="p-6">
                    <ProfessionalTemplates />
                  </div>
                ) : currentView === 'advanced-analytics' ? (
                  <div className="p-6">
                    <AdvancedAnalytics />
                  </div>
                ) : selectedConversation && currentConversation ? (
                  <ChatInterface
                    conversation={currentConversation}
                    onUpdateConversation={handleUpdateConversation}
                    allConversations={conversations}
                  />
                ) : (
                  <WelcomeScreen onStartChat={handleNewConversation} />
                )}
              </main>
            </div>
            <Footer />
          </div>
        </SmartAuthGuard>
      </SidebarProvider>
    </SubscriptionProvider>
  );
};

export default Index;
