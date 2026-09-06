import React, { useRef, useState } from 'react';
import { Button, Group, Image, Text, Stack } from '@mantine/core';
import { IconUpload, IconTrash } from '@tabler/icons-react';
import { supabase } from '../../supabase';

interface ImageUploaderProps {
  label: string;
  value?: string;
  onChange: (publicUrl: string) => void;
  maxSizeKb?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  maxSizeKb = 5120,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeKb * 1024) {
      alert(`File size exceeds limit (${Math.round(maxSizeKb / 1024)} MB). Please choose a smaller image.`);
      return;
    }

    setUploading(true);

    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${Date.now()}_${cleanFileName}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from('app-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.error('Supabase image upload error:', error);
        alert(`Failed to upload image to Supabase: ${error.message}`);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('app-images')
        .getPublicUrl(data.path);

      if (publicUrlData?.publicUrl) {
        onChange(publicUrlData.publicUrl);
      }
    } catch (err: any) {
      console.error('Image upload exception:', err);
      alert(`Image upload failed: ${err.message || err}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
            loading={uploading}
            leftSection={!uploading && <IconUpload size={14} />}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
          {value && (
            <Button
              size="xs"
              color="red"
              variant="subtle"
              leftSection={<IconTrash size={14} />}
              onClick={() => onChange('')}
              disabled={uploading}
            >
              Remove
            </Button>
          )}
        </Group>
      </Group>
    </Stack>
  );
};

