import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useDataFetching from "./functions/useFetchingData";

export default function Header() {
  const navigate = useNavigate();
  const { data: userData, handleLogout } = useDataFetching(`https://api.spacetraders.io/v2/my/agent`, "agent");

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  // const credits = localStorage.getItem("credits");
  // const symbolDuJoueur = localStorage.getItem("symbolDuJoueur");

  return (
    <div className="header">
      <NavLink to={"/"} className="headerLogo">
        <img src="/images/logo.svg" alt="" />
      </NavLink>
      <div className="headerNav">
        <NavLink to={"/profile"} className="headerLink">
          <svg width="35" height="39" className="link-icon" viewBox="0 0 35 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M17.5 32.2868C25.3495 32.2868 31.8905 26.6846 33.3428 19.2604C34.2672 19.2054 35 18.4383 35 17.5V14.7868C35 13.8485 34.2673 13.0814 33.3428 13.0264C31.8905 5.60221 25.3495 0 17.5 0C9.65057 0 3.10958 5.60221 1.65728 13.0264C0.732775 13.0814 0 13.8485 0 14.7868V17.5C0 18.4383 0.732775 19.2055 1.65728 19.2604C3.10958 26.6846 9.65057 32.2868 17.5 32.2868ZM15.1938 7.05427C10.0991 7.05427 5.96899 11.1844 5.96899 16.2791C5.96899 21.3738 10.0991 25.5039 15.1938 25.5039H19.8062C24.9009 25.5039 29.031 21.3738 29.031 16.2791C29.031 11.1844 24.9009 7.05427 19.8062 7.05427H15.1938Z" fill="white" />
            <path d="M17.6356 38.7984C24.3968 38.7984 30.2524 36.4705 33.1008 33.0767C31.9521 31.7081 30.3417 30.3771 28.3527 29.438C18.7209 36.3566 9.85513 31.8134 6.64728 29.1667C4.66762 30.1014 3.33177 31.6931 2.18668 33.0575L2.17053 33.0767C5.01893 36.4705 10.8745 38.7984 17.6356 38.7984Z" fill="white" />
          </svg>
          <span>Profile</span>
        </NavLink>
        <NavLink to={"/fleet"} className="headerLink">
          <svg width="35" height="40" viewBox="0 0 35 40" className="link-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.44742 17.176C10.159 16.5904 10.5439 15.6861 11.1016 14.9524C12.4274 13.2079 15.7791 12.4277 17.5946 12.2451V28.5081H16.8851C15.9027 28.5081 14.9857 28.0158 14.443 27.197V27.197C14.1408 26.7409 13.7134 26.3777 13.2859 26.0363C12.5925 25.4826 11.7192 24.6011 11.0732 23.9086C10.7275 23.5382 10.3243 23.2253 9.87162 22.9977L9.31245 22.7164C8.75484 22.436 8.13935 22.2899 7.51519 22.2899H4.69367C4.23949 22.2899 3.79725 22.4354 3.43175 22.705V22.705C2.88849 23.1057 2.56786 23.7407 2.56786 24.4157V38.3213C2.56786 39.0304 1.99303 39.6053 1.28393 39.6053V39.6053C0.574835 39.6053 0 39.0304 0 38.3213V1.25003C0 0.559659 0.559659 0 1.25003 0V0C1.92965 0 2.48475 0.542972 2.49976 1.22242L2.83404 16.3534C2.84604 16.8965 3.12167 17.3997 3.57284 17.7023V17.7023C3.84769 17.8866 4.17115 17.985 4.50208 17.985H7.19135C8.01441 17.985 8.8119 17.699 9.44742 17.176V17.176Z" fill="white" />
            <path d="M25.6468 17.1699C24.9474 16.588 24.5707 15.6954 24.0276 14.9654C22.7227 13.2118 19.395 12.4282 17.5946 12.2451V28.5081H18.2824C19.2623 28.5081 20.1763 28.0145 20.7135 27.195V27.195C21.0117 26.7402 21.4348 26.3772 21.8578 26.0356C22.5422 25.483 23.4035 24.6044 24.0419 23.9129C24.3865 23.5397 24.7894 23.224 25.2423 22.9937L25.7722 22.7243C26.3339 22.4387 26.955 22.2899 27.585 22.2899H30.3478C30.8027 22.2899 31.2455 22.4368 31.6103 22.7088V22.7088C32.1448 23.1074 32.4598 23.7351 32.4598 24.4019V38.3351C32.4598 39.0366 33.0284 39.6053 33.7299 39.6053V39.6053C34.4313 39.6053 35 39.0366 35 38.3351V1.23645C35 0.553576 34.4464 0 33.7636 0V0C33.0912 0 32.5421 0.537248 32.5274 1.20943L32.1962 16.3645C32.1845 16.901 31.9136 17.3985 31.4695 17.6996V17.6996C31.1951 17.8856 30.8713 17.985 30.5399 17.985H27.9011C27.0775 17.985 26.2799 17.6966 25.6468 17.1699V17.1699Z" fill="white" />
          </svg>
          <span>Fleet</span>
        </NavLink>
      </div>
      <button onClick={handleLogout} className="headerLink logout">
        <img src="/icons/logout.svg" alt="" className="link-icon" />
        <span>Log out</span>
      </button>
      {userData ? (
        <div className="user">
          <p>{userData.symbol}</p>
          <p className="credits">{userData.credits}</p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
