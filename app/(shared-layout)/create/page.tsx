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
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
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
import tagsData from "../../../data/tags-data.json";
import { UploadCloud, X } from "lucide-react";

export default function CreatePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelecteFile] = useState<File | null>(null);
  const router = useRouter();
  const [ispending, startTransition] = useTransition();
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const anchor = useComboboxAnchor();

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      image: "",
      title: "",
      content: "",
      tags: [],
    },
  });

  function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const imgType = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!imgType.includes(file.type)) {
        toast.error("Format image not allowed");
        e.target.value = "";
        setSelecteFile(null);
        setPreview(null);
        return;
      }
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
          storageId = json.storageId;
        } catch (err) {
          toast.error("Failed to upload image");
          return;
        }
      }

      const finalData = {
        ...data,
        image: storageId || undefined,
      };

      const result = await createBlogAction(finalData);

      if (result.success) {
        toast.success("Blog has been posted", { position: "top-center" });
        router.push("/blog");
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
                <FieldLabel>Post Image</FieldLabel>
                <div className="mt-2 w-full">
                  {!preview ? (
                    <label
                      htmlFor="image-upload"
                      className="flex relative flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/60 border-muted-foreground/30 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 pointer-events-none h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          JPG, JPEG, PNG, or WEBP (MAX. 5MB)
                        </p>
                      </div>
                      <Input
                        id="image-upload"
                        type="file"
                        accept=".jpg, .jpeg, .png, .webp"
                        onChange={handlePreview}
                        className="absolute inset-0 w-full opacity-0 h-full cursor-pointer z-10"
                      />
                    </label>
                  ) : (
                    <div className="relative w-full overflow-hidden rounded-xl border border-input bg-muted/30">
                      <img
                        className="w-full max-h-72 object-contain"
                        src={preview}
                        alt="image preview"
                      />

                      <Button
                        type="button"
                        onClick={() => {
                          setSelecteFile(null);
                          setPreview(null);
                        }}
                        aria-label="Remove image"
                        variant="outline"
                        size="icon"
                        className="rounded-full absolute top-3 right-3 cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
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

              <Controller
                name="tags"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Post Tags</FieldLabel>
                    <Combobox
                      multiple
                      autoHighlight
                      items={tagsData}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <ComboboxChips ref={anchor} className="w-full">
                        <ComboboxValue>
                          {(values) => (
                            <React.Fragment>
                              {values.map((value: string) => (
                                <ComboboxChip key={value}>{value}</ComboboxChip>
                              ))}
                              <ComboboxChipsInput placeholder="select tags" />
                            </React.Fragment>
                          )}
                        </ComboboxValue>
                      </ComboboxChips>
                      <ComboboxContent anchor={anchor}>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(group, index) => (
                            <ComboboxGroup
                              key={group.value}
                              items={group.items}
                            >
                              <ComboboxLabel>{group.value}</ComboboxLabel>
                              <ComboboxCollection>
                                {(item) => (
                                  <ComboboxItem key={item} value={item}>
                                    {item}
                                  </ComboboxItem>
                                )}
                              </ComboboxCollection>
                              {index < tagsData.length - 1 && (
                                <ComboboxSeparator />
                              )}
                            </ComboboxGroup>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
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
