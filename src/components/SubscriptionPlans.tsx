
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Check,
  Star,
  Zap,
  Crown,
  MessageSquare,
  Bot,
  FileText,
  Image,
  Mic,
  Users,
  Shield,
  BarChart3,
  Download,
  Cloud,
  Infinity,
  Workflow,
  Database,
  Cpu,
  CloudLightning,
  Briefcase,
} from "lucide-react";

interface PlanFeature {
  name: string;
  included: boolean;
  limit?: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  popular?: boolean;
  features: PlanFeature[];
  icon: any;
  color: string;
  description: string;
}

const plans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    icon: MessageSquare,
    color: "text-gray-500",
    description: "Perfect for getting started",
    features: [
      { name: "Basic AI Chat", included: true, limit: "10 messages/day" },
      { name: "1 AI Model (GPT-3.5)", included: true },
      { name: "Basic Templates", included: true, limit: "5 templates" },
      { name: "Text Export", included: true },
      { name: "Chat History", included: true, limit: "7 days" },
      { name: "Voice Input", included: false },
      { name: "File Upload", included: false },
      { name: "Multiple AI Models", included: false },
      { name: "Workflow Automation", included: false },
      { name: "Priority Support", included: false },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 399, yearly: 3999 },
    icon: Star,
    color: "text-blue-500",
    description: "Perfect for individuals and freelancers",
    features: [
      { name: "Enhanced AI Chat", included: true, limit: "500 messages/day" },
      { name: "5 AI Models", included: true, limit: "GPT-4, Claude, Gemini" },
      { name: "Advanced Templates", included: true, limit: "20 templates" },
      { name: "Voice Input/Output", included: true },
      { name: "File Upload & Analysis", included: true, limit: "5MB files" },
      { name: "Basic Workflow Automation", included: true, limit: "5 workflows" },
      { name: "Export All Formats", included: true },
      { name: "Chat History", included: true, limit: "30 days" },
      { name: "Basic Analytics", included: true },
      { name: "Email Support", included: true },
      { name: "Custom AI Training", included: false },
      { name: "Business Intelligence", included: false },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: { monthly: 599, yearly: 5999 },
    popular: true,
    icon: Crown,
    color: "text-purple-500",
    description: "Best for professionals and growing teams",
    features: [
      { name: "Unlimited AI Chat", included: true },
      { name: "All 15+ AI Models", included: true, limit: "GPT-4, Claude, Gemini, Llama" },
      { name: "Professional Templates", included: true, limit: "Unlimited" },
      { name: "Advanced Voice & Vision", included: true },
      { name: "Unlimited File Upload", included: true, limit: "100MB files" },
      { name: "Advanced Workflow Automation", included: true },
      { name: "Custom AI Model Training", included: true },
      { name: "Business Intelligence", included: true },
      { name: "Data Analytics Dashboard", included: true },
      { name: "Cloud Computing Access", included: true },
      { name: "Priority Support", included: true },
      { name: "Team Collaboration", included: true, limit: "Up to 5 users" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: 2999, yearly: 29999 },
    icon: Briefcase,
    color: "text-yellow-500",
    description: "For large organizations and enterprises",
    features: [
      { name: "Everything in Professional", included: true },
      { name: "Unlimited Team Members", included: true },
      { name: "Enterprise AI Models", included: true },
      { name: "Advanced Security & Compliance", included: true },
      { name: "Custom Integrations", included: true },
      { name: "Dedicated AI Infrastructure", included: true },
      { name: "24/7 Phone Support", included: true },
      { name: "Custom Deployment", included: true },
      { name: "API Access & SDKs", included: true },
      { name: "White-label Options", included: true },
      { name: "Enterprise SLA", included: true },
      { name: "Dedicated Account Manager", included: true },
    ],
  },
];

interface SubscriptionPlansProps {
  onSelectPlan: (planId: string) => void;
  currentPlan?: string;
  onCheckout?: (planId: string, planName: string, amount: number, billingPeriod: "monthly" | "yearly") => void;
}

