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
  Bot,
  Brain,
  FileText,
  Code,
  Image as ImageIcon,
  Calendar,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MessageBubble } from "@/components/MessageBubble";
import { TypingIndicator } from "@/components/TypingIndicator";
import { streamZentaraChat, type ChatMessage } from "@/lib/zentara-ai";

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
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation.messages]);

  const handleSendMessage = async () => {
    if ((!input.trim() && attachedFiles.length === 0) || isLoading) {
      return;
    }

    const userContent = input.trim() || "📎 File attachment";
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userContent,
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
    setIsLoading(true);

    // Build message history for AI
    const chatHistory: ChatMessage[] = updatedConversation.messages.map((msg: Message) => ({
      role: msg.role,
      content: msg.content,
    }));

    let assistantContent = "";

    // Create placeholder assistant message
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      model: "Zentara AI",
    };

    const conversationWithAssistant = {
      ...updatedConversation,
      messages: [...updatedConversation.messages, assistantMessage],
    };
    onUpdateConversation(conversationWithAssistant);

    try {
      await streamZentaraChat({
        messages: chatHistory,
        onDelta: (delta) => {
          assistantContent += delta;
          const updatedMessages = conversationWithAssistant.messages.map((msg: Message) =>
            msg.id === assistantMessage.id
              ? { ...msg, content: assistantContent }
              : msg
          );
          onUpdateConversation({ ...conversationWithAssistant, messages: updatedMessages });
        },
        onDone: () => {
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Zentara AI error:", error);
          const errorContent = `😓 कुछ गड़बड़ हो गई: ${error.message}. कृपया फिर से कोशिश करें!`;
          const updatedMessages = conversationWithAssistant.messages.map((msg: Message) =>
            msg.id === assistantMessage.id
              ? { ...msg, content: errorContent }
              : msg
          );
          onUpdateConversation({ ...conversationWithAssistant, messages: updatedMessages });
          setIsLoading(false);
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    } catch (err) {
      console.error("Chat error:", err);
      setIsLoading(false);
      toast({
        title: "❌ Error",
        description: "कुछ गलत हो गया! कृपया फिर से कोशिश करें।",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
    setTimeout(() => handleSendMessage(), 100);
  };

  const quickActions = [
    { icon: FileText, label: "Creative Story", prompt: "मुझे एक creative story लिखकर दो" },
    { icon: Brain, label: "Explain Topic", prompt: "कोई complex topic explain करो" },
    { icon: Code, label: "Help Code", prompt: "एक function code करने में help करो" },
    { icon: ImageIcon, label: "Describe Image", prompt: "एक beautiful scene describe करो" },
    { icon: Calendar, label: "Plan Schedule", prompt: "मेरे schedule की planning करो" },
    { icon: Sparkles, label: "Creative Ideas", prompt: "कुछ creative ideas दो" },
  ];

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gradient-to-r from-gray-900/95 via-emerald-900/30 to-gray-900/95 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 ring-2 ring-emerald-500/50">
            <AvatarImage src="/lovable-uploads/95fdd9ab-8aef-49dd-b3c6-d153ec4336ca.png" />
            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <Bot className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              ✨ Zentara AI
              <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                ज़ेंतारा
              </Badge>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                🔒 Secure & Private
              </Badge>
              <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-400">
                ⚡ Real AI Powered
              </Badge>
              <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                🧠 Gemini 2.5
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-gray-900/50 border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.prompt)}
                className="flex items-center gap-2 bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-emerald-900/30 hover:text-white hover:border-emerald-500/50 transition-all"
              >
                <action.icon className="w-4 h-4" />
                <span className="text-xs hidden sm:inline">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
          <div className="space-y-4 max-w-4xl mx-auto">
            {conversation.messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Welcome to Zentara AI ✨
                </h3>
                <p className="text-lg text-emerald-400 mb-2">ज़ेंतारा AI में आपका स्वागत है!</p>
                <p className="text-gray-400 mb-6">
                  India's most intelligent AI assistant - Hindi & English में बात करें
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-emerald-700/50">
                    <Brain className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium mb-1">Advanced Intelligence</h4>
                    <p className="text-xs text-gray-400">Powered by latest Gemini AI for accurate responses</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-emerald-700/50">
                    <FileText className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium mb-1">Multilingual Support</h4>
                    <p className="text-xs text-gray-400">Hindi, English, Hinglish - जैसे चाहो बोलो!</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-emerald-700/50">
                    <Mic className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium mb-1">Smart Conversations</h4>
                    <p className="text-xs text-gray-400">Natural, friendly chat experience</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-emerald-700/50">
                    <Code className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium mb-1">Expert Help</h4>
                    <p className="text-xs text-gray-400">Coding, writing, analysis & more</p>
                  </div>
                </div>

                <Button 
                  onClick={() => handleQuickAction("Namaste Zentara AI! मुझे आपके बारे में बताइए")}
                  className="mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Conversation
                </Button>
              </div>
            )}
            
            {conversation.messages.map((message: Message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onCopy={(content) => {
                  navigator.clipboard.writeText(content);
                  toast({
                    title: "Copied!",
                    description: "Message copied to clipboard.",
                  });
                }}
              />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={scrollAreaRef} />
          </div>
        </ScrollArea>

        {/* Input Section */}
        <div className="p-6 border-t border-gray-700/50 bg-gradient-to-r from-gray-900/98 via-emerald-900/10 to-gray-900/98 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto">
            {/* Attachment Preview */}
            {attachedFiles.length > 0 && (
              <div className="mb-4 p-3 bg-gray-800/50 rounded-xl border border-gray-600">
                <div className="text-sm text-gray-300 mb-2">Attached Files:</div>
                <div className="flex flex-wrap gap-2">
                  {attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-lg">
                      <Paperclip className="w-3 h-3" />
                      <span className="text-xs">{file.name}</span>
                      <button 
                        onClick={() => setAttachedFiles(files => files.filter((_, i) => i !== index))}
                        className="text-red-400 hover:text-red-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Input Container */}
            <div className="relative bg-gradient-to-r from-gray-800/50 via-gray-800/60 to-gray-800/50 rounded-2xl border border-gray-600/50 shadow-2xl hover:border-emerald-500/50 transition-all duration-300">
              <div className="flex items-end gap-3 p-4">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Zentara AI से कुछ भी पूछें... Hindi/English 💬✨"
                    className="input-premium text-lg py-4 pr-16 min-h-[56px] border-0 bg-transparent placeholder:text-gray-400 focus:ring-0 focus:outline-none text-white"
                    disabled={isLoading}
                  />
                  
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      input.length > 3500 ? 'bg-red-500/20 text-red-400' : 
                      input.length > 3000 ? 'bg-yellow-500/20 text-yellow-400' : 
                      'bg-gray-600/50 text-gray-400'
                    }`}>
                      {input.length > 0 && Math.round((input.length / 4000) * 100)}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsRecording(!isRecording)}
                    variant={isRecording ? "destructive" : "outline"}
                    size="lg"
                    className={`${
                      isRecording
                        ? "bg-red-600 hover:bg-red-700 border-red-500"
                        : "border-gray-600 text-gray-400 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-500"
                    } rounded-xl transition-all duration-300 h-14 w-14 p-0`}
                  >
                    {isRecording ? (
                      <Square className="w-6 h-6 animate-pulse" />
                    ) : (
                      <Mic className="w-6 h-6" />
                    )}
                  </Button>

                  <Button
                    onClick={handleSendMessage}
                    disabled={(!input.trim() && attachedFiles.length === 0) || isLoading}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 h-14 w-14 p-0 disabled:opacity-50"
                  >
                    <Send className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between mt-3 px-2 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Zentara AI Ready
                </span>
                <span>🔒 End-to-end Secure</span>
              </div>
              <span>{input.length}/4000 characters</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
