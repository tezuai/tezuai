import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ComplianceCenter = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
          🛡️ Compliance Center
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>All systems compliant</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};