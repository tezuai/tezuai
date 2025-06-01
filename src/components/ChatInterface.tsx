import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MessageBubble } from "@/components/MessageBubble";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ChatSettings } from "@/components/ChatSettings";
import { SearchDialog } from "@/components/SearchDialog";
import { ExportDialog } from "@/components/ExportDialog";
import { QuickActions } from "@/components/QuickActions";
import { FileUpload } from "@/components/FileUpload";

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
  const [showSettings, setShowSettings] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: "You are a helpful AI assistant.",
    persona: "assistant",
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation.messages]);

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

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `This is a simulated AI response to: "${userMessage.content}". ${attachedFiles.length > 0 ? `I can see you've attached ${attachedFiles.length} file(s). ` : ''}In a real implementation, this would connect to an actual AI service like OpenAI, Anthropic, or other AI providers. The response would be generated based on the selected model and settings.`,
        timestamp: new Date(),
        model: settings.model,
      };

      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiMessage],
      };

      onUpdateConversation(finalConversation);
      setIsLoading(false);
    }, 2000);
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

  const handleSelectConversation = (id: string) => {
    // This would be handled by parent component
    console.log("Select conversation:", id);
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
            <h2 className="text-lg font-semibold text-white">{conversation.title}</h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                {settings.model}
              </Badge>
              <span className="text-xs text-gray-400">
                {conversation.messages.length} messages
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SearchDialog 
            conversations={allConversations} 
            onSelectConversation={handleSelectConversation}
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
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-400 hover:text-white"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <ChatSettings
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

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
                placeholder="Type your message here..."
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
  );
}
