const BREVO_ENDPOINT = "https://api.brevo.com/v3/contacts";
const DEMO_REQUEST_LIST_ID = 3; // "Richieste demo ClubIS" list in Brevo

/**
 * Server-side proxy for adding a demo-request lead to the Brevo CRM list that
 * drives the nurture-email automation. Runs on Vercel (Node runtime) because
 * Brevo's API has no CORS allowance for browser-origin requests, and the API
 * key must never reach the client bundle.
 */
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    res.status(200).json({ synced: false, reason: "not-configured" });
    return;
  }

  const { nome, email, societa, telefono } = req.body || {};
  if (!email) {
    res.status(400).json({ error: "email is required" });
    return;
  }

  try {
    const brevoRes = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          NOME: nome || "",
          SOCIETA: societa || "",
          TELEFONO: telefono || "",
        },
        listIds: [DEMO_REQUEST_LIST_ID],
        updateEnabled: true,
      }),
    });

    if (!brevoRes.ok && brevoRes.status !== 204) {
      const detail = await brevoRes.text();
      res.status(200).json({ synced: false, reason: detail });
      return;
    }

    res.status(200).json({ synced: true });
  } catch (err) {
    res.status(200).json({ synced: false, reason: (err as Error).message });
  }
}
