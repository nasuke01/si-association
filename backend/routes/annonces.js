const express = require('express');
const router = express.Router();
const Annonce = require('../models/Annonce'); 
//  ROUTE GET : Récupérer toutes les annonces
router.get('/', async (req, res) => {
  try {
    // Le .populate permet de récupérer le nom de l'auteur au lieu de juste son ID
    const annonces = await Annonce.find().populate('auteur_id', 'nom');
    res.json(annonces);
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
});

// ROUTE POST : Créer une nouvelle annonce
router.post('/', async (req, res) => {
  try {
    const nouvelleAnnonce = new Annonce(req.body);
    const annonceSauvegardee = await nouvelleAnnonce.save();
    res.status(201).json(annonceSauvegardee);
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
});

module.exports = router;