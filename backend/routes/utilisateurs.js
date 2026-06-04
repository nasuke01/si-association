const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/Utilisateur');

// ROUTE GET : Récupérer tous les membres (pour l'annuaire de l'association)
router.get('/', async (req, res) => {
  try {
    // Le .select('-mot_de_passe') permet de ne pas renvoyer les mots de passe par sécurité
    const utilisateurs = await Utilisateur.find().select('-mot_de_passe');
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
});

// ROUTE POST : Inscription d'un nouveau membre
router.post('/inscription', async (req, res) => {
  try {
    const nouvelUtilisateur = new Utilisateur(req.body);
    const utilisateurSauvegarde = await nouvelUtilisateur.save();
    res.status(201).json(utilisateurSauvegarde);
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
});

// ROUTE POST : Connexion d'un membre
router.post('/connexion', async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    
    // On cherche un utilisateur qui a cet email ET ce mot de passe
    const utilisateur = await Utilisateur.findOne({ email, mot_de_passe });

    if (!utilisateur) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Si ça correspond, on renvoie les infos de l'utilisateur
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
});

module.exports = router;