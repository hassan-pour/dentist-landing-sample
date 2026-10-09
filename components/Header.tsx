"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import ScrollLink from "./ScrollLink";

const links = [
  { href: "#contact", label: "تماس" },
  { href: "#faq", label: "سوالات متداول" },
  { href: "#process", label: "مراحل درمان" },
  { href: "#services", label: "خدمات" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <ScrollLink href="#" className="text-lg font-extrabold text-brand-700">
          {site.shortName}
        </ScrollLink>

        <nav aria-label="منوی اصلی" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <ScrollLink key={l.href} href={l.href} className="text-sm font-medium text-slate-700 hover:text-brand-700">
              {l.label}
            </ScrollLink>
          ))}
          <ScrollLink href="#contact" className="btn-primary !py-2">
            دریافت نوبت
          </ScrollLink>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-ink md:hidden"
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="منوی موبایل" className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-page flex flex-col py-3">
            {links.map((l) => (
              <ScrollLink
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-slate-700 hover:bg-brand-50"
              >
                {l.label}
              </ScrollLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
