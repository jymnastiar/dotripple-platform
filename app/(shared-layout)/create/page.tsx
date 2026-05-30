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
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function CreatePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelecteFile] = useState<File | null>(null);
  const router = useRouter();
  const [ispending, startTransition] = useTransition();
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      image: "",
      title: "",
      content: "",
    },
  });

  function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelecteFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setSelecteFile(null);
      setPreview(null);
    }
  }

  function handleCreatePost(data: z.infer<typeof postSchema>) {
    startTransition(async () => {
      let storageId = "";
      if (selectedFile) {
        try {
          const postUrl = await generateUploadUrl();
          const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-type": selectedFile.type },
            body: selectedFile,
          });
          const json = await result.json();
          storageId = json.storateId;
        } catch (err) {
          toast.error("Failed to upload image");
          return;
        }
      }

      const finalData = {
        ...data,
        image: storageId,
      };

      const result = await createBlogAction(finalData);

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
              <Field>
                <FieldLabel>Upload an image</FieldLabel>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Choose file"
                  onChange={handlePreview}
                />
                {preview && (
                  <img
                    className="max-h-64 w-auto block object-contain"
                    src={preview}
                    alt="image preview"
                  />
                )}
              </Field>

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
