"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

export default function Home() {
  const tasks = useQuery(api.tasks.get);

  // useEffect(() => {
  //   console.log(tasks);
  // }, [tasks]);

  return (
    <main className="flex min-h-md gap-4 flex-col items-center justify-between">
      {tasks?.map(({ _id, text }) => (
        <div key={_id}>{text}</div>
      ))}
    </main>
  );
}
