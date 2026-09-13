import { supabase } from "@/lib/supabase";

export type QuoteStatus = "Nueva" | "En proceso" | "Respondida" | "Cerrada";

export const QUOTE_STATUSES: QuoteStatus[] = [
  "Nueva",
  "En proceso",
  "Respondida",
  "Cerrada",
];

export async function updateQuoteStatus(
  id: string,
  status: QuoteStatus
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("quotes")
    .update({ status })
    .eq("id", id);

  if (error) {
    return { error: "No pudimos actualizar el estado. Intentá nuevamente." };
  }

  return { error: null };
}
