import React, { useState } from 'react';
import SensorSummary from './SensorSummary';
import SensorCharts from './SensorCharts';

const PatientCard = ({ patient }) => {
  const [activeTab, setActiveTab] = useState('summary');
  // Se não houver patientId, mostra uma mensagem
 
  const sensorData = {
    heartRate: Math.floor(60 + Math.random() * 40), // 60-100 bpm
    bloodPressure: `${Math.floor(110 + Math.random() * 30)}/${Math.floor(70 + Math.random() * 20)}`, // 110-140/70-90
    temperature: (36 + Math.random() * 1.5).toFixed(1), // 36-37.5°C
    oxygenLevel: Math.floor(94 + Math.random() * 6), // 94-100%
    history: {
      heartRate: Array(6).fill(0).map(() => Math.floor(60 + Math.random() * 40)),
      bloodPressure: Array(4).fill(0).map(() => [
        Math.floor(110 + Math.random() * 30), 
        Math.floor(70 + Math.random() * 20)
      ]),
      temperature: Array(5).fill(0).map(() => (36 + Math.random() * 1.5).toFixed(1)),
      oxygenLevel: Array(6).fill(0).map(() => Math.floor(94 + Math.random() * 6))
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          <p>Edad: {patient.age}</p>
          <p>Correo electrónico: {patient.email}</p>
          <p>ID: {patient.id}</p>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'summary'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Resumen de Sensores
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'charts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Gráfico de Sensores
          </button>
        </nav>
      </div>

      <div className="pt-2">
        {activeTab === 'summary' ? (
          <SensorSummary sensorData={sensorData} />
        ) : (
          <SensorCharts historyData={sensorData.history} />
        )}
      </div>
    </div>
  );
};

export default PatientCard;
