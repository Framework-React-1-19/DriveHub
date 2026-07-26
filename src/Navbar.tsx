import { useState } from 'react'
import { 
  AppBar, Toolbar, Typography, Box, IconButton, 
  useMediaQuery, useTheme, Drawer, List, ListItem, ListItemButton, ListItemText 
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom'
import UnderlineButton from './UnderlineButton'


function Navbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [menuMobile, setMenuMobile] = useState(false)

  return (
    <AppBar position="static">
      <Toolbar>

        {!isMobile && (
          <DirectionsCarIcon sx={{ fontSize: 32, marginRight: 1 }} />
        )}

        {isMobile && (
          <IconButton color="inherit" onClick={onOpenSidebar}>
            <SearchIcon />
          </IconButton>
        )}

        <Typography variant="h6">
          Drivehub
        </Typography>

        {isMobile && (
          <DirectionsCarIcon sx={{ fontSize: 32, marginLeft: 1 }} />
        )}

        <Box sx={{ flexGrow: 1 }} />

        {!isMobile && (
          <>
            <UnderlineButton label="Catalogo" to='/' />
            <UnderlineButton label="Carrello" to='/cart'/>
          </>
        )}

        <IconButton
          component={Link}
          to="/admin"
          color="inherit"
          aria-label="Amministrazione"
        >
          <AccountCircleIcon />
        </IconButton>

        {isMobile && (
          <>
            <IconButton color="inherit" onClick={() => setMenuMobile(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer 
              anchor="right" 
              open={menuMobile} 
              onClose={() => setMenuMobile(false)}
            >
              <Box sx={{ width: 200, pt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1 }}>
                  <IconButton onClick={() => setMenuMobile(false)} aria-label="Chiudi menù">
                    <CloseIcon />
                  </IconButton>
                </Box>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to="/" onClick={() => setMenuMobile(false)}>
                      <ListItemText primary="Catalogo" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component={Link} to="/cart" onClick={() => setMenuMobile(false)}>
                      <ListItemText primary="Carrello" />
                    </ListItemButton>
                  </ListItem>

                </List>
              </Box>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
