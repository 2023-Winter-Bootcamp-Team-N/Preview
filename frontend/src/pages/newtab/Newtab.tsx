import React, { useState } from 'react';
import '@pages/newtab/Newtab.css';
import '../sidepanel/index.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import animal from '../../assets/img/animal.svg';
import art from '../../assets/img/art.svg';
import cook from '../../assets/img/cook.svg';
import economy from '../../assets/img/economy.svg';
import edu from '../../assets/img/edu.svg';
import enter from '../../assets/img/enter.svg';
import game from '../../assets/img/game.svg';
import health from '../../assets/img/health.svg';
import music from '../../assets/img/music.svg';
import science from '../../assets/img/science.svg';
import social from '../../assets/img/social.svg';
import sport from '../../assets/img/sport.svg';
import travel from '../../assets/img/travel.svg';
import smile from '../../assets/img/smile.svg';
import chart from '../../assets/img/chart.svg';
import TeamN from '../../assets/img/TeamN.svg';
import category from '../../assets/img/category.svg';
import youtubeicon from '../../assets/img/youtubeicon.svg';
import SubscribePage from './SubscribePage';
import ChartComponent from './ChartComponent';
import ChartComponent2 from './ChartComponent2';
import rightVector from '../../assets/img/rightVector.svg';
import leftVector from '../../assets/img/leftVector.svg';
import SummaryPage from './SummaryPage';
import All from '../../assets/img/All.svg';
import axios from 'axios';

