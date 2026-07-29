import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check } from "lucide-react";
import { leadFormSchema, LeadFormValues, submitLeadForm, LeadFormNotConfiguredError } from "@/lib/leadForm";
import { toast } from "@/components/ui/sonner";

const WHATSAPP_FALLBACK_HREF =
  "https://wa.me/393334218596?text=" +
  encodeURIComponent("Ciao, ho provato a inviare una richiesta demo dal sito ma non è andata a buon fine. Vorrei parlare con voi per la mia società.");

interface DemoRequestFormProps {
  source: string;
  onSuccess?: () => void;
  className?: string;
}

export default function DemoRequestForm({ source, onSuccess, className = "" }: DemoRequestFormProps) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormValues>({ resolver: zodResolver(leadFormSchema) });

  const onSubmit = async (values: LeadFormValues) => {
    try {
      await submitLeadForm(values, source);
      setSent(true);
      reset();
      toast.success("Richiesta inviata. Ti ricontattiamo entro 24 ore lavorative.");
      onSuccess?.();
    } catch (err) {
      const message =
        err instanceof LeadFormNotConfiguredError
          ? "Il modulo non è ancora attivo. Scrivici su WhatsApp, ti rispondiamo subito."
          : "Invio non riuscito. Riprova o scrivici su WhatsApp.";
      toast.error(message, {
        action: {
          label: "WhatsApp",
          onClick: () => window.open(WHATSAPP_FALLBACK_HREF, "_blank", "noopener,noreferrer"),
        },
      });
    }
  };

  if (sent) {
    return (
      <div className={`flex flex-col items-center text-center gap-3 py-6 ${className}`}>
        <div className="flex items-center justify-center rounded-full bg-cis-green/12 text-cis-green" style={{ width: 40, height: 40 }}>
          <Check size={20} strokeWidth={2.4} />
        </div>
        <p className="font-body text-cis-white text-sm max-w-xs">
          Richiesta ricevuta. Ti ricontattiamo entro 24 ore lavorative.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={`flex flex-col gap-4 ${className}`}>
      {/* Honeypot — hidden from sighted users, real fields for bots to fill in */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] w-px h-px opacity-0"
        aria-hidden="true"
        {...register("website")}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${source}-nome`} className="font-display font-bold text-[11px] uppercase tracking-[0.12em] text-cis-muted">
            Nome
          </label>
          <input
            id={`${source}-nome`}
            type="text"
            placeholder="Mario Rossi"
            className="bg-cis-black border border-cis-line rounded-[10px] px-3.5 py-2.5 font-body text-sm text-cis-white placeholder:text-cis-muted/60 focus:outline-none focus:border-cis-green transition-colors"
            {...register("nome")}
          />
          {errors.nome && <span className="font-body text-xs text-destructive">{errors.nome.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${source}-societa`} className="font-display font-bold text-[11px] uppercase tracking-[0.12em] text-cis-muted">
            Società
          </label>
          <input
            id={`${source}-societa`}
            type="text"
            placeholder="ASD Nome Società"
            className="bg-cis-black border border-cis-line rounded-[10px] px-3.5 py-2.5 font-body text-sm text-cis-white placeholder:text-cis-muted/60 focus:outline-none focus:border-cis-green transition-colors"
            {...register("societa")}
          />
          {errors.societa && <span className="font-body text-xs text-destructive">{errors.societa.message}</span>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${source}-email`} className="font-display font-bold text-[11px] uppercase tracking-[0.12em] text-cis-muted">
            Email
          </label>
          <input
            id={`${source}-email`}
            type="email"
            placeholder="mario@societa.it"
            className="bg-cis-black border border-cis-line rounded-[10px] px-3.5 py-2.5 font-body text-sm text-cis-white placeholder:text-cis-muted/60 focus:outline-none focus:border-cis-green transition-colors"
            {...register("email")}
          />
          {errors.email && <span className="font-body text-xs text-destructive">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${source}-telefono`} className="font-display font-bold text-[11px] uppercase tracking-[0.12em] text-cis-muted">
            Telefono <span className="normal-case text-cis-muted/60">(facoltativo)</span>
          </label>
          <input
            id={`${source}-telefono`}
            type="tel"
            placeholder="333 1234567"
            className="bg-cis-black border border-cis-line rounded-[10px] px-3.5 py-2.5 font-body text-sm text-cis-white placeholder:text-cis-muted/60 focus:outline-none focus:border-cis-green transition-colors"
            {...register("telefono")}
          />
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary justify-center mt-1 disabled:opacity-60">
        {isSubmitting ? (
          <>
            <Loader2 size={15} className="animate-spin" /> Invio in corso…
          </>
        ) : (
          "Richiedi una demo"
        )}
      </button>
      <p className="font-body text-[11px] text-cis-muted text-center -mt-1">
        Nessuno spam. Usiamo i tuoi dati solo per ricontattarti riguardo ClubIS.
      </p>
    </form>
  );
}
