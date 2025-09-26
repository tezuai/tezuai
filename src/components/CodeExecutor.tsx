import React, { useState, useRef } from 'react';
import { Play, Code, Terminal, FileCode, Download, Share2, Copy, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export const CodeExecutor = () => {
  const [code, setCode] = useState('print("Hello, Advanced AI!")\n\n# Your Python code here...');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [language, setLanguage] = useState('python');
  const [executionTime, setExecutionTime] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const languages = [
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'javascript', label: 'JavaScript', icon: '🟨' },
    { value: 'typescript', label: 'TypeScript', icon: '🔷' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '⚡' },
    { value: 'rust', label: 'Rust', icon: '🦀' },
    { value: 'go', label: 'Go', icon: '🐹' },
    { value: 'sql', label: 'SQL', icon: '🗃️' }
  ];

  const codeExamples = {
    python: `# Advanced Python Example
import numpy as np
import matplotlib.pyplot as plt

def generate_fibonacci(n):
    """Generate fibonacci sequence using numpy"""
    fib = np.zeros(n)
    fib[0], fib[1] = 0, 1
    for i in range(2, n):
        fib[i] = fib[i-1] + fib[i-2]
    return fib

# Generate and display
fib_sequence = generate_fibonacci(10)
print("Fibonacci Sequence:", fib_sequence)

# AI Model simulation
class SimpleNeuralNetwork:
    def __init__(self):
        self.weights = np.random.randn(3, 1)
    
    def predict(self, inputs):
        return np.dot(inputs, self.weights)

nn = SimpleNeuralNetwork()
test_input = np.array([[1, 2, 3]])
prediction = nn.predict(test_input)
print(f"Neural Network Prediction: {prediction[0][0]:.4f}")`,

    javascript: `// Advanced JavaScript Example
class AIDataProcessor {
    constructor() {
        this.data = [];
        this.models = new Map();
    }
    
    async processData(rawData) {
        console.log("Processing AI data...");
        
        // Simulate async processing
        return new Promise(resolve => {
            setTimeout(() => {
                const processed = rawData.map(item => ({
                    ...item,
                    processed: true,
                    timestamp: Date.now()
                }));
                resolve(processed);
            }, 1000);
        });
    }
    
    generateInsights(data) {
        const insights = {
            totalRecords: data.length,
            avgValue: data.reduce((sum, item) => sum + (item.value || 0), 0) / data.length,
            predictions: data.map(item => item.value * 1.1) // Simple prediction
        };
        return insights;
    }
}

// Usage
const processor = new AIDataProcessor();
const sampleData = [
    { id: 1, value: 100 },
    { id: 2, value: 150 },
    { id: 3, value: 200 }
];

processor.processData(sampleData).then(result => {
    console.log("Processed Data:", result);
    const insights = processor.generateInsights(result);
    console.log("AI Insights:", insights);
});`,

    sql: `-- Advanced SQL for AI Analytics
WITH ai_metrics AS (
    SELECT 
        user_id,
        model_name,
        COUNT(*) as query_count,
        AVG(response_time) as avg_response_time,
        SUM(tokens_used) as total_tokens
    FROM ai_interactions 
    WHERE created_at >= NOW() - INTERVAL '30 days'
    GROUP BY user_id, model_name
),
performance_ranks AS (
    SELECT 
        *,
        ROW_NUMBER() OVER (PARTITION BY model_name ORDER BY avg_response_time ASC) as performance_rank,
        PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY avg_response_time) OVER (PARTITION BY model_name) as p95_response_time
    FROM ai_metrics
)
SELECT 
    model_name,
    COUNT(DISTINCT user_id) as active_users,
    SUM(query_count) as total_queries,
    AVG(avg_response_time) as model_avg_response_time,
    MAX(p95_response_time) as model_p95_response_time,
    SUM(total_tokens) as model_total_tokens
FROM performance_ranks
GROUP BY model_name
ORDER BY total_queries DESC;`
  };

  const executeCode = async () => {
    if (!code.trim()) return;
    
    setIsExecuting(true);
    const startTime = Date.now();
    
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock output based on language
      let mockOutput = '';
      
      switch (language) {
        case 'python':
          mockOutput = `Fibonacci Sequence: [0. 1. 1. 2. 3. 5. 8. 13. 21. 34.]
Neural Network Prediction: 14.2847

Execution completed successfully!
Memory usage: 45.2 MB
CPU time: 0.123 seconds`;
          break;
        case 'javascript':
          mockOutput = `Processing AI data...
Processed Data: [
  { id: 1, value: 100, processed: true, timestamp: 1699123456789 },
  { id: 2, value: 150, processed: true, timestamp: 1699123456789 },
  { id: 3, value: 200, processed: true, timestamp: 1699123456789 }
]
AI Insights: {
  totalRecords: 3,
  avgValue: 150,
  predictions: [110, 165, 220]
}

✓ Execution completed successfully!`;
          break;
        case 'sql':
          mockOutput = `model_name          | active_users | total_queries | model_avg_response_time | model_p95_response_time | model_total_tokens
--------------------|--------------|---------------|-------------------------|-------------------------|-------------------
gpt-4-turbo        |         1250 |         45230 |                  234ms |                  450ms |            2340000
claude-3-opus      |          890 |         32100 |                  198ms |                  380ms |            1890000
gemini-pro         |          720 |         28950 |                  267ms |                  520ms |            1650000

Query executed successfully!
Rows returned: 3
Execution time: 0.089 seconds`;
          break;
        default:
          mockOutput = `Code executed successfully!
Output: Hello, Advanced AI!
Execution time: 0.045 seconds`;
      }
      
      setOutput(mockOutput);
      setExecutionTime(Date.now() - startTime);
      
      toast({
        title: "🚀 Code Executed",
        description: `Successfully executed ${language} code in ${(Date.now() - startTime) / 1000}s`
      });
      
    } catch (error) {
      setOutput(`Error: ${error}`);
      toast({
        title: "❌ Execution Failed",
        description: "There was an error executing your code",
        variant: "destructive"
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "📋 Copied",
      description: "Code copied to clipboard"
    });
  };

  const loadExample = () => {
    setCode(codeExamples[language as keyof typeof codeExamples] || codeExamples.python);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
          💻 Advanced Code Executor
        </h1>
        <p className="text-muted-foreground mt-2">
          Execute code in multiple languages with AI-powered insights
        </p>
      </div>

      {/* Control Panel */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Code Execution Environment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.icon} {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={loadExample}>
              <FileCode className="w-4 h-4 mr-2" />
              Load Example
            </Button>
            
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Code
            </Button>
            
            <Button 
              onClick={executeCode} 
              disabled={isExecuting}
              className="btn-royal ml-auto"
            >
              {isExecuting ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isExecuting ? 'Executing...' : 'Execute Code'}
            </Button>
          </div>
          
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Badge variant="outline">
              Language: {languages.find(l => l.value === language)?.label}
            </Badge>
            <Badge variant="outline">
              Status: {isExecuting ? 'Running' : 'Ready'}
            </Badge>
            {executionTime > 0 && (
              <Badge variant="outline">
                Last execution: {executionTime}ms
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Code Editor</TabsTrigger>
          <TabsTrigger value="output">Output & Results</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <Card className="min-h-[500px]">
            <CardContent className="p-0">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[500px] font-mono text-sm border-0 resize-none bg-gray-900 text-gray-100"
                placeholder="Enter your code here..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="output">
          <Card className="min-h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Execution Output
                <div className="ml-auto flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                ref={outputRef}
                className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm min-h-[400px] whitespace-pre-wrap"
              >
                {output || 'No output yet. Run your code to see results here.'}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};