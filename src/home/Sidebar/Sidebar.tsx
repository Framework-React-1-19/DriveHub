import { 
  Drawer, Box, Typography, Divider, FormControl, InputLabel, 
  Select, MenuItem, Slider, FormGroup, FormControlLabel, 
  Checkbox, Button, useMediaQuery, useTheme 
} from '@mui/material'

function Sidebar({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
        const theme = useTheme()
        const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    return(
        <Drawer
              variant={isMobile ? 'temporary' : 'permanent'}
                anchor="left"
                open={isMobile ? open : true}
                onClose={() => setOpen(false)}
            sx={{
                width: 260,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    position: 'sticky',
                    width: 260,
                    padding: 2,
                }
            }}
        >
            <Box>
                <Typography variant='h6' sx={{mb: 2}}>Filtri</Typography>

                <Divider sx={{ mb: 2}}></Divider>

                <FormControl fullWidth sx={{ mb: 2}}>
                    <InputLabel>Marca</InputLabel>
                    <Select defaultValue="">
                        <MenuItem value="BMW">BMW</MenuItem>
                        <MenuItem value="Audi">Audi</MenuItem>
                        <MenuItem value="Mercedes">Mercedes</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2}}>
                    <InputLabel>Modello</InputLabel>
                    <Select defaultValue="">
                        <MenuItem value="BMW">Serie 3</MenuItem>
                        <MenuItem value="Audi">A4</MenuItem>
                        <MenuItem value="Classe C">Classe C</MenuItem>
                    </Select>
                </FormControl>

                <Typography sx={{ mt: 2}}>Prezzo</Typography>
                <Slider
                    value={[2015,2022]}
                    min={2000}
                    max={2026}
                    sx={{ mb: 2}}
                />

                <Typography sx={{ mt: 2}}>Chilometraggio</Typography>
                <Slider
                    value={[0,100000]}
                    min={0}
                    max={200000}
                    sx={{ mb: 2}}
                />

                <Typography sx={{ mt: 2}}>Alimentazione</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox/>} label="Benzina"></FormControlLabel>
                    <FormControlLabel control={<Checkbox/>} label="Diesel"></FormControlLabel>
                    <FormControlLabel control={<Checkbox/>} label="Elettrica"></FormControlLabel>
                    <FormControlLabel control={<Checkbox/>} label="Ibrida"></FormControlLabel>
                </FormGroup>

                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Resetta Filtri
                </Button>
            </Box>
        </Drawer>
    )
}
export default Sidebar