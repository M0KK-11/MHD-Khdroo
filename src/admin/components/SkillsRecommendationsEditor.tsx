import React, { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Notification,
  Rating,
  Stack,
  Switch,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import {
  IconBuilding,
  IconCheck,
  IconCode,
  IconDeviceFloppy,
  IconLanguage,
  IconMessage2,
  IconPlus,
  IconStar,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageUploader } from './ImageUploader';
import type { LanguageItem, RecommendationItem, SkillsData } from '../../types/portfolio';
import classes from '../AdminDashboard.module.css';

export const SkillsRecommendationsEditor: React.FC = () => {
  const { data, saveData } = usePortfolio();

  const [coreStack, setCoreStack] = useState<string[]>(data.coreStack || []);
  const [skills, setSkills] = useState<SkillsData>(
    data.skills || { technical: [], soft: [] }
  );
  const [languages, setLanguages] = useState<LanguageItem[]>(data.languages || []);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(
    data.recommendations || []
  );

  const [saving, setSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Language handlers
  const handleAddLanguage = () => {
    setLanguages([...languages, { name: 'German', level: 'Basic' }]);
  };

  const handleLangChange = (index: number, field: keyof LanguageItem, value: string) => {
    const copy = [...languages];
    copy[index] = { ...copy[index], [field]: value };
    setLanguages(copy);
  };

  const handleRemoveLang = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  // Recommendations handlers
  const handleAddRec = () => {
    const newRec: RecommendationItem = {
      id: `rec-${Date.now()}`,
      author: 'Client Name',
      role: 'Engineering Lead',
      company: 'Tech Corp',
      text: 'Mhd is an outstanding Flutter engineer who delivers robust, clean production code.',
      rating: 5,
      hidden: false,
    };
    setRecommendations([...recommendations, newRec]);
  };

  const handleRecChange = (index: number, field: keyof RecommendationItem, value: any) => {
    const copy = [...recommendations];
    copy[index] = { ...copy[index], [field]: value };
    setRecommendations(copy);
  };

  const handleRemoveRec = (index: number) => {
    setRecommendations(recommendations.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveData({
        ...data,
        coreStack,
        skills,
        languages,
        recommendations,
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
            Skills & Recommendations CMS
          </Title>
          <Text size="sm" c="brand.1">
            Manage your core stack tiles, technical & soft skills, spoken languages, and client testimonials.
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
        <Notification icon={<IconCheck size={18} />} color="blue" title="Skills Saved" onClose={() => setShowNotification(false)}>
          Skills & recommendations synced to Firestore document Khdroo/content.
        </Notification>
      )}

      {/* Core Stack Badges */}
      <Card className={classes.glassCard}>
        <Stack gap="md">
          <Title order={4} c="brand.2">
            Core Stack Highlights
          </Title>
          <TextInput
            label="Core Stack Items (comma-separated)"
            description="Featured prominently as primary hero & skills tiles"
            leftSection={<IconCode size={16} />}
            value={coreStack.join(', ')}
            onChange={(e) =>
              setCoreStack(
                e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
              )
            }
          />

          {coreStack.length > 0 && (
            <Group gap="xs" mt={4}>
              <Text size="xs" c="dimmed">Core Stack Preview:</Text>
              {coreStack.map((tech) => (
                <Badge key={tech} size="md" variant="filled" color="brand">
                  {tech}
                </Badge>
              ))}
            </Group>
          )}
        </Stack>
      </Card>

      {/* Technical & Soft Skills */}
      <Card className={classes.glassCard}>
        <Stack gap="md">
          <Title order={4} c="brand.2">
            Skill Categories
          </Title>
          <Grid>
            <Grid.Col span={12}>
              <Textarea
                label="Technical Skills (one skill per line)"
                placeholder="Flutter&#10;Dart&#10;Riverpod&#10;BLoC Architecture (Cubit)&#10;Socket.io&#10;Firebase"
                rows={5}
                value={skills.technical.join('\n')}
                onChange={(e) =>
                  setSkills({
                    ...skills,
                    technical: e.target.value
                      .split('\n')
                      .filter((s) => s.trim() !== ''),
                  })
                }
              />
              {skills.technical.length > 0 && (
                <Group gap={6} mt="xs">
                  {skills.technical.map((sk) => (
                    <Badge key={sk} size="sm" variant="outline" color="brand">
                      {sk}
                    </Badge>
                  ))}
                </Group>
              )}
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                label="Soft Skills (one skill per line)"
                placeholder="Problem-solving&#10;Teamwork & Collaboration&#10;Effective Communication"
                rows={4}
                value={skills.soft.join('\n')}
                onChange={(e) =>
                  setSkills({
                    ...skills,
                    soft: e.target.value
                      .split('\n')
                      .filter((s) => s.trim() !== ''),
                  })
                }
              />
              {skills.soft.length > 0 && (
                <Group gap={6} mt="xs">
                  {skills.soft.map((sk) => (
                    <Badge key={sk} size="sm" variant="light" color="gray">
                      {sk}
                    </Badge>
                  ))}
                </Group>
              )}
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      {/* Spoken Languages */}
      <Card className={classes.glassCard}>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={4} c="brand.2">
              Spoken Languages
            </Title>
            <Button
              size="xs"
              variant="light"
              color="brand"
              leftSection={<IconPlus size={14} />}
              onClick={handleAddLanguage}
            >
              Add Language
            </Button>
          </Group>

          {languages.map((lang, idx) => (
            <Group key={idx} grow align="flex-end">
              <TextInput
                label="Language"
                leftSection={<IconLanguage size={16} />}
                value={lang.name}
                onChange={(e) => handleLangChange(idx, 'name', e.target.value)}
              />
              <TextInput
                label="Proficiency Level (e.g. Native, Fluent)"
                value={lang.level}
                onChange={(e) => handleLangChange(idx, 'level', e.target.value)}
              />
              <ActionIcon color="red" variant="subtle" size="lg" onClick={() => handleRemoveLang(idx)} style={{ flexGrow: 0 }}>
                <IconTrash size={18} />
              </ActionIcon>
            </Group>
          ))}
        </Stack>
      </Card>

      {/* Recommendations & Testimonials */}
      <Card className={classes.glassCard}>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={4} c="brand.2">
              Recommendations & Testimonials
            </Title>
            <Button
              size="xs"
              variant="light"
              color="brand"
              leftSection={<IconPlus size={14} />}
              onClick={handleAddRec}
            >
              Add Testimonial
            </Button>
          </Group>

          {recommendations.map((rec, idx) => (
            <Card key={rec.id || idx} withBorder p="md" bg="rgba(10, 19, 48, 0.6)" radius="md" style={{ border: '1px solid rgba(42, 112, 228, 0.2)' }}>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Group gap="xs">
                    <Text fw={700} c="white">{rec.author || 'Author'}</Text>
                    <Text size="xs" c="dimmed">({rec.role} @ {rec.company})</Text>
                  </Group>
                  <Group gap="xs">
                    <Switch
                      label="Visible"
                      checked={!rec.hidden}
                      onChange={(e) => handleRecChange(idx, 'hidden', !e.currentTarget.checked)}
                      color="brand"
                    />
                    <ActionIcon color="red" variant="subtle" onClick={() => handleRemoveRec(idx)}>
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                </Group>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TextInput
                      label="Author Name"
                      leftSection={<IconUser size={16} />}
                      value={rec.author}
                      onChange={(e) => handleRecChange(idx, 'author', e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TextInput
                      label="Role / Title"
                      leftSection={<IconStar size={16} />}
                      value={rec.role}
                      onChange={(e) => handleRecChange(idx, 'role', e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TextInput
                      label="Company"
                      leftSection={<IconBuilding size={16} />}
                      value={rec.company}
                      onChange={(e) => handleRecChange(idx, 'company', e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <Textarea
                      label="Testimonial Quote"
                      leftSection={<IconMessage2 size={16} />}
                      rows={3}
                      value={rec.text}
                      onChange={(e) => handleRecChange(idx, 'text', e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Text size="sm" fw={600} c="brand.1" mb={4}>Star Rating</Text>
                    <Rating
                      value={rec.rating}
                      onChange={(val) => handleRecChange(idx, 'rating', val)}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <ImageUploader
                      label="Author Avatar (Base64)"
                      value={rec.avatarUrl}
                      onChange={(base64) => handleRecChange(idx, 'avatarUrl', base64)}
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
