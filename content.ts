import * as cheerio from "cheerio";

const URL_PATTERN = /^https?:\/\/\S+$/i;

export function isUrl(input: string) {
  return URL_PATTERN.test(input.trim());
}

export function cleanBlogText(input: string) {
  return input
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .trim()
    .slice(0, 18000);
}

export async function resolveBlogInput(input: string) {
  const trimmed = input.trim();
  if (!isUrl(trimmed)) {
    return cleanBlogText(trimmed);
  }

  const response = await fetch(trimmed, {
    headers: {
      "user-agent": "BlogToMarketingContentAI/1.0"
    },
    signal: AbortSignal.timeout(6500)
  });

  if (!response.ok) {
    throw new Error("Could not read the blog URL. Paste the article text instead.");
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  $("script, style, nav, footer, header, aside, form").remove();

  const title = $("h1").first().text();
  const article = $("article").text() || $("main").text() || $("body").text();
  const content = cleanBlogText(`${title}\n\n${article}`);

  if (content.length < 300) {
    throw new Error("That URL did not contain enough readable article text.");
  }

  return content;
}
