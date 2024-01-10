import React, { useState, useEffect } from 'react';
import searchIcon from '../../assets/img/searchIcon.png';
import youtubeimage from '../../assets/img/youtubeimage.png';
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
            <div style={{ background: '#F5F5F7', marginRight: '4rem' }}>
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
        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {/* 요약본 {index} */}
          {/* 라인 */}
          <img src={line} alt={`Line ${index} Icon`} style={{ width: '90%', height: 'auto', margin: '7% 5% 7% 5%' }} />
          {/* 썸네일, 텍스트*/}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* 썸네일 */}
            <img
              src={youtubeimage}
              alt={`Thumbnail ${index} Icon`}
              style={{ width: '33%', height: 'auto', marginLeft: '5%', marginRight: '5%', alignSelf: 'flex-start' }}
            />
            {/* 텍스트 */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* 제목, 날짜 */}
              <div style={{ display: 'flex', flexDirection: 'row', height: '20%' }}>
                {/* 제목, 날짜를 한 행에 */}
                {/* 제목 */}
                <textarea
                  className="text-black outline-none bg-transparent p-1 w-80 resize-none text-bold overflow-hidden"
                  style={{
                    fontSize: '1.8vw', // 화면 너비의 2%로 글씨 크기 지정
                    fontWeight: '700',
                    lineHeight: 'normal',
                    fontFamily: 'notoSans',
                    alignSelf: 'flex-start',
                    verticalAlign: 'bottom',
                  }}
                  value={'가나다라'}
                  readOnly
                />
                {/* 날짜 */}
                <textarea
                  className="text-black font-['notoSans'] outline-none bg-transparent p-1 w-15 resize-none overflow-hidden"
                  style={{
                    fontSize: '1.2vw', // 화면 너비의 2%로 글씨 크기 지정
                    alignSelf: 'flex-start',
                    marginRight: '2%', // 오른쪽 마진 추가

                    whiteSpace: 'pre-wrap', //텍스트가 화면을 넘어가는 경우, 해당 텍스트에 줄 바꿈을 추가
                  }}
                  value={'2024.01.08'}
                  readOnly
                />
              </div>
              <div className="mr-30">
                {/* 요약본 */}
                <textarea
                  //className="text-black outline-none bg-transparent p-1 w-80 resize-none overflow-hidden"
                  style={{
                    color: 'black',
                    outline: 'none',
                    background: 'transparent',
                    padding: '1px', // 조절이 필요한 경우에는 원하는 크기로 조절
                    width: '80%', // 원하는 가로 크기
                    resize: 'none', // 크기 조절 비활성화
                    overflow: 'auto', // 스크롤 막기
                    fontSize: '1vw', // 화면 너비의 2%로 글씨 크기 지정
                    margin: '2% 5% 2% 0',
                    marginRight: '2%', // 오른쪽 마진 추가
                    alignSelf: 'flex-start',
                    whiteSpace: 'pre-wrap',
                    maxHeight: '3rem',
                  }}
                  //rows={4}
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
