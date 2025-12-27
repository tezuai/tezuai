import { useState } from "react";
import { Heart, Globe, Shield, Zap, Star, Award, Mail, Phone, MapPin, ExternalLink, Twitter, Facebook, Instagram, Linkedin, Youtube, Github, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface LegalDialogProps {
  title: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
}

// Safe JSX-based LegalDialog component
function LegalDialog({ title, children, trigger }: LegalDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-gray-300 leading-relaxed">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Disclaimer Component - TezuAI
function DisclaimerContent() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-amber-400" />
          <h3 className="text-xl font-bold text-amber-400">महत्वपूर्ण सूचना / Important Notice</h3>
        </div>
        <p className="text-amber-200 text-lg">
          TezuAI एक AI-powered service है। कृपया इसे समझदारी से उपयोग करें।
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">1. AI-Generated Content</h3>
        <p className="text-gray-300">TezuAI provides AI-generated content for general information only. यह content पूरी तरह से AI द्वारा generate किया जाता है।</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
          <li>AI responses may not always be 100% accurate</li>
          <li>Information should be verified from official sources</li>
          <li>Content is for informational purposes only</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">2. No Professional Advice</h3>
        <p className="text-gray-300">TezuAI does not provide legal, medical, or financial advice. हम professional advice नहीं देते हैं।</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
          <li>Legal matters: Consult a qualified lawyer</li>
          <li>Medical issues: Consult a qualified doctor</li>
          <li>Financial decisions: Consult a financial advisor</li>
          <li>Critical decisions should involve human experts</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">3. Accuracy & Reliability</h3>
        <p className="text-gray-300">We do not guarantee accuracy, completeness, or reliability of AI responses.</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
          <li>AI can make mistakes - always verify important information</li>
          <li>Real-time data may not be current</li>
          <li>AI knowledge has training cutoff dates</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">4. User Responsibility</h3>
        <p className="text-gray-300">Users should consult professionals for critical decisions. Use of TezuAI is at your own risk.</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
          <li>You are responsible for how you use AI-generated content</li>
          <li>Verify facts before making important decisions</li>
          <li>Do not rely solely on AI for life-critical situations</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">5. Limitation of Liability</h3>
        <p className="text-gray-300">TezuAI is not liable for any losses or damages arising from the use of our service.</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
          <li>No liability for inaccurate information</li>
          <li>No liability for decisions based on AI responses</li>
          <li>No liability for third-party actions</li>
        </ul>
      </section>

      <div className="bg-blue-900/30 border border-blue-500/50 rounded-xl p-4 mt-6">
        <p className="text-blue-300 text-sm">
          By using TezuAI, you acknowledge and accept this disclaimer. 
          इस सेवा का उपयोग करके, आप इस disclaimer को स्वीकार करते हैं।
        </p>
      </div>
    </div>
  );
}

// Privacy Policy Component - TezuAI
function PrivacyPolicyContent() {
  return (
    <div className="space-y-6">
      <div className="bg-emerald-900/30 border border-emerald-500/50 rounded-xl p-4">
        <p className="text-emerald-300">
          <strong>TezuAI Privacy Policy</strong> - https://tezuai.lovable.app पर आपकी privacy हमारी priority है।
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h3>
        <p>TezuAI में, हम बेहतर सेवाएं प्रदान करने के लिए जानकारी एकत्र करते हैं:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>We do not collect personally identifiable information unless voluntarily provided</li>
          <li>Non-personal data: browser type, device information, usage statistics</li>
          <li>Chat conversations for service improvement</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">2. Cookies & Ads</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>TezuAI may use cookies to enhance user experience</li>
          <li>Third-party services like Google AdSense may use cookies for relevant ads</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">3. Data Security</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>End-to-end encryption for all conversations</li>
          <li>We take reasonable measures to protect user data</li>
          <li>No online platform is 100% secure</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">4. Third-Party Links</h3>
        <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">5. User Consent</h3>
        <p>By using TezuAI, you consent to this Privacy Policy.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">6. Contact</h3>
        <p>📧 Email: <strong>support@tezuai.lovable.app</strong></p>
      </section>
    </div>
  );
}

