import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";
import handleChangeStatus from "../functions/changeState";
import handleNavigate from "../functions/navigate";
import handleSell from "../functions/sell";
import handleExtractWithoutSurvey from "../functions/extract";

export default function Vaisseaux() {
  const { systemSymbol, shipSymbol } = useParams();
  const { data: shipsData, handleLogout } = useDataFetching(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}`, "ships");
  const { data: waypointsData } = useDataFetching(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints?limit=20`, "waypoint");

  const [cooldown, setCooldown] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const { data: extractData } = await useDataFetching(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/cooldown`, "extract");
        if (isMounted && extractData) {
          setCooldown(extractData.totalSeconds);
          setRemaining(extractData.remainingSeconds);
          setTime(100 - (extractData.remainingSeconds / extractData.totalSeconds) * 100);
        }
      } catch (error) {
        // Gérer les erreurs ici
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    fetchData(); // Appel initial au chargement du composant

    return () => {
      isMounted = false; // Marquer le composant comme démonté lors du démontage
      clearInterval(intervalId);
    };
  }, [shipSymbol]);

  // const [selectedWaypoints, setSelectedWaypoints] = useState({});

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

  return (
    <div className="content">
      {shipsData && waypointsData ? (
        <div>
          <h1>Ship {shipsData.symbol}</h1>
          <section className="flex-row">
            <section className="shipInfos">
              <div>
                <p className="title">System :</p>
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
                  <button className="btn-prm icon" onClick={() => handleClickChangeStatus(shipsData.symbol, shipsData.nav.status === "IN_ORBIT" ? "dock" : "orbit")}>
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
                <div className="flex-row center">
                  <button className="btn-prm" onClick={() => handleClickExtractWithoutSurvey(shipsData.symbol)}>
                    Extract
                  </button>
                  <div className="cooldown">
                    <div className="flexBetween">
                      <p>Cooldown</p>
                      {remaining ? <p>{remaining}s</p> : null}
                    </div>
                    <div className="indicator">
                      <span className="total-time" style={{ width: `${time}%` }}></span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>

          {/* <h2>Ship {shipsData.symbol}</h2>
          <div className="ship">
            <p>
              Fuel: {shipsData.fuel.current}/{shipsData.fuel.capacity}
            </p>
            <p>
              Statut: {shipsData.nav.status}
              <button onClick={() => handleClickChangeStatus(shipsData.symbol, shipsData.nav.status === "IN_ORBIT" ? "dock" : "orbit")}>Change</button>
            </p>
            <p>Flight Mode: {shipsData.nav.flightMode}</p>
            <p>Acutal System: {shipsData.nav.systemSymbol}</p>
            <p>Waypoint: {shipsData.nav.waypointSymbol}</p>
            <button onClick={() => handleClickExtractWithoutSurvey(shipsData.symbol)}>Extract</button>
            <br />
            <Link to={`/shipyard/${shipsData.nav.systemSymbol}/${shipsData.symbol}`}>Buy a ship in system {shipsData.nav.systemSymbol}</Link>
            <p>or</p>
            <Link to={`/shipyard/${shipsData.nav.systemSymbol}/${shipsData.nav.waypointSymbol}/${shipsData.symbol}`}>Buy in {shipsData.nav.waypointSymbol}</Link>
            <div>
              <p>Navigate on another planet :</p>
              {shipsData.nav.status === "IN_ORBIT" ? (
                <>
                  <select name="waypoints" id="waypoints" value={selectedWaypoints[shipsData.symbol] || ""} onChange={(e) => handleWaypointChange(shipsData.symbol, e.target.value)}>
                    <option value="">Select a planet</option>
                    {waypointsData.map((waypoint) => (
                      <option key={waypoint.symbol} value={`${waypoint.symbol}`}>
                        {waypoint.symbol}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => handleClickNavigate(selectedWaypoints[shipsData.symbol], shipsData.symbol)}>Naviguer</button>
                </>
              ) : (
                <p>You have to be in orbit to navigate</p>
              )}
            </div>
            <div className="cargo">
              <h2>
                Your Cargo inventory {shipsData.cargo.units}/{shipsData.cargo.capacity}
              </h2>
              {shipsData.cargo.inventory.map((inventory) => (
                <div key={inventory.symbol}>
                  <p>{inventory.symbol}</p>
                  <p>{inventory.units}</p>
                  <button onClick={() => handleClickSell(inventory.symbol, shipsData.symbol, inventory.units)}>Sell</button>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}
