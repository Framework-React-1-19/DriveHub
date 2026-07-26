import { useEffect } from "react";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import type { Car } from './types';
import CarCard from "./CarCard";

interface CatalogoProps {
  cars: Car[];
  pagina: number;
  setPagina: (pagina: number) => void;
}

function Catalogo(props: CatalogoProps) {
  const autoPerPagina = 6;

  useEffect(function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [props.pagina]);

  // Calcola quali auto appartengono alla pagina corrente.
  const indiceUltimaAuto = props.pagina * autoPerPagina;
  const indicePrimaAuto = indiceUltimaAuto - autoPerPagina;
  const autoVisibili = props.cars.slice(indicePrimaAuto, indiceUltimaAuto);

  const totalePagine = Math.ceil(props.cars.length / autoPerPagina);

  function gestisciCambioPagina(_: unknown, valore: number) {
    props.setPagina(valore);
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {autoVisibili.length === 0 && (
          <Grid size={12}>
            <Typography sx={{ textAlign: 'center', mt: 4 }}>
              Nessuna auto corrisponde ai filtri selezionati.
            </Typography>
          </Grid>
        )}

        {autoVisibili.map(function (auto) {
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={auto.id || auto.model}>
              <CarCard car={auto} />
            </Grid>
          )
        })}
      </Grid>

      {/* PAGINATION CENTRATA E DINAMICA */}
      {totalePagine > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalePagine} 
            page={props.pagina}
            onChange={gestisciCambioPagina} 
            color="primary" 
          />
        </Box>
      )}
    </Box>
  );
}

export default Catalogo;
