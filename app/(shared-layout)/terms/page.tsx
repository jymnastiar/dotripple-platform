import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service - DotRipple",
  description: "Read the Terms of Service governing your use of DotRipple.",
};

export default function TermsOfServicePage() {
  return (
    <article className="max-w-3xl mx-auto py-12 md:py-16 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 dark:border-primary/40 bg-primary/5 dark:bg-primary/20 text-primary text-xs font-semibold">
          <FileText className="size-3" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Last updated: June 18, 2026</p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-6 text-sm leading-relaxed">
        <p>
          Welcome to DotRipple! By accessing our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By creating an account, publishing posts, leaving comments, or browsing DotRipple, you agree to these Terms of Service. If you do not agree, please do not use our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">2. User Accounts & Responsibilities</h2>
          <p>
            When creating an account, you are responsible for maintaining the confidentiality of your credentials and all actions taken under your account. You agree to provide accurate and up-to-date information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">3. User Generated Content</h2>
          <p>
            You retain ownership of the content (text, images, tags) that you publish on DotRipple. However, by posting, you grant DotRipple a worldwide, non-exclusive, royalty-free license to display, distribute, and format your content on our website.
          </p>
          <p>
            You agree not to publish any content that is illegal, offensive, infringes intellectual property, or constitutes spam.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">4. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account and restrict access to the site at our sole discretion, without notice, for conduct that we believe violates these Terms of Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">5. Contact Information</h2>
          <p>
            For any questions regarding these Terms of Service, please reach out to us at fadhligymnastiar99@gmail.com.
          </p>
        </section>
      </div>
    </article>
  );
}
