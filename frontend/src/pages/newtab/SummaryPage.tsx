//서머리 백업 - 요약본이 안떠서 이전거로 돌아가기 전 백업
import React, { useState, useEffect } from 'react';
import searchIcon from '../../assets/img/searchIcon.svg';
import line from '../../assets/img/line.svg';
import './SummaryPage.css';
import axios from 'axios';
import SummaryItem from './SummaryItem';
import Modal from './Modal';
import closeButton from '../../assets/img/closeButton.svg';

interface SummaryPageProps {
  selectedCategory: string | null;
  selectedChannel: string | null; // 추가
  channel: string | null; // 새로 추가된 prop
  summary: SummaryItem[];
  onCloseButtonClick: () => void;
  category: string;
}
const SummaryPage: React.FC<SummaryPageProps> = ({
  selectedCategory,
  selectedChannel,
  summary,
  onCloseButtonClick,
  category,
}) => {
  console.log('Summary prop:', summary);
  if (!summary) {
    summary = []; // summary가 undefined인 경우 빈 배열로 초기화
  }
  //카테고리를 선택하면 요약본이 보여지는 함수
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  //// 컴포넌트 내 상태 관리를 위한 state 변수 선언 및 초기화
  const [keyword, setKeyword] = useState('');
  //사용자가 저장한 요약본의 상태 관리를 위한 변수 선언
  const [summaries, setSummaries] = useState([]);

  const [selectedSummary, setSelectedSummary] = useState<SummaryItem>(null);

  const [, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setIsSummaryVisible(!!selectedCategory || !!selectedChannel);
  }, [selectedCategory, selectedChannel]);

  useEffect(() => {
    // summary 배열 값이 변경될 때 실행되는 코드
    // 예: API로부터 새로운 데이터를 가져와서 setSummary로 업데이트할 경우
    console.log('Summary:', summary);
  }, [summary]);

  // 창 닫기 버튼을 눌렀을 때 실행되는 함수
  const XButtonClick = () => {
    setIsSummaryVisible(false); // 창이 닫히도록 상태를 변경
    setSummaries([]);
    setKeyword('');

    // main-content 클래스가 있는지 확인 후 상태 변경
    const mainContent = document.querySelector('.main-content'); //선택적
    if (mainContent) {
      mainContent.classList.remove('search-visible');
    }
    onCloseButtonClick(); // 콜백함수
  };
  // 검색 버튼 클릭 시 실행되는 비동기 함수

  const openModalForSummary = (selectedSummary: SummaryItem) => {
    openModal();
    setSelectedSummary(selectedSummary);
  };

  useEffect(() => {
    console.log('selectedSummary 업데이트:', selectedSummary);
  }, [selectedSummary]);

  const handleSearch = async () => {
    try {
      const params = {
        user_id: 1,
        keyword: keyword,
      };
      console.log('Request parameters:', params);
      const response = await axios.get('http://localhost:8000/api/search/keyword', { params });
      const SearchSummaries = response.data.summaries;
      setSummaries(SearchSummaries);
      console.log('내가 입력한 키워드:', keyword);
    } catch (error) {
      console.error('키워드 관련 요약본 불러오기 실패 : ', error);
    }
  };

  return (
    <div>
      {selectedSummary && (
        <Modal
          isOpen={true} // 모달 열기
          closeModal={() => {
            setSelectedSummary(null);
          }}
          selectedSummary={selectedSummary} // selectedSummary 전달
        />
      )}

      <div
        className={`summary-container ${isSummaryVisible ? 'visible' : ''}`}
        style={{ border: '1px solid #8D8D8D', overflow: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* 창 닫기 버튼 */} {/*닫는기능과 카테고리 취소기능*/}
          <button onClick={() => XButtonClick()}>
            {' '}
            <img
              src={closeButton}
              alt="closeButton"
              style={{
                marginTop: '1rem',
                marginLeft: 'auto',
                marginRight: '1rem',
                width: '1.3rem', // 원하는 가로 크기
              }}
            />
          </button>
          {/* 카테고리명 */}
          <div
            style={{
              color: 'black',
              outline: 'none',
              fontFamily: 'WantedSansRegular',
              background: 'transparent',
              resize: 'none',
              fontSize: '2.1vw',
              fontWeight: '530',
              lineHeight: 'normal',
              verticalAlign: 'bottom',
              marginLeft: '8%',
            }}>
            {category}
          </div>
          {/* 검색 아이콘과 인풋바를 한 행에 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 'auto',
            }}>
            {' '}
            {/* 검색 아이콘 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '2%',
              }}>
              {/* 검색 아이콘 */}
              {/* (검색 아이콘을 버튼화하여 키워드 검색을 할 수 있도록) */}
              <button
                onClick={handleSearch}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginRight: '1vw',
                }}>
                {' '}
                <img src={searchIcon} alt="Search Icon" style={{ height: 'auto', marginRight: '1vw', width: '2vw' }} />
              </button>
              {/* 인풋 바 */}
              <div style={{ background: '#F5F5F7', marginRight: '4rem' }}>
                {' '}
                <input
                  style={{
                    color: 'black', // 검정색으로 변경
                    border: '2px solid #000',
                    outline: 'none',
                    background: 'transparent',
                    padding: '8px',
                    width: '16vw', // 작은 화면에서의 크기
                    borderRadius: '6px', // 원하는 border-radius 값
                    height: '2rem', // 원하는 높이 값
                    fontSize: '0.9rem',
                  }}
                  placeholder="키워드를 입력하세요."
                  id="keywordInput" //<!-- 고유한 id 속성 추가 -->
                  name="keyword" //<!-- 고유한 name 속성 추가 -->
                  //API 연동 부분
                  value={keyword}
                  // 입력 요소의 값이 변경될 때마다 해당 값을 setKeyword 함수를 통해 React 상태에 반영
                  onChange={e => setKeyword(e.target.value)}
                  onKeyDown={e => {
                    // 엔터 키를 눌렀을 때 handleSearch 함수 호출
                    if (e.key === 'Enter') {
                      e.preventDefault(); // 기본 동작 방지
                      handleSearch();
                    }
                  }}
                />{' '}
              </div>
            </div>
          </div>
        </div>

        {selectedChannel && (
          <div>
            <p>Selected Channel: {selectedChannel}</p>
            {/* 채널 관련 정보 표시 */}
          </div>
        )}
        {keyword &&
          summaries.map((summaries, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'auto',
              }}
              onClick={() => openModalForSummary(summaries)}>
              {/* 요약본 {index} */}
              {/* 라인 */}
              <img
                src={line}
                alt={`Line ${index} Icon`}
                style={{ width: '90%', height: '100%', margin: '4% 5% 4% 5%' }}
              />
              {/* 썸네일, 텍스트*/}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {/* 썸네일 */}

                <img
                  src={summaries.summary.youtube_thumbnail}
                  alt={`Thumbnail ${index} Icon`}
                  style={{
                    width: '29%',
                    height: '16.31%',
                    marginLeft: '6%',
                    marginRight: '3%',
                    borderRadius: '10px', // 여기에 원하는 테두리 곡률 값을 추가
                  }}
                />
                {/* 텍스트 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* 제목, 날짜 */}

                  <div style={{ display: 'flex', flexDirection: 'row', height: '9%', alignItems: 'flex-end' }}>
                    {/* 제목, 날짜를 한 행에 */}
                    {/* 제목 */}
                    <pre
                      style={{
                        color: 'black',
                        outline: 'none',
                        fontFamily: 'WantedSansRegular',
                        background: 'transparent',
                        width: '58%',
                        resize: 'none',
                        fontSize: '1.3vw',
                        fontWeight: '530',
                        lineHeight: 'normal',
                        verticalAlign: 'bottom',
                        whiteSpace: 'pre-wrap', // 공백과 줄바꿈 유지하며 필요에 따라 자동 줄바꿈
                        // 세 줄까지만 표시하고 말줄임표
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                      {summaries.summary.youtube_title}
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
                        fontSize: '0.9vw',
                        margin: '1% 2% 0 12%', // 상단, 우측, 하단, 좌측 마진
                        fontFamily: 'WantedSansRegular',
                        whiteSpace: 'pre-wrap',
                        verticalAlign: 'bottom', // 바닥을 기준으로 정렬
                        lineHeight: 'normal', // 제목의 line-height와 일치시키기
                      }}>
                      {new Date(summaries.summary.created_at).toLocaleDateString()}
                    </pre>
                  </div>
                  <div className="mr-30">
                    {/* 요약본 */}
                    <pre
                      style={{
                        color: 'black',
                        outline: 'none',
                        background: 'transparent',
                        width: '90%',
                        resize: 'none',
                        fontSize: '1vw',
                        margin: '3% 5% 2% 0',
                        fontFamily: 'WantedSansRegular',
                        alignSelf: 'flex-start',
                        whiteSpace: 'pre-wrap',
                        height: '4rem',
                        // 세 줄까지만 표시하고 말줄임표
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                      {summaries.summary.content}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {!keyword &&
          summary.map((summary, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'auto',
              }}
              onClick={() => openModalForSummary(summary)}>
              {/* 요약본 {index} */}
              {/* 라인 */}
              <img
                src={line}
                alt={`Line ${index} Icon`}
                style={{ width: '90%', height: '100%', margin: '4% 5% 4% 5%' }}
              />
              {/* 썸네일, 텍스트*/}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {/* 썸네일 */}

                <img
                  src={summary.summary.youtube_thumbnail}
                  alt={`Thumbnail ${index} Icon`}
                  style={{
                    width: '29%',
                    height: '16.31%',
                    marginLeft: '6%',
                    marginRight: '3%',
                    borderRadius: '10px', // 여기에 원하는 테두리 곡률 값을 추가
                  }}
                />
                {/* 텍스트 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* 제목, 날짜 */}

                  <div style={{ display: 'flex', flexDirection: 'row', height: '9%', alignItems: 'flex-end' }}>
                    {/* 제목, 날짜를 한 행에 */}
                    {/* 제목 */}
                    <pre
                      style={{
                        color: 'black',
                        outline: 'none',
                        fontFamily: 'WantedSansRegular',
                        background: 'transparent',
                        width: '58%',
                        resize: 'none',
                        fontSize: '1.3vw',
                        fontWeight: '530',
                        lineHeight: 'normal',
                        verticalAlign: 'bottom',
                        whiteSpace: 'pre-wrap', // 공백과 줄바꿈 유지하며 필요에 따라 자동 줄바꿈
                        // 세 줄까지만 표시하고 말줄임표
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                      {summary.summary.youtube_title}
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
                        fontSize: '0.9vw',
                        margin: '1% 2% 0 12%', // 상단, 우측, 하단, 좌측 마진
                        fontFamily: 'WantedSansRegular',
                        whiteSpace: 'pre-wrap',
                        verticalAlign: 'bottom', // 바닥을 기준으로 정렬
                        lineHeight: 'normal', // 제목의 line-height와 일치시키기
                      }}>
                      {new Date(summary.summary.created_at).toLocaleDateString()}
                    </pre>
                  </div>
                  <div className="mr-30">
                    {/* 요약본 */}
                    <pre
                      style={{
                        color: 'black',
                        outline: 'none',
                        background: 'transparent',
                        width: '90%',
                        resize: 'none',
                        fontSize: '1vw',
                        margin: '3% 5% 2% 0',
                        fontFamily: 'WantedSansRegular',
                        alignSelf: 'flex-start',
                        whiteSpace: 'pre-wrap',
                        height: '4rem',
                        // 세 줄까지만 표시하고 말줄임표
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                      {summary.summary.content}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default SummaryPage;
