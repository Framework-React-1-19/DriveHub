import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Chip,
  Grid
} from '@mui/material';
import type { Car } from './AddCarForm';

export interface CustomCarModalProps {
  open: boolean;
  onClose: () => void;
  baseCar: Car | null;
  onAddToCart: (customizedCar: Car) => void;
}

// Opzioni di tuning
const OPTIONI_COLORI = [
  'Colore di fabbrica',
  'Rosso Corsa',
  'Nero Lucido',
  'Blu Perla',
  'Giallo Neon',
  'Verde Mantis',
  'Grigio Nardo',
  'Viola Metallizzato'
];

const OPTIONI_CERCHI = [
  { nome: 'Cerchi di Serie', costo: 0 },
  { nome: 'Cerchi Sportivi 19"', costo: 1200 },
  { nome: 'Cerchi Forgiati in Carbonio', costo: 3500 },
  { nome: 'Cerchi Lowrider Cromati', costo: 2200 }
];

const OPTIONI_MOTORE = [
  { nome: 'Motore Stock', costo: 0 },
  { nome: 'Stage 1 - Mappatura ECU', costo: 1500 },
  { nome: 'Stage 2 - Kit Biturbo', costo: 4500 },
  { nome: 'Stage 3 - Full Race Spec', costo: 9500 }
];

const OPTIONI_VETRI = [
  { nome: 'Trasparente (Serie)', costo: 0 },
  { nome: 'Fumé Medio', costo: 300 },
  { nome: 'Limo Tint 100% Nero', costo: 600 }
];

const OPTIONI_SPOILER = [
  { nome: 'Nessuno', costo: 0 },
  { nome: 'Ducktail Lip Carbonio', costo: 800 },
  { nome: 'Ala GT Competition', costo: 2500 }
];

function AddCustomCarForm(props: CustomCarModalProps) {
  const { open, onClose, baseCar, onAddToCart } = props;

  // Stato delle personalizzazioni
  const [colore, setColore] = useState(OPTIONI_COLORI[0]);
  const [cerchi, setCerchi] = useState(OPTIONI_CERCHI[0]);
  const [motore, setMotore] = useState(OPTIONI_MOTORE[0]);
  const [vetri, setVetri] = useState(OPTIONI_VETRI[0]);
  const [spoiler, setSpoiler] = useState(OPTIONI_SPOILER[0]);

  const resetForm = () => {
    setColore(OPTIONI_COLORI[0]);
    setCerchi(OPTIONI_CERCHI[0]);
    setMotore(OPTIONI_MOTORE[0]);
    setVetri(OPTIONI_VETRI[0]);
    setSpoiler(OPTIONI_SPOILER[0]);
  };

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  // Se non è selezionata un'auto base, non renderizziamo la modale
  if (!baseCar) return null;

  // Calcolo costi extra e prezzo finale
  const costoTuningExtra = cerchi.costo + motore.costo + vetri.costo + spoiler.costo;
  const prezzoFinale = Number(baseCar.price) + costoTuningExtra;

  const handleAggiungiAlCarrello = () => {
    // 1. Creiamo la descrizione con la lista delle modifiche
    const descrizioneCustom = `Custom: Verniciatura ${colore} | ${cerchi.nome} | ${motore.nome} | Vetri ${vetri.nome} | ${spoiler.nome}`;

    // 2. Creiamo l'oggetto auto personalizzata per il carrello
    const autoPersonalizzata: Car = {
      ...baseCar,
      id: `${baseCar.id || 'car'}-custom-${Date.now()}`,
      price: prezzoFinale,
      description: descrizioneCustom
    };

    // 3. Mandiamo al carrello (che scriverà nel localStorage)
    onAddToCart(autoPersonalizzata);
    
    // 4. Chiudiamo la modale
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
          Personalizza {baseCar.brand} {baseCar.model}
        </Typography>
        <Chip 
          label={`Extra: +${costoTuningExtra.toLocaleString('it-IT')} €`} 
          color="primary" 
          variant="outlined" 
        />
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
          
          {/* Verniciatura */}
          <FormControl fullWidth>
            <InputLabel>Verniciatura / Colore</InputLabel>
            <Select
              value={colore}
              label="Verniciatura / Colore"
              onChange={(e) => setColore(e.target.value)}
            >
              {OPTIONI_COLORI.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Cerchioni */}
          <FormControl fullWidth>
            <InputLabel>Cerchioni</InputLabel>
            <Select
              value={cerchi.nome}
              label="Cerchioni"
              onChange={(e) => {
                const opzione = OPTIONI_CERCHI.find((c) => c.nome === e.target.value);
                if (opzione) setCerchi(opzione);
              }}
            >
              {OPTIONI_CERCHI.map((c) => (
                <MenuItem key={c.nome} value={c.nome}>
                  {c.nome} {c.costo > 0 ? `(+${c.costo} €)` : ''}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Motore */}
          <FormControl fullWidth>
            <InputLabel>Tuning Motore</InputLabel>
            <Select
              value={motore.nome}
              label="Tuning Motore"
              onChange={(e) => {
                const opzione = OPTIONI_MOTORE.find((m) => m.nome === e.target.value);
                if (opzione) setMotore(opzione);
              }}
            >
              {OPTIONI_MOTORE.map((m) => (
                <MenuItem key={m.nome} value={m.nome}>
                  {m.nome} {m.costo > 0 ? `(+${m.costo} €)` : ''}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Vetri e Spoiler */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Oscuramento Vetri</InputLabel>
                <Select
                  value={vetri.nome}
                  label="Oscuramento Vetri"
                  onChange={(e) => {
                    const opzione = OPTIONI_VETRI.find((v) => v.nome === e.target.value);
                    if (opzione) setVetri(opzione);
                  }}
                >
                  {OPTIONI_VETRI.map((v) => (
                    <MenuItem key={v.nome} value={v.nome}>
                      {v.nome} {v.costo > 0 ? `(+${v.costo} €)` : ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Spoiler / Aerodinamica</InputLabel>
                <Select
                  value={spoiler.nome}
                  label="Spoiler / Aerodinamica"
                  onChange={(e) => {
                    const opzione = OPTIONI_SPOILER.find((s) => s.nome === e.target.value);
                    if (opzione) setSpoiler(opzione);
                  }}
                >
                  {OPTIONI_SPOILER.map((s) => (
                    <MenuItem key={s.nome} value={s.nome}>
                      {s.nome} {s.costo > 0 ? `(+${s.costo} €)` : ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Divider sx={{ my: 1 }} />

          {/* Riepilogo prezzo finale */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              Prezzo finale stimato:
            </Typography>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
              {prezzoFinale.toLocaleString('it-IT')} €
            </Typography>
          </Box>

        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} color="inherit">
          Annulla
        </Button>
        <Button 
          onClick={handleAggiungiAlCarrello} 
          variant="contained" 
          color="primary"
          size="large"
        >
          Aggiungi al Carrello
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { AddCustomCarForm };