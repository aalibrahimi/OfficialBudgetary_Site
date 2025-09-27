"use client";
import React, { ReactNode, useState } from "react";
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
  Sparkles,
  Shield,
  TrendingUp,
  Target,
  Download,
  Play,
  Check,
  Star,
  Users,
  Zap,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import GradientText from "@/MyComponents/GradientText";
import CalenderCustsomDesign from "@/MyComponents/CalendarCustom";
import * as z from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useForm } from "@tanstack/react-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const expenseFormSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Amount must be in format: 0 or 0.00")
    .refine((val) => {
      const num = parseFloat(val);
      return num > 0 && num <= 10000;
    }, "Amount must be between 0.01 and 10,000"),
  category: z.string().min(1, "Please select a category"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(200, "Description must be 200 characters or less")
    .trim(),
});

// Demo dashboard data with budgets
const initialExpenseData = [
  { category: "Housing", amount: 1200, color: "#06b6d4", budget: 1500 },
  { category: "Food", amount: 450, color: "#10b981", budget: 600 },
  { category: "Transportation", amount: 200, color: "#f59e0b", budget: 300 },
  { category: "Entertainment", amount: 150, color: "#ef4444", budget: 200 },
  { category: "Shopping", amount: 250, color: "#8b5cf6", budget: 300 },
  { category: "Other", amount: 150, color: "#ec4899", budget: 200 },
];

// Expense categories with colors
const expenseCategories = [
  { value: "Food", label: "Food & Dining", color: "#10b981" },
  { value: "Transportation", label: "Transportation", color: "#f59e0b" },
  { value: "Shopping", label: "Shopping", color: "#8b5cf6" },
  { value: "Entertainment", label: "Entertainment", color: "#ef4444" },
  { value: "Housing", label: "Housing", color: "#06b6d4" },
  { value: "Other", label: "Other", color: "#ec4899" },
];

const stats = [
  {
    number: "50K+",
    label: "Active Users",
    icon: <Users className="w-5 h-5" />,
  },
  {
    number: "$2M+",
    label: "Money Tracked",
    icon: <DollarSign className="w-5 h-5" />,
  },
  { number: "99.9%", label: "Uptime", icon: <Shield className="w-5 h-5" /> },
  { number: "4.9★", label: "User Rating", icon: <Star className="w-5 h-5" /> },
];

interface Expense {
  category: string;
  amount: number;
  description: string;
  color: string;
  date: string;
}

interface BudgetaryLandingPageProps {
  onExpenseAdded?: (expense: Expense) => void;
}

