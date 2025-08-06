import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Globe,
  Lock,
  Eye,
  FileText,
  Users,
  Scale,
  Gavel,
  BookOpen,
  Flag
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  category: 'privacy' | 'security' | 'content' | 'data' | 'accessibility' | 'ethics';
  region: 'global' | 'eu' | 'us' | 'asia' | 'india';
  status: 'compliant' | 'warning' | 'violation' | 'pending';
  severity: 'low' | 'medium' | 'high' | 'critical';
  lastChecked: string;
  autoFix: boolean;
}

interface ComplianceReport {
  id: string;
  title: string;
  type: 'audit' | 'violation' | 'update' | 'certification';
  date: string;
  status: 'passed' | 'failed' | 'in-review';
  score: number;
  issues: number;
}

export function ComplianceCenter() {
  const { toast } = useToast();
  const [rules, setRules] = useState<ComplianceRule[]>([
    {
      id: '1',
      name: 'GDPR Data Processing',
      description: 'Ensure user data is processed according to GDPR regulations',
      category: 'privacy',
      region: 'eu',
      status: 'compliant',
      severity: 'critical',
      lastChecked: '2024-01-15T10:00:00Z',
      autoFix: true
    },
    {
      id: '2',
      name: 'CCPA Consumer Rights',
      description: 'Provide California consumers with data privacy rights',
      category: 'privacy',
      region: 'us',
      status: 'compliant',
      severity: 'high',
      lastChecked: '2024-01-15T09:30:00Z',
      autoFix: true
    },
    {
      id: '3',
      name: 'Content Moderation',
      description: 'AI-generated content must be appropriate and safe',
      category: 'content',
      region: 'global',
      status: 'warning',
      severity: 'medium',
      lastChecked: '2024-01-15T11:00:00Z',
      autoFix: false
    },
    {
      id: '4',
      name: 'Data Encryption Standards',
      description: 'All sensitive data must be encrypted at rest and in transit',
      category: 'security',
      region: 'global',
      status: 'compliant',
      severity: 'critical',
      lastChecked: '2024-01-15T08:45:00Z',
      autoFix: true
    },
    {
      id: '5',
      name: 'Accessibility WCAG 2.1',
      description: 'Interface must meet WCAG 2.1 AA accessibility standards',
      category: 'accessibility',
      region: 'global',
      status: 'warning',
      severity: 'medium',
      lastChecked: '2024-01-15T12:00:00Z',
      autoFix: true
    },
    {
      id: '6',
      name: 'IT Act 2000 India',
      description: 'Compliance with Indian Information Technology Act',
      category: 'data',
      region: 'india',
      status: 'compliant',
      severity: 'high',
      lastChecked: '2024-01-15T10:30:00Z',
      autoFix: true
    },
    {
      id: '7',
      name: 'AI Ethics Guidelines',
      description: 'AI systems must follow ethical AI principles',
      category: 'ethics',
      region: 'global',
      status: 'compliant',
      severity: 'high',
      lastChecked: '2024-01-15T09:00:00Z',
      autoFix: false
    }
  ]);

  const [reports, setReports] = useState<ComplianceReport[]>([
    {
      id: '1',
      title: 'Monthly GDPR Audit',
      type: 'audit',
      date: '2024-01-15',
      status: 'passed',
      score: 96,
      issues: 2
    },
    {
      id: '2',
      title: 'Security Compliance Check',
      type: 'audit',
      date: '2024-01-14',
      status: 'passed',
      score: 98,
      issues: 1
    },
    {
      id: '3',
      title: 'Content Safety Review',
      type: 'violation',
      date: '2024-01-13',
      status: 'in-review',
      score: 87,
      issues: 5
    }
  ]);

  const [autoComplianceEnabled, setAutoComplianceEnabled] = useState(true);

  const runComplianceCheck = () => {
    toast({
      title: "🔍 Compliance Check Started",
      description: "Running comprehensive compliance verification",
    });

    // Simulate compliance check
    setTimeout(() => {
      setRules(prev => prev.map(rule => ({
        ...rule,
        lastChecked: new Date().toISOString(),
        status: Math.random() > 0.2 ? 'compliant' : 'warning'
      })));

      toast({
        title: "✅ Compliance Check Complete",
        description: "All systems checked for regulatory compliance",
      });
    }, 3000);
  };

  const fixViolation = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: 'compliant' as const }
        : rule
    ));

    toast({
      title: "🔧 Violation Fixed",
      description: "Compliance issue has been automatically resolved",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': case 'passed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': case 'in-review': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'violation': case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': case 'passed': return 'bg-green-500';
      case 'warning': case 'in-review': return 'bg-yellow-500';
      case 'violation': case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'privacy': return <Eye className="w-4 h-4" />;
      case 'security': return <Lock className="w-4 h-4" />;
      case 'content': return <FileText className="w-4 h-4" />;
      case 'data': return <Globe className="w-4 h-4" />;
      case 'accessibility': return <Users className="w-4 h-4" />;
      case 'ethics': return <Scale className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getRegionFlag = (region: string) => {
    switch (region) {
      case 'eu': return '🇪🇺';
      case 'us': return '🇺🇸';
      case 'india': return '🇮🇳';
      case 'asia': return '🌏';
      default: return '🌍';
    }
  };

  const complianceScore = Math.round(
    (rules.filter(r => r.status === 'compliant').length / rules.length) * 100
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Legal Compliance Center</h1>
          <p className="text-muted-foreground mt-2">
            Global regulatory compliance and legal framework management
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Shield className="w-4 h-4 mr-2" />
            {complianceScore}% Compliant
          </Badge>
          <Button 
            onClick={runComplianceCheck}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Gavel className="w-4 h-4 mr-2" />
            Run Compliance Check
          </Button>
        </div>
      </div>

      {/* Compliance Score */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5" />
            Overall Compliance Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl font-bold text-primary">{complianceScore}%</div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                {rules.filter(r => r.status === 'compliant').length} of {rules.length} rules compliant
              </div>
            </div>
          </div>
          <Progress value={complianceScore} className="h-3" />
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rules">Compliance Rules</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <Badge variant="secondary">Compliant</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rules.filter(r => r.status === 'compliant').length}</div>
                <p className="text-sm text-muted-foreground">Rules Compliant</p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 dark:border-yellow-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  <Badge variant="secondary">Warning</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rules.filter(r => r.status === 'warning').length}</div>
                <p className="text-sm text-muted-foreground">Warnings</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Globe className="w-8 h-8 text-blue-600" />
                  <Badge variant="secondary">Regions</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-sm text-muted-foreground">Covered Regions</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 dark:border-purple-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <FileText className="w-8 h-8 text-purple-600" />
                  <Badge variant="secondary">Reports</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reports.length}</div>
                <p className="text-sm text-muted-foreground">Audit Reports</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Compliance Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {rules.filter(r => r.status !== 'compliant').slice(0, 3).map((rule) => (
                <Alert key={rule.id} className="border-yellow-200 dark:border-yellow-800">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="flex items-center justify-between">
                    <div>
                      <strong>{rule.name}</strong> - {rule.description}
                      <div className="text-xs text-muted-foreground mt-1">
                        Region: {getRegionFlag(rule.region)} {rule.region.toUpperCase()} • 
                        Severity: {rule.severity}
                      </div>
                    </div>
                    {rule.autoFix && (
                      <Button 
                        size="sm" 
                        onClick={() => fixViolation(rule.id)}
                        className="ml-4"
                      >
                        Auto Fix
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <div className="grid gap-4">
            {rules.map((rule) => (
              <Card key={rule.id} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(rule.status)}`} />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(rule.category)}
                        <CardTitle className="text-lg">{rule.name}</CardTitle>
                        {getStatusIcon(rule.status)}
                        <span className="text-lg">{getRegionFlag(rule.region)}</span>
                        <Badge variant="outline" className={`${getStatusColor(rule.status)} text-white border-none`}>
                          {rule.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {rule.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Category: {rule.category}</span>
                      <span>Severity: {rule.severity}</span>
                      <span>Last checked: {new Date(rule.lastChecked).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {rule.autoFix && (
                        <Badge variant="secondary">Auto-fix enabled</Badge>
                      )}
                      {rule.status !== 'compliant' && rule.autoFix && (
                        <Button 
                          size="sm" 
                          onClick={() => fixViolation(rule.id)}
                        >
                          Fix Now
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        {report.title}
                      </CardTitle>
                      <CardDescription>
                        {report.type} • {report.date}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(report.status)}
                        <Badge variant="outline" className={`${getStatusColor(report.status)} text-white border-none`}>
                          {report.status}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-primary">{report.score}%</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={report.score} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Compliance Score: {report.score}%</span>
                      <span>Issues Found: {report.issues}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Settings</CardTitle>
              <CardDescription>
                Configure automatic compliance monitoring and enforcement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-Compliance Mode</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically fix compliance violations when possible
                  </p>
                </div>
                <Switch 
                  checked={autoComplianceEnabled} 
                  onCheckedChange={setAutoComplianceEnabled} 
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Regional Compliance</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="flex items-center gap-2">
                      🇪🇺 European Union (GDPR)
                    </span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="flex items-center gap-2">
                      🇺🇸 United States (CCPA)
                    </span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="flex items-center gap-2">
                      🇮🇳 India (IT Act 2000)
                    </span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="flex items-center gap-2">
                      🌏 Asia Pacific
                    </span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button onClick={runComplianceCheck} className="w-full">
                <Gavel className="w-4 h-4 mr-2" />
                Run Full Compliance Audit
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}