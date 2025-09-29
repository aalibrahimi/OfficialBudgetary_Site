// src/MyComponents/terms-of-use-page.tsx
"use client";
import React from "react";
import {
  FileText,
  Users,
  Shield,
  CreditCard,
  AlertTriangle,
  Scale,
  Mail,
} from "lucide-react";
import LegalPageTemplate, {
  LegalSection,
  LegalCard,
} from "@/MyComponents/documents/terms";
import Link from "next/link";

const sections = [
  {
    id: "agreement",
    title: "About This Agreement",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "service",
    title: "Service Description",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: "eligibility",
    title: "Eligibility",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  {
    id: "disputes",
    title: "Dispute Resolution",
    icon: <Scale className="h-4 w-4" />,
  },
  { id: "contact", title: "Contact", icon: <Mail className="h-4 w-4" /> },
];

export default function TermsOfUsePage() {
  return (
    <LegalPageTemplate
      title="Terms of Use"
      lastUpdated="June 14, 2025"
      currentPage="terms"
      sections={sections}
    >
      {/* Agreement Section */}
      <LegalSection
        id="agreement"
        title="About This Agreement"
        icon={<FileText className="h-6 w-6" />}
      >
        <LegalCard variant="info">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            These Terms of Use (&quot;Terms&quot;) constitute a legally binding agreement
            between you (&quot;User&quot; or &quot;you&quot;) and CodeWithAli (&quot;Company,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) regarding your use of the Simplicity personal finance
            application (&quot;App,&quot; &quot;Service,&quot; or &quot;Simplicity&quot;).
          </p>
          <div className="bg-teal-100 dark:bg-teal-950/30 p-4 rounded-none border-l-3 border-teal-500 dark:border-teal-400">
            <p className="font-medium text-teal-800 dark:text-teal-200">
              <strong>Important:</strong> By creating an account, downloading,
              accessing, or using Simplicity, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and our Privacy &
              Security Policy.
            </p>
          </div>
        </LegalCard>
      </LegalSection>

      {/* Service Description Section */}
      <LegalSection
        id="service"
        title="Service Description"
        icon={<CreditCard className="h-6 w-6" />}
      >
        <div className="grid gap-6">
          <LegalCard title="What Simplicity Does">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Simplicity is a personal finance management application that helps
              you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Track Your Spending:</strong> Monitor and categorize all
                your financial transactions
              </li>
              <li>
                <strong>Analyze Financial Habits:</strong> Calculate and
                visualize your spending patterns and behaviors
              </li>
              <li>
                <strong>Bill Management:</strong> Display upcoming bill due
                dates and payment reminders
              </li>
              <li>
                <strong>Budget Insights:</strong> Generate personalized
                recommendations based on your financial data
              </li>
            </ul>
          </LegalCard>

          <LegalCard title="How It Works">
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                We securely connect to your bank accounts through Plaid Inc., a
                regulated financial data provider
              </li>
              <li>
                We access only your account information and transaction history
                (read-only access)
              </li>
              <li>
                We cannot move money, make transactions, or access your online
                banking credentials
              </li>
              <li>
                All data is encrypted and stored securely in compliance with
                financial regulations
              </li>
            </ul>
          </LegalCard>
        </div>
      </LegalSection>

      {/* Eligibility Section */}
      <LegalSection
        id="eligibility"
        title="Eligibility and Account Requirements"
        icon={<Users className="h-6 w-6" />}
      >
        <div className="grid gap-6">
          <LegalCard title="Age Requirement" variant="warning">
            <p className="text-teal-700 dark:text-teal-300">
              {/* to prevent us from lawsuuits */}
              <strong>
                You must be at least at the{" "}
                <b className="text-black dark:text-white uppercase">
                  {" "}
                  legal working age
                </b>{" "}
                to use Simplicity.
              </strong>{" "}
              By using our Service, you represent and warrant that you meet this
              age requirement.
            </p>
          </LegalCard>

          <LegalCard title="Account Registration">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To use Simplicity, you must:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Provide accurate, current, and complete information during
                registration
              </li>
              <li>Maintain and update your account information as needed</li>
              <li>Keep your login credentials secure and confidential</li>
              <li>Be responsible for all activities under your account</li>
              <li>
                Notify us immediately of any unauthorized access or security
                breaches
              </li>
            </ul>
          </LegalCard>
        </div>
      </LegalSection>

      {/* Acceptable Use Section */}
      <LegalSection
        id="acceptable-use"
        title="Acceptable Use Policy"
        icon={<Shield className="h-6 w-6" />}
      >
        <div className="grid gap-6">
          <LegalCard title="Permitted Uses" variant="success">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You may use Simplicity solely for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-black dark:text-white">
              <li>Personal financial management and budgeting</li>
              <li>Tracking your own legitimate financial accounts</li>
              <li>Analyzing your personal spending habits and patterns</li>
              <li>Managing your bill payments and due dates</li>
            </ul>
          </LegalCard>

          <LegalCard title="Prohibited Activities" variant="danger">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You agree NOT to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-black dark:text-white">
              <li>
                Use the Service for any illegal, fraudulent, or unauthorized
                purposes
              </li>
              <li>Attempt to access accounts that do not belong to you</li>
              <li>Share your account credentials with others</li>
              <li>
                Use automated tools, bots, or scripts to access the Service
              </li>
              <li>
                Reverse engineer, decompile, or attempt to extract our source
                code
              </li>
              <li>Interfere with or disrupt the Service&quot;s functionality</li>
              <li>
                Violate any applicable laws, regulations, or third-party rights
              </li>
            </ul>
          </LegalCard>
        </div>
      </LegalSection>

      {/* Disclaimers Section */}
      <LegalSection
        id="disclaimers"
        title="Disclaimers and Limitations"
        icon={<AlertTriangle className="h-6 w-6" />}
      >
        <div className="grid gap-6">
          <LegalCard title="Service Disclaimers" variant="warning">
            <div className=" p-4 rounded-lg">
              <p className="font-semibold text-teal-800 dark:text-teal-200 mb-2">
                Simplicity IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
                WARRANTIES OF ANY KIND.
              </p>
              <p className="text-black dark:text-white text-sm">
                We disclaim all warranties, express or implied, including but
                not limited to accuracy, completeness, reliability of financial
                data, uninterrupted service operation, fitness for a particular
                purpose, and non-infringement of third-party rights.
              </p>
            </div>
          </LegalCard>

          <LegalCard title="Financial Advice Disclaimer" variant="info">
            <ul className="list-disc list-inside space-y-2 text-black dark:text-white dark:text-blue-300">
              <li>
                Simplicity provides informational tools only, not financial
                advice
              </li>
              <li>
                We are not financial advisors, and our insights should not be
                considered professional advice
              </li>
              <li>
                You should consult qualified financial professionals for
                financial planning decisions
              </li>
              <li>
                We are not responsible for financial decisions made using our
                Service
              </li>
            </ul>
          </LegalCard>

          <LegalCard title="Limitation of Liability" variant="danger">
            <div className=" p-4 rounded-lg">
              <p className="font-semibold text-red-800 dark:text-red-600 mb-2">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="list-disc list-inside space-y-1 text-black dark:text-white text-sm">
                <li>
                  Our total liability to you shall not exceed $100 or amounts
                  paid in the past 12 months
                </li>
                <li>
                  We are not liable for indirect, incidental, consequential, or
                  punitive damages
                </li>
                <li>
                  We are not responsible for damages caused by third-party
                  services or data breaches beyond our control
                </li>
              </ul>
            </div>
          </LegalCard>
        </div>
      </LegalSection>

      {/* Dispute Resolution Section */}
      <LegalSection
        id="disputes"
        title="Dispute Resolution"
        icon={<Scale className="h-6 w-6" />}
      >
        <div className="grid gap-6">
          <LegalCard title="Governing Law">
            <p className="text-gray-700 dark:text-gray-300">
              These Terms are governed by the laws of the{" "}
              <strong>State of California, United States</strong>, without
              regard to conflict of law principles.
            </p>
          </LegalCard>

          <LegalCard title="Informal Resolution" variant="info">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Before pursuing formal legal action, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Contact us at simplicity@codewithali.com to discuss the issue
              </li>
              <li>Allow us 30 days to attempt to resolve the matter</li>
              <li>
                Engage in good faith negotiations to reach a mutually acceptable
                solution
              </li>
            </ul>
          </LegalCard>

          <LegalCard title="Arbitration Agreement" variant="warning">
            <p className="text-teal-700 dark:text-teal-300">
              If informal resolution fails, disputes will be resolved through
              binding arbitration rather than court proceedings, except for
              small claims court matters (under $10,000), intellectual property
              disputes, and injunctive relief requests.
            </p>
          </LegalCard>
        </div>
      </LegalSection>

      {/* Contact Section */}
      <LegalSection
        id="contact"
        title="Contact Information"
        icon={<Mail className="h-6 w-6" />}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <LegalCard title="Support and Questions">
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <Link
                  href="mailto:simplicity@codewithali.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  simplicity@codewithali.com
                </Link>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Response Time:</strong> Within 24 hours for general
                inquiries
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <Link
                  href="mailto:privacy@codewithali.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  privacy@codewithali.com
                </Link>
              </p>
            </div>
          </LegalCard>

          <LegalCard title="Legal Notices">
            <div className="space-y-3">
              <p>
                <strong>CodeWithAli</strong>
                <br />
                Ali Alibrahimi, CEO & Owner
                <br />
                Hanif Palm, COO & Co-Founder
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <Link
                  href="mailto:unfold@codewithali.com"
                  className="text-black dark:text-white hover:underline"
                >
                  unfold@codewithali.com
                </Link>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Website:</strong> simplicity.com/terms
              </p>
            </div>
          </LegalCard>
        </div>

        <div className="grid mt-10 gap-6">
          <LegalCard variant="success" title="Your Acknowledgment">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By creating a Simplicity account and using our Service, you
              acknowledge that:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-green-500 mt-1">✅</span>
                  <span className="text-sm">
                    You have read and understood these Terms of Use
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-500 mt-1">✅</span>
                  <span className="text-sm">
                    You agree to be legally bound by these Terms
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-green-500 mt-1">✅</span>
                  <span className="text-sm">
                    You meet the eligibility requirements to use the Service
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-500 mt-1">✅</span>
                  <span className="text-sm">
                    You will use the Service in accordance with these Terms
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-100 dark:bg-green-950/30 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-300">
                <strong>Remember:</strong> You can review these Terms at any
                time and close your account if you no longer agree to them.
              </p>
            </div>
          </LegalCard>
        </div>
      </LegalSection>
    </LegalPageTemplate>
  );
}
