function readEnv(name: string, fallback = "") {
  return process.env[name] ?? fallback;
}

export const env = {
  appUrl: readEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  openaiApiKey: readEnv("OPENAI_API_KEY"),
  supabaseUrl: readEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  supabaseServiceRoleKey: readEnv("SUPABASE_SERVICE_ROLE_KEY"),
  stripeSecretKey: readEnv("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: readEnv("STRIPE_WEBHOOK_SECRET"),
  stripeProPriceId: readEnv("STRIPE_PRO_PRICE_ID")
};
