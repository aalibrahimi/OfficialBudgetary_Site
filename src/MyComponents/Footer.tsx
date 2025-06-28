"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import GradientText from "./GradientText";
import { Github } from "lucide-react";

// interface FooterLink {
//   name: string;
//   href: string;
// }

// interface FooterGroup {
//   title: string;
//   links: FooterLink[];
// }

export function Footer(): React.ReactElement {
  // const t = useTranslations("Footer");

  // const footerLinks: FooterGroup[] = [
  //   {
  //     title: t("nav.company.title"),
  //     links: [
  //       { name: t("nav.company.links.1"), href: "/about" },
  //       { name: t("nav.company.links.2"), href: "/careers" },
  //       { name: t("nav.company.links.3"), href: "/contact" },
  //     ],
  //   },
  //   {
  //     title: t("nav.resources.title"),
  //     links: [
  //       { name: t("nav.resources.links.1"), href: "/blog" },
  //       { name: t("nav.resources.links.2"), href: "/docs" },
  //       { name: t("nav.resources.links.3"), href: "/help" },
  //     ],
  //   },
  //   {
  //     title: t("nav.legal.title"),
  //     links: [
  //       { name: t("nav.legal.links.1"), href: "/privacy" },
  //       { name: t("nav.legal.links.2"), href: "/terms" },
  //       { name: t("nav.legal.links.3"), href: "/cookies" },
  //     ],
  //   },
  // ];

  return (
    <div
      className={`flex flex-col items-center border-t dark:bg-gray-950 bg-gray-100 border-gray-200 pt-6`}
    >
      <div className="flex gap-2 text-center text-sm ">
        <Link href="/privacy" className="opacity-75 hover:opacity-100">Privacy</Link>
        |
        <Link href="/terms" className="opacity-75 hover:opacity-100">Terms of Use</Link>
        |
        <Link href="/security" className="opacity-75 hover:opacity-100">Security Policy</Link>
      </div>

      <hr className={`dark:border-gray-800 border-gray-300 my-4`} />

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:justify-center">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} CodeWithAli. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/CodeWithAli-Co"
            draggable={false}
            target="_blank"
            className={`w-8 h-8 rounded-full flex items-center justify-center dark:bg-teal-950/30 dark:hover:bg-teal-400/50 bg-teal-500/30 hover:bg-teal-800/50 hover:border border-teal-950/30`}
          >
            <Github />
          </Link>
        </div>
      </div>
      <div className="mt-4 flex flex-row items-center justify-center gap-2">
        {/* CodeWithAli Branding - Same Line */}
        {/* <div className="mt-10 flex flex-col items-center justify-center"> */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Link href="https://codewithali.com/" draggable={false} target="_blank">
          <Image
            src="/codewithali.png"
            className="w-auto h-8 isolate"
            alt="CodeWithAli Logo"
            draggable={false}
            width={30}
            height={30}
            quality={100}
          />
        </Link>

        <p className="text-slate-400 text-md">
          <Link
            href="https://codewithali.com/"
            draggable={false}
            target="_blank"
            className={`font-semiboldm dark:text-gray-400 text-gray-500 text-sm`}
          >
            Designed by <GradientText>CodeWithAli</GradientText>
          </Link>
        </p>
      </div>
    </div>
  );
}
