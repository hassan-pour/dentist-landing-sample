import { z } from "zod";

// تبدیل ارقام فارسی و عربی به انگلیسی تا اعتبارسنجی شماره موبایل درست کار کند
export function normalizeDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

export const contactSchema = z.object({
  name: z.string().trim().min(2, "نام را وارد کنید").max(80, "نام خیلی طولانی است"),
  phone: z
    .string()
    .transform((v) => normalizeDigits(v).replace(/[\s-]/g, ""))
    .refine((v) => /^(\+98|0098|0)?9\d{9}$/.test(v), "شماره موبایل معتبر نیست"),
  message: z
    .string()
    .trim()
    .min(10, "پیام باید حداقل ۱۰ کاراکتر باشد")
    .max(1000, "پیام نباید بیشتر از ۱۰۰۰ کاراکتر باشد"),
  // honeypot: کاربر واقعی این فیلد را نمی‌بیند و خالی می‌گذارد
  website: z.string().max(0).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
