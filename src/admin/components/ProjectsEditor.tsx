import React, { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Notification,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import {
  IconArrowDown,
  IconArrowUp,
  IconCalendar,
  IconCategory,
  IconCheck,
  IconCode,
  IconDeviceFloppy,
  IconEye,
  IconEyeOff,
  IconFileText,
  IconFolder,
  IconLink,
  IconListCheck,
  IconPlus,
  IconTag,
  IconTrash,
} from '@tabler/icons-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageUploader } from './ImageUploader';
import type { ProjectItem } from '../../types/portfolio';
import classes from '../AdminDashboard.module.css';

export const ProjectsEditor: React.FC = () => {
  const { data, saveData } = usePortfolio();
  const [projects, setProjects] = useState<ProjectItem[]>(data.projects || []);
  const [saving, setSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleProjectChange = (index: number, field: keyof ProjectItem, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: 'New Mobile App',
      subtitle: 'Flutter Application',
      icon: 'code',
      period: '2026',
      description: 'Detailed description of the new application...',
      highlights: ['Architected scalable BLoC state management', 'Integrated RESTful APIs and Firebase'],
      tags: ['Flutter', 'Dart', 'Firebase'],
      hidden: false,
    };
    setProjects([newProj, ...projects]);
  };

  const handleRemoveProject = (index: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;
    const copy = [...projects];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    setProjects(copy);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveData({
        ...data,
        projects: projects,
      });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={3} c="white">
            Projects CMS
          </Title>
          <Text size="sm" c="brand.1">
            Manage mobile & web projects, technology stack tags, live preview links, and thumbnails.
          </Text>
        </div>
        <Group gap="sm">
          <Button
            variant="light"
            color="brand"
            leftSection={<IconPlus size={16} />}
            onClick={handleAddProject}
            radius="md"
          >
            Add New Project
          </Button>
          <Button
            leftSection={<IconDeviceFloppy size={18} />}
            onClick={handleSave}
            loading={saving}
            variant="gradient"
            gradient={{ from: '#2a70e4', to: '#1b65e2', deg: 120 }}
            size="md"
            radius="lg"
            style={{ boxShadow: '0 8px 24px -8px rgba(42, 112, 228, 0.65)' }}
          >
            Save All Projects
          </Button>
        </Group>
      </Group>

      {showNotification && (
        <Notification icon={<IconCheck size={18} />} color="blue" title="Projects Saved" onClose={() => setShowNotification(false)}>
          Project items updated and synchronized across cloud document Khdroo/content.
        </Notification>
      )}

      {projects.map((project, index) => (
        <Card
          key={project.id || index}
          className={classes.glassCard}
          style={{
            borderLeft: project.hidden
              ? '4px solid #64748b'
              : '4px solid #2a70e4',
            opacity: project.hidden ? 0.75 : 1,
          }}
        >
          <Stack gap="md">
            {/* Header Control Toolbar */}
            <Group justify="space-between" align="center">
              <Group gap="sm">
                <Title order={4} c="white">
                  {project.name || 'Untitled Project'}
                </Title>
                {project.hidden ? (
                  <Badge color="gray" variant="light" leftSection={<IconEyeOff size={12} />}>
                    Hidden / Draft
                  </Badge>
                ) : (
                  <Badge color="blue" variant="light" size="lg" leftSection={<IconEye size={12} />}>
                    Published Live
                  </Badge>
                )}
              </Group>

              <Group gap="xs">
                <ActionIcon
                  size="md"
                  variant="subtle"
                  color="brand"
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                >
                  <IconArrowUp size={18} />
                </ActionIcon>
                <ActionIcon
                  size="md"
                  variant="subtle"
                  color="brand"
                  disabled={index === projects.length - 1}
                  onClick={() => handleMove(index, 'down')}
                >
                  <IconArrowDown size={18} />
                </ActionIcon>
                <Switch
                  label="Visible"
                  checked={!project.hidden}
                  onChange={(e) =>
                    handleProjectChange(index, 'hidden', !e.currentTarget.checked)
                  }
                  color="brand"
                />
                <ActionIcon
                  color="red"
                  variant="subtle"
                  size="md"
                  onClick={() => handleRemoveProject(index)}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            </Group>

            {/* Form Fields Grid */}
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Project Title"
                  placeholder="e.g. Mashena"
                  leftSection={<IconFolder size={16} />}
                  value={project.name}
                  onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Subtitle / Category"
                  placeholder="e.g. Driver Application"
                  leftSection={<IconCategory size={16} />}
                  value={project.subtitle}
                  onChange={(e) => handleProjectChange(index, 'subtitle', e.target.value)}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Select
                  label="Icon Theme"
                  leftSection={<IconCode size={16} />}
                  value={project.icon}
                  data={[
                    { value: 'car', label: 'Car / Driver App' },
                    { value: 'calendar', label: 'Calendar / Service Booking' },
                    { value: 'school', label: 'School / LMS Platform' },
                    { value: 'shopping', label: 'Shopping / E-Commerce' },
                    { value: 'code', label: 'Code / Technical System' },
                  ]}
                  onChange={(val) => handleProjectChange(index, 'icon', val || 'code')}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <TextInput
                  label="Time Period"
                  placeholder="e.g. 03/2026 – 09/2026"
                  leftSection={<IconCalendar size={16} />}
                  value={project.period}
                  onChange={(e) => handleProjectChange(index, 'period', e.target.value)}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <TextInput
                  label="Live Preview / Demo URL"
                  placeholder="https://..."
                  leftSection={<IconLink size={16} />}
                  value={project.liveUrl || ''}
                  onChange={(e) => handleProjectChange(index, 'liveUrl', e.target.value)}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Textarea
                  label="Description"
                  placeholder="Brief overview of the application..."
                  leftSection={<IconFileText size={16} />}
                  rows={3}
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Stack gap="xs">
                  <TextInput
                    label="Technologies Tags (comma-separated)"
                    placeholder="Flutter, BLoC, Socket.io"
                    leftSection={<IconTag size={16} />}
                    value={project.tags ? project.tags.join(', ') : ''}
                    onChange={(e) =>
                      handleProjectChange(
                        index,
                        'tags',
                        e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      )
                    }
                  />
                  {/* Live Visual Tag Pills Preview */}
                  {project.tags && project.tags.length > 0 && (
                    <Group gap="xs" mt={4}>
                      <Text size="xs" c="dimmed">Live Tags Preview:</Text>
                      {project.tags.map((tag) => (
                        <Badge key={tag} size="sm" variant="outline" color="brand">
                          {tag}
                        </Badge>
                      ))}
                    </Group>
                  )}
                </Stack>
              </Grid.Col>

              <Grid.Col span={12}>
                <Stack gap="xs">
                  <Textarea
                    label="Key Highlights (one point per line)"
                    placeholder="Architected responsive UI tailored for usability&#10;Integrated Socket.io real-time connection"
                    leftSection={<IconListCheck size={16} />}
                    rows={4}
                    value={project.highlights ? project.highlights.join('\n') : ''}
                    onChange={(e) =>
                      handleProjectChange(
                        index,
                        'highlights',
                        e.target.value.split('\n').filter((line) => line.trim() !== '')
                      )
                    }
                  />
                </Stack>
              </Grid.Col>

              <Grid.Col span={12}>
                <Group align="flex-start" gap="lg" style={{ paddingTop: 8 }}>
                  <Box style={{ flex: 1 }}>
                    <ImageUploader
                      label="Project Screenshot / Thumbnail (Base64)"
                      value={project.imageBase64}
                      onChange={(base64) => handleProjectChange(index, 'imageBase64', base64)}
                    />
                  </Box>

                  {project.imageBase64 && (
                    <Box style={{ textAlign: 'center' }}>
                      <Text size="xs" c="brand.2" fw={600} mb={4}>Live Thumbnail</Text>
                      <Image
                        src={project.imageBase64}
                        alt="Preview"
                        h={90}
                        w={150}
                        radius="md"
                        style={{ objectFit: 'cover', border: '1px solid rgba(42, 112, 228, 0.3)' }}
                      />
                    </Box>
                  )}
                </Group>
              </Grid.Col>
            </Grid>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};
