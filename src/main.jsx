import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/main.scss";
import ErrorPage from "./error-page.jsx";
import Header from "./Header";
import Connexion from "./routes/Connexion";
import HomePage from "./routes/HomePage";
import Profile from "./routes/Profile";
import Fleet from "./routes/Fleet";
import Ship from "./routes/Ship";
import Shop from "./routes/Shop";
import Shipyard from "./routes/Shipyard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <HomePage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: (
      <>
        <Header />
        <HomePage />
      </>
    ),
  },
  {
    path: "/login",
    element: <Connexion />,
  },
  {
    path: "/fleet",
    element: (
      <>
        <Header />
        <Fleet />
      </>
    ),
  },
  {
    path: "/fleet/:systemSymbol/:shipSymbol",
    element: (
      <>
        <Header />
        <Ship />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Header />
        <Profile />
      </>
    ),
  },
  {
    path: "/shipyard/:systemSymbol/:shipSymbol",
    element: (
      <>
        <Header />
        <Shop />
      </>
    ),
  },
  {
    path: "/shipyard/:systemSymbol/:shipyardSymbol/:shipSymbol",
    element: (
      <>
        <Header />
        <Shipyard />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
