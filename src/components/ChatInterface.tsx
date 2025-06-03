import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Send,
  Paperclip,
  Mic,
  Square,
  Settings,
  Bot,
  Search,
  Download,
  Zap,
  Users,
  Video,
  Brain,
  Palette,
  Languages,
  BarChart3,
  Sparkles,
  User,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MessageBubble } from "@/components/MessageBubble";
import { TypingIndicator } from "@/components/TypingIndicator";
import { SearchDialog } from "@/components/SearchDialog";
import { ExportDialog } from "@/components/ExportDialog";
import { QuickActions } from "@/components/QuickActions";
import { FileUpload } from "@/components/FileUpload";
import { VoiceInterface } from "@/components/VoiceInterface";
import { CollaborationHub } from "@/components/CollaborationHub";
import { AIModelSwitcher } from "@/components/AIModelSwitcher";
import { AIPersonalityHub } from "@/components/AIPersonalityHub";
import { SmartContextMemory } from "@/components/SmartContextMemory";
import { AdvancedAnalytics } from "@/components/AdvancedAnalytics";
import { LanguageTranslator } from "@/components/LanguageTranslator";
import { SmartTemplates } from "@/components/SmartTemplates";
import { AuthenticationHub } from "@/components/AuthenticationHub";
import { AdvancedVoiceInterface } from "@/components/AdvancedVoiceInterface";
import { AdvancedFileProcessor } from "@/components/AdvancedFileProcessor";
import { UserProfileManager } from "@/components/UserProfileManager";
import { CodeCompiler } from "@/components/CodeCompiler";
import { DocumentGenerator } from "@/components/DocumentGenerator";
import { ImageGenerator } from "@/components/ImageGenerator";
import { ProfessionalTemplates } from "@/components/ProfessionalTemplates";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  model?: string;
  attachments?: File[];
}

interface ChatInterfaceProps {
  conversation: any;
  onUpdateConversation: (conversation: any) => void;
  allConversations: any[];
}

