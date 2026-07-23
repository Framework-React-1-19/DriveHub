import { Card, CardContent, CardActions, Box, Button, Typography, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'
import type { Car } from './AddCarForm'

interface CarCardProps {
  car: Car
}

function CarCard({ car }: CarCardProps) {
  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <CardMedia
        component="img"
        height="160"
        image={car.imageUrl}
        alt={`${car.brand} ${car.model}`}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          {car.brand} {car.model}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
          <Typography variant='body2'>{car.year}</Typography>
          <Typography variant='body2'>• {car.fuelType}</Typography>
        </Box>

        <Typography variant='h6' sx={{ mt: 1, fontWeight: 700, color: 'primary.main' }}>
          € {car.price.toLocaleString('it-IT')}
        </Typography>
      </CardContent>

      <CardActions>
        <Button 
          component={Link} 
          to={`/car/${car.id}`} 
          size='small' 
          variant='outlined'
          fullWidth
        >
          Dettagli
        </Button>
      </CardActions>
    </Card>
  )
}

export default CarCard