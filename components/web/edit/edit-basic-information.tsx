import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Mail, User } from "lucide-react";
import { Controller, type Control } from "react-hook-form";
import { type EditProfileFormValues } from "@/hooks/use-edit-profile";

interface EditBasicInformationProps {
  control: Control<EditProfileFormValues>;
  email: string;
}

export function EditBasicInformation({
  control,
  email,
}: EditBasicInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <User className="size-5 text-primary" /> Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Display Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="Your name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Username</FieldLabel>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-muted-foreground text-sm">
                    @
                  </span>
                  <Input
                    {...field}
                    id="username"
                    className="pl-7"
                    placeholder="username"
                    aria-invalid={fieldState.invalid}
                  />
                </div>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Field>
          <FieldLabel className="flex items-center gap-2">
            Email Address{" "}
            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground uppercase font-bold tracking-wider">
              Locked
            </span>
          </FieldLabel>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              id="email"
              defaultValue={email}
              disabled
              className="pl-10 bg-muted/50"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Email cannot be changed as it is linked to your authentication
            provider.
          </p>
        </Field>

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Bio</FieldLabel>
              <Textarea
                {...field}
                id="description"
                placeholder="Tell us a bit about yourself..."
                className="min-h-30 resize-none"
                maxLength={300}
                aria-invalid={fieldState.invalid}
              />
              <div className="flex justify-between items-center">
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                <p
                  className={`text-xs ${
                    field.value!.length === 300
                      ? "text-red-500"
                      : field.value!.length >= 250
                        ? "text-yellow-500"
                        : "text-muted-foreground"
                  } ml-auto`}
                >
                  {field.value?.length ?? 0}/300 max character
                </p>
              </div>
            </Field>
          )}
        />
      </CardContent>
    </Card>
  );
}
