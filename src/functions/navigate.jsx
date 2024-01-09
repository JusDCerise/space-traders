export const handleNavigate = async (waypoint, shipSymbol) => {
  const storedToken = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({
        waypointSymbol: waypoint,
      }),
    };

    const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/navigate`, options);
    const responseData = await response.json();
    if (responseData.error && responseData.error.message) {
      alert(responseData.error.message);
    } else {
      localStorage.setItem("waypointSymbol", waypoint);
      window.location.reload();
    }
  } catch (error) {
    if (error) {
      console.error(error);
    } else {
      return;
    }
  }
};

export const handleOpenNav = async () => {
  const navigationNav = document.querySelector(".navigation");
  const backgroundNav = document.querySelector(".backgroundNav");
  const root = document.querySelector("#root");

  if (navigationNav) {
    navigationNav.classList.toggle("active");
  }
  if (backgroundNav) {
    backgroundNav.classList.toggle("active");
  }
  if (root) {
    root.classList.toggle("active");
  }
};
