// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';

// // // const data = [
// // //   { name: 'Group A', value: 400 },
// // //   { name: 'Group B', value: 300 },
// // //   { name: 'Group C', value: 300 },
// // //   { name: 'Group D', value: 200 },
// // // ];

// // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// // const ChartComponent2 = ({ user_id }) => {
// //   console.log('Rendering ChartComponent');

// //   const [chartData, setChartData] = useState([]);

// //   useEffect(() => {
// //     const fetchChartData = async () => {
// //       try {
// //         const params = {
// //           user_id: 1,
// //         };
// //         console.log('Request parameters:', params);

// //         const response = await axios.get(`http://localhost:8000/api/chart/channel`);
// //         // 구독 채널이 아닌 전체 채널값 반환 (response.data.summary
// //         const formattedData = response.data.summary.map(item => ({
// //           name: item.youtube_channel,
// //           value: parseInt(item.count, 10),
// //           color: 'RandomColorHere', // 색상은 임의로 설정하거나 별도의 로직으로 할당할 수 있습니다.
// //         }));
// //         setChartData(formattedData);
// //       } catch (error) {
// //         console.error('Error fetching chart data:', error);
// //         // 적절한 에러 처리 로직을 추가하세요.
// //       }
// //     };

// //     fetchChartData();
// //   }, [user_id]);

// //   return (
// //     <ResponsiveContainer width={500} height={500}>
// //       <PieChart>
// //         <Pie
// //           data={chartData}
// //           cx="50%"
// //           cy="50%"
// //           innerRadius={60}
// //           outerRadius={80}
// //           fill="#8884d8"
// //           paddingAngle={5}
// //           dataKey="value"
// //           label>
// //           {chartData.map((entry, index) => (
// //             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //           ))}
// //         </Pie>
// //         <Tooltip />
// //         <Legend />
// //       </PieChart>
// //     </ResponsiveContainer>
// //   );
// // };

// // export default ChartComponent2;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // 원형 그래프의 색상

// const ChartComponent2 = ({ user_id }) => {
//   const [chartData, setChartData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchChannelData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/chart/channel`, { params: { user_id: 1 } });
//         console.log('response.data : ', response.data); // 데이터 구조 확인을 위한 콘솔 로그

//         if (response.data.subscribes && Array.isArray(response.data.subscribes)) {
//           const formattedData = response.data.subscribes.map(item => {
//             //const count = parseInt(item.summary_count, 10);
//             console.log(`Channel: ${item.youtube_channel}, Count: ${item.count}`);
//             return {
//               name: item.youtube_channel,
//               count: item.count,
//             };
//           });
//           //console.log('item.youtube_channel.summary_count : ', formattedData.count); // 데이터 구조 확인을 위한 콘솔 로그

//           setChartData(formattedData);
//         }
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching channel data:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchChannelData();
//   }, [user_id]);

//   return (
//     <div>
//       <h2>YouTube Channel Summary</h2>
//       {isLoading ? (
//         <p>채널 데이터를 불러오는 중...</p>
//       ) : (
//         <ResponsiveContainer width={700} height={400}>
//           <BarChart
//             data={chartData}
//             barSize={20}
//             layout="vertical"
//             barGap={5}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//             <XAxis type="number" tick={{ fill: '#FFFFFF' }} />
//             <YAxis type="category" dataKey="name" tick={{ fill: '#FFFFFF' }} />
//             <CartesianGrid strokeDasharray="3 3" />
//             <Tooltip />
//             <Legend
//             //Legend 컴포넌트는 차트의 색상, 패턴 또는 기타 시각적 식별자와 연관된 텍스트 라벨을 표시할 때 유용
//             />
//             <Bar dataKey="count" fill="#8884d8" label={{ position: 'top' }} />
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// };

// export default ChartComponent2;

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
