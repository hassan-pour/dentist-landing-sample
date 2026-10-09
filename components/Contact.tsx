import { site } from "@/lib/site";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="section-title">دریافت نوبت</h2>
          <p className="section-sub">
            فرم را پر کنید تا برای هماهنگی نوبت با شما تماس بگیریم. برای موارد فوری مستقیماً تماس بگیرید.
          </p>
          <a href={site.phoneHref} dir="ltr" className="mt-6 inline-block text-2xl font-extrabold text-brand-700">
            {site.phone}
          </a>
          <p className="mt-3 text-sm text-slate-600">{site.hours}</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
