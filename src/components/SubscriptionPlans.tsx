
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
      { name: "Custom Templates", included: false },
      { name: "Priority Support", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: 999, yearly: 9999 },
    popular: true,
    icon: Star,
    color: "text-blue-500",
    description: "Best for professionals and power users",
    features: [
      { name: "Unlimited AI Chat", included: true },
      { name: "All AI Models", included: true, limit: "GPT-4, Claude, Gemini" },
      { name: "Advanced Templates", included: true, limit: "50+ templates" },
      { name: "Voice Input/Output", included: true },
      { name: "File Upload & Analysis", included: true, limit: "10MB files" },
      { name: "Export All Formats", included: true },
      { name: "Chat History", included: true, limit: "Unlimited" },
      { name: "Custom Templates", included: true, limit: "Unlimited" },
      { name: "Analytics Dashboard", included: true },
      { name: "Priority Support", included: true },
      { name: "Team Collaboration", included: false },
      { name: "API Access", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: 2999, yearly: 29999 },
    icon: Crown,
    color: "text-purple-500",
    description: "For teams and businesses",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Team Collaboration", included: true, limit: "Up to 10 users" },
      { name: "Advanced Analytics", included: true },
      { name: "API Access", included: true },
      { name: "Custom AI Models", included: true },
      { name: "Priority Support", included: true },
      { name: "SSO Integration", included: true },
      { name: "Data Export", included: true },
      { name: "White-label Option", included: true },
      { name: "Dedicated Support", included: true },
    ],
  },
];

interface SubscriptionPlansProps {
  onSelectPlan: (planId: string) => void;
  currentPlan?: string;
}

export function SubscriptionPlans({ onSelectPlan, currentPlan = "free" }: SubscriptionPlansProps) {
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
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Choose Your Plan</h1>
        <p className="text-xl text-gray-300">
          Unlock the full potential of AI with our flexible subscription plans
        </p>
        
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
            Monthly
          </span>
          <Switch
            checked={billingPeriod === 'yearly'}
            onCheckedChange={(checked) => setBillingPeriod(checked ? 'yearly' : 'monthly')}
            className="data-[state=checked]:bg-blue-600"
          />
          <span className={`text-sm ${billingPeriod === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
            Yearly
          </span>
          {billingPeriod === 'yearly' && (
            <Badge variant="secondary" className="bg-green-600 text-white">
              Save up to 17%
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.id;
          const savings = getYearlySavings(plan.price.monthly, plan.price.yearly);
          
          return (
            <Card
              key={plan.id}
              className={`relative bg-gray-800/50 border-gray-700 transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-blue-500 border-blue-500' : ''
              } ${isCurrentPlan ? 'ring-2 ring-green-500 border-green-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {isCurrentPlan && (
                <div className="absolute -top-3 right-4">
                  <Badge className="bg-green-600 text-white px-3 py-1">
                    Current Plan
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center space-y-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700/50 ${plan.color}`}>
                  <plan.icon className="w-8 h-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <p className="text-gray-400 mt-2">{plan.description}</p>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-white">
                    {formatPrice(plan.price[billingPeriod])}
                  </div>
                  {plan.price.monthly > 0 && (
                    <div className="text-sm text-gray-400">
                      per {billingPeriod === 'monthly' ? 'month' : 'year'}
                      {billingPeriod === 'yearly' && savings > 0 && (
                        <span className="text-green-400 ml-2">
                          (Save {savings}%)
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        feature.included 
                          ? 'bg-green-600' 
                          : 'bg-gray-600'
                      }`}>
                        {feature.included ? (
                          <Check className="w-3 h-3 text-white" />
                        ) : (
                          <span className="w-2 h-2 bg-gray-400 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm ${
                          feature.included ? 'text-white' : 'text-gray-500'
                        }`}>
                          {feature.name}
                        </span>
                        {feature.limit && (
                          <div className="text-xs text-gray-400 mt-1">
                            {feature.limit}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => onSelectPlan(plan.id)}
                  disabled={isCurrentPlan}
                  className={`w-full mt-6 ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : plan.id === 'enterprise'
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-gray-600 hover:bg-gray-700'
                  } ${isCurrentPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
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

      <div className="bg-gray-800/30 rounded-lg p-6 mt-12">
        <h3 className="text-xl font-semibold text-white mb-4">Feature Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-400" />
              <h4 className="font-medium text-white">AI Models</h4>
            </div>
            <div className="text-sm text-gray-300 space-y-1">
              <div>Free: GPT-3.5 only</div>
              <div>Pro: All models (GPT-4, Claude, Gemini)</div>
              <div>Enterprise: Custom models included</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-400" />
              <h4 className="font-medium text-white">Chat Limits</h4>
            </div>
            <div className="text-sm text-gray-300 space-y-1">
              <div>Free: 10 messages/day</div>
              <div>Pro: Unlimited</div>
              <div>Enterprise: Unlimited</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <h4 className="font-medium text-white">File Upload</h4>
            </div>
            <div className="text-sm text-gray-300 space-y-1">
              <div>Free: Not available</div>
              <div>Pro: Up to 10MB</div>
              <div>Enterprise: Unlimited</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-400" />
              <h4 className="font-medium text-white">Team Features</h4>
            </div>
            <div className="text-sm text-gray-300 space-y-1">
              <div>Free: Individual only</div>
              <div>Pro: Individual only</div>
              <div>Enterprise: Up to 10 users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
