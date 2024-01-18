import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // 원형 그래프의 색상

const ChartComponent2 = ({ user_id }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/chart/channel`, { params: { user_id: 1 } });
        if (response.data.subscribes && Array.isArray(response.data.subscribes)) {
          const formattedData = response.data.subscribes.map(item => ({
            name: item.youtube_channel,
            count: parseInt(item.count, 10),
          }));
          setChartData(formattedData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching channel data:', error);
        setIsLoading(false);
      }
    };

    fetchChannelData();
  }, [user_id]);

  return (
    <div>
      <h2>YouTube Channel Summary</h2>
      {isLoading ? (
        <p>채널 데이터를 불러오는 중...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
              label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ChartComponent2;
