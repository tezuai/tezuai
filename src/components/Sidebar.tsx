
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Plus,
  Star,
  Archive,
  Search,
  BarChart3,
  Settings,
  Brain,
  Filter,
} from "lucide-react";
import { ConversationActions } from "@/components/ConversationActions";

interface SidebarProps {
  conversations: any[];
  selectedConversation: string | null;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onUpdateConversation: (conversation: any) => void;
  onDeleteConversation: (id: string) => void;
  onArchiveConversation: (id: string) => void;
  onDuplicateConversation: (conversation: any) => void;
  currentView: 'chat' | 'analytics';
  onViewChange: (view: 'chat' | 'analytics') => void;
}

export function AppSidebar({
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
  const [filterType, setFilterType] = useState<'all' | 'starred' | 'archived'>('all');

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.messages.some((msg: any) => 
                           msg.content.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'starred' && conv.isStarred) ||
                         (filterType === 'archived' && conv.isArchived);
    
    return matchesSearch && matchesFilter;
  });

  const starredCount = conversations.filter(c => c.isStarred).length;
  const archivedCount = conversations.filter(c => c.isArchived).length;

  return (
    <Sidebar className="border-r border-gray-700/50 bg-gray-900/95 backdrop-blur-xl">
      <SidebarHeader className="border-b border-gray-700/50 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-bold text-white">AI Assistant</h1>
        </div>
        
        <Button
          onClick={onNewConversation}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 px-4 py-2">
            <div className="flex items-center justify-between w-full">
              <span>Navigation</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onViewChange('chat')}
                  isActive={currentView === 'chat'}
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Conversations</span>
                  <Badge variant="secondary" className="ml-auto bg-gray-700 text-gray-300">
                    {conversations.length}
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onViewChange('analytics')}
                  isActive={currentView === 'analytics'}
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {currentView === 'chat' && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-400 px-4 py-2">
              <div className="flex items-center justify-between w-full">
                <span>Conversations</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilterType(filterType === 'starred' ? 'all' : 'starred')}
                    className={`p-1 h-6 w-6 ${filterType === 'starred' ? 'text-yellow-400' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Star className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilterType(filterType === 'archived' ? 'all' : 'archived')}
                    className={`p-1 h-6 w-6 ${filterType === 'archived' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Archive className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </SidebarGroupLabel>
            
            <div className="px-4 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="pl-8 h-8 bg-gray-800/50 border-gray-600 text-white text-xs"
                />
              </div>
            </div>

            <SidebarGroupContent>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <SidebarMenu>
                  {filteredConversations.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500 text-sm">
                      {searchQuery ? 'No conversations found' : 'No conversations yet'}
                    </div>
                  ) : (
                    filteredConversations.map((conversation) => (
                      <SidebarMenuItem key={conversation.id}>
                        <div className="group relative">
                          <SidebarMenuButton
                            onClick={() => onSelectConversation(conversation.id)}
                            isActive={selectedConversation === conversation.id}
                            className="text-gray-300 hover:text-white hover:bg-gray-800/50 pr-8"
                          >
                            <MessageSquare className="w-4 h-4 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                {conversation.isStarred && (
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                                )}
                                <span className="truncate text-sm">
                                  {conversation.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500">
                                  {conversation.messages.length} messages
                                </span>
                                {conversation.isArchived && (
                                  <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                                    Archived
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </SidebarMenuButton>
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <ConversationActions
                              conversation={conversation}
                              onUpdate={onUpdateConversation}
                              onDelete={onDeleteConversation}
                              onArchive={onArchiveConversation}
                              onDuplicate={onDuplicateConversation}
                            />
                          </div>
                        </div>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              </ScrollArea>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-700/50 p-4">
        <div className="space-y-2">
          {starredCount > 0 && (
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                Starred
              </span>
              <span>{starredCount}</span>
            </div>
          )}
          {archivedCount > 0 && (
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Archive className="w-3 h-3" />
                Archived
              </span>
              <span>{archivedCount}</span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export { AppSidebar as Sidebar };
