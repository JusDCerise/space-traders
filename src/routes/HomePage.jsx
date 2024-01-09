import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";

export default function HomePage() {

  const { data: userData } = useDataFetching(`https://api.spacetraders.io/v2/my/agent`, "agent");


  useEffect(() => {
    if (userData) {
      localStorage.setItem("credits", userData.credits);
    }
  }, [userData]);

  return (
    <div className="content">
      <h2>HomePage</h2>
      <p>Welcome in Space Traders game </p>
    </div>
  );
}
