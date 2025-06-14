
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon, FileText } from "lucide-react";

const mockImages = [
  {
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    desc: "AI generated nature"
  },
  {
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    desc: "Woman using laptop"
  }
];

const mockTemplates = [
  { title: "Business Email", desc: "Professional mail draft" },
  { title: "Story Prompt", desc: "Adventure creative starter" }
];

export function AppGallery() {
  return (
    <div className="space-y-6 p-4">
      <Card className="bg-gradient-to-r from-blue-900/40 to-purple-800/30 border-0">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Generated Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {mockImages.map((img, idx) => (
              <img key={idx} src={img.url} alt={img.desc} className="rounded-lg shadow aspect-video object-cover border border-gray-700"/>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-fuchsia-900/40 to-slate-900/30 border-0">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Saved Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {mockTemplates.map((t, idx) => (
              <div key={idx} className="bg-gray-700 rounded px-4 py-2 text-white text-xs">{t.title}: <span className="text-gray-300">{t.desc}</span></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
