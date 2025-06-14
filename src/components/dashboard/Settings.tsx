import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Key,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Languages
} from 'lucide-react';

const Settings = () => {
  const { theme, language, setTheme, setLanguage } = useTheme();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    // Profile Settings
    fullName: '',
    email: '',
    
    // API Keys
    geminiApiKey: '',
    notionToken: '',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    habitReminders: true,
    focusSessionAlerts: true,
    
    // Privacy Settings
    profileVisible: false,
    analyticsEnabled: true,
    dataExport: false,
    
    // App Settings
    autoSave: true,
    compactMode: false,
    animationsEnabled: true
  });

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      // Load profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Load user settings
      const { data: userSettings } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setSettings(prev => ({
        ...prev,
        fullName: profile?.full_name || user.user_metadata?.full_name || '',
        email: user.email || '',
        geminiApiKey: userSettings?.gemini_api_key || '',
        notionToken: userSettings?.notion_token || ''
      }));

      // Update theme context if different
      if (userSettings?.theme && userSettings.theme !== theme) {
        setTheme(userSettings.theme as 'light' | 'dark');
      }
      if (userSettings?.language && userSettings.language !== language) {
        setLanguage(userSettings.language as 'en' | 'id');
      }

    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: "Error",
        description: "Failed to load user settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          full_name: settings.fullName,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      // Update user settings
      const { error: settingsError } = await supabase
        .from('user_settings')
        .update({
          theme: theme,
          language: language,
          gemini_api_key: settings.geminiApiKey || null,
          notion_token: settings.notionToken || null,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (settingsError) throw settingsError;

      toast({
        title: "Success",
        description: "Settings saved successfully!"
      });

    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      // Sign out first
      await signOut();
      
      toast({
        title: "Account Deletion",
        description: "Please contact support to complete account deletion.",
        variant: "destructive"
      });
    } catch (error) {
      console.error('Error during account deletion:', error);
      toast({
        title: "Error",
        description: "Failed to initiate account deletion",
        variant: "destructive"
      });
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleThemeChange = (value: string) => {
    if (value && (value === 'light' || value === 'dark')) {
      setTheme(value);
    }
  };

  const handleLanguageChange = (value: string) => {
    if (value && (value === 'en' || value === 'id')) {
      setLanguage(value);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD700]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'Playfair Display' }}>
            Settings
          </h1>
          <p className="text-gray-600">Manage your account and app preferences</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a]"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </motion.div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-[#FFD700]" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={settings.fullName}
                    onChange={(e) => updateSetting('fullName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-[#FFD700]" />
                <span>Appearance & Language</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="flex items-center space-x-2 mb-3">
                    <Sun className="h-4 w-4" />
                    <span>Theme</span>
                  </Label>
                  <ToggleGroup 
                    type="single" 
                    value={theme} 
                    onValueChange={handleThemeChange}
                    className="justify-start"
                  >
                    <ToggleGroupItem 
                      value="light" 
                      className="data-[state=on]:bg-[#FFD700] data-[state=on]:text-[#1a1a1a]"
                    >
                      <Sun className="h-4 w-4 mr-2" />
                      Light
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="dark"
                      className="data-[state=on]:bg-[#FFD700] data-[state=on]:text-[#1a1a1a]"
                    >
                      <Moon className="h-4 w-4 mr-2" />
                      Dark
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div>
                  <Label className="flex items-center space-x-2 mb-3">
                    <Languages className="h-4 w-4" />
                    <span>Language</span>
                  </Label>
                  <ToggleGroup 
                    type="single" 
                    value={language} 
                    onValueChange={handleLanguageChange}
                    className="justify-start"
                  >
                    <ToggleGroupItem 
                      value="en"
                      className="data-[state=on]:bg-[#FFD700] data-[state=on]:text-[#1a1a1a]"
                    >
                      🇺🇸 English
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="id"
                      className="data-[state=on]:bg-[#FFD700] data-[state=on]:text-[#1a1a1a]"
                    >
                      🇮🇩 Bahasa
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-[#FFD700]" />
                <span>API Integrations</span>
              </CardTitle>
              <CardDescription>
                Connect external services to enhance your productivity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Label>Show API Keys</Label>
                  <Badge variant="secondary">Sensitive</Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowApiKeys(!showApiKeys)}
                >
                  {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="geminiKey">Gemini AI API Key</Label>
                  <Input
                    id="geminiKey"
                    type={showApiKeys ? "text" : "password"}
                    placeholder="Enter your Gemini API key for AI features"
                    value={settings.geminiApiKey}
                    onChange={(e) => updateSetting('geminiApiKey', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="notionToken">Notion Integration Token</Label>
                  <Input
                    id="notionToken"
                    type={showApiKeys ? "text" : "password"}
                    placeholder="Enter your Notion integration token"
                    value={settings.notionToken}
                    onChange={(e) => updateSetting('notionToken', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-[#FFD700]" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-gray-500">Get weekly productivity summaries</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => updateSetting('weeklyReports', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Habit Reminders</Label>
                    <p className="text-sm text-gray-500">Daily reminders for your habits</p>
                  </div>
                  <Switch
                    checked={settings.habitReminders}
                    onCheckedChange={(checked) => updateSetting('habitReminders', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Focus Session Alerts</Label>
                    <p className="text-sm text-gray-500">Alerts when focus sessions complete</p>
                  </div>
                  <Switch
                    checked={settings.focusSessionAlerts}
                    onCheckedChange={(checked) => updateSetting('focusSessionAlerts', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-[#FFD700]" />
                <span>Privacy & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Analytics</Label>
                    <p className="text-sm text-gray-500">Help improve the app with usage data</p>
                  </div>
                  <Switch
                    checked={settings.analyticsEnabled}
                    onCheckedChange={(checked) => updateSetting('analyticsEnabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-save</Label>
                    <p className="text-sm text-gray-500">Automatically save your changes</p>
                  </div>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <Label className="text-red-600">Danger Zone</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    These actions are permanent and cannot be undone
                  </p>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="w-full sm:w-auto"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
