import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import Skeleton from "@mui/material/Skeleton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BuildIcon from '@mui/icons-material/Build';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';

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
  const swiperRef = useRef<SwiperType | null>(null);

  // Scroll in cima all'apertura della pagina
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  // Refresh carosello
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
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
    <Box sx={{ maxWidth: {xs: "100%", sm: 900}, mx: 'auto', p: 3, mt: 2 }}>

      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/')} 
        sx={{ mb: 3 }}
      >Torna al Catalogo
      </Button>

      <Box
        sx={{ width: "100%", overflow: "hidden", borderRadius: 3, backgroundColor: "#fefefe", mb: 3, py: 1.5, fontWeight: 'bold' }}
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
          sx={{display: imageLoaded ? "block" : "none", width : "100%", height: {xs: 250, sm: 550}, objectFit: "cover"}}
          />
      </Box>

        <Typography variant="h3" sx={{fontWeight: "bold", mb: 1}}>
          {autoCorrente.brand} {autoCorrente.model}
        </Typography>

        <Typography variant="h4" sx={{fontWeight: "lighter", mb: 0.3}}>
          {autoCorrente.year}
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

        <Stack
          direction={{xs: "column", sm: "row"}}
          justifyContent="space-between"
          spacing={2}
        >
          <Button
              variant="outlined"
              size= "large"
              fullWidth
              startIcon={<ShoppingCartIcon/>}
              onClick={()=> aggiungiAlCarrello(autoCorrente)}
              sx={{py: 1.5, fontWeight: "bold"}}
          >Aggiungi al carello</Button>

          <Button
            variant= "contained"
            size= "large"
            fullWidth
            startIcon={<BuildIcon/>}
            onClick={()=> setIsModalOpen(true)}
            sx={{py: 1.5, fontWeight: "bold"}}
          >Personalizza veicolo</Button>
        </Stack>

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

        <Typography variant="h5" sx={{mt: 5, mb: 2, fontWeight: "bold"}}>
          Potrebbero interessarti anche:
        </Typography>

        <Swiper
        onSwiper={(swiper)=> (swiperRef.current=swiper)}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            600: {slidesPerView:2},
            900: {slidesPerView:3},
            1200: {slidesPerView:4}
          }}
          style={{paddingBottom:"45px"}}
        >
          {cars
            .filter((c)=>c.id!==autoCorrente.id)
            .slice(0,10)
            .map((auto)=>(
                <SwiperSlide key={auto.id}>
                  <Paper
                    elevation={3}
                    sx={{p:1.5, borderRadius:2, cursor: "pointer", transition: "0.2s", height: 260, display: "flex", flexDirection: "column", justifyContent: "space-between", "&:hover":{transform: "scale(1.03)"}}}
                    onClick={()=>navigate(`/car/${auto.id}`)}
                  >
                  <Box
                    component="img"
                    src={auto.imageUrl}
                    alt={auto.model}
                    sx={{width:"100%", height:140, objectFit:"cover", borderRadius: 2, mb:1}}
                  />

                  <Typography variant="subtitle1" sx={{mt: 2, mb: 2, fontWeight: "bold", minHeight: 40}}>
                    {auto.brand} {auto.model}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    € {auto.price.toLocaleString("it-IT")}
                  </Typography>
                  </Paper>
                </SwiperSlide>
            ))}
        </Swiper>
        </Box>
  );
}
export default DetailsCar;