const Newtab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'main' | 'newPage' | 'SubPage' | 'newPage2'>('main');
  const [summary, setSummary] = useState([]); // 요약페이지에 렌더링 되는 요약본 배열
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null); // 추가된 부분
  const [summaries, setSummaries] = useState([]); //검색으로 인해 보이는 요약본 배열
  const [keyword, setKeyword] = useState('');
  const [ChannelData , setChannelData]=useState([]);

  const [selectedChannel, setSelectedChannel] = useState(null); // 새로운 상태 추가

  const SearchCategory = async (category: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/search/category?user_id=1&category=${category}`);

      console.log('카테고리 불러오기 성공', response.data);
      console.log('현재 선택된 카테고리:', `${category}`);
      setSelectedCategoryName(category);
      setSummary(response.data.summaries);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSummary([]); // 빈 배열로 초기화 또는 다른 처리 수행
      }
    }
  };
  
  
  const SearchChannel = async (selectedChannel : string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/search/channel?user_id=1&channel=${selectedChannel}`);
      console.log('채널 불러오기 성공', response.data.summaries);
      setChannelData(response.data.summaries)
    } catch (error) {
      console.log('실패했습니다.')
      if (error.response && error.response.status === 400) {
        setChannelData([]); // 빈 배열로 초기화 또는 다른 처리 수행
      }
    }
  };






  const handleCloseButtonClick = () => {
    setSelectedCategory(null);
    setSelectedChannel(null);
  };

  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);
      setSummaries([]);
      setKeyword(''); //검색창을 닫으면 검색배열 초기화. 안하면 계속 남아있음
    } else {
      setSelectedCategory(category); // 다른창을 눌러도 검색배열 초기화하고 키워드 초기화함
      setSummaries([]);
      setKeyword('');
    }
  };

  const ConvertButton = () => {
    setSelectedCategory(null)
    setSummaries([]);
    setSummary([]);
  }

  const switchToNewPage = () => {
    setCurrentPage('newPage'); //차트1
    ConvertButton();
  };
  const switchToNewPage2 = () => {
    setCurrentPage('newPage2'); //차트2
    ConvertButton();
  };
  const switchToMainPage = () => {
    ConvertButton();
    setCurrentPage('main');
  };
  const switchToSubscribePage = () => {
    setCurrentPage('SubPage');
    ConvertButton();
  };
  const Boxstyle = {
    width: '10vw',
  };
  const Frame = [
    { src: health, alt: 'health box', id: health, endpoint: '건강' },
    { src: game, alt: 'Game box', id: game, endpoint: '게임' },
    { src: economy, alt: 'economy box', id: economy, endpoint: '경제' },
    { src: science, alt: 'science box', id: science, endpoint: '과학' },
    { src: edu, alt: 'ede box', id: edu, endpoint: '교육' },
  ];
  const Frame2 = [
    { src: animal, alt: 'animal box', id: animal, endpoint: '동물' },
    { src: social, alt: 'social box', id: social, endpoint: '사회' },
    { src: sport, alt: 'sport box', id: sport, endpoint: '스포츠' },
    { src: travel, alt: 'travel box', id: travel, endpoint: '여행' },
    { src: enter, alt: 'enter box', id: enter, endpoint: '연예' },
  ];
  const Frame3 = [
    { src: art, alt: 'art box', id: art, endpoint: '예술' },
    { src: cook, alt: 'cook box', id: cook, endpoint: '요리' },
    { src: music, alt: 'music box', id: music, endpoint: '음악' },
    { src: smile, alt: 'smile box', id: smile, endpoint: '코미디' },
    { src: All, alt: 'All box', id: All, endpoint: '전체' },
  ];

  const FrameComponents = Frame.map(image => (
    <button
      key={image.id}
      onClick={() => (handleCategoryChange(image.id), SearchCategory(image.endpoint))}
      className={`hover-effect ${selectedCategory === image.id ? 'active' : ''}`}>
      <img
        key={image.id}
        src={image.src}
        alt={image.alt}
        style={{
          ...Boxstyle,
          transform: selectedCategory === image.id ? 'scale(1.2)' : 'scale(1)',
          zIndex: selectedCategory === image.id ? '2' : '-1',
        }}
      />
    </button>
  ));

  const FrameComponents2 = Frame2.map(image => (
    <button
      key={image.id}
      onClick={() => (handleCategoryChange(image.id), SearchCategory(image.endpoint))}
      className={`hover-effect ${selectedCategory === image.id ? 'active' : ''}`}>
      <img
        key={image.id}
        src={image.src}
        alt={image.alt}
        style={{
          ...Boxstyle,
          transform: selectedCategory === image.id ? 'scale(1.2)' : 'scale(1)',
          zIndex: selectedCategory === image.id ? '2' : '-1',
        }}
      />
    </button>
  ));

  const FrameComponents3 = Frame3.map(image => (
    <button
      key={image.id}
      onClick={() => (handleCategoryChange(image.id), SearchCategory(image.endpoint))}
      className={`hover-effect ${selectedCategory === image.id ? 'active' : ''}`}>
      <img
        key={image.id}
        src={image.src}
        alt={image.alt}
        style={{
          ...Boxstyle,
          transform: selectedCategory === image.id ? 'scale(1.2)' : 'scale(1)',
          zIndex: selectedCategory === image.id ? '2' : '-1',
        }}
      />
    </button>
  ));
  return (
      <div className="main-container">
        {/*화면 이동 /메인/ 삼항연산*/}
        <div className={`main-content ${selectedCategory ? 'search-visible' : ''}`} style={{ position: 'relative' }}>
          {/*각 각 다른 함수의 3 개의 차트이미지 표시*/}
            {currentPage === 'main' && ( //상단 아이콘 깃발들 위치
              <div>
                <button onClick={switchToNewPage}>
                  <img
                    src={chart}
                    alt="chart box"
                    style={{
                      position: 'absolute',
                      width:'3vw' ,
                      top: '-5%',
                      right: '3%',
                    }}
                  />
                </button>
                <button onClick={switchToSubscribePage}>
                  <img
                    src={youtubeicon}
                    alt="youtubeicon"
                    style={{ position: 'absolute', width: '3vw', top: '-3%', right: '5vw' }}
                  />
                </button>
              </div>
            )}
            {['newPage', 'newPage2', 'SubPage'].includes(currentPage) && (
              <div>
                <button
                  onClick={switchToMainPage}
                  style={{
                    position: 'absolute',
                    width: '8vw', // 부모요소 기준으로 모든 크기 맞추기
                    height: '10vh',
                    top: 0,
                    right: '10vw',
                  }}>
                  <img
                    src={category}
                    alt="category box"
                    style={{
                      width: '100%',
                      height: '98%',
                    }}
                  />
                </button>
              </div>
            )}
          {currentPage === 'newPage' && (
            <div>
              <button onClick={switchToNewPage2}>
                <img
                  src={rightVector}
                  alt="rightVector"
                  style={{
                    position: 'absolute',
                    width: '80px', // 조건부로 크기 지정
                    height: '80px',
                    top: '250px',
                    right: '20px',
                  }}
                />
              </button>
            </div>
          )}
          {currentPage === 'newPage2' && (
            <div>
              {/* 막대그래프 바로가기 버튼 */}
              <button onClick={switchToNewPage}>
                <img
                  src={leftVector}
                  alt="leftVector"
                  style={{
                    position: 'absolute',
                    width: '80px', // 조건부로 크기 지정
                    height: '80px',
                    top: '250px',
                    left: '80px',
                  }}
                />
              </button>
            </div>
          )}


          {/*전체 프레임 div*/}
          {currentPage === 'main' && (
            <div className="frame-container">
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {' '}
                {/*첫번째 프레임*/}
                {FrameComponents}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {' '}
                {/*두번째 프레임*/}
                {FrameComponents2}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {' '}
                {/*세번째 프레임*/}
                {FrameComponents3}
              </div>
            </div>
          )}

          {currentPage === 'SubPage' && (
            <SubscribePage
              user_id={1}
              selectedChannel={selectedChannel}
              setSelectedChannel={setSelectedChannel}
              setChannelData={setChannelData}
              ChannelData={ChannelData}
              SearchChannel={SearchChannel}

       
    
            />
          )}
          {currentPage === 'newPage' && <ChartComponent user_id={1} />}
          {currentPage === 'newPage2' && <ChartComponent2 user_id={1} />}

          {currentPage === 'main' && (
            <div>
              {' '}
              {/*팀 로고 표시*/}
              <img
                src={TeamN}
                alt="logo box"
                style={{
                  position: 'absolute',
                  width: '35%', // 조건부로 크기 지정
                  top: '-20%',
                  left: '3%',
                }}
              />
            </div>
          )}
          {currentPage === 'newPage' && (
            <div>
              {' '}
              {/*팀 로고 표시*/}
              <img
                src={TeamN}
                alt="logo box"
                style={{
                  position: 'absolute',
                  width: selectedCategory ? '80px' : '100px', // 조건부로 크기 지정
                  height: selectedCategory ? '40px' : '50px',
                  top: 0,
                  right: 0,
                }}
              />
            </div>
          )}
          {currentPage === 'newPage2' && (
            <div>
              {' '}
              {/*팀 로고 표시*/}
              <img
                src={TeamN}
                alt="logo box"
                style={{
                  position: 'absolute',
                  width: selectedCategory ? '80px' : '100px', // 조건부로 크기 지정
                  height: selectedCategory ? '40px' : '50px',
                  top: 0,
                  right: 0,
                }}
              />
            </div>
          )}
          {currentPage === 'SubPage' && (
            <div>
              <img
                src={TeamN}
                alt="logo box"
                style={{
                  position: 'absolute',
                  width: '10%', // 조건부로 크기 지정
                  bottom: '-5.5%',
                  right: 0,
                }}
              />
            </div>
          )}
        </div>

        {selectedCategory || selectedChannel ? (
          <SummaryPage
            selectedCategory={selectedCategory}
            summary={summary}
            onCloseButtonClick={handleCloseButtonClick}
            category={selectedCategoryName || ''}
            //channel={selectedChannelName || ''}
            selectedChannel={selectedChannel}
            //channel={selectedChannel} // selectedChannel을 channel prop으로 전달
            setSummary={setSummary}
            summaries={summaries}
            setSummaries={setSummaries}
            keyword={keyword}
            setKeyword={setKeyword}
            setChannelData={setChannelData}
            ChannelData={ChannelData}
       
          />
        ) : null}
      </div>
      
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
