"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "@/hooks/use-login";
import { motion } from "motion/react";

export default function LoginPage() {
  const { form, isPending, handleLogin } = useLogin();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col gap-8 mt-6 w-full"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Sign in to Dot<span className="text-primary">Ripple</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to continue your journey.
        </p>
      </div>

      <form
        id="login-form"
        onSubmit={form.handleSubmit(handleLogin)}
        className="flex flex-col gap-5"
      >
        <FieldGroup className="gap-y-4">
          <Controller
            name="account"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Email or Username</FieldLabel>
                <Input
                  aria-invalid={fieldState.invalid}
                  placeholder="example@gmail.com"
                  {...field}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel>Password</FieldLabel>
                  <a
                    href="#"
                    className="text-xs text-primary hover:underline underline-offset-4"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  aria-invalid={fieldState.invalid}
                  type="password"
                  placeholder="••••••••"
                  {...field}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          disabled={isPending}
          type="submit"
          form="login-form"
          className="w-full cursor-pointer font-semibold"
        >
          {isPending ? (
            <>
              <Spinner data-icon="inline-start" />
              <span>Signing in...</span>
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <hr className="flex-1 border-border" />
        <span>or</span>
        <hr className="flex-1 border-border" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/sign-up"
          className="font-semibold text-primary hover:underline underline-offset-4"
        >
          Sign up for free
        </Link>
      </p>
    </motion.div>
  );
}
