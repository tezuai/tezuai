
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Settings, 
  Palette, 
  Zap, 
  Shield, 
  Database, 
  Bell, 
  Download, 
  Upload,
  RefreshCw,
  Save,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdvancedSettingsProps {
  onSettingsChange: (settings: any) => void;
  currentSettings: any;
}

export function AdvancedSettings({ onSettingsChange, currentSettings }: AdvancedSettingsProps) {
  const [settings, setSettings] = useState({
    // AI Configuration
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    systemPrompt: "You are a helpful AI assistant.",
    
    // Appearance
    theme: "dark",
    fontSize: 14,
    fontFamily: "Inter",
    messageSpacing: "normal",
    showTimestamps: true,
    showWordCount: true,
    animationsEnabled: true,
    
    // Behavior
    autoSave: true,
    autoSaveInterval: 30,
    confirmBeforeDelete: true,
    enableNotifications: true,
    enableSounds: false,
    autoScrollToBottom: true,
    typingIndicatorDelay: 1000,
    
    // Privacy & Security
    storeLocally: true,
    enableAnalytics: false,
    shareUsageData: false,
    encryptConversations: false,
    
    // Advanced Features
    enableVoice: true,
    enableFileUpload: true,
    maxFileSize: 10,
    allowedFileTypes: ["pdf", "txt", "doc", "docx", "png", "jpg"],
    enableCollaboration: false,
    enablePlugins: false,
    
    // Export/Import
    defaultExportFormat: "json",
    includeSystemMessages: false,
    compressExports: true,
    
    ...currentSettings
  });

  const { toast } = useToast();

  useEffect(() => {
    setSettings(prev => ({ ...prev, ...currentSettings }));
  }, [currentSettings]);

  const updateSetting = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      model: "gpt-4",
      temperature: 0.7,
      maxTokens: 1000,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      systemPrompt: "You are a helpful AI assistant.",
      theme: "dark",
      fontSize: 14,
      fontFamily: "Inter",
      messageSpacing: "normal",
      showTimestamps: true,
      showWordCount: true,
      animationsEnabled: true,
      autoSave: true,
      autoSaveInterval: 30,
      confirmBeforeDelete: true,
      enableNotifications: true,
      enableSounds: false,
      autoScrollToBottom: true,
      typingIndicatorDelay: 1000,
      storeLocally: true,
      enableAnalytics: false,
      shareUsageData: false,
      encryptConversations: false,
      enableVoice: true,
      enableFileUpload: true,
      maxFileSize: 10,
      allowedFileTypes: ["pdf", "txt", "doc", "docx", "png", "jpg"],
      enableCollaboration: false,
      enablePlugins: false,
      defaultExportFormat: "json",
      includeSystemMessages: false,
      compressExports: true,
    };
    
    setSettings(defaultSettings);
    onSettingsChange(defaultSettings);
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to defaults.",
    });
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'ai-chat-settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Settings Exported",
      description: "Your settings have been exported successfully.",
    });
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings({ ...settings, ...importedSettings });
          onSettingsChange({ ...settings, ...importedSettings });
          toast({
            title: "Settings Imported",
            description: "Your settings have been imported successfully.",
          });
        } catch (error) {
          toast({
            title: "Import Error",
            description: "Failed to import settings. Please check the file format.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Advanced Settings
          </CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={exportSettings}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button size="sm" variant="outline" asChild>
              <label htmlFor="import-settings" className="cursor-pointer">
                <Upload className="w-4 h-4 mr-1" />
                Import
                <input
                  id="import-settings"
                  type="file"
                  accept=".json"
                  onChange={importSettings}
                  className="hidden"
                />
              </label>
            </Button>
            <Button size="sm" variant="destructive" onClick={resetToDefaults}>
              <RefreshCw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ai" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-700">
            <TabsTrigger value="ai" className="text-xs">AI Config</TabsTrigger>
            <TabsTrigger value="appearance" className="text-xs">Appearance</TabsTrigger>
            <TabsTrigger value="behavior" className="text-xs">Behavior</TabsTrigger>
            <TabsTrigger value="privacy" className="text-xs">Privacy</TabsTrigger>
            <TabsTrigger value="features" className="text-xs">Features</TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="mt-4">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                <div>
                  <Label className="text-white">AI Model</Label>
                  <Select value={settings.model} onValueChange={(value) => updateSetting('model', value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white">Temperature: {settings.temperature}</Label>
                  <Slider
                    value={[settings.temperature]}
                    onValueChange={(value) => updateSetting('temperature', value[0])}
                    min={0}
                    max={2}
                    step={0.1}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-400 mt-1">Controls randomness in responses</p>
                </div>

                <div>
                  <Label className="text-white">Max Tokens: {settings.maxTokens}</Label>
                  <Slider
                    value={[settings.maxTokens]}
                    onValueChange={(value) => updateSetting('maxTokens', value[0])}
                    min={100}
                    max={4000}
                    step={100}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-white">Top P: {settings.topP}</Label>
                  <Slider
                    value={[settings.topP]}
                    onValueChange={(value) => updateSetting('topP', value[0])}
                    min={0}
                    max={1}
                    step={0.1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-white">System Prompt</Label>
                  <Textarea
                    value={settings.systemPrompt}
                    onChange={(e) => updateSetting('systemPrompt', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white mt-2"
                    rows={3}
                  />
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="appearance" className="mt-4">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                <div>
                  <Label className="text-white">Theme</Label>
                  <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white">Font Size: {settings.fontSize}px</Label>
                  <Slider
                    value={[settings.fontSize]}
                    onValueChange={(value) => updateSetting('fontSize', value[0])}
                    min={12}
                    max={20}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-white">Font Family</Label>
                  <Select value={settings.fontFamily} onValueChange={(value) => updateSetting('fontFamily', value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Fira Code">Fira Code (Monospace)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-white">Show Timestamps</Label>
                  <Switch
                    checked={settings.showTimestamps}
                    onCheckedChange={(checked) => updateSetting('showTimestamps', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-white">Enable Animations</Label>
                  <Switch
                    checked={settings.animationsEnabled}
                    onCheckedChange={(checked) => updateSetting('animationsEnabled', checked)}
                  />
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="behavior" className="mt-4">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Auto Save</Label>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                  />
                </div>

                <div>
                  <Label className="text-white">Auto Save Interval: {settings.autoSaveInterval}s</Label>
                  <Slider
                    value={[settings.autoSaveInterval]}
                    onValueChange={(value) => updateSetting('autoSaveInterval', value[0])}
                    min={10}
                    max={300}
                    step={10}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-white">Confirm Before Delete</Label>
                  <Switch
                    checked={settings.confirmBeforeDelete}
                    onCheckedChange={(checked) => updateSetting('confirmBeforeDelete', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-white">Enable Notifications</Label>
                  <Switch
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) => updateSetting('enableNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-white">Auto Scroll to Bottom</Label>
                  <Switch
                    checked={settings.autoScrollToBottom}
                    onCheckedChange={(checked) => updateSetting('autoScrollToBottom', checked)}
                  />
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="privacy" className="mt-4">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Store Data Locally</Label>
                    <p className="text-xs text-gray-400">Save conversations in browser storage</p>
                  </div>
                  <Switch
                    checked={settings.storeLocally}
                    onCheckedChange={(checked) => updateSetting('storeLocally', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Enable Analytics</Label>
                    <p className="text-xs text-gray-400">Help improve the application</p>
                  </div>
                  <Switch
                    checked={settings.enableAnalytics}
                    onCheckedChange={(checked) => updateSetting('enableAnalytics', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Encrypt Conversations</Label>
                    <p className="text-xs text-gray-400">End-to-end encryption (experimental)</p>
                  </div>
                  <Switch
                    checked={settings.encryptConversations}
                    onCheckedChange={(checked) => updateSetting('encryptConversations', checked)}
                  />
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="features" className="mt-4">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Enable Voice Interface</Label>
                  <Switch
                    checked={settings.enableVoice}
                    onCheckedChange={(checked) => updateSetting('enableVoice', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-white">Enable File Upload</Label>
                  <Switch
                    checked={settings.enableFileUpload}
                    onCheckedChange={(checked) => updateSetting('enableFileUpload', checked)}
                  />
                </div>

                <div>
                  <Label className="text-white">Max File Size: {settings.maxFileSize}MB</Label>
                  <Slider
                    value={[settings.maxFileSize]}
                    onValueChange={(value) => updateSetting('maxFileSize', value[0])}
                    min={1}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-white">Enable Collaboration</Label>
                  <Switch
                    checked={settings.enableCollaboration}
                    onCheckedChange={(checked) => updateSetting('enableCollaboration', checked)}
                  />
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="advanced" className="mt-4">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                <div>
                  <Label className="text-white">Default Export Format</Label>
                  <Select value={settings.defaultExportFormat} onValueChange={(value) => updateSetting('defaultExportFormat', value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="txt">Text</SelectItem>
                      <SelectItem value="markdown">Markdown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-white">Include System Messages in Export</Label>
                  <Switch
                    checked={settings.includeSystemMessages}
                    onCheckedChange={(checked) => updateSetting('includeSystemMessages', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-white">Compress Exports</Label>
                  <Switch
                    checked={settings.compressExports}
                    onCheckedChange={(checked) => updateSetting('compressExports', checked)}
                  />
                </div>

                <div className="p-4 bg-gray-700/30 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Danger Zone</h4>
                  <p className="text-sm text-gray-400 mb-3">These actions cannot be undone.</p>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All Data
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
