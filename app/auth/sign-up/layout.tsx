import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a DotRipple account to start sharing your stories and ideas.",
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
