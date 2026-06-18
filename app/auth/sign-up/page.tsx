"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { useSignUp } from "@/hooks/use-sign-up";
import { motion } from "motion/react";

export default function SignUpPage() {
  const { form, isPending, handleSignUp } = useSignUp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col gap-8 mt-6 w-full"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Join Dot<span className="text-primary">Ripple</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Start sharing your ideas and spark waves of conversation.
        </p>
      </div>

      <form
        id="signup-form"
        onSubmit={form.handleSubmit(handleSignUp)}
        className="flex flex-col gap-5"
      >
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
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
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
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
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
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
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
          form="signup-form"
          type="submit"
          className="w-full cursor-pointer font-semibold"
        >
          {isPending ? (
            <>
              <Spinner data-icon="inline-start" />
              <span>Creating account...</span>
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <hr className="flex-1 border-border" />
        <span>or</span>
        <hr className="flex-1 border-border" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-primary hover:underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
