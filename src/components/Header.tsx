import React, { useState } from 'react';
import { Anchor, Burger, Container, Drawer, Group, Stack, Text, Tooltip, Badge } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { IconDownload, IconCopy, IconCheck } from '@tabler/icons-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { navLinks } from '../config/site';
import { usePortfolio } from '../context/PortfolioContext';
import classes from './Header.module.css';

export function Header() {
  const { data } = usePortfolio();
  const siteConfig = data.siteConfig;
  const [opened, { toggle, close }] = useDisclosure(false);
  const [{ y: scrollY }] = useWindowScroll();
  const scrolled = scrollY > 12;
  const [copied, setCopied] = useState(false);

  // Top Scroll Progress Line
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const initials = siteConfig.name
    ? siteConfig.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'MK';

  const handleCopyEmail = () => {
    if (!siteConfig.email) return;
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const links = navLinks.map((link) => (
    <Anchor
      key={link.href}
      href={link.href}
      underline="never"
      className={classes.link}
      onClick={close}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <header className={`${classes.header} ${scrolled ? classes.scrolled : ''}`}>
      {/* Top Scroll Progress Indicator */}
      <motion.div
        style={{
          scaleX,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #2a70e4, #6c9eee, #1b65e2)',
          transformOrigin: '0%',
          zIndex: 101,
        }}
      />

      <Container size="xl" className={classes.inner}>
        <Group gap="md" align="center">
          <Anchor href="#top" underline="never" className={classes.brand}>
            <span className={classes.logoMark}>{initials}</span>
            <Text fw={800} size="md" className={classes.brandName} visibleFrom="xs">
              {siteConfig.name}
            </Text>
          </Anchor>

          {/* Live Status Badge */}
          <Tooltip label="Open to Senior Mobile & Full-Stack Opportunities" position="bottom" withArrow>
            <Badge
              variant="outline"
              size="sm"
              radius="xl"
              visibleFrom="md"
              leftSection={
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                    display: 'inline-block',
                  }}
                />
              }
              style={{
                borderColor: 'rgba(16, 185, 129, 0.3)',
                color: '#6ee7b7',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                textTransform: 'none',
                fontWeight: 600,
                paddingLeft: 10,
              }}
            >
              Available for hire
            </Badge>
          </Tooltip>
        </Group>

        <Group gap={4} className={classes.navPill} visibleFrom="sm">
          {links}
        </Group>

        <Group gap="sm">
          {siteConfig.email && (
            <Tooltip label={copied ? 'Email Copied!' : 'Copy Email Address'} position="bottom" withArrow>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={classes.resumeButton}
                style={{ cursor: 'pointer', border: 'none', background: 'rgba(255, 255, 255, 0.06)' }}
              >
                {copied ? <IconCheck size={15} color="#10b981" /> : <IconCopy size={15} />}
                <Text size="xs" fw={600} visibleFrom="md">
                  {copied ? 'Copied!' : 'Copy Email'}
                </Text>
              </button>
            </Tooltip>
          )}

          {siteConfig.resumeUrl && (
            <Anchor
              href={siteConfig.resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              underline="never"
              className={classes.resumeButton}
              visibleFrom="sm"
            >
              <IconDownload size={16} stroke={1.75} />
              Resume
            </Anchor>
          )}
          <Anchor href="#contact" underline="never" className={classes.ctaButton} visibleFrom="sm">
            Hire me
          </Anchor>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="xs"
        padding="md"
        title={siteConfig.name}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Stack gap="lg">
          {links}
          {siteConfig.resumeUrl && (
            <Anchor
              href={siteConfig.resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              underline="never"
              className={classes.resumeButton}
            >
              <IconDownload size={16} stroke={1.75} />
              Download Resume
            </Anchor>
          )}
        </Stack>
      </Drawer>
    </header>
  );
}
