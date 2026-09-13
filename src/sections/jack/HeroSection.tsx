import { FadeIn } from '../../components/ui/FadeIn';
import { Magnet } from '../../components/ui/Magnet';
import { ContactButton } from '../../components/ui/ContactButton';
import { siteConfig } from '../../config/site';

export const HeroSection = () => {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none"
    >
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="w-full z-20 px-6 md:px-10 pt-6 md:pt-8">
        <ul className="flex items-center justify-between w-full list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-base md:text-lg lg:text-[1.3rem] hover:opacity-70 transition-opacity duration-200 no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden flex items-center justify-center pointer-events-none z-0">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16.5vw] mt-6 sm:mt-4 md:-mt-5">
            MHD KHAIR
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero 3D Portrait (Absolute Center) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto flex justify-center">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Mhd Khair - 3D Portrait"
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-none select-none"
              draggable={false}
              loading="eager"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom Bar */}
      <div className="relative z-20 flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 w-full">
        <FadeIn delay={0.35} y={20} className="flex-1">
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[280px] m-0"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a flutter developer driven by crafting striking and unforgettable mobile applications
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="flex items-center gap-3">
          <a
            href={siteConfig.resumeUrl}
            download
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] font-medium uppercase tracking-wider px-6 py-3 text-xs sm:text-sm hover:bg-[#D7E2EA]/10 transition-colors duration-200 no-underline"
          >
            Download CV
          </a>
          <ContactButton href="#contact" label="Contact Me" />
        </FadeIn>
      </div>
    </section>
  );
};
