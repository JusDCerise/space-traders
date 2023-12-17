import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useDataFetching = (url, dataProperty) => {
  const [data, setData] = useState(null);
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
  }, [navigate, url, dataProperty]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return { data, handleLogout };
};

export default useDataFetching;
