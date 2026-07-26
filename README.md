# DriveHub

Progetto realizzato con React, TypeScript, Vite, Material UI e React Router.

## Suddivisione dei ruoli

- Alessandro: `AddCarForm.tsx`, `AddCustomCarForm.tsx`, `DriveHub.tsx`, `main.tsx`, `db.json`, `server.js`
- Matteo: `Catalogo.tsx`, `Navbar.tsx`, `CarCard.tsx`, `UnderlineButton.tsx`, `Footer.tsx`, `types.ts`, `SideBar.tsx`, `README.md`
- Wassime: `Cart.tsx`, `CartContext.tsx`
- Dilia: `DetailsCar.tsx`

## Installazione

Clonare il repository:

```bash
git clone https://github.com/Framework-React-1-19/DriveHub.git
cd DriveHub
```

Installare le dipendenze del frontend:

```bash
npm install
```

Installare le dipendenze del backend:

```bash
cd server
npm install
cd ..
```

## Avvio

Aprire un terminale nella cartella principale del progetto e avviare il backend:

```bash
cd server
node server.js
```

Aprire un secondo terminale nella cartella principale del progetto e avviare il frontend:

```bash
npm run dev
```

Il backend sarà disponibile su `http://localhost:5000`.

Il terminale mostrerà l’indirizzo locale al quale aprire il frontend.
