import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { FadeIn } from '../../components/ui/FadeIn';
import { projects } from '../../config/site';

interface CardProps {
  project: (typeof projects)[number];
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const ProjectCard = ({
  project,
  index,
  totalCards: _totalCards,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="min-h-[620px] flex items-center justify-center sticky top-16 sm:top-20 md:top-24 w-full max-w-6xl mx-auto mb-12 sm:mb-16"
    >
      <motion.div
        style={{
          scale,
          top: `${index * 24}px`,
        }}
        className="relative w-full rounded-[36px] sm:rounded-[48px] md:rounded-[56px] border-2 border-[#D7E2EA]/30 bg-[#121212] p-6 sm:p-8 md:p-10 flex flex-col gap-6 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Glowing Corner Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#7621B0]/20 via-[#B600A8]/10 to-transparent blur-3xl pointer-events-none" />

        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D7E2EA]/15 relative z-10">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span
              className="font-black text-[#D7E2EA] leading-none select-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              0{index + 1}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-light uppercase tracking-widest text-[#D7E2EA]/60">
                {project.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-[#D7E2EA] m-0 tracking-wide">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#D7E2EA]/80">
              {project.period}
            </span>
          </div>
        </div>

        {/* Bottom Row: Content & Mockup Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center relative z-10">
          {/* Left Column (7 cols): Details & Highlights */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <p className="text-sm sm:text-base md:text-lg text-[#D7E2EA]/80 font-light leading-relaxed m-0">
              {project.description}
            </p>

            <div className="flex flex-col gap-2.5 my-2">
              <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/50 font-semibold">
                Key Accomplishments
              </span>
              {project.highlights.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#B600A8] mt-2 shrink-0 shadow-[0_0_8px_#B600A8]" />
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/75 font-normal leading-normal m-0">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white border border-white/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Mobile Device Preview Graphic */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-[220px] sm:w-[260px] md:w-[280px] h-[360px] sm:h-[420px] rounded-[40px] border-4 border-[#2A2A2A] bg-gradient-to-b from-[#1C1C1E] to-[#0A0A0A] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden group">
              {/* Dynamic island / Speaker bar */}
              <div className="w-20 h-4 bg-black rounded-full mx-auto mb-2 border border-white/10" />

              {/* Mockup screen content */}
              <div className="flex-1 rounded-2xl bg-[#141414] border border-white/5 p-4 flex flex-col justify-between overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#B600A8]/10 via-[#7621B0]/10 to-transparent pointer-events-none" />
                
                <div className="relative z-10 flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D7E2EA]">
                    {project.name}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>

                <div className="relative z-10 flex flex-col gap-2 my-auto">
                  <div className="h-16 rounded-xl bg-white/[0.04] border border-white/10 p-2.5 flex flex-col justify-center gap-1">
                    <div className="w-1/2 h-2.5 rounded bg-white/20" />
                    <div className="w-3/4 h-2 rounded bg-white/10" />
                  </div>
                  <div className="h-16 rounded-xl bg-white/[0.04] border border-white/10 p-2.5 flex flex-col justify-center gap-1">
                    <div className="w-2/3 h-2.5 rounded bg-[#B600A8]/40" />
                    <div className="w-1/3 h-2 rounded bg-white/10" />
                  </div>
                </div>

                <div className="relative z-10 flex justify-between items-center pt-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D7E2EA]/50">
                    Flutter Engine
                  </span>
                  <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded bg-white/10">
                    v1.0
                  </span>
                </div>
              </div>

              {/* Bottom home indicator */}
              <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mt-3" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-12 pt-24 sm:pt-32 pb-36 select-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full mb-16 sm:mb-24 text-center">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#D7E2EA]/60 mb-2 block">
            Featured Mobile Works
          </span>
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none text-center m-0"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            Projects
          </h2>
        </FadeIn>

        {/* Sticky Stacking Cards */}
        <div className="flex flex-col w-full relative">
          {projects.map((project, index) => {
            const targetScale = 1 - (projects.length - 1 - index) * 0.03;
            return (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
                totalCards={projects.length}
                progress={scrollYProgress}
                range={[index * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
