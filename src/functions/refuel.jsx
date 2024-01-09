const handleRefuel = async (symbol) => {
  const storedToken = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
    };

    const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${symbol}/refuel`, options);
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.error.message) {
      alert(responseData.error.message);
    } else {
      return;
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

export default handleRefuel;
