// import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";
// import handleChangeStatus from "../functions/changeState";
import { handleNavigate, handleOpenNav } from "../functions/navigate";
import { calculateDistance } from "../functions/navigationDistance/calculateDistance";
import { enableToNavigate } from "../functions/navigationDistance/enableToNavigate";
import { totalTime } from "../functions/navigationDistance/totalTime";

export default function Navigation() {
  const { shipSymbol } = useParams();
  const systemSymbol = localStorage.getItem("systemSymbol");
  const waypointSymbol = localStorage.getItem("waypointSymbol");
  const systemLocalData = JSON.parse(localStorage.getItem(systemSymbol));

  if (systemLocalData) {
  } else {
    const { data: systemData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}`, "system");
    const systemDataStringify = JSON.stringify(systemData);
    localStorage.setItem(systemSymbol, systemDataStringify);
  }

  const { data: shipsData } = useDataFetching(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}`, "ships");
  // const { data: systemData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}`, "system");
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

  const handleCalculateDistance = (waypoint1, waypoint2) => {
    const distance = calculateDistance(waypoint1, waypoint2);
    return distance;
  };

  const handleEnableToNavigate = (distance, flightMode, fuelCapacity, fuelCurrent) => {
    const enable = enableToNavigate(distance, flightMode, fuelCapacity, fuelCurrent);
    return enable;
  };

  const handleTotalTime = (distance, flightMode, shipSpeed) => {
    const time = totalTime(distance, flightMode, shipSpeed);
    return time;
  };

  return (
    <>
      {shipsData && systemLocalData && waypointData && shipyardData && marketplaceData ? (
        <>
          {(() => {
            const sortedWaypoints = systemLocalData.waypoints.slice().sort((a, b) => {
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
                            {handleCalculateDistance(waypoint, waypointData)} ({handleTotalTime(handleCalculateDistance(waypoint, waypointData), shipsData.nav.flightMode, shipsData.engine.speed)}s)
                          </td>
                          <td>{waypoint.type}</td>
                          <td>{getWaypointTrait(waypoint.symbol)}</td>
                          <td>
                            <button
                              className="btn-prm"
                              onClick={() => {
                                handleClickNavigate(waypoint.symbol, shipSymbol);
                              }}
                              disabled={!handleEnableToNavigate(handleCalculateDistance(waypoint, waypointData), shipsData.nav.flightMode, shipsData.fuel.capacity, shipsData.fuel.current)}
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
