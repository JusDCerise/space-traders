import React, { useEffect, useState } from "react";
import { /* useNavigate ,*/ Link } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";
import handleChangeStatus from "../functions/changeState";

export default function Fleet() {
  const { data: shipsData, setResetState } = useDataFetching("https://api.spacetraders.io/v2/my/ships", "ships");
  const [loading, setLoading] = useState(true);

  document.title = `Your Fleet`;

  // console.log(shipsData);

  const handleClickChangeStatus = (shipId, statut) => {
    handleChangeStatus(shipId, statut);
  };

  const handleReset = () => {
    setResetState((prevResetState) => !prevResetState);
  };

  // Mettre les données des systems dans le localStorage pour limiter les appels api
  useEffect(() => {
    const fetchData = async () => {
      if (shipsData) {
        for (const ship of shipsData) {
          const systemLocalData = JSON.parse(localStorage.getItem(ship.nav.systemSymbol));
          if (!systemLocalData) {
            try {
              const response = await fetch(`https://api.spacetraders.io/v2/systems/${ship.nav.systemSymbol}`);
              const systemData = await response.json();
              const systemDataStringify = JSON.stringify(systemData);
              localStorage.setItem(ship.nav.systemSymbol, systemDataStringify);
            } catch (error) {
              console.error(`Erreur lors de la récupération des données pour ${ship.nav.systemSymbol}: `, error);
            }
          }
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [shipsData]);

  return (
    <div className="content">
      <h1>Your Fleet</h1>
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
                <td>
                  <p className="icon-text fleet">
                    <img src="/icons/spaceship.svg" alt="" /> {ship.symbol}
                  </p>
                </td>
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
                  <p className="icon-text fleet">
                    <img src="/icons/fuel.svg" alt="" />
                    <span>
                      {ship.fuel.current}
                      <span className="minimize">/{ship.fuel.capacity}</span>
                    </span>
                  </p>
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
