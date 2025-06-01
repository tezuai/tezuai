
import { useState } from "react";
import { Download, FileText, Database, Code2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ExportDialogProps {
  conversations: any[];
}

export function ExportDialog({ conversations }: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'txt'>('json');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [selectedConversations, setSelectedConversations] = useState<string[]>([]);

  const handleExport = () => {
    const conversationsToExport = selectedConversations.length > 0 
      ? conversations.filter(c => selectedConversations.includes(c.id))
      : conversations;

    let exportData: string;
    let filename: string;
    let mimeType: string;

    switch (exportFormat) {
      case 'json':
        exportData = JSON.stringify(conversationsToExport, null, 2);
        filename = `conversations_${new Date().toISOString().split('T')[0]}.json`;
        mimeType = 'application/json';
        break;
      
      case 'csv':
        const csvHeaders = ['Conversation ID', 'Title', 'Message Role', 'Content', 'Timestamp'];
        const csvRows = [csvHeaders.join(',')];
        
        conversationsToExport.forEach(conv => {
          conv.messages.forEach((msg: any) => {
            const row = [
              conv.id,
              `"${conv.title.replace(/"/g, '""')}"`,
              msg.role,
              `"${msg.content.replace(/"/g, '""')}"`,
              includeTimestamps ? msg.timestamp.toISOString() : ''
            ];
            csvRows.push(row.join(','));
          });
        });
        
        exportData = csvRows.join('\n');
        filename = `conversations_${new Date().toISOString().split('T')[0]}.csv`;
        mimeType = 'text/csv';
        break;
      
      case 'txt':
        exportData = conversationsToExport.map(conv => {
          let convText = `=== ${conv.title} ===\n`;
          if (includeMetadata) {
            convText += `Created: ${conv.createdAt.toISOString()}\n`;
            convText += `Messages: ${conv.messages.length}\n\n`;
          }
          
          conv.messages.forEach((msg: any) => {
            if (includeTimestamps) {
              convText += `[${msg.timestamp.toISOString()}] `;
            }
            convText += `${msg.role.toUpperCase()}: ${msg.content}\n\n`;
          });
          
          return convText;
        }).join('\n' + '='.repeat(50) + '\n\n');
        
        filename = `conversations_${new Date().toISOString().split('T')[0]}.txt`;
        mimeType = 'text/plain';
        break;
      
      default:
        return;
    }

    const blob = new Blob([exportData], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsOpen(false);
  };

  const toggleConversationSelection = (conversationId: string) => {
    setSelectedConversations(prev => 
      prev.includes(conversationId)
        ? prev.filter(id => id !== conversationId)
        : [...prev, conversationId]
    );
  };

  const selectAllConversations = () => {
    setSelectedConversations(conversations.map(c => c.id));
  };

  const clearSelection = () => {
    setSelectedConversations([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Download className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Conversations
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Export Format */}
          <div className="space-y-3">
            <Label className="text-white font-medium">Export Format</Label>
            <RadioGroup value={exportFormat} onValueChange={(value: 'json' | 'csv' | 'txt') => setExportFormat(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json" className="text-gray-300 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  JSON (Structured data)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="text-gray-300 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  CSV (Spreadsheet compatible)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="txt" id="txt" />
                <Label htmlFor="txt" className="text-gray-300 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Plain Text (Human readable)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator className="bg-gray-700" />

          {/* Export Options */}
          <div className="space-y-3">
            <Label className="text-white font-medium">Export Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="metadata" 
                  checked={includeMetadata}
                  onCheckedChange={(checked) => setIncludeMetadata(checked === true)}
                />
                <Label htmlFor="metadata" className="text-gray-300">
                  Include metadata (creation date, message count)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="timestamps" 
                  checked={includeTimestamps}
                  onCheckedChange={(checked) => setIncludeTimestamps(checked === true)}
                />
                <Label htmlFor="timestamps" className="text-gray-300">
                  Include timestamps
                </Label>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-700" />

          {/* Conversation Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-white font-medium">Select Conversations</Label>
              <div className="space-x-2">
                <Button variant="ghost" size="sm" onClick={selectAllConversations}>
                  Select All
                </Button>
                <Button variant="ghost" size="sm" onClick={clearSelection}>
                  Clear
                </Button>
              </div>
            </div>
            <div className="max-h-40 overflow-y-auto space-y-2 border border-gray-700 rounded-lg p-3">
              {conversations.map(conversation => (
                <div key={conversation.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={conversation.id}
                    checked={selectedConversations.includes(conversation.id)}
                    onCheckedChange={() => toggleConversationSelection(conversation.id)}
                  />
                  <Label htmlFor={conversation.id} className="text-gray-300 flex-1 cursor-pointer">
                    {conversation.title}
                  </Label>
                  <span className="text-xs text-gray-500">
                    {conversation.messages.length} messages
                  </span>
                </div>
              ))}
            </div>
            {selectedConversations.length === 0 && (
              <p className="text-sm text-gray-500">
                No conversations selected. All conversations will be exported.
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
              Export {selectedConversations.length > 0 ? selectedConversations.length : conversations.length} Conversations
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
