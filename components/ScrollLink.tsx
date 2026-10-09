"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  /** "#" یعنی بالای صفحه؛ "#id" یعنی اسکرول به عنصری با آن id */
  href: string;
};

/**
 * لینک درون‌صفحه‌ای که همیشه در همان تب اسکرول می‌کند.
 * به جای تکیه بر رفتار پیش‌فرض مرورگر (که در بعضی محیط‌ها مثل پیش‌نمایش داخل iframe
 * تب جدید باز می‌کند)، کلیک را مهار می‌کند و scrollIntoView صدا می‌زند.
 * ایندکس‌شدن و کار کردن بدون JavaScript هم حفظ می‌شود چون href واقعی دارد.
 */
export default function ScrollLink({ href, onClick, children, ...rest }: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    e.preventDefault();

    const id = href.replace(/^#/, "");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

    if (!id) {
      window.scrollTo({ top: 0, behavior });
      updateHash("");
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;

    // scroll-mt-20 روی هر section فاصله‌ی هدر چسبان را رعایت می‌کند
    target.scrollIntoView({ behavior, block: "start" });
    updateHash(id);
  }

  return (
    <a href={href} target="_self" onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

function updateHash(id: string) {
  try {
    const url = `${window.location.pathname}${window.location.search}${id ? `#${id}` : ""}`;
    window.history.replaceState(null, "", url);
  } catch {
    // در محیط‌های sandbox شده ممکن است history قابل تغییر نباشد؛ اسکرول همچنان کار می‌کند
  }
}
