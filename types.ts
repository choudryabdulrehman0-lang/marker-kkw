export type Plan = "free" | "pro";

export type GeneratedOutput = {
  linkedin_post: string;
  email_newsletter: string;
  twitter_thread: string;
  seo_meta: string;
};

export type ProjectWithOutput = {
  id: string;
  blog_input: string;
  created_at: string;
  outputs:
    | {
        id: string;
        linkedin_post: string;
        email_newsletter: string;
        twitter_thread: string;
        seo_meta: string;
        created_at: string;
      }[]
    | null;
};
