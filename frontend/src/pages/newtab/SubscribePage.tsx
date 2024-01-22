import React, { useState, useEffect } from 'react';
import axios from 'axios';
import channelBg from '../../assets/img/channelBg.svg';
import test1 from '../../assets/img/test1.svg';
import test2 from '../../assets/img/test2.svg';
import test3 from '../../assets/img/test3.svg';
import test4 from '../../assets/img/test4.svg';
import test5 from '../../assets/img/test5.svg';
import { subscribe } from 'diagnostics_channel';
import SubscribeText from '../../assets/img/SubscribeText.svg';
import SummaryPage from './SummaryPage';

const SubscribePage = ({ user_id }) => {
  const [selectedChannel, setSelectedChannel] = useState(null);

  // 이미지 클릭 핸들러
  const handleImageClick = (channel) => {
    setSelectedChannel(channel);
  };




  const Channel1 = [
    { src: test1, alt: 'test1', id: test1, endpoint: '건강' },
    { src: test2, alt: 'test2', id: test2,  endpoint: '게임' },
    { src: test3, alt: 'test3', id: test3,  endpoint: '경제' },
    { src: test4, alt: 'test4', id: test4, endpoint: '과학' },
  ]
  const Channel2= [
    { src: test5, alt: 'test1', id: test1, endpoint: '건강' },
    { src: test4, alt: 'test2', id: test2,  endpoint: '게임' },
    { src: test2, alt: 'test3', id: test3,  endpoint: '경제' },
    { src: test1, alt: 'test4', id: test4, endpoint: '과학' },
  ]

  const ChannelComponents = Channel1.map(image => (
    <button
      key={image.id}
      onClick={() => handleImageClick(image.endpoint)}>
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          style={{margin:'8px' ,borderRadius:'150px' , width:'150px'
          }}
        />
    </button>
  ));

  const ChannelComponents2 = Channel2.map(image => (
    <button
      key={image.id}
      onClick={() => handleImageClick(image.endpoint)}>
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          style={{margin:'8px' , borderRadius:'150px' , width:'150px'
          }}
        />
    </button>
  ));


  console.log('Rendering ChartComponent');

  return (
    <div>
      <div className={`channel-content`} style={{ position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            {/* 제목 추가 */}
            <img src={SubscribeText} alt="SubscribeText" style={{ marginLeft: '1.5rem', width: '250px' }} />

            <div style={{ position: 'relative', width: '800px', height: '480px' }}>
              <img src={channelBg} alt="Channel Background" style={{ width: '100%', height: '100%' }} />
                <div>
                  <div style={{ position: 'absolute', top: '50%', transform: 'translate(0%, -50%)' , width:'100%'}}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {ChannelComponents}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {ChannelComponents2}
                      </div>
                  </div>  
                </div>      

              

              {/* 선택된 채널에 따라 SummaryPage 컴포넌트 렌더링 */}
              {selectedChannel && <SummaryPage selectedChannel={selectedChannel} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
