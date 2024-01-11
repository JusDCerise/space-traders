// import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";
import handleBuy from "../functions/buy";

export default function Shipyard() {
  const { shipSymbol } = useParams();
  const systemSymbol = localStorage.getItem("systemSymbol");
  const waypointSymbol = localStorage.getItem("waypointSymbol");

  const { data: shipyardData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`, "shipyard");

  document.title = `Shipyard of ${waypointSymbol}`;


  // console.log(shipyardData);
  const handleClickBuy = (shipType, waypoint, shipPrice) => {
    handleBuy(shipType, waypoint, shipPrice);
  };

  const handleReset = () => {
    (prevResetState) => !prevResetState;
  };

  return (
    <div className="content">
      <h1>Shipyard {waypointSymbol}</h1>
      {shipyardData ? (
        <>
          <div className="shipyard">
            {shipyardData.ships.map((ship) => (
              <div key={ship.type} className="ship">
                <p className="icon-text">
                  <img src="/icons/spaceship.svg" alt="" /> {ship.type}
                </p>
                <p className="description">{ship.description}</p>
                <br />
                <p className="icon-text">
                  <img src="/icons/speed.svg" alt="" /> Speed : {ship.engine.speed}
                </p>
                <p className="icon-text">
                  <img src="/icons/fuel.svg" alt="" /> Fuel capacity : {ship.frame.fuelCapacity}
                </p>
                <div className="row-between">
                  <p className="credits">{ship.purchasePrice}</p>
                  <button
                    onClick={() => {
                      handleClickBuy(ship.type, waypointSymbol, ship.purchasePrice);
                      handleReset();
                    }}
                    className="btn-prm"
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
          <br />
          <br />
          <Link to={`/fleet/${shipSymbol}`} className="btn-prm">
            Back to your ship
          </Link>
        </>
      ) : (
        <div className="loader">
          <img src="/icons/loader.svg" alt="" />
        </div>
      )}
    </div>
  );
}
