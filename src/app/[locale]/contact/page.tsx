"use client";
import React, { useState } from "react";
import {
  Mail,
  MessageSquare,
  Phone,
  Clock,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Users,
  CreditCard,
  Bug,
  Lightbulb,
  Star,
  Shield,
} from "lucide-react";
import { Field, useForm } from "@tanstack/react-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      // email here hehe
      console.log(value);
    },
  });

  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const contactMethod = [
    {
      title: "Email Support",
      description: "Get help with your account, billing, or techinical issues",
      icon: <Mail className="w-7 h-7" />,
      contact: "support@simplicity.app",
      responseTime: "Usually within 48 hours",
      color: "text-blue-600",
    },
    {
      title: "Live Chat",
      description: "Chat with our support team for immediate assistance",
      icon: <MessageSquare className="w-7 h-7" />,
      contact: "Available in-app",
      responseTime: "9 AM - 6 PM EST, Mon-Fri",
      color: "text-green-600",
    },
    {
      title: "Phone Support",
      description: "Premium users get priority phone support",
      icon: <Phone className="w-7 h-7" />,
      contact: "+1 (555) 123-9021",
      responseTime: "9 AM - 6 PM EST, Mon-Fri",
      color: "text-purple-600",
    },
  ];

  const categories = [
    {
      value: "general",
      label: "General Question",
      icon: <HelpCircle className="w-4 h-4" />,
    },
    {
      value: "support",
      label: "Techinical Support",
      icon: <AlertCircle className="w-4 h-4" />,
    },
    {
      value: "billing",
      label: "Billing & Paymennt",
      icon: <CreditCard className="w-4 h-4" />,
    },
    { value: "bug", label: "Bug Report", icon: <Bug className="w-4 h-4" /> },
    {
      value: "feature",
      label: "Feature Request",
      icon: <Lightbulb className="w-4 h-4" />,
    },
    {
      value: "security",
      label: "Security Concern",
      icon: <Shield className="w-4 h-4" />,
    },
  ];

  const faqs = [
    {
      category: "Account",
      question: "How do I reset my password?",
      answer:
        "Click on 'Forgot Password' on the login screen and follow the instructions sent to your email.",
    },
    {
      category: "Security",
      question: "Is my financial data secure?",
      answer:
        "Yes, we use bank-level 256-bit SSL encryption and never store your bank login credentials.",
    },
    {
      category: "Billing",
      question: "Can I cancel my subscription anytime?",
      answer:
        "Absolutely! You can cancel your subscription at any time from your account settings. We offer a 30-day money-back guarantee.",
    },
    {
      category: "Features",
      question: "How many bank accounts can I connect?",
      answer:
        "Free users can connect 1 account, Basic users up to 5, and Premium users have unlimited connections.",
    },
    {
      category: "Technical",
      question: "Why aren't my transactions syncing?",
      answer:
        "This could be due to temporary bank maintenance or connection issues. Try refreshing your connection in Settings > Connected Accounts.",
    },
    {
      category: "General",
      question: "Do you offer student discounts?",
      answer:
        "Yes! We offer a 50% discount for students with a valid .edu email address. Contact support to get set up.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section  */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get in Touch
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              We're Here to Help
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Have a question, need support, or want to share feedback? We'd love
            to hear from you and help you succeed with your financial goals
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto ">
          <div className="grid md:grid-cols-3 gap-8 mb-16 ">
            {contactMethod.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-xs dark:bg-gray-800 p-6  shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`p-3 rounded-lg  w-fit mb-4 flex`}>
                  <div className={method.color}>{method.icon}</div>

                  <h3 className="text-xl ml-4 font-bold text-gray-900 dark:text-white mb-2">
                    {method.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {method.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">{method.contact}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    {method.responseTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xs shadow-lg">
              <form.Subscribe
                selector={(state) => state.isSubmitted}
                children={(isSubmitted) => {
                  if (isSubmitted) {
                    return (
                      <div className="text-center py-8">
                        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          Message Sent Successfully!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                          Thank you for contacting us. We'll get back to you within 24 hours.
                        </p>
                        <button
                          onClick={() => form.reset()}
                          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          Send Another Message
                        </button>
                      </div>
                    );
                  }

                  return (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Send us a Message
                      </h2>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          form.handleSubmit();
                        }}
                      >
                        <div className=" 
                        [&_Label]:block [&_Label]:text-sm [&_Label]:font-medium [&_Label]:text-teal-700 [&_Label]:dark:text-gray-300 [&_Label]:mb-2
                        [&_Input]:rounded-xs [&_Input]:border [&_Input]:hover:border-teal-500 [&_Input]:focus:ring-2 [&_Input]:focus:ring-teal-500 [&_Input]:mb-2 [&_Input]:focus:border-teal-600 [&_Input]:dark:hover:teal-600">
                          <form.Field
                            name="name"
                            children={(field) => {
                              return (
                                <>
                                  <Label>Name *</Label>
                                  <Input
                                    type="text"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Your Full Name"
                                  />
                                </>
                              );
                            }}
                          />
                          {/* email */}
                          <form.Field
                            name="email"
                            children={(field) => {
                              return (
                                <>
                                  <Label> Email </Label>
                                  <Input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="johndoe@gmail.com"
                                  />
                                </>
                              );
                            }}
                          />
                          {/* Category */}
                          <form.Field
                            name="category"
                            children={(field) => {
                              return (
                                <>
                                  <Label> Category </Label>
                                  <Select
                                    value={field.state.value}
                                    onValueChange={field.handleChange}
                                  >
                                    <SelectTrigger className="w-full rounded-xs focus:ring-2 focus:ring-teal-500 mb-2">
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {categories.map((category) => (
                                        <SelectItem key={category.value} value={category.value}>
                                          {category.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </>
                              );
                            }}
                          />
                          {/* Subject */}
                          <form.Field
                            name="subject"
                            children={(field) => {
                              return (
                                <>
                                  <Label> Subject *</Label>
                                  <Textarea
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    required
                                    placeholder="Type your message here."
                                    rows={6}
                                    className="resize-y h-50 max-h-70 rounded-xs focus:ring-2 focus:ring-teal-500"
                                  />
                                </>
                              );
                            }}
                          />
                          
                          {/* Submit button */}
                          <form.Subscribe
                            selector={(state) => [
                              state.canSubmit,
                              state.isSubmitting,
                            ]}
                            children={([canSubmit, isSubmitting]) => (
                              <Button type="submit" disabled={!canSubmit}>
                                {isSubmitting ? "..." : "Submit"}
                              </Button>
                            )}
                          />
                        </div>
                      </form>
                    </>
                  );
                }}
              />
            </div>
            
            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xs shadow-sm"
                  >
                    <button
                      onClick={() =>
                        setSelectedFaq(selectedFaq === index ? null : index)
                      }
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-xs"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 px-2 py-1 rounded text-xs font-medium">
                          {faq.category}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </span>
                      </div>
                      <div className="ml-4">
                        {selectedFaq === index ? (
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        ) : (
                          <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        )}
                      </div>
                    </button>

                    {selectedFaq === index && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600 dark:text-gray-300 pl-16 ">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Can't find what you're looking for?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our comprehensive help center has detailed guides and
                  tutorials.
                </p>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                  Visit Help Center
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Info */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We're a remote-first company with team members around the world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 dark:bg-teal-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Global Remote Team
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our distributed team works across multiple time zones to provide
                better support coverage
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Customer-Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every team member is passionate about helping you achieve your
                financial goals
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Always Improving
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We continuously iterate based on user feedback to make
                Simplicity better every day
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white Bold">
            Making personal finance simple and accessible for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;