export function SubscriptionPlans({ onSelectPlan, currentPlan = "free", onCheckout }: SubscriptionPlansProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const formatPrice = (price: number) => {
    if (price === 0) return "Free";
    return `₹${price}`;
  };

  const getYearlySavings = (monthly: number, yearly: number) => {
    if (monthly === 0) return 0;
    const monthlySavings = (monthly * 12) - yearly;
    return Math.round((monthlySavings / (monthly * 12)) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-white">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Choose Your Professional Plan
          </span>
        </h1>
        <p className="text-2xl text-gray-300">
          Unlock advanced AI capabilities with our enhanced subscription plans
        </p>
        
        <div className="flex items-center justify-center gap-6 mt-8">
          <span className={`text-lg ${billingPeriod === 'monthly' ? 'text-white font-semibold' : 'text-gray-400'}`}>
            Monthly
          </span>
          <Switch
            checked={billingPeriod === 'yearly'}
            onCheckedChange={(checked) => setBillingPeriod(checked ? 'yearly' : 'monthly')}
            className="data-[state=checked]:bg-purple-600 scale-125"
          />
          <span className={`text-lg ${billingPeriod === 'yearly' ? 'text-white font-semibold' : 'text-gray-400'}`}>
            Yearly
          </span>
          {billingPeriod === 'yearly' && (
            <Badge variant="secondary" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg px-4 py-2">
              Save up to 17%
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.id;
          const savings = getYearlySavings(plan.price.monthly, plan.price.yearly);
          
          return (
            <Card
              key={plan.id}
              className={`relative bg-gradient-to-br from-gray-800/50 via-gray-700/50 to-gray-800/50 border transition-all duration-500 hover:scale-105 backdrop-blur-xl shadow-2xl ${
                plan.popular ? 'ring-2 ring-purple-500 border-purple-500 scale-105' : 'border-gray-600'
              } ${isCurrentPlan ? 'ring-2 ring-green-500 border-green-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-lg">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {isCurrentPlan && (
                <div className="absolute -top-4 right-4">
                  <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2">
                    Current Plan
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center space-y-6">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${
                  plan.id === 'free' ? 'from-gray-600 to-gray-700' :
                  plan.id === 'starter' ? 'from-blue-500 to-cyan-500' :
                  plan.id === 'professional' ? 'from-purple-500 to-pink-500' :
                  'from-yellow-500 to-orange-500'
                } ${plan.color}`}>
                  <plan.icon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-3xl text-white mb-2">{plan.name}</CardTitle>
                  <p className="text-gray-400 text-lg">{plan.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-white">
                    {formatPrice(plan.price[billingPeriod])}
                  </div>
                  {plan.price.monthly > 0 && (
                    <div className="text-lg text-gray-400">
                      per {billingPeriod === 'monthly' ? 'month' : 'year'}
                      {billingPeriod === 'yearly' && savings > 0 && (
                        <span className="text-green-400 ml-2 font-semibold">
                          (Save {savings}%)
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                        feature.included 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : 'bg-gray-600'
                      }`}>
                        {feature.included ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <span className="w-3 h-3 bg-gray-400 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`text-base ${
                          feature.included ? 'text-white font-medium' : 'text-gray-500'
                        }`}>
                          {feature.name}
                        </span>
                        {feature.limit && (
                          <div className="text-sm text-gray-400 mt-1">
                            {feature.limit}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => {
                    if (onCheckout && plan.price[billingPeriod] > 0 && plan.id !== 'enterprise' && !isCurrentPlan) {
                      onCheckout(plan.id, plan.name, plan.price[billingPeriod], billingPeriod);
                    } else {
                      onSelectPlan(plan.id);
                    }
                  }}
                  disabled={isCurrentPlan}
                  className={`w-full mt-8 text-lg py-6 transition-all duration-300 ${
                    plan.id === 'starter' 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700' 
                      : plan.id === 'professional'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : plan.id === 'enterprise'
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700'
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                  } ${isCurrentPlan ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                >
                  {isCurrentPlan ? 'Current Plan' : 
                   plan.id === 'free' ? 'Get Started' : 
                   plan.id === 'enterprise' ? 'Contact Sales' : 'Upgrade Now'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-gray-800/40 via-purple-900/20 to-gray-800/40 rounded-2xl p-8 mt-16 border border-purple-500/30">
        <h3 className="text-3xl font-semibold text-white mb-8 text-center">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Professional Feature Comparison
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6 text-blue-400" />
              <h4 className="font-semibold text-white text-lg">AI Models</h4>
            </div>
            <div className="text-gray-300 space-y-2">
              <div>Free: GPT-3.5 only</div>
              <div>Starter: 5 models</div>
              <div>Pro: All 15+ models</div>
              <div>Enterprise: Custom models</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-green-400" />
              <h4 className="font-semibold text-white text-lg">Chat Limits</h4>
            </div>
            <div className="text-gray-300 space-y-2">
              <div>Free: 10 messages/day</div>
              <div>Starter: 500 messages/day</div>
              <div>Pro: Unlimited</div>
              <div>Enterprise: Unlimited</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Workflow className="w-6 h-6 text-purple-400" />
              <h4 className="font-semibold text-white text-lg">Automation</h4>
            </div>
            <div className="text-gray-300 space-y-2">
              <div>Free: Not available</div>
              <div>Starter: Basic (5 workflows)</div>
              <div>Pro: Advanced (Unlimited)</div>
              <div>Enterprise: Custom</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-orange-400" />
              <h4 className="font-semibold text-white text-lg">Analytics</h4>
            </div>
            <div className="text-gray-300 space-y-2">
              <div>Free: Basic insights</div>
              <div>Starter: Basic analytics</div>
              <div>Pro: Advanced dashboard</div>
              <div>Enterprise: Custom reporting</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-pink-400" />
              <h4 className="font-semibold text-white text-lg">Team Features</h4>
            </div>
            <div className="text-gray-300 space-y-2">
              <div>Free: Individual only</div>
              <div>Starter: Individual only</div>
              <div>Pro: Up to 5 users</div>
              <div>Enterprise: Unlimited users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
