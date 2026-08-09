import { Container, Stack, Text, Title } from '@mantine/core';
import type { PropsWithChildren } from 'react';
import { Reveal } from './Reveal';
import classes from './Section.module.css';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
}

export function Section({ id, title, subtitle, children }: PropsWithChildren<SectionProps>) {
  return (
    <section id={id} className={classes.section}>
      <Container size="lg" py={100}>
        <Stack gap="xl">
          <Reveal>
            <Stack gap={8} maw={640}>
              <div className={classes.eyebrow} />
              <Title order={2} className={classes.title}>
                {title}
              </Title>
              {subtitle && (
                <Text c="dimmed" size="lg">
                  {subtitle}
                </Text>
              )}
            </Stack>
          </Reveal>
          <Reveal delay={0.1}>{children}</Reveal>
        </Stack>
      </Container>
    </section>
  );
}
