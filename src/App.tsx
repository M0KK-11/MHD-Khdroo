import { useEffect, useState } from 'react';
import { Center, Loader } from '@mantine/core';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Recommendations } from './sections/Recommendations';
import { Contact } from './sections/Contact';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminLogin } from './admin/AdminLogin';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

function RouterView() {
  const [hash, setHash] = useState(() => window.location.hash);
  const { user, authLoading } = usePortfolio();

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Admin Route (#/admin)
  if (hash === '#/admin' || hash.startsWith('#/admin')) {
    if (authLoading) {
      return (
        <Center style={{ minHeight: '100vh' }}>
          <Loader size="lg" color="brand" />
        </Center>
      );
    }
    return user ? <AdminDashboard /> : <AdminLogin />;
  }

  // Public Portfolio View
  return (
    <>
      <Header />
      <main className="main-layout">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Recommendations />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <RouterView />
    </PortfolioProvider>
  );
}

export default App;
