import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useDataFetching = (url, dataProperty) => {
  const [data, setData] = useState(null);
  const [resetState, setResetState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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
    fetchData();
    if (resetState) {
      fetchData();
      // Réinitialiser resetState après avoir déclenché fetchData
      setResetState(false);
    }
  }, [navigate, url, dataProperty, resetState]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return { data, handleLogout, setResetState };
};

export default useDataFetching;
