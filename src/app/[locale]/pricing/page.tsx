"use client";
import React, { useState } from "react";
import {
  Check,
  X,
  Star,
  Crown,
  Zap,
  Shield,
  Users,
  BarChart3,
  TrendingUp,
  CreditCard,
  Smartphone,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started with basic financial tracking",
      icon: <Star className="w-6 h-6" />,
      color: "gray",
      popular: false,
      features: [
        { name: "Manual expense tracking", included: true },
        { name: "Basic budget categories", included: true },
        { name: "Simple income tracking", included: true },
        { name: "Basic charts and reports", included: true },
        { name: "1 bank account connection", included: true },
        { name: "Web app access", included: true },
        { name: "Bank-level security", included: true },
        { name: "Email support", included: true },
        { name: "Advanced analytics", included: false },
        { name: "Automated categorization", included: false },
        { name: "Cash flow forecasting", included: false },
        { name: "Multiple bank accounts", included: false },
        { name: "Mobile app", included: false },
        { name: "Priority support", included: false },
        { name: "API access", included: false },
        { name: "Custom categories", included: false },
      ],
      cta: "Start Free",
      limits: "1 bank account, basic feetures",
    },
    {
      name: "Basic",
      price: { monthly: 9.99, yearly: 99 },
      description:
        "Ideal for individuals serious about personal finance management",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "teal",
      popular: true,
      features: [
        { name: "Everything in Free", included: true },
        { name: "Up to 5 bank account connections", included: true },
        { name: "Automated categorization", included: true },
        { name: "Advanced charts and analytics", included: true },
        { name: "Budget goal tracking", included: true },
        { name: "Cash flow forecasting (30 days)", included: true },
        { name: "Mobile app access", included: true },
        { name: "Custom categories", included: true },
        { name: "Subscription tracking", included: true },
        { name: "Bill reminders", included: true },
        { name: "Data export (CSV)", included: true },
        { name: "Priority email support", included: true },
        { name: "Unlimited bank accounts", included: false },
        { name: "Investment tracking", included: false },
        { name: "Tax optimization", included: false },
        { name: "API access", included: false },
      ],
      cta: "Start Basic Trial",
      limits: "Up to 5 bank accounts",
    },
    {
      name: "Premium",
      price: { monthly: 19.99, yearly: 199 },
      description:
        "Complete financial control for power users and professionals",
      icon: <Crown className="w-6 h-6" />,
      color: "yellow",
      popular: false,
      features: [
        { name: "Everything in Basic", included: true },
        { name: "Unlimited bank account connections", included: true },
        { name: "Investment portfolio tracking", included: true },
        { name: "Advanced cash flow forecasting (1 year)", included: true },
        { name: "Tax optimization insights", included: true },
        { name: "Custom financial goals", included: true },
        { name: "Multi-currency support", included: true },
        { name: "Advanced security features", included: true },
        { name: "API access for developers", included: true },
        { name: "Priority phone & chat support", included: true },
        { name: "Personal finance advisor access", included: true },
        { name: "White-label reporting", included: true },
        { name: "Team collaboration (up to 5 users)", included: true },
        { name: "Custom integrations", included: true },
        { name: "Advanced data analytics", included: true },
        { name: "Dedicated account manager", included: true },
      ],
      cta: "Start Premium Trial",
      limits: "Unlimited everything",
    },
  ];

  const faqs = [
    {
      question: "Can I change plans at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
    },
    {
      question: "Is my financial data secure?",
      answer:
        "Absolutely. We use bank-level 256-bit SSL encryption and never store your bank credentials. Your data is encrypted at rest and in transit, and we undergo regular security audits.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.",
    },
    {
      question: "How does bank account connection work?",
      answer:
        "We use Plaid, a secure and trusted service used by major financial apps. Your bank credentials are never stored on our servers - we only receive read-only access to your transaction data.",
    },
    {
      question: "Can I use Simplicity on multiple devices?",
      answer:
        "Yes! Your account syncs across all devices. Free users get web access, Basic users get mobile app access, and Premium users get full multi-device synchronization.",
    },
    {
      question: "What happens to my data if I cancel?",
      answer:
        "You can export all your data at any time. After cancellation, we keep your data for 90 days in case you want to reactivate, then it's permanently deleted.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      plan: "Premium",
      content:
        "The investment tracking in Premium has helped me optimize my portfolio and save thousands in fees.",
      rating: 5,
    },
    {
      name: "Michael R.",
      plan: "Basic",
      content:
        "Perfect balance of features and price. The automated categorization alone saves me hours each month.",
      rating: 5,
    },
    {
      name: "Jennifer L.",
      plan: "Free",
      content:
        "Started with the free plan to test it out. Even the basic features are incredibly well-designed and useful.",
      rating: 4,
    },
  ];

  const getPlanColor = (color, type = "bg") => {
    const colorMap = {
      gray: {
        bg: "bg-gray-500",
        bgLight: "bg-gray-100 dark:bg-gray-800",
        text: "text-gray-600",
        button: "bg-gray-600 hover:bg-gray-700",
        border: "border-gray-200",
      },
      teal: {
        bg: "bg-teal-500",
        bgLight: "bg-teal-50 dark:bg-teal-900/20",
        text: "text-teal-600",
        button: "bg-teal-600 hover:bg-teal-700",
        border: "border-teal-200",
      },
      yellow: {
        bg: "bg-yellow-500",
        bgLight: "bg-yellow-50 dark:bg-yellow-900/20",
        text: "text-yellow-600",
        button:
          "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
        border: "border-yellow-200",
      },
    };
    return colorMap[color][type] || colorMap[color].bg;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* hero section */}
      <section className="py-20  px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-4xl  font-bold text-gray-900 dark:text-white mb-6">
            Simple, Transparent
            <span className="block text-xl text-transparent bg-clip-text bg-gradient-to-r from-teeal-500 to-blue-600">
              Pricing for Everyone
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Start free and upgrade as your financial management needs grow. No
            hidden fees, cancel anytime
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex  items-center bg-white dark:bg-gray-800 p-1  rounded-xs  shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2  rounded-xs font-medium  transition-colors  ${billingCycle === "monthly" ? "bg-teal-600 text-white shadow-sm" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover-text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-xs font-medium transition-colors relative ${
                billingCycle === "yearly"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Yearly
              <span className="absolute -top-3 -right-8 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4  sm:px-4  lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 ">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden ${
                  plan.popular ? "ring-2 ring-teal-500 transform scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-teal-600 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardTitle className={`p-8 ${plan.popular ? "pt-12" : ""}`}>
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div
                      className={`inline-flex p-3 rounded-full ${getPlanColor(plan.color, "bgLight")} mb-4`}
                    >
                      <div className={getPlanColor(plan.color, "text")}>
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {" "}
                      {plan.name}{" "}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {plan.description}
                    </p>

                    {/* Price */}
                    
                  </div>
                </CardTitle>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
