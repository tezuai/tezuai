
import { useState } from "react";
import { Zap, Lightbulb, Code, FileText, Mail, Calendar, Calculator, Translate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface QuickActionsProps {
  onActionSelect: (prompt: string) => void;
}

const quickActions = [
  {
    icon: Lightbulb,
    title: "Brainstorm Ideas",
    prompt: "Help me brainstorm creative ideas for:",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Code,
    title: "Code Review",
    prompt: "Please review this code and suggest improvements:",
    color: "from-green-500 to-blue-500"
  },
  {
    icon: FileText,
    title: "Write Content",
    prompt: "Help me write professional content for:",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Mail,
    title: "Email Draft",
    prompt: "Help me draft a professional email for:",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Calculator,
    title: "Data Analysis",
    prompt: "Help me analyze this data and provide insights:",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Translate,
    title: "Translation",
    prompt: "Please translate this text:",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Calendar,
    title: "Plan Schedule",
    prompt: "Help me create a schedule or plan for:",
    color: "from-teal-500 to-green-500"
  },
  {
    icon: Zap,
    title: "Quick Question",
    prompt: "I have a quick question about:",
    color: "from-orange-500 to-red-500"
  }
];

export function QuickActions({ onActionSelect }: QuickActionsProps) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5" />
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50 transition-all cursor-pointer group"
            onClick={() => onActionSelect(action.prompt)}
          >
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-sm font-medium text-white mb-1">{action.title}</h4>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
