const handleSell = async (symbol, shipSymbol, units) => {
  const storedToken = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({
        symbol: symbol,
        units: units,
      }),
    };

    const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/sell`, options);
    const responseData = await response.json();
    window.location.reload();

    if (responseData.error.message) {
      alert(responseData.error.message);
    }
    // window.location.reload();

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

export default handleSell;
