import React, { useState, useEffect } from 'react';
import searchIcon from '../../assets/img/searchIcon.png';
import youtubeimage from '../../assets/img/youtubeimage.svg';
import line from '../../assets/img/line.png';

import './SearchComponent.css';

interface SearchComponentProps {
  selectedCategory: string | null;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ selectedCategory }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  useEffect(() => {
    setIsSearchVisible(!!selectedCategory);
  }, [selectedCategory]);

  //   const divData = [
  //     { id: 1, text: '창 닫기 div' },
  //     { id: 2, text: '검색바 div' },
  //     { id: 3, text: '요약본 1 div' },
  //     { id: 4, text: '요약본 2 div' },
  //     { id: 5, text: '요약본 3 div' },
  //     { id: 6, text: '요약본 4 div' },
  //   ];

  return (
    <div className={`search-container ${isSearchVisible ? 'visible' : ''}git `}>
      <div className="absolute top-0 right-0 p-4">
        {/* 창 닫기 버튼 */}
        <button
          className="text-black px-4 py-2"
          // onClick={onClose}  // 창 닫기 버튼을 눌렀을 때 동작을 설정
        >
          X
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '2%' }}>
        {/* 검색바 */}
        <img src={searchIcon} alt="Search Icon" style={{ width: '5%', height: 'auto', marginRight: '2%' }} />
        {/* 텍스트 바 */}
        <div style={{ background: '#3498db', padding: '1%', borderRadius: '8px' }}>
          <p style={{ margin: 0, color: '#fff' }}>텍스트 내용</p>
        </div>
      </div>

      {[1, 2, 3, 4].map(index => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
          {/* 요약본 {index} */}
          <img src={line} alt={`Line ${index} Icon`} style={{ width: '90%', height: 'auto', margin: '2%' }} />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <img
              src={youtubeimage}
              alt={`Thumbnail ${index} Icon`}
              style={{ width: '45%', height: 'auto', margin: '2%' }}
            />
            <img
              src={youtubeimage}
              alt={`Thumbnail ${index} Icon`}
              style={{ width: '45%', height: 'auto', margin: '2%' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default SearchComponent;
AnalyserNode;
