/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import teamlogo from '@assets/img/logo.svg';
import transparencylogo from '@assets/img/transparencylogo.svg';
import '@pages/sidepanel/SidePanel.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
//import axios from 'axios';
import Dropdown from './Dropdown.jsx';
import './Dropdown.css';
import dropdownButton from '@assets/img/dropdownButton.svg';
import dropdownButtonDark from '@assets/img/dropdownButtonDark.svg';

const SidePanel = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [summary, setSummary] = useState('');

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
            {view && <Dropdown />}
          </ul>
        </div>
      </div>
      <hr className="stroke" />
      <div className="relative">
        <img
          src={transparencylogo}
          alt="transparencylogo"
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4 w-80 h-80 opacity-50"
        />
        <div className="overflow-y-auto max-h-96">
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
