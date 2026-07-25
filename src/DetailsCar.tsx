import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Chip, Stack, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BuildIcon from '@mui/icons-material/Build';

import type { Car, CartItem } from './types';
import { AddCustomCarForm } from './AddCustomCarForm';

interface DetailsCarProps {
  cars: Car[];
}

function DetailsCar({ cars }: DetailsCarProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Scroll in cima all'apertura della pagina
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const autoCorrente = cars.find((item) => String(item.id) === String(id));

  if (!autoCorrente) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', mt: 6 }}>
        <Typography variant="h5" color="error" sx={{ mb: 2 }}>
          Auto non trovata o caricamento in corso...
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Torna al Catalogo
        </Button>
      </Box>
    );
  }

  // 1. Funzione per salvare nel localStorage compatibile con CartContext
  const aggiungiAlCarrello = (auto: Car) => {
    const STORAGE_KEY = 'drivehub_cart';

    // Legge il carrello attuale
    const carrelloAttuale: CartItem[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    );

    const carId = auto.id || `${auto.brand}-${auto.model}`;
    const index = carrelloAttuale.findIndex(
      (item) => (item.product.id || `${item.product.brand}-${item.product.model}`) === carId
    );

    let nuovoCarrello: CartItem[];
    if (index !== -1) {
      // Se l'auto c'è già, aumenta la quantità
      nuovoCarrello = [...carrelloAttuale];
      nuovoCarrello[index].quantity += 1;
    } else {
      // Altrimenti aggiunge il nuovo oggetto formato CartItem
      nuovoCarrello = [...carrelloAttuale, { product: { ...auto, id: carId }, quantity: 1 }];
    }

    // Salva nel localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuovoCarrello));

    //Notifica il carrello e la Navbar di aggiornarsi
    window.dispatchEvent(new Event('cart-updated'));

    alert(`${auto.brand} ${auto.model} aggiunta al carrello con successo!`);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3, mt: 2 }}>

      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/')} 
        sx={{ mb: 3 }}
      >
        Torna al Catalogo
      </Button>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button 
              variant="outlined" 
              size="large" 
              fullWidth 
              startIcon={<ShoppingCartIcon />}
              onClick={() => aggiungiAlCarrello(autoCorrente)}
              sx={{ py: 1.5, fontWeight: 'bold' }}
            >
              Aggiungi al Carrello
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Button 
              variant="contained" 
              size="large" 
              fullWidth 
              startIcon={<BuildIcon />}
              onClick={() => setIsModalOpen(true)}
              sx={{ py: 1.5, fontWeight: 'bold' }}
            >
              Personalizza Veicolo
            </Button>
          </Grid>
        </Grid>

      <AddCustomCarForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        baseCar={autoCorrente}
        onAddToCart={aggiungiAlCarrello}
      />
    </Box>
  );
}

export default DetailsCar;