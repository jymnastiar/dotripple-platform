import { Cookie } from "lucide-react";

export const metadata = {
  title: "Cookie Policy - DotRipple",
  description: "Learn how DotRipple uses cookies to enhance your browsing experience.",
};

export default function CookiePolicyPage() {
  return (
    <article className="max-w-3xl mx-auto py-12 md:py-16 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 dark:border-primary/40 bg-primary/5 dark:bg-primary/20 text-primary text-xs font-semibold">
          <Cookie className="size-3" />
          <span>Tracking & Storage Policy</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: June 18, 2026</p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-6 text-sm leading-relaxed">
        <p>
          This Cookie Policy explains what cookies are, how we use them on DotRipple, and your choices regarding cookies.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">1. What are Cookies?</h2>
          <p>
            Cookies are small text files stored on your computer or mobile device when you visit a website. They help websites recognize your device, store user preferences, and keep you logged in.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">2. How DotRipple Uses Cookies</h2>
          <p>We use cookies primarily for the following essential purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Authentication & Sessions:</strong> We use cookies to keep you logged in as you navigate through different pages. These are managed securely by Better Auth.
            </li>
            <li>
              <strong>Preferences:</strong> We use cookies to remember settings like your preferred website theme (light or dark mode) via `next-themes`.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">3. Your Choices Regarding Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings. You can block or delete cookies, but doing so will log you out of your account and reset preferences like theme settings on each visit.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">4. Changes to This Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We encourage visitors to frequently check this page for any changes.
          </p>
        </section>
      </div>
    </article>
  );
}
