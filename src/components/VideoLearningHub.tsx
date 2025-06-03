
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Play, 
  Pause, 
  Square, 
  SkipForward, 
  SkipBack,
  Volume2,
  VolumeX,
  Maximize,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  PlayCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnailUrl: string;
  videoUrl: string;
  completed: boolean;
  progress: number;
  topics: string[];
}

const videoTutorials: VideoTutorial[] = [
  {
    id: '1',
    title: 'Tezu AI se Kaise Baat Karein',
    description: 'Basic conversation techniques aur commands sikhiye',
    duration: '5:30',
    difficulty: 'beginner',
    category: 'Getting Started',
    thumbnailUrl: '/api/placeholder/300/200',
    videoUrl: 'https://example.com/video1.mp4',
    completed: false,
    progress: 0,
    topics: ['Basic Chat', 'Commands', 'Tips']
  },
  {
    id: '2',
    title: 'Advanced AI Features',
    description: 'Personality modes, templates aur memory features',
    duration: '8:45',
    difficulty: 'intermediate',
    category: 'Advanced Features',
    thumbnailUrl: '/api/placeholder/300/200',
    videoUrl: 'https://example.com/video2.mp4',
    completed: false,
    progress: 0,
    topics: ['Personalities', 'Templates', 'Memory']
  },
  {
    id: '3',
    title: 'Voice Commands & Language Settings',
    description: 'Voice chat aur multi-language support ka use',
    duration: '6:20',
    difficulty: 'intermediate',
    category: 'Voice & Language',
    thumbnailUrl: '/api/placeholder/300/200',
    videoUrl: 'https://example.com/video3.mp4',
    completed: false,
    progress: 0,
    topics: ['Voice Chat', 'Languages', 'Settings']
  },
  {
    id: '4',
    title: 'File Upload & Analysis',
    description: 'Documents, images aur files analyze karna',
    duration: '7:15',
    difficulty: 'advanced',
    category: 'File Processing',
    thumbnailUrl: '/api/placeholder/300/200',
    videoUrl: 'https://example.com/video4.mp4',
    completed: false,
    progress: 0,
    topics: ['File Upload', 'Analysis', 'Export']
  },
  {
    id: '5',
    title: 'Collaboration & Sharing',
    description: 'Team work aur conversation sharing',
    duration: '4:50',
    difficulty: 'advanced',
    category: 'Collaboration',
    thumbnailUrl: '/api/placeholder/300/200',
    videoUrl: 'https://example.com/video5.mp4',
    completed: false,
    progress: 0,
    topics: ['Team Chat', 'Sharing', 'Export']
  }
];

interface VideoLearningHubProps {
  onTutorialComplete: (tutorialId: string) => void;
}

export function VideoLearningHub({ onTutorialComplete }: VideoLearningHubProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const categories = ['all', 'Getting Started', 'Advanced Features', 'Voice & Language', 'File Processing', 'Collaboration'];

  const filteredVideos = selectedCategory === 'all' 
    ? videoTutorials 
    : videoTutorials.filter(video => video.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleVideoSelect = (video: VideoTutorial) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    setCurrentTime(0);
    
    // Simulate video loading
    setTimeout(() => {
      setDuration(parseInt(video.duration.split(':')[0]) * 60 + parseInt(video.duration.split(':')[1]));
    }, 500);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      // Check if video is 90% complete
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      if (progress >= 90 && selectedVideo && !completedVideos.has(selectedVideo.id)) {
        setCompletedVideos(prev => new Set([...prev, selectedVideo.id]));
        onTutorialComplete(selectedVideo.id);
        toast({
          title: "Tutorial Completed! 🎉",
          description: `You've completed: ${selectedVideo.title}`,
        });
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">🎥 Learn Tezu AI</h3>
        <p className="text-sm text-gray-400">Interactive video tutorials to master AI features</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={`text-xs ${
              selectedCategory === category 
                ? 'bg-blue-600 text-white' 
                : 'border-gray-600 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category === 'all' ? 'All Tutorials' : category}
          </Button>
        ))}
      </div>

      {/* Video Player */}
      {selectedVideo && (
        <Card className="bg-gray-800/50 border-gray-700 mb-4">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              {selectedVideo.title}
            </CardTitle>
            <p className="text-sm text-gray-400">{selectedVideo.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Video Display */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <div className="text-center">
                  <PlayCircle className="w-16 h-16 text-white/80 mb-2 mx-auto" />
                  <p className="text-white/80 text-sm">Click play to start tutorial</p>
                </div>
              </div>
              
              {/* Simulated video element */}
              <video
                ref={videoRef}
                className="w-full h-full opacity-0"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
              />
            </div>

            {/* Video Controls */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={togglePlayPause} className="bg-blue-600 hover:bg-blue-700">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                
                <Button size="sm" variant="outline" onClick={() => skip(-10)} className="border-gray-600">
                  <SkipBack className="w-4 h-4" />
                </Button>
                
                <Button size="sm" variant="outline" onClick={() => skip(10)} className="border-gray-600">
                  <SkipForward className="w-4 h-4" />
                </Button>
                
                <Button size="sm" variant="outline" onClick={() => setIsMuted(!isMuted)} className="border-gray-600">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>

                <div className="flex-1 flex items-center gap-2 text-sm text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <Progress value={(currentTime / duration) * 100} className="flex-1" />
                  <span>{formatTime(duration)}</span>
                </div>

                <Button size="sm" variant="outline" className="border-gray-600">
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Video Topics */}
            <div className="flex flex-wrap gap-1">
              {selectedVideo.topics.map((topic, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tutorial List */}
      <ScrollArea className="h-64">
        <div className="space-y-3">
          {filteredVideos.map((video) => {
            const isCompleted = completedVideos.has(video.id);
            
            return (
              <Card
                key={video.id}
                className={`cursor-pointer transition-all duration-200 border-2 ${
                  selectedVideo?.id === video.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                } ${isCompleted ? 'border-green-500/50 bg-green-500/5' : ''}`}
                onClick={() => handleVideoSelect(video)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-20 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded flex items-center justify-center">
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                          <Play className="w-4 h-4 text-white/80" />
                        )}
                      </div>
                      <Badge className="absolute -top-1 -right-1 text-xs bg-gray-700 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white text-sm">{video.title}</h4>
                        {isCompleted && (
                          <Trophy className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-400 mb-2">{video.description}</p>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getDifficultyColor(video.difficulty)}`}>
                          {video.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {video.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/* Learning Progress */}
      <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-400">Learning Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={(completedVideos.size / videoTutorials.length) * 100} className="flex-1" />
          <span className="text-xs text-gray-300">
            {completedVideos.size}/{videoTutorials.length}
          </span>
        </div>
      </div>
    </div>
  );
}
