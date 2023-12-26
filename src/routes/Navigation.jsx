import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";
// import handleChangeStatus from "../functions/changeState";
import { handleNavigate, handleOpenNav } from "../functions/navigate";

export default function Navigation() {
  const { shipSymbol } = useParams();
  const systemSymbol = localStorage.getItem("systemSymbol");
  const waypointSymbol = localStorage.getItem("waypointSymbol");

  const { data: shipsData } = useDataFetching(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}`, "ships");
  const { data: systemData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}`, "system");

  const handleClickNavigate = (waypoint, shipSymbol) => {
    handleNavigate(waypoint, shipSymbol);
  };

  const handleClickOpenNav = () => {
    handleOpenNav();
  };
  // console.log(shipsData);

  return (
    <>
      {shipsData && systemData ? (
        <>
          <section className="navigation">
            <div className="navigation_head">
              <h2>Navigate with {shipSymbol}</h2>
              <button className="btn-prm" onClick={handleClickOpenNav}>
                close
              </button>
            </div>
            <div className="waypointsTable">
              <table>
                <thead className="waypointsHead">
                  <tr>
                    <td>Waypoint</td>
                    <td>Distance</td>
                    <td>Type</td>
                    <td>Traits</td>
                    <td>Navigate</td>
                  </tr>
                </thead>
                <tbody className="waypointsBody">
                  {/* {systemData.waypoints.map((waypoint) => (
                    <tr key={waypoint.symbol}>
                      <td>{waypoint.symbol}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <button className="btn-prm" onClick={handleClickNavigate(waypoint.symbol, shipSymbol)}>
                          Navigate
                        </button>
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          </section>
          <div className="backgroundNav"></div>
        </>
      ) : (
        <p>Chargement des données...</p>
      )}
    </>
  );
}