export function ChatInterface({ conversation, onUpdateConversation, allConversations }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showAdvancedPanel, setShowAdvancedPanel] = useState(false);
  const [activeAdvancedTab, setActiveAdvancedTab] = useState("personality");
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [currentPersonality, setCurrentPersonality] = useState("tezu-friendly");
  const [currentLanguage, setCurrentLanguage] = useState("hi");
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(false);
  const [showAdvancedVoice, setShowAdvancedVoice] = useState(false);
  const [showFileProcessor, setShowFileProcessor] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    model: "gpt-4-turbo",
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: "You are Tezu, a friendly AI assistant from India. Always respond in a helpful, warm manner mixing Hindi and English naturally. Be encouraging and positive.",
    persona: "tezu-friendly",
    enableVoice: true,
    enableCollaboration: false,
    theme: "dark",
    fontSize: 14,
    autoSave: true,
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation.messages]);

  // Enhanced AI response system with personality
  const generateTezuResponse = (userMessage: string, personality: string): string => {
    const responses = {
      "tezu-friendly": [
        `Namaste! Main Tezu hun 😊 Aapka sawal bahut interesting hai. ${userMessage.includes('help') ? 'Main aapki poori help karunga!' : 'Iske baare mein baat karte hain...'} Kya aur detail mein jana chahte hain?`,
        `Hello friend! Tezu yahan present! 🙋‍♂️ Aapne jo poocha hai, uska answer bahut simple hai. Main step by step explain karta hun. Ready hain aap?`,
        `Haan ji! Main Tezu, aapka AI dost. ${userMessage} - ye topic mujhe bhi pasand hai! Aao together explore karte hain. Koi specific point janna hai?`
      ],
      "tezu-teacher": [
        `Namaste student! Main Tezu hun, aapka teacher. 📚 Aapne jo topic mention kiya hai, usse samjhane mein mujhe khushi hogi. Pehle basics se start karte hain...`,
        `Excellent question! Main Tezu, aapka educational assistant. ${userMessage} ke baare mein comprehensive explanation deta hun. Are you ready to learn?`,
        `Hello dear learner! Tezu teacher mode mein hai. Jo aapne poocha hai, uska detailed answer with examples dunga. Notebook ready hai?`
      ],
      "tezu-creative": [
        `Wow! Creative mind detected! 🎨 Main Tezu hun, aapka creative partner. ${userMessage} mein bahut potential hai. Kya hum ise aur innovative banayein?`,
        `Artistic soul! Main Tezu, creativity ka supporter. Aapka idea sun kar mera creative brain activate ho gaya! Let's brainstorm together. Ready for magic?`,
        `Beautiful thinking! Tezu creative mode mein. ${userMessage} - isme se amazing content ban sakta hai. Shall we explore the possibilities?`
      ],
      "tezu-business": [
        `Good day! Main Tezu hun, aapka business consultant. 💼 ${userMessage} - ye business perspective se interesting point hai. Market analysis karte hain...`,
        `Professional greetings! Tezu business mode mein. Aapka query business growth ke liye valuable hai. Strategic approach se discuss karte hain.`,
        `Hello entrepreneur! Main Tezu, business ki duniya se. ${userMessage} mein business opportunity dikh rahi hai. Detailed strategy banate hain?`
      ],
      "tezu-coder": [
        `Hey developer! 👨‍💻 Main Tezu hun, coding ka enthusiast. ${userMessage} - iska technical solution mere paas hai. Code example chahiye?`,
        `Technical greeting! Tezu programmer mode mein. Aapka coding problem solve karna mere liye easy hai. Step by step approach lete hain...`,
        `Hello coder! Main Tezu, debugging expert. ${userMessage} ke liye clean aur efficient solution provide karunga. Ready to code?`
      ]
    };

    const personalityResponses = responses[personality as keyof typeof responses] || responses["tezu-friendly"];
    const randomResponse = personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
    
    return randomResponse;
  };

  const handleSendMessage = async () => {
    if ((!input.trim() && attachedFiles.length === 0) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim() || "📎 File attachment",
      timestamp: new Date(),
      attachments: attachedFiles.length > 0 ? [...attachedFiles] : undefined,
    };

    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, userMessage],
      title: conversation.messages.length === 0 ? input.slice(0, 50) + "..." : conversation.title,
    };

    onUpdateConversation(updatedConversation);
    setInput("");
    setAttachedFiles([]);
    setShowFileUpload(false);
    setIsLoading(true);

    // Enhanced AI response with personality
    setTimeout(() => {
      const tezuResponse = generateTezuResponse(userMessage.content, currentPersonality);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: tezuResponse,
        timestamp: new Date(),
        model: "Tezu AI",
      };

      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiMessage],
      };

      onUpdateConversation(finalConversation);
      setIsLoading(false);

      // Show success toast
      toast({
        title: "Tezu responded! 🎉",
        description: "Your AI assistant is ready for the next question.",
      });
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Recording stopped" : "Recording started",
      description: isRecording ? "Processing voice input..." : "Speak now...",
    });
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Message content has been copied.",
    });
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt + " ");
    setShowQuickActions(false);
  };

  const handleVoiceTranscription = (text: string) => {
    setInput(prev => prev + text);
    toast({
      title: "Voice transcribed",
      description: "Speech has been converted to text.",
    });
  };

  const handlePersonalityChange = (personality: any) => {
    setCurrentPersonality(personality.id);
    setSettings(prev => ({ 
      ...prev, 
      persona: personality.id,
      systemPrompt: personality.systemPrompt 
    }));
    toast({
      title: "Personality updated! 🤖",
      description: `Tezu is now in ${personality.name} mode`,
    });
  };

  const handleTemplateSelect = (template: any) => {
    setInput(template.prompt);
    if (template.systemPrompt) {
      setSettings(prev => ({ ...prev, systemPrompt: template.systemPrompt }));
    }
    toast({
      title: "Template applied! 📝",
      description: `Applied: ${template.title}`,
    });
  };

  const handleModelChange = (modelId: string, config: any) => {
    setSettings(prev => ({ ...prev, model: modelId, ...config }));
    toast({
      title: "Model updated",
      description: `Now using ${modelId}`,
    });
  };

  const handleJoinCollaboration = (sessionId: string) => {
    toast({
      title: "Joining collaboration",
      description: `Connecting to session: ${sessionId}`,
    });
  };

  const handleCreateCollaboration = (session: any) => {
    toast({
      title: "Collaboration created",
      description: `Created session: ${session.name}`,
    });
  };

  const handleMemoryUpdate = (memories: any[]) => {
    console.log("Memory updated:", memories);
  };

  const handleLogin = (user: any) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    toast({
      title: "Welcome to Tezu AI! 🎉",
      description: "All premium features are now unlocked!",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast({
      title: "Logged out",
      description: "Come back soon!",
    });
  };

  const handleSignup = (userData: any) => {
    console.log("New user signed up:", userData);
  };

  const handleVoiceInput = (text: string, confidence: number) => {
    setInput(prev => prev + text + " ");
  };

  const handleVoiceSettingsChange = (settings: any) => {
    console.log("Voice settings updated:", settings);
  };

  const handleFileAnalyzed = (file: any) => {
    console.log("File analyzed:", file);
    toast({
      title: "File analyzed! 📄",
      description: `${file.name} has been processed successfully.`,
    });
  };

  const handleProfileUpdate = (updates: any) => {
    setCurrentUser((prev: any) => ({ ...prev, ...updates }));
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-900/95 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/api/placeholder/32/32" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-white">🤖 {conversation.title}</h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                Tezu AI
              </Badge>
              <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                {currentLanguage.toUpperCase()}
              </Badge>
              {isAuthenticated && (
                <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-400">
                  ✓ Premium
                </Badge>
              )}
              <span className="text-xs text-gray-400">
                {conversation.messages.length} messages
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SearchDialog 
            conversations={allConversations} 
            onSelectConversation={() => {}}
          />
          <ExportDialog 
            conversations={allConversations}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="text-gray-400 hover:text-white"
          >
            <Zap className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvancedPanel(!showAdvancedPanel)}
            className={`text-gray-400 hover:text-white ${showAdvancedPanel ? 'bg-gray-700' : ''}`}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      {showQuickActions && (
        <div className="border-b border-gray-700/50 bg-gray-900/95">
          <QuickActions onActionSelect={handleQuickAction} />
        </div>
      )}

      {/* File Upload */}
      {showFileUpload && (
        <div className="border-b border-gray-700/50 bg-gray-900/95 p-4">
          <FileUpload onFileSelect={setAttachedFiles} />
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
            <div className="space-y-4 max-w-4xl mx-auto">
              {conversation.messages.map((message: Message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onCopy={handleCopyMessage}
                />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={scrollAreaRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-gray-700/50 bg-gray-900/95 backdrop-blur-xl">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Tezu anything... (Hindi/English)"
                    className="pr-12 py-3 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 resize-none"
                    disabled={isLoading}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowFileUpload(!showFileUpload)}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                      attachedFiles.length > 0 ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Paperclip className="w-4 h-4" />
                    {attachedFiles.length > 0 && (
                      <span className="ml-1 text-xs">{attachedFiles.length}</span>
                    )}
                  </Button>
                </div>
                <Button
                  onClick={handleVoiceToggle}
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  className={`${
                    isRecording
                      ? "bg-red-600 hover:bg-red-700"
                      : "border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={(!input.trim() && attachedFiles.length === 0) || isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>{input.length}/4000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Panel */}
        {showAdvancedPanel && (
          <div className="w-96 border-l border-gray-700/50 bg-gray-900/95 backdrop-blur-xl overflow-hidden">
            <Tabs value={activeAdvancedTab} onValueChange={setActiveAdvancedTab} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-5 bg-gray-800 mx-4 mt-4">
                <TabsTrigger value="auth" className="text-xs p-2">
                  <User className="w-3 h-3" />
                </TabsTrigger>
                <TabsTrigger value="personality" className="text-xs p-2">
                  <Sparkles className="w-3 h-3" />
                </TabsTrigger>
                <TabsTrigger value="tools" className="text-xs p-2">
                  <Zap className="w-3 h-3" />
                </TabsTrigger>
                <TabsTrigger value="files" className="text-xs p-2">
                  <FileText className="w-3 h-3" />
                </TabsTrigger>
                <TabsTrigger value="profile" className="text-xs p-2">
                  <Settings className="w-3 h-3" />
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="auth" className="h-full mt-0 p-4">
                  <AuthenticationHub
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                    onSignup={handleSignup}
                  />
                </TabsContent>

                <TabsContent value="personality" className="h-full mt-0 p-4">
                  <AIPersonalityHub
                    currentPersonality={currentPersonality}
                    onPersonalityChange={handlePersonalityChange}
                  />
                </TabsContent>

                <TabsContent value="tools" className="h-full mt-0 p-4">
                  <Tabs defaultValue="compiler" className="h-full">
                    <TabsList className="grid w-full grid-cols-4 bg-gray-800 mb-4">
                      <TabsTrigger value="compiler" className="text-xs">Code</TabsTrigger>
                      <TabsTrigger value="docs" className="text-xs">Docs</TabsTrigger>
                      <TabsTrigger value="images" className="text-xs">Images</TabsTrigger>
                      <TabsTrigger value="templates" className="text-xs">Templates</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="compiler" className="h-full">
                      <CodeCompiler isEnabled={isAuthenticated} />
                    </TabsContent>
                    
                    <TabsContent value="docs" className="h-full">
                      <DocumentGenerator isEnabled={isAuthenticated} />
                    </TabsContent>
                    
                    <TabsContent value="images" className="h-full">
                      <ImageGenerator isEnabled={isAuthenticated} />
                    </TabsContent>
                    
                    <TabsContent value="templates" className="h-full">
                      <ProfessionalTemplates onTemplateSelect={handleTemplateSelect} />
                    </TabsContent>
                  </Tabs>
                </TabsContent>

                <TabsContent value="files" className="h-full mt-0 p-4">
                  <AdvancedFileProcessor onFileAnalyzed={handleFileAnalyzed} />
                </TabsContent>

                <TabsContent value="profile" className="h-full mt-0 p-4">
                  {isAuthenticated && currentUser ? (
                    <UserProfileManager
                      user={currentUser}
                      onProfileUpdate={handleProfileUpdate}
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Please login to access profile settings</p>
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
