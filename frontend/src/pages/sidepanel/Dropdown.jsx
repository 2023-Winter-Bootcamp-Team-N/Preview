/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Dropdown.css';
import '@pages/sidepanel/SidePanel.css';

const Dropdown = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  //구독이 이미 돼있는지 자체 확인
  const [subscribedChannels, setSubscribedChannels] = useState(new Set());

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
    <ul
      style={{
        position: 'absolute',
        top: '30px', // 상단에서 30px 떨어진 위치
        right: '10px', // 오른쪽에서 10px 떨어진 위치
        width: '150px', // 너비 200px
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        backgroundColor: '#fff',
        boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}>
      <li className="dropdown-item" style={{ padding: '10px 20px' }} onClick={toggleSave}>
        요약본 저장하기
      </li>
      <li className="dropdown-item" style={{ padding: '10px 20px' }} onClick={copyText}>
        클립보드에 복사하기
      </li>
      <li
        className="dropdown-item"
        style={{ padding: '10px 20px' }}
        onClick={toggleSubscription}
        disabled={!isSubscribeButtonEnabled} // 질문 필요
      >
        현재채널 구독하기
      </li>
      <li className="dropdown-item" style={{ padding: '10px 20px' }} onClick={openNewTab}>
        요약본 저장소로 가기
      </li>
    </ul>
  );
};

export default Dropdown;
