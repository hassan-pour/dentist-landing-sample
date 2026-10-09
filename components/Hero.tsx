import { site } from "@/lib/site";
import ScrollLink from "./ScrollLink";

export default function Hero() {
  const { hero } = site;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-200/50 blur-3xl"
      />
      <div className="container-page relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-brand-700 shadow-card">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            {hero.badge}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.4] sm:text-5xl">{hero.title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-9 text-slate-600">{hero.subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ScrollLink href="#contact" className="btn-primary">
              {hero.primaryCta}
            </ScrollLink>
            <ScrollLink href="#services" className="btn-ghost">
              {hero.secondaryCta}
            </ScrollLink>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            {hero.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="rounded-3xl bg-white p-8 shadow-card ring-1 ring-slate-100">
            <p className="text-sm font-bold text-brand-700">اطلاعات تماس</p>
            <dl className="mt-5 space-y-5 text-sm">
              <div>
                <dt className="text-slate-500">تلفن</dt>
                <dd className="mt-1 text-lg font-bold">
                  <a href={site.phoneHref} className="hover:text-brand-700" dir="ltr">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">ساعات کاری</dt>
                <dd className="mt-1 font-medium">{site.hours}</dd>
              </div>
              <div>
                <dt className="text-slate-500">آدرس</dt>
                <dd className="mt-1 font-medium leading-7">{site.address}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
