import { FadeIn } from '../../components/ui/FadeIn';
import { education, experience } from '../../config/site';

export const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-20 sm:py-24 md:py-32 z-0 overflow-hidden select-none -mt-10 sm:-mt-12 md:-mt-14"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-24">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#0C0C0C]/60 mb-2 block">
            Career Journey & Studies
          </span>
          <h2
            className="text-[#0C0C0C] font-black uppercase tracking-tight leading-none m-0"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            Experience
          </h2>
        </FadeIn>

        {/* Timeline Content */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {/* Professional Agency Experience */}
          <div className="flex flex-col gap-6">
            <FadeIn delay={0.1} y={20}>
              <div className="flex items-center justify-between pb-3 border-b border-[#0C0C0C]/15">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-[#0C0C0C] m-0">
                  Work Experience
                </h3>
                <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#0C0C0C] text-white">
                  Agency
                </span>
              </div>
            </FadeIn>

            {experience.map((exp, index) => (
              <FadeIn
                key={exp.company}
                delay={0.15 + index * 0.1}
                y={30}
                className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#F5F7FA] border border-[#0C0C0C]/10 shadow-sm hover:border-[#0C0C0C]/30 transition-all duration-300 flex flex-col gap-6"
              >
                {/* Role Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4 pb-4 border-b border-[#0C0C0C]/10">
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0C0C0C] m-0">
                      {exp.role}
                    </h4>
                    <p className="text-sm sm:text-base font-semibold text-[#0C0C0C]/70 m-0 mt-1">
                      {exp.company} — <span className="font-normal">{exp.location}</span>
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-full bg-white border border-[#0C0C0C]/15 text-[#0C0C0C] self-start sm:self-auto shadow-sm">
                    {exp.period}
                  </span>
                </div>

                {/* Highlights */}
                <div className="flex flex-col gap-3">
                  {exp.highlights.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#0C0C0C] mt-2 shrink-0" />
                      <p className="text-sm sm:text-base text-[#0C0C0C]/80 font-normal leading-relaxed m-0">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Education */}
          <div className="flex flex-col gap-6">
            <FadeIn delay={0.2} y={20}>
              <div className="flex items-center justify-between pb-3 border-b border-[#0C0C0C]/15">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-[#0C0C0C] m-0">
                  Education
                </h3>
                <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#0C0C0C] text-white">
                  University
                </span>
              </div>
            </FadeIn>

            {education.map((edu, index) => (
              <FadeIn
                key={edu.degree}
                delay={0.25 + index * 0.1}
                y={30}
                className="p-6 sm:p-8 rounded-3xl bg-[#F5F7FA] border border-[#0C0C0C]/10 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4"
              >
                <div>
                  <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0C0C0C] m-0">
                    {edu.degree}
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-[#0C0C0C]/70 m-0 mt-1">
                    {edu.school}
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full bg-white border border-[#0C0C0C]/15 text-[#0C0C0C] self-start sm:self-auto shadow-sm">
                  Graduated Engineer
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
