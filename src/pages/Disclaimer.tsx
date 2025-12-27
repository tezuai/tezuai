import { AlertTriangle, Shield, Scale, Heart, ArrowLeft, CheckCircle, XCircle, Info, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Disclaimer() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            वापस जाएं
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TezuAI</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-amber-500/20 border border-amber-500/50 rounded-full px-6 py-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <span className="text-amber-400 font-semibold">Important Notice / महत्वपूर्ण सूचना</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Disclaimer for <span className="text-emerald-400">TezuAI</span>
          </h1>
          <p className="text-xl text-gray-400">
            TezuAI के उपयोग से पहले कृपया यह disclaimer पढ़ें
          </p>
        </div>

        {/* Main Disclaimer Card */}
        <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 border-amber-500/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-amber-400">
              <AlertTriangle className="w-8 h-8" />
              AI-Generated Content Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <p className="text-lg leading-relaxed">
              <strong>TezuAI provides AI-generated content for general information only.</strong>
            </p>
            <p className="leading-relaxed">
              TezuAI एक AI-powered service है जो general information provide करता है। 
              यह content पूरी तरह से Artificial Intelligence द्वारा generate किया जाता है।
            </p>
          </CardContent>
        </Card>

        {/* Key Points Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* No Guarantee */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-red-400">
                <XCircle className="w-6 h-6" />
                No Guarantee
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-3">We do not guarantee accuracy, completeness, or reliability of AI responses.</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  AI responses may not always be 100% accurate
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Information should be verified independently
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Real-time data may not be current
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* No Professional Advice */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-yellow-400">
                <Scale className="w-6 h-6" />
                No Professional Advice
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-3">TezuAI does not provide legal, medical, or financial advice.</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  Legal matters: Consult a qualified lawyer
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  Medical issues: Consult a qualified doctor
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  Financial decisions: Consult a financial advisor
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* User Responsibility */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-400">
                <Info className="w-6 h-6" />
                User Responsibility
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-3">Users should consult professionals for critical decisions.</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Verify important information from official sources
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Do not rely solely on AI for critical decisions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  You are responsible for how you use AI content
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Use at Own Risk */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-purple-400">
                <Shield className="w-6 h-6" />
                Use at Own Risk
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-3">Use of TezuAI is at your own risk.</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  TezuAI is not liable for any losses or damages
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  No liability for decisions based on AI responses
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  Use discretion when applying AI suggestions
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Hindi Summary */}
        <Card className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-emerald-400">
              <Heart className="w-6 h-6" />
              सारांश (Hindi Summary)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>
              <strong>TezuAI एक AI assistant है</strong> जो general information और help provide करता है। 
              लेकिन कुछ important बातें याद रखें:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>AI की information हमेशा 100% accurate नहीं होती - verify करें</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Legal, medical, financial advice के लिए professionals से मिलें</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Important decisions के लिए AI पर पूरी तरह depend न करें</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>TezuAI का use आपकी अपनी responsibility पर है</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Acceptance Notice */}
        <div className="text-center bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <p className="text-gray-300 mb-6">
            By using TezuAI, you acknowledge and accept this disclaimer.<br/>
            <span className="text-emerald-400">TezuAI का उपयोग करके, आप इस disclaimer को स्वीकार करते हैं।</span>
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3"
          >
            मैं समझ गया/गई - Continue to TezuAI
          </Button>
        </div>

        {/* Contact */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Questions? Contact us at: <strong className="text-emerald-400">support@tezuai.lovable.app</strong></p>
        </div>
      </main>
    </div>
  );
}
