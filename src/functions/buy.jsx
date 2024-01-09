const handleBuy = async (shipType, waypoint) => {
  const storedToken = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`, // Remplacez par votre jeton d'accès
      },
      body: JSON.stringify({
        shipType: shipType,
        waypointSymbol: waypoint,
      }),
    };

    const response = await fetch(`https://api.spacetraders.io/v2/my/ships`, options);
    const responseData = await response.json();

    if (response.ok) {
      alert("you have just successfully purchased the ship");
    }

    if (responseData.error.message) {
      alert(responseData.error.message);
    }
    console.log(responseData);
    // window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export default handleBuy;
