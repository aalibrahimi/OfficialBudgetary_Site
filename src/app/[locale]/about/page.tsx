"use client";
import React from "react";
import {
  Target,
  Heart,
  TrendingUp,
  Users,
  Calendar,
  CreditCard,
  Brain,
  Sparkles,
  Award,
  Globe,
  Lightbulb,
  Zap,
  Star,
  Shield,
  Smartphone,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutUsPage = () => {
  const founders = [
    {
      name: "Ali Alibrahimi",
      role: "CEO & Founder",
      bio: "After facing personal financial struggles and testing nearly every budgeting app, Ali realized the market lacked a true solution—one that empowers people to genuinely take control of their money. Driven by a passion for meaningful technology, Ali set out to create a budgeting platform that is intuitive, practical, and built to help people succeed financially—no matter their starting point.",
      focus: "Product Vision & User Experience",
      achievement: "Financial Technology Innovator",
    },
    {
      name: "Hanif Palm",
      role: "COO & Co-Founder",
      bio: "Hanif is the type of person who gives his last dollar to someone in need without a second thought. He's never cared about accumulating wealth for himself, his heart is enormous. When Ali shared his vision for Simplicity, Hanif didn't see a business opportunity; he saw a chance to help millions of people. For Hanif, success means watching users break free from financial stress, not seeing numbers in a bank account.",
      focus: "Operations & User Advocacy",
      achievement: "Humanitarian & Helper",
    },
  ];

  const coreValues = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "User-First Design",
      description:
        "Every feature is built based on real user needs, not flashy trends",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Genuine Solutions",
      description:
        "We solve actual financial problems, not create more complexity",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trust & Transparency",
      description:
        "Your financial data is sacred - we protect it with bank-level security",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation with Purpose",
      description:
        "Advanced technology that serves users, not just impressive demos",
    },
  ];

  const uniqueFeatures = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Financial Calendar",
      description:
        "The only app that shows when your income and expenses actually happen, helping you plan ahead",
      highlight: "Industry First",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "3D Credit Card Visualization",
      description:
        "Beautiful 3D representations of your actual bank cards for instant transaction recognition",
      highlight: "Industry First",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Financial Insights",
      description:
        "Smart habit analysis and personalized recommendations that adapt to your unique spending patterns",
      highlight: "Machine Learning",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "True Future Planning",
      description:
        "Plan upcoming expenses, track income history, and visualize your complete financial timeline",
      highlight: "Exclusive Feature",
    },
  ];

  const futureVision = [
    {
      feature: "Integrated Tax Preparation",
      description:
        "Complete tax filing experience within Simplicity - like TurboTax, but connected to your budget",
      timeline: "2025",
      icon: <Award className="w-5 h-5" />,
    },
    {
      feature: "Investment Platform",
      description:
        "Seamless stock investment tracking and portfolio management integrated with your budget",
      timeline: "2025",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      feature: "Mobile Excellence",
      description:
        "Native iOS and Android apps with full feature parity and offline capabilities",
      timeline: "Q2 2025",
      icon: <Smartphone className="w-5 h-5" />,
    },
    {
      feature: "Global Expansion",
      description:
        "Support for international banks and multi-currency budgeting for global users",
      timeline: "2026",
      icon: <Globe className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-8 text-sm font-medium bg-gradient-to-r from-teal-500/10 to-blue-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Revolutionizing Personal Finance</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            We're Creating the Future
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              of Financial Wellness
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Simplicity isn't just another app - it's the first true budgeting
            platform that actually helps you succeed financially. Built by
            people who understand the struggle, designed for people ready to
            win.
          </p>

          <div className="flex not-sm:flex-col items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="shrink-0 w-4 h-4" />
              <span>Founded by Financial Struggle Survivors</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="shrink-0 w-4 h-4" />
              <span>Mission-Driven Innovation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission: Real Budgeting
                <span className="block text-teal-600 dark:text-teal-400">
                  for Real People
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We believe everyone deserves access to powerful financial tools
                that actually work. Simplicity is built on the principle that
                budgeting should be intuitive, insightful, and genuinely helpful
                - not just another list of past expenses.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Our platform combines cutting-edge technology with practical
                financial wisdom to create the first application that truly
                helps users budget, plan, and achieve their financial goals.
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 px-3 py-1">
                  Innovation Leader
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  User-Centric Design
                </Badge>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-teal-100/50 to-sky-400/20 dark:from-slate-900/20 dark:to-blue-950/40 p-8 rounded-2xl border border-teal-300 dark:border-sky-950">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white mx-auto mb-6">
                    <Target className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    "The only app that actually helps you budget"
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Built from personal experience with financial struggles,
                    designed to solve the problems other apps ignore.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                What Makes Simplicity Revolutionary
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                While other apps show you where your money went, we help you
                control where it's going. Here's how we're different:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {uniqueFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-gradient-to-r from-teal-500/10 to-blue-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800"
                    >
                      {feature.highlight}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-start gap-4 not-sm:pt-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-teal-200/80 to-sky-400/80 dark:from-slate-800 dark:to-blue-700/80  text-teal-800 dark:text-white/80 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                The principles that guide every decision we make
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <Card
                  key={index}
                  className="text-center bg-gradient-to-br from-teal-100/50 to-sky-400/20 dark:from-slate-900/20 dark:to-blue-950/40 border border-teal-200 dark:border-sky-950 hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-teal-200/50 to-sky-500/50 dark:from-slate-600/20 dark:to-blue-700/40 border border-teal-200 dark:border-sky-950 flex items-center justify-center text-teal-700 dark:text-blue-400 mb-4">
                      {value.icon}
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Meet the Founders */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Meet the Visionaries
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                The founders who turned personal financial struggles into
                innovative solutions
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {founders.map((founder, index) => (
                <Card
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <CardHeader className="">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {founder.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-900 dark:text-white mb-1">
                          {founder.name}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="mb-2 bg-gradient-to-r from-teal-500/10 to-blue-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800"
                        >
                          {founder.role}
                        </Badge>
                        <p className="text-sm text-sky-600 dark:text-sky-400 font-medium">
                          {founder.achievement}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 ">
                    <p className="text-gray-600 dark:text-gray-300 mb-5 ">
                      {founder.bio}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center gap-2 text-sm">
                      <Zap
                        className={`w-4 h-4 text-teal-500 ${founder.name === "Ali Alibrahimi" ? "mt-6.5 mb-1" : ""} `}
                      />
                      <span
                        className={`font-medium text-gray-900 dark:text-white ${founder.name === "Ali Alibrahimi" ? "mt-6.5 mb-1" : ""} `}
                      >
                        Focus:{" "}
                      </span>
                      <span
                        className={`text-teal-600 dark:text-teal-400 ${founder.name === "Ali Alibrahimi" ? "mt-6.5 mb-1" : ""}`}
                      >
                        {founder.focus}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* The Real Difference */}
          <div className="bg-gradient-to-br from-teal-100/50 to-sky-400/20 dark:from-slate-900/20 dark:to-blue-950/40 border border-teal-200 dark:border-sky-950 p-8 rounded-2xl mb-20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why We Started Simplicity
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                After years of financial struggles and trying every "budgeting"
                app available, we realized a hard truth: they weren't actually
                budgeting apps at all.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-white to-red-100/75 dark:from-zinc-800/20 dark:to-red-700/75 border border-red-300 dark:border-sky-950 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-500" />
                  What We Discovered
                </h3>
                <ul className="space-y-3 text-black dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Existing apps only showed past expenses - no real
                      budgeting tools
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      No way to see which specific card made which purchase
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Missing future planning and income tracking capabilities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      No calendar view of when financial events actually happen
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-white to-teal-100/75 dark:from-zinc-800/20 dark:to-teal-700/90 border border-teal-500 dark:border-sky-950 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-teal-500" />
                  Our Solution
                </h3>
                <ul className="space-y-3 text-black dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Built the first true budgeting platform with actual
                      planning tools
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Created 3D card visualization for instant transaction
                      recognition
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Developed comprehensive income tracking and future
                      planning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Integrated financial calendar showing when events actually
                      occur
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Future Vision */}
          <div className="bg-gradient-to-br from-teal-400/30 to-sky-400/60 dark:from-blue-600/20 dark:to-blue-900/40 p-8 rounded-2xl border border-teal-500 dark:border-blue-900">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  The Future of Personal Finance
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We're not stopping at budgeting. Our vision is to become the
                complete financial ecosystem that empowers users to build
                lasting wealth and financial security.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {futureVision.map((item, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white to-zinc-100 dark:from-black/75 dark:to-slate-900/20 border border-black/20 dark:border-white/10 hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-teal-200/50 to-sky-500/50 dark:from-slate-600/20 dark:to-blue-700/40 border border-teal-200 dark:border-sky-950 text-teal-700 dark:text-blue-400">
                          {item.icon}
                        </div>
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {item.feature}
                        </CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-gradient-to-br from-teal-200 to-sky-500/80 dark:from-blue-600/50 dark:to-sky-700/90 text-teal-800 dark:text-white"
                      >
                        {item.timeline}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-teal-500 to-blue-600 dark:from-teal-600 dark:to-blue-700 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">
              Join the Financial Revolution
            </h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-8">
              Be part of the movement that's changing how people think about
              money management. Experience the first true budgeting platform
              built by people who understand your struggles.
            </p>
            <div className="flex items-center justify-center gap-6 text-teal-100 not-sm:text-sm">
              <div className="flex items-center gap-2">
                <Globe className="shrink-0 w-5 h-5" />
                <span>Global Impact</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="shrink-0 w-5 h-5" />
                <span>Community Driven</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="shrink-0 w-5 h-5" />
                <span>User Success Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
