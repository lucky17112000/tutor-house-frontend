import { CarouselSpacing } from "@/components/Home/carousel/carousolSpacing";
import StatsStrip from "@/components/Home/stats/StatsStrip";
import StartText from "@/components/Home/startText/StartText";
import ScrollIndicator from "@/components/Home/ScrollIndicator";
import FAQ from "@/components/Home/sections/FAQ";
import HowItWorks from "@/components/Home/sections/HowItWorks";
import SubjectCategories from "@/components/Home/sections/SubjectCategories";
import ReviewsSlider from "@/components/Home/sections/ReviewsSlider";
import WhyChooseUs from "@/components/Home/sections/WhyChooseUs";
import VideoCallSection from "@/components/Home/sections/VideoCallSection";
import FindTutorSection from "@/components/Home/sections/FindTutorSection";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <ScrollIndicator />
      {/* 1 ── Hero slider: 3 auto-advancing slides + animated stats + marquee */}
      <StartText />

      {/* 2 ── Video call feature: dark section, animated mockup */}
      <VideoCallSection />

      {/* 3 ── Find your tutor hero block + marquee + 3D tilt cards */}
      <FindTutorSection />

      {/* 4 ── Stats strip: black bg, counts animate on scroll */}
      <StatsStrip />

      {/* 5 ── How It Works: 3 numbered steps */}
      <HowItWorks />

      {/* 6 ── Why Choose Us: 6 feature cards */}
      <WhyChooseUs />

      {/* 7 ── Subject categories: explore 40+ subjects */}
      <SubjectCategories />

      {/* 8 ── Featured tutors: continuous right-to-left image carousel */}
      <section className="py-24 px-6 bg-white dark:bg-zinc-950">
        <div className="max-w-295 mx-auto">
          <div className="mb-10">
            <div
              className="inline-flex items-center gap-2.5 text-blue-700 dark:text-blue-400 mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 32,
                  height: 1,
                  background: "currentColor",
                  flexShrink: 0,
                }}
              />
              From the classroom
            </div>
            <h2
              className="font-extrabold text-zinc-900 dark:text-white tracking-[-0.035em]"
              style={{ fontSize: "clamp(30px,3.5vw,48px)", lineHeight: 1.05 }}
            >
              Real sessions,{" "}
              <em
                className="not-italic"
                style={{ fontStyle: "italic", color: "#1d4ed8" }}
              >
                real results
              </em>
            </h2>
          </div>
          <CarouselSpacing />
        </div>
      </section>

      {/* 7 ── Reviews: continuous double-row marquee slider */}
      <ReviewsSlider />

      {/* 9 ── FAQ: common questions accordion */}
      <FAQ />

      {/* Footer is rendered by CommonLayout — not duplicated here */}
    </div>
  );
}
