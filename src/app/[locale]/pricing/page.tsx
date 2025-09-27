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
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { features } from "process";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const getPlanColor = (color: 'gray' | 'teal' | 'yellow', type: 'bg' | 'bgLight' | 'text' | 'button' | 'border' = "bg") => {
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
                <CardTitle className={`p-8 `}>
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
                    {plan.features.slice(0,8).map((feature,  featureIndex)  => (
                        <div key={featureIndex} className="flex  items-center">
                            {feature.included ? (
                                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            ) : (
                                <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                            )}
                            <span className={`text-sm ${feature.included ? 'text-gray-700 dark:text-gray-300' : "text-gray-400 dark:text-gray-500"}`}>
                                {feature.name}
                            </span>
                        </div>
                    ))}

                    {plan.features.length  >  0  && (
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm  text-gray-500 dark:text-gray-400">
                                + {plan.features.length - 8} more features
                            </p>
                        </div>
                    )}
                     <p className="text-teal-600 dark:text-gray-300 mb-6">
                      {plan.description}
                    </p>
                                        <button className={`w-full py-4 my-2 px-6 rounded-lg font-medium transition-colors ${getPlanColor(plan.color, 'button')} text-white`}> {plan.cta} </button>

                  </div>
                </CardTitle>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Detailed Feature Comparison
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    See exactly  what's  included in each plan
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                    <thead>
                        <tr className="border-b border-gray-200   dark:border-gray-700">
                            <th className="text-left p-6 text-gray-900  dark:text-white font-semibold">
                                Features
                            </th>
                            {plans.map((plan, index) => (
                                <th  key={index} className="text-center p-6 text-gray-900 dark:text-white font-semibold">
                                    {plan.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {plans[0].features.map((feature, featureIndex) => (
                            <tr key={featureIndex} className="border-b border-gray-400">
                                <td className="p-6 text-gray-700 dark:text-white dark:bg-gray-900">
                                    {feature.name}
                                </td>
                                {plans.map((plan, planIndex) =>  (
                                    <td key={planIndex} className="text-center  p-6">
                                        {plan.features[featureIndex]?.included ? (
                                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                                        ) : (
                                            <X className="w-5 h-5 text-gray-400  mx-auto" />
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </section>


       {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.plan} Plan
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of users who have transformed their financial lives with Simplicity.
          </p>
          <button className="bg-white text-teal-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <p className="text-gray-400">
            Smart budgeting for every lifestyle.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
