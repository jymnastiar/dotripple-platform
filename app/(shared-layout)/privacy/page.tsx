import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - DotRipple",
  description: "Learn how DotRipple collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-3xl mx-auto py-12 md:py-16 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 dark:border-primary/40 bg-primary/5 dark:bg-primary/20 text-primary text-xs font-semibold">
          <Shield className="size-3" />
          <span>Security & Data Protection</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: June 18, 2026</p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-6 text-sm leading-relaxed">
        <p>
          At DotRipple, accessible from dotripple.vercel.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by DotRipple and how we use it.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">1. Information We Collect</h2>
          <p>
            When you register for an account, we may ask for your contact information, including items such as name, username, email address, and profile picture. We also store the posts, images, and comments that you publish on our platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">2. How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Process your authentication and keep your account secure</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">3. Authentication and Third-Party Services</h2>
          <p>
            DotRipple uses Better Auth and Convex to securely manage user sessions and database data. Your passwords and authentication tokens are handled securely using industry-standard cryptography. We do not sell or share your personal data with third-party advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">4. Contact Us</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at fadhligymnastiar99@gmail.com.
          </p>
        </section>
      </div>
    </article>
  );
}
