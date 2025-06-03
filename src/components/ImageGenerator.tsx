
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Image as ImageIcon, 
  Download, 
  Sparkles,
  Palette,
  Camera,
  Wand2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageGeneratorProps {
  isEnabled: boolean;
}

export function ImageGenerator({ isEnabled }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [size, setSize] = useState("1024x1024");
  const [quality, setQuality] = useState([80]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const { toast } = useToast();

  const imageStyles = [
    { id: "realistic", name: "Realistic", description: "Photo-realistic images" },
    { id: "artistic", name: "Artistic", description: "Creative and artistic style" },
    { id: "cartoon", name: "Cartoon", description: "Cartoon and animated style" },
    { id: "abstract", name: "Abstract", description: "Abstract and modern art" },
    { id: "vintage", name: "Vintage", description: "Retro and vintage style" }
  ];

  const imageSizes = [
    { id: "512x512", name: "Square Small (512x512)" },
    { id: "1024x1024", name: "Square Large (1024x1024)" },
    { id: "1920x1080", name: "Landscape HD (1920x1080)" },
    { id: "1080x1920", name: "Portrait HD (1080x1920)" }
  ];

  const generateImage = async () => {
    if (!isEnabled) {
      toast({
        title: "Premium Feature 🔒",
        description: "AI Image Generator requires authentication. Please login first!",
        variant: "destructive"
      });
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description for your image",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulate image generation
    setTimeout(() => {
      // Generate a placeholder image URL based on prompt
      const encodedPrompt = encodeURIComponent(prompt);
      const [width, height] = size.split('x');
      const mockImageUrl = `https://picsum.photos/${width}/${height}?random=${Date.now()}`;
      
      setGeneratedImage(mockImageUrl);
      setIsGenerating(false);
      
      toast({
        title: "Image Generated! 🎨",
        description: "Your AI-generated image is ready!",
      });
    }, 3000);
  };

  const downloadImage = async () => {
    if (generatedImage) {
      try {
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tezu-ai-generated-${Date.now()}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "Image Downloaded! 📥",
          description: "Image saved to your device",
        });
      } catch (error) {
        toast({
          title: "Download Error",
          description: "Failed to download image",
          variant: "destructive"
        });
      }
    }
  };

  if (!isEnabled) {
    return (
      <div className="text-center text-gray-400 p-8">
        <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold mb-2">AI Image Generator</h3>
        <p className="text-sm">Login to access AI-powered image generation</p>
        <Badge className="mt-2 bg-purple-500/20 text-purple-400">Premium Feature</Badge>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">🎨 AI Image Generator</h3>
        <p className="text-sm text-gray-400">Create stunning images with AI</p>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Image Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">Image Description</Label>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate... (e.g., 'A beautiful sunset over mountains')"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <Label className="text-white">Art Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {imageStyles.map((styleOption) => (
                  <SelectItem key={styleOption.id} value={styleOption.id}>
                    <div>
                      <div className="font-medium">{styleOption.name}</div>
                      <div className="text-xs text-gray-400">{styleOption.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-white">Image Size</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {imageSizes.map((sizeOption) => (
                  <SelectItem key={sizeOption.id} value={sizeOption.id}>
                    {sizeOption.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-white">Quality: {quality[0]}%</Label>
            <Slider
              value={quality}
              onValueChange={setQuality}
              min={50}
              max={100}
              step={10}
              className="mt-2"
            />
          </div>

          <Button
            onClick={generateImage}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
          >
            {isGenerating ? (
              <Wand2 className="w-4 h-4 mr-2 animate-pulse" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            {isGenerating ? "Generating Image..." : "Generate Image"}
          </Button>
        </CardContent>
      </Card>

      {generatedImage && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Generated Image
              </CardTitle>
              <Button
                onClick={downloadImage}
                variant="outline"
                size="sm"
                className="border-gray-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <img
                src={generatedImage}
                alt="AI Generated"
                className="w-full rounded-lg shadow-lg"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
              <Badge className="absolute top-2 right-2 bg-green-500/20 text-green-400">
                {style} • {size}
              </Badge>
            </div>
            <div className="mt-3 p-3 bg-gray-900/50 rounded">
              <p className="text-sm text-gray-300">
                <strong>Prompt:</strong> {prompt}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
