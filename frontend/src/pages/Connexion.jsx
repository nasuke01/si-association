import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/utilisateurs/connexion', { email, mot_de_passe: password });
      localStorage.setItem('utilisateur', JSON.stringify(res.data)); // On stocke l'utilisateur
      alert(`Content de vous revoir, ${res.data.nom} !`);
      navigate('/');
    } catch (err) { console.error(err); alert("Identifiants incorrects"); }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4 card p-4 shadow">
          <h3 className="text-center mb-4">Connexion</h3>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" className="form-control mb-3" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Mot de passe" className="form-control mb-4" onChange={(e) => setPassword(e.target.value)} required />
            <button className="btn btn-success w-100">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Connexion;