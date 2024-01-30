/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import teamlogo from '@assets/img/logo.svg';
import transparencylogo from '@assets/img/transparencylogo.svg';
import '@pages/sidepanel/SidePanel.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import './Dropdown.css';
import './Modal.css';
import dropdownButton from '@assets/img/dropdownButton.svg';
import dropdownButtonDark from '@assets/img/dropdownButtonDark.svg';
import axios from 'axios';
import subscribebutton from '@assets/img/subscribebutton.svg';
import copybutton from '@assets/img/copybutton.svg';
import categorybutton from '@assets/img/categorybutton.svg';
import savebutton from '@assets/img/savebutton.svg';

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

const SidePanel = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  //구독이 이미 돼있는지 자체 확인
  const [subscribedChannels, setSubscribedChannels] = useState(new Set());

  // 회원가입 및 로그인 폼 상태
  // const [signupEmail, setSignupEmail] = useState('');
  // const [signupPassword, setSignupPassword] = useState('');
  // const [signinEmail, setSigninEmail] = useState('');
  // const [signinPassword, setSigninPassword] = useState('');
  // 요약본 저장을 위한 분류

  // 회원가입 처리 함수
  // const handleSignup = async () => {
  //   try {
  //     const response = await axios.post('https://pre-view.store/api/v1/account/signup', {
  //       email: signupEmail,
  //       password: signupPassword,
  //     });
  //     console.log(response.data);
  //     // 회원가입 성공 처리
  //   } catch (error) {
  //     console.error('회원가입 실패:', error);
  //   }
  // };

  // // 로그인 처리 함수
  // const handleSignin = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:8000/api/account/login', {
  //       email: signinEmail,
  //       password: signinPassword,
  //     });
  //     console.log(response.data);
  //     // 로그인 성공 처리
  //   } catch (error) {
  //     console.error('로그인 실패:', error);
  //   }
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const closeModal = () => setIsModalOpen(false);

  // 모달을 열기 위한 함수
  const openModal = message => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  //dropdown
  const [view, setView] = useState(false);

  //웹소켓
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/preview/');

    ws.onopen = () => {
      console.log('웹소켓 연결 성공');
      sendUrlToBackend(currentUrl, ws);
    };

    ws.onmessage = event => {
      const receivedData = JSON.parse(event.data);
      console.log('메시지 수신:', receivedData);

      // 메시지에 'message' 필드가 있을 때
      if (receivedData.message) {
        setSummary((prevSummary: string) => {
          const newSummary = prevSummary + receivedData.message;
          console.log('누적된 데이터:', newSummary);

          // 마지막 메시지 여부 확인
          if (receivedData.message === '모든 요약이 끝났습니다.') {
            console.log('전체 요약이 끝났습니다.');
          }

          return newSummary;
        });
      }
    };

    ws.onerror = error => {
      console.error('웹소켓 에러:', error);
    };

    ws.onclose = () => {
      console.log('웹소켓 연결 종료');
    };

    return () => {
      ws.close();
    };
  }, [currentUrl]);

  // URL 전송 로직
  const sendUrlToBackend = (url, websocket) => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify({ message: url }));
      console.log('URL 전송:', url); // URL 전송 로그
    }
  };

  useEffect(() => {
    const messageListener = message => {
      if (message.action === 'sendToSidePanel') {
        console.log('Received URL in SidePanel:', message.url);
        setCurrentUrl(message.url);
        setSummary(''); // 새로운 영상에 들어갔을 때 이전 요약본 초기화
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const formatSummary = rawSummary => {
    if (!rawSummary) return 'Preview가 요약할 동영상을 기다리는 중입니다...';

    const parts = rawSummary.split('*****');
    let timeSummaryPart = parts[0];
    let summaryPart = parts.length > 1 ? parts[1] : '';

    timeSummaryPart = timeSummaryPart.replace(/###(\d{2}:\d{2})/g, '\n#$1');

    summaryPart = summaryPart.replace(/모든 요약이 끝났습니다./, '').trim();

    return `[시간대별 요약]${timeSummaryPart}\n\n[간단 요약]\n${summaryPart}`;
  };

  // '*****' 구분으로 요약 정보 분리
  const summaryParts = summary.split('*****');
  const summaryByTimesText = summaryParts[0].trim();
  const summaryContent = summaryParts.length > 1 ? summaryParts[1].trim() : '';
  const category = summaryParts.length > 2 ? summaryParts[2].trim() : '';

  //...저장기능...//
  const toggleSave = async () => {
    // 이미 저장된 상태가 아닐 때만 저장 로직 실행
    if (!isSaved) {
      setIsSaved(true); // 저장 상태로 변경

      // 시간 정보와 내용을 올바르게 분리하여 "summary_by_times"를 배열로 변환
      const timeSummaries = [];
      let contentBuffer = '';
      let currentTime = '';
      const lines = summaryByTimesText.split('\n');
      lines.forEach(line => {
        const timeMatch = line.match(/(\d{2}:\d{2})/);
        if (timeMatch) {
          if (currentTime !== '') {
            timeSummaries.push({ start_time: currentTime, content: contentBuffer.trim() });
          }
          currentTime = timeMatch[0];
          contentBuffer = line.substring(line.indexOf(timeMatch[0]) + 5);
        } else {
          contentBuffer += ' ' + line;
        }
      });
      if (currentTime !== '') {
        timeSummaries.push({ start_time: currentTime, content: contentBuffer.trim() });
      }

      // 저장할 데이터 설정
      const savedData = {
        summary: {
          user_id: 1,
          youtube_url: currentUrl,
          content: summaryContent,
        },
        category: category,
        summary_by_times: timeSummaries,
      };

      // 서버에 저장 요청
      try {
        const response = await axios.post('http://localhost:8000/api/v1/summary/', savedData);
        console.log('저장 요청 성공:', response.data);
        // 저장 성공 메시지를 모달로 표시
        openModal('요약본이 저장되었습니다.');
      } catch (error) {
        console.error('저장 요청 실패:', error);
      }
    }
  };

  //...복사기능...//////////////////////////////////////////////////////////////////////
  const copyText = () => {
    const text = document.querySelector('.side-panel p').textContent;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('텍스트가 복사 되었습니다.');
        openModal('클립보드에 요약본이 복사되었습니다.');
      })
      .catch(err => console.error('텍스트 복사 실패: ', err));
  };

  useEffect(() => {
    setIsSaved(false);
  }, [currentUrl]);

  useEffect(() => {
    setIsSubscribed(subscribedChannels.has(currentUrl));
  }, [currentUrl, subscribedChannels]);

  const isSubscribeButtonEnabled = currentUrl.includes('@');

  //...구독기능...//////////////////////////////////////////////////////////////////////
  const toggleSubscription = async () => {
    if (!isSubscribed) {
      try {
        await axios.post('http://localhost:8000/api/v1/subscribe/', {
          user_id: 1,
          channel_url: currentUrl,
        });
        console.log('구독에 성공했습니다.');
        setSubscribedChannels(prev => new Set(prev.add(currentUrl)));
        setIsSubscribed(true);
        openModal('구독이 완료되었습니다.');

        console.log(subscribedChannels);
      } catch (error) {
        console.error('구독 처리 실패:', error);
      }
    }
    // Removed the logic to handle unsubscription
  };

  //...새탭열기...//////////////////////////////////////////////////////////////////////
  const openNewTab = () => {
    chrome.tabs.create({ url: 'chrome://newtab' });
  };

  return (
    <div className="rounded-lg bg-color p-4 space-y-4 border-none side-panel">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={teamlogo} alt="teamlogo" className="w-8 h-8" />
          <span className="font-semibold text-xl">Preview</span>
        </div>
        <div style={{ position: 'relative' }}>
          <ul
            style={{ cursor: 'pointer' }} // 여기에 커서 스타일을 추가
            onClick={() => {
              setView(!view);
            }}>
            <img src={view ? dropdownButtonDark : dropdownButton} alt="Dropdown Button" />
            {view && (
              <div>
                {' '}
                <ul
                  style={{
                    position: 'absolute',
                    top: '30px', // 상단에서 30px 떨어진 위치
                    right: '10px', // 오른쪽에서 10px 떨어진 위치
                    width: '180px', // 너비 200px
                    listStyleType: 'none',
                    margin: 0,
                    padding: 0,
                    backgroundColor: '#fff',
                    boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                    zIndex: 1000,
                  }}>
                  <li
                    className="dropdown-item"
                    style={{
                      display: 'flex', // Flexbox 레이아웃 적용
                      alignItems: 'center', // 아이템들을 수직 중앙에 정렬
                      padding: '10px 20px',
                    }}
                    onClick={toggleSave}>
                    <img src={savebutton} alt="Save" style={{ marginLeft: '3px', marginRight: '15px' }} />
                    요약본 저장하기
                  </li>
                  <li
                    className="dropdown-item"
                    style={{
                      display: 'flex', // Flexbox 레이아웃 적용
                      alignItems: 'center', // 아이템들을 수직 중앙에 정렬
                      padding: '10px 20px',
                    }}
                    onClick={copyText}>
                    <img src={copybutton} alt="copybutton" style={{ marginRight: '12px' }} />
                    클립보드에 복사하기
                  </li>
                  <li
                    className={`dropdown-item ${!isSubscribeButtonEnabled ? 'disabled' : ''}`}
                    style={{
                      display: 'flex', // Flexbox 레이아웃 적용
                      alignItems: 'flex-start', // 아이템들을 수직 중앙에 정렬
                      padding: '10px 20px',
                      justifyContent: 'flex-start',
                    }}>
                    <button
                      onClick={toggleSubscription}
                      disabled={!isSubscribeButtonEnabled}
                      style={{
                        display: 'flex', // Flexbox 레이아웃 적용
                        alignItems: 'flex-start', // 아이템들을 수직 중앙에 정렬
                        justifyContent: 'flex-start',
                        //all: 'unset', // 기본 버튼 스타일 제거
                        cursor: 'pointer', // 커서 스타일 추가
                        //width: '100%', // 전체 너비 사용
                        textAlign: 'left', // 텍스트 왼쪽 정렬
                      }}>
                      <img
                        src={subscribebutton}
                        alt="subscribebutton"
                        style={{ marginTop: '1px', marginRight: '10px' }}
                      />
                      현재채널 구독하기
                    </button>
                  </li>
                  <li
                    className="dropdown-item"
                    style={{ padding: '10px 20px 12px 20px', display: 'flex', alignItems: 'center' }}
                    onClick={openNewTab}>
                    <img src={categorybutton} alt="categorybutton" style={{ marginLeft: '2px', marginRight: '9px' }} />
                    메인 페이지로 가기
                  </li>
                </ul>
              </div>
            )}
          </ul>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
      </div>
      <hr className="stroke" />
      <div className="relative">
        <img
          src={transparencylogo}
          alt="transparencylogo"
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4 w-80 h-80 opacity-50"
        />
        <div className="overflow-y-auto max-h-full">
          <p className="text-sm summaryText z-10">{formatSummary(summary)}</p>
        </div>
        {/* <div>
          <input type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} placeholder="이메일" />
          <input
            type="password"
            value={signupPassword}
            onChange={e => setSignupPassword(e.target.value)}
            placeholder="비밀번호"
          />
          <button onClick={handleSignup}>회원가입</button>
        </div> */}
        {/* <div>
        <input type="email" value={signinEmail} onChange={e => setSigninEmail(e.target.value)} placeholder="이메일" />
        <input
          type="password"
          value={signinPassword}
          onChange={e => setSigninPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <button onClick={handleSignin}>로그인</button>
      </div>  */}
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div>Loading...</div>), <div>Error Occur</div>);
