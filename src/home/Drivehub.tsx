import { Box, Grid, Pagination } from '@mui/material'
import { useState } from 'react'

import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import CarCard from './CarCard'

const cars = [
  {
    image: "/bugattiChiron.jpg",
    brand: "Bugatti",
    model: "Chiron",
    year: 2019,
    km: 0,
    fuel: "Benzina",
    price: 3000000
  },
    {
    image: "/bugattiChiron.jpg",
    brand: "Bugatti",
    model: "Chiron",
    year: 2019,
    km: 0,
    fuel: "Benzina",
    price: 3000000
  },
    {
    image: "/bugattiChiron.jpg",
    brand: "Bugatti",
    model: "Chiron",
    year: 2019,
    km: 0,
    fuel: "Benzina",
    price: 3000000
  },
    {
    image: "/bugattiChiron.jpg",
    brand: "Bugatti",
    model: "Chiron",
    year: 2019,
    km: 0,
    fuel: "Benzina",
    price: 3000000
  },
    {
    image: "/bugattiChiron.jpg",
    brand: "Bugatti",
    model: "Chiron",
    year: 2019,
    km: 0,
    fuel: "Benzina",
    price: 3000000
  },
    {
    image: "/bugattiChiron.jpg",
    brand: "Bugatti",
    model: "Chiron",
    year: 2019,
    km: 0,
    fuel: "Benzina",
    price: 3000000
  },
]

function Drivehub() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Navbar onOpenSidebar={() => setOpen(true)} />

      <Box sx={{ display: 'flex' }}>
        <Sidebar open={open} setOpen={setOpen} />

        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={3}>
            {cars.map((car, i) => (
              <CarCard key={i} {...car} />
            ))}
          </Grid>

          {/* PAGINATION CENTRATA */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination count={10} color="primary" />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Drivehub