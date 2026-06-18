"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/hooks/user-initial";
import { LogOut } from "lucide-react";
import avatars from "@/data/avatars.json";

interface MobileNavbarProps {
  menuState: boolean;
  setMenuState: (state: boolean) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  getUser: { name?: string; email?: string } | null | undefined;
  userName: string | undefined;
  userEmail: string | undefined;
  handleLogout: () => void;
  user: string | undefined;
  avatarId: string | undefined;
}

export function MobileNavbar({
  menuState,
  setMenuState,
  isLoading,
  isAuthenticated,
  getUser,
  userName,
  userEmail,
  handleLogout,
  user,
  avatarId,
}: MobileNavbarProps) {
  return (
    <div
      className={`md:hidden absolute top-full left-0 w-full border-b border-border bg-background shadow-md transition-all duration-300 ease-in-out ${
        menuState
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none invisible"
      }`}
    >
      <ul className="flex flex-col p-4 space-y-2">
        <li>
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: "justify-start w-full",
            })}
            href="/"
            onClick={() => setMenuState(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: "justify-start w-full",
            })}
            href="/blog"
            onClick={() => setMenuState(false)}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: "justify-start w-full",
            })}
            href="/create"
            onClick={() => setMenuState(false)}
          >
            Create
          </Link>
        </li>

        <li className="pt-4 mt-2 border-t border-border">
          {isLoading ? (
            <Button disabled className="w-full">
              <Spinner data-icon="inline-start" />
              Loading...
            </Button>
          ) : isAuthenticated || getUser !== null ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 px-4 mb-2">
                <Avatar>
                  {avatarId && (
                    <AvatarImage
                      src={
                        (
                          avatars.find((a) => String(a.id) === avatarId) ??
                          avatars[0]
                        ).src
                      }
                      alt="User avatar"
                    />
                  )}
                  <AvatarFallback className="text-primary font-semibold dark:bg-primary dark:text-foreground">
                    {getInitials(userName!)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium overflow-hidden">{userEmail}</span>
              </div>

              <Link
                href={`/profile/${user}`}
                className={buttonVariants({
                  variant: "ghost",
                  className: "justify-start",
                })}
                onClick={() => setMenuState(false)}
              >
                Profile
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                  >
                    Log out
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogMedia className="text-destructive dark:text-destructive">
                      <LogOut />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Log out</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be securely signed out of{" "}
                      <span className="font-extrabold text-foreground">
                        Dot<span className="text-primary">Ripple</span>
                      </span>
                      . You will need to enter your credentials to access your
                      dashboard again
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      variant="destructive"
                    >
                      Sign out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/auth/sign-up"
                className={buttonVariants({ className: "w-full" })}
              >
                Sign Up
              </Link>
              <Link
                href="/auth/login"
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full",
                })}
              >
                Login
              </Link>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}
