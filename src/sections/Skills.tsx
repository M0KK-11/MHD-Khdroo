import { Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import {
  IconApi,
  IconBrandFirebase,
  IconBrandFlutter,
  IconBrandGit,
  IconCode,
  IconComponents,
  IconLayoutGrid,
  IconPlugConnected,
  IconServer2,
  IconStack2,
} from '@tabler/icons-react';
import { Section } from '../components/Section';
import { usePortfolio } from '../context/PortfolioContext';
import { EASE_OUT } from '../motion';
import classes from './Skills.module.css';

const knownIcons: Record<string, React.ComponentType<{ size?: number; stroke?: number }>> = {
  Flutter: IconBrandFlutter,
  Dart: IconCode,
  'BLoC / Cubit': IconComponents,
  Firebase: IconBrandFirebase,
  Riverpod: IconStack2,
  'BLoC Architecture (Cubit)': IconComponents,
  'Socket.io': IconPlugConnected,
  'API Integration': IconApi,
  Supabase: IconServer2,
  'MVVM Pattern': IconLayoutGrid,
  'Clean Architecture': IconLayoutGrid,
  Git: IconBrandGit,
};

export function Skills() {
  const { data } = usePortfolio();
  const coreStack = data.coreStack || [];
  const technicalSkills = data.skills?.technical || [];
  const softSkills = data.skills?.soft || [];
  const languagesList = data.languages || [];

  return (
    <Section id="skills" title="Skills & Abilities">
      <Stack gap={48}>
        {coreStack.length > 0 && (
          <Stack gap="md">
            <Title order={4}>Core Stack</Title>
            <motion.div
              className={classes.coreRow}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {coreStack.map((skill) => {
                const Icon = knownIcons[skill] || IconCode;
                return (
                  <motion.div
                    key={skill}
                    className={classes.coreTile}
                    variants={{
                      hidden: { opacity: 0, y: 16, scale: 0.92 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    whileHover={{ y: -4 }}
                  >
                    <div className={classes.coreIcon}>
                      <Icon size={26} stroke={1.75} />
                    </div>
                    <Text fw={700} size="sm">
                      {skill}
                    </Text>
                  </motion.div>
                );
              })}
            </motion.div>
          </Stack>
        )}

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={48}>
          {technicalSkills.length > 0 && (
            <Stack gap="md">
              <Title order={4}>Technical Skills</Title>
              <motion.div
                className={classes.tagRow}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05 } },
                }}
              >
                {technicalSkills.map((skill) => {
                  const Icon = knownIcons[skill];
                  return (
                    <motion.span
                      key={skill}
                      className={classes.tag}
                      variants={{
                        hidden: { opacity: 0, y: 12, scale: 0.9 },
                        show: { opacity: 1, y: 0, scale: 1 },
                      }}
                      whileHover={{ y: -3, scale: 1.05 }}
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                    >
                      {Icon && <Icon size={14} stroke={2} />}
                      {skill}
                    </motion.span>
                  );
                })}
              </motion.div>
            </Stack>
          )}

          {softSkills.length > 0 && (
            <Stack gap="md">
              <Title order={4}>Soft Skills</Title>
              <motion.div
                className={classes.tagRow}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                }}
              >
                {softSkills.map((skill) => (
                  <motion.span
                    key={skill}
                    className={classes.tagOutline}
                    variants={{
                      hidden: { opacity: 0, y: 12, scale: 0.9 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </Stack>
          )}
        </SimpleGrid>

        {languagesList.length > 0 && (
          <Stack gap="sm">
            <Title order={4}>Languages</Title>
            <Group gap={40}>
              {languagesList.map((lang) => (
                <Stack key={lang.name} gap={0}>
                  <Text fw={700}>{lang.name}</Text>
                  <Text size="sm" c="dimmed">
                    {lang.level}
                  </Text>
                </Stack>
              ))}
            </Group>
          </Stack>
        )}
      </Stack>
    </Section>
  );
}
