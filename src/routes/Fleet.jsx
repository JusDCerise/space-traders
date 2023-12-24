import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";
import handleChangeStatus from "../functions/changeState";
import handleNavigate from "../functions/navigate";
import handleSell from "../functions/sell";

export default function Fleet() {
  const { data: shipsData, handleLogout } = useDataFetching("https://api.spacetraders.io/v2/my/ships", "ships");
  const { data: waypointsData } = useDataFetching("https://api.spacetraders.io/v2/systems/X1-HD34/waypoints?limit=20", "waypoint");

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

  // const handleClickSell = (symbol, shipSymbol, units) => {
  //   handleSell(symbol, shipSymbol, units);
  // };
  return (
    <div className="content">
      <h2>Your Fleet</h2>
      {shipsData && waypointsData ? (
        <table>
          <thead>
            <tr>
              <td>Symbol</td>
              <td>System</td>
              <td>Waypoint</td>
              <td>State</td>
              <td>Fuel</td>
              <td>Cargo</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {shipsData.map((ship) => (
              <tr key={ship.symbol} className="ship">
                <td>{ship.symbol}</td>
                <td>{ship.nav.systemSymbol}</td>
                <td>{ship.nav.waypointSymbol}</td>
                <td>
                  <button className="btn-prm" onClick={() => handleClickChangeStatus(ship.symbol, ship.nav.status === "IN_ORBIT" ? "dock" : "orbit")}>
                    {ship.nav.status}
                  </button>
                </td>
                <td>
                  {ship.fuel.current}
                  <span className="minimize">/{ship.fuel.capacity}</span>
                </td>
                <td>
                  {ship.cargo.units}
                  <span className="minimize">/{ship.cargo.capacity}</span>
                </td>
                <td>
                  <Link to={`/fleet/${ship.nav.systemSymbol}/${ship.nav.waypointSymbol}/${ship.symbol}`} className="btn-prm">
                    See more
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}
