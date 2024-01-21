import React, { useState, useEffect } from 'react';
import axios from 'axios';
import piechartTitle from '../../assets/img/piechartTitle.svg';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
const COLORS = [
  '#E8F5E9', // 매우 밝은 초록
  '#C8E6C9', // 연한 민트
  '#A5D6A7', // 연한 초록
  '#81C784', // 중간 초록
  '#66BB6A', // 밝은 초록
  '#4CAF50', // 표준 초록
  '#43A047', // 진한 초록
  '#388E3C', // 진한 녹색
  '#2E7D32', // 더 진한 녹색
  '#1B5E20', // 어두운 녹색
  '#006400', // 짙은 녹색
  '#004D40', // 청록색
  '#00796B', // 삼바초록
  '#00897B', // 테알로
  '#009688', // 터콰이즈
];

const ChartComponent2 = ({ user_id }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const params = {
          user_id: 1,
        };
        console.log('Request parameters:', params);

        const response = await axios.get(`http://localhost:8000/api/chart/channel`, { params });

        const formattedData = response.data.subscribes.map(item => ({
          name: item.youtube_channel,
          count: item.count,
          // count: parseInt('5', 10),
        }));
        setChartData(formattedData);
        console.log('Formatted chart data:', formattedData);
      } catch (error) {
        console.error('Error fetching channel data:', error);
      }
    };

    fetchChannelData();
  }, [user_id]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src={piechartTitle}
        alt="piechartTitle"
        style={{ width: '30%', marginBottom: '10px', marginLeft: '80px', marginRight: '50px' }}
      />
      <ResponsiveContainer width={800} height={480}>
        <PieChart style={{ backgroundColor: '#0C151C', borderRadius: '10px', padding: '20px' }}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={150}
            fill="#68686B"
            dataKey="count"
            labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
              const RADIAN = Math.PI / 180;
              // 레이블 위치 계산
              const radius = outerRadius + 10; // 레이블이 차트 바깥에 위치하도록 반지름 조정
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill={COLORS[index % COLORS.length]} // 해당 차트 조각의 색상을 사용
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  style={{ fontSize: '26px', fontWeight: 'bold' }}>
                  {value}
                </text>
              );
            }}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent2;
