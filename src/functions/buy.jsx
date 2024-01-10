const handleBuy = async (shipType, waypoint, shipPrice) => {
  const storedToken = localStorage.getItem("token");
  const credits = localStorage.getItem("credits");

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
      localStorage.setItem("credits", credits - shipPrice);
      window.location.reload();
    }

    if (responseData.error.message) {
      alert(responseData.error.message);
    } else {
      return;
    }
    // console.log(responseData);
    // window.location.reload();
  } catch (error) {
    if (error) {
      console.error(error);
    } else {
      return;
    }
  }
};

export default handleBuy;
