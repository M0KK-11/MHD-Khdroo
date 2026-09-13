import React, { useState, useEffect } from 'react';
import {
  Modal,
  Image,
  Group,
  Stack,
  Text,
  Title,
  Badge,
  ActionIcon,
  Button,
  Box,
  ScrollArea,
} from '@mantine/core';
import {
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
  IconCheck,
  IconBrandGithub,
  IconCar,
  IconCalendarEvent,
  IconSchool,
  IconShoppingBag,
  IconCode,
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectItem } from '../types/portfolio';

const iconMap: Record<string, React.ComponentType<{ size?: number; stroke?: number }>> = {
  car: IconCar,
  calendar: IconCalendarEvent,
  school: IconSchool,
  shopping: IconShoppingBag,
  code: IconCode,
};

interface ProjectDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  project: ProjectItem | null;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  opened,
  onClose,
  project,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  if (!project) return null;

  const images: string[] =
    project.imagesBase64 && project.imagesBase64.length > 0
      ? project.imagesBase64
      : project.imageBase64
      ? [project.imageBase64]
      : [];

  const Icon = iconMap[project.icon] || IconCode;

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="52rem"
      radius="xl"
      centered
      padding="0"
      withCloseButton={false}
      styles={{
        content: {
          backgroundColor: '#09122c',
          color: '#ffffff',
          border: '1px solid rgba(42, 112, 228, 0.35)',
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(42, 112, 228, 0.25)',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
        },
        body: {
          padding: 0,
        },
      }}
    >
      <Box style={{ position: 'relative' }}>
        {/* Custom Floating Close Button */}
        <ActionIcon
          onClick={onClose}
          size="lg"
          radius="xl"
          variant="filled"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 100,
            backgroundColor: 'rgba(10, 19, 48, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
          }}
        >
          ✕
        </ActionIcon>

        {/* Gallery / Image Showcase Section */}
        {images.length > 0 && (
          <Box
            style={{
              position: 'relative',
              backgroundColor: '#040918',
              borderBottom: '1px solid rgba(42, 112, 228, 0.2)',
              overflow: 'hidden',
            }}
          >
            <Box
              style={{
                height: 380,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={images[activeImageIndex]}
                  alt={`${project.name} slide ${activeImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: 12,
                  }}
                />
              </AnimatePresence>

              {/* Prev / Next Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <ActionIcon
                    onClick={handlePrev}
                    size="xl"
                    radius="xl"
                    variant="filled"
                    style={{
                      position: 'absolute',
                      left: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(10, 19, 48, 0.8)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(42, 112, 228, 0.3)',
                      color: '#ffffff',
                    }}
                  >
                    <IconChevronLeft size={24} />
                  </ActionIcon>

                  <ActionIcon
                    onClick={handleNext}
                    size="xl"
                    radius="xl"
                    variant="filled"
                    style={{
                      position: 'absolute',
                      right: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(10, 19, 48, 0.8)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(42, 112, 228, 0.3)',
                      color: '#ffffff',
                    }}
                  >
                    <IconChevronRight size={24} />
                  </ActionIcon>

                  {/* Image counter pill */}
                  <Badge
                    size="md"
                    variant="filled"
                    style={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      backgroundColor: 'rgba(10, 19, 48, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(42, 112, 228, 0.3)',
                      color: '#9fc0f5',
                    }}
                  >
                    {activeImageIndex + 1} / {images.length}
                  </Badge>
                </>
              )}
            </Box>

            {/* Thumbnail Selector Row */}
            {images.length > 1 && (
              <Group
                gap="xs"
                p="sm"
                justify="center"
                style={{
                  backgroundColor: 'rgba(6, 13, 33, 0.9)',
                  borderTop: '1px solid rgba(42, 112, 228, 0.15)',
                  overflowX: 'auto',
                }}
              >
                {images.map((img, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: 64,
                      height: 44,
                      borderRadius: 8,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border:
                        activeImageIndex === idx
                          ? '2px solid #2a70e4'
                          : '1px solid rgba(255, 255, 255, 0.15)',
                      opacity: activeImageIndex === idx ? 1 : 0.6,
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                  >
                    <Image src={img} h={44} w={64} fit="cover" alt={`Thumb ${idx + 1}`} />
                  </Box>
                ))}
              </Group>
            )}
          </Box>
        )}

        {/* Modal Main Content Container */}
        <ScrollArea.Autosize maxHeight="calc(85vh - 380px)" p="xl">
          <Stack gap="lg">
            {/* Header Meta: Logo/Icon + Title + Subtitle + Period */}
            <Group justify="space-between" align="flex-start" wrap="nowrap">
              <Group gap="md" wrap="nowrap">
                {project.logoUrl ? (
                  <Box
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 16,
                      padding: 6,
                      background: 'rgba(10, 19, 48, 0.9)',
                      border: '1px solid rgba(42, 112, 228, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                      flexShrink: 0,
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={project.logoUrl}
                      alt={project.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }}
                    />
                  </Box>
                ) : (
                  <Box
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: 'linear-gradient(135deg, #2a70e4, #0d53c9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow: '0 8px 20px rgba(42, 112, 228, 0.4)',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={28} stroke={1.75} />
                  </Box>
                )}

                <Stack gap={2}>
                  <Title order={3} style={{ color: '#ffffff', fontSize: 22, fontWeight: 700 }}>
                    {project.name}
                  </Title>
                  <Text size="sm" fw={600} style={{ color: '#6c9eee' }}>
                    {project.subtitle}
                  </Text>
                </Stack>
              </Group>

              {project.period && (
                <Badge
                  variant="outline"
                  color="blue"
                  size="lg"
                  radius="md"
                  style={{
                    borderColor: 'rgba(42, 112, 228, 0.4)',
                    color: '#9fc0f5',
                    backgroundColor: 'rgba(42, 112, 228, 0.1)',
                  }}
                >
                  {project.period}
                </Badge>
              )}
            </Group>

            {/* Project Overview Description */}
            <Text size="md" style={{ color: '#c3d6f7', lineHeight: 1.65 }}>
              {project.description}
            </Text>

            {/* Highlights List */}
            {project.highlights && project.highlights.length > 0 && (
              <Stack gap="xs">
                <Text size="sm" fw={700} style={{ color: '#ffffff', letterSpacing: '0.02em' }}>
                  Key Achievements & Features
                </Text>
                <Stack gap={10}>
                  {project.highlights.map((point, i) => (
                    <Group key={i} gap="sm" wrap="nowrap" align="flex-start">
                      <Box
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(42, 112, 228, 0.25)',
                          border: '1px solid rgba(42, 112, 228, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#4382e8',
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        <IconCheck size={14} stroke={3} />
                      </Box>
                      <Text size="sm" style={{ color: '#d8e5fc', flex: 1, lineHeight: 1.5 }}>
                        {point}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            )}

            {/* Technology Stack Tags */}
            {project.tags && project.tags.length > 0 && (
              <Stack gap="xs">
                <Text size="sm" fw={700} style={{ color: '#ffffff', letterSpacing: '0.02em' }}>
                  Technologies & Tools
                </Text>
                <Group gap="xs" wrap="wrap">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      size="md"
                      radius="xl"
                      style={{
                        backgroundColor: 'rgba(42, 112, 228, 0.15)',
                        color: '#9fc0f5',
                        border: '1px solid rgba(42, 112, 228, 0.35)',
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: '6px 14px',
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </Group>
              </Stack>
            )}

            {/* Action Buttons Footer */}
            <Group justify="flex-end" gap="sm" mt="md" pt="md" style={{ borderTop: '1px solid rgba(42, 112, 228, 0.2)' }}>
              {project.githubUrl && (
                <Button
                  component="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="default"
                  radius="md"
                  leftSection={<IconBrandGithub size={18} />}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                  }}
                >
                  GitHub Repository
                </Button>
              )}

              {project.liveUrl && (
                <Button
                  component="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gradient"
                  gradient={{ from: '#2a70e4', to: '#1b65e2', deg: 120 }}
                  radius="md"
                  leftSection={<IconExternalLink size={18} />}
                  style={{
                    boxShadow: '0 8px 20px -6px rgba(42, 112, 228, 0.6)',
                  }}
                >
                  Live Preview / Demo
                </Button>
              )}
            </Group>
          </Stack>
        </ScrollArea.Autosize>
      </Box>
    </Modal>
  );
};
