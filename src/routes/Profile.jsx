// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";

export default function Profile() {
  const symbolDuJoueur = localStorage.getItem("symbolDuJoueur");
  const { data: userData } = useDataFetching(`https://api.spacetraders.io/v2/my/agent`, "agent");
  const storedToken = localStorage.getItem("token");

  document.title = `Profile: ${symbolDuJoueur}`;

  // console.log(userData);
  // console.log("test");

  const copyToken = () => {
    navigator.clipboard.writeText(storedToken);
    const copied = document.querySelector(".copied");
    copied.classList.add("active");
    setInterval(() => {
      copied.classList.remove("active");
    }, 3000);
  };

  return (
    <div className="content">
      <h1>Profile</h1>
      {userData ? (
        <div>
          <div className="headProfile">
            <img src="/images/user_picture.webp" alt="" />
            <div>
              <h2>
                Welcome captain {userData.symbol} <span className="minimize">({userData.accountId})</span>
              </h2>
              <p>Faction {userData.startingFaction}</p>
              <p>Headquarter: {userData.headquarters}</p>
              <p className="credits">Credits: {userData.credits}</p>
              <p>Fleet of {userData.shipCount} ships</p>
            </div>
          </div>
          <br />
          <label className="copyToken">
            <input type="text" value={storedToken} readOnly />
            <button onClick={copyToken}>Copy your token</button>
            <p className="copied">copied !</p>
          </label>
        </div>
      ) : (
        <div className="loader">
          <img src="/icons/loader.svg" alt="" />
        </div>
      )}
    </div>
  );
}
