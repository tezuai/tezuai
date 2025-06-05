
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { SubscriptionPage } from "@/pages/Subscription";
import { LandingPage } from "@/components/LandingPage";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { PrivacySecurityHub } from "@/components/PrivacySecurityHub";
import { EnhancedAuthSystem } from "@/components/EnhancedAuthSystem";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<'chat' | 'analytics' | 'subscription' | 'privacy' | 'auth'>('chat');
  const [showLanding, setShowLanding] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is returning (has localStorage data)
  useEffect(() => {
    const hasUsedBefore = localStorage.getItem('tezu-ai-assistant-used');
    const isLoggedIn = localStorage.getItem('tezu-ai-authenticated') === 'true';
    if (hasUsedBefore) {
      setShowLanding(false);
    }
    if (isLoggedIn) {
      setIsAuthenticated(true);
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

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('tezu-ai-authenticated', 'true');
    setCurrentView('chat');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('tezu-ai-authenticated');
    setCurrentView('auth');
  };

  const handleViewChange = (view: 'chat' | 'analytics' | 'subscription' | 'privacy' | 'auth') => {
    setCurrentView(view);
  };

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  // Show auth system if not authenticated
  if (!isAuthenticated && !showLanding && !showOnboarding) {
    return <EnhancedAuthSystem onLogin={handleLogin} />;
  }

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
        <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="flex flex-1">
            {(currentView !== 'subscription' && currentView !== 'privacy' && currentView !== 'auth') && (
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
              />
            )}
            <main className="flex-1 flex flex-col">
              {currentView === 'subscription' ? (
                <SubscriptionPage onBack={() => setCurrentView('chat')} />
              ) : currentView === 'privacy' ? (
                <PrivacySecurityHub />
              ) : currentView === 'auth' ? (
                <EnhancedAuthSystem onLogin={handleLogin} />
              ) : currentView === 'analytics' ? (
                <AnalyticsDashboard conversations={conversations} />
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
      </SidebarProvider>
    </SubscriptionProvider>
  );
};

export default Index;
