"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  Award,
  Target,
  Heart,
  Sparkles,
  GraduationCap,
  Globe,
} from "lucide-react";

const stats = [
  { label: "Expert Tutors", value: "500+", icon: GraduationCap },
  { label: "Happy Students", value: "15K+", icon: Users },
  { label: "Courses Offered", value: "200+", icon: BookOpen },
  { label: "Countries Reached", value: "50+", icon: Globe },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make quality education accessible to every student, everywhere. We connect passionate tutors with eager learners to create transformative learning experiences.",
    gradient: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30",
  },
  {
    icon: Heart,
    title: "Our Passion",
    description:
      "We believe in the power of personalized learning. Every student is unique, and our platform ensures they get the attention and guidance they deserve.",
    gradient: "from-pink-500 to-rose-600",
    bg: "from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30",
  },
  {
    icon: Award,
    title: "Our Promise",
    description:
      "Excellence is not just a goal — it's our standard. We carefully vet every tutor to ensure our students receive nothing but the best education.",
    gradient: "from-amber-500 to-orange-600",
    bg: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
  },
  {
    icon: Sparkles,
    title: "Our Vision",
    description:
      "A world where learning knows no boundaries. We're building the future of education — one lesson, one student, one breakthrough at a time.",
    gradient: "from-blue-500 to-cyan-600",
    bg: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
  },
];

const team = [
  {
    name: "Alamin",
    role: "Co-Founder & Product",
    bio: "Builds the product vision and ensures every feature feels delightful for learners.",
    image: "/images/pexels-thisisengineering-3862130.jpg",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Oishee",
    role: "Co-Founder & Design",
    bio: "Leads brand and experience design to keep learning simple, warm, and human.",
    image: "/images/pexels-karola-g2-5775.jpg",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "Rabby",
    role: "Co-Founder & Engineering",
    bio: "Architects the platform to be fast, reliable, and ready for global scale.",
    image: "/images/pexels-pixabay-256417.jpg",
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "Emon",
    role: "Co-Founder & Growth",
    bio: "Connects students and tutors through partnerships and community outreach.",
    image: "/images/pexels-jeshoots-com-147458-714699.jpg",
    color: "from-amber-500 to-orange-600",
  },
];

const heroSlides = [
  {
    title: "Personalized learning paths",
    body: "We match students with tutors using goals, learning style, and availability to deliver the right fit from day one.",
    icon: GraduationCap,
  },
  {
    title: "Verified tutor quality",
    body: "Every tutor is reviewed for expertise, teaching style, and consistency to keep sessions effective and reliable.",
    icon: Award,
  },
  {
    title: "Progress you can measure",
    body: "Built-in feedback loops help students track improvement and keep momentum week after week.",
    icon: Target,
  },
];

const AboutUsPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const goPrev = () =>
    setActiveSlide((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1,
    );
  const goNext = () =>
    setActiveSlide((current) => (current + 1) % heroSlides.length);

  const ActiveIcon = heroSlides[activeSlide].icon;

  return (
    <div className="relative overflow-hidden bg-white dark:bg-zinc-950">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-white dark:bg-zinc-950 py-20 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,78,216,0.06)_0%,rgba(0,0,0,0)_45%)]" />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                About Tutor House
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white">
              Empowering Minds,
              <br />
              <span className="text-blue-700 dark:text-blue-400">
                Shaping Futures
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              We&apos;re on a mission to make tutoring feel personal,
              consistent, and measurable. Every lesson is designed to build
              confidence, clarity, and momentum.
            </p>

            <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="h-1 w-10 bg-blue-700" />
              Built by educators and engineers who care about outcomes.
            </div>
          </div>

          {/* Slider */}
          <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/70 backdrop-blur-md shadow-xl">
            <div className="p-6 md:p-7 space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-blue-700 text-white grid place-items-center">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="h-9 w-9 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="Previous slide"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="h-9 w-9 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="Next slide"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
                  {heroSlides[activeSlide].title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {heroSlides[activeSlide].body}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeSlide
                        ? "w-8 bg-blue-700"
                        : "w-2.5 bg-zinc-300 dark:bg-zinc-700"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="relative py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/60 dark:hover:shadow-blue-900/20 hover:-translate-y-1 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-700 text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-700/25">
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR STORY SECTION ===== */}
      <section className="py-20 bg-white dark:bg-zinc-950 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Side */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40">
                <BookOpen className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                  Our Story
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
                It started with a{" "}
                <span className="text-blue-700 dark:text-blue-400">
                  simple idea
                </span>
              </h2>

              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  Back in 2020, we noticed something broken in education —
                  brilliant students struggling to find the right guidance, and
                  talented tutors unable to reach those who needed them most.
                </p>
                <p>
                  So we built Tutor House — a platform that bridges this gap. We
                  started with just 10 tutors and a dream. Today, we&apos;re a
                  thriving community of educators and learners spanning over 50
                  countries.
                </p>
                <p>
                  Every connection made on our platform is a step toward a world
                  where quality education isn&apos;t a privilege — it&apos;s a
                  right.
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 space-y-6 shadow-xl">
              {[
                {
                  title: "Learner-first onboarding",
                  body: "We start by understanding goals, then match students to tutors who teach the way they learn best.",
                },
                {
                  title: "Session quality standards",
                  body: "Every class follows clear outcomes with actionable feedback so learners always know their next step.",
                },
                {
                  title: "Support that stays close",
                  body: "Parents and students get updates, reminders, and progress summaries without extra work.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-700 mt-2" />
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUES SECTION ===== */}
      <section className="py-20 bg-white dark:bg-zinc-950 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40">
              <Heart className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                What Drives Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
              Our Core{" "}
              <span className="text-blue-700 dark:text-blue-400">Values</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
              These principles guide everything we do — from building features
              to connecting tutors with students.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((item) => (
              <div
                key={item.title}
                className="group relative p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative z-10 flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section className="py-20 bg-white dark:bg-zinc-950 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40">
              <Users className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                Meet The Team
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
              The People Behind{" "}
              <span className="text-blue-700 dark:text-blue-400">
                Tutor House
              </span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
              A dedicated team of educators, designers, and engineers building
              the future of learning.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/60 dark:hover:shadow-blue-900/20 hover:-translate-y-2 text-center"
              >
                {/* Photo */}
                <div className="relative w-full h-44">
                  <Image
                    src={member.image}
                    alt={`${member.name} portrait`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 320px"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 mt-1">
                    {member.role}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-blue-700 p-10 md:p-12 text-center text-white overflow-hidden shadow-2xl shadow-blue-700/30">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0))]" />

            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                Ready to Start Your
                <br />
                Learning Journey?
              </h2>
              <p className="text-blue-100 text-lg max-w-xl mx-auto">
                Join thousands of students who are already achieving their goals
                with Tutor House. Your perfect tutor is just a click away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <GraduationCap className="w-5 h-5" />
                  Get Started Free
                </a>
                <a
                  href="/tutor"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 backdrop-blur transition-all duration-200 border border-white/20"
                >
                  Browse Tutors
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
