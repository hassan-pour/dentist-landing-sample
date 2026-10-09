import { site } from "@/lib/site";

const faDigits = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export default function Process() {
  return (
    <section id="process" className="scroll-mt-20 bg-brand-900 py-16 text-white sm:py-24">
      <div className="container-page">
        <h2 className="section-title">مراحل درمان</h2>
        <p className="mt-3 max-w-2xl leading-8 text-brand-100">
          مسیر درمان از اولین تماس تا پیگیری نهایی ساده و شفاف است.
        </p>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.process.map((step, i) => (
            <li key={step.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 font-extrabold text-white">
                {faDigits[i]}
              </span>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-brand-100">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
