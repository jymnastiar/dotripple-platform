import { useConvexAuth, useQuery } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import React from "react";

export function UseNavbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const [menuState, setMenuState] = useState(false);
  const getUser = useQuery(api.auth.getCurrentUser);
  const userName = getUser?.name;
  const userEmail = getUser?.email;
  const user = getUser?.username;
  const [open, setOpen] = React.useState(false);
  const recentPost = useQuery(api.posts.getRecentPosts);

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

  return {
    isAuthenticated,
    isLoading,
    menuState,
    setMenuState,
    userName,
    userEmail,
    user,
    handleLogout,
    getUser,
    open,
    setOpen,
    recentPost,
  };
}
