import { FadeIn } from '../../components/ui/FadeIn';
import { AnimatedText } from '../../components/ui/AnimatedText';
import { ContactButton } from '../../components/ui/ContactButton';
import { heroStats, siteConfig, summary } from '../../config/site';

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-12 py-24 sm:py-32 bg-[#0C0C0C] overflow-hidden select-none"
    >
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#7621B0]/10 via-[#B600A8]/10 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* Central Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center m-0"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Spacing between Heading and Animated Text */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Animated Paragraph with Character-by-Character Scroll Reveal */}
        <div className="w-full max-w-[760px] mx-auto px-4">
          <AnimatedText
            text={summary}
            className="text-[#D7E2EA] font-normal text-center leading-relaxed text-base sm:text-lg md:text-xl"
          />
        </div>

        {/* Stats Row */}
        <FadeIn delay={0.2} y={30} className="w-full mt-12 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-[#141414] border border-[#262626] backdrop-blur-md flex flex-col items-center justify-center gap-1 shadow-lg hover:border-[#D7E2EA]/30 transition-colors"
              >
                <span className="text-3xl sm:text-4xl font-black text-[#D7E2EA]">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-light uppercase tracking-wider text-[#D7E2EA]/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Spacing before Actions */}
        <div className="h-12 sm:h-16" />

        {/* Action Buttons */}
        <FadeIn delay={0.3} y={20} className="flex items-center gap-4 flex-wrap justify-center">
          <a
            href={siteConfig.resumeUrl}
            download
            className="inline-flex items-center justify-center rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] font-medium uppercase tracking-wider px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm hover:bg-[#D7E2EA]/10 transition-colors duration-200 no-underline"
          >
            Download CV
          </a>
          <ContactButton href="#contact" label="Let's build together" />
        </FadeIn>
      </div>
    </section>
  );
};
