import { useState } from 'react';
import './App.css';

function App() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('resumo'); // nova aba

  const patients = [
    { 
      id: 1, 
      name: 'João Silva', 
      age: 45, 
      email: 'joao@email.com', 
      status: 'online',
      lastSeen: '2 min atrás',
      room: '201A'
    },
    { 
      id: 2, 
      name: 'Maria Santos', 
      age: 32, 
      email: 'maria@email.com', 
      status: 'offline',
      lastSeen: '1 hora atrás',
      room: '203B'
    },
    { 
      id: 3, 
      name: 'Pedro Costa', 
      age: 28, 
      email: 'pedro@email.com', 
      status: 'online',
      lastSeen: 'agora',
      room: '205C'
    },
    { 
      id: 4, 
      name: 'Ana Oliveira', 
      age: 38, 
      email: 'ana@email.com', 
      status: 'online',
      lastSeen: '5 min atrás',
      room: '207A'
    },
    { 
      id: 5, 
      name: 'Carlos Lima', 
      age: 52, 
      email: 'carlos@email.com', 
      status: 'offline',
      lastSeen: '3 horas atrás',
      room: '209B'
    }
  ];

  // função pra gerar dados de sensores fake
  const generateSensorData = (patientId) => {
    // dados diferentes pra cada paciente (pra parecer mais real)
    const baseValues = {
      1: { heartRate: 75, temp: 36.5, oxygen: 98, pressure: '120/80' },
      2: { heartRate: 85, temp: 37.1, oxygen: 95, pressure: '130/85' },
      3: { heartRate: 65, temp: 36.2, oxygen: 99, pressure: '110/70' },
      4: { heartRate: 80, temp: 36.8, oxygen: 97, pressure: '125/82' },
      5: { heartRate: 90, temp: 37.3, oxygen: 94, pressure: '140/90' }
    };
    
    const base = baseValues[patientId] || baseValues[1];
    
    return {
      heartRate: base.heartRate + Math.floor(Math.random() * 10 - 5),
      temperature: (base.temp + (Math.random() * 0.6 - 0.3)).toFixed(1),
      oxygenLevel: base.oxygen + Math.floor(Math.random() * 4 - 2),
      bloodPressure: base.pressure,
      // histórico dos últimos 8 valores (pra gráfico)
      history: {
        heartRate: Array(8).fill(0).map(() => base.heartRate + Math.floor(Math.random() * 10 - 5)),
        temperature: Array(8).fill(0).map(() => (base.temp + (Math.random() * 0.6 - 0.3)).toFixed(1)),
        oxygenLevel: Array(8).fill(0).map(() => base.oxygen + Math.floor(Math.random() * 4 - 2))
      }
    };
  };

  // função pra selecionar paciente
  const handlePatientSelect = (patient) => {
    setLoading(true);
    setError('');
    setActiveTab('resumo'); // reset pra aba resumo
    
    // simula um delay de carregamento (pra parecer mais real)
    setTimeout(() => {
      setSelectedPatient(patient);
      setLoading(false);
    }, 300);
  };

  // função pra simular erro (só pra testar)
  const simulateError = () => {
    setError('Erro ao carregar dados do paciente');
    setTimeout(() => setError(''), 3000);
  };

  // componente do resumo de sensores
  const SensorSummary = ({ data }) => (
    <div className="sensor-summary">
      <div className="sensor-grid">
        <div className="sensor-item">
          <div className="sensor-icon">❤️</div>
          <div className="sensor-info">
            <h4>Frequência Cardíaca</h4>
            <span className="sensor-value">{data.heartRate} bpm</span>
          </div>
        </div>
        
        <div className="sensor-item">
          <div className="sensor-icon">️</div>
          <div className="sensor-info">
            <h4>Temperatura</h4>
            <span className="sensor-value">{data.temperature}°C</span>
          </div>
        </div>
        
        <div className="sensor-item">
          <div className="sensor-icon">🫁</div>
          <div className="sensor-info">
            <h4>Oxigênio</h4>
            <span className="sensor-value">{data.oxygenLevel}%</span>
          </div>
        </div>
        
        <div className="sensor-item">
          <div className="sensor-icon">🩸</div>
          <div className="sensor-info">
            <h4>Pressão Arterial</h4>
            <span className="sensor-value">{data.bloodPressure}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // componente dos gráficos no estilo Jaspersoft
  const SensorCharts = ({ data }) => {
    const timeLabels = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    
    // normalizar dados para o gráfico (0-100%)
    const normalizeData = (values, min, max) => {
      return values.map(val => ((val - min) / (max - min)) * 100);
    };
    
    const heartRateNormalized = normalizeData(data.history.heartRate, 50, 120);
    const tempNormalized = normalizeData(data.history.temperature.map(t => parseFloat(t)), 35, 40);
    const oxygenNormalized = normalizeData(data.history.oxygenLevel, 90, 100);
    
    return (
      <div className="jaspersoft-charts">
        <div className="chart-container">
          <h3 className="chart-title">Monitoramento de Sensores - Últimas 8 Horas</h3>
          
          <div className="chart-wrapper">
            {/* Eixo Y */}
            <div className="y-axis">
              <div className="y-label">120</div>
              <div className="y-label">100</div>
              <div className="y-label">80</div>
              <div className="y-label">60</div>
              <div className="y-label">40</div>
              <div className="y-label">20</div>
              <div className="y-label">0</div>
            </div>
            
            {/* Área do gráfico */}
            <div className="chart-area">
              {/* Grid lines */}
              <div className="grid-lines">
                {[0, 20, 40, 60, 80, 100].map((_, i) => (
                  <div key={i} className="grid-line" style={{top: `${i * 16.66}%`}}></div>
                ))}
              </div>
              
              {/* Linhas do gráfico */}
              <svg className="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Frequência Cardíaca - linha azul escura com diamantes */}
                <polyline
                  points={heartRateNormalized.map((val, i) => `${12.5 + i * 12.5},${100 - val}`).join(' ')}
                  fill="none"
                  stroke="#1f4e79"
                  strokeWidth="0.8"
                  className="chart-line"
                />
                {heartRateNormalized.map((val, i) => (
                  <polygon
                    key={i}
                    points={`${12.5 + i * 12.5},${100 - val - 1} ${12.5 + i * 12.5 + 1},${100 - val} ${12.5 + i * 12.5},${100 - val + 1} ${12.5 + i * 12.5 - 1},${100 - val}`}
                    fill="#1f4e79"
                    className="chart-marker diamond"
                  />
                ))}
                
                {/* Temperatura - linha vermelha com quadrados */}
                <polyline
                  points={tempNormalized.map((val, i) => `${12.5 + i * 12.5},${100 - val}`).join(' ')}
                  fill="none"
                  stroke="#d32f2f"
                  strokeWidth="0.8"
                  className="chart-line"
                />
                {tempNormalized.map((val, i) => (
                  <rect
                    key={i}
                    x={12.5 + i * 12.5 - 0.5}
                    y={100 - val - 0.5}
                    width="1"
                    height="1"
                    fill="#d32f2f"
                    className="chart-marker square"
                  />
                ))}
                
                {/* Oxigênio - linha verde com quadrados */}
                <polyline
                  points={oxygenNormalized.map((val, i) => `${12.5 + i * 12.5},${100 - val}`).join(' ')}
                  fill="none"
                  stroke="#388e3c"
                  strokeWidth="0.8"
                  className="chart-line"
                />
                {oxygenNormalized.map((val, i) => (
                  <rect
                    key={i}
                    x={12.5 + i * 12.5 - 0.5}
                    y={100 - val - 0.5}
                    width="1"
                    height="1"
                    fill="#388e3c"
                    className="chart-marker square"
                  />
                ))}
              </svg>
              
              {/* Eixo X */}
              <div className="x-axis">
                {timeLabels.map((label, i) => (
                  <div key={i} className="x-label" style={{left: `${12.5 + i * 12.5}%`}}>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Legenda */}
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-marker diamond" style={{color: '#1f4e79'}}>◆</span>
              <span>Frequência Cardíaca (bpm)</span>
            </div>
            <div className="legend-item">
              <span className="legend-marker square" style={{color: '#d32f2f'}}>■</span>
              <span>Temperatura (°C)</span>
            </div>
            <div className="legend-item">
              <span className="legend-marker square" style={{color: '#388e3c'}}>■</span>
              <span>Oxigênio (%)</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <header>
        <h1>Sistema de Telemetria</h1>
        <p>Monitoramento de pacientes em tempo real</p>
      </header>
      
      <main>
        <div className="patients-section">
          <h2>Pacientes ({patients.length})</h2>
          
          {error && <div className="error-msg">{error}</div>}
          
          <div className="patients-list">
            {patients.map(patient => (
              <div 
                key={patient.id} 
                className={`patient-item ${selectedPatient?.id === patient.id ? 'selected' : ''}`}
                onClick={() => handlePatientSelect(patient)}
              >
                <div className="patient-info">
                  <h3>{patient.name}</h3>
                  <p className="patient-email">{patient.email}</p>
                  <p className="patient-room">Quarto: {patient.room}</p>
                </div>
                
                <div className="patient-status">
                  <div className={`status-dot ${patient.status}`}></div>
                  <span className="status-text">
                    {patient.status === 'online' ? 'Online' : 'Offline'}
                  </span>
                  <small className="last-seen">{patient.lastSeen}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="details-section">
          <h2>Detalhes</h2>
          
          {loading && <div className="loading">Carregando...</div>}
          
          {selectedPatient && !loading ? (
            <div className="patient-details">
              <div className="patient-header">
                <h3>{selectedPatient.name}</h3>
                <div className={`status-badge ${selectedPatient.status}`}>
                  {selectedPatient.status === 'online' ? '🟢 Online' : '🔴 Offline'}
                </div>
              </div>
              
              {/* Abas */}
              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'resumo' ? 'active' : ''}`}
                  onClick={() => setActiveTab('resumo')}
                >
                  Resumo
                </button>
                <button 
                  className={`tab ${activeTab === 'graficos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('graficos')}
                >
                  Gráficos
                </button>
              </div>
              
              {/* Conteúdo das abas */}
              <div className="tab-content">
                {activeTab === 'resumo' ? (
                  <div>
                    <div className="details-grid">
                      <div className="detail-item">
                        <label>Idade:</label>
                        <span>{selectedPatient.age} anos</span>
                      </div>
                      
                      <div className="detail-item">
                        <label>Email:</label>
                        <span>{selectedPatient.email}</span>
                      </div>
                      
                      <div className="detail-item">
                        <label>Quarto:</label>
                        <span>{selectedPatient.room}</span>
                      </div>
                      
                      <div className="detail-item">
                        <label>Última atividade:</label>
                        <span>{selectedPatient.lastSeen}</span>
                      </div>
                      
                      <div className="detail-item">
                        <label>ID do paciente:</label>
                        <span className="patient-id">#{selectedPatient.id}</span>
                      </div>
                    </div>
                    
                    <SensorSummary data={generateSensorData(selectedPatient.id)} />
                  </div>
                ) : (
                  <SensorCharts data={generateSensorData(selectedPatient.id)} />
                )}
              </div>
              
              {/* botão de teste que não faz nada útil */}
              <button 
                className="test-btn" 
                onClick={simulateError}
                style={{marginTop: '20px', padding: '8px 16px'}}
              >
                Testar erro (não clica)
              </button>
            </div>
          ) : !loading ? (
            <div className="no-selection">
              <p>👆 Clique em um paciente para ver os detalhes</p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
