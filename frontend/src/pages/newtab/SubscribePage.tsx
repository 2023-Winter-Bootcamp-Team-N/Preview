import React, { useState, useEffect } from 'react';
import axios from 'axios';
import channelBg from '../../assets/img/channelBg.svg';
import YoutubeChannelProfile from '../../assets/img/YoutubeChannelProfile.svg';
import YoutubeChannelProfile2 from '../../assets/img/YoutubeChannelProfile2.svg';
import YoutubeChannelProfile3 from '../../assets/img/YoutubeChannelProfile3.svg';
import YoutubeChannelProfile4 from '../../assets/img/YoutubeChannelProfile4.svg';
import YoutubeChannelProfile5 from '../../assets/img/YoutubeChannelProfile5.svg';
import YoutubeChannelProfile6 from '../../assets/img/YoutubeChannelProfile6.svg';
import { subscribe } from 'diagnostics_channel';
import SubscribeText from '../../assets/img/SubscribeText.svg';

const SubscribePage = ({ user_id }) => {
  console.log('Rendering ChartComponent');

  return (
    //<div className={`main-content ${selectedCategory ? 'search-visible' : ''}`} style={{ position: 'relative' }}>
    <div className={`main-content`} style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          {/* 제목 추가 */}
          <img src={SubscribeText} alt="SubscribeText" style={{ marginLeft: '1.5rem', width: '250px' }} />

          <div style={{ position: 'relative', width: '800px', height: '480px' }}>
            <img src={channelBg} alt="Channel Background" style={{ width: '100%', height: '100%' }} />

            {/* 윗줄 이미지 */}
            <img
              src={YoutubeChannelProfile}
              alt="Youtube Channel Profile"
              style={{
                position: 'absolute',
                top: '130px',
                left: '140px',
                width: '100px',
                height: '100px',
                borderRadius: '30px',
              }}
            />
            <img
              src={YoutubeChannelProfile2}
              alt="Youtube Channel Profile"
              style={{
                position: 'absolute',
                top: '130px',
                left: '280px',
                width: '100px',
                height: '100px',
                borderRadius: '30px',
              }}
            />
            <img
              src={YoutubeChannelProfile3}
              alt="Youtube Channel Profile"
              style={{
                position: 'absolute',
                top: '130px',
                left: '420px',
                width: '100px',
                height: '100px',
                borderRadius: '30px',
              }}
            />
            <img
              src={YoutubeChannelProfile4}
              alt="Youtube Channel Profile"
              style={{
                position: 'absolute',
                top: '130px',
                left: '560px',
                width: '100px',
                height: '100px',
                borderRadius: '30px',
              }}
            />

            {/* 아랫줄 이미지 */}
            <img
              src={YoutubeChannelProfile5}
              alt="Youtube Channel Profile"
              style={{
                position: 'absolute',
                top: '250px',
                left: '140px',
                width: '100px',
                height: '100px',
                borderRadius: '30px',
              }}
            />
            <img
              src={YoutubeChannelProfile6}
              alt="Youtube Channel Profile"
              style={{
                position: 'absolute',
                top: '250px',
                left: '280px',
                width: '100px',
                height: '100px',
                borderRadius: '30px',
              }}
            />
            <img
              src={YoutubeChannelProfile2}
              alt="Youtube Channel Profile"
              style={{
                position: 'absolute',
                top: '250px',
                left: '420px',
                width: '100px',
                height: '100px',
                borderRadius: '30px',
              }}
            />
            <img
              src={YoutubeChannelProfile3}
              alt="Youtube Channel Profile"
              style={{
                position: 'absolute',
                top: '250px',
                left: '560px',
                width: '100px',
                height: '100px',
                borderRadius: '30px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
