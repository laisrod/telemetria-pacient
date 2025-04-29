import { useState, useEffect, useRef } from 'react';

const useDataPolling = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState({ stopped: false, running: false, creating: false, stopping: false });
  const pollingRef = useRef(null);

  const fetchServerData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/c/54c7-e3a3-47b4-9068");
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      const data = await response.json();
      console.log("Dados recebidos:", data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const pollingFunc = async () => {
      try {
        console.log("Iniciando polling");
        const data = await fetchServerData();
        console.log("Status recebido:", data?.status);
        
        switch (data?.status) {
          case "stopped":
            setStatus({ stopped: true });
            break;
          case "running":
            if (data?.url) {
              setData(data);
              setStatus({ running: true });
            }
            break;
          case "creating":
            setStatus({ creating: true });
            console.log("El servidor está creando");
            break;
          case "stopping":
            setStatus({ stopping: true });
            console.log("El servidor está deteniendo");
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error en el polling:", error);
      }
    };
        
    const startPolling = () => {
      pollingRef.current = setInterval(() => {
        pollingFunc();
      }, 5000); // Poll every 5 seconds
    };
    startPolling();
  
    return () => {
      clearInterval(pollingRef.current);
    };
  }, []);

  return { data, status };
};

export default useDataPolling; 