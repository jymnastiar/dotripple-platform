"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, X } from "lucide-react";

interface PostImageUploadProps {
  preview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export function PostImageUpload({
  preview,
  onFileChange,
  onRemove,
}: PostImageUploadProps) {
  return (
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
            onChange={onFileChange}
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
            onClick={onRemove}
            aria-label="Remove image"
            variant="destructive"
            size="icon"
            className="rounded-full absolute top-3 right-3 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
