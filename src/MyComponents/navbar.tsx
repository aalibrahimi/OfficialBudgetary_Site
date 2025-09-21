// src/components/Navbar.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X, DollarSign } from "lucide-react"; // Import icons for menu toggle and language
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import ModeToggle from "./modeToggle";

// interface RouteItem {
//   title: string;
//   href?: string;
//   content?: {
//     title: string;
//     href: string;
//     description: string;
//   }[];
// }

export function Navbar(): React.ReactElement {
  // const defaultRoute = { href: "/" };
  // const t = useTranslations("NavBar");

  // const routes: RouteItem[] = [
  //   {
  //     title: t("routes.home"),
  //     href: "/",
  //   },
  //   {
  //     title: t("routes.about"),
  //     href: "/about",
  //   },
  //   {
  //     title: t("routes.features.title"),
  //     content: [
  //       {
  //         title: t("routes.features.content.1.title"),
  //         href: "/features/1",
  //         description: t("routes.features.content.1.desc"),
  //       },
  //       {
  //         title: t("routes.features.content.2.title"),
  //         href: "/features/2",
  //         description: t("routes.features.content.2.desc"),
  //       },
  //       {
  //         title: t("routes.features.content.3.title"),
  //         href: "/features/3",
  //         description: t("routes.features.content.3.desc"),
  //       },
  //     ],
  //   },
  //   {
  //     title: t("routes.resources.title"),
  //     content: [
  //       {
  //         title: t("routes.resources.content.1.title"),
  //         href: "/docs",
  //         description: t("routes.resources.content.1.desc"),
  //       },
  //       {
  //         title: t("routes.resources.content.2.title"),
  //         href: "/blog",
  //         description: t("routes.resources.content.2.desc"),
  //       },
  //       {
  //         title: t("routes.resources.content.3.title"),
  //         href: "/help",
  //         description: t("routes.resources.content.3.desc"),
  //       },
  //     ],
  //   },
  //   {
  //     title: t("routes.contact"),
  //     href: "/contact",
  //   },
  // ];

  interface Language {
    code: string;
    name: string;
    flag?: string;
  }

  // Country Flags: https://emojiterra.com/country-flags/
  const languages: Language[] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ar", name: "العربية", flag: "🇮🇶" },
  ];

  const locale = useLocale();
  // const pathname = usePathname();

  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* eslint-disable */
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages[0]
  );

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen((prev) => !prev);
  // };

  // const changeLanguage = (language: Language) => {
  //   if (language.code === locale) return;

  //   window.location.href = `/${language.code}${pathname === "/" ? "" : pathname} `;
  // };

  useEffect(() => {
    const matchedLanguage =
      languages.find((lang) => lang.code === locale) || languages[0];
    setCurrentLanguage(matchedLanguage);
  }, [locale]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 w-full dark:bg-gray-900/90 bg-white/90 backdrop-blur-sm z-50 border-b dark:border-gray-800 border-gray-200`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <DollarSign className={`h-6 w-6 dark:text-teal-400 text-teal-500`} />
          {/* <Image src="/budgetLogo.png" height={30} width={30} alt="Simplicity Logo" className="rounded-md" /> */}
          <span className="text-xl font-bold">Simplicity</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#features"
            className="hover:text-teal-500 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="hover:text-teal-500 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#testimonials"
            className="hover:text-teal-500 transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="/#pricing"
            className="hover:text-teal-500 transition-colors"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />

          <div className="hidden md:block">
            <Button
              className={`dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-black bg-teal-600 hover:bg-teal-500 text-white hover:cursor-pointer`}
            >
              Download App
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden dark:bg-gray-900 dark:text-white bg-white text-gray-900 p-4 space-y-4 border-t dark:border-gray-800 border-gray-200`}
        >
          <Link href="/#features" className="block py-2 hover:text-teal-500">
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="block py-2 hover:text-teal-500"
          >
            How It Works
          </Link>
          <Link
            href="/#testimonials"
            className="block py-2 hover:text-teal-500"
          >
            Testimonials
          </Link>
          <Link href="/#pricing" className="block py-2 hover:text-teal-500">
            Pricing
          </Link>
          <Button
            className={`w-full mt-4
                dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-black
                bg-teal-600 hover:bg-teal-500 text-white hover:cursor-pointer
            `}
          >
            Download App
          </Button>
        </div>
      )}
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors duration-300 hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white text-center",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-600 dark:text-gray-400 text-center">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
