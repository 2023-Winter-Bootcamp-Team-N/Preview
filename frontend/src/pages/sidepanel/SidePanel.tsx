import React, { useState, useEffect } from 'react';
import save from '@assets/img/savebutton.svg';
import mypage from '@assets/img/mypagebutton.svg';
import copy from '@assets/img/copybutton.svg';
import teamlogo from '@assets/img/teamlogo.svg';
import saved from '@assets/img/savedbutton.svg';
import '@pages/sidepanel/SidePanel.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const SidePanel = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [setWebsocket] = useState(null);

  useEffect(() => {
    // 웹소켓 엔드포인트 설정
    const ws = new WebSocket('ws://localhost:8000/ws/preview/');
    setWebsocket(ws);

    ws.onopen = () => {
      console.log('웹소켓 연결 성공');
      // 웹소켓 연결 후 URL 전송
      sendUrlToBackend(currentUrl, ws);
    };
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.type === 'summary') {
        setSummary(message.data);
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
        <p className="text-sm">{summary || '텍스트를 기다리는 중...'}</p>
        <p className="text-sm">현재 URL: {currentUrl}</p>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div>Loading...</div>), <div>Error Occur</div>);
