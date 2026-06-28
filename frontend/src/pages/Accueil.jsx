import { useState, useEffect } from 'react';
import axios from 'axios';

function Accueil() {
  const [annonces, setAnnonces] = useState([]);
  
  // NOUVEAUX STATES : Pour gérer le formulaire de candidature
  const [annonceIdSelectionnee, setAnnonceIdSelectionnee] = useState(null); // Savoir quelle annonce est ouverte
  const [motivation, setMotivation] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [messageValidation, setMessageValidation] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/annonces')
      .then((reponse) => {
        setAnnonces(reponse.data);
      })
      .catch((erreur) => {
        console.error("Erreur de connexion au backend :", erreur);
      });
  }, []);

  // FONCTION : Gérer l'envoi de la candidature
  const handlePostuler = async (e, annonceId) => {
    e.preventDefault(); // Empêche la page de se recharger

    // 1. On vérifie si l'utilisateur est connecté 
    const utilisateurStocke = localStorage.getItem('utilisateur');
    if (!utilisateurStocke) {
      alert("Vous devez être connecté pour postuler !");
      return;
    }
    const utilisateur = JSON.parse(utilisateurStocke);

    // 2. On prépare les données avec FormData 
    const formData = new FormData();
    formData.append('message_motivation', motivation);
    formData.append('annonce_id', annonceId);
    formData.append('postulant_id', utilisateur._id);
    formData.append('cv', cvFile); // Le nom 'cv' correspond à upload.single('cv') du backend

    try {
      // 3. On envoie au backend en précisant qu'il y a un fichier
      await axios.post('http://localhost:5000/api/reponses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // 4. Si c'est un succès, on affiche un message et on nettoie le formulaire
      setMessageValidation("Candidature envoyée avec succès !");
      setAnnonceIdSelectionnee(null); 
      setMotivation('');
      setCvFile(null);

      // Le message de succès disparait après 3 secondes
      setTimeout(() => setMessageValidation(''), 3000);

    } catch (erreur) {
      console.error("Erreur lors de l'envoi de la candidature :", erreur);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Le Board des Opportunités</h2>

      {/* Message de succès global */}
      {messageValidation && (
        <div className="alert alert-success">{messageValidation}</div>
      )}
      
      {annonces.length === 0 ? (
        <div className="alert alert-info">
          Aucune annonce pour le moment. Soyez le premier à en publier une !
        </div>
      ) : (
        <div className="row">
          {annonces.map((annonce) => (
            <div className="col-md-4 mb-4" key={annonce._id}>
              <div className="card h-100 shadow-sm border-primary">
                <div className="card-body">
                  <span className="badge bg-primary mb-2">{annonce.type_annonce}</span>
                  <h5 className="card-title">{annonce.titre}</h5>
                  <p className="card-text">{annonce.description}</p>
                  <hr />
                  <p className="text-muted small mb-3">
                    Compétence requise : <strong>{annonce.competence_requise || "Non spécifiée"}</strong>
                  </p>

                  {/* BOUTON POSTULER */}
                  <button 
                    className="btn btn-outline-primary btn-sm w-100"
                    onClick={() => setAnnonceIdSelectionnee(annonce._id)}
                  >
                    Postuler à cette annonce
                  </button>

                  {/* LE FORMULAIRE QUI APPARAÎT SEULEMENT SI ON A CLIQUÉ */}
                  {annonceIdSelectionnee === annonce._id && (
                    <form className="mt-3 p-3 bg-light rounded" onSubmit={(e) => handlePostuler(e, annonce._id)}>
                      <div className="mb-2">
                        <label className="form-label small font-weight-bold">Message de motivation</label>
                        <textarea 
                          className="form-control form-control-sm" 
                          rows="3" 
                          required
                          value={motivation}
                          onChange={(e) => setMotivation(e.target.value)}
                        ></textarea>
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label small font-weight-bold">Joindre votre CV (PDF)</label>
                        <input 
                          type="file" 
                          className="form-control form-control-sm" 
                          accept=".pdf" 
                          required
                          onChange={(e) => setCvFile(e.target.files[0])} // On récupère le fichier
                        />
                      </div>

                      <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setAnnonceIdSelectionnee(null)}>Annuler</button>
                        <button type="submit" className="btn btn-success btn-sm">Envoyer</button>
                      </div>
                    </form>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default Accueil;