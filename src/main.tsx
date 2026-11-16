import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import '@mantine/core/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={{ primaryColor: 'teal', defaultRadius: 'md', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
      <BrowserRouter><App /></BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
