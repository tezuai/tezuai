
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  Plus, 
  Share, 
  Crown, 
  MessageCircle,
  Video,
  Mic,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CollaborationSession {
  id: string;
  name: string;
  participants: any[];
  createdBy: string;
  isActive: boolean;
  lastActivity: Date;
}

interface CollaborationHubProps {
  onJoinSession: (sessionId: string) => void;
  onCreateSession: (session: CollaborationSession) => void;
}

export function CollaborationHub({ onJoinSession, onCreateSession }: CollaborationHubProps) {
  const [sessionName, setSessionName] = useState("");
  const [sessionCode, setSessionCode] = useState("");
  const [activeSessions, setActiveSessions] = useState<CollaborationSession[]>([
    {
      id: "demo-1",
      name: "AI Development Team",
      participants: [
        { id: "1", name: "Rahul", avatar: "", isOnline: true },
        { id: "2", name: "Priya", avatar: "", isOnline: true },
        { id: "3", name: "Arjun", avatar: "", isOnline: false }
      ],
      createdBy: "Rahul",
      isActive: true,
      lastActivity: new Date()
    }
  ]);
  const { toast } = useToast();

  const handleCreateSession = () => {
    if (!sessionName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a session name",
        variant: "destructive"
      });
      return;
    }

    const newSession: CollaborationSession = {
      id: Date.now().toString(),
      name: sessionName,
      participants: [],
      createdBy: "You",
      isActive: true,
      lastActivity: new Date()
    };

    setActiveSessions(prev => [newSession, ...prev]);
    onCreateSession(newSession);
    setSessionName("");
    
    toast({
      title: "Session Created! 🎉",
      description: `Created collaboration session: ${sessionName}`,
    });
  };

  const handleJoinSession = () => {
    if (!sessionCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a session code",
        variant: "destructive"
      });
      return;
    }

    onJoinSession(sessionCode);
    setSessionCode("");
    
    toast({
      title: "Joining Session...",
      description: "Connecting to collaboration session",
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">👥 Collaboration Hub</h3>
        <p className="text-sm text-gray-400">Work together in real-time</p>
      </div>

      {/* Create New Session */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Session name..."
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            className="bg-gray-700/50 border-gray-600 text-white"
          />
          <Button 
            onClick={handleCreateSession}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Create New Session
          </Button>
        </CardContent>
      </Card>

      {/* Join Existing Session */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Share className="w-5 h-5" />
            Join Session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Enter session code..."
            value={sessionCode}
            onChange={(e) => setSessionCode(e.target.value)}
            className="bg-gray-700/50 border-gray-600 text-white"
          />
          <Button 
            onClick={handleJoinSession}
            variant="outline"
            className="w-full border-gray-600"
          >
            Join Session
          </Button>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="space-y-3">
              {activeSessions.map((session) => (
                <div key={session.id} className="p-3 bg-gray-700/50 rounded border border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{session.name}</h4>
                    <Badge className="bg-green-500/20 text-green-400">
                      {session.isActive ? "Active" : "Idle"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-gray-400">by {session.createdBy}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {session.participants.slice(0, 3).map((participant, index) => (
                        <Avatar key={index} className="w-6 h-6 border-2 border-gray-700">
                          <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600">
                            {participant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {session.participants.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-gray-700 flex items-center justify-center">
                          <span className="text-xs text-gray-300">+{session.participants.length - 3}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <MessageCircle className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Video className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Mic className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
