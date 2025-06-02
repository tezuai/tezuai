
import { useState } from "react";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { UsageTracker } from "@/components/UsageTracker";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  CreditCard,
  Receipt,
  Star,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

interface SubscriptionPageProps {
  onBack: () => void;
}

export function SubscriptionPage({ onBack }: SubscriptionPageProps) {
  const { currentPlan, upgradeToPlan } = useSubscription();
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePlanSelect = (planId: string) => {
    if (planId === 'free') {
      // Free plan - immediate activation
      upgradeToPlan(planId);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else if (planId === 'enterprise') {
      // Enterprise - contact sales
      alert('Contact our sales team for Enterprise pricing: sales@example.com');
    } else {
      // Pro plan - simulate payment process
      const confirmed = confirm(`Upgrade to ${planId} plan? This would normally redirect to payment.`);
      if (confirmed) {
        upgradeToPlan(planId);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chat
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Subscription Management</h1>
            <p className="text-gray-400">Manage your subscription and billing</p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400">Successfully updated your subscription plan!</span>
          </div>
        )}

        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-6">
            <SubscriptionPlans
              onSelectPlan={handlePlanSelect}
              currentPlan={currentPlan}
            />
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <UsageTracker onUpgrade={() => handlePlanSelect('pro')} />
              </div>
              <div className="lg:col-span-2">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Usage History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-gray-400 text-center py-8">
                      <Receipt className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Usage analytics will appear here</p>
                      <p className="text-sm mt-2">Track your daily, weekly, and monthly usage patterns</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Plan Type</span>
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                      {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Status</span>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Next Billing</span>
                    <span className="text-white">
                      {currentPlan === 'free' ? 'N/A' : 'Jan 15, 2025'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Amount</span>
                    <span className="text-white font-semibold">
                      {currentPlan === 'free' ? '₹0' : 
                       currentPlan === 'pro' ? '₹999/month' : '₹2999/month'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Billing History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-400 text-center py-8">
                    <Receipt className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No billing history available</p>
                    <p className="text-sm mt-2">Your invoices will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Subscription Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Auto-renewal</h4>
                      <p className="text-gray-400 text-sm">Automatically renew your subscription</p>
                    </div>
                    <Badge className="bg-green-600">Enabled</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Usage Notifications</h4>
                      <p className="text-gray-400 text-sm">Get notified when approaching limits</p>
                    </div>
                    <Badge className="bg-blue-600">Enabled</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Billing Notifications</h4>
                      <p className="text-gray-400 text-sm">Receive billing and invoice emails</p>
                    </div>
                    <Badge className="bg-blue-600">Enabled</Badge>
                  </div>
                </div>

                {currentPlan !== 'free' && (
                  <div className="pt-6 border-t border-gray-700">
                    <Button 
                      variant="outline" 
                      className="border-red-500 text-red-400 hover:bg-red-500/10"
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
