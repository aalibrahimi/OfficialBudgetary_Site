// src/MyComponents/legal-page-template.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import {
  Lock,
  Eye,
  FileText,
  Mail,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GradientText from "@/MyComponents/GradientText";

interface LegalPageSection {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  currentPage: "privacy" | "terms" | "security";
  sections: LegalPageSection[];
  children: React.ReactNode;
}

// Common sidebar items for all legal pages
const commonSidebarItems = [
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: <Eye className="h-4 w-4" />,
    route: "/privacy",
  },
  {
    id: "terms",
    title: "Terms of Use",
    icon: <FileText className="h-4 w-4" />,
    route: "/terms",
  },
  {
    id: "security",
    title: "Security Policy",
    icon: <Lock className="h-4 w-4" />,
    route: "/security",
  },
];

export default function LegalPageTemplate({
  title,
  lastUpdated,
  currentPage,
  sections,
  children,
}: LegalPageProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
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
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setSidebarOpen(false);
  };

  // const getPageIcon = (page: string) => {
  //   switch (page) {
  //     case "privacy":
  //       return <Eye className="h-5 w-5" />;
  //     case "terms":
  //       return <FileText className="h-5 w-5" />;
  //     case "security":
  //       return <Lock className="h-5 w-5" />;
  //     default:
  //       return <FileText className="h-5 w-5" />;
  //   }
  // };

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
                    {title}
                  </GradientText>
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Last updated: {lastUpdated}
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
              <Card className=" rounded-xs bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    Legal Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-1">
                    {/* Navigation between legal pages */}
                    <div className="mb-4">
                      <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold mb-2">
                        Legal Pages
                      </h4>
                      {commonSidebarItems.map((item) => (
                        <Link
                          key={item.id}
                          href={item.route}
                          className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors ${
                            currentPage === item.id
                              ? "bg-teal-600 text-white dark:bg-teal-500 dark:text-black"
                              : "hover:bg-teal-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon}
                            {item.title}
                          </div>
                          {currentPage === item.id && (
                            <div className="w-2 h-2 bg-white dark:bg-black rounded-full" />
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* Sections within current page */}
                    <div>
                      <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold mb-2">
                        Page Sections
                      </h4>
                      {sections.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors ${
                            activeSection === item.id
                              ? "bg-teal-200 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200"
                              : "hover:bg-teal-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon}
                            {item.title}
                          </div>
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                  </nav>
                </CardContent>
              </Card>

              {/* Quick contact card */}
              <Card className=" rounded-xs mt-6 bg-gradient-to-r from-teal-50 to-teal-50 dark:from-gray-900 dark:to-teal-900/20 border-teal-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Mail className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Contact our support team:
                  </p>
                  <Link
                    href="mailto:simplicity@codewithali.com"
                    className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    simplicity@codewithali.com
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-none">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {children}

              {/* Footer Navigation */}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex gap-4">
                    {commonSidebarItems
                      .filter((item) => item.id !== currentPage)
                      .map((item) => (
                        <Link
                          key={item.id}
                          href={item.route}
                          className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                        >
                          {item.title} <ExternalLink className="h-3 w-3" />
                        </Link>
                      ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This policy is effective as of {lastUpdated}
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

// Export section component for consistent styling
export function LegalSection({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-teal-600 dark:text-teal-400">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

// Export card component for consistent styling
export function LegalCard({
  title,
  children,
  variant = "default",
}: {
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}) {
  const variantStyles = {
    default: "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
    success:
      "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
    warning:
      "bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800",
    danger: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
    info: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
  };

  return (
    <Card className={variantStyles[variant]}>
      {title && (
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
