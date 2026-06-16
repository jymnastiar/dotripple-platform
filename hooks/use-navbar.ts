import { useConvexAuth, useQuery } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/convex/_generated/api";

export function UseNavbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const [menuState, setMenuState] = useState(false);
  const getUserData = useQuery(api.users.getCurrentUserWithProfile);
  const userName = getUserData?.name;
  const userEmail = getUserData?.email;
  const user = getUserData?.username;
  const avatarId = getUserData?.avatarId;

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
    getUserData,
    avatarId,
  };
}
