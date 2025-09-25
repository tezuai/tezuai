import React from 'react';
import { Palette, Brush } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CustomizationStudio = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          🎨 Customization Studio
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme Designer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Brush className="w-5 h-5 text-purple-500" />
            <span>Custom themes available</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};