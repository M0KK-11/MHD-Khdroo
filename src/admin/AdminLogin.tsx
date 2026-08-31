import React, { useState } from 'react';
import {
  Alert,
  Anchor,
  Box,
  Button,
  Card,
  Container,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { IconAlertCircle, IconLock, IconShieldCheck } from '@tabler/icons-react';
import { auth } from '../firebase';
import { GradientBlobs } from '../components/GradientBlobs';

interface AdminLoginProps {
  onSuccess?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password credentials.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again in a few minutes.');
      } else {
        setError(err.message || 'Failed to authenticate.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#070c1e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflow: 'hidden',
      }}
    >
      <GradientBlobs />

      <Container size="xs" style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 10 }}>
        <Card
          padding="xl"
          radius="xl"
          style={{
            background: 'rgba(10, 19, 48, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(42, 112, 228, 0.35)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(42, 112, 228, 0.25)',
          }}
        >
          <form onSubmit={handleLogin}>
            <Stack gap="lg">
              <Group justify="center">
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 18,
                    background: 'linear-gradient(135deg, #2a70e4 0%, #1b65e2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 10px 25px rgba(42, 112, 228, 0.5)',
                  }}
                >
                  <IconShieldCheck size={34} />
                </div>
              </Group>

              <Stack gap={4} ta="center">
                <Title order={2} c="white" fw={800}>
                  CMS Console Access
                </Title>
                <Text size="sm" c="brand.2">
                  MHD Khdroo Portfolio Control Panel
                </Text>
              </Stack>

              {error && (
                <Alert color="red" variant="light" icon={<IconAlertCircle size={16} />}>
                  {error}
                </Alert>
              )}

              <TextInput
                label="Administrator Email"
                placeholder="mkk11business@gmail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />

              <PasswordInput
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                fullWidth
                loading={loading}
                leftSection={<IconLock size={16} />}
                size="md"
                radius="lg"
                style={{
                  background: 'linear-gradient(120deg, #2a70e4, #1b65e2)',
                  fontWeight: 700,
                  boxShadow: '0 8px 24px -8px rgba(42, 112, 228, 0.65)',
                }}
              >
                Sign In to Console
              </Button>

              <Group justify="space-between" mt="xs">
                <Anchor href="#" size="xs" c="brand.2" underline="hover">
                  &larr; Back to Portfolio Site
                </Anchor>
                <Text size="xs" c="dimmed">
                  Khdroo Cloud Node
                </Text>
              </Group>
            </Stack>
          </form>
        </Card>
      </Container>
    </Box>
  );
};
