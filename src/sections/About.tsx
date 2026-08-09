import { Text } from '@mantine/core';
import { Section } from '../components/Section';
import { summary } from '../config/site';

export function About() {
  return (
    <Section id="about" title="About me">
      <Text c="dimmed" maw={720} size="lg" style={{ lineHeight: 1.7 }}>
        {summary}
      </Text>
    </Section>
  );
}
