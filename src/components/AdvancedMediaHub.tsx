import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Image, 
  Video, 
  Music, 
  Mic, 
  Camera, 
  Play, 
  Pause, 
  Square, 
  Download,
  Upload,
  Edit,
  Share2,
  Wand2,
  Sparkles,
  Palette,
  Volume2,
  FileText,
  Headphones
} from 'lucide-react';

interface MediaProject {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'text';
  thumbnail: string;
  duration?: string;
  size: string;
  createdAt: Date;
  tags: string[];
}

export function AdvancedMediaHub() {
  const [activeTab, setActiveTab] = useState('create');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [projects, setProjects] = useState<MediaProject[]>([
    {
      id: '1',
      name: 'AI Generated Landscape',
      type: 'image',
      thumbnail: '🖼️',
      size: '2.4 MB',
      createdAt: new Date(),
      tags: ['AI', 'Landscape', 'Nature']
    },
    {
      id: '2', 
      name: 'Voice Recording - Hindi',
      type: 'audio',
      thumbnail: '🎵',
      duration: '2:34',
      size: '5.2 MB',
      createdAt: new Date(),
      tags: ['Voice', 'Hindi', 'Recording']
    },
    {
      id: '3',
      name: 'Tutorial Video',
      type: 'video', 
      thumbnail: '🎬',
      duration: '10:15',
      size: '45.6 MB',
      createdAt: new Date(),
      tags: ['Tutorial', 'Education', 'AI']
    }
  ]);

  const [imagePrompt, setImagePrompt] = useState('');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [audioPrompt, setAudioPrompt] = useState('');
  const [lyricsText, setLyricsText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate AI generation
  const generateMedia = async (type: string, prompt: string) => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setGenerationProgress(i);
    }

    // Add new project
    const newProject: MediaProject = {
      id: Date.now().toString(),
      name: `AI Generated ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type: type as 'image' | 'video' | 'audio' | 'text',
      thumbnail: type === 'image' ? '🖼️' : type === 'video' ? '🎬' : type === 'audio' ? '🎵' : '📝',
      duration: type === 'video' || type === 'audio' ? '0:30' : undefined,
      size: '2.1 MB',
      createdAt: new Date(),
      tags: ['AI Generated', type.charAt(0).toUpperCase() + type.slice(1)]
    };

    setProjects(prev => [newProject, ...prev]);
    setIsGenerating(false);
    setGenerationProgress(0);
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    setTimeout(() => {
      setIsRecording(false);
      clearInterval(interval);
      
      // Add recorded audio to projects
      const recordedProject: MediaProject = {
        id: Date.now().toString(),
        name: `Voice Recording ${projects.filter(p => p.type === 'audio').length + 1}`,
        type: 'audio',
        thumbnail: '🎤',
        duration: `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')}`,
        size: '3.2 MB',
        createdAt: new Date(),
        tags: ['Voice', 'Recording', 'Original']
      };
      
      setProjects(prev => [recordedProject, ...prev]);
    }, 5000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const imageStyles = [
    '🎨 Artistic', '📸 Realistic', '🌈 Colorful', '🌙 Dark', '☀️ Bright', 
    '💫 Fantasy', '🏛️ Classical', '🚀 Futuristic', '🌿 Natural', '💎 Luxury'
  ];

  const videoStyles = [
    '🎬 Cinematic', '📱 Social', '📚 Educational', '🎪 Fun', '💼 Professional',
    '🌟 Epic', '🎵 Musical', '🏃 Action', '😊 Comedy', '💭 Artistic'
  ];

  const audioStyles = [
    '🎵 Melodic', '🎸 Rock', '🎹 Classical', '🎤 Pop', '🎺 Jazz',
    '🌊 Ambient', '⚡ Electronic', '🎯 Focus', '😴 Relaxing', '🏃 Energetic'
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-royal">🎬 Advanced Media Hub</h1>
          <p className="text-muted-foreground mt-2">
            Images, Videos, Audio, Lyrics - सब कुछ AI से create करें
          </p>
        </div>
        <Button onClick={() => fileInputRef.current?.click()} variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,audio/*"
          className="hidden"
          onChange={(e) => {
            // Handle file upload
            console.log('Files uploaded:', e.target.files);
          }}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Create
          </TabsTrigger>
          <TabsTrigger value="library" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Library
          </TabsTrigger>
          <TabsTrigger value="record" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            Record
          </TabsTrigger>
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </TabsTrigger>
        </TabsList>

        {/* Create Tab */}
        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Generation */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  AI Image Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="एक beautiful sunset over mountains का image बनाओ..."
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="input-premium"
                  rows={3}
                />
                
                <div>
                  <p className="text-sm font-medium mb-2">Style Options:</p>
                  <div className="flex flex-wrap gap-2">
                    {imageStyles.map((style, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-purple-500/20"
                        onClick={() => setImagePrompt(prev => prev + ` in ${style.split(' ')[1]} style`)}
                      >
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => generateMedia('image', imagePrompt)}
                  disabled={isGenerating || !imagePrompt.trim()}
                  className="w-full btn-royal"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Image
                </Button>
              </CardContent>
            </Card>

            {/* Video Generation */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  AI Video Creator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="A person explaining AI in simple Hindi..."
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  className="input-premium"
                  rows={3}
                />

                <div>
                  <p className="text-sm font-medium mb-2">Video Styles:</p>
                  <div className="flex flex-wrap gap-2">
                    {videoStyles.map((style, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-cyan-500/20"
                        onClick={() => setVideoPrompt(prev => prev + ` in ${style.split(' ')[1]} style`)}
                      >
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => generateMedia('video', videoPrompt)}
                  disabled={isGenerating || !videoPrompt.trim()}
                  className="w-full btn-cyber"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Create Video
                </Button>
              </CardContent>
            </Card>

            {/* Audio Generation */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  AI Music & Audio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Create a peaceful meditation music..."
                  value={audioPrompt}
                  onChange={(e) => setAudioPrompt(e.target.value)}
                  className="input-premium"
                  rows={3}
                />

                <div>
                  <p className="text-sm font-medium mb-2">Audio Styles:</p>
                  <div className="flex flex-wrap gap-2">
                    {audioStyles.map((style, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-green-500/20"
                        onClick={() => setAudioPrompt(prev => prev + ` with ${style.split(' ')[1]} style`)}
                      >
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => generateMedia('audio', audioPrompt)}
                  disabled={isGenerating || !audioPrompt.trim()}
                  className="w-full btn-golden"
                >
                  <Headphones className="h-4 w-4 mr-2" />
                  Generate Audio
                </Button>
              </CardContent>
            </Card>

            {/* Lyrics Generator */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  AI Lyrics Writer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Song theme (e.g. 'friendship', 'motivation')"
                  className="input-premium"
                />
                
                <select className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg input-premium">
                  <option value="hindi">Hindi</option>
                  <option value="english">English</option>
                  <option value="hinglish">Hinglish</option>
                  <option value="punjabi">Punjabi</option>
                </select>

                <Textarea
                  placeholder="Generated lyrics will appear here..."
                  value={lyricsText}
                  onChange={(e) => setLyricsText(e.target.value)}
                  className="input-premium"
                  rows={6}
                  readOnly
                />

                <Button 
                  onClick={() => {
                    setLyricsText('🎵 verse 1:\nजीवन है एक खूबसूरत सफर\nहर पल में छुपा है जादू\n\n🎵 chorus:\nसपने देखो, उड़ान भरो\nहर दिन नया अवसर है...');
                    generateMedia('text', 'AI Generated Lyrics');
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Lyrics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Generation Progress */}
          {isGenerating && (
            <Card className="card-premium">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="text-lg font-semibold">AI Creating Your Content...</div>
                  <Progress value={generationProgress} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {generationProgress}% complete • AI processing में time लगता है
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Library Tab */}
        <TabsContent value="library" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Media Library</h3>
            <div className="flex gap-2">
              {['all', 'image', 'video', 'audio', 'text'].map(filter => (
                <Badge key={filter} variant="outline" className="cursor-pointer">
                  {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {projects.map(project => (
              <Card key={project.id} className="card-premium hover:scale-105 transition-transform cursor-pointer">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-4xl mb-3">{project.thumbnail}</div>
                    <h4 className="font-semibold mb-1 text-sm">{project.name}</h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>{project.type}</span>
                      <span>{project.size}</span>
                    </div>
                    {project.duration && (
                      <div className="text-xs text-cyan-400 mb-2">{project.duration}</div>
                    )}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Play className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Record Tab */}
        <TabsContent value="record" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Voice & Video Recording</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl">{isRecording ? '🔴' : '🎤'}</div>
                <div className="text-2xl font-bold">
                  {isRecording ? formatTime(recordingTime) : '00:00'}
                </div>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={startRecording}
                    disabled={isRecording}
                    className="btn-royal"
                    size="lg"
                  >
                    <Mic className="h-5 w-5 mr-2" />
                    {isRecording ? 'Recording...' : 'Start Recording'}
                  </Button>
                  
                  {isRecording && (
                    <Button
                      onClick={() => setIsRecording(false)}
                      variant="destructive"
                      size="lg"
                    >
                      <Square className="h-5 w-5 mr-2" />
                      Stop
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {isRecording 
                    ? 'Recording in progress... Click stop when done'
                    : 'Click to start voice recording / आवाज़ record करने के लिए click करें'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Edit Tab */}
        <TabsContent value="edit" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Quick Edit Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Palette className="h-4 w-4 mr-2" />
                  Color Enhancement
                </Button>
                <Button className="w-full" variant="outline">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Auto-Enhance
                </Button>
                <Button className="w-full" variant="outline">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Audio Cleanup
                </Button>
                <Button className="w-full" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Smart Crop
                </Button>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Badge variant="outline" className="p-2 text-center cursor-pointer">1080p HD</Badge>
                  <Badge variant="outline" className="p-2 text-center cursor-pointer">4K Ultra</Badge>
                  <Badge variant="outline" className="p-2 text-center cursor-pointer">Web Optimized</Badge>
                  <Badge variant="outline" className="p-2 text-center cursor-pointer">Mobile Ready</Badge>
                </div>
                <Button className="w-full btn-cyber">
                  <Download className="h-4 w-4 mr-2" />
                  Export Media
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}