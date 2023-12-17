const handleChangeStatus = async (waypoint, shipSymbol) => {
  const storedToken = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`, // Remplacez par votre jeton d'accès
      },
      body: JSON.stringify({
        waypointSymbol: waypoint,
      }),
    };

    const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/navigate`, options);
    const responseData = await response.json();
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export default handleChangeStatus;
