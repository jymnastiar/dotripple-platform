import { Marquee } from "@/components/ui/marquee";
import { Layers } from "lucide-react";
import { features } from "@/data/features";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

function FeatureCard({ title, description, icon, color }: FeatureCardProps) {
  return (
    <div className="flex w-80 items-start gap-4 p-6 rounded-2xl border border-border bg-card/50 hover:bg-card/80 transition-all hover:scale-[1.02]">
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      <div>
        <h3 className="font-semibold text-base text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}

export default function MarqueeFeature() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <div className="flex z-10 items-center gap-2 mr-auto">
        <Layers className="size-5 text-primary" />
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Features
        </h2>
      </div>
      <div>
        <Marquee pauseOnHover className="[--duration:40s]">
          {features.map((review, idx) => (
            <FeatureCard
              key={`${review.title}-${idx}`}
              title={review.title}
              description={review.description}
              icon={review.icon}
              color={review.color}
            />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
      </div>
    </section>
  );
}
