import { useEffect, useRef, useState } from 'react';

const TECH_BADGES_ROW1 = [
  { title: 'Flutter Dev', subtitle: 'Cross-Platform Engine', tag: 'Core', bg: 'from-blue-600/20 to-cyan-500/10' },
  { title: 'BLoC / Cubit', subtitle: 'Predictable State', tag: 'Architecture', bg: 'from-purple-600/20 to-pink-500/10' },
  { title: 'Riverpod', subtitle: 'Reactive & Compile-Safe', tag: 'State', bg: 'from-indigo-600/20 to-blue-500/10' },
  { title: 'Socket.io', subtitle: 'Real-time WebSockets', tag: 'Network', bg: 'from-emerald-600/20 to-teal-500/10' },
  { title: 'Clean Architecture', subtitle: 'Layered & Testable', tag: 'Structure', bg: 'from-amber-600/20 to-orange-500/10' },
  { title: 'Firebase Suite', subtitle: 'Auth, Firestore, Cloud', tag: 'Backend', bg: 'from-yellow-600/20 to-amber-500/10' },
];

const TECH_BADGES_ROW2 = [
  { title: 'Supabase', subtitle: 'PostgreSQL & Realtime', tag: 'Database', bg: 'from-emerald-600/20 to-green-500/10' },
  { title: 'RESTful APIs', subtitle: 'Optimized Data Pipelines', tag: 'Network', bg: 'from-cyan-600/20 to-blue-500/10' },
  { title: 'Stripe Payments', subtitle: 'Secure Checkout Flows', tag: 'Integration', bg: 'from-violet-600/20 to-purple-500/10' },
  { title: 'Dart Language', subtitle: 'Strong Typing & Async', tag: 'Language', bg: 'from-sky-600/20 to-blue-500/10' },
  { title: 'RTL & Localization', subtitle: 'English & Arabic Support', tag: 'i18n', bg: 'from-rose-600/20 to-pink-500/10' },
  { title: 'Git & CI/CD', subtitle: 'Version Control & Deploy', tag: 'DevOps', bg: 'from-red-600/20 to-orange-500/10' },
];

const ROW1_TRIPLED = [...TECH_BADGES_ROW1, ...TECH_BADGES_ROW1, ...TECH_BADGES_ROW1, ...TECH_BADGES_ROW1];
const ROW2_TRIPLED = [...TECH_BADGES_ROW2, ...TECH_BADGES_ROW2, ...TECH_BADGES_ROW2, ...TECH_BADGES_ROW2];

export const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.25;
      setOffset(calculatedOffset);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const row1Transform = `translateX(${offset - 200}px)`;
  const row2Transform = `translateX(${-(offset - 200)}px)`;

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="relative w-full bg-[#0C0C0C] pt-16 sm:pt-24 pb-12 overflow-hidden select-none"
    >
      <div className="flex flex-col gap-4 w-full">
        {/* Row 1: moves RIGHT on scroll */}
        <div
          className="flex gap-4 w-max"
          style={{
            transform: row1Transform,
            willChange: 'transform',
            transition: 'transform 0.1s linear',
          }}
        >
          {ROW1_TRIPLED.map((item, index) => (
            <div
              key={`row1-${index}`}
              className={`w-[320px] sm:w-[360px] h-[130px] rounded-2xl p-5 bg-gradient-to-br ${item.bg} bg-[#161616] border border-[#2d2d2d] shadow-lg flex flex-col justify-between transition-all duration-300 hover:border-[#D7E2EA]/40 hover:-translate-y-1`}
            >
              <div className="flex justify-between items-start">
                <span className="text-lg sm:text-xl font-bold uppercase tracking-wide text-[#D7E2EA]">
                  {item.title}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/10 text-white/80 border border-white/10">
                  {item.tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light m-0">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Row 2: moves LEFT on scroll */}
        <div
          className="flex gap-4 w-max"
          style={{
            transform: row2Transform,
            willChange: 'transform',
            transition: 'transform 0.1s linear',
          }}
        >
          {ROW2_TRIPLED.map((item, index) => (
            <div
              key={`row2-${index}`}
              className={`w-[320px] sm:w-[360px] h-[130px] rounded-2xl p-5 bg-gradient-to-br ${item.bg} bg-[#161616] border border-[#2d2d2d] shadow-lg flex flex-col justify-between transition-all duration-300 hover:border-[#D7E2EA]/40 hover:-translate-y-1`}
            >
              <div className="flex justify-between items-start">
                <span className="text-lg sm:text-xl font-bold uppercase tracking-wide text-[#D7E2EA]">
                  {item.title}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/10 text-white/80 border border-white/10">
                  {item.tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light m-0">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
