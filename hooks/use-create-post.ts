import { createBlogAction } from "@/app/actions";
import { postSchema } from "@/app/schemas/blog";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function useCreatePost() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      image: "",
      title: "",
      content: "",
      tags: [] as string[],
    },
  });

  function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/avif",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Format image not allowed");
        e.target.value = "";
        setSelectedFile(null);
        setPreview(null);
        return;
      }

      const max_size_mb = 5;
      const max_size_bytes = max_size_mb * 1024 * 1024;
      if (file.size > max_size_bytes) {
        toast.error(`Image size must be under ${max_size_mb}MB`);
        e.target.value = "";
        setSelectedFile(null);
        setPreview(null);
        return;
      }

      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
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
        } catch {
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

  return {
    form,
    preview,
    isPending,
    handlePreview,
    handleCreatePost,
    setSelectedFile,
    setPreview,
  };
}
