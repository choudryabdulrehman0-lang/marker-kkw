import type { SupabaseClient } from "@supabase/supabase-js";
import type { Plan } from "@/lib/types";

export const FREE_DAILY_LIMIT = 3;

export async function getUsageToday(supabase: SupabaseClient, userId: string) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", start.toISOString());

  if (error) throw error;
  return count ?? 0;
}

export function canGenerate(plan: Plan, usageToday: number) {
  return plan === "pro" || usageToday < FREE_DAILY_LIMIT;
}
