"use client";
import React, { useState } from "react";
import { Check, X, Star, Crown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface PricingTiersProps {
  isTitle?: boolean;
}

const PricingTiers = ({ isTitle = false }: PricingTiersProps) => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans: {
    name: string;
    price: { monthly: number; yearly: number };
    description: string;
    icon: React.ReactNode;
    color: "gray" | "teal" | "yellow";
    popular: boolean;
    features: Array<{ name: string; included: boolean }>;
    cta: string;
    limits: string;
  }[] = [
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
      icon: <TrendingUp className="w-6 h-6 " />,
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

  const getPlanColor = (
    color: "gray" | "teal" | "yellow",
    type: "bg" | "bgLight" | "text" | "button" | "border" = "bg"
  ) => {
    const colorMap = {
      gray: {
        bg: "bg-gray-500",
        bgLight:
          "bg-gray-100 dark:bg-slate-950 dark:border dark:border-teal-900",
        text: "text-gray-600",
        button:
          "bg-gradient-to-br from-zinc-400 to-zinc-600 dark:from-zinc-500 hover:from-zinc-500 hover:to-zinc-700 dark:hover:from-zinc-600",
        border: "border-gray-200",
      },
      teal: {
        bg: "bg-teal-500",
        bgLight: "bg-teal-50 dark:bg-teal-900/20",
        text: "text-teal-600",
        button:
          "bg-gradient-to-br from-teal-300 to-teal-500 dark:from-teal-600 dark:to-blue-600 hover:from-teal-400 hover:to-teal-600 dark:hover:from-teal-700 dark:hover:to-blue-700",
        border: "border-teal-200",
      },
      yellow: {
        bg: "bg-yellow-500",
        bgLight: "bg-yellow-50 dark:bg-yellow-900/20",
        text: "text-yellow-600",
        button:
          "bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 hover:from-yellow-500 hover:to-orange-600 dark:hover:from-yellow-600 dark:hover:to-orange-700",
        border: "border-yellow-200",
      },
    };
    return colorMap[color][type] || colorMap[color].bg;
  };

  return (
    <div className="min-h-screen  dark:bg-slate-950">
      {/* hero section */}
      <section className="py-2 sm:py-20  px-1 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {isTitle ? (
            <>
              <h1 className="flex flex-col gap-1 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Simple, Transparent
                <span className="pb-2 block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                  Pricing for Everyone
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                Start free and upgrade as your financial management needs grow.
                No hidden fees, cancel anytime
              </p>
            </>
          ) : (
            <>
              <h2 className="flex flex-col gap-1 text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  Simple, Transparent
                </span>
                <span className="pb-2 bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Pricing for Everyone
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Start free and upgrade as your financial management needs grow.
                No hidden fees, cancel anytime
              </p>
            </>
          )}

          <br />

          {/* Billing Toggle */}
          <div className="inline-flex  items-center bg-white dark:bg-slate-950 dark:border dark:border-teal-900 p-1  rounded-xs  shadow-sm border border-gray-200 mb-12">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2  rounded-xs font-medium  transition-colors  ${billingCycle === "monthly" ? "bg-gradient-to-br from-teal-300 to-teal-500 dark:from-teal-600 dark:to-blue-600 text-white shadow-sm" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover-text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-xs font-medium transition-colors relative ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-br from-teal-300 to-teal-500 dark:from-teal-600 dark:to-blue-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Yearly
              <span className="absolute -top-3 -right-8 bg-gradient-to-br from-green-400 to-emerald-600 text-white text-xs px-2 py-1 rounded-full">
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
                className={`relative bg-white dark:bg-slate-950 dark:border dark:border-teal-900 rounded-lg shadow-xl overflow-hidden ${
                  plan.popular
                    ? "ring-2 ring-teal-500 dark:ring-sky-700 transform scale-105"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-br from-teal-300 to-teal-500 dark:from-teal-600 dark:to-blue-600 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardTitle className={`p-8 `}>
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div
                      className={`inline-flex p-3 rounded-full ${getPlanColor(plan.color, "bgLight")} mb-4 border `}
                    >
                      <div className={getPlanColor(plan.color, "text")}>
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {" "}
                      {plan.name}{" "}
                    </h3>

                    {/* Price */}
                    <CardContent className="mb-5">
                      <div>
                        <span className="text-3xl font-bold text-teal-600 dark:text-white">
                          $
                          {billingCycle === "monthly"
                            ? plan.price.monthly
                            : plan.price.yearly}
                        </span>
                        {plan.price.monthly > 0 && (
                          <span className="text-gray-600 dark:text-graay-300 ml-2">
                            / {billingCycle === "monthly" ? "month" : "year"}
                          </span>
                        )}
                      </div>
                      {billingCycle === "yearly" && plan.price.yearly > 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          ${(plan.price.yearly / 12).toFixed(2)}/month billed
                          anually
                        </p>
                      )}
                    </CardContent>

                    {/* Cta button */}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 ">
                    <h4 className="font-semibold text-gray-900  dark:text-white  mb-4">
                      Whats Included:
                    </h4>
                    {plan.features.slice(0, 8).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex  items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm ${feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}`}
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}

                    {plan.features.length > 0 && (
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm  text-gray-500 dark:text-gray-400">
                          + {plan.features.length - 8} more features
                        </p>
                      </div>
                    )}
                    <p className="text-blue-600 dark:text-gray-300 mb-6">
                      {plan.description}
                    </p>
                    <button
                      className={`w-full py-4 my-2 px-6 rounded-lg font-medium transition-colors ${getPlanColor(plan.color, "button")} text-white`}
                    >
                      {" "}
                      {plan.cta}{" "}
                    </button>
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

export default PricingTiers;
