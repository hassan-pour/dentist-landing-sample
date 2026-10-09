import { site } from "@/lib/site";

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-slate-50 py-16 sm:py-24">
      <div className="container-page max-w-3xl">
        <h2 className="section-title">سوالات متداول</h2>

        <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {site.faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                {f.q}
                <span className="text-brand-600 transition group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 leading-8 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
