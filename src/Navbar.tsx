import { AppBar, Toolbar, Typography,
  Box, IconButton, useMediaQuery, useTheme
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import UnderlineButton from './UnderlineButton'


function Navbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <AppBar position="static">
      <Toolbar>

        {!isMobile && (
          <DirectionsCarIcon sx={{ fontSize: 32, marginRight: 1 }} />
        )}

        {isMobile && (
          <IconButton color="inherit" onClick={onOpenSidebar}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6">
          Drivehub
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <UnderlineButton label="Catalogo" to='/' />
        <UnderlineButton label="Carrello" to='/cart'/>
        <UnderlineButton label="Amministrazione" to='/admin' />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar