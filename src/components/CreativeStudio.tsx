import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { 
  Palette, 
  Music, 
  Video, 
  Image, 
  FileText, 
  Mic,
  Download,
  Share2,
  Sparkles,
  Brush,
  PenTool,
  Wand2,
  Heart,
  Star,
  BookOpen,
  Film,
  Loader2
} from "lucide-react";

interface CreativeProject {
  id: string;
  type: 'image' | 'music' | 'video' | 'story' | 'lyrics' | 'poem';
  title: string;
  description: string;
  content: string;
  status: 'generating' | 'completed' | 'failed';
  style?: string;
  mood?: string;
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
  const [selectedType, setSelectedType] = useState<'story' | 'lyrics' | 'poem'>('story');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const creativeTypes = [
    { id: 'story', name: 'कहानी लिखें', icon: BookOpen, color: 'from-emerald-500 to-teal-500' },
    { id: 'lyrics', name: 'गीत के बोल', icon: Mic, color: 'from-teal-500 to-cyan-500' },
    { id: 'poem', name: 'कविता रचना', icon: PenTool, color: 'from-cyan-500 to-emerald-500' }
  ];

  const templates: CreativeTemplate[] = [
    {
      id: '1',
      name: 'रोमांटिक गीत',
      type: 'lyrics',
      description: 'प्रेम भरे गीत के बोल',
      prompt: 'एक खूबसूरत रोमांटिक गीत लिखें जो दिल को छू जाए, प्यार और मोहब्बत के बारे में',
      icon: Heart,
      color: 'text-pink-400'
    },
    {
      id: '2', 
      name: 'प्रेरणादायक कहानी',
      type: 'story',
      description: 'मोटिवेशनल कहानी',
      prompt: 'एक प्रेरणादायक कहानी लिखें जो जीवन में सफलता और मेहनत का संदेश दे',
      icon: Star,
      color: 'text-emerald-400'
    },
    {
      id: '3',
      name: 'भावनात्मक कविता', 
      type: 'poem',
      description: 'गहरी भावनाओं की कविता',
      prompt: 'एक भावनात्मक कविता लिखें जो दिल की गहराई से निकली हो, प्रकृति और जीवन के बारे में',
      icon: PenTool,
      color: 'text-teal-400'
    },
    {
      id: '4',
      name: 'देशभक्ति गीत',
      type: 'lyrics', 
      description: 'भारत माता के लिए',
      prompt: 'एक देशभक्ति गीत लिखें जो भारत की महिमा और गौरव का वर्णन करे',
      icon: Star,
      color: 'text-orange-400'
    },
    {
      id: '5',
      name: 'बच्चों की कहानी',
      type: 'story',
      description: 'मजेदार और शिक्षाप्रद',
      prompt: 'बच्चों के लिए एक मजेदार और शिक्षाप्रद कहानी लिखें जिसमें जानवर हों',
      icon: BookOpen,
      color: 'text-cyan-400'
    },
    {
      id: '6',
      name: 'प्रेम कविता',
      type: 'poem',
      description: 'इश्क़ और मोहब्बत',
      prompt: 'एक सुंदर प्रेम कविता लिखें जो प्रेमी के दिल की बात कहे',
      icon: Heart,
      color: 'text-red-400'
    }
  ];

  const styleOptions = {
    story: ['Romance', 'Adventure', 'Mystery', 'Fantasy', 'Moral', 'Comedy'],
    lyrics: ['Bollywood', 'Classical', 'Pop', 'Folk', 'Romantic', 'Sad'],
    poem: ['Ghazal', 'Free Verse', 'Doha', 'Haiku', 'Nazm', 'Bhajan']
  };

  const moodOptions = ['Happy', 'Romantic', 'Sad', 'Energetic', 'Peaceful', 'Dramatic', 'Nostalgic', 'Motivational'];

