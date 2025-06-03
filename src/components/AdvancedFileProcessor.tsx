
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Upload, 
  File, 
  FileText, 
  FileImage, 
  FileVideo,
  FilePdf,
  FileSpreadsheet,
  Download,
  Trash2,
  Eye,
  Search,
  Zap,
  Brain,
  Image as ImageIcon,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProcessedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  uploadDate: Date;
  analysis?: {
    text?: string;
    summary?: string;
    keywords?: string[];
    sentiment?: 'positive' | 'neutral' | 'negative';
    language?: string;
    wordCount?: number;
    readingTime?: number;
  };
  preview?: string;
}

interface AdvancedFileProcessorProps {
  onFileAnalyzed: (file: ProcessedFile) => void;
  maxFileSize?: number;
  allowedTypes?: string[];
}

export function AdvancedFileProcessor({ 
  onFileAnalyzed, 
  maxFileSize = 10 * 1024 * 1024, // 10MB
  allowedTypes = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'png', 'mp4', 'xlsx', 'csv']
}: AdvancedFileProcessorProps) {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ProcessedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FilePdf className="w-5 h-5 text-red-400" />;
    if (type.includes('image')) return <FileImage className="w-5 h-5 text-green-400" />;
    if (type.includes('video')) return <FileVideo className="w-5 h-5 text-purple-400" />;
    if (type.includes('sheet') || type.includes('excel') || type.includes('csv')) return <FileSpreadsheet className="w-5 h-5 text-yellow-400" />;
    if (type.includes('text') || type.includes('document')) return <FileText className="w-5 h-5 text-blue-400" />;
    return <File className="w-5 h-5 text-gray-400" />;
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'processing': return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const simulateFileAnalysis = (file: ProcessedFile) => {
    const analysisSteps = [
      { progress: 20, message: "Reading file content..." },
      { progress: 40, message: "Extracting text..." },
      { progress: 60, message: "Analyzing content..." },
      { progress: 80, message: "Generating summary..." },
      { progress: 100, message: "Analysis complete!" }
    ];

    let currentStep = 0;
    
    const updateProgress = () => {
      if (currentStep < analysisSteps.length) {
        const step = analysisSteps[currentStep];
        
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, progress: step.progress, status: step.progress === 100 ? 'completed' : 'processing' }
            : f
        ));

        if (step.progress === 100) {
          // Generate mock analysis
          const mockAnalysis = {
            text: "This is a sample extracted text from the uploaded file. The AI has successfully processed and analyzed the content.",
            summary: "Document contains important information about AI technology, user interfaces, and modern web development practices. Key topics include React components, TypeScript, and user experience design.",
            keywords: ["AI", "Technology", "React", "TypeScript", "Web Development", "User Interface"],
            sentiment: 'positive' as const,
            language: 'English',
            wordCount: 1250,
            readingTime: 5
          };

          const completedFile = {
            ...file,
            analysis: mockAnalysis,
            status: 'completed' as const,
            progress: 100
          };

          setFiles(prev => prev.map(f => f.id === file.id ? completedFile : f));
          onFileAnalyzed(completedFile);
          
          toast({
            title: "File Analysis Complete! 🎉",
            description: `${file.name} has been successfully analyzed`,
          });
        }

        currentStep++;
        if (currentStep < analysisSteps.length) {
          setTimeout(updateProgress, 1000);
        }
      }
    };

    updateProgress();
  };

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return;

    Array.from(uploadedFiles).forEach(file => {
      // Validate file size
      if (file.size > maxFileSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds ${formatFileSize(maxFileSize)} limit`,
          variant: "destructive"
        });
        return;
      }

      // Validate file type
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension && !allowedTypes.includes(fileExtension)) {
        toast({
          title: "File type not supported",
          description: `${fileExtension} files are not allowed`,
          variant: "destructive"
        });
        return;
      }

      const newFile: ProcessedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
        uploadDate: new Date()
      };

      setFiles(prev => [...prev, newFile]);

      // Simulate upload process
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === newFile.id ? { ...f, status: 'processing', progress: 10 } : f
        ));
        
        simulateFileAnalysis(newFile);
      }, 500);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const deleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
    }
    toast({
      title: "File deleted",
      description: "File has been removed from the list",
    });
  };

  const downloadAnalysis = (file: ProcessedFile) => {
    const analysisData = {
      fileName: file.name,
      uploadDate: file.uploadDate,
      analysis: file.analysis
    };
    
    const blob = new Blob([JSON.stringify(analysisData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name}_analysis.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">📁 Advanced File Processor</h3>
        <p className="text-sm text-gray-400">Upload and analyze documents, images, and media files</p>
      </div>

      {/* Upload Area */}
      <Card 
        className={`border-2 border-dashed transition-all duration-200 ${
          isDragOver 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-gray-600 bg-gray-800/50'
        }`}
      >
        <CardContent 
          className="p-8 text-center cursor-pointer"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-white mb-2">
            {isDragOver ? 'Drop files here' : 'Upload Files'}
          </h4>
          <p className="text-sm text-gray-400 mb-4">
            Drag & drop files or click to browse
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {allowedTypes.slice(0, 6).map(type => (
              <Badge key={type} variant="outline" className="text-xs border-gray-600 text-gray-300">
                .{type}
              </Badge>
            ))}
            {allowedTypes.length > 6 && (
              <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                +{allowedTypes.length - 6} more
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Max size: {formatFileSize(maxFileSize)}
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={allowedTypes.map(type => `.${type}`).join(',')}
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Processing Queue ({files.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {files.map(file => (
                  <div
                    key={file.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedFile?.id === file.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600 bg-gray-700/50 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {getFileIcon(file.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-white text-sm truncate">{file.name}</h5>
                          {getStatusIcon(file.status)}
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                          <span>{formatFileSize(file.size)}</span>
                          <span>{file.uploadDate.toLocaleTimeString()}</span>
                          <Badge variant="outline" className="text-xs border-gray-600">
                            {file.status}
                          </Badge>
                        </div>

                        {file.status === 'processing' && (
                          <Progress value={file.progress} className="h-2" />
                        )}

                        {file.status === 'completed' && file.analysis && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                              ✓ Analyzed
                            </Badge>
                            <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                              {file.analysis.wordCount} words
                            </Badge>
                            <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-400">
                              {file.analysis.readingTime}min read
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-1">
                        {file.status === 'completed' && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadAnalysis(file);
                              }}
                              className="text-gray-400 hover:text-white h-8 w-8 p-0"
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFile(file);
                              }}
                              className="text-gray-400 hover:text-white h-8 w-8 p-0"
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFile(file.id);
                          }}
                          className="text-gray-400 hover:text-red-400 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* File Analysis Details */}
      {selectedFile && selectedFile.analysis && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analysis Results: {selectedFile.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Summary */}
            <div>
              <h6 className="text-sm font-medium text-gray-300 mb-2">Summary</h6>
              <p className="text-sm text-gray-400 bg-gray-700/50 p-3 rounded">
                {selectedFile.analysis.summary}
              </p>
            </div>

            {/* Keywords */}
            <div>
              <h6 className="text-sm font-medium text-gray-300 mb-2">Keywords</h6>
              <div className="flex flex-wrap gap-1">
                {selectedFile.analysis.keywords?.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-700/50 rounded">
                <div className="text-lg font-bold text-blue-400">{selectedFile.analysis.wordCount}</div>
                <div className="text-xs text-gray-400">Words</div>
              </div>
              <div className="text-center p-3 bg-gray-700/50 rounded">
                <div className="text-lg font-bold text-green-400">{selectedFile.analysis.readingTime}min</div>
                <div className="text-xs text-gray-400">Reading Time</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1">
                <Search className="w-4 h-4 mr-2" />
                Ask AI about this file
              </Button>
              <Button size="sm" variant="outline" className="border-gray-600" onClick={() => downloadAnalysis(selectedFile)}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Tips */}
      <div className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-400">AI Processing</span>
        </div>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>• Supports PDFs, documents, images, and spreadsheets</li>
          <li>• Automatic text extraction and content analysis</li>
          <li>• Intelligent keyword detection and summarization</li>
        </ul>
      </div>
    </div>
  );
}
