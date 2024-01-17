import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const ChartComponent = () => {
  console.log('Rendering ChartComponent');

  const data = [
    { name: '프론트엔드', value: 30 },
    { name: '백엔드', value: 25 },
    { name: '안드로이드', value: 20 },
    { name: 'iOS', value: 18 },
    { name: '데이터 분석', value: 15 },
    { name: '머신러닝', value: 12 },
    { name: 'QA', value: 10 },
    { name: 'DevOps', value: 9 },
    { name: 'UI/UX 디자인', value: 8 },
    { name: '보안', value: 7 },
    { name: '게임 개발', value: 6 },
    { name: '블록체인', value: 5 },
    { name: '클라우드', value: 4 },
    { name: '임베디드 시스템', value: 3 },
    { name: '사물인터넷(IoT)', value: 2 },
    { name: '빅 데이터', value: 1 },
  ];

  // 부모 요소가 없기 때문에, ResponsiveContainer에 직접 높이를 지정합니다.
  // 이렇게 하면 부모의 높이를 걱정하지 않아도 됩니다.
  return (
    <ResponsiveContainer width={500} height={500}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={20}
        barGap={5} // 막대 사이의 간격
        layout="vertical" // 수직 차트를 원하는 경우에만 사용
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar dataKey="value" fill="#413ea0" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
