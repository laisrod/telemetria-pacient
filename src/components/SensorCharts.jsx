import { React, useEffect, useRef, useState } from 'react';
import OxigenChart from './OxigenChart';
import HeartRateChart from './HeartRateChart';
import TemperatureChart from './TemperatureChart';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend
);

const SensorCharts = ({ historyData }) => {
  const [setData] = useState(null);
  const [setStatus] = useState({ stopped: false, running: false, creating: false, stopping: false });

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

  const pollingRef = useRef(null);

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
  }, [setData, setStatus]); // Include setData and setStatus as dependencies


  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      <HeartRateChart heartRateData={historyData.heartRate} chartOptions={chartOptions} />
    <TemperatureChart temperatureData={historyData.temperature} chartOptions={chartOptions} />
    <OxigenChart oxygenData={historyData.oxygenLevel} chartOptions={chartOptions} />
    </div>
  );

};

export default SensorCharts;
