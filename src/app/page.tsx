import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { getGlobalConfig } from "@/lib/settings";

export default async function Home() {
  const config = await getGlobalConfig();

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      {config.showHero && <HeroSection />}
      <StatsSection />
      <ProgramsSection />
      <EventsSection />
      <TestimonialSection />
      <PartnersSection />
      <NewsletterSection />
    </div>
  );
}
