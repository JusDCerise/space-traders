import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";
import handleChangeStatus from "../functions/changeState";
import handleNavigate from "../functions/navigate";
import handleSell from "../functions/sell";
import handleExtractWithoutSurvey from "../functions/extract";

export default function Vaisseaux() {
  const { systemSymbol, shipSymbol, waypointSymbol } = useParams();

  const { data: shipsData, handleLogout, setResetState } = useDataFetching(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}`, "ships");
  const { data: waypointsData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints?limit=20`, "waypoint");
  // const { data: shipyardData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/`, "shipyard");
  const { data: marketData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`, "market");

  console.log(shipsData);

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

  const handleClickExtractWithoutSurvey = (shipSymbol) => {
    handleExtractWithoutSurvey(shipSymbol);
  };

  const handleClickSell = (symbol, shipSymbol, units) => {
    handleSell(symbol, shipSymbol, units);
  };

  // Refresh des données de la page
  // const [resetState, setResetState] = useState(false);

  const handleReset = () => {
    // setInterval(() => {
    setResetState((prevResetState) => !prevResetState);
    // }, 1000);
  };

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
                <p>{shipsData.nav.systemSymbol}</p>
              </div>
              <div>
                <p className="title">Waypoint :</p>
                <p>{shipsData.nav.waypointSymbol}</p>
              </div>
              <div>
                <p className="title">Fuel :</p>
                <p>
                  {shipsData.fuel.current}/{shipsData.fuel.capacity}
                </p>
              </div>
              <div>
                <button className="btn-prm">Navigate</button>
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
              <div>
                <p className="title">Cargo :</p>
                <p>
                  {shipsData.cargo.units}/{shipsData.cargo.capacity}
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
                  >
                    Extract
                  </button>
                  <div className="cooldown">
                    <div className="flexBetween">
                      <p>Cooldown</p>
                      <p>{shipsData.cooldown.totalSeconds}</p>
                      {/* {cooldownTotal ? <p>{cooldownTotal}s</p> : null} */}
                    </div>
                    <div className="indicator">{/* <span className="total-time" style={{ width: `${time}%` }}></span> */}</div>
                  </div>
                </div>
                <h2>Cargo :</h2>
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
                                <button className="btn-prm" onClick={() => handleClickSell(inventory.symbol, shipsData.symbol, inventory.units)}>
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
