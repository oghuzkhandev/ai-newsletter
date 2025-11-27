"use client";

import { Button } from "@/components/ui/button";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

import Link from "next/link";
import { useState } from "react";
import {
  IconSparkles,
  IconCreditCard,
  IconDeviceTv,
  IconChevronDown,
  IconLanguage,
} from "@tabler/icons-react";

import { useTranslations } from "next-intl";
import { useChangeLocale } from "@/i18n/useChangeLocal";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function DeployBanner() {
  const t = useTranslations("banner");

  return (
    <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-2 text-sm font-medium shadow-md">
      🚀 {t("title")} — {t("description")}
    </div>
  );
}

export default function Header() {
  const t = useTranslations("nav");
  const changeLocale = useChangeLocale();

  const navItems = [
    { name: t("features"), link: "#features", icon: <IconSparkles size={18} /> },
    { name: t("pricing"), link: "#pricing", icon: <IconCreditCard size={18} /> },
    { name: t("demo"), link: "#demo", icon: <IconDeviceTv size={18} /> },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <DeployBanner />

      <Navbar className="backdrop-blur-xl py-3 shadow-[0_0_40px_rgba(56,132,245,0.15)] bg-white/70 border-b border-blue-100">
        <NavBody>
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-blue-700"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              OK
            </div>
            GlobeBrief
          </Link>

          <NavItems
            items={navItems.map((item) => ({
              ...item,
              name: (
                <span className="flex items-center gap-1">
                  {item.icon}
                  {item.name}
                </span>
              ),
            }))}
          />

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium shadow-sm border border-blue-200 hover:bg-blue-100 transition"
              >
                <IconLanguage size={18} />
                <IconChevronDown size={14} />
              </button>

              {langOpen && (
                <div className="absolute top-10 right-0 bg-white border border-blue-100 rounded-md shadow-md w-28 py-1 z-50">
                  <button
                    onClick={() => {
                      changeLocale("en");
                      setLangOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50"
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => {
                      changeLocale("tr");
                      setLangOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50"
                  >
                    🇹🇷 Türkçe
                  </button>
                </div>
              )}
            </div>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <Button asChild>
                <Link href="/sign-in">{t("login")}</Link>
              </Button>
            </SignedOut>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight text-blue-700"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                AI
              </div>
              AI Newsletter
            </Link>

            <MobileNavToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="relative text-blue-700 text-lg py-2 flex items-center gap-2"
              >
                {item.icon}
                {item.name}
              </a>
            ))}

            <div className="pt-2 border-t border-blue-100 mt-2">
              <p className="text-sm text-blue-700 mb-1 font-semibold">Language</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    changeLocale("en");
                    setIsOpen(false);
                  }}
                  className="flex-1 py-2 rounded-md bg-blue-50 text-blue-700 border border-blue-200"
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    changeLocale("tr");
                    setIsOpen(false);
                  }}
                  className="flex-1 py-2 rounded-md bg-blue-50 text-blue-700 border border-blue-200"
                >
                  TR
                </button>
              </div>
            </div>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <Button onClick={() => setIsOpen(false)} asChild className="w-full">
                <Link href="/sign-in">{t("login")}</Link>
              </Button>
            </SignedOut>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}
