import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline } from '@mui/material' //CSS reset con MUI | https://mui.com/material-ui/react-css-baseline/

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline/>
    <App />
  </StrictMode>,
)