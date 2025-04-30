import React from 'react';
import { Line } from 'react-chartjs-2';

const OxigenChart = ({ oxygenData, chartOptions }) => {
  const oxygenChartData = {
    labels: ['hace 6h', 'hace 5h', 'hace 4h', 'hace 3h', 'hace 2h', 'hace 1h'],
    datasets: [
      {
        label: 'Nível de Oxigênio (%)',
        data: oxygenData,
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.7)',
        tension: 0.1
      }
    ]
  };

  return <div>
    <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Nivel de oxígeno</h3>
        <div className="h-64">
          <Line data={oxygenChartData} options={chartOptions} />
        </div>
      </div>
  </div>;

  
};

export default OxigenChart;