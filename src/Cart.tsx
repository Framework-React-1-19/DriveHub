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
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Il carrello è vuoto</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: 500 }}>
      <Typography variant="h5" gutterBottom>
        Carrello
      </Typography>

      <List>
        {items.map((item) => (
          <ListItem
            key={item.product.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="rimuovi"
                onClick={() => removeItem(item.product.id)}
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

      <Typography variant="h6">Totale: {total.toFixed(2)} €</Typography>

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