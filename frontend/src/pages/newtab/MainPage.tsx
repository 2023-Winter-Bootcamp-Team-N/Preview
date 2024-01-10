import React, { useState } from 'react';
import '../sidepanel/index.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import SummaryPage from './SummaryPage';
import save from '../../assets/img/savebutton.svg';

const MainPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}>
      {/* 첫번째 줄 프레임 */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button
          onClick={() => handleCategoryChange('health')}
          className="margin: '8px', width: '700px', height: '700px'">
          <img src={save} alt="logo" />
        </button>
      </div>
      <SummaryPage selectedCategory={selectedCategory} />
    </div>
  );
};
export default withErrorBoundary(withSuspense(MainPage, <div> Loading ... </div>), <div> Error Occur </div>);
