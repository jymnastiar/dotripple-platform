"use client";

import { Check, User } from "lucide-react";
import type { Variants } from "motion/react";
import { motion, useReducedMotion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Control, Controller } from "react-hook-form";
import { EditProfileFormValues } from "@/hooks/use-edit-profile";
import avatars from "@/data/avatars.json";

interface AcatarPickerProps {
  control: Control<EditProfileFormValues>;
  className?: string;
}

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const thumbnailVariants: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
};

export default function AcatarPicker({
  className,
  control,
}: AcatarPickerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Controller
      name="avatarId"
      control={control}
      render={({ field }) => {
        const selectedAvatar =
          avatars.find((a) => String(a.id) === field.value) ?? avatars[0];

        return (
          <Card
            className={cn("relative w-full border-border bg-card", className)}
          >
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="size-5 text-primary" /> Pick Your Avatar
              </CardTitle>
              <CardDescription>Choose one to get started.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center gap-8">
              <Avatar className="size-24">
                <AvatarImage
                  src={selectedAvatar.src}
                  alt={selectedAvatar.alt}
                />
                <AvatarFallback>
                  <img
                    src={selectedAvatar.src}
                    alt={selectedAvatar.alt}
                    className="w-full h-full object-cover"
                  />
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-3 w-full sm:w-auto">
                <motion.div
                  animate="animate"
                  className="flex flex-wrap gap-3 justify-center sm:justify-start"
                  initial="initial"
                  variants={containerVariants}
                >
                  {avatars.map((avatar) => {
                    const isSelected = selectedAvatar.id === avatar.id;
                    return (
                      <motion.button
                        aria-label={`Select ${avatar.alt}`}
                        aria-pressed={isSelected}
                        className={cn(
                          "relative h-14 w-14 rounded-full border bg-muted transition-[opacity,box-shadow] duration-200 ease-out",
                          isSelected
                            ? "border-foreground/20 opacity-100 ring-2 ring-foreground/70 ring-offset-2 ring-offset-background"
                            : "border-border opacity-50 hover:opacity-100",
                        )}
                        key={avatar.id}
                        onClick={() => field.onChange(String(avatar.id))}
                        type="button"
                        variants={thumbnailVariants}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
                      >
                        <img
                          src={avatar.src}
                          alt={avatar.alt}
                          className="absolute inset-0 w-full h-full object-cover rounded-full"
                        />
                        {isSelected && (
                          <div className="absolute z-10 -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground shadow-sm">
                            <Check
                              aria-hidden="true"
                              className="h-3 w-3 text-background"
                            />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
                <p className="text-xs text-muted-foreground text-center sm:text-left mt-2">
                  <span className="uppercase tracking-[0.12em] font-medium">
                    {selectedAvatar.alt}
                  </span>{" "}
                  selected
                </p>
              </div>
            </CardContent>
          </Card>
        );
      }}
    />
  );
}
