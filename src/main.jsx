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
import Navigation from "./routes/Navigation";

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
    path: "/fleet/:shipSymbol",
    element: (
      <>
        <Header />
        <Ship />
        <Navigation />
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
    path: "/shop/",
    element: (
      <>
        <Header />
        <Shop />
      </>
    ),
  },
  {
    path: "/shipyard/:shipSymbol",
    element: (
      <>
        <Header />
        <Shipyard />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
