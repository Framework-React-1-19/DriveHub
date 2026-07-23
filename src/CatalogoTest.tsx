import { Card, CardContent, Typography, Button, Grid, Box } from "@mui/material";
import { useCart } from "./Cartcontext";
import type { Product } from "./types";

const prodottiFinti: Product[] = [
  { id: 1, name: "Prodotto A", price: 19.99, category: "test" },
  { id: 2, name: "Prodotto B", price: 9.5, category: "test" },
  { id: 3, name: "Prodotto C", price: 25, category: "test" },
];

export default function CatalogoTest() {
  const { addItem } = useCart();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Catalogo (di prova)
      </Typography>

      <Grid container spacing={2}>
        {prodottiFinti.map((prodotto) => (
          <Grid size={{xs: 12, sm: 4}} key={prodotto.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{prodotto.name}</Typography>
                <Typography color="text.secondary">
                  {prodotto.price.toFixed(2)} €
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  onClick={() => addItem(prodotto)}
                >
                  Aggiungi al carrello
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}