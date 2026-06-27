import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Inscription() {
  const [formData, setFormData] = useState({ nom: '', email: '', mot_de_passe: '', competence_principale: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/utilisateurs/inscription', formData);
      alert("Inscription réussie !");
      navigate('/connexion');
    } catch (err) { console.error(err); alert("Erreur d'inscription"); }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 card p-4 shadow">
          <h3 className="text-center mb-4">Créer un compte</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nom" className="form-control mb-3" onChange={(e) => setFormData({...formData, nom: e.target.value})} required />
            <input type="email" placeholder="Email" className="form-control mb-3" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            <input type="password" placeholder="Mot de passe" className="form-control mb-3" onChange={(e) => setFormData({...formData, mot_de_passe: e.target.value})} required />
            <input type="text" placeholder="Compétence (ex: React, PHP...)" className="form-control mb-4" onChange={(e) => setFormData({...formData, competence_principale: e.target.value})} />
            <button className="btn btn-primary w-100">S'inscrire</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Inscription;