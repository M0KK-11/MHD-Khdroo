import { Anchor, Burger, Container, Drawer, Group, Stack, Text } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { IconDownload } from '@tabler/icons-react';
import { navLinks } from '../config/site';
import { usePortfolio } from '../context/PortfolioContext';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import classes from './Header.module.css';

export function Header() {
  const { data } = usePortfolio();
  const siteConfig = data.siteConfig;
  const [opened, { toggle, close }] = useDisclosure(false);
  const [{ y: scrollY }] = useWindowScroll();
  const scrolled = scrollY > 12;

  const initials = siteConfig.name
    ? siteConfig.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'MK';

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
      <Container size="lg" className={classes.inner}>
        <Anchor href="#top" underline="never" className={classes.brand}>
          <span className={classes.logoMark}>{initials}</span>
          <Text fw={800} size="md" className={classes.brandName} visibleFrom="xs">
            {siteConfig.name}
          </Text>
        </Anchor>

        <Group gap={4} className={classes.navPill} visibleFrom="sm">
          {links}
        </Group>

        <Group gap="sm">
          {siteConfig.resumeUrl && (
            <Anchor
              href={siteConfig.resumeUrl}
              download
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
          <ColorSchemeToggle />
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
