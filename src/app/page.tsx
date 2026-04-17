import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { getGlobalConfig } from "@/lib/settings";

const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  stats: StatsSection,
  programs: ProgramsSection,
  events: EventsSection,
  testimonials: TestimonialSection,
  partners: PartnersSection,
  newsletter: NewsletterSection,
};

export default async function Home() {
  const config = await getGlobalConfig();
  const sections = config.homepageSections || ['hero', 'stats', 'programs', 'events', 'testimonials', 'partners', 'newsletter'];

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      {sections.map((sectionKey) => {
        const Component = SECTION_COMPONENTS[sectionKey];
        if (!Component) return null;
        
        // Pass config to sections that need it
        if (sectionKey === 'hero' || sectionKey === 'stats') {
          return <Component key={sectionKey} settings={config} />;
        }
        
        // Pass section titles to components
        if (sectionKey === 'programs') {
          return (
            <Component 
              key={sectionKey}
              titleEn={config.programsTitleEn}
              titleUr={config.programsTitleUr}
              subtitleEn={config.programsSubtitleEn}
              subtitleUr={config.programsSubtitleUr}
            />
          );
        }
        
        if (sectionKey === 'events') {
          return (
            <Component 
              key={sectionKey}
              titleEn={config.eventsTitleEn}
              titleUr={config.eventsTitleUr}
              subtitleEn={config.eventsSubtitleEn}
              subtitleUr={config.eventsSubtitleUr}
            />
          );
        }
        
        if (sectionKey === 'testimonials') {
          return (
            <Component 
              key={sectionKey}
              titleEn={config.testimonialsTitleEn}
              titleUr={config.testimonialsTitleUr}
              subtitleEn={config.testimonialsSubtitleEn}
              subtitleUr={config.testimonialsSubtitleUr}
            />
          );
        }
        
        if (sectionKey === 'newsletter') {
          return (
            <Component 
              key={sectionKey}
              titleEn={config.newsletterTitleEn}
              titleUr={config.newsletterTitleUr}
              subtitleEn={config.newsletterSubtitleEn}
              subtitleUr={config.newsletterSubtitleUr}
            />
          );
        }
        
        return <Component key={sectionKey} />;
      })}
    </div>
  );
}
