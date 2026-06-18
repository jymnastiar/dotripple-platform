import { signUpSchema } from "@/app/schemas/auth";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function useSignUp() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
  });

  function handleSignUp(data: z.infer<typeof signUpSchema>) {
    startTransition(async () => {
      await (authClient.signUp.email as unknown as (data: Record<string, unknown>) => Promise<unknown>)({
        email: data.email,
        name: data.name,
        password: data.password,
        username: data.username,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Account created successfully", {
              position: "top-center",
            });
            router.push("/");
          },
          onError: (error: { error: { message: string } }) => {
            toast.error(error.error.message);
          },
        },
      });
    });
  }

  return { form, isPending, handleSignUp };
}
