import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { 
  Palette, 
  Music, 
  Video, 
  Image, 
  FileText, 
  Mic,
  Play,
  Pause,
  Download,
  Share2,
  Sparkles,
  Brush,
  Camera,
  Headphones,
  PenTool,
  Wand2,
  Heart,
  Star,
  BookOpen,
  Film
} from "lucide-react";

interface CreativeProject {
  id: string;
  type: 'image' | 'music' | 'video' | 'story' | 'lyrics' | 'poem';
  title: string;
  description: string;
  content: string;
  status: 'generating' | 'completed' | 'failed';
  thumbnail?: string;
  duration?: string;
  genre?: string;
  mood?: string;
  style?: string;
  createdAt: string;
}

interface CreativeTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  prompt: string;
  icon: any;
  color: string;
}

export const CreativeStudio = () => {
  const [projects, setProjects] = useState<CreativeProject[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'gallery' | 'templates'>('create');
  const [selectedType, setSelectedType] = useState<'image' | 'music' | 'video' | 'story' | 'lyrics' | 'poem'>('image');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  const creativeTypes = [
    { id: 'image', name: 'इमेज जेनरेट', icon: Image, color: 'from-purple-500 to-pink-500' },
    { id: 'music', name: 'संगीत बनाएं', icon: Music, color: 'from-blue-500 to-cyan-500' },
    { id: 'video', name: 'वीडियो क्रिएट', icon: Video, color: 'from-red-500 to-orange-500' },
    { id: 'story', name: 'कहानी लिखें', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
    { id: 'lyrics', name: 'गीत के बोल', icon: Mic, color: 'from-yellow-500 to-orange-500' },
    { id: 'poem', name: 'कविता रचना', icon: PenTool, color: 'from-indigo-500 to-purple-500' }
  ];

  const templates: CreativeTemplate[] = [
    {
      id: '1',
      name: 'रोमांटिक गीत',
      type: 'lyrics',
      description: 'प्रेम भरे गीत के बोल',
      prompt: 'एक खूबसूरत रोमांटिक गीत लिखें जो दिल को छू जाए',
      icon: Heart,
      color: 'text-pink-400'
    },
    {
      id: '2', 
      name: 'प्रेरणादायक कहानी',
      type: 'story',
      description: 'मोटिवेशनल कहानी',
      prompt: 'एक प्रेरणादायक कहानी लिखें जो जीवन में सफलता का संदेश दे',
      icon: Star,
      color: 'text-yellow-400'
    },
    {
      id: '3',
      name: 'भावनात्मक कविता', 
      type: 'poem',
      description: 'गहरी भावनाओं की कविता',
      prompt: 'एक भावनात्मक कविता लिखें जो दिल की गहराई से निकली हो',
      icon: PenTool,
      color: 'text-purple-400'
    },
    {
      id: '4',
      name: 'फ्यूचरिस्टिक आर्ट',
      type: 'image', 
      description: 'भविष्य की तकनीक',
      prompt: 'एक फ्यूचरिस्टिक साइबरपंक शहर का चित्र बनाएं',
      icon: Wand2,
      color: 'text-cyan-400'
    },
    {
      id: '5',
      name: 'शांत संगीत',
      type: 'music',
      description: 'मेडिटेशन के लिए',
      prompt: 'शांत और मेडिटेटिव संगीत बनाएं जो मन को शांति दे',
      icon: Headphones,
      color: 'text-blue-400'
    },
    {
      id: '6',
      name: 'एक्शन वीडियो',
      type: 'video',
      description: 'रोमांचक वीडियो',
      prompt: 'एक रोमांचक एक्शन सीन का वीडियो बनाएं',
      icon: Film,
      color: 'text-red-400'
    }
  ];

  const styleOptions = {
    image: ['Realistic', 'Anime', 'Oil Painting', 'Digital Art', 'Watercolor', 'Sketch'],
    music: ['Classical', 'Electronic', 'Rock', 'Jazz', 'Ambient', 'Folk'],
    video: ['Cinematic', 'Documentary', 'Animation', 'Music Video', 'Commercial', 'Art Film'],
    story: ['Romance', 'Adventure', 'Mystery', 'Fantasy', 'Sci-Fi', 'Historical'],
    lyrics: ['Pop', 'Rock', 'Classical', 'Folk', 'Hip-Hop', 'Country'],
    poem: ['Free Verse', 'Sonnet', 'Haiku', 'Ghazal', 'Ballad', 'Narrative']
  };

  const moodOptions = ['Happy', 'Romantic', 'Mysterious', 'Energetic', 'Peaceful', 'Dramatic', 'Nostalgic', 'Uplifting'];

  const generateCreativeContent = async () => {
    if (!prompt.trim()) {
      toast.error("कृपया प्रॉम्प्ट डालें");
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 3000));

      const newProject: CreativeProject = {
        id: Date.now().toString(),
        type: selectedType,
        title: `${creativeTypes.find(t => t.id === selectedType)?.name} - ${new Date().toLocaleDateString('hi-IN')}`,
        description: prompt,
        content: generateMockContent(selectedType),
        status: 'completed',
        style: selectedStyle,
        mood: selectedMood,
        createdAt: new Date().toLocaleString('hi-IN'),
        duration: selectedType === 'music' || selectedType === 'video' ? '3:45' : undefined,
        genre: selectedStyle
      };

      setProjects(prev => [newProject, ...prev]);
      setPrompt('');
      toast.success("कंटेंट सफलतापूर्वक बना!");
      setActiveTab('gallery');
    } catch (error) {
      toast.error("कंटेंट बनाने में त्रुटि");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockContent = (type: string) => {
    switch (type) {
      case 'lyrics':
        return `तुम हो मेरे साथ तो
क्या डर है इस जहान का
सपनों का ये सफर है
प्यार का ये इम्तिहान है

धड़कता है दिल मेरा
तुम्हारे प्यार में
खुशियों से भरा है
यह नया संसार है`;

      case 'story':
        return `एक छोटे से गांव में राम नाम का एक लड़का रहता था। वह बहुत मेहनती था लेकिन गरीबी के कारण पढ़ाई नहीं कर सकता था। एक दिन उसे एक पुरानी किताब मिली जिसमें सफलता के राज़ लिखे थे...

राम ने हर दिन उस किताब को पढ़ा और उसकी शिक्षाओं को अपने जीवन में उतारा। धीरे-धीरे उसकी जिंदगी बदलने लगी। कड़ी मेहनत और दृढ़ संकल्प से वह एक सफल व्यापारी बन गया।

इस कहानी से हमें सीख मिलती है कि कड़ी मेहनत और सही दिशा में प्रयास से कोई भी लक्ष्य हासिल किया जा सकता है।`;

      case 'poem':
        return `चांद की रोशनी में
तारों का ये जमावड़ा है
रात की खामोशी में
दिल का ये सवाल है

क्यों लगता है ऐसा
जैसे वक़्त रुक गया है
इश्क़ के इस मौसम में
हर लम्हा ख़ुशी का है

सपनों के इस आलम में
उम्मीदों का चिराग है
जिंदगी का ये सफर
मोहब्बत का ये राग है`;

      default:
        return "यहाँ आपका जेनरेट किया गया कंटेंट दिखाई देगा।";
    }
  };

  const useTemplate = (template: CreativeTemplate) => {
    setSelectedType(template.type as any);
    setPrompt(template.prompt);
    setActiveTab('create');
    toast.success(`टेम्प्लेट "${template.name}" लोड किया गया`);
  };

  const downloadContent = (project: CreativeProject) => {
    const element = document.createElement('a');
    const file = new Blob([project.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${project.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("फाइल डाउनलोड हुई!");
  };

  const shareContent = async (project: CreativeProject) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.content,
        });
      } catch (err) {
        toast.error("शेयर नहीं हो सका");
      }
    } else {
      await navigator.clipboard.writeText(project.content);
      toast.success("कंटेंट कॉपी हो गया!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <Palette className="h-8 w-8 text-pink-400" />
              Tezu AI Creative Studio
              <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                Professional
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'create', label: 'क्रिएट करें', icon: Sparkles },
            { id: 'gallery', label: 'गैलरी', icon: Image },
            { id: 'templates', label: 'टेम्प्लेट्स', icon: Brush }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Create Tab */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">कंटेंट टाइप चुनें</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {creativeTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <Button
                        key={type.id}
                        variant={selectedType === type.id ? "default" : "outline"}
                        onClick={() => setSelectedType(type.id as any)}
                        className={`h-20 flex flex-col gap-2 ${
                          selectedType === type.id 
                            ? `bg-gradient-to-r ${type.color}` 
                            : ''
                        }`}
                      >
                        <IconComponent className="h-6 w-6" />
                        <span className="text-sm">{type.name}</span>
                      </Button>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-white font-medium mb-2 block">स्टाइल</label>
                    <div className="flex flex-wrap gap-2">
                      {styleOptions[selectedType]?.map((style) => (
                        <Badge
                          key={style}
                          className={`cursor-pointer ${
                            selectedStyle === style 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                          onClick={() => setSelectedStyle(style)}
                        >
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">मूड</label>
                    <div className="flex flex-wrap gap-2">
                      {moodOptions.map((mood) => (
                        <Badge
                          key={mood}
                          className={`cursor-pointer ${
                            selectedMood === mood 
                              ? 'bg-pink-500 text-white' 
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                          onClick={() => setSelectedMood(mood)}
                        >
                          {mood}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">प्रॉम्प्ट</label>
                    <Textarea
                      placeholder={`${selectedType === 'image' ? 'एक खूबसूरत तस्वीर का वर्णन करें...' :
                        selectedType === 'music' ? 'आप कैसा संगीत चाहते हैं...' :
                        selectedType === 'video' ? 'वीडियो के लिए कॉन्सेप्ट बताएं...' :
                        selectedType === 'story' ? 'कहानी का विषय बताएं...' :
                        selectedType === 'lyrics' ? 'गीत का विषय और भावना बताएं...' :
                        'कविता का विषय और भावना बताएं...'}`}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-32 bg-white/10 text-white placeholder-white/70 border-white/20"
                    />
                  </div>

                  <Button
                    onClick={generateCreativeContent}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-lg py-3"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 animate-spin" />
                        जेनरेट हो रहा है...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Wand2 className="h-5 w-5" />
                        AI से बनाएं
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">प्रीव्यू</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white/5 rounded-lg p-6 min-h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      {selectedType === 'image' && '🎨'}
                      {selectedType === 'music' && '🎵'}
                      {selectedType === 'video' && '🎬'}
                      {selectedType === 'story' && '📖'}
                      {selectedType === 'lyrics' && '🎤'}
                      {selectedType === 'poem' && '✍️'}
                    </div>
                    <p className="text-white/70">
                      {selectedType === 'image' && 'यहाँ आपकी जेनरेट की गई इमेज दिखेगी'}
                      {selectedType === 'music' && 'यहाँ आपका जेनरेट किया गया संगीत प्ले होगा'}
                      {selectedType === 'video' && 'यहाँ आपका जेनरेट किया गया वीडियो दिखेगा'}
                      {selectedType === 'story' && 'यहाँ आपकी जेनरेट की गई कहानी दिखेगी'}
                      {selectedType === 'lyrics' && 'यहाँ आपके जेनरेट किए गए गीत के बोल दिखेंगे'}
                      {selectedType === 'poem' && 'यहाँ आपकी जेनरेट की गई कविता दिखेगी'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>आपकी क्रिएशन्स ({projects.length})</span>
                <Badge className="bg-green-500">
                  {projects.filter(p => p.status === 'completed').length} Completed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <div className="text-center py-12">
                  <Palette className="h-16 w-16 mx-auto text-pink-400/50 mb-4" />
                  <p className="text-white/70 text-lg">अभी तक कोई क्रिएशन नहीं बनाई गई</p>
                  <Button 
                    onClick={() => setActiveTab('create')}
                    className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500"
                  >
                    पहली क्रिएशन बनाएं
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => {
                    const typeInfo = creativeTypes.find(t => t.id === project.type);
                    const TypeIcon = typeInfo?.icon || Image;
                    
                    return (
                      <Card key={project.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <TypeIcon className="h-5 w-5 text-pink-400" />
                              <Badge className={`bg-gradient-to-r ${typeInfo?.color} text-white text-xs`}>
                                {typeInfo?.name}
                              </Badge>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => downloadContent(project)}
                                className="h-8 w-8 p-0 text-white hover:bg-white/20"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => shareContent(project)}
                                className="h-8 w-8 p-0 text-white hover:bg-white/20"
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <h4 className="text-white font-semibold text-sm mb-2">{project.title}</h4>
                          <p className="text-white/70 text-xs mb-3 line-clamp-2">{project.description}</p>
                          
                          <div className="bg-white/5 rounded p-3 mb-3 max-h-32 overflow-y-auto">
                            <p className="text-white/80 text-xs whitespace-pre-wrap">{project.content}</p>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/50">{project.createdAt}</span>
                            <div className="flex gap-2">
                              {project.style && (
                                <Badge className="bg-blue-500/20 text-blue-300 text-xs">
                                  {project.style}
                                </Badge>
                              )}
                              {project.mood && (
                                <Badge className="bg-purple-500/20 text-purple-300 text-xs">
                                  {project.mood}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">प्रीमेड टेम्प्लेट्स</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => {
                  const IconComponent = template.icon;
                  return (
                    <Card key={template.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                          onClick={() => useTemplate(template)}>
                      <CardContent className="p-6 text-center">
                        <IconComponent className={`h-12 w-12 mx-auto mb-4 ${template.color}`} />
                        <h3 className="text-white font-semibold text-lg mb-2">{template.name}</h3>
                        <p className="text-white/70 text-sm mb-4">{template.description}</p>
                        <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                          {template.type}
                        </Badge>
                        <div className="mt-4">
                          <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                            इस्तेमाल करें
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};