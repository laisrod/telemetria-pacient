import { React, useEffect, useRef, useState } from 'react';
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

  const heartRateData = {
    labels: ['hace 6h', 'hace 5h', 'hace 4h', 'hace 3h', 'hace 2h', 'hace 1h'],
    datasets: [
      {
        label: 'Frequência Cardíaca (bpm)',
        data: historyData.heartRate,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.7)',
        tension: 0.1
      }
    ]
  };

  const temperatureData = {
    labels: ['hace 5h', 'hace 4h', 'hace 3h', 'hace 2h', 'hace 1h'],
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: historyData.temperature,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.7)',
        tension: 0.1
      }
    ]
  };

  const oxygenData = {
    labels: ['hace 6h', 'hace 5h', 'hace 4h', 'hace 3h', 'hace 2h', 'hace 1h'],
    datasets: [
      {
        label: 'Nível de Oxigênio (%)',
        data: historyData.oxygenLevel,
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.7)',
        tension: 0.1
      }
    ]
  };

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
    <div className="space-y-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Frecuencia cardíaca</h3>
        <div className="h-64">
          <Line data={heartRateData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Temperatura</h3>
        <div className="h-64">
          <Line data={temperatureData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Nivel de oxígeno</h3>
        <div className="h-64">
          <Line data={oxygenData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default SensorCharts;
