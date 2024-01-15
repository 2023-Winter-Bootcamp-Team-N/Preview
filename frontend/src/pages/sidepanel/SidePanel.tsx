import React, { useState, useEffect } from 'react';
import save from '@assets/img/savebutton.svg';
import mypage from '@assets/img/mypagebutton.svg';
import copy from '@assets/img/copybutton.svg';
import teamlogo from '@assets/img/teamlogo.svg';
import saved from '@assets/img/savedbutton.svg';
import '@pages/sidepanel/SidePanel.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import axios from 'axios';

const SidePanel = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [websocket, setWebsocket] = useState(null);
  // 회원가입 및 로그인 폼 상태
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  // 회원가입 처리 함수
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/account/signin', {
        email: signupEmail,
        password: signupPassword,
      });
      console.log(response.data);
      // 회원가입 성공 처리
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  // 로그인 처리 함수
  const handleSignin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/account/login', {
        email: signinEmail,
        password: signinPassword,
      });
      console.log(response.data);
      // 로그인 성공 처리
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/preview/');

    ws.onopen = () => {
      console.log('웹소켓 연결 성공');
      sendUrlToBackend(currentUrl, ws);
    };

    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      console.log('메시지 수신:', message); // 메시지 수신 로그

      if (message.type === 'summary') {
        setSummary(message.data);
        console.log('요약본 수신:', message.data); // 요약본 수신 로그
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

  // URL 수신 로직
  useEffect(() => {
    const messageListener = message => {
      if (message.action === 'sendToSidePanel') {
        console.log('Received URL in SidePanel:', message.url);
        setCurrentUrl(message.url);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const copyText = () => {
    const text = document.querySelector('.side-panel p').textContent;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('텍스트가 복사 되었습니다.');
        alert('요약본이 복사되었습니다.');
      })
      .catch(err => console.error('텍스트 복사 실패: ', err));
  };

  // 요약본 저장 로직
  const toggleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      alert('요약본이 저장 되었습니다.');
    } else {
      alert('요약본 저장이 취소 되었습니다.');
    }
  };

  // 새 탭 열기 함수
  const openNewTab = () => {
    chrome.tabs.create({ url: 'chrome://newtab' });
  };

  return (
    <div className="rounded-lg bg-color p-4 space-y-4 border-none side-panel">
      {/* 상단 로고, 서비스명, 버튼 영역 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={teamlogo} alt="teamlogo" className="w-8 h-8" />
          <span className="font-semibold text-xl">요약 서비스</span>
        </div>
        <div className="flex -space-x-1">
          <button className="save-button p-2 rounded" onClick={toggleSave}>
            <img src={isSaved ? saved : save} alt={isSaved ? 'saved logo' : 'save logo'} className="w-5 h-5" />
          </button>
          <button className="mypage-button p-2 rounded" onClick={openNewTab}>
            <img src={mypage} alt="mypage logo" className="w-5 h-5" />
          </button>
          <button className="copy-button p-2 rounded" onClick={copyText}>
            <img src={copy} alt="copy logo" className="w-5 h-5" />
          </button>
        </div>
      </div>
      <hr className="stroke" />
      {/* 하단 텍스트 영역 */}
      <div>
        <p className="text-sm">{summary || '요약본을 기다리는 중...'}</p>
      </div>
      {/* 회원가입 폼 */}
      <div>
        <input type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} placeholder="이메일" />
        <input
          type="password"
          value={signupPassword}
          onChange={e => setSignupPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <button onClick={handleSignup}>회원가입</button>
      </div>

      {/* 로그인 폼 */}
      <div>
        <input type="email" value={signinEmail} onChange={e => setSigninEmail(e.target.value)} placeholder="이메일" />
        <input
          type="password"
          value={signinPassword}
          onChange={e => setSigninPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <button onClick={handleSignin}>로그인</button>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div>Loading...</div>), <div>Error Occur</div>);
