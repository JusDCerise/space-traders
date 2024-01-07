import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";
import handleBuy from "../functions/buy";

export default function Shipyard() {
  const { shipSymbol } = useParams();
  const systemSymbol = localStorage.getItem("systemSymbol");
  const waypointSymbol = localStorage.getItem("waypointSymbol");

  const { data: shipyardData, handleLogout } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`, "shipyard");

  // console.log(shipyardData);
  const handleClickBuy = (shipType, waypoint) => {
    handleBuy(shipType, waypoint);
  };

  return (
    <div className="content">
      <h2>Shipyard {waypointSymbol}</h2>
      {shipyardData ? (
        <div>
          {shipyardData.ships.map((ship) => (
            <div key={ship.type} className="ship">
              <p>{ship.type}</p>
              <p>{ship.purchasePrice}</p>
              <button onClick={() => handleClickBuy(ship.type, waypointSymbol)} className="btn-prm">Buy</button>
            </div>
          ))}
          <Link to={`/shop`} className="btn-prm">Back to all shipyards</Link>
          <Link to={"/fleet"} className="btn-prm">Back to your ships</Link>
        </div>
      ) : (
        <div className="loader">
          <img src="/icons/loader.svg" alt="" />
        </div>
      )}
    </div>
  );
}
