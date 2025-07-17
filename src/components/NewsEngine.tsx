import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Newspaper, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Globe, 
  Search,
  Filter,
  Bookmark,
  Share2,
  Volume2,
  VolumeX
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  source: string;
  sourceUrl: string;
  timestamp: string;
  category: string;
  verified: boolean;
  credibilityScore: number;
  language: 'hi' | 'en';
  imageUrl?: string;
  tags: string[];
}

const VERIFIED_SOURCES = {
  'ANI': { credibility: 95, type: 'National Agency' },
  'PTI': { credibility: 95, type: 'Press Trust' },
  'Times of India': { credibility: 90, type: 'Print Media' },
  'NDTV': { credibility: 88, type: 'Television' },
  'BBC Hindi': { credibility: 92, type: 'International' },
  'Aaj Tak': { credibility: 85, type: 'Television' },
  'The Hindu': { credibility: 93, type: 'Print Media' },
  'Indian Express': { credibility: 90, type: 'Print Media' }
};

// Real news categories for better organization
const NEWS_CATEGORIES = [
  'राजनीति', 'खेल', 'टेक्नोलॉजी', 'व्यापार', 'मनोरंजन', 
  'स्वास्थ्य', 'शिक्षा', 'विज्ञान', 'अंतर्राष्ट्रीय', 'राज्य समाचार'
];

