import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  
  // On vérifie si un utilisateur est connecté en regardant dans la mémoire du navigateur
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));

  const handleDeconnexion = () => {
    localStorage.removeItem('utilisateur'); // On vide la mémoire
    navigate('/connexion'); // On le renvoie vers la page de connexion
    window.location.reload(); // On rafraîchit pour mettre à jour le menu
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">AssoWeb</Link>
        
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Le Board</Link>
            </li>
            {/* Nouveau lien pour l'annuaire */}
            <li className="nav-item">
              <Link className="nav-link" to="/annuaire">Annuaire</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {/* Si l'utilisateur est connecté, on affiche "Publier" et "Déconnexion" */}
            {utilisateur ? (
              <>
                <li className="nav-item me-3">
                  <span className="nav-link text-info">👤 {utilisateur.nom}</span>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light me-2" to="/publier">+ Publier</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleDeconnexion}>Déconnexion</button>
                </li>
              </>
            ) : (
              /* Sinon, on affiche Connexion / Inscription */
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/connexion">Connexion</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary ms-2" to="/inscription">S'inscrire</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;