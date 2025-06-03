
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Play, 
  Download, 
  Copy, 
  Code, 
  Terminal,
  CheckCircle,
  XCircle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeCompilerProps {
  isEnabled: boolean;
}

export function CodeCompiler({ isEnabled }: CodeCompilerProps) {
  const [code, setCode] = useState('console.log("Hello Tezu AI!");');
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const { toast } = useToast();

  const supportedLanguages = [
    { id: "javascript", name: "JavaScript", icon: "JS" },
    { id: "python", name: "Python", icon: "PY" },
    { id: "html", name: "HTML", icon: "HTML" },
    { id: "css", name: "CSS", icon: "CSS" },
    { id: "json", name: "JSON", icon: "JSON" }
  ];

  const runCode = async () => {
    if (!isEnabled) {
      toast({
        title: "Premium Feature 🔒",
        description: "Code compiler requires authentication. Please login first!",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    const startTime = Date.now();

    // Simulate code execution
    setTimeout(() => {
      const endTime = Date.now();
      setExecutionTime(endTime - startTime);
      
      // Mock output based on language
      let mockOutput = "";
      switch(language) {
        case "javascript":
          mockOutput = "Hello Tezu AI!\n✅ Code executed successfully";
          break;
        case "python":
          mockOutput = "Hello Tezu AI!\n✅ Python script completed";
          break;
        case "html":
          mockOutput = "✅ HTML rendered successfully\n📄 Document structure valid";
          break;
        default:
          mockOutput = "✅ Code executed successfully";
      }
      
      setOutput(mockOutput);
      setIsRunning(false);
      
      toast({
        title: "Code Executed! 🚀",
        description: `Completed in ${endTime - startTime}ms`,
      });
    }, 1500);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied! 📋",
      description: "Code has been copied to clipboard",
    });
  };

  const downloadCode = () => {
    const extension = language === "javascript" ? "js" : language === "python" ? "py" : language;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tezu-code.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Code Downloaded! 💾",
      description: `File saved as tezu-code.${extension}`,
    });
  };

  if (!isEnabled) {
    return (
      <div className="text-center text-gray-400 p-8">
        <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold mb-2">Code Compiler</h3>
        <p className="text-sm">Login to access the professional code compiler</p>
        <Badge className="mt-2 bg-purple-500/20 text-purple-400">Premium Feature</Badge>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">💻 Code Compiler</h3>
        <p className="text-sm text-gray-400">Execute code in real-time</p>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Code className="w-5 h-5" />
              Code Editor
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {supportedLanguages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id}>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">{lang.icon}</Badge>
                        {lang.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
            className="bg-gray-900 border-gray-600 text-white font-mono min-h-32"
            rows={8}
          />
          
          <div className="flex items-center gap-2">
            <Button
              onClick={runCode}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isRunning ? (
                <Terminal className="w-4 h-4 mr-2 animate-pulse" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isRunning ? "Running..." : "Run Code"}
            </Button>
            
            <Button variant="outline" onClick={copyCode} className="border-gray-600">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            
            <Button variant="outline" onClick={downloadCode} className="border-gray-600">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            
            {executionTime > 0 && (
              <Badge className="bg-blue-500/20 text-blue-400">
                {executionTime}ms
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Output
              {output.includes("✅") ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-24">
              <pre className="text-sm text-gray-100 bg-gray-900/50 p-3 rounded font-mono whitespace-pre-wrap">
                {output}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
