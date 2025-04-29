import React from 'react';
import { Line } from 'react-chartjs-2';

const SensorChart = ({ title, chartData, options }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-800 mb-3">{title}</h3>
        <div className="h-64">
          <Line data={chartData} options={options} />
        </div>
    </div>
  );
};

export default SensorChart;