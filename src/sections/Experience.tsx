import { Group, Stack, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconBriefcase, IconSchool, IconCheck } from '@tabler/icons-react';
import { Section } from '../components/Section';
import { usePortfolio } from '../context/PortfolioContext';
import { EASE_OUT } from '../motion';
import classes from './Experience.module.css';

function TimelineItem({
  icon,
  title,
  company,
  location,
  period,
  highlights,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  company: string;
  location?: string;
  period?: string;
  highlights?: string[];
  index: number;
}) {
  return (
    <motion.div
      className={classes.item}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: EASE_OUT }}
    >
      <div className={classes.bullet}>{icon}</div>
      
      <div className={classes.itemCard}>
        <Stack gap="xs">
          <Group justify="space-between" align="flex-start">
            <Stack gap={2}>
              <Title order={4} className={classes.roleTitle}>
                {title}
              </Title>
              <Text className={classes.companyMeta}>
                {company} {location ? `· ${location}` : ''}
              </Text>
            </Stack>
            {period && (
              <span className={classes.periodBadge}>
                {period}
              </span>
            )}
          </Group>

          {highlights && highlights.length > 0 && (
            <Stack gap={8} mt="xs">
              {highlights.map((point) => (
                <Group key={point} gap="sm" wrap="nowrap" align="flex-start">
                  <span className={classes.checkBullet}>
                    <IconCheck size={11} stroke={3} />
                  </span>
                  <Text size="sm" style={{ color: '#c3d6f7', flex: 1, lineHeight: 1.5 }}>
                    {point}
                  </Text>
                </Group>
              ))}
            </Stack>
          )}
        </Stack>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const { data } = usePortfolio();
  const experienceList = data.experience || [];
  const educationList = data.education || [];

  return (
    <Section id="experience" title="Work Experience & Education" subtitle="Professional career history, roles, achievements, and academic background">
      <Stack gap={48}>
        {experienceList.length > 0 && (
          <Stack gap="lg">
            <Title order={3} c="white">Professional Career</Title>
            <div className={classes.timeline}>
              <motion.div
                className={classes.line}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
              />
              {experienceList.map((exp, index) => (
                <TimelineItem
                  key={exp.id || exp.role + exp.company}
                  icon={<IconBriefcase size={16} />}
                  title={exp.role}
                  company={exp.company}
                  location={exp.location}
                  period={exp.period}
                  highlights={exp.highlights}
                  index={index}
                />
              ))}
            </div>
          </Stack>
        )}

        {educationList.length > 0 && (
          <Stack gap="lg" mt="md">
            <Title order={3} c="white">Academic Education</Title>
            <div className={classes.timeline}>
              <motion.div
                className={classes.line}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
              />
              {educationList.map((edu, index) => (
                <TimelineItem
                  key={edu.id || edu.degree}
                  icon={<IconSchool size={16} />}
                  title={edu.degree}
                  company={edu.school}
                  period={edu.period}
                  index={index}
                />
              ))}
            </div>
          </Stack>
        )}
      </Stack>
    </Section>
  );
}
