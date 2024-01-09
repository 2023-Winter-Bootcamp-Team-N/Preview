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
          style={{ marginLeft: 'auto' }}
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
            marginLeft: 'auto',
          }}>
          {' '}
          {/* 검색 아이콘 */}
          <img src={searchIcon} alt="Search Icon" style={{ width: '10%', height: 'auto', marginRight: '2%' }} />
          {/* 인풋 바 */}
          <div style={{ background: '#F5F5F7', marginRight: '30px' }}>
            {' '}
            <input
              type="text"
              style={{
                color: '#fff',
                border: '2px solid #000', // 검정색 테두리 설정
                outline: 'none',
                background: 'transparent',
                padding: '8px', // 텍스트 내용과 테두리 사이의 간격 설정
              }}
              placeholder="텍스트 내용"
            />{' '}
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
                  style={{
                    fontSize: '26px',
                    color: '#000', // 텍스트의 색상 : 검정
                    outline: 'none', //포커스 효과의 외곽선을 제거
                    background: 'transparent', //배경을 투명하게 설정
                    padding: '1px', // 텍스트 내용과 테두리 사이의 간격 설정
                    width: '60%', // 텍스트 영역의 폭을 부모 요소의 60%로 설정
                    resize: 'none', // 크기 조절 비활성화
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: 'normal',
                  }}
                  value={'가나다라'}
                  readOnly // 사용자 입력 비활성화
                />
                {/* 날짜 */}
                <textarea
                  style={{
                    fontSize: '20px',
                    color: '#000',
                    outline: 'none',
                    background: 'transparent',
                    padding: '1px',
                    width: '35%',
                    resize: 'none',
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
                  style={{
                    fontSize: '18px',
                    color: '#000',
                    outline: 'none',
                    background: 'transparent',
                    padding: '1px',
                    width: '135%', // 텍스트 영역의 폭을 100%로 설정
                    resize: 'none',
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
