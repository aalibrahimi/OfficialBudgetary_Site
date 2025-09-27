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

  const [selectedFaq, setSelectedFaq] = useState(null);

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

  if (onsubmit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
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
            // onClick={() => setIsSubmitted(false)}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

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
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethod.map((method, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
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
                <div
                  className=" 
                [&_Label]:block [&_Label]:text-sm [&_Label]:font-medium [&_Label]:text-teal-700 [&_Label]:dark:text-gray-300 [&_Label]:mb-2
                [&_Input]:rounded-xs [&_Input]:border [&_Input]:hover:border-teal-500 [&_Input]:focus:ring-2 [&_Input]:focus:ring-teal-500 [&_Input]:mb-2 [&_Input]:focus:border-teal-600 [&_Input]:dark:hover:teal-600"
                >
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
                            <SelectTrigger className="w-full rounded-xs focus:ring-2 focus:ring-teal-500">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem value={category.value}>
                                  {" "}
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
                    return(
                      <>
                        <Label> Subject *</Label>
                        <Textarea 
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                          placeholder="Type your message here."
                          rows={6}
                          className="resize-y max-h-40 rounded-xs focus:ring-2 focus:ring-teal-500"
                        />
                      </>
                    )
                  }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
