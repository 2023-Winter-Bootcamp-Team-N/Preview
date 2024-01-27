import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import barchartTitle from '../../assets/img/barchartTitle.svg';
//const colors = ['#FFC9EB', '#D4DBFF'];
const colors = ['#a0f2bc', '#b3f0e9', '#acc8f8', '#c2b5f8', '#f7a1c4', '#f7e08b'];

// eslint-disable-next-line react/prop-types
const ChartComponent = ({ user_id }) => {
  console.log('Rendering ChartComponent');

  // chartData 상태는 API로부터 받은 데이터를 저장
  const [chartData, setChartData] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // 컴포넌트 마운트 시 및 user_id 변경 시, fetchChartData 함수를 실행
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const params = {
          user_id: 1,
        };
        console.log('Request parameters:', params);

        const response = await axios.get(`http://localhost:8000/api/v1/chart/category`, { params });
        //API 응답에서 categories 배열을 가져와 각 항목을 막대 그래프에 필요한 형태로 변환
        const categoriesData = response.data.categories.map((category, index) => ({
          name: category.category,
          value: parseInt(category.count, 10),
          color: colors[index % colors.length], // 색상 배열에서 순차적으로 색상을 선택
        }));
        setChartData(categoriesData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [colors, user_id]);

  // 부모 요소가 없기 때문에, ResponsiveContainer에 직접 높이를 지정합니다.
  // 이렇게 하면 부모의 높이를 걱정하지 않아도 됩니다.

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        width: '60%', // 가로 크기 조정
        margin: '0 auto', // 중앙 정렬을 위한 마진
      }}>
      {/* 타이틀 */}
      <img src={barchartTitle} alt="barchartTitle" style={{ width: '60%', marginBottom: '40px', marginTop: '40px' }} />

      {/* 차트 */}
      <ResponsiveContainer width={700} height={450}>
        <BarChart
          style={{ backgroundColor: '#fff', borderRadius: '10px', paddingRight: '10px' }}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          barSize={40}
          barGap={2}
          layout="vertical">
          <XAxis type="number" tick={{ fill: '#68686B', fontSize: '16px', fontWeight: '200' }} />
          <YAxis type="category" dataKey="name" tick={{ fill: '#68686B', fontSize: '14px' }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar
            dataKey="value"
            label={{ position: 'top' }}
            animationDuration={1500}
            animationEasing="ease-out"
            isAnimationActive={true}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
