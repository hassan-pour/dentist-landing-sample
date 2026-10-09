import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-10">
      <div className="container-page flex flex-col items-center justify-between gap-3 text-sm text-slate-600 sm:flex-row">
        <p className="font-bold text-ink">{site.name}</p>
        <p>{site.address}</p>
      </div>
    </footer>
  );
}
