
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Video, 
  MessageSquare, 
  Share2,
  Monitor,
  Phone,
  Mic,
  MicOff,
  VideoOff,
  Settings,
  UserPlus,
  Crown,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CollaborationSession {
  id: string;
  name: string;
  participants: number;
  maxParticipants: number;
  status: 'active' | 'waiting' | 'ended';
  type: 'video' | 'chat' | 'screen-share';
  host: string;
  duration: string;
}

export function RealTimeCollaboration() {
  const [sessions, setSessions] = useState<CollaborationSession[]>([
    {
      id: '1',
      name: 'AI Strategy Meeting',
      participants: 3,
      maxParticipants: 10,
      status: 'active',
      type: 'video',
      host: 'Rahul Kumar',
      duration: '45 min'
    },
    {
      id: '2',
      name: 'Code Review Session',
      participants: 2,
      maxParticipants: 5,
      status: 'waiting',
      type: 'screen-share',
      host: 'Priya Sharma',
      duration: '30 min'
    }
  ]);

  const [newSession, setNewSession] = useState({
    name: '',
    type: 'video' as 'video' | 'chat' | 'screen-share',
    maxParticipants: 5
  });

  const { toast } = useToast();

  const handleCreateSession = () => {
    if (!newSession.name) {
      toast({
        title: "Session Name Required",
        description: "Please enter a session name",
        variant: "destructive"
      });
      return;
    }

    const session: CollaborationSession = {
      id: Date.now().toString(),
      name: newSession.name,
      participants: 1,
      maxParticipants: newSession.maxParticipants,
      status: 'waiting',
      type: newSession.type,
      host: 'You',
      duration: '0 min'
    };

    setSessions(prev => [session, ...prev]);
    setNewSession({ name: '', type: 'video', maxParticipants: 5 });
    
    toast({
      title: "🎉 Session Created!",
      description: "Collaboration session is ready for participants",
    });
  };

  const joinSession = (sessionId: string) => {
    setSessions(prev => prev.map(s => 
      s.id === sessionId 
        ? { ...s, participants: s.participants + 1, status: 'active' as const }
        : s
    ));
    
    toast({
      title: "Joined Session! 🎯",
      description: "You're now part of the collaboration",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">👥 Real-Time Collaboration</h3>
        <p className="text-sm text-gray-400">Work together in secure sessions</p>
      </div>

      {/* Create New Session */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-purple-800/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Create Collaboration Session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Session name (e.g., Team Meeting)"
            value={newSession.name}
            onChange={(e) => setNewSession(prev => ({ ...prev, name: e.target.value }))}
            className="bg-gray-700/50 border-purple-500/30 text-white"
          />
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={newSession.type === 'video' ? 'default' : 'outline'}
              onClick={() => setNewSession(prev => ({ ...prev, type: 'video' }))}
              className="text-xs"
            >
              <Video className="w-3 h-3 mr-1" />
              Video
            </Button>
            <Button
              variant={newSession.type === 'screen-share' ? 'default' : 'outline'}
              onClick={() => setNewSession(prev => ({ ...prev, type: 'screen-share' }))}
              className="text-xs"
            >
              <Monitor className="w-3 h-3 mr-1" />
              Screen
            </Button>
          </div>
          <Button 
            onClick={handleCreateSession}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <Users className="w-4 h-4 mr-2" />
            Create Session
          </Button>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <div className="space-y-3">
        {sessions.map((session) => (
          <Card key={session.id} className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    session.type === 'video' 
                      ? 'bg-blue-500/20 text-blue-400'
                      : session.type === 'screen-share'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {session.type === 'video' && <Video className="w-5 h-5" />}
                    {session.type === 'screen-share' && <Monitor className="w-5 h-5" />}
                    {session.type === 'chat' && <MessageSquare className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{session.name}</h4>
                    <p className="text-sm text-gray-400">Host: {session.host}</p>
                  </div>
                </div>
                <Badge className={`${
                  session.status === 'active' 
                    ? 'bg-green-500/20 text-green-400'
                    : session.status === 'waiting'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {session.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-400">
                  👥 {session.participants}/{session.maxParticipants} participants
                </span>
                <span className="text-blue-300 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {session.duration}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => joinSession(session.id)}
                  disabled={session.participants >= session.maxParticipants}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs"
                >
                  <UserPlus className="w-3 h-3 mr-1" />
                  Join
                </Button>
                <Button variant="outline" className="text-xs">
                  <Share2 className="w-3 h-3 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Collaboration Stats */}
      <Card className="bg-gradient-to-r from-blue-800/30 to-cyan-800/30 border-cyan-500/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-400">12</div>
              <div className="text-xs text-gray-400">Active Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">45</div>
              <div className="text-xs text-gray-400">Team Members</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
