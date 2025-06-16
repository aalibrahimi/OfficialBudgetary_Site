"use client";
import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Users,
  Bell,
  FileText,
  Mail,
  Phone,
  Globe,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GradientText from "@/MyComponents/GradientText";

// Sidebar navigation items
const sidebarItems = [
  {
    id: "overview",
    title: "Overview",
    icon: <Eye className="h-4 w-4" />,
    route: null, // Internal section
  },
  {
    id: "data-collection",
    title: "Data We Collect",
    icon: <Database className="h-4 w-4" />,
    route: null,
  },
  {
    id: "data-usage",
    title: "How We Use Data",
    icon: <Users className="h-4 w-4" />,
    route: null,
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: <Lock className="h-4 w-4" />,
    route: null,
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    icon: <Globe className="h-4 w-4" />,
    route: null,
  },
  {
    id: "user-rights",
    title: "Your Rights",
    icon: <Shield className="h-4 w-4" />,
    route: null,
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: <Mail className="h-4 w-4" />,
    route: null,
  },
  // External routes
  {
    id: "terms",
    title: "Terms of Use",
    icon: <FileText className="h-4 w-4" />,
    route: "/terms",
    external: true,
  },
  {
    id: "security",
    title: "Security Policy",
    icon: <Lock className="h-4 w-4" />,
    route: "/security",
    external: true,
  },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //  this is how we arae going Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarItems.filter((item) => !item.external);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#000000] dark:text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div>
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  <GradientText gradient="from-black to-neutral-700 dark:from-white/90 dark:to-neutral-300">
                    Privacy Policy
                  </GradientText>
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Last updated: June 12, 2025
                </p>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div
            className={`md:w-80 md:flex-shrink-0 ${sidebarOpen ? "block" : "hidden md:block"}`}
          >
            <div className="sticky top-24">
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    Legal Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-1">
                    {sidebarItems.map((item) => (
                      <div key={item.id}>
                        {item.external ? (
                          <Link
                            href={item.route!}
                            className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors hover:bg-teal-500 hover:text-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                          >
                            <div className="flex items-center gap-2">
                              {item.icon}
                              {item.title}
                            </div>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        ) : (
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors hover:bg-teal-500 hover:text-white ${
                              activeSection === item.id
                                ? "bg-teal-500 text-white dark:bg-teal-500 dark:text-black"
                                : "hover:bg-teal-500 hover:text-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-2 ">
                              {item.icon}
                              {item.title}
                            </div>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-none">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {/* Overview Section */}
              <section id="overview" className="mb-12">
                <Card className="bg-gradient white dark:from-gray-900 dark:to-teal-900/20 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      {/* <Eye className="h-6 w-6 text-teal-600 dark:text-teal-400" /> */}
                      About This Privacy Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Budgetary is a personal finance application developed and
                      operated by <strong>CodeWithAli</strong>, a technology
                      company founded by Ali Alibrahimi (CEO & Owner) and Hanif
                      Palm (Co-Founder & COO). We are committed to providing you
                      with powerful budgeting tools while maintaining the
                      highest standards of data security and privacy protection.
                    </p>
                    <div className="bg-white dark:bg-teal-950/30 p-4 rounded-lg border-l-4 border-teal-500 dark:border-teal-400">
                      <p className="font-medium text-teal-700 dark:text-teal-200">
                        <strong>Our Mission:</strong> To help you take control
                        of your finances through innovative technology, backed
                        by enterprise-grade security and complete transparency
                        about how we handle your data.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Data Collection Section */}
              <section id="data-collection" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Database className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  What Data We Access and Why
                </h2>

                <div className="grid gap-6">
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-teal-600 dark:text-teal-400">
                        Financial Data via Plaid
                      </CardTitle>
                      <CardDescription>
                        When you connect your bank accounts, we access the
                        following information through our secure integration
                        with Plaid Inc.:
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">
                            Account Information:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                            <li>Account names, types, and balances</li>
                            <li>
                              Account numbers (encrypted and never stored in
                              readable format)
                            </li>
                            <li>Routing numbers for account identification</li>
                            <li>Account ownership verification</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">
                            Transaction Data:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                            <li>
                              Transaction amounts, dates, and descriptions
                            </li>
                            <li>Merchant information and categories</li>
                            <li>Transaction status (pending, posted, etc.)</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">
                            Authentication Data:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                            <li>
                              Account verification tokens (not your banking
                              passwords)
                            </li>
                            <li>Connection status and last sync timestamps</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600 dark:text-green-400">
                        Data We Create About You
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                          <strong>Profile Information:</strong> Name, email
                          address, and account preferences
                        </li>
                        <li>
                          <strong>Budget Data:</strong> Budget categories and
                          financial goals you set
                        </li>
                        <li>
                          <strong>Usage Analytics:</strong> App usage patterns
                          and feature preferences
                        </li>
                        <li>
                          <strong>Support Records:</strong> Customer support
                          interactions
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-red-800 dark:text-red-400">
                        We Will NOT Have Access To:
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-black dark:text-red-300">
                        <li>Your online banking credentials</li>
                        <li>Your Social Security Number</li>
                        <li>Credit scores or credit reports</li>
                        <li>Investment account passwords</li>
                        <li>
                          Any data unrelated to budgeting and expense tracking
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Data Usage Section */}
              <section id="data-usage" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Users className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  How We Use Your Data
                </h2>

                <div className="grid gap-6">
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600 dark:text-green-400">
                        Primary Uses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Categorize and organize your transactions</li>
                        <li>
                          Generate spending insights and budget recommendations
                        </li>
                        <li>Provide account balances and spending alerts</li>
                        <li>
                          Create personalized financial reports and trends
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-teal-600 dark:text-blue-400">
                        Secondary Uses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Improve app performance and user experience</li>
                        <li>Develop new features based on usage patterns</li>
                        <li>Ensure system security and prevent fraud</li>
                        <li>Provide customer support and troubleshooting</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-black border-teal-200 dark:border-teal-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-teal-600 dark:text-teal-400">
                        Data Minimization Principle
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        We only collect and process data that is directly
                        necessary for providing our budgeting services.
                      </p>
                      <div className="bg-white dark:bg-black p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          We do NOT engage in:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                          <li>Behavioral advertising or user profiling</li>
                          <li>Data mining for commercial purposes</li>
                          <li>Cross-platform tracking or data correlation</li>
                          <li>Unnecessary data collection or retention</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Data Security Section */}
              <section id="data-security" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Lock className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  How We Secure Your Data
                </h2>

                <div className="grid gap-6">
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-purple-600 dark:text-purple-400">
                        Database Protection
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                          All data stored in Supabase with enterprise-grade
                          security
                        </li>
                        <li>End-to-end encryption using AES-256 encryption</li>
                        <li>
                          Database access restricted to authorized personnel
                          only
                        </li>
                        <li>Row-level security policies implemented</li>
                        <li>
                          Regular automated backups with encryption at rest
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-600 dark:text-blue-400">
                        Application Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Two-factor authentication (2FA)</li>
                        <li>Session management with automatic timeout</li>
                        <li>API rate limiting and abuse prevention</li>
                        <li>Regular security audits and penetration testing</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600 dark:text-green-400">
                        Encryption Standards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                          <strong>Data in Transit:</strong> TLS 1.3 encryption
                          for all communications
                        </li>
                        <li>
                          <strong>Data at Rest:</strong> AES-256 encryption for
                          all stored data
                        </li>
                        <li>
                          <strong>Financial Data:</strong> Additional encryption
                          layer with rotating keys
                        </li>
                        <li>
                          <strong>Backup Data:</strong> Military-grade
                          encryption standards
                        </li>
                        <li>
                          <strong>API Communications:</strong> End-to-end
                          encryption with Plaid and all third parties
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Third-Party Services Section */}
              <section id="third-party" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Globe className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  Third-Party Integrations
                </h2>

                <div className="grid gap-6">
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-600 dark:text-blue-400 flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Plaid Inc. - Financial Data Provider
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p>
                          <strong>What they do:</strong> Securely connect your
                          bank accounts to our app
                        </p>
                        <p>
                          <strong>Data Shared:</strong> Account information and
                          transaction history
                        </p>
                        <p>
                          <strong>Security:</strong> Bank-level security,
                          regulated by financial authorities
                        </p>
                        <p>
                          <strong>Access Model:</strong> Read-only access,
                          cannot move money or make transactions
                        </p>
                        <div className="mt-4">
                          <a
                            href="https://plaid.com/safety/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          >
                            View Plaid's Safety Page{" "}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600 dark:text-green-400 flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        Supabase - Database Infrastructure
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p>
                          <strong>What they do:</strong> Secure cloud database
                          hosting for your data
                        </p>
                        <p>
                          <strong>Data Stored:</strong> Encrypted user profiles
                          and financial information
                        </p>
                        <p>
                          <strong>Security:</strong> SOC 2 Type II compliant,
                          GDPR compliant
                        </p>
                        <p>
                          <strong>Location:</strong> Data centers with physical
                          and digital security measures
                        </p>
                        <div className="mt-4">
                          <a
                            href="https://supabase.com/security"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 dark:text-green-400 hover:underline flex items-center gap-1"
                          >
                            View Supabase's Security Page{" "}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-red-600 dark:text-red-400">
                        We Never Share Your Data With:
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-red-700 dark:text-red-300">
                        <li>Advertisers or marketing companies</li>
                        <li>Data brokers or analytics firms</li>
                        <li>Social media platforms</li>
                        <li>Any unauthorized third parties</li>
                        <li>
                          Government agencies (except as required by law with
                          proper warrants)
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* User Rights Section */}
              <section id="user-rights" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  Your Rights and Data Control
                </h2>

                <div className="grid gap-6">
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-600 dark:text-blue-400">
                        Access and Portability
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                          <strong>Download Your Data:</strong> Export all your
                          financial data in standard formats
                        </li>
                        <li>
                          <strong>Account Transparency:</strong> View all data
                          we have about you
                        </li>
                        <li>
                          <strong>Usage Logs:</strong> See when and how your
                          data has been accessed
                        </li>
                        <li>
                          <strong>Third-Party Connections:</strong> Manage which
                          services can access your data
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600 dark:text-green-400">
                        Data Control Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                          <strong>Granular Permissions:</strong> Choose which
                          accounts to connect and sync
                        </li>
                        <li>
                          <strong>Data Refresh Control:</strong> Manage how
                          often we sync your financial data
                        </li>
                        <li>
                          <strong>Feature Opt-out:</strong> Disable specific
                          features that use your data
                        </li>
                        <li>
                          <strong>Communication Preferences:</strong> Control
                          all marketing and notification settings
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-black border-teal-200 dark:border-teal-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-teal-600 dark:text-teal-400">
                        Data Deletion Process
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">
                            Account Termination Process:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                            <li>
                              Disconnection from all linked bank accounts and
                              credit cards
                            </li>
                            <li>
                              Revocation of third-party financial services
                              (e.g., Plaid)
                            </li>
                            <li>
                              Removal of budget categories and financial
                              planning data
                            </li>
                            <li>Deletion of user financial data</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">
                            Technical Implementation:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                            <li>
                              Automated purging from primary databases via
                              scheduled jobs
                            </li>
                            <li>Deletion from encrypted backup systems</li>
                            <li>
                              Cloud storage secure deletion with vendor
                              confirmation
                            </li>
                            <li>Final system-wide data validation scan</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  Contact Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-600 dark:text-blue-400 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Security Team
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <a
                            href="mailto:budgetary@codewithali.com"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            budgetary@codewithali.com
                          </a>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          <strong>Response Time:</strong> Within 24 hours for
                          security concerns
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          <strong>Emergency:</strong> Critical security issues
                          receive immediate attention
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600 dark:text-green-400 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Privacy Officers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-5">
                      <div className="space-y-3">
                        <p>
                          <strong>Ali Alibrahimi</strong>
                          <br />
                          CEO & Owner
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <a
                            href="mailto:unfold@codewithali.com"
                            className="text-green-600 dark:text-green-400 hover:underline"
                          >
                            unfold@codewithali.com
                          </a>
                        </p>
                      </div>

                      <div className="space-y-3">
                        <p>
                          <strong>Hanif Palm</strong>
                          <br />
                          COO & Co-Founder
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <a
                            href="mailto:privacy@codewithali.com"
                            className="text-green-600 dark:text-green-400 hover:underline"
                          >
                            privacy@codewithali.com
                          </a>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6 bg-gradient-to-r from-teal-50 to-teal-50 dark:from-gray-900 dark:to-teal-900/20 border-teal-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-teal-600 dark:text-teal-400">
                      Our Commitment to You
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      At <strong>CodeWithAli</strong>, we understand that your
                      financial data is among the most sensitive information you
                      possess. We are committed to earning and maintaining your
                      trust through:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>
                        <strong>Transparent Communication:</strong> Clear,
                        honest explanations of our practices
                      </li>
                      <li>
                        <strong>Security Investment:</strong> Continuous
                        improvement of our security infrastructure
                      </li>
                      <li>
                        <strong>User Empowerment:</strong> Giving you control
                        over your data and privacy
                      </li>
                      <li>
                        <strong>Regulatory Excellence:</strong> Exceeding
                        compliance requirements, not just meeting them
                      </li>
                      <li>
                        <strong>Innovation with Responsibility:</strong>{" "}
                        Building powerful features without compromising security
                      </li>
                    </ul>
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Remember:</strong> You can withdraw your consent
                        and delete your account at any time through your account
                        settings.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Footer Navigation */}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex gap-4">
                    <Link
                      href="/terms"
                      className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                    >
                      Terms of Use <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="/security"
                      className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                    >
                      Security Policy <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This policy is effective as of June 12, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
