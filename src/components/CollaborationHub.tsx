
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  UserPlus, 
  Share2, 
  Link, 
  Crown, 
  Eye, 
  Edit, 
  MessageSquare,
  Clock,
  Globe,
  Lock,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "owner" | "editor" | "viewer";
  status: "online" | "offline" | "away";
  lastSeen: Date;
  joinedAt: Date;
}

interface CollaborationSession {
  id: string;
  name: string;
  description: string;
  privacy: "public" | "private" | "link-only";
  collaborators: Collaborator[];
  activeUsers: number;
  createdAt: Date;
  lastActivity: Date;
}

interface CollaborationHubProps {
  currentUser: Collaborator;
  onJoinSession: (sessionId: string) => void;
  onCreateSession: (session: Partial<CollaborationSession>) => void;
}

export function CollaborationHub({ currentUser, onJoinSession, onCreateSession }: CollaborationHubProps) {
  const [sessions, setSessions] = useState<CollaborationSession[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<CollaborationSession | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"editor" | "viewer">("viewer");
  const [newSession, setNewSession] = useState<Partial<CollaborationSession>>({
    name: "",
    description: "",
    privacy: "private"
  });
  
  const { toast } = useToast();

  // Mock data
  useEffect(() => {
    const mockSessions: CollaborationSession[] = [
      {
        id: "1",
        name: "Project Planning Discussion",
        description: "Planning the next phase of our AI integration project",
        privacy: "private",
        collaborators: [
          {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            role: "owner",
            status: "online",
            lastSeen: new Date(),
            joinedAt: new Date(Date.now() - 86400000)
          },
          {
            id: "2", 
            name: "Jane Smith",
            email: "jane@example.com",
            role: "editor",
            status: "online",
            lastSeen: new Date(),
            joinedAt: new Date(Date.now() - 3600000)
          },
          {
            id: "3",
            name: "Bob Wilson",
            email: "bob@example.com", 
            role: "viewer",
            status: "away",
            lastSeen: new Date(Date.now() - 1800000),
            joinedAt: new Date(Date.now() - 7200000)
          }
        ],
        activeUsers: 2,
        createdAt: new Date(Date.now() - 86400000),
        lastActivity: new Date(Date.now() - 300000)
      },
      {
        id: "2",
        name: "Code Review Session",
        description: "Reviewing the latest AI chat interface improvements",
        privacy: "link-only",
        collaborators: [
          {
            id: "4",
            name: "Alice Cooper",
            email: "alice@example.com",
            role: "owner", 
            status: "online",
            lastSeen: new Date(),
            joinedAt: new Date(Date.now() - 43200000)
          }
        ],
        activeUsers: 1,
        createdAt: new Date(Date.now() - 43200000),
        lastActivity: new Date(Date.now() - 600000)
      }
    ];
    
    setSessions(mockSessions);
  }, []);

  const getStatusColor = (status: Collaborator["status"]) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getRoleIcon = (role: Collaborator["role"]) => {
    switch (role) {
      case "owner": return <Crown className="w-3 h-3 text-yellow-400" />;
      case "editor": return <Edit className="w-3 h-3 text-blue-400" />;
      case "viewer": return <Eye className="w-3 h-3 text-gray-400" />;
      default: return null;
    }
  };

  const getPrivacyIcon = (privacy: CollaborationSession["privacy"]) => {
    switch (privacy) {
      case "public": return <Globe className="w-4 h-4 text-green-400" />;
      case "private": return <Lock className="w-4 h-4 text-red-400" />;
      case "link-only": return <Link className="w-4 h-4 text-blue-400" />;
      default: return null;
    }
  };

  const handleCreateSession = () => {
    if (!newSession.name) {
      toast({
        title: "Error",
        description: "Please enter a session name.",
        variant: "destructive",
      });
      return;
    }

    const session: CollaborationSession = {
      id: Date.now().toString(),
      name: newSession.name!,
      description: newSession.description || "",
      privacy: newSession.privacy as any || "private",
      collaborators: [{ ...currentUser, role: "owner" }],
      activeUsers: 1,
      createdAt: new Date(),
      lastActivity: new Date()
    };

    setSessions(prev => [session, ...prev]);
    onCreateSession(session);
    setIsCreateDialogOpen(false);
    setNewSession({ name: "", description: "", privacy: "private" });

    toast({
      title: "Session Created",
      description: `Created collaboration session: ${session.name}`,
    });
  };

  const handleInviteUser = () => {
    if (!inviteEmail || !selectedSession) {
      toast({
        title: "Error", 
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    // Mock invite functionality
    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: "offline",
      lastSeen: new Date(),
      joinedAt: new Date()
    };

    setSessions(prev => prev.map(session => 
      session.id === selectedSession.id 
        ? { ...session, collaborators: [...session.collaborators, newCollaborator] }
        : session
    ));

    setInviteEmail("");
    setIsInviteDialogOpen(false);

    toast({
      title: "Invitation Sent",
      description: `Invited ${inviteEmail} to join the session.`,
    });
  };

  const copySessionLink = (sessionId: string) => {
    const link = `${window.location.origin}/collaborate/${sessionId}`;
    navigator.clipboard.writeText(link);
    
    toast({
      title: "Link Copied",
      description: "Session link has been copied to clipboard.",
    });
  };

  const formatLastActivity = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Collaboration Hub
          </CardTitle>
          <div className="flex gap-2">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Create Session
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle>Create Collaboration Session</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Session Name *</label>
                    <Input
                      value={newSession.name || ""}
                      onChange={(e) => setNewSession(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter session name"
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Description</label>
                    <Input
                      value={newSession.description || ""}
                      onChange={(e) => setNewSession(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description (optional)"
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Privacy</label>
                    <select 
                      value={newSession.privacy}
                      onChange={(e) => setNewSession(prev => ({ ...prev, privacy: e.target.value as any }))}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                    >
                      <option value="private">Private - Invite only</option>
                      <option value="link-only">Link Only - Anyone with link</option>
                      <option value="public">Public - Anyone can join</option>
                    </select>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleCreateSession} className="flex-1">
                      Create Session
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {sessions.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No collaboration sessions yet</p>
                <p className="text-sm">Create your first session to start collaborating</p>
              </div>
            ) : (
              sessions.map((session) => (
                <Card key={session.id} className="bg-gray-700/30 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-white">{session.name}</h3>
                          {getPrivacyIcon(session.privacy)}
                          <Badge variant="secondary" className="text-xs">
                            {session.activeUsers} online
                          </Badge>
                        </div>
                        {session.description && (
                          <p className="text-sm text-gray-300 mb-2">{session.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatLastActivity(session.lastActivity)}
                          </span>
                          <span>{session.collaborators.length} collaborators</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copySessionLink(session.id)}
                          className="p-2 h-8 w-8"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedSession(session);
                            setIsInviteDialogOpen(true);
                          }}
                          className="p-2 h-8 w-8"
                        >
                          <UserPlus className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => onJoinSession(session.id)}
                          className="gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Join
                        </Button>
                      </div>
                    </div>

                    {/* Collaborators */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Collaborators:</span>
                      <div className="flex -space-x-2">
                        {session.collaborators.slice(0, 5).map((collaborator) => (
                          <div key={collaborator.id} className="relative">
                            <Avatar className="w-6 h-6 border-2 border-gray-600">
                              <AvatarImage src={collaborator.avatar} />
                              <AvatarFallback className="text-xs bg-gray-600">
                                {collaborator.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-gray-600 ${getStatusColor(collaborator.status)}`} />
                            {collaborator.role === "owner" && (
                              <Crown className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400" />
                            )}
                          </div>
                        ))}
                        {session.collaborators.length > 5 && (
                          <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-gray-600 flex items-center justify-center">
                            <span className="text-xs text-white">+{session.collaborators.length - 5}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Invite Dialog */}
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogContent className="bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Invite Collaborator</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Email Address</label>
                <Input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@example.com"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Role</label>
                <select 
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  <option value="viewer">Viewer - Can view conversations</option>
                  <option value="editor">Editor - Can edit and participate</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleInviteUser} className="flex-1">
                  Send Invitation
                </Button>
                <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
