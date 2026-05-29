"use client";

import { createBlogAction } from "@/app/actions";
import { postSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function CreatePage() {
  const router = useRouter();
  const [ispending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function handleCreatePost(data: z.infer<typeof postSchema>) {
    startTransition(async () => {
      const result = await createBlogAction(data);

      if (result.success) {
        toast.success("Blog has been posted", { position: "top-center" });
        router.push("/");
      } else {
        toast.error(result.error, { position: "top-center" });
        if (result.error?.includes("logged in")) {
          router.push("/auth/login");
        }
      }
    });
  }

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Lorem ipsum dolor sit amet.
        </p>
      </div>

      <Card className="w-full max-w-xl mx-auto gap-5">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <form id="post-form" onSubmit={form.handleSubmit(handleCreatePost)}>
            <FieldGroup className="gap-y-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Post Title</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="title here"
                      {...field}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="lorem ipsum dolor es sir"
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
            form="post-form"
            className="w-full cursor-pointer"
          >
            {ispending ? (
              <>
                <Spinner data-icon="inline-start" />
                <span>Loading...</span>
              </>
            ) : (
              "Create Post"
            )}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
