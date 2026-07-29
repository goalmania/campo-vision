import { z } from "zod";

export const leadFormSchema = z.object({
  nome: z.string().trim().min(2, "Inserisci il tuo nome"),
  email: z.string().trim().email("Inserisci un'email valida"),
  societa: z.string().trim().min(2, "Inserisci il nome della società"),
  telefono: z.string().trim().optional().or(z.literal("")),
  // Honeypot: real users never fill this (hidden via CSS); bots that
  // autofill every field will trip it and get silently dropped.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

export class LeadFormNotConfiguredError extends Error {
  constructor() {
    super("Web3Forms access key is not configured");
    this.name = "LeadFormNotConfiguredError";
  }
}

/**
 * Submits a demo-request lead to Web3Forms (free form-to-email relay, no
 * backend of our own). `source` identifies which CTA/page triggered the
 * submission (e.g. "hero-clubis", "exit-intent-home") so replies can be
 * traced back to the funnel step that produced them.
 */
export async function submitLeadForm(values: LeadFormValues, source: string): Promise<void> {
  if (values.website) return; // honeypot tripped, pretend success, drop silently

  if (!ACCESS_KEY) {
    throw new LeadFormNotConfiguredError();
  }

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject: `Nuova richiesta demo ClubIS — ${values.societa}`,
      from_name: "Sito dmfootballservices.it",
      name: values.nome,
      email: values.email,
      societa: values.societa,
      telefono: values.telefono || "—",
      source,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data?.message || "Invio non riuscito");
  }
}
