import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Globe,
  Languages,
  Heart,
  Users,
  Calendar,
  Book,
  Music,
  Palette,
  Camera,
  MapPin
} from 'lucide-react';
import { toast } from "sonner";

export const CulturalAI = () => {
  const [culturalInsights, setCulturalInsights] = useState(92);
  const [activeRegion, setActiveRegion] = useState('india');
  const [festivals, setFestivals] = useState([
    { name: 'Diwali', date: '2024-11-01', region: 'India' },
    { name: 'Holi', date: '2024-03-25', region: 'India' },
    { name: 'Eid', date: '2024-04-10', region: 'Global' }
  ]);

  const regions = [
    { id: 'india', name: 'भारत', flag: '🇮🇳', cultures: 28 },
    { id: 'world', name: 'विश्व', flag: '🌍', cultures: 195 },
    { id: 'asia', name: 'एशिया', flag: '🌏', cultures: 48 }
  ];

  const generateCulturalContent = async () => {
    toast.success("🎭 Cultural content generated successfully!");
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">🎭 Cultural AI Engine</h1>
          <p className="text-muted-foreground">सांस्कृतिक विविधता और भाषाई समझ का AI</p>
        </div>
        <Badge variant="secondary" className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <Globe className="w-4 h-4 mr-1" />
          Cultural Expert
        </Badge>
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">Cultural Insights</TabsTrigger>
          <TabsTrigger value="festivals">Festivals</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="traditions">Traditions</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {regions.map((region) => (
              <Card key={region.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-2">{region.flag}</span>
                    {region.name}
                  </CardTitle>
                  <CardDescription>{region.cultures} Cultures</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveRegion(region.id)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Explore Culture
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="festivals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-orange-500" />
                Upcoming Festivals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {festivals.map((festival, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div>
                      <h3 className="font-semibold">{festival.name}</h3>
                      <p className="text-sm text-muted-foreground">{festival.region}</p>
                    </div>
                    <Badge variant="outline">{festival.date}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="languages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Languages className="w-6 h-6 mr-2 text-blue-500" />
                Multilingual Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['हिंदी', 'English', 'मराठी', 'தமிழ்', 'বাংলা', 'ગુજરાતી', 'తెలుగు', 'ಕನ್ನಡ'].map((lang, index) => (
                  <Button key={index} variant="outline" className="text-sm">
                    {lang}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traditions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-6 h-6 mr-2 text-red-500" />
                Cultural Traditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center">
                    <Music className="w-4 h-4 mr-1" />
                    Music & Dance
                  </h4>
                  <p className="text-sm text-muted-foreground">Classical, Folk, Modern</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center">
                    <Palette className="w-4 h-4 mr-1" />
                    Arts & Crafts
                  </h4>
                  <p className="text-sm text-muted-foreground">Traditional Art Forms</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Cultural Intelligence Score</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={culturalInsights} className="mb-2" />
          <p className="text-sm text-muted-foreground">{culturalInsights}% Cultural Understanding</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CulturalAI;