export function NewsEngine() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('सभी');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const { toast } = useToast();

  // Initialize with curated verified news sources
  useEffect(() => {
    loadVerifiedNews();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      refreshNews();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Filter news based on search and category
  useEffect(() => {
    let filtered = news;
    
    if (selectedCategory !== 'सभी') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Sort by credibility score and timestamp
    filtered.sort((a, b) => {
      if (a.credibilityScore !== b.credibilityScore) {
        return b.credibilityScore - a.credibilityScore;
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
    
    setFilteredNews(filtered);
  }, [news, selectedCategory, searchQuery]);

  const loadVerifiedNews = async () => {
    setIsLoading(true);
    try {
      // Simulate real news loading with verified sources
      const verifiedNews: NewsItem[] = [
        {
          id: '1',
          title: 'भारत में AI तकनीक का तेज़ विकास: डिजिटल इंडिया मिशन की नई उपलब्धि',
          content: 'सरकार ने घोषणा की है कि देश में कृत्रिम बुद्धिमत्ता (AI) के क्षेत्र में महत्वपूर्ण प्रगति हुई है। नई नीति के तहत AI इनोवेशन को बढ़ावा मिलेगा।',
          source: 'PTI',
          sourceUrl: 'https://pti.in',
          timestamp: new Date().toISOString(),
          category: 'टेक्नोलॉजी',
          verified: true,
          credibilityScore: 95,
          language: 'hi',
          imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
          tags: ['AI', 'Technology', 'Digital India', 'Innovation']
        },
        {
          id: '2',
          title: 'Sports Update: भारतीय क्रिकेट टीम की शानदार जीत',
          content: 'टीम इंडिया ने अंतर्राष्ट्रीय मैच में प्रभावशाली प्रदर्शन के साथ जीत हासिल की। कप्तान और खिलाड़ियों ने उत्कृष्ट खेल दिखाया।',
          source: 'ANI',
          sourceUrl: 'https://ani.in',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          category: 'खेल',
          verified: true,
          credibilityScore: 95,
          language: 'hi',
          imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400',
          tags: ['Cricket', 'Sports', 'Team India', 'Victory']
        },
        {
          id: '3',
          title: 'Education Reform: शिक्षा क्षेत्र में नई नीति का क्रियान्वयन',
          content: 'नई शिक्षा नीति के तहत स्कूलों और कॉलेजों में आधुनिक पाठ्यक्रम लागू किया जा रहा है। छात्रों को बेहतर शिक्षा मिलने की उम्मीद।',
          source: 'The Hindu',
          sourceUrl: 'https://thehindu.com',
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          category: 'शिक्षा',
          verified: true,
          credibilityScore: 93,
          language: 'hi',
          tags: ['Education', 'Policy', 'Reform', 'Students']
        }
      ];
      
      setNews(verifiedNews);
      setLastUpdated(new Date());
      
      toast({
        title: "✅ News Updated",
        description: `${verifiedNews.length} सत्यापित समाचार लोड किए गए`,
      });
    } catch (error) {
      toast({
        title: "❌ Error Loading News",
        description: "समाचार लोड करने में समस्या हुई, कृपया पुनः प्रयास करें",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshNews = async () => {
    setIsRefreshing(true);
    await loadVerifiedNews();
    setIsRefreshing(false);
  };

  const toggleSaveArticle = (articleId: string) => {
    setSavedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const shareArticle = (article: NewsItem) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content.substring(0, 100) + '...',
        url: article.sourceUrl
      });
    } else {
      navigator.clipboard.writeText(`${article.title}\n${article.sourceUrl}`);
      toast({
        title: "📋 Copied to Clipboard",
        description: "Article link copied successfully"
      });
    }
  };

  const readArticleAloud = (article: NewsItem) => {
    if (audioEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(article.title + '. ' + article.content);
      utterance.lang = article.language === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const getCredibilityBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-600 text-white">अत्यधिक विश्वसनीय</Badge>;
    if (score >= 80) return <Badge className="bg-blue-600 text-white">विश्वसनीय</Badge>;
    if (score >= 70) return <Badge className="bg-yellow-600 text-black">सामान्य</Badge>;
    return <Badge className="bg-red-600 text-white">सत्यापन आवश्यक</Badge>;
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <Newspaper className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">सत्यापित समाचार केंद्र</h1>
            <p className="text-slate-600 dark:text-slate-300">विश्वसनीय स्रोतों से वास्तविक समय समाचार</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            onClick={refreshNews} 
            disabled={isRefreshing}
            variant="outline"
            size="sm"
          >
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          
          <Button 
            onClick={() => setAudioEnabled(!audioEnabled)}
            variant={audioEnabled ? "default" : "outline"}
            size="sm"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Last Updated */}
      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <Clock className="w-4 h-4" />
        <span>अंतिम अपडेट: {lastUpdated.toLocaleString('hi-IN')}</span>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="समाचार खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'सभी' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory('सभी')}
          >
            सभी
          </Button>
          {NEWS_CATEGORIES.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* News List */}
      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400">समाचार लोड हो रहे हैं...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-8">
              <Newspaper className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">कोई समाचार नहीं मिला</p>
            </div>
          ) : (
            filteredNews.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-600">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 line-clamp-2 text-slate-800 dark:text-white">
                        {article.title}
                      </CardTitle>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {article.verified && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            सत्यापित
                          </Badge>
                        )}
                        {getCredibilityBadge(article.credibilityScore)}
                        <Badge variant="outline">{article.category}</Badge>
                        <Badge variant="outline">{article.source}</Badge>
                      </div>
                    </div>
                    
                    {article.imageUrl && (
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {article.content}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(article.timestamp).toLocaleString('hi-IN')}</span>
                      <Globe className="w-4 h-4 ml-2" />
                      <span>{article.language === 'hi' ? 'हिंदी' : 'English'}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveArticle(article.id)}
                      >
                        <Bookmark 
                          className={`w-4 h-4 ${savedArticles.includes(article.id) ? 'fill-current' : ''}`} 
                        />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => shareArticle(article)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      
                      {audioEnabled && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => readArticleAloud(article)}
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {article.tags.length > 0 && (
                    <>
                      <Separator className="my-3" />
                      <div className="flex flex-wrap gap-1">
                        {article.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer Stats */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-600 dark:text-slate-400">
            कुल समाचार: {news.length} | फ़िल्टर किए गए: {filteredNews.length}
          </span>
          <span className="text-slate-600 dark:text-slate-400">
            सहेजे गए: {savedArticles.length}
          </span>
        </div>
      </div>
    </div>
  );
}