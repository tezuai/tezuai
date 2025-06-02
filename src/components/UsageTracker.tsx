
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/contexts/SubscriptionContext";
import {
  MessageSquare,
  FileText,
  Zap,
  Crown,
  TrendingUp,
} from "lucide-react";

interface UsageTrackerProps {
  onUpgrade: () => void;
}

export function UsageTracker({ onUpgrade }: UsageTrackerProps) {
  const { currentPlan, usage, features } = useSubscription();

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-400";
    if (percentage >= 70) return "text-yellow-400";
    return "text-green-400";
  };

  const formatLimit = (limit: number) => {
    return limit === -1 ? "Unlimited" : limit.toString();
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Usage Overview
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`${
              currentPlan === 'free' ? 'border-gray-500 text-gray-400' :
              currentPlan === 'pro' ? 'border-blue-500 text-blue-400' :
              'border-purple-500 text-purple-400'
            }`}
          >
            {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Messages Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Daily Messages</span>
            </div>
            <span className={`text-sm font-medium ${
              usage.messagesLimit === -1 ? 'text-green-400' : 
              getUsageColor(getUsagePercentage(usage.messagesUsed, usage.messagesLimit))
            }`}>
              {usage.messagesUsed} / {formatLimit(usage.messagesLimit)}
            </span>
          </div>
          {usage.messagesLimit !== -1 && (
            <Progress 
              value={getUsagePercentage(usage.messagesUsed, usage.messagesLimit)} 
              className="h-2"
            />
          )}
          {features.unlimitedChat && (
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-green-400" />
              <span className="text-xs text-green-400">Unlimited messaging</span>
            </div>
          )}
        </div>

        {/* Templates Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Custom Templates</span>
            </div>
            <span className={`text-sm font-medium ${
              usage.templatesLimit === -1 ? 'text-green-400' : 
              getUsageColor(getUsagePercentage(usage.templatesUsed, usage.templatesLimit))
            }`}>
              {usage.templatesUsed} / {formatLimit(usage.templatesLimit)}
            </span>
          </div>
          {usage.templatesLimit !== -1 && (
            <Progress 
              value={getUsagePercentage(usage.templatesUsed, usage.templatesLimit)} 
              className="h-2"
            />
          )}
          {features.customTemplates && (
            <div className="flex items-center gap-1">
              <Crown className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-purple-400">Unlimited templates</span>
            </div>
          )}
        </div>

        {/* Upgrade Prompt for Free Users */}
        {currentPlan === 'free' && (
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/20">
            <div className="text-sm text-white mb-2">
              🚀 Unlock unlimited features with Pro!
            </div>
            <ul className="text-xs text-gray-300 space-y-1 mb-3">
              <li>• Unlimited daily messages</li>
              <li>• Access to all AI models (GPT-4, Claude, Gemini)</li>
              <li>• Voice input/output features</li>
              <li>• File upload & analysis</li>
            </ul>
            <Button 
              onClick={onUpgrade}
              size="sm" 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Upgrade to Pro - ₹999/month
            </Button>
          </div>
        )}

        {/* Feature Status */}
        <div className="space-y-2 pt-2 border-t border-gray-700">
          <div className="text-sm font-medium text-gray-300 mb-2">Available Features:</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className={`flex items-center gap-1 ${features.allAIModels ? 'text-green-400' : 'text-gray-500'}`}>
              <span className={`w-2 h-2 rounded-full ${features.allAIModels ? 'bg-green-400' : 'bg-gray-500'}`} />
              All AI Models
            </div>
            <div className={`flex items-center gap-1 ${features.voiceFeatures ? 'text-green-400' : 'text-gray-500'}`}>
              <span className={`w-2 h-2 rounded-full ${features.voiceFeatures ? 'bg-green-400' : 'bg-gray-500'}`} />
              Voice Features
            </div>
            <div className={`flex items-center gap-1 ${features.fileUpload ? 'text-green-400' : 'text-gray-500'}`}>
              <span className={`w-2 h-2 rounded-full ${features.fileUpload ? 'bg-green-400' : 'bg-gray-500'}`} />
              File Upload
            </div>
            <div className={`flex items-center gap-1 ${features.analytics ? 'text-green-400' : 'text-gray-500'}`}>
              <span className={`w-2 h-2 rounded-full ${features.analytics ? 'bg-green-400' : 'bg-gray-500'}`} />
              Analytics
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
