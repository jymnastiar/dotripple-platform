import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
}: ProfileUserCardProps) {
  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-6">
      <Card className="border-none overflow-hidden">
        <CardHeader className="flex flex-col items-center text-center pt-8">
          <Avatar className="size-20 lg:size-16">
            <AvatarFallback className="text-primary text-3xl lg:text-2xl font-semibold dark:bg-primary dark:text-foreground">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="mt-6 flex flex-col items-center gap-1">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              {name}
            </h1>
            <p className="text-muted-foreground font-medium">@{username}</p>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-2 text-center">
          {description ? (
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              {description}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground/50 italic">
              No bio yet.
            </p>
          )}
          <div className="inline-flex items-center justify-center gap-1.5 mt-6 px-3 py-1.5 bg-secondary/40 text-secondary-foreground rounded-full text-xs font-medium border border-border/50 shadow-sm hover:bg-secondary/60 transition-colors">
            <CalendarDays className="size-3.5 opacity-70" />
            <span>Joined {dateFormat(joinedAt)}</span>
          </div>
        </CardContent>
        <CardFooter className="justify-center pb-6">
          <SocialDock
            email={email}
            githubAccount={githubAccount}
            twitterAccount={twitterAccount}
            instagramAccount={instagramAccount}
            linkedinAccount={linkedinAccount}
          />
        </CardFooter>
      </Card>
    </aside>
  );
}
