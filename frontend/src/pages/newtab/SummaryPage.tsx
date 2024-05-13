import React, { useState, useEffect, useCallback } from 'react';
import searchIcon from '../../assets/img/searchIcon.svg';
import './SummaryPage.css';
import axios from '../../axios';
import SummaryItem from './SummaryItem';
import closeButton from '../../assets/img/closeButton.svg';
import Modal from './Modal';
import debounce from './debounce';

interface SummaryPageProps {
  selectedCategory: string | null;
  selectedChannel: string | null;
  summary: SummaryItem[];
  onCloseButtonClick: () => void;
  setSummary;
  category: string;
  summaries;
  setSummaries;
  keyword: string;
  setKeyword;
  setChannelData;
  ChannelData;
}
const SummaryPage: React.FC<SummaryPageProps> = ({
  selectedCategory,
  summary,
  onCloseButtonClick,
  selectedChannel,
  category,
  setSummary,
  summaries,
  setSummaries,
  keyword,
  setKeyword,
  ChannelData,
}) => {
  console.log('Summary prop:', summary);
  if (!summary) {
    summary = []; // summary가 undefined인 경우 빈 배열로 초기화
  }
  //카테고리를 선택하면 요약본이 보여지는 함수
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  //// 컴포넌트 내 상태 관리를 위한 state 변수 선언 및 초기화
  //사용자가 저장한 요약본의 상태 관리를 위한 변수 선언

  const [selectedSummary, setSelectedSummary] = useState<SummaryItem>(null);

  const [, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const closeModal = () => {
    setIsSummaryVisible(false);
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

  const debouncedSearch = useCallback(
    debounce(async searchKeyword => {
      try {
        const params = { user_id: 1, keyword: searchKeyword, category };
        const response = await axios.get('http://localhost:8000/api/v1/search/keyword', { params });
        const SearchSummaries = response.data.summaries;
        setSummaries(SearchSummaries);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('No results found for:', searchKeyword);
        } else {
          console.error('Failed to fetch summaries:', error);
        }
      }
    }, 500),
    [category],
  );

  const handleKeywordChange = e => {
    const { value } = e.target;
    setKeyword(value);
    debouncedSearch(value);
  };

  const DeleteCategory = async (summary_id: string) => {
    try {
      // Display a confirmation alert
      const shouldDelete = window.confirm('선택한 요약본을 삭제하시겠습니까?');

      // If the user clicks 'OK' in the confirmation alert
      if (shouldDelete) {
        await axios.delete(`http://localhost:8000/api/v1/summary/${summary_id}?user_id=1`);
        const updatedSummary = summary.filter(item => item.summary.summary_id !== summary_id);
        setSummary(updatedSummary);
        console.log('카테고리 삭제:', summary_id);
        console.log('바뀐 summary:', updatedSummary); // Use updatedSummary instead of summary
        window.alert('삭제가 완료되었습니다.');
      } else {
        window.alert('삭제가 취소되었습니다.');
        console.log('삭제 취소:', summary_id);
      }
    } catch (error) {
      console.error('삭제 실패', summary_id);
    }
  };

  const DeleteChannel = async (selectedChannel: string) => {
    try {
      // Display a confirmation alert
      const shouldDeletechannel = window.confirm('선택한 채널을 삭제하시겠습니까?');

      // If the user clicks 'OK' in the confirmation alert
      if (shouldDeletechannel) {
        await axios.delete(`http://localhost:8000/api/v1/subscribe/${selectedChannel}?user_id=1`);

        window.alert('구독 취소가 완료되었습니다.');
      } else {
        window.alert('취소 되었습니다.');
      }
    } catch (error) {
      console.error('삭제 실패');
    }
  };
  const [hoverState, setHoverState] = useState({});

  const handleMouseEnter = index => {
    setHoverState(prevState => ({ ...prevState, [index]: true }));
  };

  const handleMouseLeave = index => {
    setHoverState(prevState => ({ ...prevState, [index]: false }));
  };

  return (
    <div>
      {selectedSummary && (
        <Modal
          isOpen={true} // 모달 열기
          closeModal={() => {
            setSelectedSummary(null);
          }}
          selectedSummary={selectedSummary}
          onDeleteCategory={DeleteCategory} // selectedSummary 전달
        />
      )}

      <div className={`summary-container ${isSummaryVisible ? 'visible' : ''}`} style={{ overflow: 'auto' }}>
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
              draggable="false"
            />
          </button>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* 카테고리명 */}
            <div
              style={{
                color: '#5C5C5C',
                outline: 'none',
                fontFamily: 'WantedSansRegular',
                background: 'transparent',
                resize: 'none',
                fontSize: '1.7vw',
                fontWeight: '530',
                lineHeight: 'normal',
                verticalAlign: 'bottom',
                marginLeft: '8%',
                width: '70%',
                marginBottom: '40px',
                whiteSpace: 'nowrap', // 한 줄로 표시
                overflow: 'hidden', // 범위를 넘어가는 텍스트 숨김
                textOverflow: 'ellipsis', // 말줄임표 표시
              }}>
              {selectedChannel ? selectedChannel : category}
            </div>
            {/* 검색 아이콘과 인풋바를 한 행에 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end', // 자식 요소를 오른쪽 끝으로 정렬
                width: '100%', // 부모 요소의 너비를 최대로 설정
                marginRight: '1.2rem', // 오른쪽 여백
                marginBottom: '40px',
              }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'relative', // 상대적 위치
                  background: '#F5F5F7',
                  borderRadius: '30px', // 원하는 border-radius 값
                  marginRight: '1.6rem',
                }}>
                {/* 검색 아이콘 */}
                <button
                  onClick={() => DeleteChannel(selectedChannel)}
                  style={{
                    position: 'absolute', // 절대적 위치
                    left: '10px', // 인풋 바 내부에서 왼쪽에 위치
                    top: '50%', // 중앙 정렬
                    transform: 'translateY(-50%)', // 정확한 중앙 정렬을 위해 Y축 기준으로 -50% 이동
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    paddingLeft: '2px',
                  }}>
                  <img
                    src={searchIcon}
                    alt="Search Icon"
                    style={{ height: 'auto', width: '1.1vw' }}
                    draggable="false"
                  />
                </button>
                {/* 인풋 바 */}
                <input
                  style={{
                    color: '#686868',
                    border: 'none', // 테두리 제거
                    outline: 'none',
                    background: 'transparent',
                    padding: '8px 35px 8px 40px',
                    width: '16vw',
                    borderRadius: '30px',
                    height: '2rem',
                    fontSize: '0.8rem',
                    boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)', // 그림자 효과 추가
                  }}
                  id="keywordInput"
                  name="keyword"
                  placeholder="키워드를 입력하세요."
                  value={keyword}
                  onChange={handleKeywordChange}
                />
              </div>
            </div>
          </div>
        </div>

        {selectedChannel && (
          <button
            onClick={() => DeleteChannel(selectedChannel)}
            style={{
              color: '#686868',
              background: 'transparent',
              position: 'absolute',
              bottom: '3%',
              right: '5%',
              width: '12%',
              height: '5%',
              boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '20px',
              fontFamily: 'WantedSansRegular',
              fontWeight: 'bold',
            }}>
            구독취소
          </button>
        )}

        {selectedChannel &&
          ChannelData.map((Channel, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'auto',
                transform: hoverState[index] ? 'translateY(-8px)' : 'none', // 호버 시 위로 이동
                transition: 'transform 0.3s', // 부드러운 이동 효과
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => openModalForSummary(Channel)}>
              {/* 요약본 {index} */}
              {/* 라인 */}
              {index !== 0 && (
                <hr
                  style={{
                    width: '90%', // 이미지의 가로 길이와 동일
                    margin: '4% 5%', // 이미지와 동일한 마진
                    border: 'none', // 기본 테두리 제거
                    borderTop: '1px solid #B0B0B0', // 상단 테두리에만 선 적용
                  }}
                />
              )}
              {/* 썸네일, 텍스트*/}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {/* 썸네일 */}

                <img
                  src={Channel.summary.youtube_thumbnail}
                  alt={`Thumbnail ${index} Icon`}
                  style={{
                    width: '29%',
                    height: '16.31%',
                    marginLeft: '6%',
                    marginRight: '3%',
                    borderRadius: '10px', // 여기에 원하는 테두리 곡률 값을 추가
                  }}
                  draggable="false"
                />
                {/* 텍스트 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* 제목, 날짜 */}

                  <div style={{ display: 'flex', flexDirection: 'row', height: '9%', alignItems: 'flex-end' }}>
                    {/* 제목, 날짜를 한 행에 */}
                    {/* 제목 */}
                    <pre
                      style={{
                        color: '#464646',
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
                      {Channel.summary.youtube_title}
                    </pre>
                    {/* 날짜 */}
                    <pre
                      style={{
                        color: '#868686',
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
                      {new Date(Channel.summary.created_at).toLocaleDateString()}
                    </pre>
                  </div>
                  <div className="mr-30">
                    {/* 요약본 */}
                    <pre
                      style={{
                        color: '#686868',
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
                      {Channel.summary.content}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {keyword &&
          summaries.map((summaries, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'auto',
                transform: hoverState[index] ? 'translateY(-8px)' : 'none', // 호버 시 위로 이동
                transition: 'transform 0.3s', // 부드러운 이동 효과
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => openModalForSummary(summaries)}>
              {/* 요약본 {index} */}
              {index !== 0 && (
                <hr
                  style={{
                    width: '90%', // 이미지의 가로 길이와 동일
                    margin: '4% 5%', // 이미지와 동일한 마진
                    border: 'none', // 기본 테두리 제거
                    borderTop: '1px solid #B0B0B0', // 상단 테두리에만 선 적용
                  }}
                />
              )}
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
                  draggable="false"
                />
                {/* 텍스트 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* 제목, 날짜 */}

                  <div style={{ display: 'flex', flexDirection: 'row', height: '9%', alignItems: 'flex-end' }}>
                    {/* 제목, 날짜를 한 행에 */}
                    {/* 제목 */}
                    <pre
                      style={{
                        color: '#464646',
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
                        color: '#8E8E8E',
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
                        color: '#868686',
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
                transform: hoverState[index] ? 'translateY(-8px)' : 'none', // 호버 시 위로 이동
                transition: 'transform 0.3s', // 부드러운 이동 효과
                // 기타 스타일
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => openModalForSummary(summary)}>
              {/* 요약본 {index} */}
              {/* 라인 */}
              {index !== 0 && (
                <hr
                  style={{
                    width: '90%', // 이미지의 가로 길이와 동일
                    margin: '4% 5%', // 이미지와 동일한 마진
                    border: 'none', // 기본 테두리 제거
                    borderTop: '1px solid #B0B0B0', // 상단 테두리에만 선 적용
                  }}
                />
              )}
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
                  draggable="false"
                />
                {/* 텍스트 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* 제목, 날짜 */}

                  <div style={{ display: 'flex', flexDirection: 'row', height: '9%', alignItems: 'flex-end' }}>
                    {/* 제목, 날짜를 한 행에 */}
                    {/* 제목 */}
                    <pre
                      style={{
                        color: '#464646',
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
                        color: '#868686',
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
                        color: '#686868',
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
