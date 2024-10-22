/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import SummaryItem from './SummaryItem';
import closeButton from '../../assets/img/closeButton.svg';
import DeleteButton from '../../assets/img/DeleteButton.svg';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedSummary: SummaryItem;
  onDeleteCategory: (summary_id: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, selectedSummary, onDeleteCategory }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { summary_by_times } = selectedSummary; //클릭한 데이터의 시간별 부분 구조 분해 할당

  const inputString = `${selectedSummary.summary.youtube_url}`;

  const extractYouTubeVideoId = url => {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/,
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const videoID = extractYouTubeVideoId(inputString);

  const convertTimeFormat = time => {
    const [minutes, seconds] = time.split(':');
    return `${minutes}m${seconds}s`;
  };

  console.log('아이디는:', videoID);

  const goToSpecificTime = startTime => {
    // YouTube 비디오 ID
    // 특정 시간으로 이동하는 YouTube 링크 생성
    const youtubeLink = `https://www.youtube.com/watch?v=${videoID}&t=${startTime}`;

    // 새 탭에서 YouTube 링크 열기
    window.open(youtubeLink, '_blank');
  };

  const handleTimeButtonClick = startTime => {
    const formattedTime = convertTimeFormat(startTime);
    goToSpecificTime(formattedTime);
  };

  useEffect(() => {
    if (isOpen) {
      // 페이드 인 효과를 만들기 위해 투명도를 1로 설정하기 전에 작은 지연을 두기
      const timeout = setTimeout(() => {
        setModalVisible(true);
      }, 100);

      return () => clearTimeout(timeout);
    } else {
      setModalVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 오버레이 클릭 핸들러
  const handleOverlayClick = () => {
    closeModal();
  };

  // 모달 내부 클릭 이벤트가 오버레이로 전파되지 않도록 방지
  const handleModalClick = e => {
    e.stopPropagation();
  };

  return (
    <div>
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={handleOverlayClick} // 오버레이 클릭 이벤트
      >
        <div
          className="modal-overlay"
          style={{
            zIndex: '1000',
            background: '#ffffff',
            top: '50%',
            left: '50%',
            margin: 'auto',
            overflow: 'auto',
            width: '70%', // 모달의 가로 크기
            height: '90%', // 모달의 세로 크기
            position: 'fixed', // 고정 위치로 설정
            transform: 'translate(-50%, -50%)', // 중앙 정렬을 위해 위치 조정
            padding: '0 1% 2% 2%',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // 그림자 효과 추가
            opacity: modalVisible ? '1' : '0', // 상태에 따른 투명도 설정
            transition: 'opacity 0.3s ease-in-out', // 트랜지션 적용
            borderRadius: '10px', // 둥근 테두리 설정
            display: 'flex', // Flex 컨테이너로 설정
            flexDirection: 'column', // 세로 방향으로 아이템 정렬
          }}
          onClick={handleModalClick} // 모달 클릭 이벤트
        >
          <button
            className="text-black px-0 py-0 modal-close"
            style={{
              alignSelf: 'flex-end', // 버튼을 오른쪽으로 정렬
            }}
            onClick={() => closeModal()}>
            <img
              src={closeButton}
              alt="closeButton"
              style={{
                zIndex: '1001', // 모달보다 위에 위치하도록 설정
                marginRight: '1%',
                marginTop: '1rem',
                //marginBottom: '0.6rem',
                marginLeft: 'auto',
                width: '1.3rem', // 원하는 가로 크기
              }}
              draggable="false"
            />
          </button>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* 상단 요소들의 컨테이너 */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  //모달 배경 색상
                  backgroundColor: '#ffffff',
                }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <pre
                      style={{
                        margin: 0,
                        marginLeft: '12%',
                        //marginTop: '1rem',
                        fontFamily: 'WantedSansRegular',
                        fontSize: '1.8vw',
                        fontWeight: '700',
                        color: 'black',
                        //color: '#686868',
                        whiteSpace: 'pre-wrap', // 자동 줄바꿈 설정
                        width: '70%', // 가로 길이 조정
                      }}>
                      {selectedSummary.summary.youtube_title}
                    </pre>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        width: '100%',
                        marginBottom: '0.5rem',
                        marginTop: '0.5rem',
                      }}>
                      {/* 채널명 */}
                      <div>
                        <pre
                          style={{
                            marginLeft: '7.4rem',
                            fontFamily: 'WantedSansRegular',
                            fontSize: '1.4vw',
                            fontWeight: '400',
                            color: '#686868',
                            marginBottom: '3%',
                          }}>
                          {selectedSummary.summary.youtube_channel}
                        </pre>
                      </div>

                      {/* 날짜와 삭제 버튼 */}
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <pre
                          style={{
                            fontSize: '1.2vw',
                            marginRight: '4%',
                            color: '#686868',
                            fontFamily: 'WantedSansRegular',
                            marginBottom: '3%',
                          }}>
                          {new Date(selectedSummary.summary.created_at).toLocaleDateString()}
                        </pre>

                        <div className="DeleteButton">
                          <button
                            onClick={() => {
                              closeModal();
                              onDeleteCategory(selectedSummary.summary.summary_id);
                            }}
                            className="DeleteButton">
                            <img
                              src={DeleteButton}
                              alt="DeleteButton"
                              style={{
                                width: '3vw',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '10rem',
                              }}
                              draggable="false"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* 썸네일 */}
                    <img
                      src={selectedSummary.summary.youtube_thumbnail}
                      alt={`Thumbnail Icon`}
                      style={{
                        width: '74%',
                        margin: '2% 5% 3% 5%',
                        alignSelf: 'center',
                        borderRadius: '30px',
                      }}
                      draggable="false"
                    />

                    {/* 간단 요약본 */}
                    <pre
                      style={{
                        color: '#686868',
                        outline: 'none',
                        background: 'transparent',
                        width: '70%',
                        resize: 'none',
                        overflow: 'hidden',
                        fontSize: '1.2vw',
                        fontFamily: 'WantedSansRegular',
                        whiteSpace: 'pre-wrap',
                        textOverflow: 'ellipsis',
                        textAlign: 'left',
                        alignSelf: 'center',
                        marginBottom: '3%',
                      }}>
                      {selectedSummary.summary.content}
                    </pre>
                  </div>
                  <hr style={{ margin: ' auto', border: '0.2px solid #B0B0B0', width: '90%' }} />
                </div>
                {/* 세줄요약 이미지와 텍스트 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  {/* 구분선 */}
                  <hr style={{ margin: ' 0', border: '0.2px solid #B0B0B0', width: '90%' }} />
                </div>
              </div>
              {/* <시간대별요약> 텍스트 */}
              <p
                style={{
                  color: '#686868',
                  width: '20%',
                  marginLeft: '13%',
                  marginTop: '3%',
                  marginBottom: '1%',
                  fontFamily: 'WantedSansRegular',
                  fontSize: '30px',
                  // 추가적인 텍스트 스타일링이 필요하다면 여기에 추가하세요.
                }}>
                시간대별 요약
              </p>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {summary_by_times.map((item, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  {/* 썸네일 */}
                  <img
                    src={item.image_url}
                    alt={`Thumbnail Icon`}
                    style={{
                      width: '74%',
                      margin: '2% 5% 3% 5%',
                      alignSelf: 'center',
                      borderRadius: '30px',
                    }}
                    draggable="false"
                  />

                  {/* 시간버튼 */}
                  <button
                    onClick={() => handleTimeButtonClick(item.start_time)} //해당 유튜브 영상 그 시간으로 이동
                    style={{
                      backgroundColor: 'white', // 배경색
                      color: '#000000', // 글자색
                      padding: '5px 3px', // 여기서 padding 값을 조절하여 크기를 변경할 수 있습니다.
                      borderRadius: '0.5rem', // 테두리 모양
                      border: 'none', // 테두리 없음
                      cursor: 'pointer', // 마우스 오버 시 커서 모양
                      fontSize: '0.8rem', // 글자 크기
                      alignSelf: 'center',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과
                      transition: 'transform 0.2s', // 버튼 클릭 시 효과
                    }}>
                    {item.start_time}
                  </button>
                  {/* 시간대별 요약본 */}
                  <pre
                    style={{
                      color: '#686868',
                      outline: 'none',
                      background: 'transparent',
                      width: '70%',
                      resize: 'none',
                      overflow: 'hidden',
                      fontSize: '1.2vw',
                      fontFamily: 'WantedSansRegular',
                      whiteSpace: 'pre-wrap',
                      textOverflow: 'ellipsis',
                      textAlign: 'left',
                      alignSelf: 'center',
                      marginBottom: '3%',
                    }}>
                    {item.content
                      .split('-')
                      .map((sentence, index) => (index === 0 ? sentence : `\n-${sentence}`))
                      .join('')}
                  </pre>
                  {/* 구분선 */}
                  <hr
                    style={{
                      alignSelf: 'center',
                      margin: ' 0',
                      border: '0.1px solid #B0B0B0',
                      width: '90%',
                      marginBottom: '5%',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
