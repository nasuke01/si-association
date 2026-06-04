const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
  titre: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  type_annonce: { 
    type: String, 
    required: true 
  },
  competence_requise: { 
    type: String 
  },
  date_creation: { 
    type: Date, 
    default: Date.now 
  },
  auteur_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Utilisateur', 
    required: true 
  }
});

module.exports = mongoose.model('Annonce', annonceSchema);