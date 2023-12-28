import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";
import handleChangeStatus from "../functions/changeState";
import { handleOpenNav } from "../functions/navigate";
import handleSell from "../functions/sell";
import handleExtractWithoutSurvey from "../functions/extract";

export default function Vaisseaux() {
  const { shipSymbol } = useParams();
  const systemSymbol = localStorage.getItem("systemSymbol");
  const waypointSymbol = localStorage.getItem("waypointSymbol");

  const { data: shipsData, handleLogout, setResetState } = useDataFetching(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}`, "ships");
  const { data: waypointsData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}`, "waypoint");
  const { data: shipyardData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/`, "shipyard");
  const { data: marketData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`, "market");

  const handleClickChangeStatus = (shipId, statut) => {
    handleChangeStatus(shipId, statut);
  };

  const handleClickExtractWithoutSurvey = (shipSymbol) => {
    handleExtractWithoutSurvey(shipSymbol);
  };

  const handleClickSell = (symbol, shipSymbol, units) => {
    handleSell(symbol, shipSymbol, units);
  };

  const handleReset = () => {
    setResetState((prevResetState) => !prevResetState);
  };

  const handleClickOpenNav = () => {
    handleOpenNav();
  };

  let isShipyardPresent = false;

  return (
    <div className="content">
      {shipsData && waypointsData ? (
        <div>
          <h1>Ship {shipsData.symbol}</h1>
          <section className="flex-row">
            <section className="shipInfos">
              <div>
                <p className="title">System :</p>
                <button onClick={handleReset}>Réinitialiser</button>
                <p>{systemSymbol}</p>
              </div>
              <div>
                <p className="title">Waypoint :</p>
                <p>{waypointSymbol}</p>
              </div>
              <div>
                <p className="title">Waypoint Traits :</p>
                <div className="traits">
                  {waypointsData.traits.map((trait) => (
                    <React.Fragment key={trait.symbol}>
                      <p className="trait">{trait.symbol}</p>
                      {trait.symbol === "SHIPYARD" && (
                        <Link
                          to={`/shipyard/${shipSymbol}`}
                          className="btn-prm"
                          onClick={() => {
                            localStorage.setItem("waypointSymbol", shipsData.nav.waypointSymbol);
                            localStorage.setItem("systemSymbol", shipsData.nav.systemSymbol);
                          }}
                        >
                          Buy a Ship
                        </Link>
                      )}
                      {trait.symbol === "SHIPYARD" && (isShipyardPresent = true)}
                    </React.Fragment>
                  ))}
                  {!isShipyardPresent && (
                    <>
                      <button className="btn-prm" disabled title="There is no shipyard">
                        Buy a ship
                      </button>
                      <p style={{ fontSize: "10px" }}>to buy a ship, you must be on a planet with a shipyard</p>
                      <Link
                        to="/shop/"
                        onClick={() => {
                          localStorage.setItem("waypointSymbol", shipsData.nav.waypointSymbol);
                          localStorage.setItem("systemSymbol", shipsData.nav.systemSymbol);
                          localStorage.setItem("shipSymbol", shipsData.symbol);
                        }}
                        style={{ fontSize: "10px" }}
                      >
                        See planet with shipyard
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div>
                <p className="title">Fuel :</p>
                <p>
                  {shipsData.fuel.current}/{shipsData.fuel.capacity}
                </p>
              </div>
              <div>
                <button className="btn-prm" onClick={handleClickOpenNav} disabled={shipsData.nav.status !== "IN_ORBIT"}>
                  Navigate
                </button>
              </div>
              <div>
                <p className="title">Statut :</p>
                <p>
                  {shipsData.nav.status}
                  <button
                    className="btn-prm icon"
                    onClick={() => {
                      handleClickChangeStatus(shipsData.symbol, shipsData.nav.status === "IN_ORBIT" ? "dock" : "orbit");
                      handleReset();
                    }}
                  >
                    <img src="/icons/change.svg" />
                  </button>
                </p>
                <p>
                  {shipsData.nav.flightMode}
                  <button className="btn-prm icon">
                    <img src="/icons/change.svg" />
                  </button>
                </p>
              </div>
            </section>
            <section className="shipActions">
              <div className="shipNavigation"></div>
              <div className="shipCargo">
                <div className="flex-row center extracts">
                  <button
                    className="btn-prm"
                    onClick={() => {
                      handleClickExtractWithoutSurvey(shipsData.symbol);
                      handleReset();
                    }}
                    disabled={(waypointsData.type !== "ASTEROID" && waypointsData.type !== "ENGINEERED_ASTEROID" && waypointsData.type !== "ASTEROID_FIELD") || shipsData.nav.status !== "IN_ORBIT"}
                    title={(waypointsData.type !== "ASTEROID" && waypointsData.type !== "ENGINEERED_ASTEROID" && waypointsData.type !== "ASTEROID_FIELD") || shipsData.nav.status !== "IN_ORBIT" ? "You have to be in orbit to extract (or on an ENGINEERED_ASTEROID, ASTEROID or ASTEROID_FIELD)" : null}
                  >
                    Extract
                  </button>
                  <div className="cooldown">
                    <div className="flexBetween">
                      <p>Cooldown</p>
                      <p>{shipsData.cooldown.remainingSeconds}</p>
                      {/* {cooldownTotal ? <p>{cooldownTotal}s</p> : null} */}
                    </div>
                    <div className="indicator">{/* <span className="total-time" style={{ width: `${time}%` }}></span> */}</div>
                  </div>
                </div>
                <h2>
                  Cargo : {shipsData.cargo.units}/{shipsData.cargo.capacity}
                </h2>
                <table className="cargo">
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Units</td>
                      <td>Price per units</td>
                      <td>Total price</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {shipsData.cargo.inventory.map((inventory) => {
                      const matchingTransaction = (() => {
                        if (marketData && marketData.transactions) {
                          return marketData.transactions.find((transaction) => transaction.tradeSymbol === inventory.symbol);
                        }
                        return undefined;
                      })();

                      return (
                        <tr key={inventory.symbol}>
                          <td>{inventory.symbol}</td>
                          <td>{inventory.units}</td>
                          {matchingTransaction ? (
                            <>
                              <td>{matchingTransaction.pricePerUnit}</td>
                              <td>{matchingTransaction.pricePerUnit * inventory.units}</td>
                              <td className="actions">
                                <button className="btn-prm" onClick={() => handleClickSell(inventory.symbol, shipsData.symbol, inventory.units)} disabled={shipsData.nav.status !== "DOCKED"}>
                                  Sell
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}
