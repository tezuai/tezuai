
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Video, 
  Upload, 
  Download, 
  Search, 
  Bot, 
  BarChart3,
  Zap,
  Brain,
  Languages
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProcessedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  status: 'processing' | 'completed' | 'error';
  summary?: string;
  keyPoints?: string[];
  insights?: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
  progress: number;
}

interface AdvancedFileProcessorProps {
  onFileAnalyzed: (file: ProcessedFile) => void;
}

export function AdvancedFileProcessor({ onFileAnalyzed }: AdvancedFileProcessorProps) {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ProcessedFile | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    Array.from(uploadedFiles).forEach(file => {
      const newFile: ProcessedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        size: file.size,
        status: 'processing',
        progress: 0
      };

      setFiles(prev => [...prev, newFile]);
      processFile(newFile);
    });
  };

  const processFile = async (file: ProcessedFile) => {
    setIsProcessing(true);
    
    // Simulate AI processing with progress updates
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, progress } : f
      ));
    }

    // Mock AI analysis results
    const analysisResults = {
      summary: `📄 Tezu AI ने ${file.name} को analyze kiya hai. Ye file ${file.type.includes('pdf') ? 'PDF document' : file.type.includes('image') ? 'image file' : 'text document'} hai aur ismein valuable information hai.`,
      keyPoints: [
        "📌 Main topics aur themes identify kiye gaye",
        "📊 Data patterns aur insights extract kiye gaye", 
        "🔍 Important keywords aur entities detect kiye gaye",
        "📈 Content quality aur relevance analyze kiya gaya"
      ],
      insights: [
        "💡 Content professional level ka hai",
        "🎯 Target audience clearly defined hai",
        "📋 Structure well-organized hai",
        "🚀 Actionable recommendations included hain"
      ],
      sentiment: (Math.random() > 0.5 ? 'positive' : 'neutral') as 'positive' | 'negative' | 'neutral'
    };

    const completedFile: ProcessedFile = {
      ...file,
      status: 'completed',
      progress: 100,
      ...analysisResults
    };

    setFiles(prev => prev.map(f => 
      f.id === file.id ? completedFile : f
    ));

    onFileAnalyzed(completedFile);
    setIsProcessing(false);

    toast({
      title: "File Analysis Complete! 🎉",
      description: `${file.name} successfully processed by Tezu AI`,
    });
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <Video className="w-4 h-4 text-red-400" />;
    if (type.includes('image')) return <Video className="w-4 h-4 text-blue-400" />;
    if (type.includes('text')) return <Video className="w-4 h-4 text-green-400" />;
    return <Video className="w-4 h-4 text-gray-400" />;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'processing': return 'bg-yellow-500/20 text-yellow-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'error': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">🔬 Advanced File Processor</h3>
        <p className="text-sm text-gray-400">AI-powered document analysis by Tezu</p>
      </div>

      {/* Upload Section */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Files
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-300 mb-3">
              Drop files here or click to upload
            </p>
            <Input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.jpg,.png,.csv"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Label htmlFor="file-upload" className="cursor-pointer">
              <Button asChild variant="outline" className="border-gray-600">
                <span>Choose Files</span>
              </Button>
            </Label>
          </div>
          
          <div className="text-xs text-gray-400 text-center">
            Supported: PDF, DOC, TXT, Images, CSV (Max 10MB each)
          </div>
        </CardContent>
      </Card>

      {/* Processing Queue */}
      {files.length > 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Processing Queue ({files.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-40">
              <div className="space-y-3">
                {files.map((file) => (
                  <div 
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-gray-700/50 rounded cursor-pointer hover:bg-gray-700"
                    onClick={() => setSelectedFile(file)}
                  >
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getStatusColor(file.status)}`}>
                          {file.status}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                      {file.status === 'processing' && (
                        <Progress value={file.progress} className="mt-2 h-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {selectedFile && selectedFile.status === 'completed' && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-gray-300 mb-2 block">AI Summary</Label>
              <p className="text-sm text-gray-100 bg-gray-700/50 p-3 rounded">
                {selectedFile.summary}
              </p>
            </div>

            <div>
              <Label className="text-sm text-gray-300 mb-2 block">Key Points</Label>
              <div className="space-y-2">
                {selectedFile.keyPoints?.map((point, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-100">
                    <Zap className="w-3 h-3 text-blue-400" />
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-300 mb-2 block">AI Insights</Label>
              <div className="space-y-2">
                {selectedFile.insights?.map((insight, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-100">
                    <Bot className="w-3 h-3 text-green-400" />
                    {insight}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-600">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">
                  Sentiment: <Badge className={`ml-1 ${selectedFile.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {selectedFile.sentiment}
                  </Badge>
                </span>
              </div>
              
              <Button size="sm" variant="outline" className="border-gray-600">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="border-gray-600 text-gray-300">
          <Search className="w-4 h-4 mr-2" />
          Search Files
        </Button>
        <Button variant="outline" className="border-gray-600 text-gray-300">
          <Download className="w-4 h-4 mr-2" />
          Bulk Export
        </Button>
      </div>
    </div>
  );
}
