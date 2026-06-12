import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your DotRipple account to manage your posts and comments.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
