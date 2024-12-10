import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

// Đăng ký các plugin và thành phần của Chart.js
ChartJS.register(...registerables, zoomPlugin);

const options = {
  responsive: true,
  scales: {
    x: {
      type: 'category',
      offset: true,
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10, // Giới hạn số lượng nhãn trục X
      },
      // Đảm bảo các cột có độ rộng cố định
      barThickness: 20, // Đặt độ rộng cố định cho các cột
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: 'xy', // Kéo theo cả hai trục X và Y
      },
      zoom: {
        enabled: true,
        mode: 'xy', // Zoom theo cả hai trục X và Y
      },
    },
  },
  // Cấu hình để có thể cuộn ngang khi vượt quá màn hình
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
