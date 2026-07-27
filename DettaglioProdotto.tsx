import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Chip, Stack, Grid, Alert, Snackbar } from '@mui/material';
import Skeleton from "@mui/material/Skeleton";
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
  const [imageLoaded, setImageLoaded] = useState(false);

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
      >Torna al Catalogo
      </Button>

      <Box
        sx={{ width: "100%", overflow: "hidden", borderRadius: 3, backgroundColor: "#f5f5f5", mb: 3, py: 1.5, fontWeight: 'bold' }}
      >
        {!imageLoaded && (
          <Skeleton
            variant="rectangular" 
            animation= "wave"
            sx={{width:"100%", height: 350}}
          />
        )}
        <Box
          component= "img"
          src={autoCorrente.imageUrl}
          alt={`${autoCorrente.brand} ${autoCorrente.model}`}
          onLoad={()=> setImageLoaded(true)}
          sx={{display: imageLoaded ? "block" : "none", width : "100%", height: 350, objectFit: "cover"}}
          />
      </Box>

        <Typography variant="h3" sx={{fontWeight: "bold", mb: 1}}>
          {autoCorrente.brand} {autoCorrente.model}
        </Typography>

        <Typography
          variant= "h4"
          color= "primary"
          sx={{fontWeight:"bold", mb: 2}}
        >
          € {autoCorrente.price.toLocaleString("it-IT")}
        </Typography>

        <Typography
          variant= "body2"
          color="text.secondary"
          sx={{mb: 4, fontSize: "1.1rem"}}
        >
          {autoCorrente.description}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              size= "large"
              fullWidth
              startIcon={<ShoppingCartIcon/>}
              onClick={()=> aggiungiAlCarrello(autoCorrente)}
              sx={{py: 1.5, fontWeight: "bold"}}
            >Aggiungi al carello</Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button
            variant= "contained"
            size= "large"
            fullWidth
            startIcon={<BuildIcon/>}
            onClick={()=> setIsModalOpen(true)}
            sx={{py: 1.5, fontWeight: "bold"}}
          >Personalizza veicolo</Button>
          </Grid>
        </Grid>

        <AddCustomCarForm
          open={isModalOpen}
          onClose={()=>setIsModalOpen(false)}
          baseCar={autoCorrente}
          onAddToCart={(autoCustom)=>
            aggiungiAlCarrello({
              ...autoCustom,
              model: autoCustom.model+" (Custom)"
            })
          }
        />
        </Box>
  );
}
export default DetailsCar;
