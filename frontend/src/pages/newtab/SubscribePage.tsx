/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import channelBg from '../../assets/img/channelBg.svg';
import channelBox from '../../assets/img/channelBox.svg';
import SubscribeText from '../../assets/img/SubscribeText.svg';
import TeamN from '../../assets/img/TeamN.svg';
import '@pages/newtab/SubscribePage.css';



const SkeletonStyle = {
  width: '130px' ,
  borderRadius:'100%' ,
  backgroundColor:'#f5f5f5' , 
  margin:'10px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
}


const SkeletonLoading = () => (

  <div>
  <div style={{ display: 'flex'  , width:'80%'}}>
    {/* 디자인에 맞게 스타일 조정 */}
    <div className="skeleton-loader" style={{ ...SkeletonStyle }}></div>
    <div className="skeleton-loader" style={{ ...SkeletonStyle }}></div>
    <div className="skeleton-loader" style={{ ...SkeletonStyle }}></div>
    <div className="skeleton-loader" style={{ ...SkeletonStyle }}></div> 
  </div>

  <div style={{ display: 'flex'  , width:'80%'}}>
{/* 디자인에 맞게 스타일 조정 */}
      <div className="skeleton-loader" style={{ ...SkeletonStyle }}></div>
      <div className="skeleton-loader" style={{ ...SkeletonStyle }}></div>
      <div className="skeleton-loader" style={{ ...SkeletonStyle }}></div>
      <div className="skeleton-loader" style={{ ...SkeletonStyle }}></div> 
    </div>
  </div>   
  
  
);



const SubscribePage = ({
  selectedChannel,
  setSelectedChannel,
  setChannelData,
  SearchChannel,
  switchMainpage
}) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.error('Subscribe 목록을 가져오는 동안 오류 발생:', error);
      throw error;
    }
  };

  const loadAndDisplaySubscriptions = async () => {
    try {
      const response = await getSubscribeList();
      if (!Array.isArray(response.subscribe_channels)) {
        console.error('Subscribe 채널에 대한 배열이 예상대로 제공되지 않았습니다:', response.subscribe_channels);
        return;
      }

      const updatedChannels = response.subscribe_channels.map(sub => ({
        src: sub.channel_image_url || channelBox,
        alt: sub.subscribe_channel_name,
        id: sub.subscribe_channel_id,
      }));

      setChannels(updatedChannels);
      setLoading(false); // 채널이 로드되면 로딩 상태를 false로 설정
    } catch (error) {
      console.error('loadAndDisplaySubscriptions에서 오류 발생:', error);
      setLoading(false); // 오류 발생 시 로딩 상태를 false로 설정
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
              <img src={SubscribeText} alt="SubscribeText" style={{ width: '50px', margin: '0 auto' }} />
            </div>
            <div style={{ position: 'relative', width: '800px', height: '480px' }}>
              <img src={channelBg} alt="Channel Background" style={{ width: '100%', height: '100%' }} />
              <div style={{ position: 'absolute', top: '15%', left: '12%', width: '100%', justifyContent: 'center' }}>
                
                {loading ? <SkeletonLoading /> : dividedChannels.map((row, index) => (
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
              width: '45%',
              top: '-3%',
              left: selectedChannel ? '0%' : '-17%',
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default SubscribePage;