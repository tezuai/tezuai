
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/50 py-4 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
          © 2025 Tezu AI Assistant. Made with 
          <Heart className="w-4 h-4 text-red-500 fill-current" /> 
          in India. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
