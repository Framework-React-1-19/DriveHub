//Database
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 5000;
const DB_PATH = path.join(__dirname, 'db.json');
const UPLOADS_PATH = path.join(__dirname, 'uploads');

app.use(cors());
app.use(express.json());

// 1. RENDIAMO LA CARTELLA UPLOADS ACCESSIBILE DA BROWSER/REACT
app.use('/uploads', express.static(UPLOADS_PATH));

// 2. CONFIGURAZIONE MULTER CON NUMERAZIONE SEGUENZIALE (auto_1, auto_2, auto_3...)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Se la cartella uploads non dovesse esistere, la crea al volo
    if (!fs.existsSync(UPLOADS_PATH)) {
      fs.mkdirSync(UPLOADS_PATH, { recursive: true });
    }
    cb(null, UPLOADS_PATH);
  },
  filename: (req, file, cb) => {
    // Legge tutti i file presenti nella cartella uploads
    const files = fs.readdirSync(UPLOADS_PATH);
    
    let maxNum = 0;

    // Cerca i file che iniziano per "auto_" ed estrae il numero più alto
    files.forEach(f => {
      const match = f.match(/^auto_(\d+)\./);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) {
          maxNum = num;
        }
      }
    });

    // Mantiene l'estensione originale (.jpg, .png, ecc.) o mette .jpg di default
    const estensione = path.extname(file.originalname) || '.jpg';
    const prossimoNumero = maxNum + 1;
    const nuovoNome = `auto_${prossimoNumero}${estensione}`;

    cb(null, nuovoNome);
  }
});

const upload = multer({ storage });

// 3. ENDPOINT DEDICATO ALL'UPLOAD DELL'IMMAGINE
app.post('/upload', upload.single('foto'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nessun file caricato' });
  }
  // Restituiamo l'URL locale con il nuovo nome sequenziale (es. http://localhost:5000/uploads/auto_15.jpg)
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  console.log(`📸 Nuova immagine salvata in locale: ${req.file.filename}`);
  res.json({ imageUrl });
});

// Helper DB
const leggiDb = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const scriviDb = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');

// GET Cars
app.get('/cars', (req, res) => {
  const db = leggiDb();
  res.json(db.cars || []);
});

// POST Cars (CON GENERAZIONE ID SEGUENZIALE)
app.post('/cars', (req, res) => {
  const db = leggiDb();
  const cars = db.cars || [];

  // Calcola l'ID numerico più alto presente nel db.json
  const maxId = cars.reduce((max, car) => {
    const idNumerico = parseInt(car.id, 10) || 0;
    return idNumerico > max ? idNumerico : max;
  }, 0);

  // Genera il nuovo ID come stringa (es. "15", "16", ...)
  const prossimoId = String(maxId + 1);

  const nuovaAuto = {
    id: prossimoId,
    ...req.body
  };

  cars.push(nuovaAuto);
  db.cars = cars;
  scriviDb(db);

  console.log(`🚗 Nuova auto registrata con ID ${prossimoId}: ${nuovaAuto.brand} ${nuovaAuto.model}`);
  res.status(201).json(nuovaAuto);
});

app.listen(PORT, () => {
  console.log(`🚀 Server Express con numerazione sequenziale attivo su http://localhost:${PORT}`);
});