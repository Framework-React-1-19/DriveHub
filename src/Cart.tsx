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
import { useCart } from "./Cartcontext";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
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
        {items.map((item) => (
          <ListItem
            key={item.product.id}
            divider
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="rimuovi"
                onClick={() => removeItem(item.product.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={item.product.name}
              secondary={`${item.product.price.toFixed(2)} € x ${item.quantity}`}
            />
            <TextField
              type="number"
              size="small"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.product.id, Number(e.target.value))
              }
              sx={{ width: 70, mr: 6 }}
              slotProps={{ htmlInput: { min: 1 } }}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ color: "#1976d2" }}>
        Totale: <strong>{total.toFixed(2)} €</strong>
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
