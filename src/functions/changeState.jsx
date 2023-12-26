const handleChangeStatus = async (shipId, statut) => {
  const storedToken = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`, // Remplacez par votre jeton d'accès
      },
    };

    const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${shipId}/${statut}`, options);

    const responseData = await response.json();

    // const responseData = await response.json();
    // window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export default handleChangeStatus;
