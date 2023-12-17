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
      <h2>Your Ships</h2>

      {shipsData && waypointsData ? (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>System</th>
              <th>Waypoint</th>
              <th>State</th>
              <th>Fuel</th>
              <th>Cargo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipsData.map((ship) => (
              <tr key={ship.symbol} className="ship">
                <td>{ship.symbol}</td>
                <td>{ship.nav.systemSymbol}</td>
                <td>{ship.nav.waypointSymbol}</td>
                <td>{ship.nav.status}</td>
                <td>
                  {ship.fuel.current}/{ship.fuel.capacity}
                </td>
                <td>
                  {ship.cargo.units}/{ship.cargo.capacity}
                </td>
                <td>
                  <Link to={`/fleet/${ship.nav.systemSymbol}/${ship.symbol}`}>See more</Link>
                </td>
                {/* <p>Ship: {ship.symbol}</p>
              <Link to={`/ships/${ship.symbol}`}>See more</Link>
              <p>Fuel: {ship.fuel.current}</p>
              <p>
                Statut: {ship.nav.status}
                <button onClick={() => handleClickChangeStatus(ship.symbol, ship.nav.status === "IN_ORBIT" ? "dock" : "orbit")}>Change</button>
              </p>
              <p>Flight Mode: {ship.nav.flightMode}</p>
              <p>Acutal System: {ship.nav.systemSymbol}</p>
              <p>Waypoint: {ship.nav.waypointSymbol}</p>
              <Link to={`/shipyard/${ship.symbol}/${ship.nav.systemSymbol}`}>Buy a ship in system {ship.nav.systemSymbol}</Link>
              <p>or</p>
              <Link to={`/shipyard/${ship.symbol}/${ship.nav.systemSymbol}/${ship.nav.waypointSymbol}`}>Buy in {ship.nav.waypointSymbol}</Link>
              <div>
                <p>Navigate on another planet :</p>
                {ship.nav.status === "IN_ORBIT" ? (
                  <>
                    <select name="waypoints" id="waypoints" value={selectedWaypoints[ship.symbol] || ""} onChange={(e) => handleWaypointChange(ship.symbol, e.target.value)}>
                      <option value="">Select a planet</option>
                      {waypointsData.map((waypoint) => (
                        <option key={waypoint.symbol} value={`${waypoint.symbol}`}>
                          {waypoint.symbol}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => handleClickNavigate(selectedWaypoints[ship.symbol], ship.symbol)}>Naviguer</button>
                  </>
                ) : (
                  <p>You have to be in orbit to navigate</p>
                )}
              </div> */}
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
