const mongoose = require('mongoose');

const ReponseSchema = new mongoose.Schema({
  message_motivation: { type: String, required: true },
  cv_path: { type: String, required: true }, // C'est ici qu'on stockera le nom du PDF
  annonce_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Annonce' },
  postulant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  date_reponse: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reponse', ReponseSchema);