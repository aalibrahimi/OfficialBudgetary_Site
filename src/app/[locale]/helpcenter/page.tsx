"use client"
import React, { useState } from 'react';
import {
  Search,
  Book,
  CreditCard,
  Download,
  Shield,
  Calendar,
  Settings,
  HelpCircle,
  Play,
  CheckCircle,
  AlertTriangle,
  Users,
  Mail,
  Lightbulb,
  Heart,
  Award,
  ArrowRight,
  Eye,
  Zap,
  Globe,
  Monitor,
  Smartphone
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const HelpCenterPage = () => {
  const [selectedSection, setSelectedSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Play className="h-4 w-4" />,
    },
    {
      id: 'bank-connections',
      title: 'Bank Connections',
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      id: 'features',
      title: 'Features & Tools',
      icon: <Settings className="h-4 w-4" />,
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    {
      id: 'contact',
      title: 'Contact Support',
      icon: <Mail className="h-4 w-4" />,
    },
  ];

  const HelpSection = ({ id, title, icon, children }: { id: string; title: string; icon: React.ReactNode; children: React.ReactNode }) => {
    if (selectedSection !== id) return null;
    
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            {icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Everything you need to know about this topic</p>
          </div>
        </div>
        <div className="space-y-8">
          {children}
        </div>
      </div>
    );
  };

  const HelpCard = ({ title, children, variant = "default" }: { title?: string; children: React.ReactNode; variant?: "default" | "info" | "warning" | "success" }) => {
    const variants = {
      default: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
      info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
      warning: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800",
      success: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
    };

    return (
      <Card className={`${variants[variant]} border`}>
        {title && (
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-white">{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent className={title ? "" : "pt-6"}>
          {children}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-8 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Book className="h-4 w-4 mr-2" />
            <span>Help Center</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How can we
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              help you today?
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Find answers to common questions, learn how to use Simplicity's features, 
            and get the most out of your budgeting experience.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-2">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Browse Topics</h2>
              {helpSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    selectedSection === section.id
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {section.icon}
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            {/* Getting Started Section */}
            <HelpSection
              id="getting-started"
              title="Getting Started"
              icon={<Play className="h-6 w-6" />}
            >
              <HelpCard title="Download & Installation" variant="success">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Getting started with Simplicity is quick and easy. Follow these steps to download and install the app:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Download the installer</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Visit our homepage and click "Download Free" to get the Windows (x64) installer.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Run the installer</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">The installer is digitally signed for security. Simply run the .exe file and follow the wizard.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Create your account</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Sign up with your email and create a secure password to get started.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </HelpCard>

              <HelpCard title="System Requirements">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Minimum Requirements</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        <span>Windows 10 (x64)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>4GB RAM</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>500MB free storage</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>Internet connection</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recommended</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        <span>Windows 11</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>8GB+ RAM</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>1GB free storage</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>Stable broadband</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </HelpCard>

              <HelpCard title="Mobile Apps" variant="info">
                <div className="flex items-start gap-4">
                  <Smartphone className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      <strong>iOS and Android apps are coming in Q2 2025!</strong> We're working hard to bring the full Simplicity experience to mobile devices.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      For now, the desktop app provides the complete feature set. We'll notify all users when mobile apps are ready for download.
                    </p>
                  </div>
                </div>
              </HelpCard>
            </HelpSection>

            {/* Bank Connections Section */}
            <HelpSection
              id="bank-connections"
              title="Bank Connections"
              icon={<CreditCard className="h-6 w-6" />}
            >
              <HelpCard title="How to Connect Your Bank Account" variant="success">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Connecting your bank account is secure and takes less than 2 minutes. We use Plaid to ensure your data is protected.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Open Settings</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Go to Settings - Connected Accounts in Simplicity</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Click "Add Account"</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">This opens Plaid's secure connection interface</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Search for your bank</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">We support 11,000+ institutions including all major banks</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">4</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Enter credentials securely</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Your login goes directly to Plaid - we never see it</p>
                      </div>
                    </div>
                  </div>
                </div>
              </HelpCard>

              <HelpCard title="Supported Banks & Credit Unions">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    We support over <strong>11,000 financial institutions</strong> through our secure partnership with Plaid, including:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Major Banks</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Chase Bank</li>
                        <li>• Bank of America</li>
                        <li>• Wells Fargo</li>
                        <li>• Citibank</li>
                        <li>• U.S. Bank</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Credit Unions</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Navy Federal</li>
                        <li>• State Employees</li>
                        <li>• Pentagon Federal</li>
                        <li>• SchoolsFirst</li>
                        <li>• Golden 1</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Online Banks</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Ally Bank</li>
                        <li>• Marcus</li>
                        <li>• Discover Bank</li>
                        <li>• Capital One 360</li>
                        <li>• Charles Schwab</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </HelpCard>

              <HelpCard title="Connection Troubleshooting" variant="warning">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    If your bank isn't connecting, try these solutions:
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-orange-100 dark:bg-orange-950/30 rounded-lg">
                      <p className="font-medium text-orange-800 dark:text-orange-200 mb-1">Check your credentials</p>
                      <p className="text-orange-700 dark:text-orange-300 text-sm">Ensure your username and password are correct</p>
                    </div>
                    <div className="p-3 bg-orange-100 dark:bg-orange-950/30 rounded-lg">
                      <p className="font-medium text-orange-800 dark:text-orange-200 mb-1">Bank maintenance</p>
                      <p className="text-orange-700 dark:text-orange-300 text-sm">Wait a few hours and try again if your bank is performing maintenance</p>
                    </div>
                    <div className="p-3 bg-orange-100 dark:bg-orange-950/30 rounded-lg">
                      <p className="font-medium text-orange-800 dark:text-orange-200 mb-1">Two-factor authentication</p>
                      <p className="text-orange-700 dark:text-orange-300 text-sm">Complete any 2FA requirements during the connection process</p>
                    </div>
                  </div>
                </div>
              </HelpCard>
            </HelpSection>

            {/* Features & Tools Section */}
            <HelpSection
              id="features"
              title="Features & Tools"
              icon={<Settings className="h-6 w-6" />}
            >
              <HelpCard title="3D Credit Card Visualization">
                <div className="flex items-start gap-4">
                  <Eye className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>See exactly which card made each purchase.</strong> Simplicity automatically generates beautiful 3D visualizations of your actual bank cards based on your connected accounts.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      This unique feature helps you instantly recognize which specific card was used for each transaction, making it easy to track spending across multiple accounts and cards.
                    </p>
                  </div>
                </div>
              </HelpCard>

              <HelpCard title="Financial Calendar">
                <div className="flex items-start gap-4">
                  <Calendar className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div className="space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Plan your financial future with confidence.</strong> The financial calendar shows exactly when your income and expenses occur, helping you plan ahead.
                    </p>
                    <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                      <li>• See upcoming bill due dates</li>
                      <li>• Track payday schedules</li>
                      <li>• Plan future expenses</li>
                      <li>• Visualize cash flow timing</li>
                    </ul>
                  </div>
                </div>
              </HelpCard>

              <HelpCard title="AI-Powered Insights">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Smart recommendations that actually help.</strong> Our AI analyzes your spending patterns to provide personalized insights and recommendations.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">What AI Does:</h5>
                        <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                          <li>• Identifies spending habits</li>
                          <li>• Predicts future expenses</li>
                          <li>• Suggests budget optimizations</li>
                          <li>• Alerts to unusual patterns</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Benefits:</h5>
                        <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                          <li>• Save money automatically</li>
                          <li>• Avoid overspending</li>
                          <li>• Plan better budgets</li>
                          <li>• Reach financial goals faster</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </HelpCard>

              <HelpCard title="Income & Paystub Tracking">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Complete income management beyond just expenses.</strong> Unlike other apps that only track spending, Simplicity provides comprehensive income tracking and analysis.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">Income Features</h5>
                      <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                        <li>• Automatic paystub detection</li>
                        <li>• Year-to-date income tracking</li>
                        <li>• Income pattern analysis</li>
                        <li>• Future income planning</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Why It Matters</h5>
                      <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                        <li>• Plan for irregular pay schedules</li>
                        <li>• Track commission and bonuses</li>
                        <li>• Understand true cash flow</li>
                        <li>• Make informed financial decisions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </HelpCard>
            </HelpSection>

            {/* Security & Privacy Section */}
            <HelpSection
              id="security"
              title="Security & Privacy"
              icon={<Shield className="h-6 w-6" />}
            >
              <HelpCard title="How Your Data is Protected" variant="success">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Your financial data is protected with bank-level security.</strong> We use the same encryption and security standards as major financial institutions.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Encryption</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>256-bit SSL encryption</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Data encrypted at rest</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Secure data transmission</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Infrastructure</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Supabase secure database</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Regular security audits</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Automatic backups</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </HelpCard>

              <HelpCard title="What We Can and Cannot Access">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <h5 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      What We CAN Access
                    </h5>
                    <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                      <li>• Transaction history and descriptions</li>
                      <li>• Account balances and types</li>
                      <li>• Basic account information</li>
                      <li>• Income and recurring payments</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                    <h5 className="font-semibold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      What We CANNOT Access
                    </h5>
                    <ul className="space-y-2 text-red-700 dark:text-red-300 text-sm">
                      <li>• Your bank login credentials</li>
                      <li>• Ability to move or transfer money</li>
                      <li>• Social Security numbers</li>
                      <li>• Credit scores or detailed reports</li>
                    </ul>
                  </div>
                </div>
              </HelpCard>

              <HelpCard title="Privacy Policy" variant="info">
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Even our team cannot see your personal financial data.</strong> Your information is encrypted and completely private.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We follow strict privacy principles: collect only what's necessary, use it only for your benefit, 
                    and never sell or share your personal information with third parties.
                  </p>
                  <a 
                    href="/privacy" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Read our full Privacy Policy
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </HelpCard>
            </HelpSection>

            {/* Troubleshooting Section */}
            <HelpSection
              id="troubleshooting"
              title="Troubleshooting"
              icon={<AlertTriangle className="h-6 w-6" />}
            >
              <HelpCard title="Transactions Not Syncing" variant="warning">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Most sync issues resolve automatically within 24 hours.</strong> Here's what to try first:
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-orange-100 dark:bg-orange-950/30 rounded-lg">
                      <p className="font-medium text-orange-800 dark:text-orange-200 mb-1">1. Refresh Your Connection</p>
                      <p className="text-orange-700 dark:text-orange-300 text-sm">Go to Settings > Connected Accounts and click "Refresh" next to your bank</p>
                    </div>
                    <div className="p-3 bg-orange-100 dark:bg-orange-950/30 rounded-lg">
                      <p className="font-medium text-orange-800 dark:text-orange-200 mb-1">2. Check Bank Status</p>
                      <p className="text-orange-700 dark:text-orange-300 text-sm">Your bank might be performing maintenance - wait a few hours and try again</p>
                    </div>
                    <div className="p-3 bg-orange-100 dark:bg-orange-950/30 rounded-lg">
                      <p className="font-medium text-orange-800 dark:text-orange-200 mb-1">3. Verify Credentials</p>
                      <p className="text-orange-700 dark:text-orange-300 text-sm">Ensure your bank password hasn't changed recently</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    If problems persist after 24 hours, contact support@codewithali.com with your bank name and the specific issue.
                  </p>
                </div>
              </HelpCard>

              <HelpCard title="App Performance Issues">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Simplicity running slowly?</strong> Try these optimization steps:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Fixes</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                        <li>• Restart Simplicity</li>
                        <li>• Close other memory-intensive apps</li>
                        <li>• Check for app updates</li>
                        <li>• Restart your computer</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">System Check</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                        <li>• Ensure 8GB+ RAM available</li>
                        <li>• Check available storage space</li>
                        <li>• Verify stable internet connection</li>
                        <li>• Update Windows if needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </HelpCard>

              <HelpCard title="Update Issues">
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Simplicity automatically checks for updates on startup.</strong> You can also manually update:
                  </p>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">Manual Update Process</p>
                    <ol className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                      <li>1. Open Simplicity</li>
                      <li>2. Go to Settings > About</li>
                      <li>3. Click "Check for Updates"</li>
                      <li>4. Follow the update prompts</li>
                    </ol>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Updates include new features, security improvements, and bug fixes. We recommend always staying on the latest version.
                  </p>
                </div>
              </HelpCard>
            </HelpSection>

            {/* Contact Support Section */}
            <HelpSection
              id="contact"
              title="Contact Support"
              icon={<Mail className="h-6 w-6" />}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <HelpCard title="Email Support">
                  <div className="text-center">
                    <Mail className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">General Support</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      Get help with technical issues, account questions, and general inquiries
                    </p>
                    <a 
                      href="mailto:support@codewithali.com"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      support@codewithali.com
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      ⚡ Usually responds within 24 hours
                    </p>
                  </div>
                </HelpCard>

                <HelpCard title="Feature Requests">
                  <div className="text-center">
                    <Lightbulb className="w-10 h-10 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Ideas & Suggestions</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      Suggest new features or improvements to make Simplicity even better
                    </p>
                    <a 
                      href="mailto:features@codewithali.com"
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                      features@codewithali.com
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      💡 We love hearing your ideas!
                    </p>
                  </div>
                </HelpCard>
              </div>

              <HelpCard title="Priority Support" variant="info">
                <div className="text-center">
                  <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Premium & Business Users</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Get faster response times, phone support, and priority assistance with our Premium and Business plans.
                  </p>
                  <div className="flex justify-center gap-4">
                    <a 
                      href="/pricing"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Upgrade to Premium
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                    🚀 Includes phone & chat support, plus faster email responses
                  </p>
                </div>
              </HelpCard>

              <HelpCard>
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    We're Here to Help You Succeed
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Our mission is to help you achieve financial success. Don't hesitate to reach out - 
                    we're genuinely here to help you make the most of Simplicity.
                  </p>
                </div>
              </HelpCard>
            </HelpSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;