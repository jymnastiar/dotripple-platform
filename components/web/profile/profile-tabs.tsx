"use client";

import { buttonVariants } from "@/components/ui/button";
import { TABS } from "@/hooks/use-profile";
import { motion } from "motion/react";
import Link from "next/link";
import { Edit } from "lucide-react";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOwner: boolean;
  username: string;
}

export function ProfileTabs({
  activeTab,
  onTabChange,
  isOwner,
  username,
}: ProfileTabsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
      <div className="p-1.5 flex bg-background/40 rounded-lg sm:rounded-2xl border border-border w-full sm:w-auto overflow-x-auto no-scrollbar">
        <div className="flex w-full justify-between sm:justify-start sm:gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`
                relative flex-1 sm:flex-none px-1.5 sm:px-4 lg:px-8 py-1 sm:py-2.5 text-xs sm:text-sm sm:font-bold transition-all rounded-[8px] sm:rounded-xl whitespace-nowrap
                ${activeTab === tab ? "text-primary-foreground" : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/50"}
              `}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-[8px] sm:rounded-xl"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </div>
      {isOwner && (
        <Link
          className={`${buttonVariants({ variant: "outline", size: "sm" })} w-full sm:w-auto h-11 sm:h-9 sm:ml-auto`}
          href={`/profile/${username}/edit`}
        >
          <Edit className="size-4 mr-2" /> Edit Profile
        </Link>
      )}
    </div>
  );
}
