// import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  // console.log(shipsData);
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

              if (isMarketplace) {
                return <p className="trait">Marketplace</p>;
              } else if (isShipyard) {
                return <p className="trait">Shipyard</p>;
              }
            };

            const totalTime = (distance) => {
              if (shipsData.nav.flightMode === "CRUISE") {
                return Math.round(distance * (25 / shipsData.engine.speed) + 15);
              } else if (shipsData.nav.flightMode === "BURN") {
                return Math.round(distance * (12.5 / shipsData.engine.speed) + 15);
              } else if (shipsData.nav.flightMode === "DRIFT") {
                return Math.round(distance * (250 / shipsData.engine.speed) + 15);
              } else if (shipsData.nav.flightMode === "STEALTH") {
                return Math.round(distance * (30 / shipsData.engine.speed) + 15);
              }
            };

            const enableToNavigate = (distance) => {
              if (shipsData.fuel.capacity === 0) {
                return true;
              } else if (shipsData.nav.flightMode === "CRUISE") {
                if (shipsData.fuel.current < distance) {
                  return false;
                } else {
                  return true;
                }
              } else if (shipsData.nav.flightMode === "BURN") {
                if (shipsData.fuel.current < 2 * distance) {
                  return false;
                } else {
                  return true;
                }
              } else if (shipsData.nav.flightMode === "DRIFT") {
                if (shipsData.fuel.current < 1) {
                  return false;
                } else {
                  return true;
                }
              } else if (shipsData.nav.flightMode === "STEALTH") {
                if (shipsData.fuel.current < distance) {
                  return false;
                } else {
                  return true;
                }
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
                          <td>
                            {Number(Math.sqrt((waypoint.x - waypointData.x) ** 2 + (waypoint.y - waypointData.y) ** 2)).toFixed(1)} ({totalTime(Number(Math.sqrt((waypoint.x - waypointData.x) ** 2 + (waypoint.y - waypointData.y) ** 2)).toFixed(1))}s)
                          </td>
                          <td>{waypoint.type}</td>
                          <td>{getWaypointTrait(waypoint.symbol)}</td>
                          <td>
                            <button
                              className="btn-prm"
                              onClick={() => {
                                handleClickNavigate(waypoint.symbol, shipSymbol);
                              }}
                              disabled={!enableToNavigate(Number(Math.sqrt((waypoint.x - waypointData.x) ** 2 + (waypoint.y - waypointData.y) ** 2)).toFixed(1))}
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
        <div className="loader">
          <img src="/icons/loader.svg" alt="" />
        </div>
      )}
    </>
  );
}
