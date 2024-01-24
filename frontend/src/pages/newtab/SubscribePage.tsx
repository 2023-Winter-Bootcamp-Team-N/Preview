import React, { useState } from 'react';
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

  const SearchChannel = async (channel: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/search/channel?user_id=1&channel=${channel}`);

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
  const ChannelsComponents = Channels.map(image => (
    <button
      key={image.id}
      onClick={() => (handleChannelChange(image.id), SearchChannel('채널이름'))}
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
      onClick={() => (handleChannelChange(image.id), SearchChannel('채널이름'))}
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
