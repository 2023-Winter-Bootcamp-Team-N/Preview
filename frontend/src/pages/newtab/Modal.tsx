import React, { useState } from 'react';
import sectionImage from '../../assets/img/sectionImage.svg';
import sectiondevider from '../../assets/img/sectiondevider.svg';

const Modal = ({ isOpen, closeModal }) => {
  return isOpen ? (
    <div className="modal">
      {/* 모달 내용 */}
      <div className="modal-content">
        {/* 모달 닫기 버튼 */}
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {/* 모달 내용 */}
        {/* ... (기존 내용 유지) ... */}
        {/* 모달 내용 */}
        <div className="modal-content">
          {/* 모달 닫기 버튼 */}
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          {/* 모달 내용 */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {/* <시간대별요약> 텍스트 */}
              <pre
                style={{
                  backgroundColor: '#D9D9D9',
                  height: '5rem',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  fontSize: '1.4vw',
                  fontFamily: 'notoSans',
                  fontWeight: '400',
                  paddingLeft: '5%', // 왼쪽 패딩 추가\
                  borderRadius: '5%',
                }}>
                ...시간대별 요약...
              </pre>
              <img src={sectiondevider} alt={`Line`} style={{ width: '90%', height: 'auto', margin: '0 5% 0 5%' }} />
            </div>
            {[1, 2, 3, 4].map(index => (
              // 각 섹션들은 열 기준으로 나열
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  {/* 썸네일과 요약본을 한 행에 */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {/* 썸네일 */}
                    <img
                      src={sectionImage}
                      alt={`Thumbnail ${index} Icon`}
                      style={{
                        width: '33%',
                        height: '15%',
                        marginLeft: '5%',
                        marginRight: '5%',
                        alignSelf: 'center',
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {/* 시간버튼과 요약본을 한 열에 */}
                      {/* 시간버튼 */}
                      <button></button>
                      {/* 요약본 */}
                      <pre
                        style={{
                          color: 'black',
                          alignSelf: 'flex-start', // 수정된 부분

                          outline: 'none',
                          background: 'transparent',
                          width: '85%',
                          resize: 'none',
                          overflow: 'hidden',
                          fontSize: '1.06vw',
                          margin: '2% 5% 2% 0',
                          marginRight: '2%',
                          fontFamily: 'notoSans',
                          whiteSpace: 'pre-wrap',
                          textOverflow: 'ellipsis',
                        }}>
                        - 자기 사운드가 고장났다고 생각하는 경우, 화면도 꺼진 상태라면 사고로 간주될 수 있음 - 온라인
                        강좌에서는 움직이는 그래픽 디자인을 심플하게 하는 것이 시선 집중에 유리함 - 디자인에 요소를 많이
                        넣는 것보다, 깔끔하고 심플한 디자인이 더 좋은 결과물을 얻을 수 있음 - 배경음악과 효과음은 영상의
                        분위기를 크게 바꿀 수 있으므로 중요한 역할을 함
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}{' '}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
