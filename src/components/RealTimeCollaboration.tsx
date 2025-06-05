
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Video, 
  Share2, 
  MessageSquare,
  UserPlus,
  Crown,
  Mic,
  Camera,
  Screen,
  Settings,
  Copy,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Collaborator {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'away' | 'offline';
  avatar: string;
  permissions: string[];
}

interface CollabSession {
  id: string;
  name: string;
  type: 'meeting' | 'workspace' | 'presentation';
  participants: number;
  status: 'active' | 'scheduled' | 'ended';
  startTime: Date;
}

export function RealTimeCollaboration() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      role: 'Project Manager',
      status: 'online',
      avatar: '/placeholder.svg',
      permissions: ['edit', 'share', 'admin']
    },
    {
      id: '2',
      name: 'Priya Patel',
      role: 'Designer',
      status: 'online',
      avatar: '/placeholder.svg',
      permissions: ['edit', 'comment']
    },
    {
      id: '3',
      name: 'Amit Kumar',
      role: 'Developer',
      status: 'away',
      avatar: '/placeholder.svg',
      permissions: ['edit', 'code']
    }
  ]);

  const [sessions, setSessions] = useState<CollabSession[]>([
    {
      id: '1',
      name: 'Weekly AI Strategy Meeting',
      type: 'meeting',
      participants: 5,
      status: 'active',
      startTime: new Date()
    },
    {
      id: '2',
      name: 'Product Demo Workspace',
      type: 'workspace',
      participants: 8,
      status: 'active',
      startTime: new Date(Date.now() - 30 * 60 * 1000)
    }
  ]);

  const [inviteEmail, setInviteEmail] = useState('');
  const [sessionName, setSessionName] = useState('');

  const { toast } = useToast();

  const handleInviteUser = () => {
    if (!inviteEmail) {
      toast({
        title: "Missing Email",
        description: "Please enter an email address to invite",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🎉 Invitation Sent!",
      description: `Collaboration invite sent to ${inviteEmail}`,
    });
    setInviteEmail('');
  };

  const handleCreateSession = () => {
    if (!sessionName) {
      toast({
        title: "Missing Session Name",
        description: "Please enter a session name",
        variant: "destructive"
      });
      return;
    }

    const newSession: CollabSession = {
      id: Date.now().toString(),
      name: sessionName,
      type: 'workspace',
      participants: 1,
      status: 'active',
      startTime: new Date()
    };

    setSessions(prev => [...prev, newSession]);
    setSessionName('');
    
    toast({
      title: "🚀 Session Created!",
      description: "Your collaboration session is now live",
    });
  };

  const copySessionLink = (sessionId: string) => {
    const link = `https://tezu-ai.com/collaborate/${sessionId}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied!",
      description: "Session link copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">👥 Real-Time Collaboration</h3>
        <p className="text-sm text-gray-400">Work together with your team in real-time</p>
      </div>

      {/* Active Collaborators */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-blue-800/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-4 h-4" />
            Active Collaborators ({collaborators.filter(c => c.status === 'online').length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {collaborators.map((collaborator) => (
            <div key={collaborator.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={collaborator.avatar} />
                    <AvatarFallback className="bg-blue-600 text-white text-xs">
                      {collaborator.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${
                    collaborator.status === 'online' ? 'bg-green-500' :
                    collaborator.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{collaborator.name}</p>
                  <p className="text-xs text-gray-400">{collaborator.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {collaborator.permissions.includes('admin') && (
                  <Crown className="w-3 h-3 text-yellow-400" />
                )}
                <Badge className={`text-xs ${
                  collaborator.status === 'online' ? 'bg-green-500/20 text-green-400' :
                  collaborator.status === 'away' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {collaborator.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Invite Collaborator */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Invite Collaborator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Enter email address"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="bg-gray-700/50 border-gray-600 text-white"
          />
          <Button 
            onClick={handleInviteUser}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Send Invitation
          </Button>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Video className="w-4 h-4" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessions.filter(s => s.status === 'active').map((session) => (
            <div key={session.id} className="p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-white font-medium">{session.name}</h4>
                  <p className="text-xs text-gray-400">
                    {session.participants} participants • Started {session.startTime.toLocaleTimeString()}
                  </p>
                </div>
                <Badge className="bg-green-500/20 text-green-400">
                  <Eye className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                  <Video className="w-3 h-3 mr-1" />
                  Join
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-600 text-gray-300"
                  onClick={() => copySessionLink(session.id)}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy Link
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Create New Session */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-green-800/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Video className="w-4 h-4" />
            Start New Session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Session name"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            className="bg-gray-700/50 border-green-500/30 text-white"
          />
          <div className="grid grid-cols-3 gap-2">
            <Button size="sm" variant="outline" className="border-green-500/30 text-green-300">
              <MessageSquare className="w-3 h-3 mr-1" />
              Chat
            </Button>
            <Button size="sm" variant="outline" className="border-green-500/30 text-green-300">
              <Screen className="w-3 h-3 mr-1" />
              Screen
            </Button>
            <Button size="sm" variant="outline" className="border-green-500/30 text-green-300">
              <Mic className="w-3 h-3 mr-1" />
              Audio
            </Button>
          </div>
          <Button 
            onClick={handleCreateSession}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
          >
            <Video className="w-4 h-4 mr-2" />
            Start Live Session
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
