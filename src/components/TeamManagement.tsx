import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Crown, Shield, Settings, Mail, Phone, MoreVertical, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActive: string;
  permissions: string[];
}

export const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Initialize team members data
    setTeamMembers([
      {
        id: '1',
        name: 'Rahul Sharma',
        email: 'rahul@company.com',
        role: 'owner',
        avatar: '/avatars/rahul.jpg',
        status: 'active',
        joinDate: '2024-01-15',
        lastActive: '2 minutes ago',
        permissions: ['full_access', 'billing', 'team_management']
      },
      {
        id: '2',
        name: 'Priya Patel',
        email: 'priya@company.com',
        role: 'admin',
        avatar: '/avatars/priya.jpg',
        status: 'active',
        joinDate: '2024-02-01',
        lastActive: '1 hour ago',
        permissions: ['team_management', 'content_creation', 'analytics']
      },
      {
        id: '3',
        name: 'Amit Kumar',
        email: 'amit@company.com',
        role: 'member',
        status: 'active',
        joinDate: '2024-02-15',
        lastActive: '3 hours ago',
        permissions: ['content_creation', 'basic_analytics']
      },
      {
        id: '4',
        name: 'Sneha Gupta',
        email: 'sneha@company.com',
        role: 'viewer',
        status: 'pending',
        joinDate: '2024-03-01',
        lastActive: 'Never',
        permissions: ['view_only']
      }
    ]);
  }, []);

  const roleConfig = {
    owner: { 
      label: 'Owner', 
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500', 
      icon: Crown,
      description: 'Full access including billing and team management'
    },
    admin: { 
      label: 'Admin', 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500', 
      icon: Shield,
      description: 'Team management and advanced features'
    },
    member: { 
      label: 'Member', 
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500', 
      icon: Users,
      description: 'Standard access to core features'
    },
    viewer: { 
      label: 'Viewer', 
      color: 'bg-gradient-to-r from-gray-500 to-gray-600', 
      icon: Settings,
      description: 'Read-only access'
    }
  };

  const inviteTeamMember = async () => {
    if (!inviteEmail) return;
    
    setIsInviting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: 'member',
      status: 'pending',
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: 'Never',
      permissions: ['content_creation', 'basic_analytics']
    };
    
    setTeamMembers(prev => [...prev, newMember]);
    setInviteEmail('');
    setIsInviting(false);
    
    toast({
      title: "📧 Invitation Sent",
      description: `Team invitation sent to ${inviteEmail}`
    });
  };

  const updateMemberRole = (memberId: string, newRole: TeamMember['role']) => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { ...member, role: newRole }
          : member
      )
    );
    
    toast({
      title: "✅ Role Updated",
      description: "Team member role has been updated successfully"
    });
  };

  const removeMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
    
    toast({
      title: "🗑️ Member Removed",
      description: "Team member has been removed from the team"
    });
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const teamStats = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === 'active').length,
    pending: teamMembers.filter(m => m.status === 'pending').length,
    roles: {
      owner: teamMembers.filter(m => m.role === 'owner').length,
      admin: teamMembers.filter(m => m.role === 'admin').length,
      member: teamMembers.filter(m => m.role === 'member').length,
      viewer: teamMembers.filter(m => m.role === 'viewer').length
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
          👥 Team Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your AI team with advanced role-based permissions
        </p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-royal">{teamStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Members</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-emerald-500">{teamStats.active}</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-500">{teamStats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending Invites</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-500">{teamStats.roles.admin + teamStats.roles.owner}</div>
            <div className="text-sm text-muted-foreground">Admins</div>
          </CardContent>
        </Card>
      </div>

      {/* Invite Section */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Invite Team Member
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter email address..."
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="input-premium flex-1"
              type="email"
            />
            <Button 
              onClick={inviteTeamMember}
              disabled={isInviting || !inviteEmail}
              className="btn-royal"
            >
              {isInviting ? 'Sending...' : 'Send Invite'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team Members ({filteredMembers.length})</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMembers.map((member) => {
                  const RoleIcon = roleConfig[member.role].icon;
                  return (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{member.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            {member.email}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Last active: {member.lastActive}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge 
                          className={`${roleConfig[member.role].color} text-white`}
                        >
                          <RoleIcon className="w-3 h-3 mr-1" />
                          {roleConfig[member.role].label}
                        </Badge>
                        
                        <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                          {member.status}
                        </Badge>
                        
                        {member.role !== 'owner' && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => updateMemberRole(member.id, 'admin')}>
                                Make Admin
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateMemberRole(member.id, 'member')}>
                                Make Member
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateMemberRole(member.id, 'viewer')}>
                                Make Viewer
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => removeMember(member.id)}
                                className="text-red-600"
                              >
                                Remove Member
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <div className="grid gap-4">
            {Object.entries(roleConfig).map(([roleKey, config]) => {
              const RoleIcon = config.icon;
              return (
                <Card key={roleKey} className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${config.color}`}>
                      <RoleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{config.label}</h3>
                      <p className="text-sm text-muted-foreground">{config.description}</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {teamStats.roles[roleKey as keyof typeof teamStats.roles]} members
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                  <UserPlus className="w-4 h-4 text-blue-500" />
                  <div className="text-sm">
                    <strong>Sneha Gupta</strong> was invited to the team • 2 hours ago
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20">
                  <Shield className="w-4 h-4 text-green-500" />
                  <div className="text-sm">
                    <strong>Priya Patel</strong> was promoted to Admin • 1 day ago
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20">
                  <Users className="w-4 h-4 text-purple-500" />
                  <div className="text-sm">
                    <strong>Amit Kumar</strong> joined the team • 3 days ago
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};