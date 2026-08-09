import { createTheme, type MantineColorsTuple } from '@mantine/core';

const brand: MantineColorsTuple = [
  '#e7f1ff',
  '#cfe0fc',
  '#9fc0f5',
  '#6c9eee',
  '#4382e8',
  '#2a70e4',
  '#1b65e2',
  '#0d53c9',
  '#0049b4',
  '#003d9e',
];

const accent: MantineColorsTuple = [
  '#e8ecf5',
  '#ccd4e5',
  '#a3b0cc',
  '#7787b0',
  '#556a99',
  '#3d5386',
  '#2a3f70',
  '#1c2d59',
  '#111e42',
  '#0a1330',
];

export const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand,
    accent,
  },
  fontFamily:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '800',
  },
  defaultRadius: 'lg',
  cursorType: 'pointer',
  other: {
    gradientFrom: '#2a70e4',
    gradientTo: '#0a1330',
  },
});
