import { Text } from '@mantine/core';
import { Section } from '../components/Section';
import { usePortfolio } from '../context/PortfolioContext';

export function About() {
  const { data } = usePortfolio();
  const bio = data.summary || data.siteConfig.summary;

  return (
    <Section id="about" title="About me">
      <Text c="dimmed" maw={720} size="lg" style={{ lineHeight: 1.7 }}>
        {bio}
      </Text>
    </Section>
  );
}
