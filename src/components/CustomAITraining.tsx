
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Upload,
  Database,
  Zap,
  Target,
  BarChart3,
  FileText,
  Download,
  Play,
  Settings,
  Crown,
  TrendingUp
} from "lucide-react";

export function CustomAITraining() {
  const [trainingProgress, setTrainingProgress] = useState(65);
  const [activeTraining, setActiveTraining] = useState(true);

  const trainingModels = [
    {
      id: 1,
      name: "Customer Support AI",
      type: "Text Classification",
      status: "Training",
      progress: 75,
      accuracy: "94.2%",
      dataPoints: "10,000+",
      languages: ["Hindi", "English"],
      created: "2 hours ago"
    },
    {
      id: 2,
      name: "Product Recommendation",
      type: "Recommendation System",
      status: "Complete",
      progress: 100,
      accuracy: "96.8%",
      dataPoints: "50,000+",
      languages: ["Hindi", "English", "Marathi"],
      created: "1 day ago"
    },
    {
      id: 3,
      name: "Legal Document AI",
      type: "Document Analysis",
      status: "Pending",
      progress: 0,
      accuracy: "N/A",
      dataPoints: "5,000+",
      languages: ["Hindi", "English"],
      created: "Just now"
    }
  ];

  const datasetCategories = [
    {
      name: "Business Documents",
      count: "25,000+",
      size: "2.5 GB",
      type: "PDF, DOCX, TXT",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Customer Conversations",
      count: "100,000+",
      size: "850 MB",
      type: "JSON, CSV",
      color: "from-green-500 to-teal-500"
    },
    {
      name: "Product Catalogs",
      count: "15,000+",
      size: "1.2 GB",
      type: "JSON, XML, CSV",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Support Tickets",
      count: "75,000+",
      size: "450 MB",
      type: "JSON, TXT",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            Custom AI Training
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Enterprise
            </Badge>
          </h2>
          <p className="text-gray-400 mt-2">Train personalized AI models for your business needs</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Training Data
        </Button>
      </div>

      <Tabs defaultValue="models" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
          <TabsTrigger value="models">My Models</TabsTrigger>
          <TabsTrigger value="training">New Training</TabsTrigger>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          <div className="grid gap-6">
            {trainingModels.map((model) => (
              <Card key={model.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        {model.name}
                        {model.status === "Complete" && <Crown className="w-5 h-5 text-yellow-400" />}
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <span>{model.type}</span>
                        <span>•</span>
                        <span>{model.dataPoints} data points</span>
                        <span>•</span>
                        <span>{model.created}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        model.status === "Complete"
                          ? "text-green-400 border-green-400"
                          : model.status === "Training"
                          ? "text-blue-400 border-blue-400"
                          : "text-gray-400 border-gray-400"
                      }`}
                    >
                      {model.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Progress</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={model.progress} className="flex-1" />
                        <span className="text-white font-semibold">{model.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Accuracy</div>
                      <div className="text-white font-semibold mt-1">{model.accuracy}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Languages</div>
                      <div className="flex gap-1 mt-1">
                        {model.languages.map((lang, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {model.status === "Complete" && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600">
                            <Download className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" className="border-gray-600">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Create New AI Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Model Name</label>
                    <Input
                      placeholder="Enter model name"
                      className="bg-gray-800/50 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Model Type</label>
                    <select className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-md text-white">
                      <option>Text Classification</option>
                      <option>Sentiment Analysis</option>
                      <option>Named Entity Recognition</option>
                      <option>Question Answering</option>
                      <option>Text Summarization</option>
                      <option>Language Translation</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Description</label>
                    <Textarea
                      placeholder="Describe your AI model's purpose"
                      className="bg-gray-800/50 border-gray-600 text-white"
                      rows={4}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Training Data</label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <div className="text-white font-medium mb-2">Upload Training Files</div>
                      <div className="text-gray-400 text-sm">
                        Supports CSV, JSON, TXT, PDF formats
                      </div>
                      <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  Save Draft
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Start Training
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="datasets" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {datasetCategories.map((dataset, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50 hover:border-purple-500/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${dataset.color}`}>
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      Ready
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{dataset.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Records:</span>
                      <div className="text-white font-semibold">{dataset.count}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Size:</span>
                      <div className="text-white font-semibold">{dataset.size}</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Formats:</span>
                    <div className="text-white">{dataset.type}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                      Use Dataset
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Training Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Models</span>
                    <span className="text-white font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Training</span>
                    <span className="text-blue-400 font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Completed</span>
                    <span className="text-green-400 font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg. Accuracy</span>
                    <span className="text-white font-semibold">94.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Training Time</span>
                    <span className="text-white font-semibold">2.5h avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">GPU Usage</span>
                    <span className="text-yellow-400 font-semibold">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Processed</span>
                    <span className="text-white font-semibold">500GB+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success Rate</span>
                    <span className="text-green-400 font-semibold">98.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  Usage Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">API Calls</span>
                    <span className="text-white font-semibold">250K+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Response Time</span>
                    <span className="text-blue-400 font-semibold">120ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime</span>
                    <span className="text-green-400 font-semibold">99.98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cost/Query</span>
                    <span className="text-white font-semibold">₹0.05</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
