import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useDataFetching from "./functions/useFetchingData";

export default function Header() {
  const { data: userData, handleLogout } = useDataFetching(`https://api.spacetraders.io/v2/my/agent`, "user");

  const navigate = useNavigate();

  return (
    <div className="header">
      <img src="" alt="" />
      <Link to={"/"}>Home</Link>
      <Link to={"/profile"}>Profile</Link>
      <Link to={"/fleet"}>Fleet</Link>
      <button onClick={handleLogout}>Log out</button>
      {userData ? (
        <div className="user">
          <p>{userData.symbol}</p>
          <p>{userData.credits} credits</p>
        </div>
      ) : (
        <p>chargement des données</p>
      )}
    </div>
  );
}
