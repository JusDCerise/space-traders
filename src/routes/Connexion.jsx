import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Connexion() {
  const [token, setToken] = useState("");
  const [tokenSaisi, setTokenSaisi] = useState("");
  const [symbolJoueur, setSymbolJoueur] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  document.title = `Space Traders - Login`;

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

  const changeConnexion = (type) => {
    const createButton = document.querySelector(".createAccountButton");
    const loginButton = document.querySelector(".loginButton");
    const createForm = document.querySelector(".createAccount");
    const loginForm = document.querySelector(".loginForm");

    if (type === "create") {
      createButton.classList.add("active");
      createForm.classList.add("active");
      loginButton.classList.remove("active");
      loginForm.classList.remove("active");
    }
    if (type === "login") {
      createButton.classList.remove("active");
      createForm.classList.remove("active");
      loginButton.classList.add("active");
      loginForm.classList.add("active");
    }
  };

  return (
    <div className="loginPage">
      <div className="loginImg">
        <img src="/images/login.webp" alt="" className="backgroundLogin" />
        <h1>Welcome on</h1>
        <img src="/images/logo_white.svg" alt="" />
      </div>
      <div className="loginDiv">
        <div className="chooseSection">
          <div className="loginButton active" onClick={() => changeConnexion("login")}>
            Login
          </div>
          <div className="createAccountButton" onClick={() => changeConnexion("create")}>
            Create an account
          </div>
        </div>
        <div className="formSection">
          <form onSubmit={handleLoginSubmit} className="loginForm active">
            <label className="inputStyle">
              <input type="text" value={tokenSaisi} onChange={(e) => setTokenSaisi(e.target.value)} />
              <p>Your token :</p>
            </label>
            <button type="submit" className="btn-prm">
              Log in
            </button>
          </form>
          <form onSubmit={handleCreateAccount} className="createAccount">
            <label className="inputStyle">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              <p>Choose a username :</p>
            </label>
            <button type="submit" className="btn-prm">
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
