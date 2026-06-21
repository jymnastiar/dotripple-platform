"use client";

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
import { PenLine } from "lucide-react";
import { Controller } from "react-hook-form";
import { useCreatePost } from "@/hooks/use-create-post";
import { useRouter } from "next/navigation";
import { PostImageUpload } from "@/components/web/create/post-image-upload";
import { PostTagsField } from "@/components/web/create/post-tags-field";
import { PostFormActions } from "@/components/web/create/post-form-actions";
import Tiptap from "@/components/shared/TipTap";

export default function CreatePage() {
  const router = useRouter();
  const {
    form,
    preview,
    isPending,
    handlePreview,
    handleCreatePost,
    setSelectedFile,
    setPreview,
  } = useCreatePost();

  return (
    <section className="py-12 md:py-16 flex flex-col gap-12 w-full">
      <div className="relative flex flex-col items-center text-center gap-4 w-full max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 dark:border-primary/40 bg-primary/5 dark:bg-primary/20 text-primary text-xs font-semibold animate-pulse">
          <PenLine className="size-3" />
          <span>Share Your Thoughts With The World</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Create a <span className="text-primary">Ripple</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Write your ideas, insights, and stories. Every post you publish
          creates a new wave in the community.
        </p>
      </div>

      <Card className="w-full max-w-4xl mx-auto gap-5">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>
            Fill in the details below to publish your article.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <form id="post-form" onSubmit={form.handleSubmit(handleCreatePost)}>
            <FieldGroup className="gap-y-4">
              <Field>
                <FieldLabel>Post Image</FieldLabel>
                <PostImageUpload
                  preview={preview}
                  onFileChange={handlePreview}
                  onRemove={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                />
              </Field>

              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Post Title</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Title post here"
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
                    {/* <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="Write your article content here..."
                      {...field}
                    /> */}
                    <Tiptap content={field.value} onChange={field.onChange} />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <PostTagsField control={form.control} name="tags" />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="mt-5 flex w-full justify-center">
          <PostFormActions
            isPending={isPending}
            onCancel={() => router.back()}
          />
        </CardFooter>
      </Card>
    </section>
  );
}
