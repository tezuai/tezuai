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
  FileText,
  Shield,
  Store,
  Code,
  Image as ImageIcon,
  Calendar,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MessageBubble } from "@/components/MessageBubble";
import { TypingIndicator } from "@/components/TypingIndicator";

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

  // Enhanced AI response system with proper Hindi/English support
  const generateTezuResponse = (userMessage: string): string => {
    // DEBUG LOG
    console.log("Tezu AI received user message:", userMessage);
    if (!userMessage) {
      return "😓 अभी जवाब नहीं आया, कृपया फिर से कोशिश करें। (No input sent to AI)";
    }
    const responses = [
      `🙏 Namaste! Main Tezu AI hun...`,
      `हैलो जी! 🌟 Tezu AI यहाँ present! "${userMessage}" - बहुत बढ़िया सवाल है!

🔍 **Detailed Response**:
• Main advanced AI capabilities use karta hun
• Multiple languages support karta hun
• Complex problems solve kar sakta hun

📊 **Professional Analysis**:
- Technical questions: ✅ Handled
- Creative tasks: ✅ Expert level  
- Business solutions: ✅ Available
- Educational content: ✅ Detailed explanations

🎯 **Next Steps**: Batayiye aur kya specific help chahiye? Main comprehensive solutions provide kar sakta hun!`,

      `Excellent question! 💼 Main Tezu AI, aapka professional assistant hun.
🧠 **Intelligent Response to "${userMessage}"**:
**Technical Capabilities:**
- Advanced AI models integration
- Multi-language processing
- Document analysis & creation
- Code generation & debugging
- Image processing & generation

**Professional Features:**
- Business intelligence
- Data analytics
- Workflow automation
- Real-time collaboration
- Enterprise security

**Creative Solutions:**
- Content creation
- Design assistance  
- Story writing
- Educational content
- Entertainment options

Kya specific area mein help chahiye? Main detailed guidance de sakta hun! 🚀✨`
    ];
    const resp = responses[Math.floor(Math.random() * responses.length)];
    if (!resp) {
      // fallback if for any weird reason, no response
      return "😓 Tezu AI abhi busy है, कृपया दोबारा पूछें!";
    }
    return resp;
  };

  const handleSendMessage = async () => {
    if ((!input.trim() && attachedFiles.length === 0) || isLoading) {
      console.log("handleSendMessage: Empty input or loading, message not sent.");
      return;
    }

    try {
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
      setIsLoading(true);

      // Simulate AI response with proper delay
      setTimeout(() => {
        let tezuResponse;
        try {
          tezuResponse = generateTezuResponse(userMessage.content);
        } catch (e) {
          console.error("Tezu AI error:", e);
          tezuResponse = "😓 Tezu AI में कोई दिक्कत आ गई (AI Error). कृपया फिर से कोशिश करें!";
        }

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: tezuResponse,
          timestamp: new Date(),
          model: "Tezu AI Pro",
        };

        const finalConversation = {
          ...updatedConversation,
          messages: [...updatedConversation.messages, aiMessage],
        };

        onUpdateConversation(finalConversation);
        setIsLoading(false);

        toast({
          title: "✅ Tezu AI Response Ready!",
          description: "Professional answer generated successfully",
        });
      }, 2000);
    } catch (err) {
      console.error("Error occurred while sending or receiving message:", err);
      toast({
        title: "❌ Error",
        description: "Kuch galat ho gaya! कृपया फिर से कोशिश करें।",
        variant: "destructive"
      });
      setIsLoading(false);
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
    handleSendMessage();
  };

  const quickActions = [
    { icon: FileText, label: "Write a creative story", prompt: "मुझे एक creative story लिखकर दो" },
    { icon: BarChart3, label: "Analyze this document", prompt: "इस document का analysis करो" },
    { icon: Code, label: "Help me code a function", prompt: "एक function code करने में help करो" },
    { icon: Brain, label: "Explain a complex topic", prompt: "कोई complex topic explain करो" },
    { icon: ImageIcon, label: "Generate an image", prompt: "एक image generate करो" },
    { icon: Calendar, label: "Plan my schedule", prompt: "मेरे schedule की planning करो" },
  ];

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gradient-to-r from-gray-900/95 to-blue-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 ring-2 ring-blue-500/50">
            <AvatarImage src="/lovable-uploads/95fdd9ab-8aef-49dd-b3c6-d153ec4336ca.png" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <Bot className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              🤖 Tezu AI Pro
              <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                🏆 World's #1 Secure AI
              </Badge>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                🔒 100% Private & Secure
              </Badge>
              <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-400">
                ⚡ Real-time Responses
              </Badge>
              <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                🧠 Advanced AI Models
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
                className="flex items-center gap-2 bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all"
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
        {/* Messages */}
        <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
          <div className="space-y-4 max-w-4xl mx-auto">
            {conversation.messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Welcome to AI Agent Pro</h3>
                <p className="text-gray-400 mb-6">Your advanced AI assistant with cutting-edge capabilities for all your creative and analytical needs</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <Brain className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium mb-1">Advanced AI Models</h4>
                    <p className="text-xs text-gray-400">Access to multiple AI models including GPT-4, Claude, and custom models</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <FileText className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium mb-1">Document Analysis</h4>
                    <p className="text-xs text-gray-400">Upload and analyze documents, PDFs, and text files</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <Mic className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium mb-1">Voice Interface</h4>
                    <p className="text-xs text-gray-400">Natural voice conversations with speech-to-text and text-to-speech</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <ImageIcon className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium mb-1">Image Processing</h4>
                    <p className="text-xs text-gray-400">Generate, analyze, and edit images with AI assistance</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <Code className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium mb-1">Code Assistant</h4>
                    <p className="text-xs text-gray-400">Advanced coding help with multiple programming languages</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <Zap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium mb-1">Real-time Responses</h4>
                    <p className="text-xs text-gray-400">Lightning-fast responses with streaming capabilities</p>
                  </div>
                </div>

                <Button 
                  onClick={() => handleQuickAction("Hello Tezu AI! मुझे आपके features के बारे में बताइए")}
                  className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start New Conversation
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
                    title: "Copied to clipboard",
                    description: "Message content has been copied.",
                  });
                }}
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
                  placeholder="Ask Tezu AI anything... (Hindi/English) 💬"
                  className="pr-12 py-4 text-lg bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 resize-none rounded-xl"
                  disabled={isLoading}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {}}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
              </div>
              <Button
                onClick={() => setIsRecording(!isRecording)}
                variant={isRecording ? "destructive" : "outline"}
                size="lg"
                className={`${
                  isRecording
                    ? "bg-red-600 hover:bg-red-700"
                    : "border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700/50"
                } rounded-xl`}
              >
                {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={(!input.trim() && attachedFiles.length === 0) || isLoading}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
              <span>Press Enter to send, Shift+Enter for new line</span>
              <div className="flex items-center gap-4">
                <span>{input.length}/4000</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Online & Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
