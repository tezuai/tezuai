
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Share2,
  Copy,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
  QrCode,
  Gift,
  Users,
  Star,
} from "lucide-react";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conversationId?: string;
  conversationTitle?: string;
}

export function ShareDialog({ open, onOpenChange, conversationId, conversationTitle }: ShareDialogProps) {
  const [referralCode] = useState("AI" + Math.random().toString(36).substr(2, 6).toUpperCase());
  const { toast } = useToast();

  const shareUrl = conversationId 
    ? `${window.location.origin}/chat/${conversationId}`
    : `${window.location.origin}?ref=${referralCode}`;

  const shareText = conversationId
    ? `Check out this amazing AI conversation: "${conversationTitle}"`
    : `I'm using India's best free AI Assistant! Get 10 free messages daily. Join me with my referral code: ${referralCode}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "text-green-400",
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        window.open(whatsappUrl, '_blank');
      }
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "text-blue-400",
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, '_blank');
      }
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(facebookUrl, '_blank');
      }
    },
    {
      name: "Email",
      icon: Mail,
      color: "text-gray-400",
      action: () => {
        const emailUrl = `mailto:?subject=${encodeURIComponent('Amazing AI Assistant')}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        window.open(emailUrl);
      }
    }
  ];

  const benefits = [
    "Friend ko 5 extra messages daily",
    "Aapko bhi 5 extra messages",
    "Special features early access",
    "Community leaderboard mein name"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            {conversationId ? "Share Conversation" : "Invite Friends & Earn Rewards"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!conversationId && (
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-lg border border-blue-500/30">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Referral Rewards</span>
                <Badge className="bg-yellow-600 text-white text-xs">New!</Badge>
              </div>
              
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              {conversationId ? "Conversation Link" : "Your Referral Link"}
            </label>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="bg-gray-800 border-gray-600 text-white"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(shareUrl)}
                className="border-gray-600 text-gray-300 hover:text-white"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {!conversationId && (
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Your Referral Code</label>
              <div className="flex gap-2">
                <Input
                  value={referralCode}
                  readOnly
                  className="bg-gray-800 border-gray-600 text-white font-mono text-center text-lg"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(referralCode)}
                  className="border-gray-600 text-gray-300 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <div>
            <label className="text-sm text-gray-400 mb-3 block">Share on Social Media</label>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  variant="outline"
                  onClick={option.action}
                  className="border-gray-600 text-gray-300 hover:text-white justify-start"
                >
                  <option.icon className={`w-4 h-4 mr-2 ${option.color}`} />
                  {option.name}
                </Button>
              ))}
            </div>
          </div>

          {!conversationId && (
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm font-medium">Referral Stats</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400">0</div>
                  <div className="text-xs text-gray-400">Friends Invited</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">0</div>
                  <div className="text-xs text-gray-400">Extra Messages</div>
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 text-center">
            {conversationId 
              ? "Share this conversation with friends to show them AI's capabilities"
              : "Earn rewards by inviting friends. More friends = more free messages!"
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
