import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DriveHub from './DriveHub.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { CartProvider } from './CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <CartProvider>
    <BrowserRouter>
      <DriveHub />
    </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)