// Terms of Service Component - TezuAI
function TermsOfServiceContent() {
  return (
    <div className="space-y-6">
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4">
        <p className="text-purple-300">
          Welcome to TezuAI. By accessing or using https://tezuai.lovable.app, you agree to the following terms.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">1. Use of Service</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>TezuAI is provided for legal and informational purposes only</li>
          <li>Users must not use the service for illegal, harmful, or abusive activities</li>
          <li>Service is for personal and commercial use as per your subscription</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">2. AI Responses</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>AI-generated responses may not always be accurate</li>
          <li>Users are responsible for verifying important information</li>
          <li>TezuAI does not guarantee correctness of AI outputs</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">3. Intellectual Property</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>All content, branding, and design of TezuAI are owned by TezuAI unless stated otherwise</li>
          <li>AI-generated content can be used by users as per subscription terms</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">4. Limitation of Liability</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>TezuAI is not liable for any losses or damages arising from the use of our service</li>
          <li>Use at your own discretion and risk</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">5. Changes to Terms</h3>
        <p>We may update these terms at any time without prior notice.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">6. Acceptance</h3>
        <p>By using TezuAI, you agree to these Terms & Conditions.</p>
      </section>
    </div>
  );
}

// Cookie Policy Component - TezuAI
function CookiePolicyContent() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold text-white mb-3">1. Essential Cookies</h3>
        <p>These cookies are necessary for TezuAI to function:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Authentication and session management</li>
          <li>Security and fraud prevention</li>
          <li>Load balancing and performance optimization</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">2. Analytics Cookies</h3>
        <p>We use analytics to improve TezuAI services:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Usage statistics and feature adoption</li>
          <li>Performance monitoring and error tracking</li>
          <li>User experience improvements</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">3. Advertising Cookies</h3>
        <p>Third-party services like Google AdSense may use cookies to display relevant ads.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">4. Preference Management</h3>
        <p>You can control cookies through your browser settings.</p>
      </section>
    </div>
  );
}

// About Company Component - TezuAI
function AboutCompanyContent() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold text-white mb-3">🚀 Our Mission</h3>
        <p>TezuAI का mission है advanced AI technology को सभी के लिए accessible बनाना - ethics, privacy, और security के highest standards के साथ।</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">🇮🇳 Made in India</h3>
        <p>TezuAI भारत में बनाया गया है - दुनिया के लिए। हम Indian culture को समझते हैं और world-class AI capabilities provide करते हैं।</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">⚡ What Makes Us Different</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Hindi & English में fluent conversation</li>
          <li>Indian context को समझने वाला AI</li>
          <li>Bank-grade security & privacy</li>
          <li>24/7 available AI assistant</li>
          <li>Creative content generation</li>
          <li>Code generation & debugging</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">📧 Contact Us</h3>
        <p>Email: <strong>support@tezuai.lovable.app</strong></p>
        <p>Website: <strong>https://tezuai.lovable.app</strong></p>
      </section>
    </div>
  );
}

