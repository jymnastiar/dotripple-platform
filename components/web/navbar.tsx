"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth, useQueries, useQuery } from "convex/react";
import { Spinner } from "../ui/spinner";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { api } from "@/convex/_generated/api";
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
} from "../ui/alert-dialog";
import { LogOut, Menu, Trash2Icon, X } from "lucide-react";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { getInitials } from "@/hooks/user-initial";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const [menuState, setMenuState] = useState(false);
  const getUser = useQuery(api.auth.getCurrentUser);
  const userName = getUser?.name;
  const userEmail = getUser?.email;
  const user = getUser?.username;

  const handleLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully", {
            position: "top-center",
          });
          router.push("/");
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold">
              Next<span className="text-primary">Pro</span>
            </h1>
          </Link>
          {/* <Button onClick={handleLogout}>debug</Button> */}
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden md:flex flex-1 items-center justify-between ml-8">
          <div className="flex items-center gap-2">
            <Link className={buttonVariants({ variant: "ghost" })} href="/">
              Home
            </Link>
            <Link className={buttonVariants({ variant: "ghost" })} href="/blog">
              Blog
            </Link>
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href="/create"
            >
              Create
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <AnimatedThemeToggler />
            {isLoading || getUser === undefined ? (
              <Button disabled>
                <Spinner data-icon="inline-start" />
                Loading...
              </Button>
            ) : isAuthenticated || getUser !== null ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarFallback className="text-primary font-semibold dark:bg-primary dark:text-foreground">
                        {getInitials(userName!)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32">
                  <DropdownMenuGroup>
                    <Link href={`/profile/${user}`}>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
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
                              Next<span className="text-primary">Pro</span>
                            </span>
                            . You will need to enter your credentials to access
                            your dashboard again
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
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/sign-up" className={buttonVariants()}>
                  Sign Up
                </Link>
                <Link
                  href="/auth/login"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* --- TOGGLE LAYOUT --- */}
        <div className="md:hidden flex items-center gap-4">
          <AnimatedThemeToggler />
          <button
            aria-label="toggle-button"
            className="outline-none text-foreground"
            onClick={() => setMenuState(!menuState)}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Menu
                className={`absolute transition-all duration-300 ease-in-out ${
                  menuState
                    ? "rotate-180 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <X
                className={`absolute transition-all duration-300 ease-in-out ${
                  menuState
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-180 scale-0 opacity-0"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU LIST --- */}
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
              href="/Create"
              onClick={() => setMenuState(false)}
            >
              Create
            </Link>
          </li>

          {/* Auth Section for Mobile */}
          <li className="pt-4 mt-2 border-t border-border">
            {isLoading || getUser === undefined ? (
              <Button disabled className="w-full">
                <Spinner data-icon="inline-start" />
                Loading...
              </Button>
            ) : isAuthenticated || getUser !== null ? (
              <div className="flex flex-col gap-2">
                {/* Profile Identity */}
                <div className="flex items-center gap-3 px-4 mb-2">
                  <Avatar>
                    <AvatarFallback className="text-primary font-semibold dark:bg-primary dark:text-foreground">
                      {getInitials(userName!)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium overflow-hidden">
                    {userEmail}
                  </span>
                </div>

                <Link
                  href="/profile"
                  className={buttonVariants({
                    variant: "ghost",
                    className: "justify-start",
                  })}
                  onClick={() => setMenuState(false)}
                >
                  Profile
                </Link>
                <Button
                  onClick={handleLogout}
                  variant={"destructive"}
                  className="justify-baseline"
                >
                  Log out
                </Button>
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
    </nav>
  );
}
