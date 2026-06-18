import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getInitials } from "@/hooks/user-initial";
import { SocialDock } from "@/components/web/profile/social-link-dock";
import { dateFormat } from "@/hooks/date-format";
import { CalendarDays } from "lucide-react";
import avatars from "@/data/avatars.json";

interface ProfileUserCardProps {
  name: string;
  username: string;
  description?: string | null;
  email: string;
  githubAccount?: string | null;
  twitterAccount?: string | null;
  instagramAccount?: string | null;
  linkedinAccount?: string | null;
  joinedAt: number;
  avatarId: string | undefined;
}

export function ProfileUserCard({
  name,
  username,
  description,
  email,
  githubAccount,
  twitterAccount,
  instagramAccount,
  linkedinAccount,
  joinedAt,
  avatarId,
}: ProfileUserCardProps) {
  return (
    <aside className="w-full lg:w-80 shrink-0">
      <Card className="border border-border/60 bg-card/50 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 p-0 gap-0">
        <CardHeader className="flex flex-col items-center text-center pt-8 pb-4">
          <Avatar className="size-24 border-4 border-card shadow-md bg-card ring-2 ring-primary/15 transition-transform duration-300 hover:scale-105">
            {avatarId && (
              <AvatarImage
                src={
                  (avatars.find((a) => String(a.id) === avatarId) ?? avatars[0])
                    .src
                }
                alt={`${name}'s avatar`}
              />
            )}
            <AvatarFallback className="text-primary text-3xl font-extrabold dark:bg-primary dark:text-foreground">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>

          <div className="mt-4 flex flex-col items-center gap-1">
            <h1 className="text-2xl font-extrabold tracking-tight bg-linear-to-br from-foreground to-foreground/85 bg-clip-text text-transparent">
              {name}
            </h1>
            <p className="text-sm font-semibold text-primary/80">@{username}</p>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-4 pt-0 text-center flex flex-col gap-4">
          <div className="bg-muted/40 dark:bg-muted/10 border border-border/40 rounded-xl p-3.5 text-center min-h-[72px] flex items-center justify-center">
            {description ? (
              <p className="text-sm text-foreground/85 leading-relaxed font-normal">
                {description}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground/60 italic font-medium">
                No bio yet. Ready to make some ripples!
              </p>
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/90 font-medium">
            <CalendarDays className="size-3.5 text-primary/75" />
            <span>Member since {dateFormat(joinedAt)}</span>
          </div>
        </CardContent>

        <CardFooter className="justify-center pb-6 pt-0 border-t border-border/40 mt-2 px-6">
          <div className="w-full pt-4 flex justify-center">
            <SocialDock
              email={email}
              githubAccount={githubAccount}
              twitterAccount={twitterAccount}
              instagramAccount={instagramAccount}
              linkedinAccount={linkedinAccount}
            />
          </div>
        </CardFooter>
      </Card>
    </aside>
  );
}
