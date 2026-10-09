import { site } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-16 sm:py-24">
      <div className="container-page">
        <h2 className="section-title">خدمات ما</h2>
        <p className="section-sub">
          طیف کامل خدمات دندانپزشکی را زیر یک سقف و با برنامه درمانی مشخص ارائه می‌دهیم.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((s) => (
            <li
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl" aria-hidden>
                {s.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{s.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
