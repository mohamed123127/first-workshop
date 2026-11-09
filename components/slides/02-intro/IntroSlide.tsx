import { introContent, type IntroContent } from "@/content/intro";
import { SplitSection } from "@/components/common/SplitSection";
import { SectionTitle } from "@/components/common/SectionTitle";
import { BulletList } from "@/components/common/BulletList";
import { SlideHeader } from "@/components/common/SlideHeader";
import { GlassCard } from "./GlassCard";

export interface IntroSlideProps {
  content?: IntroContent;
  className?: string;
}

export function IntroSlide({
  content = introContent,
  className = "",
}: IntroSlideProps) {
  return (
    <section
      aria-label={content.heading}
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden ${className}`}
    >
      {/* Creative ambient background glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-[var(--accent-cyan)]/10 blur-[130px] animate-pulse"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-[var(--action-indigo)]/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] rounded-full bg-[var(--cards-charcoal)]/30 blur-[100px]"
      />

      {/* Slide Heading Header */}
      <SlideHeader
        title={content.heading}
        eyebrow="Workshop Overview"
        slideNumber="Slide 02"
        accent="cyan"
      />

      {/* Two-part split layout with Glass Cards */}
      <div className="relative z-10 flex-1 flex">
        <SplitSection
          leftClassName="bg-transparent"
          rightClassName="bg-[var(--cards-charcoal)]/20 md:border-l md:border-white/5"
          left={
            <div className="w-full max-w-xl mx-auto py-4">
              <GlassCard
                accent="cyan"
                badgeStep="Part 01"
                badge="Foundations & Concepts"
              >
                <SectionTitle as="h2">
                  {content.left.title}
                </SectionTitle>
                <BulletList
                  items={content.left.items}
                  variant="number"
                  accent="cyan"
                />
              </GlassCard>
            </div>
          }
          right={
            <div className="w-full max-w-xl mx-auto py-4">
              <GlassCard
                accent="indigo"
                badgeStep="Part 02"
                badge="Roadmap & Lifecycle"
              >
                <SectionTitle as="h2">
                  {content.right.title}
                </SectionTitle>
                <BulletList
                  items={content.right.items}
                  variant="number"
                  accent="indigo"
                />
              </GlassCard>
            </div>
          }
        />
      </div>
    </section>
  );
}
