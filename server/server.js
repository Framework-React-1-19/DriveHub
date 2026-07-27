// Database & Server Express
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 5000;
const DB_PATH = path.join(__dirname, 'db.json');
const PUBLIC_PATH = path.join(__dirname, 'public'); // 🟢 Cartella public

app.use(cors());
app.use(express.json());

// 1. RENDIAMO LA CARTELLA PUBLIC ACCESSIBILE DIRETTAMENTE DA BROWSER
app.use(express.static(PUBLIC_PATH));

// 2. CONFIGURAZIONE MULTER CON NUMERAZIONE SEGUENZIALE NELLA CARTELLA PUBLIC
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Se la cartella public non dovesse esistere, la crea al volo
    if (!fs.existsSync(PUBLIC_PATH)) {
      fs.mkdirSync(PUBLIC_PATH, { recursive: true });
    }
    cb(null, PUBLIC_PATH);
  },
  filename: (req, file, cb) => {
    // Legge tutti i file presenti nella cartella public
    const files = fs.readdirSync(PUBLIC_PATH);
    
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

    // Mantiene l'estensione originale (.jpg, .png, .webp, ecc.)
    const estensione = path.extname(file.originalname) || '.jpg';
    const prossimoNumero = maxNum + 1;
    const nuovoNome = `auto_${prossimoNumero}${estensione}`;

    cb(null, nuovoNome);
  }
});

const upload = multer({ storage });

// 3. ENDPOINT DEDICATO ALL'UPLOAD DELL'IMMAGINE IN PUBLIC
app.post('/upload', upload.single('foto'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nessun file caricato' });
  }
  
  // 🟢 Restituisce la stringa relativa pulita pronta per db.json (es: "/auto_20.jpg")
  const imageUrl = `/${req.file.filename}`;
  console.log(`📸 Nuova immagine salvata in public: ${req.file.filename}`);
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

  // Genera il nuovo ID come stringa (es. "20", "21", ...)
  const prossimoId = String(maxId + 1);

  const nuovaAuto = {
    id: prossimoId,
    ...req.body
  };

  cars.push(nuovaAuto);
  db.cars = cars;
  scriviDb(db);

  console.log(`🚗 Nuova auto registrata con ID ${prossimoId}: ${nuovaAuto.brand}${nuovaAuto.model}`);
  res.status(201).json(nuovaAuto);
});

app.listen(PORT, () => {
  console.log(`🚀 Server Express con gestione cartella public attivo su http://localhost:${PORT}`);
});