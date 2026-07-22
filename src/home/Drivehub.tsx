import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import CarCard from './Card'
import { Box } from '@mui/material'
import { useState } from 'react'

function Drivehub() {
    const [open, setOpen] = useState(false)
    return (
        <>
        <Navbar onOpenSidebar={() => setOpen(true)} />

        <Box sx={{ display: 'flex' }}>
        
        <Sidebar open={open} setOpen={setOpen} />
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <CarCard
                image="/bugattiChiron.jpg"
                brand="Bugatti"
                model="Chiron"
                year={2019}
                km={0}
                fuel="Benzina"
                price={3000000}
            />
        </Box>
      </Box>
    </>
  )
}

export default Drivehub