
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);

  const handleNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [],
      createdAt: new Date(),
    };
    setConversations(prev => [newConversation, ...prev]);
    setSelectedConversation(newConversation.id);
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
  };

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Sidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          onNewConversation={handleNewConversation}
          onSelectConversation={handleSelectConversation}
        />
        <main className="flex-1 flex flex-col">
          {selectedConversation && currentConversation ? (
            <ChatInterface
              conversation={currentConversation}
              onUpdateConversation={(updatedConversation) => {
                setConversations(prev => prev.map(c => 
                  c.id === updatedConversation.id ? updatedConversation : c
                ));
              }}
            />
          ) : (
            <WelcomeScreen onStartChat={handleNewConversation} />
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
