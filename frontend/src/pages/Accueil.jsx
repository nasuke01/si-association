import { useState, useEffect } from 'react';
import axios from 'axios';

function Accueil() {
  // On crée une variable 'annonces' qui est un tableau vide au départ.
  const [annonces, setAnnonces] = useState([]);

  // useEffect s'exécute au chargement de la page 
  useEffect(() => {
    // On va chercher les données sur notre backend
    axios.get('http://localhost:5000/api/annonces')
      .then((reponse) => {
        setAnnonces(reponse.data); // On sauvegarde les données reçues
      })
      .catch((erreur) => {
        console.error("Erreur de connexion au backend :", erreur);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Le Board des Opportunités</h2>
      
      {/* Si le tableau est vide, on affiche un message */}
      {annonces.length === 0 ? (
        <div className="alert alert-info">
          Aucune annonce pour le moment. Soyez le premier à en publier une !
        </div>
      ) : (
        // Sinon, on affiche une grille de cartes
        <div className="row">
          {annonces.map((annonce) => (
            <div className="col-md-4 mb-4" key={annonce._id}>
              <div className="card h-100 shadow-sm border-primary">
                <div className="card-body">
                  <span className="badge bg-primary mb-2">{annonce.type_annonce}</span>
                  <h5 className="card-title">{annonce.titre}</h5>
                  <p className="card-text">{annonce.description}</p>
                  <hr />
                  <p className="text-muted small mb-0">
                    Compétence requise : <strong>{annonce.competence_requise || "Non spécifiée"}</strong>
                  </p>
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