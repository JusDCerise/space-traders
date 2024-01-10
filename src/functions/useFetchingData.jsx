import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useDataFetching = (url, dataProperty) => {
  const [data, setData] = useState(null);
  const [resetState, setResetState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
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
            if (isMounted) {
              // console.log("chargé 1");
            }
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
      setResetState(false);
    }

    return () => {
      isMounted = false;
    };
  }, [navigate, url, dataProperty, resetState]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return { data, handleLogout, setResetState };
};

export default useDataFetching;
