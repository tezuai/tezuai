import { Heart, Globe, Shield, Zap, Star, Award, Bot, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-gradient-to-r from-gray-950 via-emerald-950/20 to-gray-950 backdrop-blur-xl border-t border-emerald-900/30 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">TezuAI</span>
                <div className="text-xs text-emerald-400">तेज़ू ए.आई. 2026</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              India's most advanced AI assistant with next-gen 2026 features.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-emerald-400 fill-current" />
                <span className="text-sm text-gray-400">5.0/5 Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-gray-400">500K+ Users</span>
              </div>
            </div>
            {/* Real-time clock */}
            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <Clock className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString('hi-IN')}</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-4">Features 2026</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">AI Chat Assistant</div>
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">Image Generator</div>
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">Voice Interface</div>
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">Creative Studio</div>
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">Templates Library</div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">About TezuAI</div>
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">Blog</div>
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">Careers</div>
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">Contact</div>
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">Press</div>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">Help Center</div>
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">Community</div>
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">Status</div>
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">API Docs</div>
              <div className="hover:text-emerald-400 transition-colors cursor-pointer">Feedback</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-emerald-900/30 pt-6 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Quantum-Grade Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-400" />
              <span>Available in 195+ Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>99.99% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400" />
              <span>500,000+ Happy Users</span>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-emerald-900/30 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              © 2026 TezuAI. Made with 
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> 
              in India 🇮🇳. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="hover:text-emerald-400 transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-emerald-400 transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-emerald-400 transition-colors cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
