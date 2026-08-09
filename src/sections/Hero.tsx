import { Container, Group, Text, Title } from '@mantine/core';
import { motion, type Variants } from 'framer-motion';
import { IconArrowDown, IconChevronDown, IconDownload, IconMail } from '@tabler/icons-react';
import { GradientBlobs } from '../components/GradientBlobs';
import { heroStats, siteConfig } from '../config/site';
import { EASE_OUT } from '../motion';
import classes from './Hero.module.css';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const initials = siteConfig.name
  .split(' ')
  .map((part) => part[0])
  .join('')
  .slice(0, 2);

export function Hero() {
  return (
    <section id="top" className={classes.hero}>
      <GradientBlobs />
      <Container size="lg" className={classes.container}>
        <motion.div
          className={classes.inner}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className={classes.avatarWrap}>
            <motion.div
              className={classes.avatarRing}
              animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.15, 0.55] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className={classes.avatar}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {initials}
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <span className={classes.badge}>
              <motion.span
                className={classes.badgeDot}
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              {siteConfig.role}
            </span>
          </motion.div>

          <motion.div variants={item}>
            <Title order={1} className={classes.title} ta="center">
              Hi, I&apos;m{' '}
              <span className={classes.gradientText}>{siteConfig.name}</span>
            </Title>
          </motion.div>

          <motion.div variants={item}>
            <Text size="xl" c="dimmed" maw={640} className={classes.tagline} ta="center">
              {siteConfig.tagline}
            </Text>
          </motion.div>

          <motion.div variants={item}>
            <Group mt="sm">
              <motion.a
                href="#projects"
                className={classes.primaryButton}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.04, y: -2 } }}
              >
                View my work
                <motion.span
                  className={classes.iconWrap}
                  variants={{ rest: { y: 0 }, hover: { y: 3 } }}
                  transition={{ duration: 0.35, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
                >
                  <IconArrowDown size={16} />
                </motion.span>
              </motion.a>
              <motion.a
                href="#contact"
                className={classes.secondaryButton}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.04, y: -2 } }}
              >
                Get in touch
                <motion.span
                  className={classes.iconWrap}
                  variants={{ rest: { rotate: 0 }, hover: { rotate: [0, -12, 12, -8, 0] } }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <IconMail size={16} />
                </motion.span>
              </motion.a>
              <motion.a
                href={siteConfig.resumeUrl}
                download
                className={classes.ghostButton}
                whileHover={{ x: 3 }}
              >
                Download CV
                <IconDownload size={16} />
              </motion.a>
            </Group>
          </motion.div>

          <motion.div variants={item} className={classes.statsRow}>
            {heroStats.map((stat) => (
              <div key={stat.label} className={classes.stat}>
                <Text className={classes.statValue}>{stat.value}</Text>
                <Text size="sm" c="dimmed">
                  {stat.label}
                </Text>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.a
          href="#about"
          className={classes.scrollCue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          aria-label="Scroll to next section"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <IconChevronDown size={22} stroke={1.5} />
          </motion.span>
        </motion.a>
      </Container>
    </section>
  );
}
