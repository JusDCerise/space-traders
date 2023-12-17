import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useDataFetching from "../useFetchingData";
import handleBuy from "../functions/buy";

export default function Shipyard() {
  const { systemSymbol, shipyardSymbol, shipSymbol } = useParams();
  const { data: shipyardData, handleLogout } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${shipyardSymbol}/shipyard`, "shipyard");

  const handleClickBuy = (shipType, waypoint) => {
    handleBuy(shipType, waypoint);
  };

  return (
    <div className="content">
      <h2>Shipyard {shipyardSymbol}</h2>
      {shipyardData ? (
        <div>
          {shipyardData.shipTypes.map((shipType) => (
            <div key={shipType.type} className="ship">
              <p>{shipType.type}</p>
              <button onClick={() => handleClickBuy(shipType.type, shipyardSymbol)}>Buy</button>
            </div>
          ))}
          <Link to={`/shipyard/${systemSymbol}/${shipSymbol}`}>Back to all shipyards</Link>
          <Link to={"/fleet"}>Back to your ships</Link>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}
