import { AppBar, Toolbar, Typography, Box} from '@mui/material'
import UnderlineButton from './Button'

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Titolo */}
        <Typography variant="h6">
          Drivehub
        </Typography>

        {/* Spazio che spinge i pulsanti a destra */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Pulsanti di navigazione */}
        <UnderlineButton label="Catalogo"></UnderlineButton>
        <UnderlineButton label="Carello"></UnderlineButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
