import { Box, Typography } from '@mui/material'

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ mt: 'auto', py: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}
    >
      <Typography variant="body2">© DriveHub</Typography>
    </Box>
  )
}

export default Footer
