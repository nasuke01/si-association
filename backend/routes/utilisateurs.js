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

module.exports = router;