import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

//기본 Bar 차트
//https://react-chartjs-2.js.org/components/bar

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
      font: {
        size: 100,    
        color:'rgba(0, 200, 200, 0.5)',
      } ,
    },
    
  },

  scales: {
    x: {
      ticks: {
        font: {
          size: 90,
          color: 'rgba(0, 200, 200, 0.5)' ,
        }, // 가로축 레이블 글씨 크기 조절
      },
    },
    y: {
      ticks: {
        font: {
          size:30 ,
          color: '#FFFFFF'
        } // y 축 레이블 글씨 크기
      },
    },
  },
};

const labels = ['건강', '게임', '경제', '과학', '교육', '동물', '사회' , '스포츠' , '여행' , '연예' , '예술' , '요리' ,'음악' , '코미디' , '기타'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Category',
      data: [1, 2, 3, 4, 5, 6, 7 , 3 , 4 , 5 , 1 , 9 , 3 , 2 , 7],
      backgroundColor: 'rgba(0, 250, 150, 0.5)',
      borderWidth: 30,
    
    },
  ],
};

export default function ChartComponent() {
  return (
    <div className='contentWrap' style={{width:'3830px', marginTop:'500px'}}>
      <div className='contentInner'>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}