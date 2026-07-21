import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

function Drivehub() {
    const [open, setOpen] = useState(false)
    return (
        <>
        <Navbar onOpenSidebar={() => setOpen(true)} />

        <Box sx={{ display: 'flex' }}>
        
        <Sidebar open={open} setOpen={setOpen} />

            {/* Inserisco dopo il contenuto */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>Catalogo Auto</Typography>
                <Typography>Contenuto del catalogo…</Typography>
            </Box>
      </Box>
    </>
  )
}

export default Drivehub