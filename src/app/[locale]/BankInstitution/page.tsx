"use client"
import React, { useState } from 'react';
import {
  Search,
  CreditCard,
  Building2,
  Globe,
  Shield,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Star,
  ArrowRight,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SupportedBanksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('US');

  const majorBanks = [
    { name: 'Chase Bank', logo: '🏦', users: '65M+', type: 'Major Bank' },
    { name: 'Bank of America', logo: '🏛️', users: '45M+', type: 'Major Bank' },
    { name: 'Wells Fargo', logo: '🌊', users: '35M+', type: 'Major Bank' },
    { name: 'Citibank', logo: '🏙️', users: '25M+', type: 'Major Bank' },
    { name: 'U.S. Bank', logo: '🇺🇸', users: '20M+', type: 'Major Bank' },
    { name: 'PNC Bank', logo: '💼', users: '15M+', type: 'Regional Bank' },
    { name: 'Capital One', logo: '💳', users: '18M+', type: 'Major Bank' },
    { name: 'TD Bank', logo: '🍁', users: '12M+', type: 'International' },
    { name: 'BB&T (Truist)', logo: '🏢', users: '10M+', type: 'Regional Bank' },
    { name: 'Regions Bank', logo: '🌎', users: '8M+', type: 'Regional Bank' },
    { name: 'Fifth Third Bank', logo: '5️⃣', users: '7M+', type: 'Regional Bank' },
    { name: 'KeyBank', logo: '🔑', users: '6M+', type: 'Regional Bank' }
  ];

  const creditUnions = [
    { name: 'Navy Federal Credit Union', logo: '⚓', users: '12M+', type: 'Credit Union' },
    { name: 'State Employees Credit Union', logo: '🏛️', users: '2.5M+', type: 'Credit Union' },
    { name: 'Pentagon Federal Credit Union', logo: '🛡️', users: '2.3M+', type: 'Credit Union' },
    { name: 'SchoolsFirst Federal Credit Union', logo: '🎓', users: '1.2M+', type: 'Credit Union' },
    { name: 'Golden 1 Credit Union', logo: '🥇', users: '1.1M+', type: 'Credit Union' },
    { name: 'Alliant Credit Union', logo: '🤝', users: '800K+', type: 'Credit Union' }
  ];

  const onlineBanks = [
    { name: 'Ally Bank', logo: '💻', users: '3M+', type: 'Online Bank' },
    { name: 'Marcus by Goldman Sachs', logo: '💰', users: '2M+', type: 'Online Bank' },
    { name: 'Discover Bank', logo: '🔍', users: '2.5M+', type: 'Online Bank' },
    { name: 'Capital One 360', logo: '🌐', users: '4M+', type: 'Online Bank' },
    { name: 'Charles Schwab Bank', logo: '📈', users: '1.5M+', type: 'Investment Bank' },
    { name: 'USAA Bank', logo: '🎖️', users: '1.8M+', type: 'Military Bank' }
  ];

  const internationalBanks = [
    { name: 'Royal Bank of Canada', logo: '🍁', country: 'Canada', type: 'International' },
    { name: 'TD Canada Trust', logo: '🏦', country: 'Canada', type: 'International' },
    { name: 'Scotiabank', logo: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', country: 'Canada', type: 'International' },
    { name: 'BMO Bank of Montreal', logo: '🏔️', country: 'Canada', type: 'International' },
    { name: 'CIBC', logo: '💼', country: 'Canada', type: 'International' },
    { name: 'National Bank of Canada', logo: '🇨🇦', country: 'Canada', type: 'International' }
  ];

  const stats = [
    {
      number: '11,000+',
      label: 'Financial Institutions',
      icon: <Building2 className="w-6 h-6" />,
      description: 'Banks, credit unions, and financial institutions supported'
    },
    {
      number: '99.9%',
      label: 'Connection Success Rate',
      icon: <CheckCircle className="w-6 h-6" />,
      description: 'Reliable connections to your financial accounts'
    },
    {
      number: '<30 sec',
      label: 'Average Connection Time',
      icon: <Clock className="w-6 h-6" />,
      description: 'Quick and easy account linking process'
    },
    {
      number: '256-bit',
      label: 'SSL Encryption',
      icon: <Shield className="w-6 h-6" />,
      description: 'Bank-level security for all connections'
    }
  ];

  const connectionSteps = [
    {
      step: 1,
      title: 'Select Your Bank',
      description: 'Search for and select your financial institution from our comprehensive list',
      icon: <Search className="w-6 h-6" />
    },
    {
      step: 2,
      title: 'Secure Login',
      description: 'Enter your online banking credentials through Plaid\'s secure interface',
      icon: <Shield className="w-6 h-6" />
    },
    {
      step: 3,
      title: 'Choose Accounts',
      description: 'Select which accounts you want to connect (checking, savings, credit cards)',
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      step: 4,
      title: 'Start Budgeting',
      description: 'Your transactions sync automatically and you can start managing your finances',
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const plaidFeatures = [
    {
      title: 'Read-Only Access',
      description: 'We can only view your account information, never move money or access credentials',
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: 'Real-Time Sync',
      description: 'Transactions sync automatically as they occur, keeping your data current',
      icon: <Zap className="w-5 h-5" />
    },
    {
      title: 'Multi-Account Support',
      description: 'Connect checking, savings, credit cards, and investment accounts',
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      title: 'Regulatory Compliance',
      description: 'Plaid is regulated and compliant with financial industry standards',
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  const filteredBanks = (banks: typeof majorBanks) => {
    if (!searchQuery) return banks;
    return banks.filter(bank => 
      bank.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-8 text-sm font-medium bg-gradient-to-r from-green-500/10 via-green-500/10 to-blue-500/10 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
            <Globe className="h-4 w-4 mr-2" />
            <span>11,000+ Institutions Supported</span>
            <Badge className="ml-3 bg-green-500 text-white">Via Plaid</Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Connect Any Bank
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              Securely & Instantly
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Simplicity works with virtually every bank, credit union, and financial institution 
            in the United States and Canada. Connect your accounts in seconds with bank-level security.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for your bank or credit union..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-green-500 dark:focus:border-green-400"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.number}
                  </div>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bank Categories */}
          <Tabs defaultValue="major" className="space-y-8">
            <div className="flex flex-wrap justify-center gap-2">
              <TabsList className="grid grid-cols-4 w-fit">
                <TabsTrigger value="major">Major Banks</TabsTrigger>
                <TabsTrigger value="credit-unions">Credit Unions</TabsTrigger>
                <TabsTrigger value="online">Online Banks</TabsTrigger>
                <TabsTrigger value="international">International</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="major">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Major National Banks
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  The largest banks in the United States with millions of customers
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBanks(majorBanks).map((bank, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-3">{bank.logo}</div>
                      <CardTitle className="text-lg text-gray-900 dark:text-white">
                        {bank.name}
                      </CardTitle>
                      <div className="flex justify-center gap-2 mt-2">
                        <Badge variant="outline">{bank.type}</Badge>
                        <Badge variant="secondary">{bank.users}</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="credit-unions">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Credit Unions
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Member-owned financial institutions serving specific communities
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBanks(creditUnions).map((bank, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-3">{bank.logo}</div>
                      <CardTitle className="text-lg text-gray-900 dark:text-white">
                        {bank.name}
                      </CardTitle>
                      <div className="flex justify-center gap-2 mt-2">
                        <Badge variant="outline">{bank.type}</Badge>
                        <Badge variant="secondary">{bank.users}</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="online">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Online & Digital Banks
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Digital-first banks offering competitive rates and modern features
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBanks(onlineBanks).map((bank, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-3">{bank.logo}</div>
                      <CardTitle className="text-lg text-gray-900 dark:text-white">
                        {bank.name}
                      </CardTitle>
                      <div className="flex justify-center gap-2 mt-2">
                        <Badge variant="outline">{bank.type}</Badge>
                        <Badge variant="secondary">{bank.users}</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="international">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  International Banks
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Major international banks with operations in North America
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {internationalBanks.map((bank, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-3">{bank.logo}</div>
                      <CardTitle className="text-lg text-gray-900 dark:text-white">
                        {bank.name}
                      </CardTitle>
                      <div className="flex justify-center gap-2 mt-2">
                        <Badge variant="outline">{bank.country}</Badge>
                        <Badge variant="secondary">{bank.type}</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Connection Process */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                How Bank Connection Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Connect your accounts in 4 simple steps with Plaid's secure technology
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-16">
              {connectionSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-sm">
                      {step.step}
                    </div>
                    {index < connectionSteps.length - 1 && (
                      <ArrowRight className="hidden md:block absolute top-8 -right-12 w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Plaid Security Features */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Powered by Plaid Security
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Plaid is the trusted infrastructure used by Venmo, Robinhood, and thousands of other apps
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {plaidFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Don't See Your Bank? */}
          <div className="text-center mt-16 p-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Don't see your bank or credit union?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              We support over 11,000 financial institutions. If you don't see yours listed, 
              try searching for it during the connection process - it's likely supported!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:support@codewithali.com"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Support
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <a 
                href="mailto:banks@codewithali.com"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Request Bank Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportedBanksPage;