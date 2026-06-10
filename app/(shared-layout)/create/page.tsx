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
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";
import { useCreatePost } from "@/hooks/use-create-post";
import { useRouter } from "next/navigation";
import { PostImageUpload } from "@/components/web/create/post-image-upload";
import { PostTagsField } from "@/components/web/create/post-tags-field";
import { PostFormActions } from "@/components/web/create/post-form-actions";

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
    <section className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your ideas, insights, and stories with the community.
        </p>
      </div>

      <Card className="w-full max-w-2xl mx-auto gap-5">
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
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="Write your article content here..."
                      {...field}
                    />
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
        <CardFooter className="flex mt-5 flex-col gap-3">
          <PostFormActions
            isPending={isPending}
            onCancel={() => router.back()}
          />
        </CardFooter>
      </Card>
    </section>
  );
}
