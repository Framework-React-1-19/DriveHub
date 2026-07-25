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
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "./CartContext";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="text.secondary">Il carrello è vuoto</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 650, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Il Tuo Carrello
      </Typography>

      <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
        <List>
          {items.map((item) => {
            const itemId = item.product.id || `${item.product.brand}-${item.product.model}`;
            return (
              <ListItem
                key={itemId}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="rimuovi"
                    color="error"
                    onClick={() => removeItem(itemId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${item.product.brand} ${item.product.model}`}
                  secondary={`${item.product.price.toLocaleString('it-IT')} € x ${item.quantity}`}
                />
                <TextField
                  type="number"
                  size="small"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(itemId, Number(e.target.value))}
                  sx={{ width: 70, mr: 2 }}
                  slotProps={{ htmlInput: { min: 1 } }}
                />
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Totale: {total.toLocaleString('it-IT')} €
          </Typography>

          <Button
            variant="outlined"
            color="error"
            onClick={clearCart}
          >
            Svuota carrello
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}