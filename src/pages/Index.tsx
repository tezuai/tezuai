import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { SubscriptionPage } from "@/pages/Subscription";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<'chat' | 'analytics' | 'subscription'>('chat');

  const handleNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [],
      createdAt: new Date(),
      isStarred: false,
      isArchived: false,
    };
    setConversations(prev => [newConversation, ...prev]);
    setSelectedConversation(newConversation.id);
    setCurrentView('chat');
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
    setConversations(prev => [conversation, ...prev]);
  };

  const currentConversation = conversations.find(c => c.id === selectedConversation);

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
