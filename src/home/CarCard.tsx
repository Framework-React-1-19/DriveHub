import { Card, CardContent, CardActions, Box, Button, Typography, CardMedia } from '@mui/material'

type CarCardProps = {
  image: string
  brand: string
  model: string
  year: number
  km: number
  fuel: string
  price: number
}

function CarCard({ image, brand, model, year, km, fuel, price }: CarCardProps) {
  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      
      <CardMedia
        component="img"
        height="160"
        image={image}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          {brand} {model}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
          <Typography variant='body2'>{year}</Typography>
          <Typography variant='body2'>• {km.toLocaleString()} km</Typography>
          <Typography variant='body2'>• {fuel}</Typography>
        </Box>

        <Typography variant='h6' sx={{ mt: 1, fontWeight: 700 }}>
          {price.toLocaleString()}€
        </Typography>
      </CardContent>

      <CardActions>
        <Button size='small' variant='outlined'>
          Dettagli
        </Button>
      </CardActions>
    </Card>
  )
}

export default CarCard