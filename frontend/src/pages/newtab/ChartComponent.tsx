import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import barchartTitle from '../../assets/img/barchartTitle.svg';
const ChartComponent = ({ user_id }) => {
  console.log('Rendering ChartComponent');

  // chartData 상태는 API로부터 받은 데이터를 저장
  const [chartData, setChartData] = useState([]);

  const colors = [
    '#FFFFE0', // 매우 밝은 노랑
    '#FFFACD', // 레몬 쉬폰
    '#FAFAD2', // 라이트 골든로드 옐로
    '#FFEFD5', // 파파야휩
    '#FFE4B5', // 무스멜론
    '#FFDAB9', // 복숭아 퍼프
    '#EEE8AA', // 페일 골든로드
    '#F0E68C', // 케이크
    '#BDB76B', // 다크 케이크
    '#DAA520', // 골든로드
    '#B8860B', // 다크 골든로드
    '#FFD700', // 골드
    '#FFA500', // 오렌지
    '#FF8C00', // 다크 오렌지
    '#FF7F50', // 코랄
  ];

  // 컴포넌트 마운트 시 및 user_id 변경 시, fetchChartData 함수를 실행
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const params = {
          user_id: 1,
        };
        console.log('Request parameters:', params);

        const response = await axios.get(`http://localhost:8000/api/chart/category`, { params });
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
  }, [user_id]);

  // 부모 요소가 없기 때문에, ResponsiveContainer에 직접 높이를 지정합니다.
  // 이렇게 하면 부모의 높이를 걱정하지 않아도 됩니다.

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {' '}
      {/* 여기에 스타일 추가 */}
      {/* 제목 추가 */}
      <img
        src={barchartTitle}
        alt="barchartTitle"
        style={{ width: '25%', marginBottom: '10px', marginLeft: '80px', marginRight: '50px' }}
      />
      <ResponsiveContainer width={800} height={480}>
        <BarChart
          style={{ backgroundColor: '#0C151C', borderRadius: '10px', padding: '20px' }}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          barSize={30}
          barGap={2}
          layout="vertical">
          <XAxis type="number" tick={{ fill: '#68686B', fontSize: '14px' }} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#68686B', fontSize: '14px' }} // 이렇게 하면 텍스트 색상이 흰색으로 변경됩니다
          />{' '}
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="value" label={{ position: 'top' }} animationDuration={1500} animationEasing="ease-out">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
          {/* <Bar dataKey="value" fill="#413ea0" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
