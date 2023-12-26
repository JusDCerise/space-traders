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
    if (responseData.error.message) {
      alert(responseData.error.message);
    }
    console.log(responseData);
    // window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export default handleSell;
