// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD SETTINGS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState } from 'react';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { Input, Textarea, Select } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { 
  Settings, 
  Store, 
  CreditCard, 
  Mail, 
  Bell, 
  Shield, 
  Globe,
  Palette,
  Database,
  Key,
  Save,
  RefreshCw
} from 'lucide-react';

interface StoreSettings {
  storeName: string;
  storeEmail: string;
  storeUrl: string;
  currency: string;
  timezone: string;
  description: string;
}

interface NotificationSettings {
  orderNotifications: boolean;
  lowStockAlerts: boolean;
  customerSignups: boolean;
  weeklyReports: boolean;
}

interface PaymentSettings {
  stripePublicKey: string;
  stripeSecretKey: string;
  testMode: boolean;
}

export default function DashboardSettingsPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('store');

  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    storeName: 'Terminal Shop',
    storeEmail: 'admin@terminal-shop.dev',
    storeUrl: 'https://terminal-shop.dev',
    currency: 'USD',
    timezone: 'America/New_York',
    description: 'Your one-stop shop for terminal and ASCII-themed merchandise.',
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    orderNotifications: true,
    lowStockAlerts: true,
    customerSignups: false,
    weeklyReports: true,
  });

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    stripePublicKey: 'pk_test_****************************',
    stripeSecretKey: 'sk_test_****************************',
    testMode: true,
  });

  const handleSave = (section: string) => {
    // In production, this would save to database/API
    console.log(`Saving ${section} settings`);
    showToast(`${section} settings saved successfully!`, 'success');
  };

  const tabs = [
    { id: 'store', label: 'Store', icon: Store },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="font-mono text-sm text-terminal-muted mb-2">
          <span className="text-terminal-green">admin@terminal-shop:~$</span> nano /etc/shop.conf
        </div>
        <h1 className="text-2xl md:text-3xl font-mono text-terminal-text">
          Settings
        </h1>
        <p className="text-terminal-muted font-mono text-sm mt-1">
          Configure your store settings
        </p>
      </div>

      {/* Settings Navigation */}
      <TerminalWindow title="settings_menu.sh">
        <div className="flex flex-wrap gap-2 p-4">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>
      </TerminalWindow>

      {/* Store Settings */}
      {activeTab === 'store' && (
        <TerminalWindow title="store.conf">
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Store className="w-5 h-5 text-terminal-green" />
              <h2 className="text-lg font-mono text-terminal-text">Store Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-mono text-terminal-muted mb-2">
                  Store Name
                </label>
                <Input
                  value={storeSettings.storeName}
                  onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-mono text-terminal-muted mb-2">
                  Contact Email
                </label>
                <Input
                  type="email"
                  value={storeSettings.storeEmail}
                  onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-mono text-terminal-muted mb-2">
                  Store URL
                </label>
                <Input
                  value={storeSettings.storeUrl}
                  onChange={(e) => setStoreSettings({ ...storeSettings, storeUrl: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-mono text-terminal-muted mb-2">
                  Currency
                </label>
                <Select
                  value={storeSettings.currency}
                  onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                  options={[
                    { value: 'USD', label: 'USD - US Dollar' },
                    { value: 'EUR', label: 'EUR - Euro' },
                    { value: 'GBP', label: 'GBP - British Pound' },
                    { value: 'CAD', label: 'CAD - Canadian Dollar' },
                    { value: 'AUD', label: 'AUD - Australian Dollar' },
                  ]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-mono text-terminal-muted mb-2">
                  Timezone
                </label>
                <Select
                  value={storeSettings.timezone}
                  onChange={(e) => setStoreSettings({ ...storeSettings, timezone: e.target.value })}
                  options={[
                    { value: 'America/New_York', label: 'Eastern Time (ET)' },
                    { value: 'America/Chicago', label: 'Central Time (CT)' },
                    { value: 'America/Denver', label: 'Mountain Time (MT)' },
                    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
                    { value: 'Europe/London', label: 'GMT/BST' },
                    { value: 'Europe/Paris', label: 'Central European Time' },
                  ]}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-mono text-terminal-muted mb-2">
                  Store Description
                </label>
                <Textarea
                  value={storeSettings.description}
                  onChange={(e) => setStoreSettings({ ...storeSettings, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-terminal-border">
              <Button onClick={() => handleSave('Store')}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </TerminalWindow>
      )}

      {/* Payment Settings */}
      {activeTab === 'payments' && (
        <TerminalWindow title="payments.conf">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-terminal-green" />
                <h2 className="text-lg font-mono text-terminal-text">Payment Settings</h2>
              </div>
              <Badge variant={paymentSettings.testMode ? 'warning' : 'success'}>
                {paymentSettings.testMode ? 'Test Mode' : 'Live Mode'}
              </Badge>
            </div>

            <div className="bg-terminal-warning/10 border border-terminal-warning/30 rounded p-4">
              <p className="text-terminal-warning text-sm font-mono">
                ⚠️ You are currently in test mode. No real payments will be processed.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-terminal-muted mb-2">
                  Stripe Publishable Key
                </label>
                <Input
                  value={paymentSettings.stripePublicKey}
                  onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePublicKey: e.target.value })}
                  placeholder="pk_test_..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-mono text-terminal-muted mb-2">
                  Stripe Secret Key
                </label>
                <Input
                  type="password"
                  value={paymentSettings.stripeSecretKey}
                  onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })}
                  placeholder="sk_test_..."
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="testMode"
                  checked={paymentSettings.testMode}
                  onChange={(e) => setPaymentSettings({ ...paymentSettings, testMode: e.target.checked })}
                  className="w-4 h-4 accent-terminal-green"
                />
                <label htmlFor="testMode" className="text-sm font-mono text-terminal-text">
                  Enable Test Mode
                </label>
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-terminal-border">
              <Button onClick={() => handleSave('Payment')}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </TerminalWindow>
      )}

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <TerminalWindow title="notifications.conf">
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="w-5 h-5 text-terminal-green" />
              <h2 className="text-lg font-mono text-terminal-text">Notification Settings</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { key: 'orderNotifications', label: 'New Order Notifications', description: 'Receive email when a new order is placed' },
                { key: 'lowStockAlerts', label: 'Low Stock Alerts', description: 'Get notified when product stock is low' },
                { key: 'customerSignups', label: 'Customer Signups', description: 'Notification when new customers register' },
                { key: 'weeklyReports', label: 'Weekly Reports', description: 'Receive weekly sales and analytics reports' },
              ].map((setting) => (
                <div key={setting.key} className="flex items-start justify-between p-4 border border-terminal-border rounded">
                  <div>
                    <p className="font-mono text-terminal-text">{setting.label}</p>
                    <p className="text-sm text-terminal-muted">{setting.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings[setting.key as keyof NotificationSettings]}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      [setting.key]: e.target.checked
                    })}
                    className="w-5 h-5 accent-terminal-green mt-1"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex justify-end pt-4 border-t border-terminal-border">
              <Button onClick={() => handleSave('Notification')}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </TerminalWindow>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <TerminalWindow title="security.conf">
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-terminal-green" />
              <h2 className="text-lg font-mono text-terminal-text">Security Settings</h2>
            </div>

            <div className="space-y-6">
              <div className="p-4 border border-terminal-border rounded">
                <h3 className="font-mono text-terminal-text mb-2">Password</h3>
                <p className="text-sm text-terminal-muted mb-4">Change your admin password</p>
                <div className="space-y-3">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button className="mt-4" variant="secondary">
                  Update Password
                </Button>
              </div>

              <div className="p-4 border border-terminal-border rounded">
                <h3 className="font-mono text-terminal-text mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-terminal-muted mb-4">Add an extra layer of security</p>
                <Badge variant="secondary">Not Enabled</Badge>
                <Button className="mt-4 ml-4" variant="secondary">
                  Enable 2FA
                </Button>
              </div>

              <div className="p-4 border border-terminal-border rounded">
                <h3 className="font-mono text-terminal-text mb-2">Active Sessions</h3>
                <p className="text-sm text-terminal-muted mb-4">Manage your active login sessions</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-terminal-green/10 rounded">
                    <div>
                      <p className="text-sm font-mono text-terminal-text">Current Session</p>
                      <p className="text-xs text-terminal-muted">Windows • Chrome • San Francisco</p>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
                <Button className="mt-4" variant="danger">
                  Sign Out All Other Sessions
                </Button>
              </div>
            </div>
          </div>
        </TerminalWindow>
      )}

      {/* API Keys */}
      {activeTab === 'api' && (
        <TerminalWindow title="api_keys.conf">
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Key className="w-5 h-5 text-terminal-green" />
              <h2 className="text-lg font-mono text-terminal-text">API Keys</h2>
            </div>

            <div className="bg-terminal-bg border border-terminal-border rounded p-4 font-mono text-sm">
              <p className="text-terminal-muted mb-2"># Environment Variables</p>
              <div className="space-y-1">
                <p><span className="text-terminal-accent">NEXT_PUBLIC_STRIPE_KEY</span>=<span className="text-terminal-green">pk_test_****</span></p>
                <p><span className="text-terminal-accent">STRIPE_SECRET_KEY</span>=<span className="text-terminal-green">sk_test_****</span></p>
                <p><span className="text-terminal-accent">STRIPE_WEBHOOK_SECRET</span>=<span className="text-terminal-green">whsec_****</span></p>
                <p><span className="text-terminal-accent">NEXT_PUBLIC_SUPABASE_URL</span>=<span className="text-terminal-green">https://****</span></p>
                <p><span className="text-terminal-accent">SUPABASE_SERVICE_KEY</span>=<span className="text-terminal-green">eyJ****</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-terminal-border rounded">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-mono text-terminal-text">Public API Key</h3>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Input value="pk_live_************************" readOnly className="font-mono" />
                  <Button variant="secondary" size="sm">Copy</Button>
                </div>
                <p className="text-xs text-terminal-muted mt-2">
                  Created: Jan 1, 2024 • Last used: 2 hours ago
                </p>
              </div>

              <div className="p-4 border border-terminal-border rounded">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-mono text-terminal-text">Secret API Key</h3>
                  <Badge variant="warning">Hidden</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Input value="sk_live_••••••••••••••••••••••••" readOnly className="font-mono" type="password" />
                  <Button variant="secondary" size="sm">Reveal</Button>
                </div>
                <p className="text-xs text-terminal-muted mt-2">
                  ⚠️ Never share your secret key. Keep it secure.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-terminal-border">
              <Button variant="secondary">
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate Keys
              </Button>
            </div>
          </div>
        </TerminalWindow>
      )}
    </div>
  );
}
