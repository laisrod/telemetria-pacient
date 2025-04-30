import React from 'react';
import { Line } from 'react-chartjs-2';

const TemperatureChart = ({ temperatureData, chartOptions }) => {

  const temperatureChartData = {
    labels: ['hace 5h', 'hace 4h', 'hace 3h', 'hace 2h', 'hace 1h'],
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: temperatureData,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.7)',
        tension: 0.1
      }
    ]
  };

  return <div>

    <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Temperatura</h3>
        <div className="h-64">
          <Line data={temperatureChartData} options={chartOptions} />
        </div>
      </div>
      
  </div>;
};

export default TemperatureChart;