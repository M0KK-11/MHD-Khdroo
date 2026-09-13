import { FadeIn } from '../../components/ui/FadeIn';
import { coreStack, languages, skills } from '../../config/site';

export const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-20 sm:py-24 md:py-32 z-0 overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#0C0C0C]/60 mb-2 block">
            Expertise & Capabilities
          </span>
          <h2
            className="text-[#0C0C0C] font-black uppercase tracking-tight leading-none m-0"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            Skills
          </h2>
        </FadeIn>

        {/* 1. Core Stack Grid */}
        <div className="mb-16 sm:mb-20">
          <FadeIn delay={0.1} y={20}>
            <h3 className="text-lg sm:text-2xl font-bold uppercase tracking-wider text-[#0C0C0C] mb-8 pb-3 border-b border-[#0C0C0C]/10 flex items-center justify-between">
              <span>Core Stack</span>
              <span className="text-xs font-normal opacity-60">Production Proven</span>
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreStack.map((tech, index) => (
              <FadeIn
                key={tech}
                delay={0.1 + index * 0.08}
                y={30}
                className="group p-6 rounded-3xl bg-[#F5F7FA] border border-[#0C0C0C]/10 hover:border-[#0C0C0C]/40 hover:bg-[#EEF2F6] transition-all duration-300 shadow-sm flex flex-col justify-between h-[180px]"
              >
                <div className="flex justify-between items-start">
                  <span className="text-3xl font-black text-[#0C0C0C]/20 group-hover:text-[#0C0C0C]/40 transition-colors">
                    0{index + 1}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0C0C0C]/40 group-hover:bg-[#0C0C0C] group-hover:scale-125 transition-all" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0C0C0C] m-0">
                    {tech}
                  </h4>
                  <p className="text-xs uppercase tracking-wider text-[#0C0C0C]/60 font-medium mt-1 m-0">
                    Primary Engine
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* 2. Technical Skills & Architecture */}
        <div className="mb-16 sm:mb-20">
          <FadeIn delay={0.2} y={20}>
            <h3 className="text-lg sm:text-2xl font-bold uppercase tracking-wider text-[#0C0C0C] mb-8 pb-3 border-b border-[#0C0C0C]/10 flex items-center justify-between">
              <span>Technical & Architecture</span>
              <span className="text-xs font-normal opacity-60">Full-Lifecycle Expertise</span>
            </h3>
          </FadeIn>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {skills.technical.map((item, index) => (
              <FadeIn key={item} delay={0.05 + index * 0.03} y={20}>
                <div className="px-5 py-3 rounded-full bg-[#0C0C0C]/5 border border-[#0C0C0C]/15 hover:bg-[#0C0C0C] hover:text-white transition-all duration-300 cursor-default">
                  <span className="text-sm sm:text-base font-semibold uppercase tracking-wider">
                    {item}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* 3. Soft Skills & Languages Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Soft Skills */}
          <div>
            <FadeIn delay={0.25} y={20}>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#0C0C0C] mb-6 pb-2 border-b border-[#0C0C0C]/10">
                Professional Strengths
              </h3>
            </FadeIn>
            <div className="flex flex-col gap-3">
              {skills.soft.map((softSkill, index) => (
                <FadeIn key={softSkill} delay={0.1 + index * 0.05} y={15}>
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F8F9FA] border border-[#0C0C0C]/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0C0C0C]" />
                    <span className="text-sm sm:text-base font-medium text-[#0C0C0C]">
                      {softSkill}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <FadeIn delay={0.3} y={20}>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#0C0C0C] mb-6 pb-2 border-b border-[#0C0C0C]/10">
                Languages
              </h3>
            </FadeIn>
            <div className="flex flex-col gap-4">
              {languages.map((lang, index) => (
                <FadeIn key={lang.name} delay={0.15 + index * 0.08} y={15}>
                  <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-[#0C0C0C]/10 flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-bold uppercase tracking-wide text-[#0C0C0C] m-0">
                        {lang.name}
                      </h4>
                      <span className="text-xs uppercase tracking-wider text-[#0C0C0C]/60 font-medium">
                        Proficiency
                      </span>
                    </div>
                    <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#0C0C0C] text-white">
                      {lang.level}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
