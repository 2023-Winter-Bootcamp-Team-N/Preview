import React, { useState, useEffect } from 'react';
import youtubeimage from '../../assets/img/youtubeimage.svg';

const Modal = ({ isOpen, closeModal }) => {
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <div
      className="modal-overlay"
      style={{
        zIndex: '1000',
        background: '#F5F5F7',
        top: '50%',
        left: '50%',
        margin: 'auto',
        overflow: 'auto',
        width: '60%', // 모달의 가로 크기
        height: '80%', // 모달의 세로 크기
        position: 'fixed', // 고정 위치로 설정
        transform: 'translate(-50%, -50%)', // 중앙 정렬을 위해 위치 조정
        padding: '0 1% 2% 2%',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // 그림자 효과 추가
        opacity: modalVisible ? '1' : '0', // 상태에 따른 투명도 설정
        transition: 'opacity 0.3s ease-in-out', // 트랜지션 적용
        borderRadius: '30px', // 둥근 테두리 설정
        display: 'flex', // Flex 컨테이너로 설정
        flexDirection: 'column', // 세로 방향으로 아이템 정렬
      }}>
      <button
        className="text-black px-4 py-0 modal-close"
        style={{
          alignSelf: 'flex-end', // 버튼을 오른쪽으로 정렬
          zIndex: '1001', // 모달보다 위에 위치하도록 설정
          width: '1.5rem', // 원하는 가로 크기
          fontSize: '1.2rem', // 원하는 텍스트 크기
          marginRight: '4%',
        }}
        onClick={closeModal}>
        X
      </button>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#506DBF',
            //borderRadius: '1%',
          }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* <세줄요약> 텍스트 */}
            <pre
              style={{
                color: 'white',
                backgroundColor: 'transparent',
                height: '5rem',
                width: '80%',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                fontSize: '1.4vw',
                fontFamily: 'notoSans',
                fontWeight: '700',
                lineHeight: 'normal',
                paddingLeft: '5%', // 왼쪽 패딩 추가\
                borderRadius: '5%',
                margin: '5% auto',
                overflow: 'hidden',
                outline: 'none',
              }}>
              ...간단 요약...
            </pre>
            {/* 세줄요약 이미지와 텍스트 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {/* 썸네일과 요약본을 한 행에 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* 썸네일 */}
                <img
                  src={youtubeimage}
                  alt={`Thumbnail Icon`}
                  style={{
                    width: '33%',
                    height: '15%',
                    marginLeft: '5%',
                    marginRight: '5%',
                    marginBottom: '5%',
                    alignSelf: 'center',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* 시간버튼과 요약본을 한 열에 */}

                  {/* 간단 요약본 */}
                  <pre
                    style={{
                      color: 'white',
                      outline: 'none',
                      background: 'transparent',
                      width: '70%',
                      resize: 'none',
                      overflow: 'hidden',
                      fontSize: '1.06vw',
                      marginRight: '2%',
                      fontFamily: 'notoSans',
                      whiteSpace: 'pre-wrap',
                      textOverflow: 'ellipsis',
                      textAlign: 'center',
                      alignSelf: 'center',
                      marginBottom: '5%',
                    }}>
                    - 자기 사운드가 고장났다고 생각하는 경우, 화면도 꺼진 상태라면 사고로 간주될 수 있음 - 온라인
                    강좌에서는 움직이는 그래픽 디자인을 심플하게 하는 것이 시선 집중에 유리함 - 디자인에 요소를 많이
                    넣는 것보다, 깔끔하고 심플한 디자인이 더 좋은 결과물을 얻을 수 있음 - 배경음악과 효과음은 영상의
                    분위기를 크게 바꿀 수 있으므로 중요한 역할을 함
                  </pre>
                  {/* 구분선 */}
                  <hr style={{ margin: ' 0', border: '0.2px solid #FFF', width: '90%' }} />
                </div>
              </div>
            </div>
            {/* <시간대별요약> 텍스트 */}
            <pre
              style={{
                color: 'white',
                backgroundColor: 'transparent',
                height: '5rem',
                width: '80%',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                fontSize: '1.4vw',
                fontFamily: 'notoSans',
                fontWeight: '700',
                lineHeight: 'normal',
                paddingLeft: '5%', // 왼쪽 패딩 추가\
                borderRadius: '5%',
                margin: '5% auto',
                overflow: 'hidden',
                outline: 'none',
              }}>
              ...시간대별 요약...
            </pre>
          </div>
          {[1, 2, 3, 4].map(index => (
            // 각 섹션들은 열 기준으로 나열
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {/* 썸네일과 요약본을 한 행에 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',

                      //justifyContent: 'space-between',
                    }}>
                    {/* 썸네일 */}
                    <img
                      src={youtubeimage}
                      alt={`Thumbnail Icon`}
                      style={{
                        width: '55%',
                        height: 'auto',
                        //marginLeft: '5%',
                        //marginRight: 'auto', // auto를 사용하여 오른쪽으로 최대한 밀어냄
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}
                    />
                    {/* 시간버튼 */}
                    <button
                      style={{
                        backgroundColor: 'white', // 배경색
                        color: '#506DBF', // 글자색
                        //padding: '13%,18%', // 안쪽 여백
                        padding: '5px 3px', // 여기서 padding 값을 조절하여 크기를 변경할 수 있습니다.

                        borderRadius: '0.5rem', // 테두리 모양
                        border: 'none', // 테두리 없음
                        cursor: 'pointer', // 마우스 오버 시 커서 모양
                        fontSize: '0.8rem', // 글자 크기
                        margin: '2%',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과
                        transition: 'transform 0.2s', // 버튼 클릭 시 효과
                      }}>
                      00:00
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* 시간대별 요약본 */}
                    <pre
                      style={{
                        color: 'white',
                        outline: 'none',
                        background: 'transparent',
                        width: '70%',
                        resize: 'none',
                        overflow: 'hidden',
                        fontSize: '1.06vw',
                        marginRight: '2%',
                        fontFamily: 'notoSans',
                        whiteSpace: 'pre-wrap',
                        textAlign: 'center',
                        alignSelf: 'center',
                        marginBottom: '5%',
                      }}>
                      - 자기 사운드가 고장났다고 생각하는 경우, 화면도 꺼진 상태라면 사고로 간주될 수 있음 - 온라인
                      강좌에서는 움직이는 그래픽 디자인을 심플하게 하는 것이 시선 집중에 유리함 - 디자인에 요소를 많이
                      넣는 것보다, 깔끔하고 심플한 디자인이 더 좋은 결과물을 얻을 수 있음 - 배경음악과 효과음은 영상의
                      분위기를 크게 바꿀 수 있으므로 중요한 역할을 함. - 자기 사운드가 고장났다고 생각하는 경우, 화면도
                      꺼진 상태라면 사고로 간주될 수 있음 - 온라인 강좌에서는 움직이는 그래픽 디자인을 심플하게 하는
                      것이 시선 집중에 유리함 - 디자인에 요소를 많이 넣는 것보다, 깔끔하고 심플한 디자인이 더 좋은
                      결과물을 얻을 수 있음 - 배경음악과 효과음은 영상의 분위기를 크게 바꿀 수 있으므로 중요한 역할을 함
                    </pre>

                    {/* 구분선 */}

                    <hr style={{ margin: ' 0', border: '0.1px solid #FFF', width: '90%', marginBottom: '5%' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;