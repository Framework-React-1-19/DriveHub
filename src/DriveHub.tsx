import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Box, Divider, Typography } from "@mui/material"
import Navbar from "./Navbar"
import Sidebar from "./SideBar"
import { AddCarForm, type Car } from "./AddCarForm"
import Catalogo from "./Catalogo"

function DriveHub() {
  const [open, setOpen] = useState(false)
  const [automobili, setAutomobili] = useState<Car[]>([]);

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onOpenSidebar={() => setOpen(true)} />

      <Routes>
        {/* Pagina Principale (Catalogo + Sidebar) */}
        <Route
          path="/"
          element={
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Sidebar open={open} setOpen={setOpen} />
              <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
                <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, mt: 2 }}>
                  <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                    Il Nostro Catalogo ({automobili.length})
                  </Typography>
                  <Divider sx={{ mb: 4 }} />
                  <Catalogo cars={automobili} />
                </Box>
              </Box>
            </Box>
          }
        />

        {/* Pagina Amministrazione (AddCarForm) */}
        <Route
          path="/admin"
          element={<AddCarForm onAddCar={handleAddCar} />}
        />
      </Routes>
    </Box>
  )
}

export default DriveHub