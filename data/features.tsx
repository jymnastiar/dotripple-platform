import { BookOpen, Moon, PenTool, Users, Zap } from "lucide-react";

export const features = [
  {
    title: "Sleek Editor",
    description: "Compose beautifully using Markdown with preview panels.",
    icon: <PenTool className="size-6" />,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Interactive Communities",
    description: "Engage with tag sub-communities and comment on posts.",
    icon: <Users className="size-6" />,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Instant Ripples",
    description: "Real-time updates powered by Convex backend reactivity.",
    icon: <Zap className="size-6" />,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Optimized Reading",
    description: "Clean layouts designed for long-form visual reading comfort.",
    icon: <BookOpen className="size-6" />,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    title: "Dark Mode Support",
    description: "Seamlessly toggle between light and dark themes for comfortable reading.",
    icon: <Moon className="size-6" />,
    color: "bg-rose-500/10 text-rose-500",
  },
];
