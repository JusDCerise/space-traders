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
  const { data: waypointData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}`, "waypoint");

  // console.log(systemData);
  // console.log(waypointData);

  const handleClickNavigate = (waypoint, shipSymbol) => {
    handleNavigate(waypoint, shipSymbol);
  };

  const handleClickOpenNav = () => {
    handleOpenNav();
  };
  // console.log(shipsData);

  return (
    <>
      {shipsData && systemData && waypointData ? (
        <>
          {(() => {
            const sortedWaypoints = systemData.waypoints.slice().sort((a, b) => {
              const distanceA = Math.sqrt((a.x - waypointData.x) ** 2 + (a.y - waypointData.y) ** 2);
              const distanceB = Math.sqrt((b.x - waypointData.x) ** 2 + (b.y - waypointData.y) ** 2);
              return distanceA - distanceB;
            });

            return (
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
                        {/* <td>Traits</td> */}
                        <td>Navigate</td>
                      </tr>
                    </thead>
                    <tbody className="waypointsBody">
                      {sortedWaypoints.map((waypoint) => (
                        <tr key={waypoint.symbol}>
                          <td>{waypoint.symbol}</td>
                          <td>{Number(Math.sqrt((waypoint.x - waypointData.x) ** 2 + (waypoint.y - waypointData.y) ** 2)).toFixed(1)}</td>
                          <td>{waypoint.type}</td>
                          {/* <td></td> */}
                          <td>
                            <button
                              className="btn-prm"
                              onClick={() => {
                                handleClickNavigate(waypoint.symbol, shipSymbol);
                              }}
                            >
                              Navigate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })()}
        </>
      ) : (
        <p className="navigation">Chargement des données...</p>
      )}
    </>
  );
}
