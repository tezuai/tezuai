
import { useState } from "react";
import { Download, FileText, File, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface ExportDialogProps {
  conversations: any[];
  selectedConversation?: string;
}

export function ExportDialog({ conversations, selectedConversation }: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("json");
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [exportScope, setExportScope] = useState(selectedConversation ? "current" : "all");
  const { toast } = useToast();

  const handleExport = () => {
    const dataToExport = exportScope === "current" 
      ? conversations.filter(c => c.id === selectedConversation)
      : conversations;

    const exportData = {
      exported_at: new Date().toISOString(),
      format_version: "1.0",
      conversations: dataToExport.map(conv => ({
        id: conv.id,
        title: conv.title,
        created_at: conv.createdAt,
        ...(includeMetadata && {
          message_count: conv.messages.length,
          last_updated: conv.messages[conv.messages.length - 1]?.timestamp,
        }),
        messages: conv.messages.map((msg: any) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp,
          ...(includeMetadata && msg.model && { model: msg.model }),
        }))
      }))
    };

    let content: string;
    let filename: string;
    let mimeType: string;

    switch (exportFormat) {
      case "json":
        content = JSON.stringify(exportData, null, 2);
        filename = `conversations_${new Date().toISOString().split('T')[0]}.json`;
        mimeType = "application/json";
        break;
      case "csv":
        const csvRows = ["ID,Role,Content,Timestamp,Conversation"];
        exportData.conversations.forEach(conv => {
          conv.messages.forEach(msg => {
            csvRows.push(`"${msg.id}","${msg.role}","${msg.content.replace(/"/g, '""')}","${msg.timestamp}","${conv.title}"`);
          });
        });
        content = csvRows.join("\n");
        filename = `conversations_${new Date().toISOString().split('T')[0]}.csv`;
        mimeType = "text/csv";
        break;
      case "txt":
        content = exportData.conversations.map(conv => 
          `=== ${conv.title} ===\n\n${conv.messages.map((msg: any) => 
            `[${msg.role.toUpperCase()}] ${msg.content}`
          ).join('\n\n')}`
        ).join('\n\n' + '='.repeat(50) + '\n\n');
        filename = `conversations_${new Date().toISOString().split('T')[0]}.txt`;
        mimeType = "text/plain";
        break;
      default:
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: `Conversations exported as ${filename}`,
    });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Download className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Conversations
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Export Scope</label>
            <Select value={exportScope} onValueChange={setExportScope}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {selectedConversation && (
                  <SelectItem value="current" className="text-white">Current Conversation</SelectItem>
                )}
                <SelectItem value="all" className="text-white">All Conversations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Format</label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="json" className="text-white">
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4" />
                    JSON (Structured Data)
                  </div>
                </SelectItem>
                <SelectItem value="csv" className="text-white">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    CSV (Spreadsheet)
                  </div>
                </SelectItem>
                <SelectItem value="txt" className="text-white">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Text (Readable)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="metadata"
              checked={includeMetadata}
              onCheckedChange={setIncludeMetadata}
            />
            <label htmlFor="metadata" className="text-sm text-gray-300">
              Include metadata (timestamps, models, etc.)
            </label>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
