const handleExtractWithoutSurvey = async (shipSymbol) => {
  const storedToken = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
    };

    const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/extract`, options);
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.error.message) {
      alert(responseData.error.message);
    }

    // window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export default handleExtractWithoutSurvey;
