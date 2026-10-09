import { site } from "@/lib/site";

// فقط وقتی نمایش داده می‌شود که در lib/site.ts نظر واقعی ثبت شده باشد.
export default function Testimonials() {
  if (site.testimonials.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="container-page">
        <h2 className="section-title">نظر بیماران</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {site.testimonials.map((t) => (
            <li key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6">
              <blockquote className="leading-8 text-slate-700">{t.text}</blockquote>
              <p className="mt-4 text-sm font-bold text-brand-700">{t.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
