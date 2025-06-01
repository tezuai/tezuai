
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  MessageSquarePlus,
  Settings,
  User,
  History,
  Trash2,
  Search,
  Bot,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  conversations: any[];
  selectedConversation: string | null;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
}

export function Sidebar({
  conversations,
  selectedConversation,
  onNewConversation,
  onSelectConversation,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarPrimitive className="w-80 border-r border-gray-700/50 bg-gray-900/95 backdrop-blur-xl">
      <SidebarHeader className="p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">AI Agent Pro</h1>
            <p className="text-xs text-gray-400">Advanced AI Assistant</p>
          </div>
        </div>
        
        <Button
          onClick={onNewConversation}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
        >
          <MessageSquarePlus className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <History className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Recent Chats</span>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {filteredConversations.map((conversation) => (
              <Button
                key={conversation.id}
                variant={selectedConversation === conversation.id ? "secondary" : "ghost"}
                className={`w-full justify-start text-left p-3 h-auto hover:bg-gray-700/50 transition-all duration-200 ${
                  selectedConversation === conversation.id
                    ? "bg-gray-700/70 border-l-2 border-blue-500"
                    : ""
                }`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {conversation.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(conversation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Button>
            ))}
            {filteredConversations.length === 0 && (
              <div className="text-center py-8">
                <Bot className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No conversations found</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-700/50">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700/50">
            <User className="w-4 h-4 mr-3" />
            Profile Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700/50">
            <Settings className="w-4 h-4 mr-3" />
            Preferences
          </Button>
        </div>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}
