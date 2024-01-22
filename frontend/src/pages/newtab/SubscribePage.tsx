import { useState } from 'react';
import channelBg from '../../assets/img/channelBg.svg';

import YoutubeChannelProfilePlus from '../../assets/img/YoutubeChannelProfilePlus.svg';
import SubscribeText from '../../assets/img/SubscribeText.svg';
import SubscribeModal from './SubscribeModal';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
const SubscribePage = ({ user_id, selectedChannel, setSelectedChannel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 이미지 클릭 핸들러
  const handleImageClick = channel => {
    setSelectedChannel(channel);
    setIsModalOpen(true);
  };
  const handleChannelSubmit = channelName => {
    console.log('Submitted Channel: ', channelName);
    // 필요한 로직 추가 (예: API 호출)
  };
  console.log('Rendering ChartComponent');

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
