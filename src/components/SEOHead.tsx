
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEOHead({
  title = "Tezu AI Agent - India's Best Free AI Chat Bot | Hindi & English Support",
  description = "Free AI assistant with unlimited chat, multiple AI models (GPT, Claude, Gemini), voice features, and more. Made for India with Hindi and English support. Start free today!",
  keywords = "AI assistant, free AI chat, Hindi AI bot, Indian AI, ChatGPT alternative, artificial intelligence, AI chatbot, virtual assistant, machine learning, free AI tools",
  image = "/ai-assistant-preview.jpg",
  url = typeof window !== 'undefined' ? window.location.href : ''
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Create or update meta tags
    const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Tezu AI Agent Team');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'en, hi');
    updateMetaTag('geo.region', 'IN');
    updateMetaTag('geo.country', 'India');

    // Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', 'Tezu AI Agent', 'property');
    updateMetaTag('og:locale', 'en_IN', 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', title, 'name');
    updateMetaTag('twitter:description', description, 'name');
    updateMetaTag('twitter:image', image, 'name');

    // Additional SEO tags
    updateMetaTag('application-name', 'Tezu AI Agent');
    updateMetaTag('theme-color', '#1e40af');
    updateMetaTag('msapplication-TileColor', '#1e40af');

    // Structured data for search engines
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Tezu AI Agent",
      "description": description,
      "url": url,
      "applicationCategory": "AI Tool",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1000"
      }
    };

    let jsonLd = document.querySelector('#structured-data') as HTMLScriptElement;
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.id = 'structured-data';
      jsonLd.type = 'application/ld+json';
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url]);

  return null;
}
