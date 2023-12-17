import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useDataFetching from "../useFetchingData";

export default function Profile() {
  const { data: userData, handleLogout } = useDataFetching(`https://api.spacetraders.io/v2/my/agent`, "agent");
  const { data: contractsData } = useDataFetching(`https://api.spacetraders.io/v2/my/contracts`, "contracts");

  return (
    <div className="content">
      <h2>Profile</h2>
      {userData && contractsData ? (
        <div>
          <p>Username: {userData.symbol}</p>
          <p>Start Faction: {userData.startingFaction}</p>
          <p>Actual location: {userData.headquarters}</p>
          <p>Contracts: {contractsData[0].type}</p>
          <p>Account ID: {userData.accountId}</p>
          <p>Credits: {userData.credits}</p>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}
