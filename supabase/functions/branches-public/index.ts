import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { handleOptions, json } from "../_shared/cors.ts";
import { serviceClient } from "../_shared/supa.ts";

serve(async (req) => {
  const opt = handleOptions(req);
  if (opt) return opt;
  try {
    const supa = serviceClient();
    const { data } = await supa
      .from("branches")
      .select("id, name")
      .eq("is_active", true)
      .order("name");
    return json({ branches: data ?? [] });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "خطأ" }, 500);
  }
});
