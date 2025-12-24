import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Image as ImageIcon, 
  Download, 
  Sparkles,
  Palette,
  Wand2,
  Loader2,
  Share2
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const imageStyles = [
  { id: "realistic", name: "Realistic", emoji: "📷" },
  { id: "anime", name: "Anime", emoji: "🎌" },
  { id: "digital-art", name: "Digital Art", emoji: "🖼️" },
  { id: "oil-painting", name: "Oil Painting", emoji: "🎨" },
  { id: "watercolor", name: "Watercolor", emoji: "💧" },
  { id: "3d-render", name: "3D Render", emoji: "🔮" },
  { id: "sketch", name: "Sketch", emoji: "✏️" },
  { id: "fantasy", name: "Fantasy", emoji: "🧙" }
];

export function ZentaraImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [imageHistory, setImageHistory] = useState<Array<{url: string, prompt: string, style: string}>>([]);

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error("कृपया image का description डालें");
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt, style }
      });

      if (error) throw error;

      if (data.error) {
        if (data.error.includes("Rate limit")) {
          toast.error("बहुत जल्दी request भेजी गई। कुछ देर बाद try करें।");
        } else if (data.error.includes("Credits")) {
          toast.error("Credits खत्म हो गए। Credits add करें।");
        } else {
          toast.error(data.error);
        }
        return;
      }

      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setImageHistory(prev => [{
          url: data.imageUrl,
          prompt,
          style
        }, ...prev.slice(0, 5)]);
        toast.success("🎨 Image बन गई!");
      }
    } catch (error: any) {
      console.error("Error generating image:", error);
      toast.error("Image generate करने में error आया");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = async () => {
    if (!generatedImage) return;
    
    try {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `zentara-ai-${Date.now()}.png`;
      link.click();
      toast.success("📥 Image download हो गई!");
    } catch (error) {
      toast.error("Download में error");
    }
  };

  const shareImage = async () => {
    if (!generatedImage) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Zentara AI Generated Image',
          text: prompt,
          url: generatedImage
        });
      } else {
        await navigator.clipboard.writeText(generatedImage);
        toast.success("🔗 Link copy हो गया!");
      }
    } catch (error) {
      toast.error("Share में error");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30">
            <Palette className="w-8 h-8 text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Zentara Image Generator
          </h2>
        </div>
        <p className="text-muted-foreground">AI से beautiful images बनाएं ✨</p>
      </div>

      {/* Generator Card */}
      <Card className="bg-gradient-to-br from-background/95 to-secondary/50 border-pink-500/20 shadow-xl shadow-pink-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Wand2 className="w-5 h-5 text-pink-400" />
            नई Image बनाएं
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Prompt Input */}
          <div className="space-y-2">
            <Label className="text-foreground">Image Description (Hindi/English)</Label>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="एक सुंदर पहाड़ों में सूर्यास्त... / A beautiful sunset over mountains..."
              className="bg-background/50 border-border/50 focus:border-pink-500"
            />
          </div>

          {/* Style Selection */}
          <div className="space-y-3">
            <Label className="text-foreground">Style चुनें</Label>
            <div className="grid grid-cols-4 gap-2">
              {imageStyles.map((s) => (
                <Button
                  key={s.id}
                  variant={style === s.id ? "default" : "outline"}
                  onClick={() => setStyle(s.id)}
                  className={`h-auto py-3 flex flex-col gap-1 ${
                    style === s.id 
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0" 
                      : "hover:border-pink-500/50"
                  }`}
                >
                  <span className="text-xl">{s.emoji}</span>
                  <span className="text-xs">{s.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateImage}
            disabled={isGenerating || !prompt.trim()}
            className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-semibold text-lg shadow-lg shadow-purple-500/25"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Image बन रही है...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Image ✨
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Image Display */}
      {generatedImage && (
        <Card className="bg-gradient-to-br from-background/95 to-secondary/50 border-green-500/20 shadow-xl shadow-green-500/5 overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <ImageIcon className="w-5 h-5 text-green-400" />
                Generated Image
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={downloadImage}
                  variant="outline"
                  size="sm"
                  className="border-green-500/30 hover:bg-green-500/10"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button
                  onClick={shareImage}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30 hover:bg-purple-500/10"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={generatedImage}
                alt="AI Generated"
                className="w-full rounded-xl shadow-2xl"
              />
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                {imageStyles.find(s => s.id === style)?.name}
              </Badge>
            </div>
            <div className="mt-4 p-4 bg-background/50 rounded-lg border border-border/50">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Prompt:</span> {prompt}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image History */}
      {imageHistory.length > 0 && (
        <Card className="bg-gradient-to-br from-background/95 to-secondary/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {imageHistory.map((img, index) => (
                <div 
                  key={index}
                  className="relative group cursor-pointer rounded-lg overflow-hidden"
                  onClick={() => setGeneratedImage(img.url)}
                >
                  <img 
                    src={img.url} 
                    alt={img.prompt}
                    className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <span className="text-white text-xs truncate">{img.prompt}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
