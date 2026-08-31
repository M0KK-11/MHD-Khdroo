import React from 'react';
import { Card, Group, Rating, SimpleGrid, Stack, Text, Avatar } from '@mantine/core';
import { motion } from 'framer-motion';
import { Section } from '../components/Section';
import { usePortfolio } from '../context/PortfolioContext';
import { EASE_OUT } from '../motion';

export const Recommendations: React.FC = () => {
  const { data } = usePortfolio();
  const visibleRecs = (data.recommendations || []).filter((r) => !r.hidden);

  if (visibleRecs.length === 0) return null;

  return (
    <Section id="recommendations" title="Recommendations & Feedback">
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        {visibleRecs.map((rec, index) => (
          <motion.div
            key={rec.id || index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: EASE_OUT }}
          >
            <Card withBorder padding="lg" radius="md" bg="dark.8" h="100%">
              <Stack justify="space-between" h="100%">
                <Stack gap="sm">
                  <Rating value={rec.rating} readOnly size="sm" />
                  <Text size="sm" style={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                    &ldquo;{rec.text}&rdquo;
                  </Text>
                </Stack>

                <Group gap="md" mt="md">
                  <Avatar src={rec.avatarUrl} radius="xl" color="brand" alt={rec.author}>
                    {rec.author.slice(0, 2).toUpperCase()}
                  </Avatar>
                  <Stack gap={0}>
                    <Text fw={600} size="sm">
                      {rec.author}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {rec.role} · {rec.company}
                    </Text>
                  </Stack>
                </Group>
              </Stack>
            </Card>
          </motion.div>
        ))}
      </SimpleGrid>
    </Section>
  );
};
