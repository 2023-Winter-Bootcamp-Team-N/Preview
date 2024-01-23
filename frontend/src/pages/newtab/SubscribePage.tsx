import { useState } from 'react';
import channelBg from '../../assets/img/channelBg.svg';
import React, { useState, useEffect } from 'react';

import YoutubeChannelProfilePlus from '../../assets/img/YoutubeChannelProfilePlus.svg';
import SubscribeText from '../../assets/img/SubscribeText.svg';
import SubscribeModal from './SubscribeModal';

interface SubscribePageProps {
  user_id: any;
  selectedChannel: any;
  setSelectedChannel: React.Dispatch<React.SetStateAction<any>>;
  onChannelSubmit: (channelName: string) => void; // 추가된 prop 타입 정의
  channelNames: { [key: string]: string }; // channelNames 속성 추가
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
const SubscribePage: React.FC<SubscribePageProps> = ({
  user_id,
  selectedChannel,
  setSelectedChannel,
  onChannelSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channelNames, setChannelNames] = useState({}); // 새로운 상태 추가

  //채널의 상태 콘솔로그
  useEffect(() => {
    console.log('현재 channelNames 상태: ', channelNames);

    for (let i = 1; i <= 8; i++) {
      const channelKey = `Channel${i}`;
      if (channelNames[channelKey]) {
        console.log(`${channelKey}의 입력된 채널명: `, channelNames[channelKey]);
      }
    }
  }, [channelNames]);

  //selectedChannel 상태 변경 확인: selectedChannel 상태가 변경되었는지 확인
  useEffect(() => {
    console.log('Selected channel updated: ', selectedChannel);
  }, [selectedChannel]);

  const handleImageClick = channel => {
    console.log('Clicked channel: ', channel);
    if (channelNames[channel]) {
      console.log('Channel already saved, setting selectedChannel: ', channel);
      // 채널이 이미 저장된 경우, SummaryPage로 이동
      setSelectedChannel(channel);
      setIsModalOpen(false); // 모달창을 닫음
    } else {
      // 채널이 저장되지 않은 경우, 모달창을 열음
      setSelectedChannel(channel); // 현재 선택한 채널 상태 업데이트
      setIsModalOpen(true);
    }
  };

  const handleChannelSubmit = channelName => {
    console.log(`채널명 제출됨: ${channelName}, 선택된 채널: ${selectedChannel}`);
    setChannelNames(prev => {
      const updatedChannelNames = { ...prev, [selectedChannel]: channelName };
      console.log(`업데이트될 channelNames: `, updatedChannelNames);
      return updatedChannelNames;
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log('channelNames 상태 변경됨: ', channelNames);
  }, [channelNames]);
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

                {/* 윗줄 이미지 */}

                <button
                  onClick={() => handleImageClick('Channel1')}
                  style={{ position: 'absolute', top: '130px', left: '140px' }}>
                  <img
                    src={YoutubeChannelProfilePlus}
                    alt="Youtube Channel Profile1"
                    style={{ width: '100px', height: '100px', borderRadius: '30px' }}
                  />
                </button>

                {/* 두 번째 이미지 버튼 */}
                <button
                  onClick={() => handleImageClick('Channel2')}
                  style={{ position: 'absolute', top: '130px', left: '280px' }}>
                  <img
                    src={YoutubeChannelProfilePlus}
                    alt="Youtube Channel Profile 2"
                    style={{ width: '100px', height: '100px', borderRadius: '30px' }}
                  />
                </button>

                {/* 세 번째 이미지 버튼 */}
                <button
                  onClick={() => handleImageClick('Channel3')}
                  style={{ position: 'absolute', top: '130px', left: '420px' }}>
                  <img
                    src={YoutubeChannelProfilePlus}
                    alt="Youtube Channel Profile 3"
                    style={{ width: '100px', height: '100px', borderRadius: '30px' }}
                  />
                </button>

                {/* 네 번째 이미지 버튼 */}
                <button
                  onClick={() => handleImageClick('Channel4')}
                  style={{ position: 'absolute', top: '130px', left: '560px' }}>
                  <img
                    src={YoutubeChannelProfilePlus}
                    alt="Youtube Channel Profile 4"
                    style={{ width: '100px', height: '100px', borderRadius: '30px' }}
                  />
                </button>

                {/* 다섯 번째 이미지 버튼 */}
                <button
                  onClick={() => handleImageClick('Channel5')}
                  style={{ position: 'absolute', top: '250px', left: '140px' }}>
                  <img
                    src={YoutubeChannelProfilePlus}
                    alt="Youtube Channel Profile 5"
                    style={{ width: '100px', height: '100px', borderRadius: '30px' }}
                  />
                </button>

                {/* 여섯 번째 이미지 버튼 */}
                <button
                  onClick={() => handleImageClick('Channel6')}
                  style={{ position: 'absolute', top: '250px', left: '280px' }}>
                  <img
                    src={YoutubeChannelProfilePlus}
                    alt="Youtube Channel Profile 6"
                    style={{ width: '100px', height: '100px', borderRadius: '30px' }}
                  />
                </button>

                {/* 일곱 번째 이미지 버튼 */}
                <button
                  onClick={() => handleImageClick('Channel7')}
                  style={{ position: 'absolute', top: '250px', left: '420px' }}>
                  <img
                    src={YoutubeChannelProfilePlus}
                    alt="Youtube Channel Profile 7"
                    style={{ width: '100px', height: '100px', borderRadius: '30px' }}
                  />
                </button>

                {/* 여덟 번째 이미지 버튼 */}
                <button
                  onClick={() => handleImageClick('Channel8')}
                  style={{ position: 'absolute', top: '250px', left: '560px' }}>
                  <img
                    src={YoutubeChannelProfilePlus}
                    alt="Youtube Channel Profile 8"
                    style={{ width: '100px', height: '100px', borderRadius: '30px' }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubscribeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChannelSubmit={handleChannelSubmit}
      />
    </div>
  );
};

export default SubscribePage;
