import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useDataFetching = (url, dataProperty) => {
  const [data, setData] = useState(null);
  const [initialRender, setInitialRender] = useState(true);
  const [resetState, setResetState] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData.data);
        } else {
          console.error("Erreur lors de la requête. Veuillez réessayer.");
        }
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    // Appel initial seulement lors du premier rendu
    if (initialRender) {
      fetchData();
      setInitialRender(false);
    }

    // Effectuer un appel toutes les secondes après le premier rendu
    const intervalId = setInterval(() => {
      // Ajouter la condition pour le type de requête
      if (dataProperty === "cooldown") {
        fetchData();
      }
    }, 1000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, [navigate, url, dataProperty, initialRender, fetchData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Utiliser useEffect pour déclencher fetchData lorsqu'il y a un changement dans resetState
  useEffect(() => {
    if (resetState) {
      fetchData();
      // Réinitialiser resetState après avoir déclenché fetchData
      setResetState(false);
    }
  }, [resetState, fetchData]);

  return { data, handleLogout, setResetState };
};

export default useDataFetching;
