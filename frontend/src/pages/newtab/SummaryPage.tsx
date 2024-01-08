import React, { useState, useEffect } from 'react';
import searchIcon from '../../assets/img/searchIcon.png';
import youtubeimage from '../../assets/img/youtubeimage.svg';
import line from '../../assets/img/line.png';

import './SummaryPage.css';

interface SummaryPageProps {
  selectedCategory: string | null;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ selectedCategory }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  useEffect(() => {
    setIsSearchVisible(!!selectedCategory);
  }, [selectedCategory]);

  return (
    <div className={`search-container ${isSearchVisible ? 'visible' : ''}`}>
      <div className="absolute top-0 right-0 p-4">
        {/* 창 닫기 버튼 */}
        <button
          className="text-black px-4 py-2"
          style={{ marginLeft: 'auto' }}
          // onClick={onClose}  // 창 닫기 버튼을 눌렀을 때 동작을 설정
        >
          X
        </button>
        {/* 검색 아이콘과 인풋바를 한 행에 */}
        <div className="flex-row items-center mb-2 ml-auto">
          {/* 검색 아이콘 */}
          <img src={searchIcon} alt="Search Icon" style={{ width: '10%', height: 'auto', marginRight: '2%' }} />
          {/* 인풋 바 */}
          <div className="bg-gray-300 mr-8">
            <input
              className="text-white border-2 border-black outline-none bg-transparent p-2"
              type="text"
              placeholder="텍스트 내용"
            />
          </div>
        </div>
      </div>

      {[1, 2, 3, 4].map(index => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
          {/* 요약본 {index} */}
          {/* 라인 */}
          <img
            src={line}
            alt={`Line ${index} Icon`}
            style={{ width: '39.42406rem', height: '0.0625rem', margin: '2.44rem 0' }}
          />
          {/* 썸네일, 텍스트*/}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* 썸네일 */}
            <img
              src={youtubeimage}
              alt={`Thumbnail ${index} Icon`}
              style={{ width: '15.49rem', height: '8.75rem', margin: '0 2.44rem' }}
            />
            {/* 텍스트 */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* 제목, 날짜 */}
              <div style={{ display: 'flex', flexDirection: 'row', height: '20%' }}>
                {/* 제목, 날짜를 한 행에 */}
                {/* 제목 */}
                <textarea
                  className="text-black outline-none bg-transparent p-1  w-14.5rem h-2.4375rem resize-none text-bold"
                  style={{
                    // fontSize: '1rem',
                    fontWeight: '700',
                    fontFamily: 'notoSans',
                  }}
                  value={'가나다라가나다라가나다라가나다라'}
                  readOnly
                />
                {/* 날짜 */}
                <textarea
                  className="text-black font-['notoSans'] outline-none bg-transparent p-1 w-8rem h-1.6875rem resize-none"
                  style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    fontFamily: 'notoSans',
                  }}
                  value={'2024.01.08'}
                  readOnly
                />
              </div>
              <div className="mr-30">
                {/* 요약본 */}
                <textarea
                  className="text-black outline-none bg-transparent p-1 w-21.625rem h-6.5rem  resize-none"
                  style={{
                    fontSize: '1rem',
                    fontWeight: '400',
                    fontFamily: 'notoSans',
                  }}
                  rows={4}
                  value={
                    '대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다. 국정감사 및 조사에 관한 절차 기타 필요한 사항은 법률로 정한다.'
                  }
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SummaryPage;
