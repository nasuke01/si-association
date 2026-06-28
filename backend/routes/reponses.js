const express = require('express');
const router = express.Router();
const multer = require('multer');
const Reponse = require('../models/Reponse');

// --- CONFIGURATION DE MULTER ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


router.post('/', upload.single('cv'), async (req, res) => {
  try {
    const nouvelleReponse = new Reponse({
      message_motivation: req.body.message_motivation,
      annonce_id: req.body.annonce_id,
      postulant_id: req.body.postulant_id,
      cv_path: req.file.path // <-- Multer nous donne directement le chemin du fichier stocké
    });
    
    const reponseSauvegardee = await nouvelleReponse.save();
    res.status(201).json(reponseSauvegardee);
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
});


router.get('/annonce/:id', async (req, res) => {
  try {
    const reponses = await Reponse.find({ annonce_id: req.params.id })
                                  .populate('postulant_id', 'nom email');
    res.json(reponses);
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
});

module.exports = router;