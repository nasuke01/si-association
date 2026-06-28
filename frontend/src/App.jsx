import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Accueil from './pages/Accueil';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import PublierAnnonce from './pages/PublierAnnonce';
import Profil from './pages/Profil';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/publier" element={<PublierAnnonce />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  );
}

export default App;