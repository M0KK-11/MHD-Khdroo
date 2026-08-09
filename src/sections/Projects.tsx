import { Group, Stack, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import {
  IconCalendarEvent,
  IconCar,
  IconCheck,
  IconSchool,
  IconShoppingBag,
} from '@tabler/icons-react';
import { Section } from '../components/Section';
import { projects } from '../config/site';
import { EASE_OUT } from '../motion';
import classes from './Projects.module.css';

const iconMap = {
  car: IconCar,
  calendar: IconCalendarEvent,
  school: IconSchool,
  shopping: IconShoppingBag,
};

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className={classes.grid}>
        {projects.map((project, index) => {
          const Icon = iconMap[project.icon];
          return (
            <motion.div
              key={project.name}
              className={classes.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_OUT }}
              whileHover={{ y: -8 }}
            >
              <div className={classes.cardGlow} />
              <Stack gap="md" className={classes.cardContent}>
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                  <Group gap="sm" wrap="nowrap">
                    <div className={classes.iconTile}>
                      <Icon size={22} stroke={1.75} />
                    </div>
                    <Stack gap={0}>
                      <Title order={4}>{project.name}</Title>
                      <Text size="sm" fw={600} className={classes.subtitle}>
                        {project.subtitle}
                      </Text>
                    </Stack>
                  </Group>
                  <Text size="xs" c="dimmed" className={classes.period}>
                    {project.period}
                  </Text>
                </Group>

                <Text size="sm" c="dimmed">
                  {project.description}
                </Text>

                <Stack gap={8} className={classes.highlights}>
                  {project.highlights.map((point) => (
                    <Group key={point} gap={8} wrap="nowrap" align="flex-start">
                      <span className={classes.checkIcon}>
                        <IconCheck size={12} stroke={3} />
                      </span>
                      <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                        {point}
                      </Text>
                    </Group>
                  ))}
                </Stack>

                <Group gap={6} mt="auto" pt="xs">
                  {project.tags.map((tag) => (
                    <span key={tag} className={classes.tag}>
                      {tag}
                    </span>
                  ))}
                </Group>
              </Stack>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