export default function BudgetaryLandingPage({
  onExpenseAdded,
}: BudgetaryLandingPageProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const [expenseData, setExpenseData] = useState(initialExpenseData);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      amount: "",
      category: "",
      description: "",
    },
    validators: {
      // this makes it so thats its reaal time
      // onChange: expenseFormSchema,
      // we want it to be on submit then tell the user
      onSubmit: expenseFormSchema,
    },
    onSubmit: async ({ value }) => {
      // api call normmally here
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // process the expense  here
      const newExpense = {
        category: value.category,
        amount: parseFloat(value.amount),
        description: value.description,
        color:
          expenseCategories.find(
            (category) => category.value === value.category
          )?.color || "#6b7280",
        date: new Date().toISOString(),
      };

      // Update local expense data
      setExpenseData((prevData) => {
        const updatedData = [...prevData];
        const existingCategoryIndex = updatedData.findIndex(
          (item) => item.category === value.category
        );

        if (existingCategoryIndex >= 0) {
          // Add to existing category
          updatedData[existingCategoryIndex] = {
            ...updatedData[existingCategoryIndex],
            amount:
              updatedData[existingCategoryIndex].amount +
              parseFloat(value.amount),
          };
        } else {
          // Create new category if it doesn't exist
          const categoryData = expenseCategories.find(
            (cat) => cat.value === value.category
          );
          updatedData.push({
            category: value.category,
            amount: parseFloat(value.amount),
            color: categoryData?.color || "#6b7280",
            budget: 200, // Default budget for new categories
          });
        }

        return updatedData;
      });

      // Call parent callback
      onExpenseAdded?.(newExpense);

      // rest
      form.reset();

      // show success message ( might delete later )
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
  });

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Smart Expense Tracking",
      description:
        "Automatically categorize and track your expenses with AI-powered insights that help you understand your spending patterns.",
      image: "/api/placeholder/500/300",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Predictive Analytics",
      description:
        "Get personalized insights and predictions about your financial future based on your spending habits and goals.",
      image: "/api/placeholder/500/300",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Goal Achievement",
      description:
        "Set and track financial goals with smart recommendations to help you achieve them faster than ever before.",
      image: "/api/placeholder/500/300",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-400/30 to-emerald-500/30 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-2xl animate-pulse delay-500"></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNDgsIDMyMiwgMzE4LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            {/* Announcement Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-8 text-sm font-medium bg-gradient-to-r from-teal-500/10 to-cyan-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Now with AI-powered insights</span>
              <Badge className="ml-3 bg-teal-500 text-white">NEW</Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-white dark:to-gray-100 bg-clip-text text-transparent">
                Master Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Transform your financial life with intelligent budgeting,
              automated tracking, and personalized insights that actually work.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                <a href="/downloads/Simplicity_0.1.0_x64-setup.exe" download>
                  Download Free
                </a>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-gray-300 dark:border-gray-600 hover:border-teal-500 dark:hover:border-teal-500 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-8 py-4 text-lg"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
                <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Compatibility Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Globe className="w-4 h-4" />
              <span>Available for</span>
              <GradientText gradient="from-teal-600 to-cyan-600">
                Windows (x64)
              </GradientText>
              <span>• More platforms coming soon</span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xs">
                  <div className="text-teal-600 dark:text-teal-400">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced App Preview */}
          <div className="relative mx-auto max-w-6xl">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              {/* Browser Header */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Image
                      src="/simplicity_logo.jpg"
                      height={300}
                      width={300}
                      alt="Simplicity Logo"
                      className=" h-5 w-5"
                    />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Simplicity Dashboard
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Simplicity
                </div>
              </div>

              {/* Enhanced Dashboard Content */}
              <div className="p-6 space-y-6">
                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Total Balance",
                      value: "$12,847.50",
                      change: "+2.4%",
                      positive: true,
                    },
                    {
                      label: "Monthly Income",
                      value: "$4,200.00",
                      change: "+8.1%",
                      positive: true,
                    },
                    {
                      label: "Expenses",
                      value: "$2,856.20",
                      change: "-3.2%",
                      positive: true,
                    },
                    {
                      label: "Savings Rate",
                      value: "32%",
                      change: "+5.1%",
                      positive: true,
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-4 rounded-xs border border-gray-200 dark:border-gray-600"
                    >
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div
                        className={`text-xs ${stat.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                      >
                        {stat.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Spending & Calendar */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Spending Chart */}
                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-xs border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Spending Overview
                        </h3>
                        <Badge variant="outline">Last 30 days</Badge>
                      </div>
                      <div className="space-y-3">
                        {expenseData.map((item, index) => {
                          const isOverBudget = item.amount > item.budget;
                          const budgetPercentage = Math.min(
                            (item.amount / item.budget) * 100,
                            100
                          );
                          const barColor = isOverBudget
                            ? "#ef4444"
                            : item.color;

                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: item.color }}
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {item.category}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-right">
                                  <div
                                    className={`text-sm font-medium ${isOverBudget ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"}`}
                                  >
                                    ${item.amount}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {item.budget}
                                  </div>
                                </div>
                                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{
                                      width: `${budgetPercentage}%`,
                                      backgroundColor: barColor,
                                    }}
                                  />
                                </div>
                                {isOverBudget && (
                                  <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                                    Over!
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <CalenderCustsomDesign />
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-6 rounded-xs border border-teal-200 dark:border-teal-800">
                      <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-3">
                        Quick Add Expense
                      </h3>

                      {/* Success Message */}
                      {showSuccess && (
                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-700 dark:text-green-300">
                            Expense added successfully!
                          </span>
                        </div>
                      )}

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          form.handleSubmit();
                        }}
                        className="space-y-3"
                      >
                        {/* Amount Field */}
                        <form.Field
                          name="amount"
                          children={(field) => (
                            <div>
                              <input
                                type="text"
                                placeholder="$0.00"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                className={`w-full p-2 text-sm rounded-xs border ${
                                  field.state.meta.errors.length > 0
                                    ? "border-red-300 dark:border-red-600"
                                    : "border-teal-200 dark:border-teal-700"
                                } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                              />
                              {field.state.meta.errors.length > 0 && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                  {field.state.meta.errors[0]?.message}
                                </p>
                              )}
                            </div>
                          )}
                        />

                        {/* Category Field */}
                        <form.Field
                          name="category"
                          children={(field) => (
                            <div>
                              <Select        
                              value={field.state.value}
                              onValueChange={field.handleChange}
                              >
                                <SelectTrigger className="w-full rounded-xs border border-teal-400 bg-white">
                                  <SelectValue placeholder="Select Category"/>
                                </SelectTrigger>
                                <SelectContent>
                                  {expenseCategories.map((category) => (
                                  <SelectItem key={category.value} value={category.value}> {category.label}  </SelectItem>
                                   ))}
                                </SelectContent>
                              </Select>
                              {field.state.meta.errors.length > 0 && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                  {field.state.meta.errors[0]?.message}
                                </p>
                              )}
                            </div>
                          )}
                        />

                        {/* Description Field */}
                        <form.Field
                          name="description"
                          children={(field) => (
                            <div>
                              <input
                                type="text"
                                placeholder="Description (e.g., Lunch at cafe)"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                className={`w-full p-2 text-sm rounded-xs border ${
                                  field.state.meta.errors.length > 0
                                    ? "border-red-300 dark:border-red-600"
                                    : "border-teal-200 dark:border-teal-700"
                                } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                              />
                              {field.state.meta.errors.length > 0 && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                  {field.state.meta.errors[0]?.message}
                                </p>
                              )}
                            </div>
                          )}
                        />

                        {/* Submit Button */}
                        <form.Subscribe
                          selector={(state) => [
                            state.canSubmit,
                            state.isSubmitting,
                          ]}
                          children={([canSubmit, isSubmitting]) => (
                            <Button
                              type="submit"
                              size="sm"
                              className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={!canSubmit}
                            >
                              {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  Adding...
                                </div>
                              ) : (
                                "Add Expense"
                              )}
                            </Button>
                          )}
                        />
                      </form>

                      {/* Debug info (remove in production) */}
                      <form.Subscribe
                        selector={(state) => state.errors}
                        children={(errors) =>
                          errors.length > 0 && (
                            <div className="mt-2 text-xs text-red-600">
                              Form errors: {errors.join(", ")}
                            </div>
                          )
                        }
                      />
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-xs border border-gray-200 dark:border-gray-600">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Upcoming Bills
                      </h3>
                      <div className="space-y-2">
                        {[
                          { name: "Netflix", amount: "$15.99", due: "Today" },
                          { name: "Spotify", amount: "$9.99", due: "2 days" },
                          { name: "Prime", amount: "$12.99", due: "5 days" },
                          {
                            name: "Phone Bill",
                            amount: "$89.00",
                            due: "5 days",
                          },
                        ].map((bill, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="text-gray-700 dark:text-gray-300">
                              {bill.name}
                            </span>
                            <div className="text-right">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {bill.amount}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {bill.due}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                Everything you need for
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                financial success
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Powerful features designed to simplify your financial life and
              help you achieve your goals faster.
            </p>
          </div>

          {/* Interactive Feature Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-6 rounded-xs transition-all duration-300 ${
                    activeFeature === index
                      ? "bg-white dark:bg-gray-800 shadow-lg border-2 border-teal-500"
                      : "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        activeFeature === index
                          ? "bg-teal-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 p-8 rounded-2xl">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xs shadow-lg">
                  <div className="h-64 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      {features[activeFeature].icon}
                      <h4 className="text-lg font-semibold mt-2 text-gray-900 dark:text-white">
                        {features[activeFeature].title}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Smart Budgeting",
                description:
                  "AI-powered budget recommendations based on your spending patterns and financial goals.",
              },
              {
                icon: <Bell className="w-6 h-6" />,
                title: "Bill Reminders",
                description:
                  "Never miss a payment with intelligent notifications and automated bill tracking.",
              },
              {
                icon: <LineChart className="w-6 h-6" />,
                title: "Investment Insights",
                description:
                  "Track your portfolio performance and get personalized investment recommendations.",
              },
              {
                icon: <PiggyBank className="w-6 h-6" />,
                title: "Savings Goals",
                description:
                  "Set ambitious goals and watch our smart algorithms help you achieve them faster.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Bank-Level Security",
                description:
                  "Your data is protected with 256-bit encryption and advanced security protocols.",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Real-time Sync",
                description:
                  "Instant synchronization across all your devices with offline capabilities.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xs bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="text-teal-600 dark:text-teal-400">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                Get started in
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                3 simple steps
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Setting up your financial future has never been easier. Follow
              these steps to transform your money management.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="connect" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger
                  value="connect"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  1. Connect
                </TabsTrigger>
                <TabsTrigger
                  value="analyze"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  2. Analyze
                </TabsTrigger>
                <TabsTrigger
                  value="optimize"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  3. Optimize
                </TabsTrigger>
              </TabsList>

              <TabsContent value="connect" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      Connect Your Accounts
                    </h3>
                    <div className="space-y-4">
                      {[
                        "Securely link your bank accounts with Plaid integration",
                        "Support for 11,000+ financial institutions",
                        "Read-only access - we never store your credentials",
                        "Automatic transaction categorization",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-8 rounded-2xl">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                        Bank Connection
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <Check className="w-5 h-5 text-green-600" />
                          <span className="text-sm">Chase Bank Connected</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                          <span className="text-sm text-gray-500">
                            Add Another Account
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analyze" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      Analyze Your Spending
                    </h3>
                    <div className="space-y-4">
                      {[
                        "AI-powered insights identify spending patterns",
                        "Beautiful charts and visualizations",
                        "Compare spending across different time periods",
                        "Identify opportunities to save money",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                        Spending Analysis
                      </h4>
                      <div className="space-y-3">
                        {initialExpenseData.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-sm">{item.category}</span>
                            </div>
                            <span className="text-sm font-medium">
                              ${item.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="optimize" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      Optimize Your Finances
                    </h3>
                    <div className="space-y-4">
                      {[
                        "Personalized budget recommendations",
                        "Smart savings goal tracking",
                        "Bill payment reminders and optimization",
                        "Investment portfolio insights",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-2xl">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                        Financial Goals
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Emergency Fund</span>
                            <span className="text-sm font-medium">75%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: "75%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Vacation</span>
                            <span className="text-sm font-medium">40%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: "40%" }}
                            ></div>
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

      {/* Enhanced Testimonials */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                Loved by thousands
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                of happy users
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See how Simplicity has transformed the financial lives of people
              just like you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Simplicity completely transformed how I manage money. I've saved over $3,000 in just 6 months by following their insights!",
                author: "Sarah Chen",
                role: "Marketing Manager",
                avatar: "S",
                rating: 5,
              },
              {
                quote:
                  "The automated categorization is incredible. What used to take me hours now happens instantly. This app is a game-changer.",
                author: "Michael Rodriguez",
                role: "Software Engineer",
                avatar: "M",
                rating: 5,
              },
              {
                quote:
                  "I love the goal tracking feature. Seeing my progress visually keeps me motivated to stick to my budget and savings plans.",
                author: "Emily Johnson",
                role: "Teacher",
                avatar: "E",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                Simple, transparent
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                pricing for everyone
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Start free and upgrade as your needs grow. No hidden fees, cancel
              anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for getting started",
                features: [
                  "Connect 1 bank account",
                  "Basic expense tracking",
                  "Simple budgeting tools",
                  "Mobile app access",
                ],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Pro",
                price: "$9.99",
                period: "/month",
                description: "For serious financial management",
                features: [
                  "Connect unlimited accounts",
                  "AI-powered insights",
                  "Advanced goal tracking",
                  "Investment portfolio sync",
                  "Bill optimization",
                  "Priority support",
                ],
                cta: "Start Free Trial",
                popular: true,
              },
              {
                name: "Premium",
                price: "$19.99",
                period: "/month",
                description: "For families and advanced users",
                features: [
                  "Everything in Pro",
                  "Family account sharing",
                  "Tax optimization",
                  "Custom reports",
                  "Personal finance advisor",
                  "White-label features",
                ],
                cta: "Start Free Trial",
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-2 border-teal-500 scale-105" : "border border-gray-200 dark:border-gray-700"} bg-white dark:bg-gray-800`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-teal-500 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 dark:text-gray-400 ml-1">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-teal-600 hover:bg-teal-700 text-white"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA */}
      <section className="py-24 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Ready to transform your
              <br />
              financial future?
            </h2>
            <p className="text-xl text-teal-100 mb-12 max-w-2xl mx-auto">
              Join thousands of users who've already taken control of their
              finances. Download Simplicity today and start your journey to
              financial freedom.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="group bg-white text-teal-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                <a href="/downloads/Simplicity_0.1.0_x64-setup.exe" download>
                  Download Free Now
                </a>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-white/30 text-black dark:text-white backdrop-blur-sm px-8 py-4 text-lg"
              >
                <Play className="h-5 w-5 mr-2" />
                View Demo
                <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <p className="mt-8 text-teal-100">
              Free forever • No credit card required • Available for Windows
              (x64)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
