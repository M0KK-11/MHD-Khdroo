import React, { useRef, useState } from 'react';
import {
  Button,
  Group,
  Image,
  Text,
  Stack,
  ActionIcon,
  Badge,
  Box,
  SimpleGrid,
  Card,
  Tooltip,
} from '@mantine/core';
import {
  IconUpload,
  IconTrash,
  IconPhoto,
  IconArrowLeft,
  IconArrowRight,
  IconStar,
  IconPlus,
} from '@tabler/icons-react';
import { supabase } from '../../supabase';

interface MultiImageUploaderProps {
  label?: string;
  values?: string[];
  onChange: (urls: string[]) => void;
  maxSizeKb?: number;
}

export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  label = 'Project Gallery Screenshots',
  values = [],
  onChange,
  maxSizeKb = 10240,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  const uploadSingleFile = async (file: File): Promise<string> => {
    // Try Supabase Storage upload
    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${cleanFileName}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from('app-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (!error && data?.path) {
        const { data: publicUrlData } = supabase.storage
          .from('app-images')
          .getPublicUrl(data.path);

        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    } catch (e) {
      console.warn('Supabase storage upload failed, falling back to Base64:', e);
    }

    // Fallback: Read as Base64 Data URL so upload NEVER fails
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image to base64'));
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Filter oversized files
    const validFiles = files.filter((file) => {
      if (file.size > maxSizeKb * 1024) {
        alert(`File "${file.name}" exceeds limit (${Math.round(maxSizeKb / 1024)} MB) and was skipped.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setUploading(true);
    setUploadProgress(`Processing 0/${validFiles.length} images...`);

    const newUrls: string[] = [];

    for (let i = 0; i < validFiles.length; i++) {
      setUploadProgress(`Uploading ${i + 1}/${validFiles.length}: ${validFiles[i].name}`);
      try {
        const url = await uploadSingleFile(validFiles[i]);
        if (url) newUrls.push(url);
      } catch (err) {
        console.error(`Error uploading ${validFiles[i].name}:`, err);
      }
    }

    setUploading(false);
    setUploadProgress('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (newUrls.length > 0) {
      onChange([...values, ...newUrls]);
    }
  };

  const handleRemove = (index: number) => {
    const updated = values.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    const target = values[index];
    const remaining = values.filter((_, i) => i !== index);
    onChange([target, ...remaining]);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= values.length) return;
    const copy = [...values];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    onChange(copy);
  };

  return (
    <Stack gap="xs">
      <Group justify="space-between" align="center">
        <Group gap="xs">
          <IconPhoto size={18} style={{ color: '#2a70e4' }} />
          <Text size="sm" fw={600} c="white">
            {label} ({values.length} {values.length === 1 ? 'image' : 'images'})
          </Text>
        </Group>

        <Group gap="xs">
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleFilesChange}
            style={{ display: 'none' }}
          />

          <Button
            size="xs"
            variant="gradient"
            gradient={{ from: '#2a70e4', to: '#1b65e2', deg: 120 }}
            loading={uploading}
            leftSection={!uploading && <IconPlus size={14} />}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? uploadProgress || 'Uploading...' : 'Select & Add Multiple Images'}
          </Button>
        </Group>
      </Group>

      {/* Grid of uploaded thumbnails */}
      {values.length > 0 ? (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="xs" mt="xs">
          {values.map((url, idx) => (
            <Card
              key={idx}
              p={4}
              radius="md"
              style={{
                position: 'relative',
                background: 'rgba(10, 20, 50, 0.6)',
                border: idx === 0 ? '2px solid #2a70e4' : '1px solid rgba(255, 255, 255, 0.12)',
                overflow: 'hidden',
              }}
            >
              <Box style={{ position: 'relative', height: 110, borderRadius: 6, overflow: 'hidden' }}>
                <Image src={url} alt={`Screenshot ${idx + 1}`} h={110} fit="cover" />

                {idx === 0 ? (
                  <Badge
                    size="xs"
                    color="blue"
                    variant="filled"
                    style={{ position: 'absolute', top: 4, left: 4, zIndex: 2 }}
                  >
                    Main Cover
                  </Badge>
                ) : (
                  <Tooltip label="Set as Main Cover Image">
                    <ActionIcon
                      size="xs"
                      color="blue"
                      variant="filled"
                      style={{ position: 'absolute', top: 4, left: 4, zIndex: 2 }}
                      onClick={() => handleSetCover(idx)}
                    >
                      <IconStar size={12} />
                    </ActionIcon>
                  </Tooltip>
                )}

                <ActionIcon
                  size="xs"
                  color="red"
                  variant="filled"
                  style={{ position: 'absolute', top: 4, right: 4, zIndex: 2 }}
                  onClick={() => handleRemove(idx)}
                >
                  <IconTrash size={12} />
                </ActionIcon>
              </Box>

              {/* Reordering toolbar */}
              <Group justify="space-between" align="center" mt={4} px={2}>
                <Text size="10px" c="dimmed" fw={600}>
                  #{idx + 1}
                </Text>

                <Group gap={2}>
                  <ActionIcon
                    size="xs"
                    variant="subtle"
                    color="brand"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'left')}
                  >
                    <IconArrowLeft size={12} />
                  </ActionIcon>
                  <ActionIcon
                    size="xs"
                    variant="subtle"
                    color="brand"
                    disabled={idx === values.length - 1}
                    onClick={() => handleMove(idx, 'right')}
                  >
                    <IconArrowRight size={12} />
                  </ActionIcon>
                </Group>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Box
          p="lg"
          style={{
            border: '2px dashed rgba(42, 112, 228, 0.3)',
            borderRadius: 12,
            textAlign: 'center',
            backgroundColor: 'rgba(10, 20, 50, 0.3)',
            cursor: 'pointer',
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <IconUpload size={28} style={{ color: '#4382e8', marginBottom: 8 }} />
          <Text size="sm" c="white" fw={600}>
            No gallery screenshots added yet
          </Text>
          <Text size="xs" c="dimmed" mt={4}>
            Click here to select multiple images from your device (PNG, JPG, WEBP)
          </Text>
        </Box>
      )}
    </Stack>
  );
};
