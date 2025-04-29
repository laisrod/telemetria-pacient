import React from 'react';

const SensorSummary = ({ sensorData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Signos vitales</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Frecuencia Cardíaca:</span>
            <span className="font-semibold">{sensorData.heartRate} bpm</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Presión Arterial:</span>
            <span className="font-semibold">{sensorData.bloodPressure} mmHg</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Temperatura:</span>
            <span className="font-semibold">{sensorData.temperature}°C</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Nível de Oxigênio:</span>
            <span className="font-semibold">{sensorData.oxygenLevel}%</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Análisis de Datos</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${sensorData.heartRate > 100 || sensorData.heartRate < 60 ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span className="text-sm">Frecuencia cardíaca: {sensorData.heartRate > 100 || sensorData.heartRate < 60 ? 'Atención' : 'Normal'}</span>
          </div>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${sensorData.temperature > 37.5 || sensorData.temperature < 35.5 ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span className="text-sm">Temperatura: {sensorData.temperature > 37.5 || sensorData.temperature < 35.5 ? 'Atención' : 'Normal'}</span>
          </div>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${sensorData.oxygenLevel < 95 ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span className="text-sm">Oxigenación: {sensorData.oxygenLevel < 95 ? 'Atención' : 'Normal'}</span>
          </div>
        </div>
        <div className="mt-4 bg-blue-50 p-3 rounded-md">
          <p className="text-sm text-blue-700">
          Última actualización: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SensorSummary;
