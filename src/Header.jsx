import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useDataFetching from "./functions/useFetchingData";

export default function Header() {
  const navigate = useNavigate();
  const { data: userData, handleLogout } = useDataFetching(`https://api.spacetraders.io/v2/my/agent`, "agent");

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  // const credits = localStorage.getItem("credits");
  // const symbolDuJoueur = localStorage.getItem("symbolDuJoueur");

  return (
    <div className="header">
      <img src="/images/logo.svg" alt="" />
      <div className="headerNav">
        {/* <Link to={"/"} className="headerLink">
          <img src="/icons/user.svg" alt="" className="link-icon" />
          <span>Home</span>
        </Link> */}
        <Link to={"/profile"} className="headerLink">
          <img src="/icons/user.svg" alt="" className="link-icon" />
          <span>Profile</span>
        </Link>
        <Link to={"/fleet"} className="headerLink">
          <img src="/icons/ship.svg" alt="" className="link-icon" />
          <span>Fleet</span>
        </Link>
      </div>
      <button onClick={handleLogout} className="headerLink logout">
        <img src="/icons/logout.svg" alt="" className="link-icon" />
        <span>Log out</span>
      </button>
      {/* <div className="user">
          <p>{symbolDuJoueur}</p>
          <p>{credits} credits</p>
        </div> */}
      {userData ? (
        <div className="user">
          <p>{userData.symbol}</p>
          <p>{userData.credits} credits</p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
