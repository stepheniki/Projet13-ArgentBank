import { useState } from "react";
import argentBankLogo from "../assets/argentBankLogo.png";
import Axios from "axios";
import { useDispatch } from 'react-redux';
import { setToken } from '../store'; // Importez setToken depuis le store
import { useNavigate } from "react-router-dom";

function Login() {
  // États locaux pour gérer les valeurs de login, password et message d'erreur
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Utilisation du dispatcher Redux pour mettre à jour le token d'authentification
  const dispatch = useDispatch();

  // Utilisation de useNavigate pour obtenir la fonction de navigation
  const navigate = useNavigate();

  // Fonction de soumission du formulaire
  async function handleSubmit(e) {
    e.preventDefault(); // Empêche le comportement de soumission par défaut du formulaire
  
    try {
      // Appel à l'API pour la connexion en utilisant Axios
      const response = await Axios.post(
        'http://localhost:3001/api/v1/user/login',
        { email: login, password }
      );
  
      // Récupération du token de la réponse et mise à jour de l'état Redux
      const token = response.data.token;
      dispatch(setToken(token));

      // Redirection vers la page utilisateur après une connexion réussie
      navigate("/user");
    } catch (error) {
      // Gestion des erreurs en cas d'échec de connexion
      setErrorMessage("Mauvais e-mail ou mot de passe. Veuillez réessayer.");
    }
  }

  return (
    <div className="body-css">
      {/* Barre de navigation */}
      <nav className="main-nav">
        <a className="main-nav-logo" href="./">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="./login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </a>
        </div>
      </nav>
      {/* Contenu principal */}
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {/* Formulaire de connexion avec gestion de la soumission */}
          <form onSubmit={handleSubmit}>
            {/* Champ de saisie pour le nom d'utilisateur */}
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={login}
                onChange={e => setLogin(e.target.value)}
              />
            </div>
            {/* Champ de saisie pour le mot de passe */}
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {/* Option pour se souvenir de l'utilisateur */}
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {/* Affichage du message d'erreur si un message est présent */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {/* Bouton de soumission du formulaire */}
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
      {/* Pied de page */}
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default Login;
