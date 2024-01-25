import React, { useState, useEffect } from 'react';
import axios from 'axios';
import channelBg from '../../assets/img/channelBg.svg';
import YoutubeChannelProfilePlus from '../../assets/img/YoutubeChannelProfilePlus.svg';
import SubscribeText from '../../assets/img/SubscribeText.svg';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
const SubscribePage = ({ user_id, selectedChannel, setSelectedChannel , setChannelData , ChannelData, SearchChannel}) => {
  //const [selectedChannelName, setSelectedChannelName] = useState<string | null>(null); // 추가된 부분
  const [channels, setChannels] = useState([]);
  // 이미지 클릭 핸들러
  const handleImageClick = (channel: string) => {
    if (channel === selectedChannel) {
      setSelectedChannel(null);
      setChannelData([]);
    } else {
      setSelectedChannel(channel);
    }
  };
  const getSubscribeList = async () => {
    try {
      const url = `http://localhost:8000/api/v1/subscribe/list/`;
      const response = await axios.get(url, { params: { user_id: '1' } });
      return response.data;
    } catch (error) {
      console.error('Error fetching subscribe list:', error);
      throw error;
    }
  };
  // 구독 목록 받아오고 채널 배열 업데이트
  const loadAndDisplaySubscriptions = async () => {
    try {
      const response = await getSubscribeList();
      // subscribeList.subscribe_channels로 배열에 접근
      if (!Array.isArray(response.subscribe_channels)) {
        console.error('Expected an array for subscribe channels, but received:', response.subscribe_channels);
        return; // 함수 종료
      }
      const updatedChannels = response.subscribe_channels.map(sub => ({
        src: sub.channel_image_url || YoutubeChannelProfilePlus,
        alt: sub.subscribe_channel_name,
        id: sub.subscribe_channel_id, // 또는 적절한 ID 필드
      }));
      setChannels(updatedChannels);
    } catch (error) {
      console.error('Error in loadAndDisplaySubscriptions:', error);
    }
  };
  // 페이지 로드 시 구독 목록 받아오고 채널 배열 업데이트
  useEffect(() => {
    loadAndDisplaySubscriptions();
  }, []);
  const ChannelComponents = channels.map(channel => (
    <button key={channel.id} onClick={() => {handleImageClick(channel.alt); SearchChannel(channel.alt);}} className={`ChannelProfile`}>
      <img src={channel.src} alt={channel.alt} style={{ width: '130px', margin: '10px' }} />
    </button>
  ));
  return (
    <div>
      <div className={`main-content ${selectedChannel ? 'search-visible' : ''}`} style={{ position: 'relative' }}>
        <div className={`main-content`} style={{ position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <img src={SubscribeText} alt="SubscribeText" style={{ marginLeft: '1.5rem', width: '250px' }} />
              <div style={{ position: 'relative', width: '800px', height: '480px' }}>
                <img src={channelBg} alt="Channel Background" style={{ width: '100%', height: '100%' }} />
                <div style={{ position: 'absolute', top: '15%', left: '12%', width: '100%', justifyContent: 'center' }}>
                  <div>{ChannelComponents}</div>
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