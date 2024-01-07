import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Connexion() {
  const [token, setToken] = useState("");
  const [tokenSaisi, setTokenSaisi] = useState("");
  const [symbolJoueur, setSymbolJoueur] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setToken(tokenSaisi);
  }, [tokenSaisi]);

  const handleLogin = async (inputToken) => {
    try {
      const response = await fetch("https://api.spacetraders.io/v2/my/agent", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${inputToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSymbolJoueur(data.data.symbol);
        localStorage.setItem("token", inputToken);
        localStorage.setItem("symbolDuJoueur", data.data.symbol);
        navigate("/");
      } else {
        console.error("Erreur lors de la requête. Veuillez réessayer.");
        alert("Votre token n'est pas bon, veuillez réessayer");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    handleLogin(tokenSaisi);
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: username,
          faction: "COSMIC",
        }),
      };

      const response = await fetch("https://api.spacetraders.io/v2/register", options);

      if (response.ok) {
        const responseData = await response.json();
        setTokenSaisi(responseData.data.token);
        handleLogin(responseData.data.token);
      } else {
        // console.error("Erreur lors de la requête. Veuillez réessayer.");
        alert("Ce nom d'utilisateur est déjà pris");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (
    <div className="loginPage">
      <div>
        <h2>Page de Connexion</h2>
      </div>
      <div>
        <form onSubmit={handleLoginSubmit} className="loginForm">
          <label>
            Token de Connexion :
            <input type="text" value={tokenSaisi} onChange={(e) => setTokenSaisi(e.target.value)} />
          </label>
          <button type="submit">Se connecter</button>
        </form>
        <form onSubmit={handleCreateAccount} className="creatAccount">
          <label>
            Votre nom d'utilisateur :
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <button type="submit">Créer un compte</button>
        </form>
      </div>
    </div>
  );
}
