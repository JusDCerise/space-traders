import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useDataFetching from "../useFetchingData";
import handleChangeStatus from "../functions/changeState";
import handleNavigate from "../functions/navigate";
import handleSell from "../functions/sell";
import handleExtractWithoutSurvey from "../functions/extract";

export default function Vaisseaux() {
  const { systemSymbol, shipSymbol } = useParams();
  const { data: shipsData, handleLogout } = useDataFetching(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}`, "ships");
  const { data: waypointsData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints?limit=20`, "waypoint");

  const [selectedWaypoints, setSelectedWaypoints] = useState({});

  const handleWaypointChange = (shipId, selectedWaypoint) => {
    setSelectedWaypoints((prevSelectedWaypoints) => ({
      ...prevSelectedWaypoints,
      [shipId]: selectedWaypoint,
    }));
  };

  const handleClickChangeStatus = (shipId, statut) => {
    handleChangeStatus(shipId, statut);
  };

  const handleClickNavigate = (waypoint, shipSymbol) => {
    handleNavigate(waypoint, shipSymbol);
  };

  const handleClickExtractWithoutSurvey = (shipSymbol) => {
    handleExtractWithoutSurvey(shipSymbol);
  };

  // const handleClickSell = (symbol, shipSymbol, units) => {
  //   handleSell(symbol, shipSymbol, units);
  // };

  return (
    <div className="content">
      {shipsData && waypointsData ? (
        <div>
          <h2>Ship {shipsData.symbol}</h2>
          <div className="ship">
            <p>
              Fuel: {shipsData.fuel.current}/{shipsData.fuel.capacity}
            </p>
            <p>
              Statut: {shipsData.nav.status}
              <button onClick={() => handleClickChangeStatus(shipsData.symbol, shipsData.nav.status === "IN_ORBIT" ? "dock" : "orbit")}>Change</button>
            </p>
            <p>Flight Mode: {shipsData.nav.flightMode}</p>
            <p>Acutal System: {shipsData.nav.systemSymbol}</p>
            <p>Waypoint: {shipsData.nav.waypointSymbol}</p>
            <p>
              Cargo: {shipsData.cargo.units}/{shipsData.cargo.capacity}
            </p>
            <button onClick={() => handleClickExtractWithoutSurvey(shipsData.symbol)}>Extract</button>
            <br />
            <Link to={`/shipyard/${shipsData.nav.systemSymbol}/${shipsData.symbol}`}>Buy a ship in system {shipsData.nav.systemSymbol}</Link>
            <p>or</p>
            <Link to={`/shipyard/${shipsData.nav.systemSymbol}/${shipsData.nav.waypointSymbol}/${shipsData.symbol}`}>Buy in {shipsData.nav.waypointSymbol}</Link>
            <div>
              <p>Navigate on another planet :</p>
              {shipsData.nav.status === "IN_ORBIT" ? (
                <>
                  <select name="waypoints" id="waypoints" value={selectedWaypoints[shipsData.symbol] || ""} onChange={(e) => handleWaypointChange(shipsData.symbol, e.target.value)}>
                    <option value="">Select a planet</option>
                    {waypointsData.map((waypoint) => (
                      <option key={waypoint.symbol} value={`${waypoint.symbol}`}>
                        {waypoint.symbol}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => handleClickNavigate(selectedWaypoints[shipsData.symbol], shipsData.symbol)}>Naviguer</button>
                </>
              ) : (
                <p>You have to be in orbit to navigate</p>
              )}
            </div>
            <div className="cargo"></div>
          </div>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}
