import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInitials } from "@/hooks/user-initial";
import { User } from "lucide-react";

interface EditProfilePictureProps {
  name: string;
  profileImage?: string;
}

export function EditProfilePicture({
  name,
  profileImage,
}: EditProfilePictureProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <User className="size-5 text-primary" /> Profile Picture
        </CardTitle>
        <CardDescription>This is how you will appear to others.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center gap-8">
        <Avatar className="size-24">
          <AvatarImage src={profileImage ?? ""} />
          <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <Button type="button" variant="outline" size="sm">
              Change Photo
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Remove
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            JPG, GIF or PNG. Max size of 2MB.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
