
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { SubscriptionPage } from "@/pages/Subscription";
import { LandingPage } from "@/components/LandingPage";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<'chat' | 'analytics' | 'subscription'>('chat');
  const [showLanding, setShowLanding] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if user is returning (has localStorage data)
  useEffect(() => {
    const hasUsedBefore = localStorage.getItem('tezu-ai-assistant-used');
    if (hasUsedBefore) {
      setShowLanding(false);
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
      title: "नया Conversation - Tezu AI",
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
        <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          {currentView !== 'subscription' && (
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
              onViewChange={setCurrentView}
            />
          )}
          <main className="flex-1 flex flex-col">
            {currentView === 'subscription' ? (
              <SubscriptionPage onBack={() => setCurrentView('chat')} />
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
      </SidebarProvider>
    </SubscriptionProvider>
  );
};

export default Index;
