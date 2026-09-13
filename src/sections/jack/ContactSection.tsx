import { useState, type FormEvent } from 'react';
import { FadeIn } from '../../components/ui/FadeIn';
import { siteConfig } from '../../config/site';

export const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-12 pt-24 sm:pt-32 pb-24 select-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#D7E2EA]/60 mb-2 block">
            Start a Conversation
          </span>
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none text-center m-0"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            Contact
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12">
          {/* Left Column: Direct Info & Socials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <FadeIn delay={0.1} y={20}>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#D7E2EA] mb-4">
                Let&apos;s Build Together
              </h3>
              <p className="text-sm sm:text-base text-[#D7E2EA]/70 font-light leading-relaxed m-0">
                Interested in working together on a mobile application, contract role, or architectural consulting? Feel free to reach out directly.
              </p>
            </FadeIn>

            {/* Direct Details Cards */}
            <div className="flex flex-col gap-4">
              <FadeIn delay={0.15} y={15}>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="p-5 rounded-2xl bg-[#161616] border border-[#2A2A2A] hover:border-[#D7E2EA]/40 transition-all duration-300 flex items-center gap-4 no-underline group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                    ✉️
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/50 block font-medium">
                      Email
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#D7E2EA] group-hover:text-white">
                      {siteConfig.email}
                    </span>
                  </div>
                </a>
              </FadeIn>

              <FadeIn delay={0.2} y={15}>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="p-5 rounded-2xl bg-[#161616] border border-[#2A2A2A] hover:border-[#D7E2EA]/40 transition-all duration-300 flex items-center gap-4 no-underline group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                    📞
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/50 block font-medium">
                      Phone / WhatsApp
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#D7E2EA] group-hover:text-white">
                      {siteConfig.phone}
                    </span>
                  </div>
                </a>
              </FadeIn>

              <FadeIn delay={0.25} y={15}>
                <div className="p-5 rounded-2xl bg-[#161616] border border-[#2A2A2A] flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg">
                    📍
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/50 block font-medium">
                      Location
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#D7E2EA]">
                      {siteConfig.location}
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Socials & CV Download */}
            <FadeIn delay={0.3} y={15} className="flex flex-col gap-4 pt-2">
              <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/50 font-semibold">
                Social Networks
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#181818] border border-[#2A2A2A] text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D7E2EA] hover:border-white hover:text-white transition-all no-underline"
                >
                  GitHub
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#181818] border border-[#2A2A2A] text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D7E2EA] hover:border-white hover:text-white transition-all no-underline"
                >
                  LinkedIn
                </a>
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#181818] border border-[#2A2A2A] text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D7E2EA] hover:border-white hover:text-white transition-all no-underline"
                >
                  X (Twitter)
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <FadeIn
              delay={0.2}
              y={30}
              className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl relative overflow-hidden"
            >
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#D7E2EA] mb-6">
                Send a Message
              </h3>

              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                  <span className="text-4xl">✨</span>
                  <h4 className="text-xl font-bold text-white uppercase tracking-wide">
                    Message Sent Successfully
                  </h4>
                  <p className="text-sm text-[#D7E2EA]/70">
                    Thank you! I will review your message and reply promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-wider text-[#D7E2EA]/70 font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-[#1C1C1E] border border-[#2E2E32] text-white text-sm focus:outline-none focus:border-[#D7E2EA] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-wider text-[#D7E2EA]/70 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#1C1C1E] border border-[#2E2E32] text-white text-sm focus:outline-none focus:border-[#D7E2EA] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#D7E2EA]/70 font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Inquiry / Flutter Role"
                      className="w-full px-4 py-3 rounded-xl bg-[#1C1C1E] border border-[#2E2E32] text-white text-sm focus:outline-none focus:border-[#D7E2EA] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#D7E2EA]/70 font-medium">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, or requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-[#1C1C1E] border border-[#2E2E32] text-white text-sm focus:outline-none focus:border-[#D7E2EA] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-full text-white font-semibold uppercase tracking-widest px-10 py-4 text-sm cursor-pointer select-none transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background:
                          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                        outline: '2px solid #FFFFFF',
                        outlineOffset: '-3px',
                      }}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
