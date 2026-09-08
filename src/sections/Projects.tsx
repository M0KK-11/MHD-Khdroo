import React, { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { motion } from 'framer-motion';
import {
  IconBrandGithub,
  IconCalendarEvent,
  IconCar,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconCode,
  IconDeviceMobile,
  IconExternalLink,
  IconEye,
  IconSchool,
  IconShoppingBag,
} from '@tabler/icons-react';
import { Section } from '../components/Section';
import { usePortfolio } from '../context/PortfolioContext';
import { EASE_OUT } from '../motion';
import type { ProjectItem } from '../types/portfolio';
import classes from './Projects.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number; stroke?: number }>> = {
  car: IconCar,
  calendar: IconCalendarEvent,
  school: IconSchool,
  shopping: IconShoppingBag,
  code: IconCode,
};

export function Projects() {
  const { data } = usePortfolio();
  const visibleProjects = (data.projects || []).filter((p) => !p.hidden);

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Section id="projects" title="Projects">
      <div className={classes.grid}>
        {visibleProjects.map((project, index) => {
          const Icon = iconMap[project.icon] || IconCode;
          const projectId = project.id || project.name;
          const isExpanded = !!expandedMap[projectId];
          const highlights = project.highlights || [];
          const visibleHighlights = isExpanded ? highlights : highlights.slice(0, 2);
          const hasMore = highlights.length > 2;

          return (
            <motion.div
              key={projectId}
              className={classes.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: EASE_OUT }}
              whileHover={{ y: -6 }}
            >
              <div className={classes.cardGlow} />

              {/* Media Preview Banner */}
              {project.imageBase64 ? (
                <div className={classes.mediaWrapper}>
                  <img
                    src={project.imageBase64}
                    alt={project.name}
                    className={classes.mediaImage}
                    loading="lazy"
                  />
                  <div className={classes.mediaOverlay} />
                  <div className={classes.mediaBadges}>
                    <span className={classes.categoryPill}>
                      <IconDeviceMobile size={13} stroke={2.2} />
                      Mobile App
                    </span>
                    {project.period && (
                      <span className={classes.periodBadge}>{project.period}</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className={classes.mediaWrapperFallback}>
                  <div className={classes.mediaFallbackWatermark}>
                    <Icon size={48} stroke={1.2} />
                  </div>
                  <div className={classes.mediaFallbackBadge}>
                    <IconDeviceMobile size={15} stroke={2.2} />
                    Flutter Architecture
                  </div>
                  <div className={classes.mediaBadges}>
                    <span className={classes.categoryPill}>
                      <IconDeviceMobile size={13} stroke={2.2} />
                      Mobile App
                    </span>
                    {project.period && (
                      <span className={classes.periodBadge}>{project.period}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className={classes.cardBody}>
                {/* Identity Header */}
                <div className={classes.identityRow}>
                  <div className={classes.identityMain}>
                    <div className={classes.iconTile}>
                      <Icon size={22} stroke={1.8} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h3 className={classes.titleText}>{project.name}</h3>
                      <p className={classes.subtitleText}>{project.subtitle}</p>
                    </div>
                  </div>

                  {project.liveUrl && (
                    <Tooltip label="Open Live App" position="left" withArrow>
                      <ActionIcon
                        component="a"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="subtle"
                        color="brand"
                        radius="md"
                        size="md"
                      >
                        <IconExternalLink size={18} />
                      </ActionIcon>
                    </Tooltip>
                  )}
                </div>

                {/* Description */}
                <p className={classes.description}>{project.description}</p>

                {/* Compact Highlights with Expand Option */}
                {highlights.length > 0 && (
                  <div className={classes.highlightsWrapper}>
                    {visibleHighlights.map((point) => (
                      <div key={point} className={classes.highlightItem}>
                        <span className={classes.checkIcon}>
                          <IconCheck size={11} stroke={3} />
                        </span>
                        <span style={{ flex: 1 }}>{point}</span>
                      </div>
                    ))}
                    {hasMore && (
                      <button
                        type="button"
                        className={classes.expandBtn}
                        onClick={() => toggleExpand(projectId)}
                      >
                        {isExpanded ? (
                          <>
                            <IconChevronUp size={13} stroke={2.5} /> Show less
                          </>
                        ) : (
                          <>
                            <IconChevronDown size={13} stroke={2.5} /> +{highlights.length - 2} more features
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {/* Tech Stack Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className={classes.tagsWrapper}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={classes.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Action Buttons */}
                <div className={classes.footerActions}>
                  <Button
                    variant="light"
                    color="brand"
                    size="xs"
                    className={classes.detailsBtn}
                    leftSection={<IconEye size={14} />}
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </Button>

                  <div className={classes.linkGroup}>
                    {project.githubUrl && (
                      <Tooltip label="View Source Code" withArrow>
                        <ActionIcon
                          component="a"
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="default"
                          radius="md"
                          size="sm"
                        >
                          <IconBrandGithub size={15} />
                        </ActionIcon>
                      </Tooltip>
                    )}

                    {project.liveUrl && (
                      <Button
                        component="a"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="filled"
                        color="brand"
                        size="xs"
                        radius="md"
                        rightSection={<IconExternalLink size={13} />}
                      >
                        Live App
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Project Details Modal */}
      <Modal
        opened={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        size="lg"
        radius="lg"
        centered
        classNames={{
          content: classes.modalContent,
          header: classes.modalHeader,
          body: classes.modalBody,
        }}
        title={
          selectedProject ? (
            <Group gap="sm" wrap="nowrap">
              <div className={classes.iconTile} style={{ width: 38, height: 38 }}>
                {React.createElement(iconMap[selectedProject.icon] || IconCode, { size: 20 })}
              </div>
              <div>
                <Title order={4} style={{ margin: 0 }}>
                  {selectedProject.name}
                </Title>
                <Text size="xs" c="brand.4" fw={600}>
                  {selectedProject.subtitle}
                </Text>
              </div>
            </Group>
          ) : null
        }
      >
        {selectedProject && (
          <Stack gap="md">
            {selectedProject.imageBase64 && (
              <Image
                src={selectedProject.imageBase64}
                alt={selectedProject.name}
                radius="md"
                h={300}
                fit="cover"
                style={{
                  border: '1px solid rgba(42, 112, 228, 0.2)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                }}
              />
            )}

            <Group justify="space-between" align="center">
              <Badge variant="light" color="brand" size="sm">
                Mobile Application
              </Badge>
              {selectedProject.period && (
                <Text size="xs" c="dimmed">
                  {selectedProject.period}
                </Text>
              )}
            </Group>

            <div>
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb={4}>
                Overview
              </Text>
              <Text size="sm" style={{ lineHeight: 1.6 }}>
                {selectedProject.description}
              </Text>
            </div>

            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
              <div>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb={8}>
                  Key Architecture & Features
                </Text>
                <Stack gap={8}>
                  {selectedProject.highlights.map((point) => (
                    <Group key={point} gap={10} wrap="nowrap" align="flex-start">
                      <span className={classes.checkIcon} style={{ marginTop: 2 }}>
                        <IconCheck size={11} stroke={3} />
                      </span>
                      <Text size="sm" style={{ flex: 1, lineHeight: 1.45 }}>
                        {point}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </div>
            )}

            {selectedProject.tags && selectedProject.tags.length > 0 && (
              <div>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb={6}>
                  Technologies & Tools
                </Text>
                <Group gap={6}>
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className={classes.tag}>
                      {tag}
                    </span>
                  ))}
                </Group>
              </div>
            )}

            <Divider my="xs" style={{ borderColor: 'rgba(42, 112, 228, 0.15)' }} />

            <Group justify="flex-end" gap="sm">
              {selectedProject.githubUrl && (
                <Button
                  component="a"
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="default"
                  leftSection={<IconBrandGithub size={16} />}
                >
                  Source Code
                </Button>
              )}
              {selectedProject.liveUrl && (
                <Button
                  component="a"
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="brand"
                  leftSection={<IconExternalLink size={16} />}
                >
                  Live Application
                </Button>
              )}
            </Group>
          </Stack>
        )}
      </Modal>
    </Section>
  );
}
