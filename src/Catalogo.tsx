import { useState } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import type { Car } from "./AddCarForm";
import CarCard from "./CarCard";

interface CatalogoProps {
  cars: Car[];
}

function Catalogo({ cars }: CatalogoProps) {
  // 1. Stato per la Paginazione interno a Catalogo
  const [pagina, setPagina] = useState(1);
  const autoPerPagina = 6;

  // 2. Calcolo indici per estrarre solo le auto della pagina corrente
  const indiceUltimaAuto = pagina * autoPerPagina;
  const indicePrimaAuto = indiceUltimaAuto - autoPerPagina;
  const autoVisibili = cars.slice(indicePrimaAuto, indiceUltimaAuto);

  // 3. Calcolo dinamico del numero di pagine in base a quante auto ci sono
  const totalePagine = Math.ceil(cars.length / autoPerPagina);

  const gestisciCambioPagina = (_event: React.ChangeEvent<unknown>, valore: number) => {
    setPagina(valore);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {autoVisibili.map((car) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={car.id || car.model}>
            <CarCard car={car} />
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION CENTRATA E DINAMICA */}
      {totalePagine > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalePagine} 
            page={pagina} 
            onChange={gestisciCambioPagina} 
            color="primary" 
          />
        </Box>
      )}
    </Box>
  );
}

export default Catalogo;