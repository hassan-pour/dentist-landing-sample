"use client";

import { useState } from "react";
import { contactSchema } from "@/lib/validation";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-200";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // اعتبارسنجی سمت کلاینت برای بازخورد سریع؛ سرور دوباره اعتبارسنجی می‌کند
    const check = contactSchema.safeParse(data);
    if (!check.success) {
      setStatus("error");
      setError(check.error.issues[0]?.message ?? "اطلاعات نامعتبر است.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "ارسال پیام ناموفق بود.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("اتصال برقرار نشد. اینترنت خود را بررسی کنید.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl bg-brand-50 p-8 text-center ring-1 ring-brand-200">
        <p className="text-lg font-bold text-brand-700">پیام شما ثبت شد</p>
        <p className="mt-2 text-sm leading-7 text-slate-600">همکاران ما در اولین فرصت با شما تماس می‌گیرند.</p>
        <button type="button" className="btn-ghost mt-5" onClick={() => setStatus("idle")}>
          ارسال پیام جدید
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-bold">
          نام و نام خانوادگی
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-bold">
          شماره موبایل
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          dir="ltr"
          autoComplete="tel"
          placeholder="09123456789"
          required
          className={`${inputClass} text-left`}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-bold">
          پیام
        </label>
        <textarea id="message" name="message" rows={4} required className={inputClass} />
      </div>

      {/* honeypot: برای کاربر مخفی است */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">وب‌سایت</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p role="alert" aria-live="polite" className="min-h-5 text-sm font-medium text-red-600">
        {status === "error" ? error : ""}
      </p>

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? "در حال ارسال..." : "ارسال درخواست"}
      </button>
    </form>
  );
}
