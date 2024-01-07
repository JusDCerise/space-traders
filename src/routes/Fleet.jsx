import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";
import handleChangeStatus from "../functions/changeState";

export default function Fleet() {
  const { data: shipsData, handleLogout, setResetState } = useDataFetching("https://api.spacetraders.io/v2/my/ships", "ships");
  // console.log(shipsData);

  const handleClickChangeStatus = (shipId, statut) => {
    handleChangeStatus(shipId, statut);
  };

  const handleReset = () => {
    setResetState((prevResetState) => !prevResetState);
  };

  return (
    <div className="content">
      <h2>Your Fleet</h2>
      {shipsData ? (
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
                  <button
                    className="btn-prm"
                    onClick={() => {
                      handleClickChangeStatus(ship.symbol, ship.nav.status === "IN_ORBIT" ? "dock" : "orbit");
                      handleReset();
                    }}
                  >
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
                  <Link
                    to={`/fleet/${ship.symbol}`}
                    className="btn-prm"
                    onClick={() => {
                      localStorage.setItem("waypointSymbol", ship.nav.waypointSymbol);
                      localStorage.setItem("systemSymbol", ship.nav.systemSymbol);
                    }}
                  >
                    See more
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="loader">
          <img src="/icons/loader.svg" alt="" />
        </div>
      )}
    </div>
  );
}
