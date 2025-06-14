
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

  const translations = {
    en: {
      settings: 'Settings',
      subtitle: 'Manage your account and app preferences',
      profile: 'Profile Information',
      profileDesc: 'Update your personal information and preferences',
      fullName: 'Full Name',
      email: 'Email Address',
      emailNote: 'Email cannot be changed',
      appearance: 'Appearance & Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      language: 'Language',
      apiIntegrations: 'API Integrations',
      apiDesc: 'Connect external services to enhance your productivity',
      showApiKeys: 'Show API Keys',
      sensitive: 'Sensitive',
      geminiKey: 'Gemini AI API Key',
      geminiPlaceholder: 'Enter your Gemini API key for AI features',
      notionToken: 'Notion Integration Token',
      notionPlaceholder: 'Enter your Notion integration token',
      notifications: 'Notifications',
      emailNotifications: 'Email Notifications',
      emailNotificationsDesc: 'Receive updates via email',
      weeklyReports: 'Weekly Reports',
      weeklyReportsDesc: 'Get weekly productivity summaries',
      habitReminders: 'Habit Reminders',
      habitRemindersDesc: 'Daily reminders for your habits',
      focusAlerts: 'Focus Session Alerts',
      focusAlertsDesc: 'Alerts when focus sessions complete',
      privacy: 'Privacy & Security',
      analytics: 'Analytics',
      analyticsDesc: 'Help improve the app with usage data',
      autoSave: 'Auto-save',
      autoSaveDesc: 'Automatically save your changes',
      dangerZone: 'Danger Zone',
      dangerDesc: 'These actions are permanent and cannot be undone',
      deleteAccount: 'Delete Account',
      save: 'Save Changes',
      saving: 'Saving...',
      success: 'Success',
      successMsg: 'Settings saved successfully!',
      error: 'Error',
      errorMsg: 'Failed to save settings',
      loadError: 'Failed to load user settings'
    },
    id: {
      settings: 'Pengaturan',
      subtitle: 'Kelola akun dan preferensi aplikasi Anda',
      profile: 'Informasi Profil',
      profileDesc: 'Perbarui informasi personal dan preferensi Anda',
      fullName: 'Nama Lengkap',
      email: 'Alamat Email',
      emailNote: 'Email tidak dapat diubah',
      appearance: 'Tampilan & Bahasa',
      theme: 'Tema',
      light: 'Terang',
      dark: 'Gelap',
      language: 'Bahasa',
      apiIntegrations: 'Integrasi API',
      apiDesc: 'Hubungkan layanan eksternal untuk meningkatkan produktivitas',
      showApiKeys: 'Tampilkan API Keys',
      sensitive: 'Sensitif',
      geminiKey: 'Kunci API Gemini AI',
      geminiPlaceholder: 'Masukkan kunci API Gemini untuk fitur AI',
      notionToken: 'Token Integrasi Notion',
      notionPlaceholder: 'Masukkan token integrasi Notion',
      notifications: 'Notifikasi',
      emailNotifications: 'Notifikasi Email',
      emailNotificationsDesc: 'Terima pembaruan melalui email',
      weeklyReports: 'Laporan Mingguan',
      weeklyReportsDesc: 'Dapatkan ringkasan produktivitas mingguan',
      habitReminders: 'Pengingat Kebiasaan',
      habitRemindersDesc: 'Pengingat harian untuk kebiasaan Anda',
      focusAlerts: 'Peringatan Sesi Fokus',
      focusAlertsDesc: 'Peringatan saat sesi fokus selesai',
      privacy: 'Privasi & Keamanan',
      analytics: 'Analitik',
      analyticsDesc: 'Bantu tingkatkan aplikasi dengan data penggunaan',
      autoSave: 'Simpan Otomatis',
      autoSaveDesc: 'Simpan perubahan secara otomatis',
      dangerZone: 'Zona Berbahaya',
      dangerDesc: 'Tindakan ini bersifat permanen dan tidak dapat dibatalkan',
      deleteAccount: 'Hapus Akun',
      save: 'Simpan Perubahan',
      saving: 'Menyimpan...',
      success: 'Berhasil',
      successMsg: 'Pengaturan berhasil disimpan!',
      error: 'Error',
      errorMsg: 'Gagal menyimpan pengaturan',
      loadError: 'Gagal memuat pengaturan pengguna'
    }
  };

  const t = translations[language];

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

    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: t.error,
        description: t.loadError,
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
        .upsert({
          user_id: user.id,
          theme: theme,
          language: language,
          gemini_api_key: settings.geminiApiKey || null,
          notion_token: settings.notionToken || null,
          updated_at: new Date().toISOString()
        });

      if (settingsError) throw settingsError;

      toast({
        title: t.success,
        description: t.successMsg
      });

    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: t.error,
        description: t.errorMsg,
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
      await signOut();
      
      toast({
        title: "Account Deletion",
        description: "Please contact support to complete account deletion.",
        variant: "destructive"
      });
    } catch (error) {
      console.error('Error during account deletion:', error);
      toast({
        title: t.error,
        description: "Failed to initiate account deletion",
        variant: "destructive"
      });
    }
  };

  const updateSetting = (key: string, value: any) => {
    console.log('Updating setting:', key, value);
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleThemeChange = (value: string) => {
    console.log('Theme change requested:', value);
    if (value && (value === 'light' || value === 'dark')) {
      setTheme(value);
    }
  };

  const handleLanguageChange = (value: string) => {
    console.log('Language change requested:', value);
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
          <h1 className="text-3xl font-bold text-[#1a1a1a] dark:text-white" style={{ fontFamily: 'Playfair Display' }}>
            {t.settings}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a]"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? t.saving : t.save}
        </Button>
      </motion.div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <User className="h-5 w-5 text-[#FFD700]" />
                <span>{t.profile}</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                {t.profileDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="dark:text-gray-300">{t.fullName}</Label>
                  <Input
                    id="fullName"
                    value={settings.fullName}
                    onChange={(e) => updateSetting('fullName', e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="dark:text-gray-300">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    disabled
                    className="bg-gray-100 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.emailNote}</p>
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
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Palette className="h-5 w-5 text-[#FFD700]" />
                <span>{t.appearance}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="flex items-center space-x-2 mb-3 dark:text-gray-300">
                    <Sun className="h-4 w-4" />
                    <span>{t.theme}</span>
                  </Label>
                  <ToggleGroup 
                    type="single" 
                    value={theme} 
                    onValueChange={handleThemeChange}
                    className="justify-start"
                  >
                    <ToggleGroupItem 
                      value="light" 
                      className="data-[state=on]:bg-[#FFD700] data-[state=on]:text-[#1a1a1a] dark:data-[state=off]:bg-gray-700 dark:data-[state=off]:text-gray-300"
                    >
                      <Sun className="h-4 w-4 mr-2" />
                      {t.light}
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="dark"
                      className="data-[state=on]:bg-[#FFD700] data-[state=on]:text-[#1a1a1a] dark:data-[state=off]:bg-gray-700 dark:data-[state=off]:text-gray-300"
                    >
                      <Moon className="h-4 w-4 mr-2" />
                      {t.dark}
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div>
                  <Label className="flex items-center space-x-2 mb-3 dark:text-gray-300">
                    <Languages className="h-4 w-4" />
                    <span>{t.language}</span>
                  </Label>
                  <ToggleGroup 
                    type="single" 
                    value={language} 
                    onValueChange={handleLanguageChange}
                    className="justify-start"
                  >
                    <ToggleGroupItem 
                      value="en"
                      className="data-[state=on]:bg-[#FFD700] data-[state=on]:text-[#1a1a1a] dark:data-[state=off]:bg-gray-700 dark:data-[state=off]:text-gray-300"
                    >
                      🇺🇸 English
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="id"
                      className="data-[state=on]:bg-[#FFD700] data-[state=on]:text-[#1a1a1a] dark:data-[state=off]:bg-gray-700 dark:data-[state=off]:text-gray-300"
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
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Key className="h-5 w-5 text-[#FFD700]" />
                <span>{t.apiIntegrations}</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                {t.apiDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Label className="dark:text-gray-300">{t.showApiKeys}</Label>
                  <Badge variant="secondary">{t.sensitive}</Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowApiKeys(!showApiKeys)}
                  className="dark:border-gray-600 dark:text-gray-300"
                >
                  {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="geminiKey" className="dark:text-gray-300">{t.geminiKey}</Label>
                  <Input
                    id="geminiKey"
                    type={showApiKeys ? "text" : "password"}
                    placeholder={t.geminiPlaceholder}
                    value={settings.geminiApiKey}
                    onChange={(e) => updateSetting('geminiApiKey', e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="notionToken" className="dark:text-gray-300">{t.notionToken}</Label>
                  <Input
                    id="notionToken"
                    type={showApiKeys ? "text" : "password"}
                    placeholder={t.notionPlaceholder}
                    value={settings.notionToken}
                    onChange={(e) => updateSetting('notionToken', e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Bell className="h-5 w-5 text-[#FFD700]" />
                <span>{t.notifications}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-gray-300">{t.emailNotifications}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.emailNotificationsDesc}</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-gray-300">{t.weeklyReports}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.weeklyReportsDesc}</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => updateSetting('weeklyReports', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-gray-300">{t.habitReminders}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.habitRemindersDesc}</p>
                  </div>
                  <Switch
                    checked={settings.habitReminders}
                    onCheckedChange={(checked) => updateSetting('habitReminders', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-gray-300">{t.focusAlerts}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.focusAlertsDesc}</p>
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
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Shield className="h-5 w-5 text-[#FFD700]" />
                <span>{t.privacy}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-gray-300">{t.analytics}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.analyticsDesc}</p>
                  </div>
                  <Switch
                    checked={settings.analyticsEnabled}
                    onCheckedChange={(checked) => updateSetting('analyticsEnabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-gray-300">{t.autoSave}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.autoSaveDesc}</p>
                  </div>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                  />
                </div>
              </div>
              
              <Separator className="dark:border-gray-600" />
              
              <div className="space-y-4">
                <div>
                  <Label className="text-red-600 dark:text-red-400">{t.dangerZone}</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {t.dangerDesc}
                  </p>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="w-full sm:w-auto"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t.deleteAccount}
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
