import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";

export default function HomePage() {
  const symbolDuJoueur = localStorage.getItem("symbolDuJoueur");

  const { data: userData } = useDataFetching(`https://api.spacetraders.io/v2/my/agent`, "agent");

  document.title = `Welcome on Space Traders ${symbolDuJoueur}`;

  useEffect(() => {
    if (userData) {
      localStorage.setItem("credits", userData.credits);
    }
  }, [userData]);

  return (
    <div className="content">
      <h1>HomePage</h1>
      <p>Welcome in Space Traders game</p>
      <br />
      <p>You start width 250.000 credits and a fleet of 2 ships</p>
      <br />
      <Link to={"/fleet"} className="btn-prm">
        See my ships
      </Link>
      <br />
      <br />
      <br />
      <p>You can buy ships at the waypoint that had a shipyard trait</p>
      <br />
      <p>You can extracts some minerals on asteroids, engineered asteroids or asteroids base</p>
      <br />
      <p>And after mining them, you can sell them on waypoints that have a market trait.</p>
    </div>
  );
}
