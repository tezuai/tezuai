import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Bot,
  MessageSquare,
  Settings,
  BarChart3,
  Archive,
  Star,
  Filter,
  PlusCircle,
  Search,
  LogOut,
  User,
  Lock,
  CreditCard,
  HelpCircle,
  Brain,
  Users,
  Layers,
  FileText,
  Cpu,
  Shield,
  TrendingUp,
  Heart,
  Globe,
  Zap
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { ViewName } from "@/types/views";

interface SidebarProps {
  conversations?: any[];
  selectedConversation?: string | null;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onUpdateConversation: (updatedConversation: any) => void;
  onDeleteConversation: (id: string) => void;
  onArchiveConversation: (id: string) => void;
  onDuplicateConversation: (conversation: any) => void;
  currentView?: ViewName;
  onViewChange: (view: ViewName) => void;
  onLogout: () => void;
  isAuthenticated?: boolean;
  currentUser?: any;
}

interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  isStarred: boolean;
  isArchived: boolean;
}

export function Sidebar({
  conversations = [],
  selectedConversation = null,
  onNewConversation,
  onSelectConversation,
  onUpdateConversation,
  onDeleteConversation,
  onArchiveConversation,
  onDuplicateConversation,
  currentView = "chat",
  onViewChange,
  onLogout,
  isAuthenticated = false,
  currentUser = null,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const { toast } = useToast();
  const { open, setOpen } = useSidebar();

  const handleSelect = (id: string) => {
    onSelectConversation(id);
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  const handleNewChat = async () => {
    setIsCreatingChat(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onNewConversation();
    setIsCreatingChat(false);
  };

  const handleDuplicate = (conversation: Conversation) => {
    onDuplicateConversation(conversation);
    toast({
      title: "Conversation duplicated",
      description: "A copy of the conversation has been created.",
    });
  };

  const handleArchive = (id: string) => {
    onArchiveConversation(id);
    toast({
      title: "Conversation archived",
      description: "The conversation has been moved to the archive.",
    });
  };

  const handleDelete = (id: string) => {
    onDeleteConversation(id);
    toast({
      title: "Conversation deleted",
      description: "The conversation has been permanently deleted.",
    });
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new professional features to the navigation items
  const navigationItems = [
    {
      title: "Smart Dashboard",
      icon: BarChart3,
      view: "smart-dashboard" as const,
      badge: "New"
    },
    {
      title: "Chat",
      icon: MessageSquare,
      view: "chat" as const,
      badge: null
    },
    {
      title: "Quantum AI",
      icon: Zap,
      view: "quantum-ai" as const,
      badge: "Pro"
    },
    {
      title: "AI Research Lab",
      icon: Brain,
      view: "ai-research-lab" as const,
      badge: "Beta"
    },
    {
      title: "Legal Compliance",
      icon: Shield,
      view: "compliance-center" as const,
      badge: "Enterprise"
    },
    {
      title: "Analytics",
      icon: TrendingUp,
      view: "analytics" as const,
      badge: null
    },
    {
      title: "Templates",
      icon: FileText,
      view: "templates" as const,
      badge: "Pro"
    },
    {
      title: "Advanced Analytics",
      icon: Layers,
      view: "advanced-analytics" as const,
      badge: "Pro"
    },
    {
      title: "News Engine",
      icon: FileText,
      view: "news-engine" as const,
      badge: "New"
    },
    {
      title: "Productivity Suite",
      icon: BarChart3,
      view: "productivity-suite" as const,
      badge: "Pro"
    },
    {
      title: "Security Center",
      icon: Lock,
      view: "security-center" as const,
      badge: "Pro"
    },
    {
      title: "Theme Gallery",
      icon: Layers,
      view: "theme-gallery" as const,
      badge: "New"
    },
    {
      title: "AI Marketplace",
      icon: Brain,
      view: "ai-marketplace" as const,
      badge: "Pro"
    },
    {
      title: "Workflow Automation",
      icon: Bot,
      view: "workflow-automation" as const,
      badge: "Pro"
    },
    {
      title: "Business Intelligence",
      icon: BarChart3,
      view: "business-intelligence" as const,
      badge: "Enterprise"
    },
    {
      title: "Multimodal AI",
      icon: Brain,
      view: "multimodal-ai" as const,
      badge: "Ultra Pro"
    },
    {
      title: "Realtime Knowledge",
      icon: FileText,
      view: "realtime-knowledge" as const,
      badge: "Live"
    },
    {
      title: "Agentic AI",
      icon: Cpu,
      view: "agentic-ai" as const,
      badge: "Auto"
    },
    {
      title: "Creative Studio",
      icon: Layers,
      view: "creative-studio" as const,
      badge: "Pro"
    },
    {
      title: "Smart Learning",
      icon: Brain,
      view: "smart-learning" as const,
      badge: "AI+"
    },
    {
      title: "Advanced Security",
      icon: Shield,
      view: "advanced-security" as const,
      badge: "Ultra Safe"
    },
    {
      title: "Predictive Intelligence",
      icon: TrendingUp,
      view: "predictive-intelligence" as const,
      badge: "Future AI"
    },
    {
      title: "Emotional AI",
      icon: Heart,
      view: "emotional-ai" as const,
      badge: "Empathy+"
    },
    {
      title: "Polyglot AI",
      icon: Globe,
      view: "polyglot-ai" as const,
      badge: "12+ Languages"
    },
    {
      title: "Cultural AI",
      icon: Users,
      view: "cultural-ai" as const,
      badge: "Global Aware"
    },
    {
      title: "AI Assistant",
      icon: Bot,
      view: "ai-assistant" as const,
      badge: null
    },
    {
      title: "Settings",
      icon: Settings,
      view: "settings" as const,
      badge: null
    },
    {
      title: "Privacy & Security",
      icon: Lock,
      view: "privacy" as const,
      badge: null
    },
    {
      title: "Subscription",
      icon: CreditCard,
      view: "subscription" as const,
      badge: null
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-900 via-gray-800/95 to-gray-900/95 border-r border-gray-700/50 w-72">
      {/* Top Section: User Info, New Chat Button, Search */}
      <div className="px-4 py-3 border-b border-gray-700/50">
        {/* User Info */}
        {isAuthenticated && currentUser ? (
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {currentUser.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium text-white">{currentUser.name}</div>
              <div className="text-xs text-gray-400">{currentUser.email}</div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-4">
            Not logged in.
          </div>
        )}

        {/* New Chat Button */}
        <div className="mb-6">
          <Button
            onClick={onNewConversation}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            disabled={isCreatingChat}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {isCreatingChat ? "Creating..." : "New Chat"}
          </Button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            type="search"
            placeholder="Search chats..."
            className="bg-gray-800/50 border-gray-600 text-white pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-4 py-2">
          {/* Navigation Menu with New Professional Features */}
          <div className="space-y-1 mb-6">
            <h3 className="text-xs text-gray-400 font-semibold px-2 mb-2">NAVIGATION</h3>
            {navigationItems.map((item) => (
              <Button
                key={item.view}
                variant="ghost"
                className={`w-full justify-start ${
                  currentView === item.view
                    ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-l-2 border-purple-500 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => onViewChange(item.view)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
                {item.badge && (
                  <Badge className="ml-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Chat Filters */}
          <div className="space-y-2 mb-4">
            <h3 className="text-xs text-gray-400 font-semibold px-2 mb-2">FILTERS</h3>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
              <Star className="mr-2 h-4 w-4" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
              <Archive className="mr-2 h-4 w-4" />
              Archived
            </Button>
          </div>

          {/* Chat List */}
          <div className="space-y-2">
            <h3 className="text-xs text-gray-400 font-semibold px-2 mb-2">CHATS</h3>
            {filteredConversations.map((conversation) => (
              <DropdownMenu key={conversation.id}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-gray-300 hover:text-white rounded-md truncate ${
                      selectedConversation === conversation.id
                        ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white"
                        : ""
                    }`}
                    onClick={() => handleSelect(conversation.id)}
                  >
                    {conversation.title}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border border-gray-700/50">
                  <DropdownMenuItem onClick={() => onUpdateConversation({ ...conversation, isStarred: !conversation.isStarred })}>
                    <Star className="mr-2 h-4 w-4" />
                    {conversation.isStarred ? "Unstar" : "Star"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDuplicate(conversation)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleArchive(conversation.id)}>
                    <Archive className="mr-2 h-4 w-4" />
                    {conversation.isArchived ? "Unarchive" : "Archive"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(conversation.id)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Bottom Section: Settings, Logout */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <ThemeToggle />
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            <HelpCircle className="mr-2 h-4 w-4" />
            Support
          </Button>
        </div>
        {isAuthenticated ? (
          <Button onClick={onLogout} variant="outline" className="w-full border-gray-600 text-gray-300 hover:text-white">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        ) : (
          <Button onClick={() => onViewChange("settings")} variant="outline" className="w-full border-gray-600 text-gray-300 hover:text-white">
            <User className="mr-2 h-4 w-4" />
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
