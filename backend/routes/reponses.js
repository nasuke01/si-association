const express = require('express');
const router = express.Router();
const Reponse = require('../models/Reponse');

// ROUTE POST : Envoyer une candidature/réponse
router.post('/', async (req, res) => {
  try {
    const nouvelleReponse = new Reponse(req.body);
    const reponseSauvegardee = await nouvelleReponse.save();
    res.status(201).json(reponseSauvegardee);
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
});

// ROUTE GET : Voir les réponses pour une annonce spécifique
router.get('/annonce/:id', async (req, res) => {
  try {
    // On récupère les réponses et on ramène le nom et l'email du postulant
    const reponses = await Reponse.find({ annonce_id: req.params.id })
                                  .populate('postulant_id', 'nom email');
    res.json(reponses);
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
});

module.exports = router;