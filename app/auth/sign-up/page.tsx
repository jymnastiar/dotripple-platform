"use client";

import { signUpSchema } from "@/app/schemas/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function SignUpPage() {
  const [ispending, startTransition] = useTransition();
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

  function handleSubmitButton(data: z.infer<typeof signUpSchema>) {
    startTransition(async () => {
      await (authClient.signUp.email as any)({
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={form.handleSubmit(handleSubmitButton)}>
          <FieldGroup className="gap-y-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="John Doe"
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="example@gmail.com"
                    type="email"
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="john_doe"
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    type="password"
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button
          disabled={ispending}
          form="signup-form"
          type="submit"
          className="w-full cursor-pointer"
        >
          {ispending ? (
            <>
              <Spinner data-icon="inline-start" />
              <span>Loading...</span>
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
        <div className="flex justify-center items-center gap-2 w-full">
          <hr className="flex-1" />
          <span className="text-center">or have an account</span>
          <hr className="flex-1" />
        </div>
        <Link
          href={"/auth/login"}
          className={`w-full ${buttonVariants({ variant: "outline" })}`}
        >
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
