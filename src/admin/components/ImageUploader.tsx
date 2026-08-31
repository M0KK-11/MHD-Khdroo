import React, { useRef } from 'react';
import { Button, Group, Image, Text, Stack } from '@mantine/core';
import { IconUpload, IconTrash } from '@tabler/icons-react';

interface ImageUploaderProps {
  label: string;
  value?: string;
  onChange: (base64Url: string) => void;
  maxSizeKb?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  maxSizeKb = 800,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeKb * 1024) {
      alert(`File size exceeds limit (${maxSizeKb} KB). Please choose a smaller image.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Stack gap="xs">
      <Text size="sm" fw={500}>{label}</Text>
      <Group align="center" gap="md">
        {value ? (
          <Image
            src={value}
            alt="Preview"
            w={64}
            h={64}
            radius="md"
            style={{ objectFit: 'cover', border: '1px solid var(--mantine-color-dark-4)' }}
          />
        ) : (
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 8,
              border: '2px dashed var(--mantine-color-dark-3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--mantine-color-dimmed)',
              fontSize: 12,
            }}
          >
            No image
          </div>
        )}

        <Group gap="xs">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <Button
            size="xs"
            variant="light"
            leftSection={<IconUpload size={14} />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload
          </Button>
          {value && (
            <Button
              size="xs"
              color="red"
              variant="subtle"
              leftSection={<IconTrash size={14} />}
              onClick={() => onChange('')}
            >
              Remove
            </Button>
          )}
        </Group>
      </Group>
    </Stack>
  );
};
