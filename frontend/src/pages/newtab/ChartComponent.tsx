import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const ChartComponent = ({ user_id }) => {
  console.log('Rendering ChartComponent');

  // chartData 상태는 API로부터 받은 데이터를 저장
  const [chartData, setChartData] = useState([]);

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
        const categoriesData = response.data.categories.map(category => ({
          //category.category는 y축에 표시될 카테고리 이름
          name: category.category,
          //x축에 표시된 API 응답에 포함된 각 카테고리의 요약본 수 (10진수로)
          value: parseInt(category.count, 10),
          color: 'RandomColorHere', // 색상은 임의로 설정하거나 별도의 로직으로 할당할 수 있습니다.
        }));
        setChartData(categoriesData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [user_id]);

  // const data = [
  //   { name: '건강', value: 30, color: '#FFE6F9' },
  //   { name: '게임', value: 25, color: '#FEDAF6' },
  //   { name: '경제', value: 20, color: '#FFCDF2' },
  //   { name: '과학', value: 18, color: '#FDB4EB' },
  //   { name: '교육', value: 15, color: '#F99BE4' },
  //   { name: '동물', value: 12, color: '#F26FD7' },
  //   { name: '사회', value: 10, color: '#EE5ED1' },
  //   { name: '스포츠', value: 9, color: '#E94FCB' },
  //   { name: '여행', value: 8, color: '#E241C6' },
  //   { name: '연예', value: 7, color: '#DA34C3' },
  //   { name: '예술', value: 6, color: '#D02BBE' },
  //   { name: '요리', value: 5, color: '#C624B9' },
  //   { name: '음악', value: 4, color: '#B91CB1' },
  //   { name: '코미디', value: 3, color: '#AC17A8' },
  //   { name: '기타', value: 2, color: '#760C80' },
  // ];

  // 부모 요소가 없기 때문에, ResponsiveContainer에 직접 높이를 지정합니다.
  // 이렇게 하면 부모의 높이를 걱정하지 않아도 됩니다.
  return (
    <ResponsiveContainer width={700} height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={20}
        barGap={5}
        layout="vertical">
        <XAxis type="number" tick={{ fill: '#FFFFFF' }} />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: '#FFFFFF' }} // 이렇게 하면 텍스트 색상이 흰색으로 변경됩니다
        />{' '}
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar dataKey="value" label={{ position: 'top' }}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
        {/* <Bar dataKey="value" fill="#413ea0" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
