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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* 창 닫기 버튼 */}
        <button
          className="text-black px-4 py-2"
          style={{
            marginLeft: 'auto',
            marginRight: '1rem',
            width: '2rem', // 원하는 가로 크기
            fontSize: '1.5rem', // 원하는 텍스트 크기
          }}
          // onClick={onClose}  // 창 닫기 버튼을 눌렀을 때 동작을 설정
        >
          X
        </button>
        {/* 검색 아이콘과 인풋바를 한 행에 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '2%',
            marginLeft: 'auto', //맨 오른쪽으로 보냄
          }}>
          {' '}
          {/* 검색 아이콘 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '2%',
              marginLeft: 'auto',
            }}>
            {/* 검색 아이콘 */}

            <img src={searchIcon} alt="Search Icon" style={{ height: 'auto', marginRight: '1vw', width: '1.5vw' }} />
            {/* 인풋 바 */}
            <div style={{ background: '#F5F5F7', marginRight: '5rem' }}>
              {' '}
              <input
                style={{
                  color: '#fff',
                  border: '2px solid #000',
                  outline: 'none',
                  background: 'transparent',
                  padding: '8px',
                  width: '20vw', // 작은 화면에서의 크기
                }}
                placeholder="텍스트 내용"
              />{' '}
            </div>
          </div>
        </div>
      </div>

      {[1, 2, 3, 4].map(index => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
          {/* 요약본 {index} */}
          {/* 라인 */}
          <img src={line} alt={`Line ${index} Icon`} className="w-full h-[0.0625rem] my-2" />
          {/* 썸네일, 텍스트*/}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* 썸네일 */}
            <img
              src={youtubeimage}
              alt={`Thumbnail ${index} Icon`}
              className="w-1/3 h-auto m-0 md:w-[15.49rem] md:h-[8.75rem] md:m-0 md:mr-6"
            />
            {/* 텍스트 */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* 제목, 날짜 */}
              <div style={{ display: 'flex', flexDirection: 'row', height: '20%' }}>
                {/* 제목, 날짜를 한 행에 */}
                {/* 제목 */}
                <textarea
                  className="text-black outline-none bg-transparent p-1 w-60 md:w-[14.5rem] h-[-2.4375rem] resize-none text-bold"
                  style={{
                    fontWeight: '700',
                    lineHeight: 'normal',
                    fontFamily: 'notoSans',
                  }}
                  value={'가나다라가나다라가나다라가나다라'}
                  readOnly // 사용자 입력 비활성화
                />
                {/* 날짜 */}
                <textarea
                  className="text-black font-['notoSans'] outline-none bg-transparent p-1 w-35 md:w-[8rem] h-[1.6875rem] resize-none"
                  style={{
                    fontWeight: '500',
                    fontFamily: 'notoSans',
                  }}
                  value={'2024.01.08'}
                  readOnly
                />{' '}
              </div>
              <div
                style={{
                  marginRight: '30%',
                }}>
                {/* 요약본 */}
                <textarea
                  className="text-black outline-none bg-transparent p-1 w-full md:w-[21.625rem] h-[-6.5rem] resize-none"
                  style={{
                    fontWeight: '400',
                    fontFamily: 'notoSans',
                  }}
                  rows={4}
                  value={
                    '대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다. 국정감사 및 조사에 관한 절차 기타 필요한 사항은 법률로 정한다.'
                  }
                  readOnly // 사용자 입력 비활성화
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
