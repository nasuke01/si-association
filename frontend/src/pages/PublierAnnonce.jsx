import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PublierAnnonce() {
  const [titre, setTitre] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('Stage');
  const [competence, setCompetence] = useState(''); // <-- La nouvelle variable
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('utilisateur'));
    if(!user) return alert("Connectez-vous d'abord !");

    try {
      // On envoie la compétence_requise au backend
      await axios.post('http://localhost:5000/api/annonces', { 
        titre, 
        description: desc, 
        type_annonce: type, 
        competence_requise: competence, // <-- L'envoi de la donnée
        auteur_id: user._id 
      });
      navigate('/');
    } catch (err) { 
      console.error(err);
      alert("Erreur de publication"); 
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 card p-4 shadow-sm">
          <h3 className="mb-4 text-center">Publier une opportunité</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Titre" className="form-control mb-3" onChange={(e) => setTitre(e.target.value)} required />
            <textarea placeholder="Description" className="form-control mb-3" onChange={(e) => setDesc(e.target.value)} required></textarea>
            
            {/* <-- Le nouveau champ pour la compétence --> */}
            <input type="text" placeholder="Compétence requise (ex: React, Design...)" className="form-control mb-3" onChange={(e) => setCompetence(e.target.value)} />
            
            <select className="form-select mb-4" onChange={(e) => setType(e.target.value)}>
              <option value="Stage">Stage</option>
              <option value="Projet">Projet</option>
              <option value="Entraide">Entraide</option>
            </select>
            <button className="btn btn-primary w-100">Publier sur le Board</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PublierAnnonce;