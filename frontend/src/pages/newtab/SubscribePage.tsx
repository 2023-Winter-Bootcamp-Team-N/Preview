import { useState } from 'react';
import channelBg from '../../assets/img/channelBg.svg';

import YoutubeChannelProfilePlus from '../../assets/img/YoutubeChannelProfilePlus.svg';
import SubscribeText from '../../assets/img/SubscribeText.svg';
import SubscribeModal from './SubscribeModal';

interface SubscribePageProps {
  user_id: any;
  selectedChannel: any;
  setSelectedChannel: React.Dispatch<React.SetStateAction<any>>;
  onChannelSubmit: (channelName: string) => void; // 추가된 prop 타입 정의
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

  const handleImageClick = channel => {
    if (channelNames[channel]) {
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
    console.log('Submitted Channel: ', channelName);
    setChannelNames(prev => ({ ...prev, [selectedChannel]: channelName }));
    setSelectedChannel(channelName);
    setIsModalOpen(false);
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
