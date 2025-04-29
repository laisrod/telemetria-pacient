// Função auxiliar para criar dados do gráfico
const createChartData = (labels, data, label, color) => {
  return {
    labels,
    datasets: [
      {
        label,
        data,
        fill: false,
        backgroundColor: color,
        borderColor: `${color.slice(0, -1)}, 0.7)`,
        tension: 0.1
      }
    ]
  };
};

export { createChartData }; 