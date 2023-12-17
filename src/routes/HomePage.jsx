import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useDataFetching from "../useFetchingData";

export default function HomePage() {
  const { handleLogout } = useDataFetching();

  return (
    <div className="content">
      <h2>HomePage</h2>
      <p>Welcome in Space Traders game</p>
    </div>
  );
}
