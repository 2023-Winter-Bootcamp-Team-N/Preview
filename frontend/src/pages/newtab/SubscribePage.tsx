import React, { useState, useEffect } from 'react';
import axios from 'axios';
import channelBg from '../../assets/img/channelBg.svg';

const SubscribePage = ({ user_id }) => {
  console.log('Rendering ChartComponent');

  return (
    //<div className={`main-content ${selectedCategory ? 'search-visible' : ''}`} style={{ position: 'relative' }}>
    <div className={`main-content' `} style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          {/* 제목 추가 */}
          <pre
            style={{
              textAlign: 'left',
              //marginBottom: '3px',
              fontFamily: 'WantedSansRegular',
              fontSize: '40px',
              fontWeight: '1000',
              color: '#607ABB',
            }}>
            구독
          </pre>{' '}
          <img
            src={channelBg}
            alt="chammelBg Square"
            style={{ marginRight: '1vw', width: '800px', height: '480px' }}></img>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
