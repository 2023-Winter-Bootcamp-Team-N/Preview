import React, { useState } from 'react';
import '@pages/newtab/Newtab.scss';
import '../sidepanel/index.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import SearchComponent from './SearchComponent';

const Newtab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <div>
      <div className="flex">
        {/* 카테고리 선택 컴포넌트 */}
        <button onClick={() => handleCategoryChange('Category1')} className="bg-blue-500 text-white px-4 py-2 mr-2">
          Category 1
        </button>
        <button onClick={() => handleCategoryChange('Category2')} className="bg-green-500 text-white px-4 py-2">
          Category 2
        </button>
        {/* ... */}
      </div>
      {/* 검색 컴포넌트 */}
      <SearchComponent selectedCategory={selectedCategory} />
    </div>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
