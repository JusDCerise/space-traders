const handleFlightMode = async (symbol, mode) => {
  const storedToken = localStorage.getItem("token");
  //   console.log(mode);
  try {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({
        flightMode: mode,
      }),
    };

    const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${symbol}/nav`, options);
    const responseData = await response.json();
    window.location.reload();

    // console.log(responseData);
    if (responseData.error.message) {
      alert(responseData.error.message);
    }

    // window.location.reload();
  } catch (error) {
    if (error) {
      console.error(error);
    } else {
      return;
    }
  }
};

export default handleFlightMode;
