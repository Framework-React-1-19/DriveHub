import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  imageUrl: string;
  description: string;
}

interface DettaglioProdottoProps {
  macchina: Car;
}

export function DettaglioProdotto({
  macchina,
}: DettaglioProdottoProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [macchina.imageUrl]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
    {}
    <Box
      sx={{
        width: "100%",
        height: "500px",
        overflow: "hidden",
      }}
      >
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
      <Box
        component="img"
        src={macchina.imageUrl}
        alt={`${macchina.brand} ${macchina.model}`}
        onLoad={() => setImageLoaded(true)}
        sx={{
          display: imageLoaded ? "block" : "none",
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        />
      </Box>

      {/* Informazioni */}
      <h1>
        {macchina.brand} {macchina.model}
      </h1>

      <p>Anno: {macchina.year}</p>

      <p>
        Prezzo: € {macchina.price.toLocaleString("it-IT")}
      </p>

      <p>Carburante: {macchina.fuelType}</p>

      <p>{macchina.description}</p>
    </Box>
  );
}
