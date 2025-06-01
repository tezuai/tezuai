
import { useState } from "react";
import { MoreVertical, Edit2, Trash2, Archive, Copy, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ConversationActionsProps {
  conversation: any;
  onUpdate: (conversation: any) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onDuplicate: (conversation: any) => void;
}

export function ConversationActions({ 
  conversation, 
  onUpdate, 
  onDelete, 
  onArchive, 
  onDuplicate 
}: ConversationActionsProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(conversation.title);
  const { toast } = useToast();

  const handleRename = () => {
    if (newTitle.trim() && newTitle !== conversation.title) {
      onUpdate({ ...conversation, title: newTitle.trim() });
      toast({
        title: "Conversation renamed",
        description: `Renamed to "${newTitle.trim()}"`,
      });
    }
    setIsRenaming(false);
  };

  const handleStar = () => {
    onUpdate({ ...conversation, isStarred: !conversation.isStarred });
    toast({
      title: conversation.isStarred ? "Removed from favorites" : "Added to favorites",
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this conversation? This action cannot be undone.")) {
      onDelete(conversation.id);
      toast({
        title: "Conversation deleted",
        variant: "destructive",
      });
    }
  };

  const handleArchive = () => {
    onArchive(conversation.id);
    toast({
      title: conversation.isArchived ? "Conversation unarchived" : "Conversation archived",
    });
  };

  const handleDuplicate = () => {
    const duplicated = {
      ...conversation,
      id: Date.now().toString(),
      title: `${conversation.title} (Copy)`,
      createdAt: new Date(),
    };
    onDuplicate(duplicated);
    toast({
      title: "Conversation duplicated",
      description: "A copy has been created",
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white" align="end">
          <DropdownMenuItem onClick={() => setIsRenaming(true)} className="hover:bg-gray-700">
            <Edit2 className="w-4 h-4 mr-2" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleStar} className="hover:bg-gray-700">
            <Star className={`w-4 h-4 mr-2 ${conversation.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            {conversation.isStarred ? 'Remove from favorites' : 'Add to favorites'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDuplicate} className="hover:bg-gray-700">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleArchive} className="hover:bg-gray-700">
            <Archive className="w-4 h-4 mr-2" />
            {conversation.isArchived ? 'Unarchive' : 'Archive'}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-600" />
          <DropdownMenuItem onClick={handleDelete} className="hover:bg-red-600 text-red-400">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isRenaming} onOpenChange={setIsRenaming}>
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Rename Conversation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter new title..."
              className="bg-gray-800 border-gray-600 text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleRename()}
              autoFocus
            />
            <div className="flex gap-3">
              <Button
                onClick={() => setIsRenaming(false)}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
              <Button onClick={handleRename} className="flex-1">
                Rename
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
