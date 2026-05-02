import { useState } from "react";
import { z } from "zod";
import { ArrowRight, Mail, MapPin, Phone, Send, Building2, User, MessageSquare } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Inserisci il tuo nome").max(100),
  email: z.string().trim().email("Email non valida").max(255),
  company: z.string().trim().min(2, "Inserisci il nome della società").max(120),
  message: z.string().trim().min(10, "Scrivi almeno 10 caratteri").max(1000),
});

type Errs = Partial<Record<keyof z.infer<typeof schema>, string>>;

export default function Contatti() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errs>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      message: String(fd.get("message") || ""),
    };
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Errs = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as keyof Errs] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section id="contatti" className="relative py-24 md:py-32" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="fade-up eyebrow">// Contatti</div>
        <h2
          className="fade-up font-display font-extrabold text-white mt-6 mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 3rem)", lineHeight: 1 }}
        >
          Parliamone. In italiano, in tempo reale.
        </h2>
        <p className="fade-up font-body text-[#888] max-w-xl mb-16">
          Scrivici per una demo personalizzata di ClubIS o DM Scout. Ti rispondiamo entro 48 ore.
        </p>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Info column */}
          <div className="md:col-span-2 space-y-5">
            {[
              { icon: MapPin, label: "Sede", value: "Puglia, Italia", delay: 0 },
              { icon: Mail, label: "Email", value: "info@dmfootballservices.it", href: "mailto:info@dmfootballservices.it", delay: 80 },
              { icon: Phone, label: "Telefono", value: "+39 080 000 0000", href: "tel:+390800000000", delay: 160 },
            ].map((c) => (
              <div key={c.label} className="glass p-5 fade-up flex items-start gap-4" data-delay={String(c.delay)}>
                <div
                  className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--c-accent-dim)", color: "#c8f000" }}
                >
                  <c.icon size={18} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-[#888] mb-1" style={{ letterSpacing: "2px" }}>
                    {c.label}
                  </div>
                  {c.href ? (
                    <a href={c.href} className="font-display font-bold text-white uppercase text-[15px] hover:text-lime" style={{ letterSpacing: "1px" }}>
                      {c.value}
                    </a>
                  ) : (
                    <div className="font-display font-bold text-white uppercase text-[15px]" style={{ letterSpacing: "1px" }}>{c.value}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="glass p-5 fade-up" data-delay="240">
              <div className="font-mono text-[10px] uppercase text-lime mb-3" style={{ letterSpacing: "2px" }}>// Orari</div>
              <div className="space-y-1 text-[#aaa] text-sm font-body">
                <div className="flex justify-between"><span>Lun — Ven</span><span className="text-white">09:00 — 19:00</span></div>
                <div className="flex justify-between"><span>Sabato</span><span className="text-white">10:00 — 14:00</span></div>
                <div className="flex justify-between"><span>Domenica</span><span className="text-[#888]">Chiuso</span></div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 fade-up" data-delay="120">
            <form onSubmit={onSubmit} className="glass p-6 md:p-10" noValidate>
              <div className="font-mono text-[10px] uppercase text-lime mb-2" style={{ letterSpacing: "2px" }}>
                // Richiedi Demo
              </div>
              <h3 className="font-display font-extrabold text-white text-2xl md:text-3xl uppercase mb-8" style={{ letterSpacing: "1px" }}>
                Raccontaci del tuo club o della tua agenzia.
              </h3>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-[12px] flex items-center justify-center" style={{ background: "var(--c-accent-dim)", color: "#c8f000" }}>
                    <Send size={22} />
                  </div>
                  <div className="font-mono text-xs text-lime mb-3" style={{ letterSpacing: "2px" }}>// Richiesta Ricevuta</div>
                  <p className="font-display font-bold text-white text-2xl uppercase mb-3">Grazie. Ti scriviamo entro 48h.</p>
                  <p className="text-[#888] font-body">Nel frattempo, controlla la tua casella email.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <Field icon={User} name="name" placeholder="Mario Rossi" label="Nome e cognome" error={errors.name} required maxLength={100} />
                  <Field icon={Mail} name="email" type="email" placeholder="mario@club.it" label="Email" error={errors.email} required maxLength={255} />
                  <Field icon={Building2} name="company" placeholder="FC Taranto / DS — Agenzia X" label="Società e ruolo" error={errors.company} required maxLength={120} className="md:col-span-2" />

                  <div className="md:col-span-2">
                    <label className="font-mono text-[10px] uppercase text-[#888] mb-2 block" style={{ letterSpacing: "2px" }}>Messaggio</label>
                    <div className="relative">
                      <MessageSquare size={16} className="absolute left-4 top-4 text-[#666]" />
                      <textarea
                        name="message"
                        rows={5}
                        maxLength={1000}
                        required
                        placeholder="Cosa vuoi gestire meglio? Quanti collaboratori? Quale prodotto ti interessa?"
                        className="w-full bg-black/60 border-[0.5px] border-white/10 rounded-[12px] pl-11 pr-4 py-3 font-body text-white placeholder:text-white/40 focus:outline-none focus:border-lime/50 resize-none"
                      />
                    </div>
                    {errors.message && <p className="text-[#ff4444] text-xs mt-1 font-mono">{errors.message}</p>}
                  </div>

                  <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                    <button type="submit" className="btn-lime">
                      Invia Richiesta <ArrowRight size={16} />
                    </button>
                    <p className="font-mono text-[10px] uppercase text-[#666]" style={{ letterSpacing: "2px" }}>
                      Risposta entro 48 ore lavorative
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon: Icon, name, label, error, className = "", ...rest
}: { icon: any; name: string; label: string; error?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className="font-mono text-[10px] uppercase text-[#888] mb-2 block" style={{ letterSpacing: "2px" }}>{label}</label>
      <div className="relative">
        <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
        <input
          name={name}
          {...rest}
          className="w-full bg-black/60 border-[0.5px] border-white/10 rounded-[12px] pl-11 pr-4 py-3 font-body text-white placeholder:text-white/40 focus:outline-none focus:border-lime/50"
        />
      </div>
      {error && <p className="text-[#ff4444] text-xs mt-1 font-mono">{error}</p>}
    </div>
  );
}
