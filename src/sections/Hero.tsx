import React, { useState } from 'react';
import { Avatar, Container, Group, Text, Title, Badge, Box } from '@mantine/core';
import { motion, type Variants } from 'framer-motion';
import {
  IconArrowDown,
  IconChevronDown,
  IconDownload,
  IconMail,
  IconBrandFlutter,
  IconCpu,
} from '@tabler/icons-react';
import { GradientBlobs } from '../components/GradientBlobs';
import { usePortfolio } from '../context/PortfolioContext';
import { EASE_OUT } from '../motion';
import classes from './Hero.module.css';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export function Hero() {
  const { data } = usePortfolio();
  const siteConfig = data.siteConfig;
  const heroStats = data.heroStats || [];
  const [activeTab, setActiveTab] = useState<'bloc' | 'clean'>('bloc');

  const initials = siteConfig.name
    ? siteConfig.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'MK';

  return (
    <section id="top" className={classes.hero}>
      <GradientBlobs />
      <Container size="xl" className={classes.container}>
        <motion.div
          className={classes.mainGrid}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Left Column: Profile, Info, Buttons & Stats */}
          <div className={classes.leftContent}>
            {/* Avatar Section */}
            <motion.div variants={item} className={classes.avatarWrap}>
              <motion.div
                className={classes.avatarRing}
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className={classes.avatar}>
                {siteConfig.avatarUrl ? (
                  <Avatar
                    src={siteConfig.avatarUrl}
                    alt={siteConfig.name}
                    size={96}
                    radius="100%"
                  />
                ) : (
                  initials
                )}
              </div>
            </motion.div>

            {/* Live Status Badge */}
            <motion.div variants={item}>
              <span className={classes.badge}>
                <motion.span
                  className={classes.badgeDot}
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
                {siteConfig.role || 'Senior Mobile & Full-Stack Engineer'}
              </span>
            </motion.div>

            {/* Headline Title */}
            <motion.div variants={item}>
              <Title order={1} className={classes.title}>
                Hi, I&apos;m{' '}
                <span className={classes.gradientText}>{siteConfig.name}</span>
              </Title>
            </motion.div>

            {/* Tagline */}
            <motion.div variants={item}>
              <Text className={classes.tagline}>
                {siteConfig.tagline}
              </Text>
            </motion.div>

            {/* Action Buttons Row */}
            <motion.div variants={item}>
              <Group gap="sm" className={classes.buttonGroup}>
                <motion.a
                  href="#projects"
                  className={classes.primaryButton}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View my work
                  <IconArrowDown size={16} />
                </motion.a>

                <motion.a
                  href="#contact"
                  className={classes.secondaryButton}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get in touch
                  <IconMail size={16} />
                </motion.a>

                {siteConfig.resumeUrl && (
                  <motion.a
                    href={siteConfig.resumeUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.ghostButton}
                    whileHover={{ x: 3 }}
                  >
                    Download CV
                    <IconDownload size={16} />
                  </motion.a>
                )}
              </Group>
            </motion.div>

            {/* Glass Stats Cards */}
            {heroStats.length > 0 && (
              <motion.div variants={item} className={classes.statsRow}>
                {heroStats.map((stat) => (
                  <div key={stat.label} className={classes.statCard}>
                    <Text className={classes.statValue}>{stat.value}</Text>
                    <Text size="xs" c="dimmed" fw={600} ta="center">
                      {stat.label}
                    </Text>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right Column: Code Showcase Card */}
          <motion.div variants={item} className={classes.rightContent}>
            <div className={classes.codeShowcaseCard}>
              <div className={classes.windowHeader}>
                <div className={classes.windowDots}>
                  <span style={{ backgroundColor: '#ff5f56' }} />
                  <span style={{ backgroundColor: '#ffbd2e' }} />
                  <span style={{ backgroundColor: '#27c93f' }} />
                </div>
                <div className={classes.windowTabs}>
                  <span
                    className={`${classes.windowTab} ${activeTab === 'bloc' ? classes.windowTabActive : ''}`}
                    onClick={() => setActiveTab('bloc')}
                  >
                    <IconBrandFlutter size={13} /> app_architecture.dart
                  </span>
                  <span
                    className={`${classes.windowTab} ${activeTab === 'clean' ? classes.windowTabActive : ''}`}
                    onClick={() => setActiveTab('clean')}
                  >
                    <IconCpu size={13} /> clean_layers.ts
                  </span>
                </div>
              </div>

              <div className={classes.windowBody}>
                {activeTab === 'bloc' && (
                  <pre className={classes.codePre}>
                    <code>
                      <span className={classes.keyword}>class</span> <span className={classes.classDef}>AppEngineBloc</span> <span className={classes.keyword}>extends</span> <span className={classes.typeDef}>Bloc</span>&lt;<span className={classes.typeDef}>Event</span>, <span className={classes.typeDef}>State</span>&gt; {'{\n'}
                      {'  '}<span className={classes.comment}>// Clean Architecture & Reactive BLoC</span>{'\n'}
                      {'  '}<span className={classes.keyword}>final</span> FetchUserDataUseCase <span className={classes.prop}>_fetchUserData</span>;{'\n\n'}
                      {'  '}<span className={classes.funcDef}>AppEngineBloc</span>(this.<span className={classes.prop}>_fetchUserData</span>) : <span className={classes.keyword}>super</span>(<span className={classes.typeDef}>StateInitial</span>()) {'{\n'}
                      {'    '}<span className={classes.funcDef}>on</span>&lt;<span className={classes.typeDef}>LoadDataEvent</span>&gt;((event, emit) <span className={classes.keyword}>async</span> {'{\n'}
                      {'      '}<span className={classes.funcDef}>emit</span>(<span className={classes.typeDef}>StateLoading</span>());{'\n'}
                      {'      '}<span className={classes.keyword}>final</span> result = <span className={classes.keyword}>await</span> <span className={classes.prop}>_fetchUserData</span>();{'\n'}
                      {'      '}result.<span className={classes.funcDef}>fold</span>({'\n'}
                      {'        '}(failure) =&gt; <span className={classes.funcDef}>emit</span>(<span className={classes.typeDef}>StateError</span>(failure.msg)),{'\n'}
                      {'        '}(data) =&gt; <span className={classes.funcDef}>emit</span>(<span className={classes.typeDef}>StateSuccess</span>(data)),{'\n'}
                      {'      '});{'\n'}
                      {'    '}{'}'});{'\n'}
                      {'  '}{'}'}{'\n'}
                      {'}'}
                    </code>
                  </pre>
                )}

                {activeTab === 'clean' && (
                  <pre className={classes.codePre}>
                    <code>
                      <span className={classes.comment}>// Core System Principles & Standards</span>{'\n'}
                      <span className={classes.keyword}>export interface</span> <span className={classes.classDef}>SystemArchitecture</span> {'{\n'}
                      {'  '}presentationLayer: <span className={classes.string}>'Flutter UI / BLoC Widgets'</span>;{'\n'}
                      {'  '}domainLayer: <span className={classes.string}>'Pure UseCases & Entities'</span>;{'\n'}
                      {'  '}dataLayer: <span className={classes.string}>'REST API & Supabase Client'</span>;{'\n'}
                      {'  '}qualityStandards: [<span className={classes.string}>'Zero Crash Rate'</span>, <span className={classes.string}>'Unit Tested'</span>];{'\n'}
                      {'}'}
                    </code>
                  </pre>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Cue Indicator */}
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
