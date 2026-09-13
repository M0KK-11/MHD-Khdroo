import { useState } from 'react';
import { Anchor, Group, Image, Stack, Text, Title, TextInput, Badge, Box } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconCalendarEvent,
  IconCar,
  IconCheck,

  IconCode,
  IconExternalLink,

  IconSchool,
  IconShoppingBag,
  IconPhoto,
  IconArrowRight,
  IconSearch,
} from '@tabler/icons-react';
import { Section } from '../components/Section';
import { ProjectDetailsModal } from '../components/ProjectDetailsModal';
import { usePortfolio } from '../context/PortfolioContext';
import type { ProjectItem } from '../types/portfolio';
import { EASE_OUT } from '../motion';
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
  const [modalOpened, setModalOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'mobile', label: 'Mobile Applications' },
    { id: 'web', label: 'Web Systems & Cloud' },
  ];

  const filteredProjects = visibleProjects.filter((project) => {
    // Category match
    let matchesCategory = true;
    if (activeCategory === 'mobile') {
      matchesCategory =
        project.subtitle?.toLowerCase().includes('mobile') ||
        project.subtitle?.toLowerCase().includes('flutter') ||
        project.subtitle?.toLowerCase().includes('app') ||
        project.tags?.some((t) => ['flutter', 'dart', 'ios', 'android'].includes(t.toLowerCase()));
    } else if (activeCategory === 'web') {
      matchesCategory =
        project.subtitle?.toLowerCase().includes('web') ||
        project.subtitle?.toLowerCase().includes('system') ||
        project.tags?.some((t) => ['react', 'next.js', 'node.js', 'supabase', 'firebase', 'api'].includes(t.toLowerCase()));
    }

    // Search query match
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchesSearch =
        project.name.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        (project.tags && project.tags.some((t) => t.toLowerCase().includes(q)));
    }

    return matchesCategory && matchesSearch;
  });

  const handleOpenDetails = (project: ProjectItem) => {
    setSelectedProject(project);
    setModalOpened(true);
  };

  return (
    <Section id="projects" title="Featured Projects" subtitle="Explore my recent work, mobile & web applications, and technical architecture">
      <Stack gap="xl">
        {/* Interactive Filter Toolbar & Live Search Bar */}
        <Group justify="space-between" align="center" wrap="wrap" gap="md">
          <Group gap="xs" wrap="wrap">
            {categories.map((cat) => (
              <Badge
                key={cat.id}
                size="lg"
                radius="xl"
                variant={activeCategory === cat.id ? 'filled' : 'outline'}
                color={activeCategory === cat.id ? 'blue' : 'gray'}
                style={{
                  cursor: 'pointer',
                  padding: '10px 18px',
                  backgroundColor: activeCategory === cat.id ? '#2a70e4' : 'rgba(10, 19, 48, 0.6)',
                  borderColor: activeCategory === cat.id ? '#2a70e4' : 'rgba(42, 112, 228, 0.25)',
                  color: activeCategory === cat.id ? '#ffffff' : '#9fc0f5',
                  fontWeight: 600,
                  transition: 'all 200ms ease',
                }}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </Badge>
            ))}
          </Group>

          <TextInput
            placeholder="Search projects or tech tags..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 280 }}
            size="sm"
            radius="md"
          />
        </Group>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <div className={classes.grid}>
              {filteredProjects.map((project, index) => {
                const Icon = iconMap[project.icon] || IconCode;

                const images: string[] =
                  project.imagesBase64 && project.imagesBase64.length > 0
                    ? project.imagesBase64
                    : project.imageBase64
                      ? [project.imageBase64]
                      : [];

                const coverImage = images[0];

                return (
                  <motion.div
                    key={project.id || project.name}
                    layout
                    className={classes.card}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: EASE_OUT }}
                    onClick={() => handleOpenDetails(project)}
                  >
                    <div className={classes.cardGlow} />
                    <Stack gap="md" className={classes.cardContent}>
                      {/* Cover Image Showcase */}
                      {coverImage && (
                        <div className={classes.imageContainer}>
                          <Image
                            src={coverImage}
                            alt={project.name}
                            className={classes.image}
                          />
                          {images.length > 1 && (
                            <div className={classes.imageCountBadge}>
                              <IconPhoto size={13} />
                              <span>{images.length} Photos</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Header Info: Logo/Icon Tile + Name + Subtitle */}
                      <Group justify="space-between" align="flex-start" wrap="nowrap">
                        <Group gap="sm" wrap="nowrap">
                          {project.logoUrl ? (
                            <div className={classes.logoTile}>
                              <img
                                src={project.logoUrl}
                                alt={project.name}
                                className={classes.logoImage}
                              />
                            </div>
                          ) : (
                            <div className={classes.iconTile}>
                              <Icon size={24} stroke={1.75} />
                            </div>
                          )}

                          <Stack gap={2}>
                            <Group gap="xs" align="center" wrap="nowrap">
                              <Title order={4} className={classes.title}>
                                {project.name}
                              </Title>
                              {project.liveUrl && (
                                <Anchor
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  c="brand.4"
                                  onClick={(e) => e.stopPropagation()}
                                  style={{ display: 'inline-flex', alignItems: 'center' }}
                                  title="Live Demo"
                                >
                                  <IconExternalLink size={16} />
                                </Anchor>
                              )}
                            </Group>
                            <Text className={classes.subtitle}>
                              {project.subtitle}
                            </Text>
                          </Stack>
                        </Group>

                        {project.period && (
                          <span className={classes.period}>
                            {project.period}
                          </span>
                        )}
                      </Group>

                      {/* Description */}
                      <Text className={classes.description}>
                        {project.description}
                      </Text>

                      {/* Key Highlights */}
                      {project.highlights && project.highlights.length > 0 && (
                        <Stack gap={8} className={classes.highlights}>
                          {project.highlights.slice(0, 2).map((point) => (
                            <Group key={point} gap={8} wrap="nowrap" align="flex-start">
                              <span className={classes.checkIcon}>
                                <IconCheck size={12} stroke={3} />
                              </span>
                              <Text size="sm" c="dimmed" style={{ flex: 1, lineHeight: 1.4 }}>
                                {point}
                              </Text>
                            </Group>
                          ))}
                        </Stack>
                      )}

                      {/* Tags & Action Row */}
                      <Stack gap="xs" mt="auto" pt="xs">
                        {project.tags && project.tags.length > 0 && (
                          <Group gap={6}>
                            {project.tags.map((tag) => (
                              <span key={tag} className={classes.tag}>
                                {tag}
                              </span>
                            ))}
                          </Group>
                        )}

                        <div className={classes.cardFooterAction}>
                          <span className={classes.viewDetailsBtn}>
                            View Project Details <IconArrowRight size={14} />
                          </span>
                        </div>
                      </Stack>
                    </Stack>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <Box
              p="xl"
              style={{
                textAlign: 'center',
                backgroundColor: 'rgba(10, 19, 48, 0.4)',
                borderRadius: 16,
                border: '1px dashed rgba(42, 112, 228, 0.3)',
              }}
            >
              <Text size="md" c="white" fw={600}>
                No projects matched your filter &quot;{searchQuery}&quot;
              </Text>
              <Text size="xs" c="dimmed" mt={4}>
                Try clearing the search query or selecting &quot;All Projects&quot;.
              </Text>
            </Box>
          )}
        </AnimatePresence>
      </Stack>

      {/* Interactive Details Modal */}
      <ProjectDetailsModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        project={selectedProject}
      />
    </Section>
  );
}
