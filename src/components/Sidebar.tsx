import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Plus,
  Search,
  MoreHorizontal,
  Star,
  Archive,
  Copy,
  Trash2,
  Edit3,
  BarChart3,
  Crown,
  Bot,
  Calendar,
  Zap,
  Shield,
  User,
  LogOut,
  Settings
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConversationActions } from "@/components/ConversationActions";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  conversations: any[];
  selectedConversation: string | null;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onUpdateConversation: (conversation: any) => void;
  onDeleteConversation: (id: string) => void;
  onArchiveConversation: (id: string) => void;
  onDuplicateConversation: (conversation: any) => void;
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
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
  onLogout,
  isAuthenticated
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const { toast } = useToast();

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.messages.some((msg: any) => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesArchive = showArchived ? conversation.isArchived : !conversation.isArchived;
    return matchesSearch && matchesArchive;
  });

  const handleEditTitle = (conversation: any, newTitle: string) => {
    onUpdateConversation({ ...conversation, title: newTitle });
    toast({
      title: "Title updated",
      description: "Conversation title has been changed.",
    });
  };

  const handleStarToggle = (conversation: any) => {
    onUpdateConversation({ ...conversation, isStarred: !conversation.isStarred });
    toast({
      title: conversation.isStarred ? "Removed from favorites" : "Added to favorites",
      description: conversation.isStarred ? "Conversation unmarked" : "Conversation starred",
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div className="w-64 bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/50 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/lovable-uploads/95fdd9ab-8aef-49dd-b3c6-d153ec4336ca.png" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-white">Tezu AI</h2>
            <p className="text-xs text-gray-400">World's #1 Secure AI</p>
          </div>
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                <DropdownMenuItem onClick={() => onViewChange('privacy')} className="text-gray-300 hover:text-white">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy & Security
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewChange('subscription')} className="text-gray-300 hover:text-white">
                  <Crown className="w-4 h-4 mr-2" />
                  Subscription
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem onClick={onLogout} className="text-red-400 hover:text-red-300">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <Button
          onClick={onNewConversation}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Navigation */}
      <div className="p-2 border-b border-gray-700/50">
        <div className="grid grid-cols-3 gap-1">
          <Button
            variant={currentView === 'chat' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('chat')}
            className={`text-xs ${currentView === 'chat' ? 'bg-blue-600' : 'text-gray-400 hover:text-white'}`}
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Chat
          </Button>
          <Button
            variant={currentView === 'analytics' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('analytics')}
            className={`text-xs ${currentView === 'analytics' ? 'bg-blue-600' : 'text-gray-400 hover:text-white'}`}
          >
            <BarChart3 className="w-3 h-3 mr-1" />
            Analytics
          </Button>
          <Button
            variant={currentView === 'subscription' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('subscription')}
            className={`text-xs ${currentView === 'subscription' ? 'bg-blue-600' : 'text-gray-400 hover:text-white'}`}
          >
            <Crown className="w-3 h-3 mr-1" />
            Pro
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1">
          {/* Archive Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowArchived(!showArchived)}
            className="w-full justify-start text-gray-400 hover:text-white"
          >
            <Archive className="w-4 h-4 mr-2" />
            {showArchived ? "Show Active" : "Show Archived"}
            <Badge variant="secondary" className="ml-auto text-xs">
              {showArchived ? conversations.filter(c => c.isArchived).length : conversations.filter(c => !c.isArchived).length}
            </Badge>
          </Button>

          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`group relative rounded-lg p-2 cursor-pointer transition-all duration-200 ${
                selectedConversation === conversation.id
                  ? "bg-blue-600/20 border border-blue-500/30"
                  : "hover:bg-gray-800/50"
              }`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    {conversation.isStarred && (
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    )}
                    {conversation.isArchived && (
                      <Archive className="w-3 h-3 text-gray-400" />
                    )}
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      {formatDate(conversation.createdAt)}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white truncate group-hover:text-blue-300">
                    {conversation.title}
                  </h3>
                  <p className="text-xs text-gray-400 truncate mt-1">
                    {conversation.messages.length > 0
                      ? conversation.messages[conversation.messages.length - 1].content
                      : "No messages yet"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                      {conversation.messages.length} msgs
                    </Badge>
                    <Zap className="w-3 h-3 text-blue-400" />
                  </div>
                </div>
                <ConversationActions
                  conversation={conversation}
                  onEdit={handleEditTitle}
                  onStar={handleStarToggle}
                  onArchive={onArchiveConversation}
                  onDuplicate={onDuplicateConversation}
                  onDelete={onDeleteConversation}
                />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer Stats */}
      <div className="p-3 border-t border-gray-700/50">
        <div className="text-center space-y-2">
          <div className="flex justify-center gap-4 text-xs text-gray-400">
            <span>🔒 100% Secure</span>
            <span>🇮🇳 Made in India</span>
          </div>
          <Badge className="bg-green-500/20 text-green-400 text-xs">
            <Shield className="w-3 h-3 mr-1" />
            GDPR Compliant
          </Badge>
        </div>
      </div>
    </div>
  );
}
