import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useDataFetching from "../functions/useFetchingData";
// import handleChangeStatus from "../functions/changeState";
import handleNavigate from "../functions/navigate";

export default function Navigation() {
  const { data: shipsData } = useDataFetching("https://api.spacetraders.io/v2/my/ships", "ships");
}
