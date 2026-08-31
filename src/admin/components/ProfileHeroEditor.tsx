import React, { useState } from 'react';
import {
  ActionIcon,
  Avatar,
  Badge,
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
import { IconCheck, IconDeviceFloppy, IconPlus, IconTrash } from '@tabler/icons-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageUploader } from './ImageUploader';
import type { HeroStat, SiteConfig } from '../../types/portfolio';
import classes from '../AdminDashboard.module.css';

export const ProfileHeroEditor: React.FC = () => {
  const { data, saveData } = usePortfolio();
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(data.siteConfig);
  const [summary, setSummary] = useState<string>(data.summary || data.siteConfig.summary);
  const [heroStats, setHeroStats] = useState<HeroStat[]>(data.heroStats || []);
  const [saving, setSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleStatChange = (index: number, field: keyof HeroStat, value: string) => {
    const updated = [...heroStats];
    updated[index] = { ...updated[index], [field]: value };
    setHeroStats(updated);
  };

  const handleAddStat = () => {
    setHeroStats([...heroStats, { value: '1+', label: 'New Metric' }]);
  };

  const handleRemoveStat = (index: number) => {
    setHeroStats(heroStats.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveData({
        ...data,
        siteConfig: {
          ...siteConfig,
          summary: summary,
        },
        summary: summary,
        heroStats: heroStats,
      });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const initials = siteConfig.name
    ? siteConfig.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
    : 'MK';

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={3} c="white">
            Profile & Hero Details
          </Title>
          <Text size="sm" c="brand.1">
            Manage personal identity, bio, avatar image, and hero statistics badges.
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
        <Notification icon={<IconCheck size={18} />} color="blue" title="Realtime Firestore Synced" onClose={() => setShowNotification(false)}>
          Profile & Hero data synchronized across cloud document Khdroo/content.
        </Notification>
      )}

      <Grid  >
        {/* Input Controls Column */}
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Stack gap="lg">
            {/* Identity Form */}
            <Card className={classes.glassCard}>
              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <Title order={4} c="brand.2">
                    Personal Identity
                  </Title>
                  <Badge color="brand" variant="light" size="lg">
                    Hero Badge
                  </Badge>
                </Group>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Full Name"
                      value={siteConfig.name}
                      onChange={(e) => setSiteConfig({ ...siteConfig, name: e.target.value })}
                      required
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Professional Role / Badge Title"
                      value={siteConfig.role}
                      onChange={(e) => setSiteConfig({ ...siteConfig, role: e.target.value })}
                      required
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <TextInput
                      label="Hero Headline / Tagline"
                      value={siteConfig.tagline}
                      onChange={(e) => setSiteConfig({ ...siteConfig, tagline: e.target.value })}
                      required
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <Textarea
                      label="About Me / Professional Summary"
                      rows={4}
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      required
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <ImageUploader
                      label="Profile Picture / Avatar Image (Base64)"
                      value={siteConfig.avatarUrl}
                      onChange={(url) => setSiteConfig({ ...siteConfig, avatarUrl: url })}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>

            {/* Contact & Social Links */}
            <Card className={classes.glassCard}>
              <Stack gap="md">
                <Title order={4} c="brand.2">
                  Contact & Links
                </Title>
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Email Address"
                      value={siteConfig.email}
                      onChange={(e) => setSiteConfig({ ...siteConfig, email: e.target.value })}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Phone Number"
                      value={siteConfig.phone}
                      onChange={(e) => setSiteConfig({ ...siteConfig, phone: e.target.value })}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <TextInput
                      label="Location"
                      value={siteConfig.location}
                      onChange={(e) => setSiteConfig({ ...siteConfig, location: e.target.value })}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <TextInput
                      label="CV / Resume Document URL"
                      value={siteConfig.resumeUrl}
                      onChange={(e) => setSiteConfig({ ...siteConfig, resumeUrl: e.target.value })}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TextInput
                      label="GitHub"
                      value={siteConfig.socials?.github || ''}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          socials: { ...siteConfig.socials, github: e.target.value },
                        })
                      }
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TextInput
                      label="LinkedIn"
                      value={siteConfig.socials?.linkedin || ''}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          socials: { ...siteConfig.socials, linkedin: e.target.value },
                        })
                      }
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TextInput
                      label="Twitter / X"
                      value={siteConfig.socials?.twitter || ''}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          socials: { ...siteConfig.socials, twitter: e.target.value },
                        })
                      }
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>

            {/* Hero Stats */}
            <Card className={classes.glassCard}>
              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <Title order={4} c="brand.2">
                    Hero Statistics Badges
                  </Title>
                  <Button
                    size="xs"
                    variant="light"
                    color="brand"
                    leftSection={<IconPlus size={14} />}
                    onClick={handleAddStat}
                  >
                    Add Stat
                  </Button>
                </Group>

                {heroStats.map((stat, idx) => (
                  <Group key={idx} grow align="flex-end">
                    <TextInput
                      label="Value (e.g. 4+)"
                      value={stat.value}
                      onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                    />
                    <TextInput
                      label="Label (e.g. Apps shipped)"
                      value={stat.label}
                      onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                    />
                    <ActionIcon
                      color="red"
                      variant="subtle"
                      size="lg"
                      onClick={() => handleRemoveStat(idx)}
                      style={{ flexGrow: 0 }}
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>

        {/* Live Hero Card Preview (Matches Portfolio Site exactly) */}
        <Grid.Col span={{ base: 12, lg: 5 }}>
          <div className={classes.livePreviewFrame}>
            <Text size="xs" fw={700} c="brand.3" tt="uppercase" lts={1} mb="lg">
              Live Hero Preview Card
            </Text>

            <Group justify="center" mb="lg">
              <div style={{ position: 'relative', width: 90, height: 90 }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: -8,
                    borderRadius: '50%',
                    border: '2px solid #2a70e4',
                  }}
                />
                <Avatar
                  src={siteConfig.avatarUrl}
                  alt={siteConfig.name}
                  size={90}
                  radius="100%"
                  style={{
                    background: 'linear-gradient(135deg, #2a70e4, #3d5386)',
                    boxShadow: '0 12px 32px -8px rgba(42, 112, 228, 0.55)',
                    fontWeight: 800,
                    fontSize: '1.6rem',
                    color: 'white',
                  }}
                >
                  {initials}
                </Avatar>
              </div>
            </Group>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                color: '#cfe0fc',
                background: 'rgba(42, 112, 228, 0.14)',
                border: '1px solid rgba(42, 112, 228, 0.35)',
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#2a70e4',
                  boxShadow: '0 0 8px 1px #2a70e4',
                }}
              />
              {siteConfig.role || 'Flutter Developer'}
            </div>

            <Title order={2} c="white" mb={4}>
              Hi, I&apos;m{' '}
              <span
                style={{
                  background: 'linear-gradient(100deg, #2a70e4 10%, #6c9eee 50%, #4382e8 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 800,
                }}
              >
                {siteConfig.name || 'Mhd Khair Khdroo'}
              </span>
            </Title>

            <Text size="sm" c="dimmed" mb="lg">
              {siteConfig.tagline || 'Hero tagline preview...'}
            </Text>

            <Text size="xs" c="gray.3" style={{ fontStyle: 'italic', lineHeight: 1.6 }} mb="xl">
              &ldquo;{summary.slice(0, 160)}...&rdquo;
            </Text>

            <Group justify="center" gap="lg" pt="md" style={{ borderTop: '1px solid rgba(42, 112, 228, 0.2)' }}>
              {heroStats.map((stat, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <Text
                    fw={900}
                    size="xl"
                    style={{
                      background: 'linear-gradient(100deg, #2a70e4, #6c9eee)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    {stat.value}
                  </Text>
                  <Text size="11px" c="dimmed">
                    {stat.label}
                  </Text>
                </div>
              ))}
            </Group>
          </div>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
