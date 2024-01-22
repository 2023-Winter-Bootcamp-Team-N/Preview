import React, { useState, useEffect } from 'react';
import axios from 'axios';
import piechartTitle from '../../assets/img/piechartTitle.svg';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#506BB5', '#5671BA', '#667FC1', '#667FC1', '#8EA0D1', '#9CAEDA', '#ABBCE5'];

// eslint-disable-next-line react/prop-types
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* 타이틀 */}
      <img src={piechartTitle} alt="piechartTitle" style={{ width: '30%', marginBottom: '14px' }} />

      {/* 차트 */}
      <ResponsiveContainer width={800} height={480}>
        <PieChart style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px' }}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={150}
            fill="#68686B"
            dataKey="count"
            labelLine={false}
            label={({ cx, cy, midAngle, outerRadius, value, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = outerRadius + 10;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill={COLORS[index % COLORS.length]}
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
