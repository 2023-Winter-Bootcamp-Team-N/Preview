import React from 'react';
import './ChartComponent.css'; // 스타일 파일 경로에 맞게 수정

const ChartComponent = () => {
  const data = [65, 59, 80, 81, 56];
  const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];

  const max = Math.max(...data);
  const scaleFactor = 100 / max;

  return (
    <div>
      <h2>Sample Bar Chart</h2>
      <div className="chart-container">
        {data.map((value, index) => (
          <div key={index} className="bar" style={{ height: `${value * scaleFactor}%` }}>
            <span className="label">{categories[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartComponent;