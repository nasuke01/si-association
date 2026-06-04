const mongoose = require('mongoose');

const reponseSchema = new mongoose.Schema({
  message: { 
    type: String, 
    required: true 
  },
  date_reponse: { 
    type: Date, 
    default: Date.now 
  },
  annonce_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Annonce', 
    required: true 
  },
  postulant_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Utilisateur', 
    required: true 
  }
});

module.exports = mongoose.model('Reponse', reponseSchema);