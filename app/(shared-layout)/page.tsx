import { Meteors } from "@/components/ui/meteors";

export default function Home() {
  return (
    <>
      <div className="relative flex h-125 w-full flex-col items-center justify-center overflow-hidden">
        <Meteors number={30} />
        <span className="pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-7xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10 sm:text-8xl">
          Next
          <span className="bg-linear-to-b from-primary to-gray-300/80 bg-clip-text dark:from-primary dark:to-slate-900/10 whitespace-pre-wrap text-transparent">
            Pro
          </span>
        </span>
      </div>
    </>
  );
}
