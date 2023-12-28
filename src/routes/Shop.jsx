import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";

export default function Shop() {
  // const { shipSymbol } = useParams();
  const systemSymbol = localStorage.getItem("systemSymbol");
  const waypointSymbol = localStorage.getItem("waypointSymbol");
  const shipSymbol = localStorage.getItem("shipSymbol");

  const { data: shipyardData, handleLogout } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints?traits=SHIPYARD`, "shipyard");

  return (
    <div className="content">
      <h2>All Shipyards in System {systemSymbol}</h2>
      {shipyardData ? (
        <div>
          <p>Choose a shipyard</p>
          {shipyardData.map((shipyard) => (
            <div key={shipyard.symbol} className="ship">
              <p>Symbol : {shipyard.symbol}</p>
              <p>Type : {shipyard.type}</p>
              <Link
                to={`/shipyard/${shipSymbol}/`}
                onClick={() => {
                  localStorage.setItem("waypointSymbol", shipyard.symbol);
                }}
              >
                View avaibles ships
              </Link>
              <button onClick={() => handleClickNavigate(shipyard.symbol, shipSymbol)}>
                Navigate to {shipyard.symbol} with {shipSymbol}
              </button>
            </div>
          ))}
          <Link to={"/fleet"}>Back to your ships</Link>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}
