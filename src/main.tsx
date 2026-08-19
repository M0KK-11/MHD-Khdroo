import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, localStorageColorSchemeManager } from '@mantine/core'
import '@mantine/core/styles.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import './index.css'
import App from './App.tsx'
import { theme } from './theme'

const colorSchemeManager = localStorageColorSchemeManager({ key: 'mhd-color-scheme' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      colorSchemeManager={colorSchemeManager}
    >
      <App />
    </MantineProvider>
  </StrictMode>,
)
