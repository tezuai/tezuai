import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { SubscriptionPage } from "@/pages/Subscription";
import { CheckoutPage } from "@/pages/Checkout";
import { LandingPage } from "@/components/LandingPage";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { PrivacySecurityHub } from "@/components/PrivacySecurityHub";
import { SmartAuthGuard, type UserSession } from "@/components/SmartAuthGuard";
import { AdvancedUserSettings } from "@/components/AdvancedUserSettings";
import { ProfessionalAIAssistant } from "@/components/ProfessionalAIAssistant";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { ProfessionalFooter } from "@/components/ProfessionalFooter";
import { AIModelSwitcher } from "@/components/AIModelSwitcher";
import { RealTimeCollaboration } from "@/components/RealTimeCollaboration";
import { CustomAITraining } from "@/components/CustomAITraining";
import { ProfessionalTemplates } from "@/components/ProfessionalTemplates";
import { AdvancedAnalytics } from "@/components/AdvancedAnalytics";
import { FloatingActions } from "@/components/FloatingActions";

// ADD NEW IMPORTS
import { ThemePicker } from "@/components/ThemePicker";
import { OnboardingTips } from "@/components/OnboardingTips";
import { ChatReactions } from "@/components/ChatReactions";
import { ProgressBar } from "@/components/ProgressBar";
import { QuickTemplates } from "@/components/QuickTemplates";
import { FunFacts } from "@/components/FunFacts";
import { AppGallery } from "@/components/AppGallery";
import { OnboardingHindi } from "@/components/OnboardingHindi";
import { HeaderBar } from "@/components/HeaderBar";
import { NewsEngine } from "@/components/NewsEngine";
import { SmartProductivitySuite } from "@/components/SmartProductivitySuite";
import { SecurityCenter } from "@/components/SecurityCenter";
import { ThemeGallery } from "@/components/ThemeGallery";
import { AIMarketplace } from "@/components/AIMarketplace";
import { WorkflowAutomation } from "@/components/WorkflowAutomation";
import { BusinessIntelligence } from "@/components/BusinessIntelligence";
import MultimodalAI from "@/components/MultimodalAI";
import AgenticAI from "@/components/AgenticAI";
import { CreativeStudio } from "@/components/CreativeStudio";
import { SmartLearning } from "@/components/SmartLearning";
import { AdvancedSecurity } from "@/components/AdvancedSecurity";
import PredictiveIntelligence from "@/components/PredictiveIntelligence";
import EmotionalAI from "@/components/EmotionalAI";
import { PolyglotAI } from "@/components/PolyglotAI";
import { EnhancedThemeCustomizer } from "@/components/EnhancedThemeCustomizer";
import { SmartDashboard } from "@/components/SmartDashboard";
import { QuantumAI } from "@/components/QuantumAI";
import { AIResearchLab } from "@/components/AIResearchLab";
import { ComplianceCenter } from "@/components/ComplianceCenter";
import { AdvancedSEOManager } from "@/components/AdvancedSEOManager";
import { AlgorithmOptimizer } from "@/components/AlgorithmOptimizer";
import { CustomizationStudio } from "@/components/CustomizationStudio";
import { AdvancedMediaHub } from "@/components/AdvancedMediaHub";
import { VideoLearningHub } from "@/components/VideoLearningHub";
import { CulturalAI } from "@/components/CulturalAI";
import { RealtimeKnowledgeEngine } from "@/components/RealtimeKnowledgeEngine";
import { AdvancedSearchRAG } from "@/components/AdvancedSearchRAG";
import { CodeExecutor } from "@/components/CodeExecutor";
import { TeamManagement } from "@/components/TeamManagement";
import type { ViewName } from "@/types/views";

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<ViewName>('chat');
  const [showLanding, setShowLanding] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [requireAuth, setRequireAuth] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [appTheme, setAppTheme] = useState("from-blue-900 via-blue-800 to-purple-900");
  const [showHindiOnboarding, setShowHindiOnboarding] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{
    planId: string;
    planName: string;
    amount: number;
    billingPeriod: "monthly" | "yearly";
  } | null>(null);

  // Move this useEffect block up here, before any conditional returns!
  useEffect(() => {
    const done = localStorage.getItem("tezu-ai-onboarding-done");
    if (!done) setShowHindiOnboarding(true);
  }, []);

  // Check if user is returning (has localStorage data)
  useEffect(() => {
    const hasUsedBefore = localStorage.getItem('tezu-ai-assistant-used');
    const savedSession = localStorage.getItem('tezu-ai-session');
    
    if (hasUsedBefore) {
      setShowLanding(false);
    }
    
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        setCurrentUser(session);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved session:', error);
      }
    }
  }, []);

  const handleStartFromLanding = () => {
    setShowLanding(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('tezu-ai-assistant-used', 'true');
    handleNewConversation();
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    localStorage.setItem('tezu-ai-assistant-used', 'true');
  };

  const handleNewConversation = () => {
    // Check if advanced features require authentication
    const needsAuth = currentView !== 'chat' && currentView !== 'analytics';
    
    if (needsAuth && !isAuthenticated) {
      setRequireAuth(true);
      return;
    }

    const newConversation = {
      id: Date.now().toString(),
      title: "नया Conversation - Tezu AI Pro",
      messages: [],
      createdAt: new Date(),
      isStarred: false,
      isArchived: false,
    };
    setConversations(prev => [newConversation, ...prev]);
    setSelectedConversation(newConversation.id);
    setCurrentView('chat');
    setShowLanding(false);
    setShowOnboarding(false);
    setRequireAuth(false);
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    setCurrentView('chat');
  };

  const handleUpdateConversation = (updatedConversation: any) => {
    setConversations(prev => prev.map(c => 
      c.id === updatedConversation.id ? updatedConversation : c
    ));
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (selectedConversation === id) {
      setSelectedConversation(null);
    }
  };

  const handleArchiveConversation = (id: string) => {
    setConversations(prev => prev.map(c => 
      c.id === id ? { ...c, isArchived: !c.isArchived } : c
    ));
  };

  const handleDuplicateConversation = (conversation: any) => {
    const duplicatedConversation = {
      ...conversation,
      id: Date.now().toString(),
      title: `Copy of ${conversation.title}`,
      createdAt: new Date(),
    };
    setConversations(prev => [duplicatedConversation, ...prev]);
  };

  const handleAuthStateChange = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
    
    if (authenticated) {
      // Get user session from DOM data attributes (passed by SmartAuthGuard)
      const sessionElement = document.querySelector('[data-user-session]');
      if (sessionElement) {
        try {
          const sessionData = sessionElement.getAttribute('data-user-session');
          if (sessionData && sessionData !== 'null') {
            const session = JSON.parse(sessionData);
            setCurrentUser(session);
          }
        } catch (error) {
          console.error('Failed to parse user session:', error);
        }
      }
      setRequireAuth(false);
    } else {
      setCurrentUser(null);
    }
  };

  const handleLogout = () => {
    // This will be handled by SmartAuthGuard
    const handlersElement = document.querySelector('[data-auth-handlers]');
    if (handlersElement) {
      try {
        const handlersData = handlersElement.getAttribute('data-auth-handlers');
        if (handlersData) {
          const handlers = JSON.parse(handlersData);
          if (handlers.handleLogout) {
            handlers.handleLogout();
          }
        }
      } catch (error) {
        console.error('Failed to parse auth handlers:', error);
      }
    }
  };

  const handleDeleteAccount = () => {
    // This will be handled by SmartAuthGuard
    const handlersElement = document.querySelector('[data-auth-handlers]');
    if (handlersElement) {
      try {
        const handlersData = handlersElement.getAttribute('data-auth-handlers');
        if (handlersData) {
          const handlers = JSON.parse(handlersData);
          if (handlers.handleDeleteAccount) {
            handlers.handleDeleteAccount();
          }
        }
      } catch (error) {
        console.error('Failed to parse auth handlers:', error);
      }
    }
  };

  const handleViewChange = (view: ViewName) => {
    // Check if view requires authentication
    const authRequiredViews = [
      'subscription', 
      'privacy', 
      'settings', 
      'ai-assistant', 
      'ai-model-switcher',
      'collaboration',
      'custom-training',
      'templates',
      'advanced-analytics',
      'productivity-suite',
      'security-center',
      'theme-gallery',
      'ai-marketplace',
      'workflow-automation',
      'business-intelligence',
      'smart-dashboard',
      'quantum-ai',
      'ai-research-lab',
      'compliance-center',
      'advanced-seo',
      'algorithm-optimizer',
      'customization-studio',
      'advanced-media',
      'multimodal-ai',
      'predictive-intelligence',
      'emotional-ai',
      'agentic-ai',
      'advanced-search-rag',
      'code-executor',
      'team-management'
    ];
    
    if (authRequiredViews.includes(view) && !isAuthenticated) {
      setRequireAuth(true);
      return;
    }
    
    setCurrentView(view);
    setRequireAuth(false);
  };

  const handleUpdateProfile = (profileData: Partial<UserSession>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...profileData };
      setCurrentUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('tezu-ai-session', JSON.stringify(updatedUser));
    }
  };

  // Convert UserSession to UserProfile format for AdvancedUserSettings
  const convertUserSessionToProfile = (user: UserSession) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      plan: user.plan,
      joinDate: user.joinDate,
      securityScore: user.securityScore,
      totalChats: user.totalChats || 0,
      level: user.level || 'Beginner'
    };
  };

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  // Show landing page for new users
  if (showLanding) {
    return <LandingPage onStartChat={handleStartFromLanding} />;
  }

  // Show onboarding flow
  if (showOnboarding) {
    return (
      <OnboardingFlow 
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    );
  }

  function handleHindiOnboardingFinish() {
    setShowHindiOnboarding(false);
    localStorage.setItem("tezu-ai-onboarding-done", "yes");
  }

  // ThemePicker controls
  function handleThemeChange(cls: string) { setAppTheme(cls); }

  const handleCheckout = (planId: string, planName: string, amount: number, billingPeriod: "monthly" | "yearly") => {
    setCheckoutData({ planId, planName, amount, billingPeriod });
  };

  const handleCheckoutComplete = () => {
    setCheckoutData(null);
    setCurrentView('chat');
  };

  // Show checkout if checkout data exists
  if (checkoutData) {
    return (
      <SubscriptionProvider>
        <CheckoutPage
          {...checkoutData}
          onBack={() => setCheckoutData(null)}
          onComplete={handleCheckoutComplete}
        />
      </SubscriptionProvider>
    );
  }

  return (
    <SubscriptionProvider>
      <SidebarProvider>
        <SmartAuthGuard 
          requireAuth={requireAuth}
          onAuthStateChange={handleAuthStateChange}
        >
          <div className={`min-h-screen flex flex-col w-full bg-gradient-to-br ${appTheme}`}>
            {/* === NEW: Stylish HeaderBar / Branding === */}
            <HeaderBar />
            {/* Onboarding Hindi Overlay */}
            {showHindiOnboarding && <OnboardingHindi onFinish={handleHindiOnboardingFinish}/>}
            <OnboardingTips />
            <FunFacts />
            <div className="flex flex-1">
              {(['chat', 'analytics', 'ai-model-switcher', 'collaboration', 'custom-training', 'templates', 'advanced-analytics', 'news-engine', 'productivity-suite', 'security-center', 'theme-gallery', 'ai-marketplace', 'workflow-automation', 'business-intelligence', 'smart-dashboard', 'quantum-ai', 'ai-research-lab', 'compliance-center', 'advanced-seo', 'algorithm-optimizer', 'customization-studio', 'advanced-media', 'multimodal-ai', 'predictive-intelligence', 'emotional-ai', 'agentic-ai', 'advanced-search-rag', 'code-executor', 'team-management'].includes(currentView)) && (
                <Sidebar
                  conversations={conversations}
                  selectedConversation={selectedConversation}
                  onNewConversation={handleNewConversation}
                  onSelectConversation={handleSelectConversation}
                  onUpdateConversation={handleUpdateConversation}
                  onDeleteConversation={handleDeleteConversation}
                  onArchiveConversation={handleArchiveConversation}
                  onDuplicateConversation={handleDuplicateConversation}
                  currentView={currentView}
                  onViewChange={handleViewChange}
                  onLogout={handleLogout}
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                />
              )}
              <main className="flex-1 flex flex-col p-2 sm:p-4">
                {/* Theme/Color Picker trigger */}
                <div className="flex justify-end mb-2">
                  <button
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded shadow hover:scale-105"
                    onClick={() => setShowThemePicker(true)}
                  >🎨 थीम बदलें</button>
                </div>
                {showThemePicker && (
                  <ThemePicker
                    open={showThemePicker}
                    onClose={() => setShowThemePicker(false)}
                    onChange={handleThemeChange}
                  />
                )}

                {/* Progress Bar, QuickTemplates, Reactions */}
                <ProgressBar value={selectedConversation ? 
                  Math.min(100, (conversations.length * 10) + (currentUser ? 40 : 0)) : 25
                } max={100} />
                <QuickTemplates onTemplate={(prompt) => alert(`Selected: ${prompt}`)} />
                <ChatReactions />

                {/* SmartTemplates, Gallery etc. */}
                {currentView === "templates" && (
                  <>
                    <AppGallery />
                  </>
                )}
                {currentView === 'subscription' ? (
                  <SubscriptionPage 
                    onBack={() => setCurrentView('chat')}
                    onCheckout={handleCheckout}
                  />
                ) : currentView === 'privacy' ? (
                  <PrivacySecurityHub />
                ) : currentView === 'settings' ? (
                  <div className="p-6">
                    <AdvancedUserSettings
                      user={currentUser ? convertUserSessionToProfile(currentUser) : null}
                      onLogout={handleLogout}
                      onDeleteAccount={handleDeleteAccount}
                      onUpdateProfile={handleUpdateProfile}
                    />
                  </div>
                ) : currentView === 'ai-assistant' ? (
                  <div className="p-6">
                    <ProfessionalAIAssistant />
                  </div>
                ) : currentView === 'analytics' ? (
                  <AnalyticsDashboard conversations={conversations} />
                ) : currentView === 'ai-model-switcher' ? (
                  <div className="p-6">
                    <AIModelSwitcher />
                  </div>
                ) : currentView === 'collaboration' ? (
                  <div className="p-6">
                    <RealTimeCollaboration />
                  </div>
                ) : currentView === 'custom-training' ? (
                  <div className="p-6">
                    <CustomAITraining />
                  </div>
                ) : currentView === 'templates' ? (
                  <div className="p-6">
                    <ProfessionalTemplates />
                  </div>
                ) : currentView === 'advanced-analytics' ? (
                  <div className="p-6">
                    <AdvancedAnalytics />
                  </div>
                ) : currentView === 'news-engine' ? (
                  <NewsEngine />
                ) : currentView === 'productivity-suite' ? (
                  <SmartProductivitySuite />
                ) : currentView === 'security-center' ? (
                  <SecurityCenter />
                ) : currentView === 'theme-gallery' ? (
                  <ThemeGallery />
                ) : currentView === 'ai-marketplace' ? (
                  <AIMarketplace />
                ) : currentView === 'workflow-automation' ? (
                  <WorkflowAutomation />
                ) : currentView === 'business-intelligence' ? (
                  <BusinessIntelligence />
                ) : currentView === 'multimodal-ai' ? (
                  <MultimodalAI />
                ) : currentView === 'realtime-knowledge' ? (
                  <RealtimeKnowledgeEngine />
                ) : currentView === 'agentic-ai' ? (
                  <AgenticAI />
                ) : currentView === 'creative-studio' ? (
                  <CreativeStudio />
                ) : currentView === 'smart-learning' ? (
                  <SmartLearning />
                ) : currentView === 'advanced-security' ? (
                  <AdvancedSecurity />
                ) : currentView === 'predictive-intelligence' ? (
                  <PredictiveIntelligence />
                ) : currentView === 'emotional-ai' ? (
                  <EmotionalAI />
                ) : currentView === 'polyglot-ai' ? (
                  <PolyglotAI />
                ) : currentView === 'cultural-ai' ? (
                  <CulturalAI />
                ) : currentView === 'smart-dashboard' ? (
                  <SmartDashboard />
                ) : currentView === 'quantum-ai' ? (
                  <QuantumAI />
                ) : currentView === 'ai-research-lab' ? (
                  <AIResearchLab />
                ) : currentView === 'compliance-center' ? (
                  <ComplianceCenter />
                ) : currentView === 'advanced-seo' ? (
                  <AdvancedSEOManager />
                ) : currentView === 'algorithm-optimizer' ? (
                  <AlgorithmOptimizer />
                ) : currentView === 'customization-studio' ? (
                  <CustomizationStudio />
                ) : currentView === 'advanced-media' ? (
                  <AdvancedMediaHub />
                ) : currentView === 'video-learning' ? (
                  <VideoLearningHub />
                ) : currentView === 'advanced-search-rag' ? (
                  <AdvancedSearchRAG />
                ) : currentView === 'code-executor' ? (
                  <CodeExecutor />
                ) : currentView === 'team-management' ? (
                  <TeamManagement />
                ) : selectedConversation && currentConversation ? (
                  <ChatInterface
                    conversation={currentConversation}
                    onUpdateConversation={handleUpdateConversation}
                    allConversations={conversations}
                  />
                ) : (
                  <WelcomeScreen onStartChat={handleNewConversation} />
                )}
              </main>
            </div>
            <ProfessionalFooter />
            <FloatingActions />
          </div>
        </SmartAuthGuard>
      </SidebarProvider>
    </SubscriptionProvider>
  );
}

export default Index;
