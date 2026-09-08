import React, { useState } from 'react';
import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Group,
  Notification,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import {
  IconBriefcase,
  IconBuilding,
  IconCalendar,
  IconCheck,
  IconDeviceFloppy,
  IconListCheck,
  IconMapPin,
  IconPlus,
  IconSchool,
  IconTrash,
} from '@tabler/icons-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { EducationItem, ExperienceItem } from '../../types/portfolio';
import classes from '../AdminDashboard.module.css';

export const ExperienceEditor: React.FC = () => {
  const { data, saveData } = usePortfolio();
  const [experience, setExperience] = useState<ExperienceItem[]>(data.experience || []);
  const [education, setEducation] = useState<EducationItem[]>(data.education || []);
  const [saving, setSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Experience handlers
  const handleExpChange = (index: number, field: keyof ExperienceItem, value: any) => {
    const copy = [...experience];
    copy[index] = { ...copy[index], [field]: value };
    setExperience(copy);
  };

  const handleAddExp = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Flutter Developer',
      company: 'Company Name',
      location: 'Damascus, Syria',
      period: '2026 – Present',
      highlights: ['Develop and maintain mobile apps using Flutter and Dart.'],
    };
    setExperience([...experience, newExp]);
  };

  const handleRemoveExp = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  // Education handlers
  const handleEduChange = (index: number, field: keyof EducationItem, value: any) => {
    const copy = [...education];
    copy[index] = { ...copy[index], [field]: value };
    setEducation(copy);
  };

  const handleAddEdu = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'Information Technology Engineering',
      school: 'Damascus University',
      period: '2021 – 2026',
    };
    setEducation([...education, newEdu]);
  };

  const handleRemoveEdu = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveData({
        ...data,
        experience,
        education,
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
            Experience & Education CMS
          </Title>
          <Text size="sm" c="brand.1">
            Manage work history positions, responsibilities, and academic qualifications.
          </Text>
        </div>
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
          Save All Changes
        </Button>
      </Group>

      {showNotification && (
        <Notification icon={<IconCheck size={18} />} color="blue" title="Timeline Saved" onClose={() => setShowNotification(false)}>
          Experience and Education timeline saved and synced to Firestore document Khdroo/content.
        </Notification>
      )}

      {/* Work Experience Section */}
      <Card className={classes.glassCard}>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={4} c="brand.2">
              Work Experience Positions
            </Title>
            <Button
              size="xs"
              variant="light"
              color="brand"
              leftSection={<IconPlus size={14} />}
              onClick={handleAddExp}
            >
              Add Position
            </Button>
          </Group>

          {experience.map((exp, idx) => (
            <Card key={exp.id || idx} withBorder p="md" bg="rgba(10, 19, 48, 0.6)" radius="md" style={{ border: '1px solid rgba(42, 112, 228, 0.2)' }}>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Text fw={700} c="white">
                    {exp.role || 'Position'} @ {exp.company || 'Company'}
                  </Text>
                  <ActionIcon color="red" variant="subtle" onClick={() => handleRemoveExp(idx)}>
                    <IconTrash size={18} />
                  </ActionIcon>
                </Group>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Job Role / Title"
                      leftSection={<IconBriefcase size={16} />}
                      value={exp.role}
                      onChange={(e) => handleExpChange(idx, 'role', e.target.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Company Name"
                      leftSection={<IconBuilding size={16} />}
                      value={exp.company}
                      onChange={(e) => handleExpChange(idx, 'company', e.target.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Location"
                      leftSection={<IconMapPin size={16} />}
                      value={exp.location}
                      onChange={(e) => handleExpChange(idx, 'location', e.target.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Time Period"
                      leftSection={<IconCalendar size={16} />}
                      value={exp.period}
                      onChange={(e) => handleExpChange(idx, 'period', e.target.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Textarea
                      label="Key Responsibilities (one point per line)"
                      leftSection={<IconListCheck size={16} />}
                      rows={3}
                      value={exp.highlights ? exp.highlights.join('\n') : ''}
                      onChange={(e) =>
                        handleExpChange(
                          idx,
                          'highlights',
                          e.target.value.split('\n').filter((l) => l.trim() !== '')
                        )
                      }
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Card>

      {/* Education Section */}
      <Card className={classes.glassCard}>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={4} c="brand.2">
              Education & Qualifications
            </Title>
            <Button
              size="xs"
              variant="light"
              color="brand"
              leftSection={<IconPlus size={14} />}
              onClick={handleAddEdu}
            >
              Add Education
            </Button>
          </Group>

          {education.map((edu, idx) => (
            <Card key={edu.id || idx} withBorder p="md" bg="rgba(10, 19, 48, 0.6)" radius="md" style={{ border: '1px solid rgba(42, 112, 228, 0.2)' }}>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Text fw={700} c="white">
                    {edu.degree} — {edu.school}
                  </Text>
                  <ActionIcon color="red" variant="subtle" onClick={() => handleRemoveEdu(idx)}>
                    <IconTrash size={18} />
                  </ActionIcon>
                </Group>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 5 }}>
                    <TextInput
                      label="Degree / Major"
                      leftSection={<IconSchool size={16} />}
                      value={edu.degree}
                      onChange={(e) => handleEduChange(idx, 'degree', e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TextInput
                      label="University / Institution"
                      leftSection={<IconBuilding size={16} />}
                      value={edu.school}
                      onChange={(e) => handleEduChange(idx, 'school', e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 3 }}>
                    <TextInput
                      label="Period / Years"
                      leftSection={<IconCalendar size={16} />}
                      value={edu.period || ''}
                      onChange={(e) => handleEduChange(idx, 'period', e.target.value)}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Card>
    </Stack>
  );
};
