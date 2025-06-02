
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ConversationActions } from "./ConversationActions";
import { SearchDialog } from "./SearchDialog";
import { UsageTracker } from "./UsageTracker";
import { useSubscription } from "@/contexts/SubscriptionContext";
import {
  Plus,
  Search,
  MessageSquare,
  Star,
  Archive,
  BarChart3,
  Crown,
  Settings,
  User,
  CreditCard,
} from "lucide-react";

interface SidebarProps {
  conversations: any[];
  selectedConversation: string | null;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onUpdateConversation: (conversation: any) => void;
  onDeleteConversation: (id: string) => void;
  onArchiveConversation: (id: string) => void;
  onDuplicateConversation: (conversation: any) => void;
  currentView: 'chat' | 'analytics' | 'subscription';
  onViewChange: (view: 'chat' | 'analytics' | 'subscription') => void;
}

export function Sidebar({
  conversations,
  selectedConversation,
  onNewConversation,
  onSelectConversation,
  onUpdateConversation,
  onDeleteConversation,
  onArchiveConversation,
  onDuplicateConversation,
  currentView,
  onViewChange,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const { currentPlan, features } = useSubscription();

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArchiveFilter = showArchived ? conv.isArchived : !conv.isArchived;
    return matchesSearch && matchesArchiveFilter;
  });

  const handleUpgradeClick = () => {
    onViewChange('subscription');
  };

  return (
    <div className="w-80 bg-gray-900/50 border-r border-gray-700 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-6 h-6 text-blue-400" />
          <h1 className="text-lg font-semibold text-white">AI Chat</h1>
          {currentPlan !== 'free' && (
            <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
              {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
            </Badge>
          )}
        </div>
        
        <Button
          onClick={onNewConversation}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-600 text-white"
            onFocus={() => setShowSearchDialog(true)}
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-4 border-b border-gray-700">
        <div className="space-y-2">
          <Button
            variant={currentView === 'chat' ? 'default' : 'ghost'}
            onClick={() => onViewChange('chat')}
            className="w-full justify-start"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Conversations
          </Button>
          
          <Button
            variant={currentView === 'analytics' ? 'default' : 'ghost'}
            onClick={() => onViewChange('analytics')}
            className="w-full justify-start"
            disabled={!features.analytics}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
            {!features.analytics && (
              <Crown className="w-3 h-3 ml-auto text-yellow-400" />
            )}
          </Button>
          
          <Button
            variant={currentView === 'subscription' ? 'default' : 'ghost'}
            onClick={() => onViewChange('subscription')}
            className="w-full justify-start"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Subscription
            {currentPlan === 'free' && (
              <Badge variant="outline" className="ml-auto text-xs border-yellow-500 text-yellow-400">
                Free
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Usage Tracker */}
      {currentPlan === 'free' && (
        <div className="p-4 border-b border-gray-700">
          <UsageTracker onUpgrade={handleUpgradeClick} />
        </div>
      )}

      {/* Conversations List */}
      <div className="flex-1 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-300">
              {showArchived ? "Archived" : "Recent"}
            </h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowArchived(!showArchived)}
                className="text-gray-400 hover:text-white"
              >
                <Archive className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-full">
            <div className="space-y-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation === conversation.id
                      ? "bg-blue-600/20 border border-blue-500/30"
                      : "bg-gray-800/50 hover:bg-gray-700/50"
                  }`}
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-white truncate">
                          {conversation.title}
                        </h4>
                        {conversation.isStarred && (
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {conversation.messages.length} messages
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(conversation.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <ConversationActions
                      conversation={conversation}
                      onUpdate={onUpdateConversation}
                      onDelete={onDeleteConversation}
                      onArchive={onArchiveConversation}
                      onDuplicate={onDuplicateConversation}
                    />
                  </div>
                </div>
              ))}
              
              {filteredConversations.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm">
                    {searchQuery ? "No conversations found" : "No conversations yet"}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Upgrade Prompt for Free Users */}
      {currentPlan === 'free' && (
        <div className="p-4 border-t border-gray-700">
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-3 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-gray-300 mb-3">
              Unlock unlimited messages, all AI models, and premium features
            </p>
            <Button
              onClick={handleUpgradeClick}
              size="sm"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Upgrade Now - ₹999/month
            </Button>
          </div>
        </div>
      )}

      <SearchDialog
        open={showSearchDialog}
        onOpenChange={setShowSearchDialog}
        conversations={conversations}
        onSelectConversation={onSelectConversation}
      />
    </div>
  );
}
