import React, { useRef, useState } from 'react';
import { Button, Group, Text, Stack, TextInput, Badge, Box } from '@mantine/core';
import { IconUpload, IconTrash, IconFileText, IconCheck, IconLink } from '@tabler/icons-react';
import { supabase } from '../../supabase';

interface FileUploaderProps {
  label: string;
  value?: string;
  onChange: (fileUrl: string) => void;
  maxSizeMb?: number;
  accept?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  value,
  onChange,
  maxSizeMb = 15,
  accept = '.doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMb * 1024 * 1024) {
      alert(`File size exceeds limit (${maxSizeMb} MB). Please select a smaller document.`);
      return;
    }

    setUploading(true);

    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniqueFileName = `${Date.now()}_${cleanFileName}`;
      const filePath = `documents/${uniqueFileName}`;

      setFileName(file.name);

      // Attempt Supabase storage upload first
      const { data, error } = await supabase.storage
        .from('app-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.warn('Supabase storage file upload error, falling back to Base64:', error.message);
        // Fallback: Read as Data URL (Base64) so it works offline/without bucket restriction
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result && typeof reader.result === 'string') {
            onChange(reader.result);
          }
        };
        reader.readAsDataURL(file);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('app-images')
        .getPublicUrl(data.path);

      if (publicUrlData?.publicUrl) {
        onChange(publicUrlData.publicUrl);
      }
    } catch (err: any) {
      console.error('File upload exception:', err);
      // Fallback: Read as Data URL
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          onChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const isBase64 = value?.startsWith('data:');

  return (
    <Stack gap="xs">
      <Text size="sm" fw={600} c="white">{label}</Text>
      
      <Box
        p="md"
        style={{
          borderRadius: 12,
          backgroundColor: 'rgba(10, 20, 50, 0.5)',
          border: '1px solid rgba(42, 112, 228, 0.25)',
        }}
      >
        <Stack gap="sm">
          <Group align="center" justify="space-between">
            <Group gap="sm">
              <Box
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  backgroundColor: value ? 'rgba(42, 112, 228, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(42, 112, 228, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: value ? '#6c9eee' : '#64748b',
                }}
              >
                <IconFileText size={22} />
              </Box>

              <Stack gap={2}>
                <Text size="sm" fw={600} c={value ? 'white' : 'dimmed'}>
                  {value ? (fileName || (isBase64 ? 'Uploaded Document (Base64)' : 'CV Document File Uploaded')) : 'No document uploaded yet'}
                </Text>
                {value && (
                  <Group gap={6}>
                    <Badge size="xs" color="blue" variant="light" leftSection={<IconCheck size={10} />}>
                      Ready for Download
                    </Badge>
                  </Group>
                )}
              </Stack>
            </Group>

            <Group gap="xs">
              <input
                type="file"
                accept={accept}
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <Button
                size="xs"
                variant="gradient"
                gradient={{ from: '#2a70e4', to: '#1b65e2', deg: 120 }}
                loading={uploading}
                leftSection={!uploading && <IconUpload size={14} />}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? 'Uploading...' : 'Upload CV File (.doc / .pdf)'}
              </Button>

              {value && (
                <Button
                  size="xs"
                  color="red"
                  variant="subtle"
                  leftSection={<IconTrash size={14} />}
                  onClick={() => {
                    onChange('');
                    setFileName('');
                  }}
                  disabled={uploading}
                >
                  Remove
                </Button>
              )}
            </Group>
          </Group>

          {/* Manual URL Override TextInput for flexibility */}
          <TextInput
            size="xs"
            placeholder="Or enter direct document link URL (https://...)"
            leftSection={<IconLink size={14} />}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </Stack>
      </Box>
    </Stack>
  );
};
