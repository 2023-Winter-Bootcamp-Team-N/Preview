import React, { useState, useEffect, useRef } from 'react';
import searchIcon from '../../assets/img/searchIcon.svg';
import youtubeimage from '../../assets/img/youtubeimage.png';
import line from '../../assets/img/line.svg';
import sectionImage from '../../assets/img/sectionImage.svg';

import './SummaryPage.css';

interface SummaryPageProps {
  selectedCategory: string | null;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ selectedCategory }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const toggleInnerDiv = (index: number) => {
    setSelectedItem(prev => (prev === index ? null : index));
  };

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  useEffect(() => {
    setIsSearchVisible(!!selectedCategory);
  }, [selectedCategory]);

  // 창 닫기 버튼을 눌렀을 때 실행되는 함수
  const handleCloseButtonClick = () => {
    setIsSearchVisible(false); // 창이 닫히도록 상태를 변경
  };

  return (
    <div className={`search-container ${isSearchVisible ? 'visible' : ''}`} style={{ border: '1px solid #8D8D8D' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* 창 닫기 버튼 */}
        <button
          className="text-black px-4 py-2"
          style={{
            marginLeft: 'auto',
            marginRight: '1rem',
            width: '2rem', // 원하는 가로 크기
            fontSize: '1.9rem', // 원하는 텍스트 크기
          }}
          onClick={handleCloseButtonClick} // 창 닫기 버튼을 눌렀을 때 동작을 설정
        >
          X
        </button>
        {/* 검색 아이콘과 인풋바를 한 행에 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
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
            <img src={searchIcon} alt="Search Icon" style={{ height: 'auto', marginRight: '1vw', width: '2.5vw' }} />
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
                  width: '16vw', // 작은 화면에서의 크기
                  borderRadius: '6px', // 원하는 border-radius 값
                  height: '3rem', // 원하는 높이 값
                  fontSize: '1.2rem',
                }}
                placeholder="키워드를 입력하세요."
              />{' '}
            </div>
          </div>
        </div>
      </div>

      {[1, 2, 3, 4].map(index => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          key={index}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          onClick={() => toggleInnerDiv(index)}>
          {/* 요약본 {index} */}
          {/* 라인 */}
          <img src={line} alt={`Line ${index} Icon`} style={{ width: '90%', height: 'auto', margin: '2% 5% 2% 5%' }} />
          {/* 썸네일, 텍스트*/}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* 썸네일 */}
            <img
              src={youtubeimage}
              alt={`Thumbnail ${index} Icon`}
              style={{ width: '33%', height: '15%', marginLeft: '5%', marginRight: '5%' }}
            />
            {/* 텍스트 */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* 제목, 날짜 */}
              <div style={{ display: 'flex', flexDirection: 'row', height: '20%' }}>
                {/* 제목, 날짜를 한 행에 */}
                {/* 제목 */}
                <pre
                  //className="text-black outline-none bg-transparent p-1 w-80 resize-none text-bold overflow-hidden"
                  style={{
                    color: 'black',
                    outline: 'none',
                    fontFamily: 'notoSans',
                    background: 'transparent',
                    width: '60%',
                    resize: 'none',
                    overflow: 'hidden',
                    fontSize: '1.8vw',
                    fontWeight: '700',
                    lineHeight: 'normal',
                    alignSelf: 'flex-start',
                    verticalAlign: 'bottom',
                  }}>
                  가나다라
                </pre>
                {/* 날짜 */}
                <pre
                  style={{
                    color: 'black',
                    outline: 'none',
                    background: 'transparent',
                    width: '25%',
                    resize: 'none',
                    overflow: 'hidden',
                    fontSize: '1.2vw',
                    marginRight: '2%',
                    marginTop: '2%',
                    fontFamily: 'notoSans',
                    whiteSpace: 'pre-wrap',
                  }}>
                  2024.01.08
                </pre>
              </div>
              <div className="mr-30">
                {/* 요약본 */}
                <pre
                  style={{
                    color: 'black',
                    outline: 'none',
                    background: 'transparent',
                    width: '85%',
                    resize: 'none',
                    overflow: 'hidden',
                    fontSize: '1.06vw',
                    margin: '2% 5% 2% 0',
                    marginRight: '2%',
                    fontFamily: 'notoSans',
                    alignSelf: 'flex-start',
                    whiteSpace: 'pre-wrap',
                    maxHeight: '7.8rem',
                  }}>
                  2024 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다. 국정감사 및
                  조사에 관한 절차 기타 필요한 사항은 법률로 정한다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와
                  창의를 존중함을 기본으로 한다. 국정감사 및 조사에 관한 절차 기타 필요한 사항은 법률로 정한다.
                </pre>
              </div>
            </div>
          </div>
          {/*안쪽 div : 요약본 확대하기 */}
          {selectedItem === index && (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#D9D9D9' }}>
              {/* 썸네일 */}
              <img
                src={sectionImage}
                alt={`Thumbnail ${index} Icon`}
                style={{ width: '33%', height: '15%', marginLeft: '5%', marginRight: '5%' }}
              />
              {/* 텍스트 */}

              {/* 요약본 */}
              <pre
                style={{
                  color: 'black',
                  outline: 'none',
                  background: 'transparent',
                  width: '85%',
                  resize: 'none',
                  overflow: 'hidden',
                  fontSize: '1.06vw',
                  margin: '2% 5% 2% 0',
                  marginRight: '2%',
                  fontFamily: 'notoSans',
                  alignSelf: 'flex-start',
                  whiteSpace: 'pre-wrap',
                  //maxHeight: '7.8rem',
                }}>
                2024 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다. 국정감사 및
                조사에 관한 절차 기타 필요한 사항은 법률로 정한다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와
                창의를 존중함을 기본으로 한다. 국정감사 및 조사에 관한 절차 기타 필요한 사항은 법률로 정한다.
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryPage;
