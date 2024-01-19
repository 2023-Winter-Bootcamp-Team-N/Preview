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

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching channel data:', error);
        setIsLoading(false);
      }
    };

    fetchChannelData();
  }, [user_id]);

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontFamily: 'notoSans',
          fontSize: '30px',
          fontWeight: '400',
          color: '#FFCDF2',
        }}>
        유튜브 채널별 요약본 분포
      </h2>{' '}
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
