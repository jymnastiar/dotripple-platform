"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default function LoginPage() {
  const { form, isPending, handleLogin } = useLogin();

  return (
    <section className="">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href={"/auth/sign-up"}>
              <Button className="cursor-pointer" variant="link">
                Sign Up
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(handleLogin)}>
            <FieldGroup className="gap-y-4">
              <Controller
                name={"account"}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email or Username</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="example@gmail.com"
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
                    <div className="flex items-center">
                      <FieldLabel>Password</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
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

        <CardFooter className="flex-col gap-3">
          <Button
            disabled={isPending}
            type="submit"
            form="login-form"
            className="w-full cursor-pointer"
          >
            {isPending ? (
              <>
                <Spinner data-icon="inline-start" />
                <span>Loading...</span>
              </>
            ) : (
              "login"
            )}
          </Button>
          <div className="flex justify-center items-center gap-2 w-full">
            <hr className="flex-1" />
            <span className="text-center">or</span>
            <hr className="flex-1" />
          </div>
          <Button variant="outline" className="w-full cursor-pointer">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
