import React, { useState, useEffect } from 'react';
import axios from 'axios';
import piechartTitle from '../../assets/img/piechartTitle.svg';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
const COLORS = [
  '#FFE6F9',
  '#FEDAF6',
  '#FFCDF2',
  '#FDB4EB',
  '#F99BE4',
  '#F26FD7',
  '#EE5ED1',
  '#E94FCB',
  '#E241C6',
  '#DA34C3',
  '#D02BBE',
  '#C624B9',
  '#B91CB1',
  '#AC17A8',
  '#760C80',
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
    <div>
      <img src={piechartTitle} alt="piechartTitle" style={{ width: '45%', marginBottom: '10px', marginLeft: '80px' }} />

      <ResponsiveContainer width={800} height={480}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#68686B"
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
    </div>
  );
};

export default ChartComponent2;
