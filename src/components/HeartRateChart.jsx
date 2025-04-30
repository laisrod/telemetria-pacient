import React from 'react';
import { Line } from 'react-chartjs-2';

const HeartRateChart = ({ heartRateData, chartOptions }) => {
  const heartRateChartData = {
    labels: ['hace 6h', 'hace 5h', 'hace 4h', 'hace 3h', 'hace 2h', 'hace 1h'],
    datasets: [
      {
        label: 'Frequência Cardíaca (bpm)',
        data: heartRateData,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.7)',
        tension: 0.1
      }
    ]
  };
    
  return <div>
    <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Frecuencia cardíaca</h3>
        <div className="h-64">
          <Line data={heartRateChartData} options={chartOptions} />
        </div>
      </div>
  </div>;
};

export default HeartRateChart;