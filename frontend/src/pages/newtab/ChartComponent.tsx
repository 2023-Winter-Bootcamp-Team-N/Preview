import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const ChartComponent = () => {
  console.log('Rendering ChartComponent');

  const data = [
    { name: '건강', value: 30, color: '#FFE6F9' },
    { name: '게임', value: 25, color: '#FEDAF6' },
    { name: '경제', value: 20, color: '#FFCDF2' },
    { name: '과학', value: 18, color: '#FDB4EB' },
    { name: '교육', value: 15, color: '#F99BE4' },
    { name: '동물', value: 12, color: '#F26FD7' },
    { name: '사회', value: 10, color: '#EE5ED1' },
    { name: '스포츠', value: 9, color: '#E94FCB' },
    { name: '여행', value: 8, color: '#E241C6' },
    { name: '연예', value: 7, color: '#DA34C3' },
    { name: '예술', value: 6, color: '#D02BBE' },
    { name: '요리', value: 5, color: '#C624B9' },
    { name: '음악', value: 4, color: '#B91CB1' },
    { name: '코미디', value: 3, color: '#AC17A8' },
    { name: '기타', value: 2, color: '#760C80' },
  ];

  // 부모 요소가 없기 때문에, ResponsiveContainer에 직접 높이를 지정합니다.
  // 이렇게 하면 부모의 높이를 걱정하지 않아도 됩니다.
  return (
    <ResponsiveContainer width={700} height={400}>
      <BarChart
        data={data}
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
