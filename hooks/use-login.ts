import { loginSchema } from "@/app/schemas/auth";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function useLogin() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      account: "",
      password: "",
    },
  });

  function handleLogin(data: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const isEmail = data.account.includes("@");

      if (isEmail) {
        await authClient.signIn.email({
          email: data.account,
          password: data.password,
          fetchOptions: {
            onSuccess: () => {
              toast.success("Logged in successfully");
              router.push("/");
            },
            onError: (error) => {
              toast.error(error.error.message);
            },
          },
        });
      } else {
        await authClient.signIn.username({
          username: data.account,
          password: data.password,
          fetchOptions: {
            onSuccess: () => {
              toast.success("Logged in successfully");
              router.push("/");
            },
            onError: (error) => {
              toast.error(error.error.message);
            },
          },
        });
      }
    });
  }

  return { form, isPending, handleLogin };
}
