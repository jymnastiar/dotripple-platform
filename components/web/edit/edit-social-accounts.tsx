import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { LinkedinLogoIcon } from "@phosphor-icons/react";
import { Controller, type Control } from "react-hook-form";
import { type EditProfileFormValues } from "@/hooks/use-edit-profile";
import socialAccounts from "@/data/social-accounts";

interface EditSocialAccountsProps {
  control: Control<EditProfileFormValues>;
}

export function EditSocialAccounts({ control }: EditSocialAccountsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <LinkedinLogoIcon className="size-5 text-primary" /> Social Accounts
        </CardTitle>
        <CardDescription>
          Connect your profiles to help people find you elsewhere.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2">
        {socialAccounts.map((social) => (
          <Controller
            key={social.name}
            name={social.name}
            control={control}
            render={({ field, fieldState }) => {
              const { onChange, ...rest } = field;
              return (
                <Field>
                  <FieldLabel className="flex items-center gap-2">
                    <social.icon className="size-4" /> {social.label}
                  </FieldLabel>
                  <Input
                    {...rest}
                    id={social.name}
                    placeholder="@username"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => {
                      const cleaned = e.target.value
                        .toLowerCase()
                        .replace(/\s/g, "");
                      onChange(cleaned);
                    }}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        ))}
      </CardContent>
    </Card>
  );
}
