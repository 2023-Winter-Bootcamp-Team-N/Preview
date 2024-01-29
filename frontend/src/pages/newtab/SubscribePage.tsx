import React, { useState, useEffect } from 'react';
import axios from 'axios';
import channelBg from '../../assets/img/channelBg.svg';
import channelBox from '../../assets/img/channelBox.svg';
import SubscribeText from '../../assets/img/SubscribeText.svg';
import TeamN from '../../assets/img/TeamN.svg';

const SubscribePage = ({
  user_id,
  selectedChannel,
  setSelectedChannel,
  setChannelData,
  ChannelData,
  SearchChannel,
  switchMainpage,
}) => {
  const [channels, setChannels] = useState([]);

  const handleImageClick = channel => {
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

  const loadAndDisplaySubscriptions = async () => {
    try {
      const response = await getSubscribeList();
      if (!Array.isArray(response.subscribe_channels)) {
        console.error('Expected an array for subscribe channels, but received:', response.subscribe_channels);
        return;
      }

      const updatedChannels = response.subscribe_channels.map(sub => ({
        src: sub.channel_image_url || channelBox,
        alt: sub.subscribe_channel_name,
        id: sub.subscribe_channel_id,
      }));

      setChannels(updatedChannels);
    } catch (error) {
      console.error('Error in loadAndDisplaySubscriptions:', error);
    }
  };

  useEffect(() => {
    loadAndDisplaySubscriptions();
  }, []);

  const ChannelComponents = channels.map(channel => (
    <button
      key={channel.id}
      onClick={() => {
        handleImageClick(channel.alt);
        SearchChannel(channel.alt);
      }}
      className={`ChannelProfileWithShadow`}>
      <img
        src={channel.src}
        alt={channel.alt}
        style={{
          width: '130px',
          margin: '10px',
          borderRadius: '100px',
          boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
        }}
        draggable="false"
      />
    </button>
  ));

  const dividedChannels = Array.from({ length: Math.ceil(ChannelComponents.length / 4) }, (v, i) =>
    ChannelComponents.slice(i * 4, i * 4 + 4),
  );

  return (
    <div>
      <div className={`main-content ${selectedChannel ? 'search-visible' : ''}`} style={{ position: 'relative' }}>
        <div className={`main-content`} style={{ position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
              {' '}
              {/* Center the subscribeText */}
              <img
                src={SubscribeText}
                alt="SubscribeText"
                style={{ width: '50px', margin: '0 auto' }}
                draggable="false"
              />
            </div>
            <div style={{ position: 'relative', width: '800px', height: '480px' }}>
              <img
                src={channelBg}
                alt="Channel Background"
                style={{ width: '100%', height: '100%' }}
                draggable="false"
              />
              <div style={{ position: 'absolute', top: '15%', left: '12%', width: '100%', justifyContent: 'center' }}>
                {dividedChannels.map((row, index) => (
                  <div key={index}>{row}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button onClick={switchMainpage}>
          <img
            src={TeamN}
            alt="logo box"
            style={{
              position: 'absolute',
              width: '35%', // 조건부로 크기 지정
              top: '-2.5%',
              left: selectedChannel ? '0%' : '-20%',
            }}
            draggable="false"
          />
        </button>
      </div>
    </div>
  );
};

export default SubscribePage;
