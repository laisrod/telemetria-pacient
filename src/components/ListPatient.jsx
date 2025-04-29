import React, { useState, useEffect } from 'react';
import './ListPatient.css';

const ListPatient = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState([]);
  
  const fetchPatients = async () => {
    try {
      const response = await fetch('https://dummyjson.com/c/54c7-e3a3-47b4-9068', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al buscar pacientes');
      }

      const data = await response.json();
      setPatients(data || []); // Pegando a propriedade users do objeto de resposta
    } catch (error) {
      console.error('Error al buscar pacientes:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handlePatientClick = (e, patientId) => {
    e.preventDefault();
    if (typeof onSelectPatient === 'function') {
      onSelectPatient(patientId);
    }
  };

  patients.forEach(patient => {
    const name = patient.name.split(' ');
    patient.firstName = name[0];
    patient.lastName = name[1];
  });
  return (
    <ul className="divide-y divide-gray-100">
      {patients.map((patient) => (
        <li key={patient.id} className="flex justify-between gap-x-6 py-5" id="list-patient">
          <div className="flex min-w-0 gap-x-4">
              <img
                src={`https://avatar.iran.liara.run/username?username=${patient.firstName}+${patient.lastName}`}
                alt={patient.name}
                className="size-12 flex-none rounded-full bg-gray-50"
                onClick={(e) => handlePatientClick(e, patient.id)}
              />
            <div className="min-w-0 flex-auto">
              <button 
                type="button"
                className="text-left w-full cursor-pointer" 
                onClick={(e) => handlePatientClick(e, patient.id)}
              >
                <p className="text-sm/6 font-semibold text-gray-900">{patient.name}</p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">{patient.email}</p>
              </button>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="size-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs/5 text-gray-500">Online</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListPatient;