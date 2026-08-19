import { siteConfig } from '../../config/site';

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#080808] border-t border-[#1C1C1E] py-10 px-6 md:px-12 select-none">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="text-sm font-bold uppercase tracking-wider text-[#D7E2EA]">
            {siteConfig.name}
          </span>
          <p className="text-xs text-[#D7E2EA]/50 m-0">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={scrollToTop}
            className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
