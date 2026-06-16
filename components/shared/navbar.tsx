"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { Spinner } from "../ui/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { getInitials } from "@/hooks/user-initial";
import { UseNavbar } from "@/hooks/use-navbar";
import { MobileNavbar } from "./mobile-navbar";
import avatars from "@/data/avatars.json";

export function Navbar() {
  const {
    isAuthenticated,
    isLoading,
    menuState,
    setMenuState,
    userName,
    userEmail,
    user,
    handleLogout,
    getUserData,
    avatarId,
  } = UseNavbar();

  return (
    <nav className="sticky top-0 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/dot-ripple-logo.png"
              alt="DotRipple Logo"
              width={1000}
              height={1000}
              className="w-40 h-auto object-contain"
            />
          </Link>
        </div>

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

          <div className="flex w-full justify-end items-center gap-4">
            <AnimatedThemeToggler />
            {isLoading ? (
              <Button disabled>
                <Spinner data-icon="inline-start" />
                Loading...
              </Button>
            ) : isAuthenticated || getUserData !== null ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      {avatarId && (
                        <AvatarImage
                          src={
                            (avatars.find((a) => String(a.id) === avatarId) ?? avatars[0])
                              .src
                          }
                          alt="User avatar"
                        />
                      )}
                      <AvatarFallback className="text-primary font-semibold dark:bg-primary dark:text-foreground">
                        {getInitials(userName!)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit">
                  <DropdownMenuGroup>
                    <Link href={`/profile/${user}`}>
                      <DropdownMenuItem>
                        <UserRound />
                        {user}
                      </DropdownMenuItem>
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
                              Dot<span className="text-primary">Ripple</span>
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

      <MobileNavbar
        menuState={menuState}
        setMenuState={setMenuState}
        isLoading={isLoading}
        isAuthenticated={isAuthenticated}
        getUser={getUserData}
        userName={userName}
        userEmail={userEmail}
        handleLogout={handleLogout}
      />
    </nav>
  );
}
