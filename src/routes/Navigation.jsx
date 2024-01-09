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
  const { data: shipyardData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints?traits=SHIPYARD`, "shipyard");
  const { data: marketplaceData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints?traits=MARKETPLACE`, "marketplace");

  // console.log(shipyardData);
  // console.log(marketplaceData);

  const handleClickNavigate = (waypoint, shipSymbol) => {
    handleNavigate(waypoint, shipSymbol);
    setResetState((prevResetState) => !prevResetState);
  };

  const handleClickOpenNav = () => {
    handleOpenNav();
  };
  // console.log(shipsData);

  return (
    <>
      {shipsData && systemData && waypointData && shipyardData && marketplaceData ? (
        <>
          {(() => {
            const sortedWaypoints = systemData.waypoints.slice().sort((a, b) => {
              const distanceA = Math.sqrt((a.x - waypointData.x) ** 2 + (a.y - waypointData.y) ** 2);
              const distanceB = Math.sqrt((b.x - waypointData.x) ** 2 + (b.y - waypointData.y) ** 2);
              return distanceA - distanceB;
            });

            const getWaypointTrait = (waypointSymbol) => {
              const isShipyard = shipyardData.some((waypoint) => waypoint.symbol === waypointSymbol);
              const isMarketplace = marketplaceData.some((waypoint) => waypoint.symbol === waypointSymbol);

              if (isShipyard) {
                return "Shipyard";
              } else if (isMarketplace) {
                return "Marketplace";
              } else {
                return "";
              }
            };

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
                        <td>Traits</td>
                        <td>Navigate</td>
                      </tr>
                    </thead>
                    <tbody className="waypointsBody">
                      {sortedWaypoints.map((waypoint) => (
                        <tr key={waypoint.symbol}>
                          <td>{waypoint.symbol}</td>
                          <td>{Number(Math.sqrt((waypoint.x - waypointData.x) ** 2 + (waypoint.y - waypointData.y) ** 2)).toFixed(1)}</td>
                          <td>{waypoint.type}</td>
                          <td>
                            <p className="trait">{getWaypointTrait(waypoint.symbol)}</p>
                          </td>
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
