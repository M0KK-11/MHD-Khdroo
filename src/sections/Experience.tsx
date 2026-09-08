import { List, Stack, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconBriefcase, IconSchool } from '@tabler/icons-react';
import { Section } from '../components/Section';
import { usePortfolio } from '../context/PortfolioContext';
import { EASE_OUT } from '../motion';
import classes from './Experience.module.css';

function TimelineItem({
  icon,
  title,
  meta,
  period,
  highlights,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  meta: string;
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
      <Stack gap={4} className={classes.itemBody}>
        <Title order={5}>{title}</Title>
        <Text size="sm" c="dimmed">
          {meta}
          {period ? ` · ${period}` : ''}
        </Text>
        {highlights && highlights.length > 0 && (
          <List size="sm" spacing={4} c="dimmed" mt={4}>
            {highlights.map((point) => (
              <List.Item key={point}>{point}</List.Item>
            ))}
          </List>
        )}
      </Stack>
    </motion.div>
  );
}

export function Experience() {
  const { data } = usePortfolio();
  const experienceList = data.experience || [];
  const educationList = data.education || [];

  return (
    <Section id="experience" title="Experience & Education">
      <Stack gap={48}>
        {experienceList.length > 0 && (
          <Stack gap="md">
            <Title order={4}>Experience</Title>
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
                  icon={<IconBriefcase size={14} />}
                  title={exp.role}
                  meta={`${exp.company}${exp.location ? ` · ${exp.location}` : ''}`}
                  period={exp.period}
                  highlights={exp.highlights}
                  index={index}
                />
              ))}
            </div>
          </Stack>
        )}

        {educationList.length > 0 && (
          <Stack gap="md">
            <Title order={4}>Education</Title>
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
                  icon={<IconSchool size={14} />}
                  title={edu.degree}
                  meta={edu.school}
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
