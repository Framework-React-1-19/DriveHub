
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./Cartcontext";
import Cart from "./Cart";
import CatalogoTest from "./CatalogoTest";
export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <nav style={{ padding: "1rem", display: "flex", gap: "1rem" }}>
          <Link to="/">Catalogo</Link>
          <Link to="/carrello">Carrello</Link>
        </nav>

        <Routes>
          <Route path="/" element={<CatalogoTest />} />
          <Route path="/carrello" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}