  const generateCreativeContent = async () => {
    if (!prompt.trim()) {
      toast.error("कृपया प्रॉम्प्ट डालें");
      return;
    }

    setIsGenerating(true);

    try {
      const typeInfo = creativeTypes.find(t => t.id === selectedType);
      const typeLabel = typeInfo?.name || selectedType;

      const { data, error } = await supabase.functions.invoke('tezu-creative', {
        body: { 
          prompt: prompt,
          type: selectedType,
          style: selectedStyle,
          mood: selectedMood
        }
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      const newProject: CreativeProject = {
        id: Date.now().toString(),
        type: selectedType,
        title: `${typeLabel} - ${new Date().toLocaleDateString('hi-IN')}`,
        description: prompt,
        content: data.content || "Content generation failed",
        status: 'completed',
        style: selectedStyle,
        mood: selectedMood,
        createdAt: new Date().toLocaleString('hi-IN'),
      };

      setProjects(prev => [newProject, ...prev]);
      setPrompt('');
      toast.success("🎨 Content सफलतापूर्वक बना!");
      setActiveTab('gallery');
    } catch (error: any) {
      console.error("Error generating content:", error);
      toast.error("Content बनाने में error आया");
    } finally {
      setIsGenerating(false);
    }
  };

  const useTemplate = (template: CreativeTemplate) => {
    setSelectedType(template.type as any);
    setPrompt(template.prompt);
    setActiveTab('create');
    toast.success(`✨ "${template.name}" template लोड किया गया`);
  };

  const downloadContent = (project: CreativeProject) => {
    const element = document.createElement('a');
    const file = new Blob([project.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `tezuai-${project.type}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("📥 File download हो गई!");
  };

  const shareContent = async (project: CreativeProject) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.content,
        });
      } catch (err) {
        await navigator.clipboard.writeText(project.content);
        toast.success("📋 Content copy हो गया!");
      }
    } else {
      await navigator.clipboard.writeText(project.content);
      toast.success("📋 Content copy हो गया!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-teal-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white/10 backdrop-blur-md border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <Palette className="h-8 w-8 text-emerald-400" />
              ✨ TezuAI Creative Studio 2026
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                तेज़ू
              </Badge>
            </CardTitle>
            <p className="text-emerald-200/80 mt-2">AI से कहानी, कविता, गीत बनाएं - Hindi में!</p>
          </CardHeader>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'create', label: '✏️ क्रिएट करें', icon: Sparkles },
            { id: 'gallery', label: '🖼️ गैलरी', icon: Image },
            { id: 'templates', label: '📝 टेम्प्लेट्स', icon: Brush }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id as any)}
              className={activeTab === tab.id 
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white" 
                : "border-white/30 text-white hover:bg-white/10"}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Create Tab */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-emerald-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-emerald-400" />
                  Content Type चुनें
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {creativeTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <Button
                        key={type.id}
                        variant={selectedType === type.id ? "default" : "outline"}
                        onClick={() => setSelectedType(type.id as any)}
                        className={`h-24 flex flex-col gap-2 ${
                          selectedType === type.id 
                            ? `bg-gradient-to-r ${type.color} border-0` 
                            : 'border-white/30 text-white hover:bg-white/10'
                        }`}
                      >
                        <IconComponent className="h-8 w-8" />
                        <span className="text-sm">{type.name}</span>
                      </Button>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-white font-medium mb-2 block">🎨 Style</label>
                    <div className="flex flex-wrap gap-2">
                      {styleOptions[selectedType]?.map((style) => (
                        <Badge
                          key={style}
                          className={`cursor-pointer transition-all ${
                            selectedStyle === style 
                              ? 'bg-emerald-500 text-white' 
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
                    <label className="text-white font-medium mb-2 block">🎭 Mood</label>
                    <div className="flex flex-wrap gap-2">
                      {moodOptions.map((mood) => (
                        <Badge
                          key={mood}
                          className={`cursor-pointer transition-all ${
                            selectedMood === mood 
                              ? 'bg-teal-500 text-white' 
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
                    <label className="text-white font-medium mb-2 block">📝 आपका Prompt (Hindi/English)</label>
                    <Textarea
                      placeholder={`${selectedType === 'story' ? 'कहानी का विषय बताएं... जैसे: एक गरीब लड़के की सफलता की कहानी' :
                        selectedType === 'lyrics' ? 'गीत का विषय बताएं... जैसे: प्यार और बिछड़ने का दर्द' :
                        'कविता का विषय बताएं... जैसे: प्रकृति की सुंदरता'}`}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-32 bg-white/10 text-white placeholder-white/50 border-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <Button
                    onClick={generateCreativeContent}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg font-semibold shadow-lg shadow-emerald-500/25"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        TezuAI बना रहा है...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        ✨ AI से बनाएं
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-emerald-500/20">
              <CardHeader>
                <CardTitle className="text-white">👁️ Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white/5 rounded-lg p-6 min-h-80 flex items-center justify-center border border-emerald-500/10">
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      {selectedType === 'story' && '📖'}
                      {selectedType === 'lyrics' && '🎤'}
                      {selectedType === 'poem' && '✍️'}
                    </div>
                    <p className="text-white/70 text-lg">
                      {selectedType === 'story' && 'यहाँ आपकी AI-generated कहानी दिखेगी'}
                      {selectedType === 'lyrics' && 'यहाँ आपके AI-generated गीत के बोल दिखेंगे'}
                      {selectedType === 'poem' && 'यहाँ आपकी AI-generated कविता दिखेगी'}
                    </p>
                    <p className="text-emerald-300/60 text-sm mt-2">
                      Prompt लिखें और "AI से बनाएं" दबाएं
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <Card className="bg-white/10 backdrop-blur-md border-emerald-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>🖼️ आपकी क्रिएशन्स ({projects.length})</span>
                <Badge className="bg-emerald-500">
                  {projects.filter(p => p.status === 'completed').length} Completed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <div className="text-center py-16 text-white/60">
                  <Sparkles className="h-16 w-16 mx-auto mb-4 text-emerald-400/50" />
                  <p className="text-xl">अभी तक कोई creation नहीं</p>
                  <p className="text-sm mt-2">Create टैब में जाकर अपनी पहली creation बनाएं!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <Card key={project.id} className="bg-white/5 border-emerald-500/20">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => downloadContent(project)}
                              className="text-white hover:bg-white/10"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => shareContent(project)}
                              className="text-white hover:bg-white/10"
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-white/60 text-sm">{project.createdAt}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-white/5 rounded-lg p-4 max-h-48 overflow-y-auto">
                          <p className="text-white/90 whitespace-pre-wrap text-sm">{project.content}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <Card className="bg-white/10 backdrop-blur-md border-emerald-500/20">
            <CardHeader>
              <CardTitle className="text-white">📝 Ready-to-Use Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => {
                  const IconComponent = template.icon;
                  return (
                    <Card
                      key={template.id}
                      className="bg-white/5 border-emerald-500/20 hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => useTemplate(template)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg bg-white/10`}>
                            <IconComponent className={`h-5 w-5 ${template.color}`} />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{template.name}</h3>
                            <p className="text-white/60 text-sm">{template.description}</p>
                          </div>
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
