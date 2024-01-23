import { useState } from 'react';
import channelBg from '../../assets/img/channelBg.svg';

import YoutubeChannelProfilePlus from '../../assets/img/YoutubeChannelProfilePlus.svg';
import SubscribeText from '../../assets/img/SubscribeText.svg';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
const SubscribePage = ({ user_id, selectedChannel, setSelectedChannel }) => {
  // 이미지 클릭 핸들러
  const handleImageClick = channel => {
    setSelectedChannel(channel);
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
    <button key={image.id} onClick={() => handleImageClick(image.id)} className={`ChannelProfile`}>
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
    <button key={image.id} onClick={() => handleImageClick(image.id)} className={`ChannelProfile`}>
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
