import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Play,
  Video,
  BookOpen,
  Award,
  Clock,
  Users,
  Star,
  Download,
  Share,
  Bookmark
} from 'lucide-react';
import { toast } from "sonner";

interface VideoLearningHubProps {
  onTutorialComplete?: () => void;
}

export const VideoLearningHub: React.FC<VideoLearningHubProps> = ({ 
  onTutorialComplete 
}) => {
  const [watchProgress, setWatchProgress] = useState(67);
  const [completedCourses, setCompletedCourses] = useState([
    { title: 'AI Fundamentals', progress: 100, duration: '2h 30m' },
    { title: 'Machine Learning Basics', progress: 85, duration: '4h 15m' },
    { title: 'Deep Learning Advanced', progress: 45, duration: '6h 45m' }
  ]);

  const featuredVideos = [
    {
      id: 1,
      title: 'AI का भविष्य - Future of Artificial Intelligence',
      instructor: 'Dr. Rajesh Kumar',
      duration: '45 mins',
      rating: 4.9,
      viewers: '10.2K',
      thumbnail: '🤖'
    },
    {
      id: 2,
      title: 'Machine Learning for Beginners',
      instructor: 'Priya Sharma',
      duration: '1h 20m',
      rating: 4.8,
      viewers: '8.7K',
      thumbnail: '🧠'
    },
    {
      id: 3,
      title: 'Neural Networks Explained',
      instructor: 'Amit Singh',
      duration: '55 mins',
      rating: 4.7,
      viewers: '6.5K',
      thumbnail: '🕸️'
    }
  ];

  const categories = [
    { name: 'AI Basics', count: 24, icon: '🤖' },
    { name: 'Machine Learning', count: 18, icon: '🧠' },
    { name: 'Deep Learning', count: 15, icon: '🕸️' },
    { name: 'Computer Vision', count: 12, icon: '👀' },
    { name: 'NLP', count: 9, icon: '💬' },
    { name: 'Robotics', count: 7, icon: '🤖' }
  ];

  const startVideo = (videoTitle: string) => {
    toast.success(`▶️ Starting: ${videoTitle}`);
    if (onTutorialComplete) {
      onTutorialComplete();
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">🎥 Video Learning Hub</h1>
          <p className="text-muted-foreground">AI और technology की comprehensive video library</p>
        </div>
        <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <Video className="w-4 h-4 mr-1" />
          Premium Content
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Tabs defaultValue="featured" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="mycourses">My Courses</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>

            <TabsContent value="featured" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredVideos.map((video) => (
                  <Card key={video.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{video.thumbnail}</div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{video.title}</CardTitle>
                          <CardDescription>by {video.instructor}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {video.duration}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {video.viewers}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            {video.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1" 
                          onClick={() => startVideo(video.title)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </Button>
                        <Button variant="outline" size="icon">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mycourses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
                    Your Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedCourses.map((course, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{course.title}</h4>
                          <span className="text-sm text-muted-foreground">{course.duration}</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{course.progress}% Complete</span>
                          {course.progress === 100 && (
                            <Badge variant="secondary" className="text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="live" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                    Live Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Advanced AI Workshop</h4>
                        <p className="text-sm text-muted-foreground">Starting in 15 minutes</p>
                      </div>
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        Join Live
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Q&A with Experts</h4>
                        <p className="text-sm text-muted-foreground">Live now - 245 viewers</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4 mr-1" />
                        Watch
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-6 h-6 mr-2 text-yellow-500" />
                    Trending This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((rank) => (
                      <div key={rank} className="flex items-center space-x-3 p-2 hover:bg-accent rounded-lg">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          {rank}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Trending Video Title {rank}</h4>
                          <p className="text-sm text-muted-foreground">2.{rank}M views</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <Button key={index} variant="ghost" className="w-full justify-start">
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                    <Badge variant="secondary" className="ml-auto">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Weekly Progress</span>
                    <span>{watchProgress}%</span>
                  </div>
                  <Progress value={watchProgress} />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">12h 45m</div>
                  <p className="text-sm text-muted-foreground">Total Watch Time</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-sm text-muted-foreground">Courses Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoLearningHub;