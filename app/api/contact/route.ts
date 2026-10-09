import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";

// محدودیت ساده در حافظه: ۵ درخواست در ۱۰ دقیقه برای هر IP.
// روی سرورلس (مثل Vercel) بین instanceها مشترک نیست؛ برای تولید جدی از Upstash/Redis استفاده کن.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "درخواست‌های زیادی ارسال شده؛ چند دقیقه بعد دوباره تلاش کنید." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "درخواست نامعتبر است." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // اگر honeypot پر شده بود، ربات را بی‌صدا نادیده می‌گیریم
    const botTriggered = parsed.error.issues.some((i) => i.path[0] === "website");
    if (botTriggered) return NextResponse.json({ ok: true });

    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است." },
      { status: 400 },
    );
  }

  const { name, phone, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  // حالت دمو: بدون تنظیم ایمیل، پیام فقط در لاگ سرور ثبت می‌شود
  if (!apiKey || !to) {
    console.log("[contact:demo]", { name, phone, message });
    return NextResponse.json({ ok: true, demo: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `درخواست جدید از ${name}`,
        html: `<div dir="rtl" style="font-family:Tahoma,sans-serif;line-height:1.9">
          <p><strong>نام:</strong> ${escapeHtml(name)}</p>
          <p><strong>موبایل:</strong> ${escapeHtml(phone)}</p>
          <p><strong>پیام:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        </div>`,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return NextResponse.json(
        { ok: false, error: "ارسال پیام ناموفق بود. لطفاً تماس بگیرید." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] network error", err);
    return NextResponse.json(
      { ok: false, error: "ارسال پیام ناموفق بود. لطفاً تماس بگیرید." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
