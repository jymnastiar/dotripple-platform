import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Update your personal information and how others see you.",
};

export default function EditProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
