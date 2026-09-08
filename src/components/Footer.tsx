import { Anchor, Container, Group, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconLock } from '@tabler/icons-react';
import { usePortfolio } from '../context/PortfolioContext';
import classes from './Footer.module.css';

export function Footer() {
  const { data } = usePortfolio();
  const siteConfig = data.siteConfig;
  const year = new Date().getFullYear();

  const socials = [
    { href: siteConfig.socials?.github, icon: IconBrandGithub, label: 'GitHub' },
    { href: siteConfig.socials?.linkedin, icon: IconBrandLinkedin, label: 'LinkedIn' },
    { href: siteConfig.socials?.twitter, icon: IconBrandX, label: 'X (Twitter)' },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className={classes.footer}>
      <Container size="lg" className={classes.inner}>
        <Group gap="xs" align="center">
          <Text size="sm" c="dimmed">
            © {year} {siteConfig.name}. All rights reserved.
          </Text>
          <Anchor href="#/admin" c="dimmed" size="xs" style={{ opacity: 0.4, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <IconLock size={12} />
            CMS
          </Anchor>
        </Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          {socials.map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={classes.iconLink}
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={18} stroke={1.5} />
            </motion.a>
          ))}
        </Group>
      </Container>
    </footer>
  );
}
