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
        // <section className="table">
        //   <div className="thead">

        //   </div>
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
                  <Link to={`/fleet/${ship.nav.systemSymbol}/${ship.symbol}`} className="btn-prm">
                    See more
                  </Link>
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
