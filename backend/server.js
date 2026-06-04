const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- Middlewares ---
// Autorise React à communiquer avec notre API
app.use(cors());
// Permet de lire les données envoyées en format JSON
app.use(express.json());

// --- Connexion à MongoDB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connexion à MongoDB réussie !"))
  .catch((err) => console.log("❌ Erreur de connexion MongoDB :", err));

// --- Importation des routes ---
const annoncesRoutes = require('./routes/annonces');
app.use('/api/annonces', annoncesRoutes);

const utilisateursRoutes = require('./routes/utilisateurs');
app.use('/api/utilisateurs', utilisateursRoutes);

app.get('/', (req, res) => {
  res.send("L'API de l'association fonctionne parfaitement !");
});

// --- Lancement du serveur ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});