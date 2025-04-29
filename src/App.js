import { useState } from 'react';
import './App.css';
import ListPatient from './components/ListPatient';
import PatientCard from './components/PatientCard';

function App() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  async function handlePatientId(patientId) {
    fetch(`https://dummyjson.com/c/54c7-e3a3-47b4-9068`)
    .then(response => response.json())
    .then(patients => {
      setSelectedPatient(patients.find(patient => patient.id === patientId));
    })
    .catch(error => {
      console.error('Erro ao buscar dados do paciente:', error);
    });
  }

  return (
    <div>

      
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Lista de Pacientes</h2>
            <ListPatient onSelectPatient={handlePatientId} />
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Detalles del paciente</h2>
            <PatientCard patient={handlePatientId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
