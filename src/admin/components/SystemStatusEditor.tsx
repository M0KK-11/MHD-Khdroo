import React, { useRef, useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Code,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconCheck,
  IconCloudUpload,
  IconDownload,
  IconInfoCircle,
  IconRefresh,
  IconServer,
  IconUpload,
  IconWifi,
} from '@tabler/icons-react';
import { usePortfolio } from '../../context/PortfolioContext';
import classes from '../AdminDashboard.module.css';

export const SystemStatusEditor: React.FC = () => {
  const { status, data, saveData, exportJSON, importJSON, resetToSeed } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pushing, setPushing] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handlePushToFirestore = async () => {
    setPushing(true);
    setMessage(null);
    try {
      await saveData(data);
      setMessage({
        type: 'success',
        text: '✅ Successfully created/pushed collection "Khdroo" and document "content" to Firestore!',
      });
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: `❌ Firebase Error: ${err.message || err}. Ensure your Firebase Firestore Security Rules allow write access!`,
      });
    } finally {
      setPushing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        const success = await importJSON(content);
        if (success) {
          setMessage({ type: 'success', text: 'Portfolio data imported successfully!' });
        } else {
          setMessage({ type: 'error', text: 'Failed to parse or import JSON file. Please check file format.' });
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all portfolio data back to default seed state? This will overwrite your current Firestore document.')) {
      setResetting(true);
      try {
        await resetToSeed();
        setMessage({ type: 'success', text: 'Database reset to default seed data successfully!' });
      } catch (err) {
        setMessage({ type: 'error', text: `Reset failed: ${err}` });
      } finally {
        setResetting(false);
      }
    }
  };

  const jsonSnippet = JSON.stringify(data, null, 2).slice(0, 500) + '\n... [truncated]';

  return (
    <Stack gap="lg">
      <div>
        <Title order={3} c="white">
          System Status & Firestore Data Tools
        </Title>
        <Text size="sm" c="brand.1">
          Monitor database node health, initialize Firestore collection Khdroo, or export/import JSON backups.
        </Text>
      </div>

      {message && (
        <Alert color={message.type === 'success' ? 'teal' : 'red'} icon={<IconCheck size={16} />}>
          {message.text}
        </Alert>
      )}

      {/* Initialize Collection Action Card */}
      <Card className={classes.glassCard} style={{ borderLeft: '4px solid #2a70e4' }}>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <IconCloudUpload size={24} color="#6c9eee" />
              <div>
                <Title order={4} c="white">
                  Push & Initialize Firestore Collection `Khdroo`
                </Title>
                <Text size="xs" c="brand.1">
                  Click to write the complete portfolio payload directly to `Khdroo/content`.
                </Text>
              </div>
            </Group>

            <Button
              leftSection={<IconCloudUpload size={18} />}
              onClick={handlePushToFirestore}
              loading={pushing}
              variant="gradient"
              gradient={{ from: '#2a70e4', to: '#1b65e2', deg: 120 }}
              size="md"
              radius="lg"
            >
              Push Collection Now
            </Button>
          </Group>

          <Alert color="blue" variant="light" icon={<IconInfoCircle size={18} />}>
            <Text size="xs" style={{ lineHeight: 1.6 }}>
              <strong>Firebase Console Tip:</strong> In Firestore Database, collections only appear after the first write operation. If clicking &quot;Push Collection Now&quot; shows a rules error, ensure your <strong>Firestore Security Rules</strong> in Firebase Console are set to:
              <br />
              <Code color="blue" mt={4} style={{ display: 'inline-block' }}>
                match /Khdroo/content &#123; allow read, write: if true; &#125;
              </Code>
            </Text>
          </Alert>
        </Stack>
      </Card>

      {/* Connectivity & Node Status */}
      <Card className={classes.glassCard}>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <IconServer size={22} color="#6c9eee" />
              <Title order={4} c="brand.2">
                Firestore Database Target
              </Title>
            </Group>

            {status === 'synced' ? (
              <Badge color="blue" size="lg" variant="light" leftSection={<IconWifi size={14} />}>
                Live Synced
              </Badge>
            ) : (
              <Badge color="amber" size="lg" variant="light">
                Connecting...
              </Badge>
            )}
          </Group>

          <Group justify="space-between" align="center">
            <Text size="sm" c="gray.3">Firestore Collection Target:</Text>
            <Code fw={700} color="blue">Khdroo</Code>
          </Group>

          <Group justify="space-between" align="center">
            <Text size="sm" c="gray.3">Document Target:</Text>
            <Code fw={700} color="blue">content</Code>
          </Group>

          <Group justify="space-between" align="center">
            <Text size="sm" c="gray.3">Last Sync Timestamp:</Text>
            <Text size="sm" fw={600} c="white">
              {data.updatedAt ? new Date(data.updatedAt).toLocaleString() : 'Initial Seed Active'}
            </Text>
          </Group>
        </Stack>
      </Card>

      {/* Data Backup & Restore */}
      <Card className={classes.glassCard}>
        <Stack gap="md">
          <Title order={4} c="brand.2">
            Data Export & Import (JSON Snapshot)
          </Title>
          <Text size="sm" c="dimmed">
            Download your portfolio state as a JSON file or restore from a saved JSON backup.
          </Text>

          <Group gap="md">
            <Button
              leftSection={<IconDownload size={16} />}
              onClick={exportJSON}
              variant="gradient"
              gradient={{ from: '#2a70e4', to: '#1b65e2' }}
            >
              Export JSON Backup
            </Button>

            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <Button
              leftSection={<IconUpload size={16} />}
              variant="outline"
              color="brand"
              onClick={() => fileInputRef.current?.click()}
            >
              Import JSON File
            </Button>
          </Group>

          <Box mt="xs">
            <Text size="xs" c="dimmed" mb={4}>Live JSON Data Snapshot Preview:</Text>
            <Code block style={{ maxHeight: 180, overflowY: 'auto', backgroundColor: '#070c1e', borderRadius: 8 }}>
              {jsonSnippet}
            </Code>
          </Box>
        </Stack>
      </Card>

      {/* Database Seeding Danger Zone */}
      <Card className={classes.glassCard} style={{ borderLeft: '4px solid #ef4444' }}>
        <Stack gap="sm">
          <Title order={4} c="red.4">
            Danger Zone — Reset Database
          </Title>
          <Text size="sm" c="dimmed">
            Resets all portfolio sections back to default seed data in Firestore (`Khdroo/content`) and local cache.
          </Text>
          <Group>
            <Button
              color="red"
              variant="light"
              leftSection={<IconRefresh size={16} />}
              onClick={handleReset}
              loading={resetting}
            >
              Reset to Default Seed Data
            </Button>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
};
