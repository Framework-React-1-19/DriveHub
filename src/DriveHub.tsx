import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Box, Divider, Typography } from "@mui/material"
import Navbar from "./Navbar"
import Sidebar, { ANNO_MINIMO, PREZZO_MASSIMO } from "./SideBar"
import { AddCarForm } from "./AddCarForm";
import type { Car, FiltriAuto } from "./types";
import Catalogo from "./Catalogo"
import DetailsCar from "./DetailsCar"
import Cart from "./Cart"

// Restituisce i valori iniziali usati anche dal pulsante "Resetta Filtri".
function creaFiltriVuoti(): FiltriAuto {
  return {
    brand: '',
    model: '',
    price: [0, PREZZO_MASSIMO],
    year: [ANNO_MINIMO, new Date().getFullYear()],
    fuelTypes: []
  };
}

function DriveHub() {
  const [open, setOpen] = useState(false)
  const [automobili, setAutomobili] = useState<Car[]>([]);
  const [pagina, setPagina] = useState(1);
  const [filtri, setFiltri] = useState<FiltriAuto>(creaFiltriVuoti());

  // 1. Caricamento auto dal server Express
  useEffect(() => {
    fetch('http://localhost:5000/cars')
      .then((res) => res.json())
      .then((data) => setAutomobili(data as Car[]))
      .catch((err) => console.error('Errore nel caricamento delle auto:', err));
  }, []);

  const handleAddCar = async (nuovaAuto: Car): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:5000/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuovaAuto),
      });

      return response.ok;
    } catch (error) {
      console.error("Errore durante l'invio dell'auto:", error);
      return false;
    }
  };

  // Questa funzione viene eseguita una volta per ogni automobile.
  function rispettaFiltri(auto: Car): boolean {
    if (filtri.brand && auto.brand !== filtri.brand) return false;
    if (filtri.model && auto.model !== filtri.model) return false;
    if (auto.price < filtri.price[0] || auto.price > filtri.price[1]) return false;
    if (auto.year < filtri.year[0] || auto.year > filtri.year[1]) return false;
    if (filtri.fuelTypes.length > 0 && !filtri.fuelTypes.includes(auto.fuelType)) return false;

    return true;
  }

  const automobiliFiltrate = automobili.filter(rispettaFiltri);

  function aggiornaFiltri(nuoviFiltri: FiltriAuto) {
    setFiltri(nuoviFiltri);
    setPagina(1);
  }

  function resettaFiltri() {
    aggiornaFiltri(creaFiltriVuoti());
  }

  function apriSidebar() {
    setOpen(true);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onOpenSidebar={apriSidebar} />

      <Routes>
        {/* Pagina Principale (Catalogo + Sidebar) */}
        <Route
          path="/"
          element={
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Sidebar
                open={open}
                setOpen={setOpen}
                automobili={automobili}
                filtri={filtri}
                aggiornaFiltri={aggiornaFiltri}
                resettaFiltri={resettaFiltri}
              />
              <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
                <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, mt: 2 }}>
                  <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                    Il Nostro Catalogo ({automobiliFiltrate.length})
                  </Typography>
                  <Divider sx={{ mb: 4 }} />
                  <Catalogo
                    cars={automobiliFiltrate}
                    pagina={pagina}
                    setPagina={setPagina}
                  />
                </Box>
              </Box>
            </Box>
          }
        />

        {/* Pagina con i dettagli di un'automobile */}
        <Route
          path="/car/:id"
          element={<DetailsCar cars={automobili} />}
        />

        {/* Pagina Carrello */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Pagina Amministrazione (AddCarForm) */}
        <Route
          path="/admin"
          element={<AddCarForm onAddCar={handleAddCar} />}
        />
      </Routes>

      <Box
        component="footer"
        sx={{ mt: 'auto', py: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}
      >
        <Typography variant="body2">© DriveHub</Typography>
      </Box>
    </Box>
  )
}

export default DriveHub
