import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(...registerables, zoomPlugin);

const options = {
  responsive: true,
  scales: {
    x: {
      type: 'category',
      offset: true,
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10, 
      },
      barThickness: 20,
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: 'xy', 
      },
      zoom: {
        enabled: false,
        mode: 'xy',
      },
    },
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
    },
  },
};

const MBarChart = ({ dataHandled }) => (
  <div style={{ width: '100%', overflowX: 'auto' }}>
    <Bar data={dataHandled} options={options} />
  </div>
);

export default MBarChart;
