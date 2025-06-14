"use client";
import React, { ReactNode, useState } from 'react';
import { 
  ChevronRight, 
  BarChart3, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  LineChart, 
  PiggyBank, 
  Bell, 
  ArrowRight, 
  Moon, 
  Sun, 
  Menu, 
  X,
  Sparkles,
  Github
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import GradientText from '@/MyComponents/GradientText';

// Demo dashboard data
const demoExpenseData = [
  { category: 'Rent', amount: 1200, color: '#FF6B6B' },
  { category: 'Groceries', amount: 450, color: '#4ECDC4' },
  { category: 'Transportation', amount: 200, color: '#1A535C' },
  { category: 'Entertainment', amount: 150, color: '#FFE66D' },
  { category: 'Other', amount: 250, color: '#FF9E80' }
];

export default function BudgetaryLandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-sm z-50 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className={`h-6 w-6 ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`} />
            {/* <Image src="/budgetLogo.png" height={30} width={30} alt="Budgetary Logo" className="rounded-md" /> */}
            <span className="text-xl font-bold">Budgetary</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-teal-500 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-teal-500 transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-teal-500 transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-teal-500 transition-colors">Pricing</a>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sun className={`h-4 w-4 ${isDarkMode ? 'text-gray-500' : 'text-amber-500'}`} />
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={toggleDarkMode} 
                className={`${isDarkMode ? 'bg-teal-700' : 'bg-gray-200'}`}
              />
              <Moon className={`h-4 w-4 ${isDarkMode ? 'text-teal-400' : 'text-gray-400'}`} />
            </div>
            
            <div className="hidden md:block">
              <Button 
                className={`${isDarkMode 
                  ? 'bg-teal-500 hover:bg-teal-400 text-black' 
                  : 'bg-teal-600 hover:bg-teal-500 text-white'}`}
              >
                Download App
              </Button>
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-4 space-y-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <a href="#features" className="block py-2 hover:text-teal-500">Features</a>
            <a href="#how-it-works" className="block py-2 hover:text-teal-500">How It Works</a>
            <a href="#testimonials" className="block py-2 hover:text-teal-500">Testimonials</a>
            <a href="#pricing" className="block py-2 hover:text-teal-500">Pricing</a>
            <Button 
              className={`w-full mt-4 ${isDarkMode 
                ? 'bg-teal-500 hover:bg-teal-400 text-black' 
                : 'bg-teal-600 hover:bg-teal-500 text-white'}`}
            >
              Download App
            </Button>
          </div>
        )}
      </nav>

      {/* Hero section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-0 -right-32 w-96 h-96 rounded-full ${isDarkMode ? 'bg-teal-900/20' : 'bg-teal-300/30'} blur-[100px]`}></div>
          <div className={`absolute bottom-0 -left-32 w-96 h-96 rounded-full ${isDarkMode ? 'bg-cyan-900/10' : 'bg-cyan-300/30'} blur-[100px]`}></div>
          
          {isDarkMode && (
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
          )}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className={`inline-flex items-center px-4 py-2.5 rounded-full mb-6 text-sm font-medium ${isDarkMode ? 'bg-gray-800 text-teal-400' : 'bg-teal-50 text-teal-700'}`}>
              <Sparkles className="h-4 w-4 mr-2" />
              Your personal finance revolution
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Take control of your 
              <span className={`block ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                financial future
              </span>
            </h1>
            
            <p className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              Budgetary helps you track expenses, manage subscriptions, and visualize your 
              spending habits — all in one beautiful, easy-to-use application.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className={`gap-2 ${isDarkMode 
                ? 'bg-teal-500 hover:bg-teal-400 text-black' 
                : 'bg-teal-600 hover:bg-teal-500 text-white'}`}>
                Download Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="lg" className={`gap-2 ${isDarkMode 
                ? 'border-gray-700 hover:bg-gray-800' 
                : 'border-gray-300 text-white hover:bg-blue-950'}`}>
                Learn More
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* App Screenshot Preview */}
          <div className="relative mx-auto rounded-xl overflow-hidden shadow-2xl max-w-5xl border border-teal-500/20">
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-teal-950/50 to-gray-950/50' : 'bg-gradient-to-b from-teal-50/50 to-white/50'} backdrop-blur-sm`}></div>
            
            <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl overflow-hidden relative z-10`}>
              {/* App mockup header */}
              <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-teal-50'} flex justify-between items-center`}>
                <div className="flex items-center gap-2">
                  <DollarSign className={`h-5 w-5 ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`} />
                  <span className="font-medium">Budgetary Dashboard</span>
                </div>
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              {/* App mockup content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {/* Stats cards */}
                <div className={`md:col-span-3 grid grid-cols-3 gap-4 p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-teal-50/50'}`}>
                  <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                    <h5 className="text-xs text-gray-500">Monthly Income</h5>
                    <p className="text-xl font-bold">$3,500.00</p>
                  </div>
                  <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                    <h5 className="text-xs text-gray-500">Spent This Month</h5>
                    <p className="text-xl font-bold">$2,250.00</p>
                  </div>
                  <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                    <h5 className="text-xs text-gray-500">Remaining</h5>
                    <p className="text-xl font-bold">$1,250.00</p>
                  </div>
                </div>
                
                {/* Left column */}
                <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Recent Expenses
                    </h3>
                  </div>
                  <ul className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                    <li className="py-2">Groceries - $78.45</li>
                    <li className="py-2">Restaurants - $42.30</li>
                    <li className="py-2">Transportation - $25.00</li>
                    <li className="py-2">Entertainment - $35.99</li>
                  </ul>
                </div>
                
                {/* Middle column */}
                <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Expense Breakdown
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {demoExpenseData.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.category}</span>
                          <span>${item.amount}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${(item.amount / 2250) * 100}%`, 
                              backgroundColor: item.color 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right column */}
                <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Upcoming Bills
                    </h3>
                  </div>
                  <ul className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                    <li className="py-2 flex justify-between">
                      <span>Netflix</span>
                      <span className="text-red-500">Today</span>
                    </li>
                    <li className="py-2 flex justify-between">
                      <span>Phone Bill</span>
                      <span>In 3 days</span>
                    </li>
                    <li className="py-2 flex justify-between">
                      <span>Electric Bill</span>
                      <span>In 7 days</span>
                    </li>
                    <li className="py-2 flex justify-between">
                      <span>Rent</span>
                      <span>In 12 days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Everything you need to manage your finances</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Budgetary combines powerful features with a beautiful, intuitive interface to give you 
              complete control over your financial life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart3 />}
              title="Expense Tracking"
              description="Easily log and categorize your expenses. See where your money goes with beautiful visualizations."
              isDarkMode={isDarkMode}
            />
            <FeatureCard 
              icon={<Calendar />}
              title="Cash Flow Forecast"
              description="Plan ahead with our 30-day cash flow forecast. Never be surprised by upcoming expenses."
              isDarkMode={isDarkMode}
            />
            <FeatureCard 
              icon={<Bell />}
              title="Subscription Manager"
              description="Track all your subscriptions in one place. Get alerts before payments and identify opportunities to save."
              isDarkMode={isDarkMode}
            />
            <FeatureCard 
              icon={<LineChart />}
              title="Financial Insights"
              description="Receive personalized insights about your spending habits and suggestions to improve your finances."
              isDarkMode={isDarkMode}
            />
            <FeatureCard 
              icon={<PiggyBank />}
              title="Savings Goals"
              description="Set and track savings goals for vacations, emergency funds, or major purchases."
              isDarkMode={isDarkMode}
            />
            <FeatureCard 
              icon={<DollarSign />}
              title="Budget Planning"
              description="Create smart budgets based on your income and expense history. Stay on track with real-time updates."
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>

      {/* How It Works section */}
      <section id="how-it-works" className={`py-20 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">How Budgetary works</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Getting started is easy. Follow these simple steps to take control of your finances.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="track" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="track" className={`${isDarkMode ? 'data-[state=active]:bg-gray-600 data-[state=active]:text-white' : 'data-[state=active]:bg-white data-[state=active]:text-black'}`}>
                  1. Track Expenses
                </TabsTrigger>
                <TabsTrigger value="analyze" className={`${isDarkMode ? 'data-[state=active]:bg-gray-600' : 'data-[state=active]:bg-white data-[state=active]:text-black'}`}>
                  2. Analyze Spending
                </TabsTrigger>
                <TabsTrigger value="plan" className={`${isDarkMode ? 'data-[state=active]:bg-gray-600' : 'data-[state=active]:bg-white data-[state=active]:text-black'}`}>
                  3. Plan & Save
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="track" className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                      Track your expenses effortlessly
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className={`mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-teal-900 text-teal-400' : 'bg-teal-100 text-teal-600'} flex items-center justify-center text-xs`}>1</div>
                        <p>Log expenses quickly with our intuitive form</p>
                      </li>
                      <li className="flex items-start">
                        <div className={`mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-teal-900 text-teal-400' : 'bg-teal-100 text-teal-600'} flex items-center justify-center text-xs`}>2</div>
                        <p>Categorize spending automatically or manually</p>
                      </li>
                      <li className="flex items-start">
                        <div className={`mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-teal-900 text-teal-400' : 'bg-teal-100 text-teal-600'} flex items-center justify-center text-xs`}>3</div>
                        <p>Take photos of receipts for easy record-keeping</p>
                      </li>
                      <li className="flex items-start">
                        <div className={`mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-teal-900 text-teal-400' : 'bg-teal-100 text-teal-600'} flex items-center justify-center text-xs`}>4</div>
                        <p>Set up recurring expenses to track automatically</p>
                      </li>
                    </ul>
                  </div>
                  <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-teal-100'}`}>
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                      <h4 className="text-sm font-medium mb-3">Quick Expense Entry</h4>
                      <div className="space-y-3">
                        <div>
                          <Label>Date</Label>
                          <input 
                            type="date" 
                            value="2025-04-04"
                            className={`w-full mt-1 p-2 rounded border ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600' 
                                : 'bg-white border-gray-300'
                            }`}
                            readOnly
                          />
                        </div>
                        <div>
                          <Label>Category</Label>
                          <select 
                            className={`w-full mt-1 p-2 rounded border ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600' 
                                : 'bg-white border-gray-300'
                            }`}
                          >
                            <option>Groceries</option>
                            <option>Dining Out</option>
                            <option>Transportation</option>
                            <option>Entertainment</option>
                          </select>
                        </div>
                        <div>
                          <Label>Amount</Label>
                          <input 
                            type="text" 
                            value="45.99"
                            className={`w-full mt-1 p-2 rounded border ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600' 
                                : 'bg-white border-gray-300'
                            }`}
                            readOnly
                          />
                        </div>
                        <Button 
                          className={`w-full ${isDarkMode 
                            ? 'bg-teal-500 hover:bg-teal-400 text-black' 
                            : 'bg-teal-600 hover:bg-teal-500 text-white'}`}
                        >
                          Add Expense
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analyze" className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                      Gain insights from your spending data
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className={`mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-teal-900 text-teal-400' : 'bg-teal-100 text-teal-600'} flex items-center justify-center text-xs`}>1</div>
                        <p>View beautiful charts that break down your spending by category</p>
                      </li>
                      <li className="flex items-start">
                        <div className={`mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-teal-900 text-teal-400' : 'bg-teal-100 text-teal-600'} flex items-center justify-center text-xs`}>2</div>
                        <p>Compare monthly spending trends to identify patterns</p>
                      </li>
                      <li className="flex items-start">
                        <div className={`mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-teal-900 text-teal-400' : 'bg-teal-100 text-teal-600'} flex items-center justify-center text-xs`}>3</div>
                        <p>Receive personalized insights about your habits</p>
                      </li>
                      <li className="flex items-start">
                        <div className={`mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-teal-900 text-teal-400' : 'bg-teal-100 text-teal-600'} flex items-center justify-center text-xs`}>4</div>
                        <p>Discover opportunities to reduce spending</p>
                      </li>
                    </ul>
                  </div>
                  <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-teal-50'}`}>
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                      <h4 className="text-sm font-medium mb-3">Monthly Spending Breakdown</h4>
                      <div className="space-y-3">
                        {demoExpenseData.map((item, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{item.category}</span>
                              <span>${item.amount}</span>
                            </div>
                            <div className={`h-2 w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                              <div 
                                className="h-full rounded-full" 
                                style={{ 
                                  width: `${(item.amount / 2250) * 100}%`, 
                                  backgroundColor: item.color 
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="plan" className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                      Plan your finances and grow your savings
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className={`mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-teal-900 text-teal-400' : 'bg-teal-100 text-teal-600'} flex items-center justify-center text-xs`}>1</div>
                        <p>Create custom budgets for different spending categories</p>
                      </li>
                      <li className="flex items-start">
                        <div className={`mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-teal-900 text-teal-400' : 'bg-teal-100 text-teal-600'} flex items-center justify-center text-xs`}>2</div>
                        <p>Set up savings goals and track your progress</p>
                      </li>
                      <li className="flex items-start">
                        <div className={`mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-teal-900 text-teal-400' : 'bg-teal-100 text-teal-600'} flex items-center justify-center text-xs`}>3</div>
                        <p>Get alerted when you&apos;re approaching budget limits</p>
                      </li>
                      <li className="flex items-start">
                        <div className={`mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-teal-900 text-teal-400' : 'bg-teal-100 text-teal-600'} flex items-center justify-center text-xs`}>4</div>
                        <p>Use our cash flow forecast to plan for upcoming expenses</p>
                      </li>
                    </ul>
                  </div>
                  <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-teal-50'}`}>
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                      <h4 className="text-sm font-medium mb-3">Savings Goals</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Emergency Fund</span>
                            <span>$6,500 / $10,000</span>
                          </div>
                          <div className={`h-2 w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                            <div className="h-full bg-green-500 rounded-full" style={{width: "65%"}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Vacation</span>
                            <span>$1,200 / $3,000</span>
                          </div>
                          <div className={`h-2 w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                            <div className="h-full bg-blue-500 rounded-full" style={{width: "40%"}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>New Car</span>
                            <span>$4,500 / $15,000</span>
                          </div>
                          <div className={`h-2 w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                            <div className="h-full bg-amber-500 rounded-full" style={{width: "30%"}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section id="testimonials" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">What our users are saying</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Thousands of users rely on Budgetary to manage their finances and reach their financial goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Budgetary has completely changed my approach to money. I finally feel in control of my finances!"
              author="Sarah T."
              avatar="/avatar1.jpg"
              rating={5}
              isDarkMode={isDarkMode}
            />
            <TestimonialCard
              quote="The subscription manager alone saved me over $200 by helping me identify services I wasn't really using."
              author="James M."
              avatar="/avatar2.jpg"
              rating={5}
              isDarkMode={isDarkMode}
            />
            <TestimonialCard
              quote="I was always stressed about money before using Budgetary. Now I know exactly where my money is going."
              author="Emily R."
              avatar="/avatar3.jpg"
              rating={4}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section id="pricing" className={`py-20 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Affordable plans for everyone</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Whether you&apos;re just starting your financial journey or looking for advanced features, 
              we have a plan that&apos;s right for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              tier="Free"
              price="$0"
              description="Perfect for individuals just getting started with budgeting"
              features={[
                "Unlimited expense tracking",
                "Basic spending reports",
                "Up to 2 savings goals",
                "30-day cash flow forecast"
              ]}
              recommended={false}
              isDarkMode={isDarkMode}
            />
            <PricingCard
              tier="Basic"
              price="$6.99"
              period="per month"
              description="Advanced features for personal financial management"
              features={[
                "Everything in Free",
                "Unlimited savings goals",
                "Subscription management",
                "Advanced spending insights",
                "90-day cash flow forecast",
                "Data export"
              ]}
              recommended={true}
              isDarkMode={isDarkMode}
            />
            <PricingCard
              tier="Premium"
              price="$12.99"
              period="per month"
              description="Share your budget with family members or partners"
              features={[
                "Everything in Premium",
                "Up to 5 user accounts",
                "Shared household expenses",
                "Bill splitting",
                "Financial wellness score",
                "Priority support"
              ]}
              recommended={false}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take control of your finances?</h2>
            <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Start your journey toward financial freedom today. Download Budgetary now.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className={`gap-2 ${isDarkMode 
                ? 'bg-teal-500 hover:bg-teal-400 text-black' 
                : 'bg-teal-600 hover:bg-teal-500 text-white'}`}>
                Download Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className={`mt-6 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Available for Windows, macOS, and Linux
            </p>
          </div>
        </div>
      </section>

    
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description, isDarkMode } : { icon: ReactNode, title : string, description : string, isDarkMode : boolean } ) {
  return (
    <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white text-black border-gray-200'}`}>
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          isDarkMode ? 'bg-teal-900/50 text-teal-400' : 'bg-teal-100 text-teal-600'
        }`}>
          {icon}
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

// Testimonial Card Component
function TestimonialCard({ quote, author, avatar, rating, isDarkMode } : { quote: string, author: string, avatar: string, rating: number, isDarkMode: boolean }) {
  return (
    <Card className={`${isDarkMode ? 'bg-gray-800 text-teal-400 border-gray-700' : 'bg-gray-100 text-teal-600 border-gray-200'}`}>
      <CardHeader>
        <div className="flex items-center space-x-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-lg italic mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>&quot;{quote}&quot;</p>
        
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
            {avatar ? (
              <Image src={avatar} alt='Avatar' width={500} height={500} className='w-5 h-auto object-cover' />
            ) : (
              <>
                {author.charAt(0)}
              </>
            )}
          </div>
          <span className="font-medium">{author}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Pricing Card Component
function PricingCard({ tier, price, period, description, features, recommended, isDarkMode } : { tier: string, price: string, period?: string, description: string, features: string[], recommended: boolean, isDarkMode: boolean }) {
  return (
    <Card className={`relative ${
      recommended 
        ? isDarkMode ? 'border-teal-500 text-teal-400 bg-teal-900/20' : 'border-teal-500 text-teal-600 bg-teal-50' 
        : isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white text-black border-gray-200'
    }`}>
      {recommended && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className={`inline-block py-1 px-4 rounded-full text-xs font-semibold ${
            isDarkMode ? 'bg-teal-500 text-black' : 'bg-teal-600 text-white'
          }`}>
            Recommended
          </span>
        </div>
      )}
      
      <CardHeader>
        <CardTitle>{tier}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          {period && <span className="text-sm ml-1">{period}</span>}
        </div>
        <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className={`h-5 w-5 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'} mr-2 flex-shrink-0`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full ${
            recommended
              ? isDarkMode 
                ? 'bg-teal-500 hover:bg-teal-400 text-black' 
                : 'bg-teal-600 hover:bg-teal-500 text-white'
              : isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          {recommended ? 'Get Started' : 'Choose Plan'}
        </Button>
      </CardFooter>
    </Card>
  );
}