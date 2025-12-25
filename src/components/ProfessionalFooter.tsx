import { useState } from "react";
import { Heart, Globe, Shield, Zap, Star, Award, Mail, Phone, MapPin, ExternalLink, Twitter, Facebook, Instagram, Linkedin, Youtube, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface LegalDialogProps {
  title: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
}

// Safe JSX-based LegalDialog component - no dangerouslySetInnerHTML
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

// Privacy Policy Component - Safe JSX instead of HTML string
function PrivacyPolicyContent() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold text-white mb-3">1. Information Collection</h3>
        <p>At Zentara AI, we collect information to provide better services to our users. This includes:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Information you provide when creating an account</li>
          <li>Chat conversations and AI interactions</li>
          <li>Usage analytics and performance data</li>
          <li>Device information and browser data</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">2. Data Security</h3>
        <p>We implement industry-leading security measures including:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>End-to-end encryption for all conversations</li>
          <li>Advanced AI ethics monitoring</li>
          <li>GDPR and CCPA compliant data handling</li>
          <li>Regular security audits and penetration testing</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">3. AI Data Processing</h3>
        <p>Our advanced AI systems process your data with the highest privacy standards:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>No human review of private conversations</li>
          <li>Automated content moderation with privacy protection</li>
          <li>Data minimization principles applied</li>
          <li>Right to deletion and data portability</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">4. Contact Information</h3>
        <p>For privacy-related inquiries: <strong>privacy@zentara-ai.com</strong></p>
        <p>Data Protection Officer: <strong>dpo@zentara-ai.com</strong></p>
      </section>
    </div>
  );
}

// Terms of Service Component - Safe JSX instead of HTML string
function TermsOfServiceContent() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold text-white mb-3">1. Service Description</h3>
        <p>Zentara AI provides advanced artificial intelligence services including:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Multi-modal AI conversations (text, voice, image, video)</li>
          <li>Real-time knowledge and information retrieval</li>
          <li>Creative content generation and analysis</li>
          <li>Professional productivity and business intelligence tools</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">2. User Responsibilities</h3>
        <p>Users agree to:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Use the service in compliance with applicable laws</li>
          <li>Not attempt to reverse engineer or exploit the AI systems</li>
          <li>Respect intellectual property rights</li>
          <li>Report security vulnerabilities responsibly</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">3. AI Ethics and Limitations</h3>
        <p>Our AI systems are designed with ethical guidelines:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Continuous bias monitoring and correction</li>
          <li>Transparent decision-making processes</li>
          <li>Human oversight for critical applications</li>
          <li>Regular model updates for safety improvements</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">4. Service Availability</h3>
        <p>We strive for 99.9% uptime with enterprise-grade infrastructure and global CDN distribution.</p>
      </section>
    </div>
  );
}

// Cookie Policy Component - Safe JSX instead of HTML string
function CookiePolicyContent() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold text-white mb-3">1. Essential Cookies</h3>
        <p>These cookies are necessary for the website to function:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Authentication and session management</li>
          <li>Security and fraud prevention</li>
          <li>Load balancing and performance optimization</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">2. Analytics Cookies</h3>
        <p>We use analytics to improve our services:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Usage statistics and feature adoption</li>
          <li>Performance monitoring and error tracking</li>
          <li>A/B testing for user experience improvements</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">3. Preference Management</h3>
        <p>You can control cookies through your browser settings or our preference center.</p>
      </section>
    </div>
  );
}

// About Company Component - Safe JSX instead of HTML string
function AboutCompanyContent() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold text-white mb-3">Our Mission</h3>
        <p>To democratize access to advanced AI technology while maintaining the highest standards of ethics, privacy, and security.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">Founded in India</h3>
        <p>Zentara AI was founded in 2024 in Bangalore, India, with a vision to create AI that understands and respects cultural diversity while providing world-class capabilities.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">Our Team</h3>
        <p>Led by experts from IIT, IIM, and global tech companies, our team combines deep technical expertise with a commitment to responsible AI development.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">Awards & Recognition</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Best AI Innovation Award 2024 - Tech India Summit</li>
          <li>Excellence in AI Ethics - Global AI Conference</li>
          <li>Startup of the Year - Bangalore Tech Awards</li>
        </ul>
      </section>
    </div>
  );
}

export function ProfessionalFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black border-t border-gray-700/50">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Stay Updated with AI Innovation</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest updates on AI technology, new features, and exclusive insights from our research team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
            <Button className="btn-royal px-8">
              Subscribe
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
                <span className="text-2xl font-bold text-white">Zentara AI</span>
                <div className="text-sm text-emerald-400 font-semibold">ज़ेंतारा ए.आई.</div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-sm">
              India's most advanced AI assistant with cutting-edge multimodal capabilities, 
              real-time knowledge, and unmatched security. Built with love in India for the world.
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
                <span className="text-gray-300">Bank-level Security</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              {[Twitter, Facebook, Instagram, Linkedin, Youtube, Github].map((Icon, index) => (
                <Button key={index} size="sm" variant="outline" className="w-10 h-10 p-0 border-gray-600 hover:border-purple-500 hover:bg-purple-500/10">
                  <Icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* AI Features */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">AI Capabilities</h4>
            <div className="space-y-3 text-sm">
              {[
                "25+ Advanced AI Models",
                "Multimodal Processing",
                "Real-time Knowledge",
                "Voice & Video Chat",
                "Code Generation",
                "Creative Studio",
                "Business Intelligence",
                "Emotional AI"
              ].map((feature, index) => (
                <div key={index} className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Company</h4>
            <div className="space-y-3 text-sm">
              <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <LegalDialog
                  title="About Zentara AI"
                  trigger={<span className="hover:text-emerald-400 transition-colors">About Us</span>}
                >
                  <AboutCompanyContent />
                </LegalDialog>
              </div>
              {[
                "Our Story",
                "Careers",
                "Press Kit",
                "Blog",
                "Research",
                "Partnerships",
                "Investors"
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
                "API Documentation",
                "Community Forum",
                "Status Page",
                "Report Issue",
                "Feature Requests",
                "Enterprise Support"
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
                <span>support@zentara-ai.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+91-80-4567-8900</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Bangalore, India</span>
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
                <div className="text-white font-semibold">ISO 27001 Certified</div>
                <div>Enterprise Security</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Globe className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-white font-semibold">Global Availability</div>
                <div>150+ Countries</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-white font-semibold">99.9% Uptime</div>
                <div>Enterprise SLA</div>
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
                <span>© 2025 Zentara AI Technologies Pvt Ltd.</span>
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                <span>Made in India</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
              <span>All rights reserved worldwide.</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <LegalDialog
                title="Privacy Policy"
                trigger={<span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>}
              >
                <PrivacyPolicyContent />
              </LegalDialog>
              <LegalDialog
                title="Terms of Service"
                trigger={<span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Terms of Service</span>}
              >
                <TermsOfServiceContent />
              </LegalDialog>
              <LegalDialog
                title="Cookie Policy"
                trigger={<span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Cookie Policy</span>}
              >
                <CookiePolicyContent />
              </LegalDialog>
              <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">GDPR Compliance</span>
            </div>
          </div>

          {/* Additional Legal Text */}
          <div className="mt-6 text-xs text-gray-500 leading-relaxed">
            <p className="mb-2">
              <strong>Disclaimer:</strong> Zentara AI is an advanced artificial intelligence system designed to assist with various tasks. 
              While we strive for accuracy, users should verify important information independently.
              AI-generated content should be reviewed before use in critical applications.
            </p>
            <p>
              <strong>Compliance:</strong> This service complies with GDPR, CCPA, SOC 2 Type II, and other applicable data protection regulations. 
              For enterprise compliance documentation, contact our compliance team.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}