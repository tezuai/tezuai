
import { useState } from "react";
import { Search, X, Clock, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface SearchDialogProps {
  conversations: any[];
  onSelectConversation: (id: string) => void;
}

export function SearchDialog({ conversations, onSelectConversation }: SearchDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: any[] = [];
    conversations.forEach(conversation => {
      conversation.messages.forEach((message: any) => {
        if (message.content.toLowerCase().includes(query.toLowerCase()) ||
            conversation.title.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            conversationId: conversation.id,
            conversationTitle: conversation.title,
            messageId: message.id,
            content: message.content,
            role: message.role,
            timestamp: message.timestamp,
          });
        }
      });
    });
    setSearchResults(results.slice(0, 20));
  };

  const handleSelectResult = (result: any) => {
    onSelectConversation(result.conversationId);
    setIsOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Search className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Conversations
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search messages and conversations..."
              className="pl-10 bg-gray-800 border-gray-600 text-white"
              autoFocus
            />
          </div>
          
          <ScrollArea className="h-96">
            <div className="space-y-2">
              {searchResults.length === 0 && searchQuery && (
                <div className="text-center py-8 text-gray-400">
                  No results found for "{searchQuery}"
                </div>
              )}
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectResult(result)}
                  className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-white">
                        {result.conversationTitle}
                      </span>
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {result.role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {result.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {result.content}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
