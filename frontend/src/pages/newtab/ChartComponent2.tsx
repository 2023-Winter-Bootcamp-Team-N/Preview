import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ChartComponent2 = ({ user_id }) => {
  console.log('Rendering ChartComponent');

  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const params = {
          user_id: 1,
        };
        console.log('Request parameters:', params);

        const response = await axios.get(`http://localhost:8000/api/chart/channel`);
        const formattedData = response.data.subscribes.map(item => ({
          name: item.youtube_channel,
          value: parseInt(item.count, 10),
          color: 'RandomColorHere', // 색상은 임의로 설정하거나 별도의 로직으로 할당할 수 있습니다.
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        // 적절한 에러 처리 로직을 추가하세요.
      }
    };

    fetchChartData();
  }, [user_id]);

  return (
    <ResponsiveContainer width={500} height={500}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent2;
