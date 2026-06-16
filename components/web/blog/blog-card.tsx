import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "../../ui/button";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { getInitials } from "@/hooks/user-initial";
import { dateFormat } from "@/hooks/date-format";

interface BlogCardProps {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  imageUrl?: string | null;
  username: string;
  name: string;
  _creationTime?: number;
}

export function BlogCard({
  _id,
  title,
  body,
  tags,
  imageUrl,
  username,
  name,
  _creationTime,
}: BlogCardProps) {
  return (
    <Card className="flex flex-col py-0 justify-between overflow-hidden border border-border bg-card/40 hover:bg-card/80 transition-all hover:scale-[1.01] w-full mx-auto shadow-xs">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl || "/images/no-image-available.jpg"}
            alt={title}
            fill
            className="object-cover brightness-80 dark:brightness-60"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={!!imageUrl} // Skip server-side proxy for external Convex URLs
          />
        </div>
      </CardHeader>

      <CardContent className="pt-3 flex-1 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <CardAction className="flex gap-2 flex-wrap">
            {tags?.slice(0, 3).map((item) => (
              <Badge key={item} variant="secondary" className="w-fit">
                {item}
              </Badge>
            ))}
          </CardAction>
          <CardTitle className="text-lg font-bold tracking-tight line-clamp-2 hover:text-primary transition-colors cursor-pointer">
            <Link href={`/blog/${_id}`}>{title}</Link>
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {body}
          </CardDescription>
        </div>

        {_creationTime && (
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/40">
            <span>{dateFormat(_creationTime)}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pb-6 pt-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <Avatar className="size-8 border border-border">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden max-w-[140px]">
            <span className="text-xs font-semibold text-foreground truncate">
              {name}
            </span>
            <span className="text-[10px] text-muted-foreground truncate">
              @{username}
            </span>
          </div>
        </div>
        <Link
          href={`/blog/${_id}`}
          className={`${buttonVariants({ variant: "secondary", size: "sm" })} text-xs shrink-0`}
        >
          Read Post
        </Link>
      </CardFooter>
    </Card>
  );
}
