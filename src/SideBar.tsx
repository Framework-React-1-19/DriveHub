import { type ChangeEvent } from 'react'
import {
  Drawer, Box, Typography, Divider, FormControl, InputLabel,
  Select, MenuItem, Slider, FormGroup, FormControlLabel,
  Checkbox, Button, useMediaQuery, useTheme
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import type { Car, FiltriAuto } from './types'

export const PREZZO_MASSIMO = 5000000
export const ANNO_MINIMO = 1990

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  automobili: Car[];
  filtri: FiltriAuto;
  aggiornaFiltri: (filtri: FiltriAuto) => void;
  resettaFiltri: () => void;
}

function Sidebar(props: SidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Costruisce le opzioni dei menu partendo dalle automobili ricevute.
  const marche: string[] = []
  const modelli: string[] = []

  for (let i = 0; i < props.automobili.length; i++) {
    const auto = props.automobili[i]

    if (!marche.includes(auto.brand)) {
      marche.push(auto.brand)
    }

    const marcaCorretta = !props.filtri.brand || auto.brand === props.filtri.brand
    if (marcaCorretta && !modelli.includes(auto.model)) {
      modelli.push(auto.model)
    }
  }

  marche.sort()
  modelli.sort()

  function cambiaMarca(event: SelectChangeEvent) {
    props.aggiornaFiltri({
      ...props.filtri,
      brand: event.target.value,
      model: ''
    })
  }

  function cambiaModello(event: SelectChangeEvent) {
    props.aggiornaFiltri({ ...props.filtri, model: event.target.value })
  }

  function cambiaPrezzo(_: Event, valore: number | number[]) {
    if (!Array.isArray(valore)) return
    props.aggiornaFiltri({ ...props.filtri, price: valore })
  }

  function cambiaAnno(_: Event, valore: number | number[]) {
    if (!Array.isArray(valore)) return
    props.aggiornaFiltri({ ...props.filtri, year: valore })
  }

  function cambiaAlimentazione(event: ChangeEvent<HTMLInputElement>) {
    const alimentazione = event.target.value
    const alimentazioniSelezionate = props.filtri.fuelTypes.slice()

    if (event.target.checked) {
      alimentazioniSelezionate.push(alimentazione)
    } else {
      const posizione = alimentazioniSelezionate.indexOf(alimentazione)
      if (posizione !== -1) alimentazioniSelezionate.splice(posizione, 1)
    }

    props.aggiornaFiltri({ ...props.filtri, fuelTypes: alimentazioniSelezionate })
  }

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor="left"
      open={isMobile ? props.open : true}
      onClose={function () { props.setOpen(false) }}
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
        <Typography variant="h6" sx={{ mb: 2 }}>Filtri</Typography>
        <Divider sx={{ mb: 2 }} />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Marca</InputLabel>
          <Select label="Marca" value={props.filtri.brand} onChange={cambiaMarca}>
            <MenuItem value="">Tutte</MenuItem>
            {marche.map(function (marca) {
              return <MenuItem value={marca} key={marca}>{marca}</MenuItem>
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Modello</InputLabel>
          <Select label="Modello" value={props.filtri.model} onChange={cambiaModello}>
            <MenuItem value="">Tutti</MenuItem>
            {modelli.map(function (modello) {
              return <MenuItem value={modello} key={modello}>{modello}</MenuItem>
            })}
          </Select>
        </FormControl>

        <Typography sx={{ mt: 2 }}>Prezzo (€)</Typography>
        <Slider
          value={props.filtri.price}
          onChange={cambiaPrezzo}
          min={0}
          max={PREZZO_MASSIMO}
          step={5000}
          valueLabelDisplay="auto"
          sx={{ mb: 2 }}
        />

        <Typography sx={{ mt: 2 }}>Anno</Typography>
        <Slider
          value={props.filtri.year}
          onChange={cambiaAnno}
          min={ANNO_MINIMO}
          max={new Date().getFullYear()}
          valueLabelDisplay="auto"
          sx={{ mb: 2 }}
        />

        <Typography sx={{ mt: 2 }}>Alimentazione</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox value="Petrol" checked={props.filtri.fuelTypes.includes('Petrol')} onChange={cambiaAlimentazione} />} label="Benzina" />
          <FormControlLabel control={<Checkbox value="Diesel" checked={props.filtri.fuelTypes.includes('Diesel')} onChange={cambiaAlimentazione} />} label="Diesel" />
          <FormControlLabel control={<Checkbox value="Electric" checked={props.filtri.fuelTypes.includes('Electric')} onChange={cambiaAlimentazione} />} label="Elettrica" />
          <FormControlLabel control={<Checkbox value="Hybrid" checked={props.filtri.fuelTypes.includes('Hybrid')} onChange={cambiaAlimentazione} />} label="Ibrida" />
        </FormGroup>

        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={props.resettaFiltri}
          sx={{ mt: 3 }}
        >
          Resetta Filtri
        </Button>
      </Box>
    </Drawer>
  )
}

export default Sidebar
