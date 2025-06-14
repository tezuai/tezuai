
import { Button } from "@/components/ui/button";
import { FileText, Code, Brain, Image as ImageIcon, Video as VideoIcon } from "lucide-react";

const templates = [
  {
    icon: FileText,
    label: "कहानी लिखवाएं",
    prompt: "Mujhe ek creative story likho"
  },
  {
    icon: Code,
    label: "कोड मदद",
    prompt: "Ek code example bana ke dikhao"
  },
  {
    icon: Brain,
    label: "समझाओ (Explain)",
    prompt: "Mujhe deep explanation do"
  },
  {
    icon: ImageIcon,
    label: "AI इमेज बनवाएं",
    prompt: "AI image generate karo: ek khoobsurat landscape"
  },
  {
    icon: VideoIcon,
    label: "वीडियो बनवाएं (Mock)",
    prompt: "AI video generate karo: short motivational reel"
  }
];

export function QuickTemplates({ onTemplate }: { onTemplate: (prompt: string) => void }) {
  return (
    <div className="flex gap-3 mt-3 flex-wrap">
      {templates.map((t, i) => (
        <Button
          key={i}
          variant="outline"
          size="sm"
          onClick={() => onTemplate(t.prompt)}
          className="flex items-center gap-1 border-gray-500 hover:bg-blue-50 text-gray-700"
        >
          <t.icon className="w-4 h-4" />
          <span className="text-xs">{t.label}</span>
        </Button>
      ))}
    </div>
  );
}
