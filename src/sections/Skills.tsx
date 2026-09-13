import { Group, Stack, Text, Title, Badge } from '@mantine/core';
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
  IconDeviceMobile,
  IconCloud,
  IconTools,
  IconUsers,
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

  // Group technical skills into categories for senior presentation
  const mobileSkills = technicalSkills.filter((s) =>
    ['Flutter', 'Dart', 'BLoC / Cubit', 'Riverpod', 'Clean Architecture', 'MVVM Pattern', 'BLoC Architecture (Cubit)'].includes(s)
  );

  const backendSkills = technicalSkills.filter((s) =>
    ['Firebase', 'Supabase', 'Socket.io', 'API Integration', 'REST API'].includes(s)
  );

  const otherTechSkills = technicalSkills.filter(
    (s) => !mobileSkills.includes(s) && !backendSkills.includes(s)
  );

  return (
    <Section id="skills" title="Skills & Technical Expertise" subtitle="Comprehensive stack, architectural patterns, and engineering capabilities">
      <Stack gap="xl">
        <div className={classes.categoryGrid}>
          {/* Mobile Engineering Category */}
          <motion.div
            className={classes.categoryCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <div className={classes.categoryHeader}>
              <div className={classes.categoryIcon}>
                <IconDeviceMobile size={22} />
              </div>
              <div>
                <Title order={4} c="white">Mobile & Frontend Architecture</Title>
                <Text size="xs" c="dimmed">Cross-platform development & State Management</Text>
              </div>
            </div>

            <div className={classes.skillPills}>
              {(mobileSkills.length > 0 ? mobileSkills : coreStack).map((skill) => {
                const Icon = knownIcons[skill] || IconCode;
                return (
                  <div key={skill} className={classes.skillPill}>
                    <span style={{ color: '#6c9eee', display: 'inline-flex' }}>
                      <Icon size={16} stroke={2} />
                    </span>
                    <span>{skill}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Cloud & Backend Category */}
          <motion.div
            className={classes.categoryCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          >
            <div className={classes.categoryHeader}>
              <div className={classes.categoryIcon}>
                <IconCloud size={22} />
              </div>
              <div>
                <Title order={4} c="white">Backend & Cloud Services</Title>
                <Text size="xs" c="dimmed">Realtime databases, APIs, and microservices</Text>
              </div>
            </div>

            <div className={classes.skillPills}>
              {(backendSkills.length > 0 ? backendSkills : ['Supabase', 'Firebase', 'REST API', 'Socket.io']).map((skill) => {
                const Icon = knownIcons[skill] || IconServer2;
                return (
                  <div key={skill} className={classes.skillPill}>
                    <span style={{ color: '#6c9eee', display: 'inline-flex' }}>
                      <Icon size={16} stroke={2} />
                    </span>
                    <span>{skill}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Engineering Tools Category */}
          <motion.div
            className={classes.categoryCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
          >
            <div className={classes.categoryHeader}>
              <div className={classes.categoryIcon}>
                <IconTools size={22} />
              </div>
              <div>
                <Title order={4} c="white">Tools & DevOps</Title>
                <Text size="xs" c="dimmed">Version control, CI/CD, and quality tools</Text>
              </div>
            </div>

            <div className={classes.skillPills}>
              {(otherTechSkills.length > 0 ? otherTechSkills : ['Git', 'GitHub', 'CI/CD Pipelines', 'Figma', 'Unit Testing']).map((skill) => {
                const Icon = knownIcons[skill] || IconTools;
                return (
                  <div key={skill} className={classes.skillPill}>
                    <span style={{ color: '#6c9eee', display: 'inline-flex' }}>
                      <Icon size={16} stroke={2} />
                    </span>
                    <span>{skill}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Soft Skills & Languages Category */}
          <motion.div
            className={classes.categoryCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
          >
            <div className={classes.categoryHeader}>
              <div className={classes.categoryIcon}>
                <IconUsers size={22} />
              </div>
              <div>
                <Title order={4} c="white">Leadership & Communication</Title>
                <Text size="xs" c="dimmed">Teamwork, agile delivery, and languages</Text>
              </div>
            </div>

            <Stack gap="sm">
              {softSkills.length > 0 && (
                <Group gap={8} wrap="wrap">
                  {softSkills.map((skill) => (
                    <span key={skill} className={classes.softTile}>
                      {skill}
                    </span>
                  ))}
                </Group>
              )}

              {languagesList.length > 0 && (
                <Group gap="md" mt="xs" pt="xs" style={{ borderTop: '1px solid rgba(42, 112, 228, 0.15)' }}>
                  {languagesList.map((lang) => (
                    <Group key={lang.name} gap="xs">
                      <Badge variant="outline" color="blue" size="sm">
                        {lang.name}: {lang.level}
                      </Badge>
                    </Group>
                  ))}
                </Group>
              )}
            </Stack>
          </motion.div>
        </div>
      </Stack>
    </Section>
  );
}
