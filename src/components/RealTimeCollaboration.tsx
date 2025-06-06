
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Share2,
  MessageSquare,
  Video,
  Screen,
  Mic,
  MicOff,
  VideoOff,
  Settings,
  Crown,
  UserPlus,
  Globe,
  Lock,
  Eye
} from "lucide-react";

export function RealTimeCollaboration() {
  const [isLive, setIsLive] = useState(false);
  const [activeUsers, setActiveUsers] = useState(3);

  const collaborators = [
    {
      id: 1,
      name: "Raj Kumar",
      email: "raj@company.com",
      avatar: "🧑‍💻",
      role: "Admin",
      status: "online",
      typing: false
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@company.com",
      avatar: "👩‍💼",
      role: "Editor",
      status: "online",
      typing: true
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@company.com",
      avatar: "👨‍🔬",
      role: "Viewer",
      status: "away",
      typing: false
    }
  ];

  const liveActivities = [
    {
      user: "Raj Kumar",
      action: "Started a new conversation",
      time: "2 min ago",
      type: "chat"
    },
    {
      user: "Priya Singh",
      action: "Shared a document",
      time: "5 min ago",
      type: "share"
    },
    {
      user: "Amit Patel",
      action: "Joined the workspace",
      time: "10 min ago",
      type: "join"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-green-400" />
            Real-time Collaboration
            <Badge className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
              Enterprise
            </Badge>
          </h2>
          <p className="text-gray-400 mt-2">Collaborate with your team in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-green-400 border-green-400">
            {activeUsers} Active Users
          </Badge>
          <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Team
          </Button>
        </div>
      </div>

      <Tabs defaultValue="workspace" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="video">Video Call</TabsTrigger>
          <TabsTrigger value="share">Screen Share</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="workspace" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Active Collaborators */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-400" />
                  Active Collaborators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {collaborators.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{user.name}</span>
                        {user.role === "Admin" && <Crown className="w-4 h-4 text-yellow-400" />}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${
                          user.status === "online" ? "bg-green-400" : "bg-yellow-400"
                        }`} />
                        <span className="text-gray-400">{user.role}</span>
                        {user.typing && (
                          <span className="text-blue-400 animate-pulse">typing...</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Live Activity Feed */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  Live Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {liveActivities.map((activity, index) => (
                  <div key={index} className="p-3 bg-gray-800/30 rounded-lg">
                    <div className="text-white font-medium">{activity.user}</div>
                    <div className="text-gray-400 text-sm">{activity.action}</div>
                    <div className="text-gray-500 text-xs mt-1">{activity.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-purple-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Start Video Call
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2">
                  <Screen className="w-4 h-4" />
                  Share Screen
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Team Chat
                </Button>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Workspace
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="video" className="space-y-6">
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-400" />
                Video Conference
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-900/50 rounded-xl p-8 text-center border border-gray-600/30">
                <Video className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Start Video Conference</h3>
                <p className="text-gray-400 mb-6">Connect with your team members face-to-face</p>
                <div className="flex justify-center gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Video className="w-4 h-4 mr-2" />
                    Start Call
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    <Mic className="w-4 h-4 mr-2" />
                    Audio Only
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="share" className="space-y-6">
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Screen className="w-5 h-5 text-green-400" />
                Screen Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-900/50 rounded-xl p-8 text-center border border-gray-600/30">
                <Screen className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Share Your Screen</h3>
                <p className="text-gray-400 mb-6">Let team members see your work in real-time</p>
                <div className="flex justify-center gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Screen className="w-4 h-4 mr-2" />
                    Share Entire Screen
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    <Globe className="w-4 h-4 mr-2" />
                    Share Browser Tab
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-400" />
                Collaboration Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Workspace Name</label>
                  <Input
                    defaultValue="Tezu AI Professional Team"
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Access Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      <Lock className="w-4 h-4 mr-2" />
                      Private
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      <Users className="w-4 h-4 mr-2" />
                      Team Only
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      <Globe className="w-4 h-4 mr-2" />
                      Public
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