export function ProfessionalFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black border-t border-gray-700/50">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-emerald-900/20 via-teal-900/20 to-cyan-900/20 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">TezuAI Updates पाएं! 🚀</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Latest AI features, tips और exclusive insights के लिए subscribe करें।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="आपका email enter करें"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
            />
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8">
              Subscribe करें
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">TezuAI</span>
                <div className="text-sm text-emerald-400 font-semibold">तेज़ू ए.आई. 🇮🇳</div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-sm">
              India का most advanced AI assistant - Hindi & English में fluent, 
              creative content generation, coding help, और 24/7 availability। 
              Made with ❤️ in India for the world.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-gray-300">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">100K+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Secure & Private</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              {[Twitter, Facebook, Instagram, Linkedin, Youtube, Github].map((Icon, index) => (
                <Button key={index} size="sm" variant="outline" className="w-10 h-10 p-0 border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10">
                  <Icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* AI Features */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">AI Features</h4>
            <div className="space-y-3 text-sm">
              {[
                "🤖 Smart AI Chat",
                "🎨 Image Generation",
                "✍️ Creative Writing",
                "💻 Code Generation",
                "🎵 Lyrics & Poetry",
                "📝 Story Writing",
                "🌐 Multilingual Support",
                "🔒 Secure & Private"
              ].map((feature, index) => (
                <div key={index} className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-2">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Company</h4>
            <div className="space-y-3 text-sm">
              <div className="text-gray-400">
                <LegalDialog
                  title="About TezuAI - हमारे बारे में"
                  trigger={<span className="hover:text-emerald-400 transition-colors cursor-pointer">About Us</span>}
                >
                  <AboutCompanyContent />
                </LegalDialog>
              </div>
              <div className="text-gray-400">
                <LegalDialog
                  title="⚠️ Disclaimer - अस्वीकरण"
                  trigger={<span className="hover:text-amber-400 transition-colors cursor-pointer">Disclaimer</span>}
                >
                  <DisclaimerContent />
                </LegalDialog>
              </div>
              {[
                "Our Story",
                "Careers",
                "Blog",
                "Press Kit",
                "Partnerships"
              ].map((item, index) => (
                <div key={index} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Support</h4>
            <div className="space-y-3 text-sm mb-6">
              {[
                "Help Center",
                "FAQs",
                "Contact Us",
                "Report Issue",
                "Feature Requests"
              ].map((item, index) => (
                <div key={index} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  {item}
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>support@tezuai.lovable.app</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Globe className="w-4 h-4" />
                <span>tezuai.lovable.app</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Made in India 🇮🇳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="flex items-center gap-3 text-gray-400">
              <Shield className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-white font-semibold">100% Secure</div>
                <div>Bank-grade Security</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Globe className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-white font-semibold">Global Access</div>
                <div>150+ Countries</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-white font-semibold">Lightning Fast</div>
                <div>Instant Responses</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Heart className="w-6 h-6 text-red-400" />
              <div>
                <div className="text-white font-semibold">100K+ Users</div>
                <div>Trusted Worldwide</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span>© 2025 TezuAI</span>
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                <span>Made in India 🇮🇳</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
              <span>All rights reserved.</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <LegalDialog
                title="🔒 Privacy Policy"
                trigger={<span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>}
              >
                <PrivacyPolicyContent />
              </LegalDialog>
              <LegalDialog
                title="📋 Terms of Service"
                trigger={<span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Terms of Service</span>}
              >
                <TermsOfServiceContent />
              </LegalDialog>
              <LegalDialog
                title="🍪 Cookie Policy"
                trigger={<span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Cookie Policy</span>}
              >
                <CookiePolicyContent />
              </LegalDialog>
              <LegalDialog
                title="⚠️ Disclaimer"
                trigger={<span className="text-gray-400 hover:text-amber-400 transition-colors cursor-pointer">Disclaimer</span>}
              >
                <DisclaimerContent />
              </LegalDialog>
            </div>
          </div>

          {/* Disclaimer Text */}
          <div className="mt-6 text-xs text-gray-500 leading-relaxed">
            <p className="mb-2">
              <strong>⚠️ Disclaimer:</strong> TezuAI provides AI-generated content for general information only. 
              We do not guarantee accuracy, completeness, or reliability of AI responses. 
              TezuAI does not provide legal, medical, or financial advice. 
              Users should consult professionals for critical decisions. Use of TezuAI is at your own risk.
            </p>
            <p>
              <strong>🔒 Privacy:</strong> TezuAI respects your privacy. We do not sell your data. 
              All conversations are encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
