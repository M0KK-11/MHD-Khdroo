import { Group, Stack, Text, Title, Box } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconCpu, IconDeviceMobile, IconRocket, IconCheck } from '@tabler/icons-react';
import { Section } from '../components/Section';
import { usePortfolio } from '../context/PortfolioContext';
import { EASE_OUT } from '../motion';
import classes from './About.module.css';

const pillars = [
  {
    icon: IconCpu,
    title: 'Clean Architecture & BLoC',
    description:
      'Designing decoupled, testable, and maintainable software architectures leveraging BLoC state management and strict SOLID principles.',
  },
  {
    icon: IconDeviceMobile,
    title: 'Pixel-Perfect 60FPS UI',
    description:
      'Crafting highly smooth, interactive mobile & web interfaces optimized for native performance across iOS, Android, and Web.',
  },
  {
    icon: IconRocket,
    title: 'Production & Scalability',
    description:
      'Engineering robust REST APIs, Supabase real-time databases, and Firebase cloud integrations capable of scaling seamlessly.',
  },
];

export function About() {
  const { data } = usePortfolio();
  const bio = data.summary || data.siteConfig.summary;

  return (
    <Section id="about" title="About Me" subtitle="Engineering philosophy, background, and core technical pillars">
      <Stack gap="xl">
        {/* Main Bio Glass Card */}
        <motion.div
          className={classes.bioCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <Text className={classes.bioText}>
            {bio}
          </Text>
        </motion.div>

        {/* 3 Core Engineering Pillars */}
        <div className={classes.grid}>
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className={classes.pillarCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: EASE_OUT }}
              >
                <div className={classes.pillarIcon}>
                  <Icon size={24} stroke={1.75} />
                </div>
                <Title order={4} className={classes.pillarTitle}>
                  {pillar.title}
                </Title>
                <Text className={classes.pillarDesc}>
                  {pillar.description}
                </Text>
              </motion.div>
            );
          })}
        </div>
      </Stack>
    </Section>
  );
}
