import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Button,
  Divider,
  TextField,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "./CartContext";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Il carrello è vuoto
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 500,
        mx: "auto",
        mt: 3,
        borderRadius: 3,
        boxShadow: 2,
        bgcolor: "#fff",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
        🛒 Carrello
      </Typography>

      <List>
        {items.map((item) => {
          // 🟢 LOGICA: Mantiene l'ID univoco anche per le auto personalizzate
          const itemId =
            item.product.id || `${item.product.brand}-${item.product.model}`;

          return (
            <ListItem
              key={itemId}
              divider
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="rimuovi"
                  onClick={() => removeItem(itemId)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${item.product.brand} ${item.product.model}`}
                secondary={`${item.product.price.toLocaleString("it-IT")} € x ${item.quantity}`}
              />
              <TextField
                type="number"
                size="small"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(itemId, Number(e.target.value))
                }
                sx={{ width: 70, mr: 6 }}
                slotProps={{ htmlInput: { min: 1 } }}
              />
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ color: "#1976d2" }}>
        Totale: <strong>{total.toLocaleString("it-IT")} €</strong>
      </Typography>

      <Button
        variant="outlined"
        color="error"
        sx={{ mt: 2 }}
        onClick={clearCart}
      >
        Svuota carrello
      </Button>
    </Box>
  );
}