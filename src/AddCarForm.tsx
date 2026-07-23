import React, { useState } from 'react';
import { useFormik } from 'formik';
import { 
  TextField, 
  Button, 
  MenuItem, 
  Box, 
  Typography, 
  Grid,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export interface Car {
  id?: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | '';
  imageUrl: string;
  description: string;
}

interface AddCarFormProps {
  // Supporta sia funzioni sincrone che asincrone (Promise) da App.tsx
  onAddCar: (nuovaAuto: Car) => Promise<boolean> | void;
}

function AddCarForm(props: AddCarFormProps) {
  const [caricamentoImmagine, setCaricamentoImmagine] = useState(false);

  const formik = useFormik<Car>({
    initialValues: {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      fuelType: '',
      imageUrl: '',
      description: '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof Car, string>> = {};

      if (!values.brand.trim()) errors.brand = 'La marca è obbligatoria';
      if (!values.model.trim()) errors.model = 'Il modello è obbligatorio';
      
      const currentYear = new Date().getFullYear();
      if (values.year === 0) {
        errors.year = "L'anno è obbligatorio";
      } else if (values.year < 1900 || values.year > currentYear) {
        errors.year = `Inserisci un anno valido tra il 1900 e il ${currentYear}`;
      }

      if (values.price === 0) {
        errors.price = 'Il prezzo è obbligatorio';
      } else if (values.price < 0) {
        errors.price = 'Il prezzo deve essere maggiore di 0';
      }

      if (!values.fuelType) errors.fuelType = 'Seleziona un tipo di alimentazione';

      // Controllo immagine: accetta gli URL locali http://localhost:5000/uploads/...
      if (!values.imageUrl.trim()) {
        errors.imageUrl = "L'immagine dell'auto è obbligatoria";
      } else if (
        !values.imageUrl.startsWith('http://') && 
        !values.imageUrl.startsWith('https://')
      ) {
        errors.imageUrl = "Seleziona una foto valida o attendi il caricamento";
      }

      if (!values.description.trim()) {
        errors.description = 'La descrizione è obbligatoria';
      } else if (values.description.length < 10) {
        errors.description = 'La descrizione deve contenere almeno 10 caratteri';
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log('Invio auto al componente padre App.tsx:', values);
      
      // Chiamiamo la funzione passata via props da App.tsx
      const esito = await props.onAddCar(values);
      
      // Se l'inserimento ha avuto successo (o se la callback non restituisce booleani)
      if (esito !== false) {
        alert('Auto inserita con successo nel catalogo!');
        formik.resetForm();
      } else {
        alert("Errore durante il salvataggio dell'auto. Verifica che il server Express sia avviato.");
      }
    },
  });

  // 🚀 UPLOAD IMMAGINE VERSO EXPRESS (/upload)
  const gestisciUploadImmagine = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCaricamentoImmagine(true);

      const formData = new FormData();
      formData.append('foto', file); // 'foto' coincide con upload.single('foto') in server.js

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          // Express restituisce http://localhost:5000/uploads/auto_X.jpg
          formik.setFieldValue('imageUrl', data.imageUrl);
          formik.setFieldTouched('imageUrl', true, false);
        } else {
          alert("Errore durante il caricamento dell'immagine sul server.");
        }
      } catch (error) {
        console.error("Errore di connessione durante l'upload:", error);
        alert("Impossibile connettersi al server Express su http://localhost:5000");
      } finally {
        setCaricamentoImmagine(false);
      }
    }
  };

  const haErroreImmagine = formik.touched.imageUrl && Boolean(formik.errors.imageUrl);

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Inserisci Nuova Auto
      </Typography>
      
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              id="brand"
              name="brand"
              label="Marca"
              value={formik.values.brand}
              onChange={formik.handleChange}
              error={formik.touched.brand && Boolean(formik.errors.brand)}
              helperText={formik.touched.brand && formik.errors.brand}
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              id="model"
              name="model"
              label="Modello"
              value={formik.values.model}
              onChange={formik.handleChange}
              error={formik.touched.model && Boolean(formik.errors.model)}
              helperText={formik.touched.model && formik.errors.model}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              id="year"
              name="year"
              label="Anno"
              type="number"
              value={formik.values.year === 0 ? '' : formik.values.year}
              onChange={(e) => formik.setFieldValue('year', e.target.value === '' ? 0 : Number(e.target.value))}
              error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Prezzo (€)"
              type="number"
              value={formik.values.price === 0 ? '' : formik.values.price}
              onChange={(e) => formik.setFieldValue('price', e.target.value === '' ? 0 : Number(e.target.value))}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              id="fuelType"
              name="fuelType"
              select
              label="Alimentazione"
              value={formik.values.fuelType}
              onChange={formik.handleChange}
              error={formik.touched.fuelType && Boolean(formik.errors.fuelType)}
              helperText={formik.touched.fuelType && formik.errors.fuelType}
            >
              <MenuItem value="Petrol">Benzina</MenuItem>
              <MenuItem value="Diesel">Diesel</MenuItem>
              <MenuItem value="Electric">Elettrica</MenuItem>
              <MenuItem value="Hybrid">Ibrida</MenuItem>
            </TextField>
          </Grid>

          {/* UPLOAD FOTO CON ANTEPRIMA ED ECCEZIONI */}
          <Grid size={12}>
            <Box
              component="label"
              sx={{
                width: '100%',
                height: 200,
                border: '2px dashed',
                borderColor: haErroreImmagine ? 'error.main' : 'grey.400',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: caricamentoImmagine ? 'wait' : 'pointer',
                backgroundColor: 'grey.50',
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: haErroreImmagine ? 'error.dark' : 'primary.main',
                  backgroundColor: 'grey.100',
                },
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                disabled={caricamentoImmagine}
                onChange={gestisciUploadImmagine}
              />

              {caricamentoImmagine ? (
                <Box sx={{ textAlign: 'center' }}>
                  <CircularProgress size={40} sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Salvataggio immagine su server Express...
                  </Typography>
                </Box>
              ) : formik.values.imageUrl ? (
                <img
                  src={formik.values.imageUrl}
                  alt="Anteprima macchina"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Box sx={{ textAlign: 'center', color: haErroreImmagine ? 'error.main' : 'text.secondary', p: 2 }}>
                  <AddIcon sx={{ fontSize: 40, mb: 1, color: haErroreImmagine ? 'error.main' : 'primary.main' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Carica foto auto da esplora file
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.disabled' }}>
                    PNG, JPG o JPEG (Verrà salvata in /uploads come auto_X.jpg)
                  </Typography>
                </Box>
              )}
            </Box>

            {haErroreImmagine && (
              <FormHelperText error sx={{ ml: 2, mt: 0.5 }}>
                {formik.errors.imageUrl}
              </FormHelperText>
            )}
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Descrizione"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>

          <Grid size={12}>
            <Button 
              color="primary" 
              variant="contained" 
              fullWidth 
              type="submit" 
              disabled={caricamentoImmagine}
              sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
            >
              Aggiungi Auto al Catalogo
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export { AddCarForm };