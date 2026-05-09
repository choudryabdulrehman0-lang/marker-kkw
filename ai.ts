import OpenAI from "openai";
import { z } from "zod";
import { env } from "@/lib/env";
import type { GeneratedOutput } from "@/lib/types";

const outputSchema = z.object({
  linkedin_post: z.string().min(80),
  email_newsletter: z.string().min(120),
  twitter_thread: z.string().min(80),
  seo_meta: z.string().min(30).max(160)
});

export async function generateMarketingContent(blogContent: string): Promise<GeneratedOutput> {
  if (!env.openaiApiKey) {
    throw new Error("OpenAI API key is not configured.");
  }

  const openai = new OpenAI({ apiKey: env.openaiApiKey });
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are a senior B2B content strategist. Convert blog content into platform-specific marketing assets. Never duplicate wording across formats. Return only valid JSON with keys linkedin_post, email_newsletter, twitter_thread, seo_meta."
      },
      {
        role: "user",
        content: `Create four distinct outputs from this blog content.

LinkedIn post:
- professional tone
- engaging hook
- structured paragraphs
- business-focused writing

Email newsletter:
- include a subject line
- include hook, value explanation, and CTA

Twitter/X thread:
- 5 to 10 numbered tweets max
- viral writing style
- short sentences
- strong hook in first tweet

SEO meta description:
- max 160 characters
- keyword optimized
- readable summary

Blog content:
${blogContent}`
      }
    ]
  });

  const raw = completion.choices[0]?.message.content;
  if (!raw) {
    throw new Error("AI generation returned no content.");
  }

  const parsed = outputSchema.parse(JSON.parse(raw));
  return parsed;
}
