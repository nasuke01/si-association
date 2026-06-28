import { useState, useEffect } from 'react';
import axios from 'axios';

function Profil() {
  const [mesAnnonces, setMesAnnonces] = useState([]);
  const [annonceIdSelectionnee, setAnnonceIdSelectionnee] = useState(null);
  const [candidatures, setCandidatures] = useState([]);

  // On récupère l'utilisateur connecté depuis le localStorage
  const utilisateurStocke = localStorage.getItem('utilisateur');
  const utilisateur = utilisateurStocke ? JSON.parse(utilisateurStocke) : null;

  useEffect(() => {
    // Si l'utilisateur est connecté, on va chercher UNIQUEMENT ses annonces
    if (utilisateur) {
      axios.get(`http://localhost:5000/api/annonces/mes-annonces/${utilisateur._id}`)
        .then((res) => setMesAnnonces(res.data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, []);

  // FONCTION : Gérer le clic pour afficher les candidatures
  const voirCandidatures = (annonceId) => {
    // Si on clique sur l'annonce déjà ouverte, on la referme
    if (annonceIdSelectionnee === annonceId) {
      setAnnonceIdSelectionnee(null);
      return;
    }
    
    setAnnonceIdSelectionnee(annonceId);
    
    // On va chercher les réponses liées à cette annonce
    axios.get(`http://localhost:5000/api/reponses/annonce/${annonceId}`)
      .then((res) => setCandidatures(res.data))
      .catch((err) => console.error("Erreur :", err));
  };

  // Sécurité : si personne n'est connecté, on bloque l'accès
  if (!utilisateur) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">Vous devez être connecté pour accéder à votre profil.</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mon Profil</h2>
      
      {/* Encart d'information de l'utilisateur */}
      <div className="card shadow-sm p-4 mb-5 bg-white rounded border-0">
        <h5 className="text-primary">Vos informations personnelles</h5>
        <p className="mb-1"><strong>Nom :</strong> {utilisateur.nom}</p>
        <p className="mb-0"><strong>Email :</strong> {utilisateur.email}</p>
      </div>

      <h3 className="mb-3">Les annonces que j'ai publiées</h3>
      
      {mesAnnonces.length === 0 ? (
        <div className="alert alert-info">Vous n'avez publié aucune annonce pour le moment.</div>
      ) : (
        <div className="row">
          {mesAnnonces.map((annonce) => (
            <div className="col-12 mb-3" key={annonce._id}>
              <div className="card border-primary shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{annonce.titre}</h5>
                  <p className="text-muted small mb-3">{annonce.type_annonce}</p>
                  
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => voirCandidatures(annonce._id)}
                  >
                    {annonceIdSelectionnee === annonce._id ? "Cacher les candidatures" : "Voir les candidatures reçues"}
                  </button>

                  {/* ZONE DES CANDIDATURES QUI SE DÉROULE */}
                  {annonceIdSelectionnee === annonce._id && (
                    <div className="mt-4 p-3 bg-light rounded">
                      <h6 className="fw-bold">Candidatures reçues ({candidatures.length}) :</h6>
                      
                      {candidatures.length === 0 ? (
                        <p className="text-muted small mb-0">Aucun étudiant n'a postulé pour l'instant.</p>
                      ) : (
                        <ul className="list-group mt-3">
                          {candidatures.map((candidat) => {
                            // On crée le lien vers le CV en remplaçant les éventuels "\" par des "/" (utile sur Windows)
                            const lienCV = `http://localhost:5000/${candidat.cv_path.replace(/\\/g, '/')}`;
                            
                            return (
                              <li className="list-group-item border-0 mb-2 shadow-sm rounded" key={candidat._id}>
                                <p className="mb-1 text-primary"><strong>{candidat.postulant_id.nom}</strong> <span className="text-muted small">({candidat.postulant_id.email})</span></p>
                                <p className="small mb-2 text-dark"><em>"{candidat.message_motivation}"</em></p>
                                <a href={lienCV} target="_blank" rel="noreferrer" className="btn btn-outline-danger btn-sm">
                                  📄 Ouvrir le CV (PDF)
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
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

export default Profil;