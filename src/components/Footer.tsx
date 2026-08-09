import { Container, Group, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';
import { siteConfig } from '../config/site';
import classes from './Footer.module.css';

const socials = [
  { href: siteConfig.socials.github, icon: IconBrandGithub, label: 'GitHub' },
  { href: siteConfig.socials.linkedin, icon: IconBrandLinkedin, label: 'LinkedIn' },
  { href: siteConfig.socials.twitter, icon: IconBrandX, label: 'X (Twitter)' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <Container size="lg" className={classes.inner}>
        <Text size="sm" c="dimmed">
          © {year} {siteConfig.name}. All rights reserved.
        </Text>

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
