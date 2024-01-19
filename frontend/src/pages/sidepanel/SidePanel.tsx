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
  // const [signupEmail, setSignupEmail] = useState('');
  // const [signupPassword, setSignupPassword] = useState('');
  // const [signinEmail, setSigninEmail] = useState('');
  // const [signinPassword, setSigninPassword] = useState('');
  // 요약본 저장을 위한 분류
  const [savedData, setSavedData] = useState({
    user_id: 1,
    youtube_url: '',
    content: '',
    category: '',
    summary_by_times: [],
  });
  //툴팁
  const [showSaveTooltip, setShowSaveTooltip] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [saveTooltipMessage, setSaveTooltipMessage] = useState('');

  // // 회원가입 처리 함수
  // const handleSignup = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:8000/api/account/signin', {
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

  const copyText = () => {
    const text = document.querySelector('.side-panel p').textContent;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('텍스트가 복사 되었습니다.');
      })
      .catch(err => console.error('텍스트 복사 실패: ', err));
    setShowCopyTooltip(true);
    setTimeout(() => setShowCopyTooltip(false), 3000);
  };

  // 요약본 저장 로직
  const toggleSave = async () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

    if (newSavedState) {
      setSaveTooltipMessage('요약본이 저장 되었습니다.');
    } else {
      setSaveTooltipMessage('요약본 저장이 취소 되었습니다.');
    }

    setShowSaveTooltip(true);
    setTimeout(() => setShowSaveTooltip(false), 3000);

    // 저장할 데이터 설정
    const savedData = {
      summary: {
        user_id: 1,
        youtube_url: currentUrl,
        content: summary,
      },
      category: '',
      summary_by_times: [],
    };

    // 서버에 저장 요청
    try {
      const response = await axios.post('http://localhost:8000/api/summary/', savedData);
      console.log('저장 요청 성공:', response.data);
    } catch (error) {
      console.error('저장 요청 실패:', error);
    }
  };

  // 새 탭 열기
  const openNewTab = () => {
    chrome.tabs.create({ url: 'chrome://newtab' });
  };

  const formatSummary = rawSummary => {
    if (!rawSummary) return 'PRE-VIEW가 요약할 동영상을 기다리는 중입니다...';

    const parts = rawSummary.split('*****');
    let timeSummaryPart = parts[0];
    let summaryPart = parts.length > 1 ? parts[1] : '';

    timeSummaryPart = timeSummaryPart.replace(/###(\d{2}:\d{2})/g, '\n#$1');

    summaryPart = summaryPart.replace(/모든 요약이 끝났습니다./, '').trim();

    return `[시간대별 요약]${timeSummaryPart}\n\n[간단요약]\n${summaryPart}`;
  };

  return (
    <div className="rounded-lg bg-color p-4 space-y-4 border-none side-panel">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={teamlogo} alt="teamlogo" className="w-8 h-8" />
          <span className="font-semibold text-xl">PRE-VIEW</span>
        </div>
        <div className="flex -space-x-1">
          <div className="tooltip">
            <button className="save-button p-2 rounded" onClick={toggleSave}>
              <img src={isSaved ? saved : save} alt={isSaved ? 'saved logo' : 'save logo'} className="w-5 h-5" />
              {showSaveTooltip && <span className="tooltiptext">{saveTooltipMessage}</span>}
            </button>
          </div>

          <button className="mypage-button p-2 rounded" onClick={openNewTab}>
            <img src={mypage} alt="mypage logo" className="w-5 h-5" />
          </button>
          <div className="tooltip">
            <button className="copy-button p-2 rounded" onClick={copyText}>
              <img src={copy} alt="copy logo" className="w-5 h-5" />
              {showCopyTooltip && <span className="tooltiptext">요약본이 복사 되었습니다.</span>}
            </button>
          </div>
        </div>
      </div>
      <hr className="stroke" />
      <div>
        <p className="text-sm summaryText">{formatSummary(summary)}</p>
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
      </div>
      <div>
        <input type="email" value={signinEmail} onChange={e => setSigninEmail(e.target.value)} placeholder="이메일" />
        <input
          type="password"
          value={signinPassword}
          onChange={e => setSigninPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <button onClick={handleSignin}>로그인</button>
      </div> */}
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div>Loading...</div>), <div>Error Occur</div>);
