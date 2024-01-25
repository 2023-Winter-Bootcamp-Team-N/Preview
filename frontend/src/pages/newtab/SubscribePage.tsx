import React, { useState, useEffect } from 'react';
import channelBg from '../../assets/img/channelBg.svg';
import axios from 'axios';
import YoutubeChannelProfilePlus from '../../assets/img/YoutubeChannelProfilePlus.svg';
import SubscribeText from '../../assets/img/SubscribeText.svg';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
const SubscribePage = ({ user_id, selectedChannel, setSelectedChannel }) => {
  // const [selectedChannelName, setSelectedChannelName] = useState<string | null>(null); // 추가된 부분
  // const [summary, setSummary] = useState([]); // 요약페이지에 렌더링 되는 요약본 배열
  // const [summaries, setSummaries] = useState([]); //검색으로 인해 보이는 요약본 배열

  const [, setSelectedChannelName] = useState<string | null>(null); // 추가된 부분
  const [, setSummary] = useState([]); // 요약페이지에 렌더링 되는 요약본 배열
  const [, setSummaries] = useState([]); //검색으로 인해 보이는 요약본 배열
  // 이미지 클릭 핸들러
  const handleImageClick = channel => {
    setSelectedChannel(channel);
  };

  const getSubscribeList = async () => {
    try {
      const url = `http://localhost:8000/api/v1/subscribe/list/`;

      const response = await axios.get(url, {
        params: {
          user_id: '1', // 백엔드에서 사용하는 쿼리 파라미터 이름과 일치시키기
        },
      });

      console.log('구독 목록 : ', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching subscribe list:', error);
      throw error;
    }
  };
  // 이미지 클릭 핸들러

  const handleChannelChange = (channel: string) => {
    if (channel === selectedChannel) {
      setSelectedChannel(channel);
      setSummaries([]);
    } else {
      setSelectedChannel(channel);
      setSummaries([]);
    }
  };
  // Channels 배열 업데이트
  const updateChannels = (Channels, subscribeList) => {
    // 첫 번째 채널부터 구독 목록의 데이터로 업데이트
    return Channels.map((channel, index) => {
      if (index < subscribeList.length) {
        return {
          ...channel,
          src: subscribeList[index].channel_image_url,
          alt: subscribeList[index].subscribe_channel_name,
        };
      }
      return channel;
    });
  };
  // 구독 목록 받아오고 채널 배열 업데이트
  const loadAndDisplaySubscriptions = async () => {
    try {
      const subscribeList = await getSubscribeList();
      const updatedChannels = updateChannels(Channels, subscribeList);
      console.log(updatedChannels); // 업데이트된 채널 배열 출력
    } catch (error) {
      console.error('Error in loadAndDisplaySubscriptions:', error);
    }
  };

  const SearchChannel = async (channel: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/search/channel?user_id=1&channel=${channel}`);

      console.log('채널 불러오기 성공', response.data);
      console.log('현재 선택된 채널:', `${channel}`);
      setSelectedChannelName(channel);
      setSummary(response.data.summaries);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSummary([]); // 빈 배열로 초기화 또는 다른 처리 수행
      }
    }
  };

  const Channels = [
    { src: YoutubeChannelProfilePlus, alt: 'profile1', id: 'Channel' },
    { src: YoutubeChannelProfilePlus, alt: 'profile2', id: 'Channel2' },
    { src: YoutubeChannelProfilePlus, alt: 'profile3', id: 'Channel3' },
    { src: YoutubeChannelProfilePlus, alt: 'profile4', id: 'Channel4' },
  ];
  const Channels2 = [
    { src: YoutubeChannelProfilePlus, alt: 'profile5', id: 'Channel5' },
    { src: YoutubeChannelProfilePlus, alt: 'profile6', id: 'Channel6' },
    { src: YoutubeChannelProfilePlus, alt: 'profile7', id: 'Channel7' },
    { src: YoutubeChannelProfilePlus, alt: 'profile8', id: 'Channel8' },
  ];
  // 페이지 로드 시 구독 목록 받아오고 채널 배열 업데이트
  useEffect(() => {
    loadAndDisplaySubscriptions();
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행되도록 함
  const ChannelsComponents = Channels.map(image => (
    <button
      key={image.id}
      onClick={() => (handleChannelChange(image.alt), handleImageClick(image.src))}
      //handleChannelChange(image.alt) : seleltedChannel 에 채널명을 저장
      className={`ChannelProfile`}>
      <img
        key={image.id}
        src={image.src}
        alt={image.alt}
        style={{
          width: '130px',
          margin: '10px',
        }}
      />
    </button>
  ));
  const ChannelsComponents2 = Channels2.map(image => (
    <button
      key={image.id}
      onClick={() => (handleChannelChange(image.alt), handleImageClick(image.src))}
      className={`ChannelProfile`}>
      <img
        key={image.id}
        src={image.src}
        alt={image.alt}
        style={{
          width: '130px',
          margin: '10px',
        }}
      />
    </button>
  ));
  async function fetchSubscribeList(userId) {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/chart/channel`, {
        params: {
          user_id: userId,
        },
      });

      if (response.status === 200) {
        // 구독 목록 데이터 처리
        console.log('구독 목록:', response.data);
        // 여기서 버튼 생성 또는 기타 UI 작업을 수행할 수 있습니다.
      } else {
        // 오류 처리
        console.error('구독 목록 조회 실패:', response);
      }
    } catch (error) {
      // 예외 처리
      console.error('API 요청 중 오류 발생:', error);
    }
  }

  //요약본 정보를 불러오는 API 요청을 수행하는 함수
  const getChannelSummaries = async selectedChannel => {
    const userID = '1'; // 고정된 userID
    try {
      const url = `http://localhost:8000/api/v1/summaries`; // API 엔드포인트
      const response = await axios.get(url, {
        params: {
          userID: userID,
          channelName: selectedChannel, // 선택된 채널명
        },
      });

      console.log('요약본 정보:', response.data);
      return response.data; // 요약본 정보 반환
    } catch (error) {
      console.error('Error fetching channel summaries:', error);
      throw error;
    }
  };
  return (
    <div>
      <div className={`main-content ${selectedChannel ? 'search-visible' : ''}`} style={{ position: 'relative' }}>
        <div className={`main-content`} style={{ position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              {/* 제목 추가 */}
              <img src={SubscribeText} alt="SubscribeText" style={{ marginLeft: '1.5rem', width: '250px' }} />

              <div style={{ position: 'relative', width: '800px', height: '480px' }}>
                <img src={channelBg} alt="Channel Background" style={{ width: '100%', height: '100%' }} />

                <div style={{ position: 'absolute', top: '15%', left: '12%', width: '100%', justifyContent: 'center' }}>
                  <div>{ChannelsComponents}</div>
                  <div>{ChannelsComponents2}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
