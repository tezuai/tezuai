import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Globe, 
  Users, 
  Heart, 
  Calendar, 
  MapPin,
  Book,
  Star,
  Sparkles,
  Flag,
  Crown,
  Music,
  Coffee
} from "lucide-react";

interface Culture {
  id: string;
  name: string;
  region: string;
  flag: string;
  language: string;
  population: string;
  traits: string[];
  communicationStyle: string;
  businessEtiquette: string[];
  socialNorms: string[];
  holidays: string[];
  understandingLevel: number;
}

interface CulturalInsight {
  category: string;
  insight: string;
  culture: string;
  relevance: number;
  icon: any;
}

export function CulturalAI() {
  const [selectedCulture, setSelectedCulture] = useState("indian");
  const [cultures, setCultures] = useState<Culture[]>([
    {
      id: "indian",
      name: "Indian",
      region: "South Asia",
      flag: "🇮🇳",
      language: "Hindi/English",
      population: "1.4B+",
      traits: ["Respect for elders", "Family values", "Spirituality", "Hospitality"],
      communicationStyle: "Indirect, contextual, respectful hierarchy",
      businessEtiquette: ["Namaste greeting", "Relationship building", "Patience in negotiations"],
      socialNorms: ["Remove shoes indoors", "Touch feet for blessings", "Joint family system"],
      holidays: ["Diwali", "Holi", "Eid", "Christmas", "Dussehra"],
      understandingLevel: 98
    },
    {
      id: "american",
      name: "American",
      region: "North America", 
      flag: "🇺🇸",
      language: "English",
      population: "330M+",
      traits: ["Individualism", "Direct communication", "Innovation", "Equality"],
      communicationStyle: "Direct, assertive, time-oriented",
      businessEtiquette: ["Firm handshake", "Eye contact", "Punctuality"],
      socialNorms: ["Personal space", "Casual dress", "Tipping culture"],
      holidays: ["Independence Day", "Thanksgiving", "Christmas", "New Year"],
      understandingLevel: 95
    },
    {
      id: "japanese",
      name: "Japanese",
      region: "East Asia",
      flag: "🇯🇵", 
      language: "Japanese",
      population: "125M+",
      traits: ["Harmony", "Respect", "Discipline", "Group loyalty"],
      communicationStyle: "Indirect, non-verbal cues, respectful",
      businessEtiquette: ["Bowing", "Business cards with both hands", "Hierarchy respect"],
      socialNorms: ["Remove shoes", "Quiet public behavior", "Gift giving customs"],
      holidays: ["Golden Week", "Obon", "New Year", "Children's Day"],
      understandingLevel: 89
    },
    {
      id: "german",
      name: "German",
      region: "Central Europe",
      flag: "🇩🇪",
      language: "German", 
      population: "83M+",
      traits: ["Efficiency", "Punctuality", "Directness", "Privacy"],
      communicationStyle: "Direct, formal, structured",
      businessEtiquette: ["Firm handshake", "Titles important", "Punctuality crucial"],
      socialNorms: ["Quiet hours", "Recycling", "Formality in address"],
      holidays: ["Oktoberfest", "Christmas Markets", "Unity Day"],
      understandingLevel: 91
    }
  ]);

  const [culturalInsights, setCulturalInsights] = useState<CulturalInsight[]>([
    {
      category: "Communication",
      insight: "In Indian culture, indirect communication shows respect and maintains harmony",
      culture: "Indian",
      relevance: 95,
      icon: Users
    },
    {
      category: "Business",
      insight: "Americans value efficiency and direct decision-making in business",
      culture: "American", 
      relevance: 92,
      icon: Star
    },
    {
      category: "Social",
      insight: "Japanese culture emphasizes group consensus over individual opinions",
      culture: "Japanese",
      relevance: 94,
      icon: Heart
    }
  ]);

  const [adaptationSettings, setAdaptationSettings] = useState({
    communicationStyle: 85,
    culturalSensitivity: 92,
    contextAwareness: 88,
    respectLevel: 95
  });

  const currentCulture = cultures.find(c => c.id === selectedCulture);

  const culturalCategories = [
    { name: "Festivals & Celebrations", icon: Sparkles, score: 94 },
    { name: "Food & Dining Customs", icon: Coffee, score: 89 },
    { name: "Music & Arts", icon: Music, score: 87 },
    { name: "Traditional Values", icon: Crown, score: 96 },
    { name: "Modern Adaptations", icon: Globe, score: 91 },
    { name: "Regional Variations", icon: MapPin, score: 85 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate cultural understanding improvements
      setCultures(prev => prev.map(culture => ({
        ...culture,
        understandingLevel: Math.min(100, culture.understandingLevel + (Math.random() - 0.3) * 0.5)
      })));

      // Update adaptation settings
      setAdaptationSettings(prev => ({
        communicationStyle: Math.min(100, prev.communicationStyle + (Math.random() - 0.4) * 1),
        culturalSensitivity: Math.min(100, prev.culturalSensitivity + (Math.random() - 0.3) * 0.8),
        contextAwareness: Math.min(100, prev.contextAwareness + (Math.random() - 0.4) * 1.2),
        respectLevel: Math.min(100, prev.respectLevel + (Math.random() - 0.2) * 0.5)
      }));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">🌏 Cultural Understanding & Sensitivity</h2>
        <p className="text-gray-400">Advanced AI with deep cultural intelligence and adaptation</p>
      </div>

      {/* Culture Selection & Overview */}
      <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Flag className="w-5 h-5 text-orange-400" />
            Cultural Context Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedCulture} onValueChange={setSelectedCulture}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cultures.map((culture) => (
                  <SelectItem key={culture.id} value={culture.id}>
                    {culture.flag} {culture.name} ({culture.region})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentCulture && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{currentCulture.flag}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{currentCulture.name} Culture</h3>
                    <p className="text-sm text-gray-400">{currentCulture.region} • {currentCulture.population} people</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Cultural Traits</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentCulture.traits.map((trait) => (
                      <Badge key={trait} variant="outline" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Understanding Level</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={currentCulture.understandingLevel} className="flex-1 h-2" />
                    <span className="text-sm font-medium text-orange-400">
                      {currentCulture.understandingLevel.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Communication Style</h4>
                  <p className="text-xs text-gray-400">{currentCulture.communicationStyle}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cultural Adaptation Metrics */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="w-5 h-5 text-blue-400" />
            Cultural Adaptation Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(adaptationSettings).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-medium text-blue-400">{value.toFixed(1)}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cultural Knowledge Categories */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Book className="w-5 h-5 text-purple-400" />
            Cultural Knowledge Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {culturalCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.name} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                  <Icon className="w-5 h-5 text-purple-400" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{category.name}</span>
                      <span className="text-sm font-medium text-purple-400">{category.score}%</span>
                    </div>
                    <Progress value={category.score} className="h-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Cultural Insights */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Live Cultural Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {culturalInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                <Icon className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                      {insight.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {insight.culture}
                    </Badge>
                    <span className="text-xs text-yellow-400 ml-auto">{insight.relevance}% relevant</span>
                  </div>
                  <p className="text-sm text-gray-300">{insight.insight}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Cultural Details for Selected Culture */}
      {currentCulture && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-green-400" />
                Important Holidays & Festivals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentCulture.holidays.map((holiday) => (
                  <div key={holiday} className="flex items-center gap-2 p-2 bg-gray-700/30 rounded">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">{holiday}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Heart className="w-5 h-5 text-pink-400" />
                Social Norms & Etiquette
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentCulture.socialNorms.map((norm) => (
                  <div key={norm} className="flex items-center gap-2 p-2 bg-gray-700/30 rounded">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <span className="text-sm text-gray-300">{norm}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}