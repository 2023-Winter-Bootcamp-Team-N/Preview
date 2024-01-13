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
import stc from '../../assets/img/stc.svg';
import travel from '../../assets/img/travel.svg';
import smile from '../../assets/img/smile.svg';
import chart from '../../assets/img/chart.svg';
import TeamN from '../../assets/img/TeamN.svg';
import category from '../../assets/img/category.svg';
//import ChartComponent from './ChartComponent';
import SummaryPage from './SummaryPage';
import Modal from './Modal';
import sectionImage from '../../assets/img/sectionImage.svg';
import sectiondevider from '../../assets/img/sectiondevider.svg';

const Newtab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'main' | 'newPage'>('main');
  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };
  const switchToNewPage = () => {
    setCurrentPage('newPage');
  };
  const switchToMainPage = () => {
    setCurrentPage('main');
  };
  const Boxstyle = {
    margin: '2px',
    width: selectedCategory ? '130px' : '170px', // 조건부로 크기 지정
    height: selectedCategory ? '130px' : '170px', // 조건부로 크기 지정
  };
  const Frame = [
    { src: health, alt: 'health box', id: health },
    { src: game, alt: 'Game box', id: game },
    { src: economy, alt: 'economy box', id: economy },
    { src: science, alt: 'science box', id: science },
    { src: edu, alt: 'ede box', id: edu },
  ];
  const Frame2 = [
    { src: animal, alt: 'animal box', id: animal },
    { src: social, alt: 'social box', id: social },
    { src: sport, alt: 'sport box', id: sport },
    { src: travel, alt: 'travel box', id: travel },
    { src: enter, alt: 'enter box', id: enter },
  ];
  const Frame3 = [
    { src: art, alt: 'art box', id: art },
    { src: cook, alt: 'cook box', id: cook },
    { src: music, alt: 'music box', id: music },
    { src: smile, alt: 'smile box', id: smile },
    { src: stc, alt: 'stc box', id: stc },
  ];
  const FrameComponents = Frame.map(image => (
    <button key={image.id} onClick={() => handleCategoryChange(image.id)}>
      <img src={image.src} alt={image.alt} style={Boxstyle} />
    </button>
  ));
  const FrameComponents2 = Frame2.map(image => (
    <button key={image.id} onClick={() => handleCategoryChange(image.id)}>
      <img src={image.src} alt={image.alt} style={Boxstyle} />
    </button>
  ));
  const FrameComponents3 = Frame3.map(image => (
    <button key={image.id} onClick={() => handleCategoryChange(image.id)}>
      <img key={image.id} src={image.src} alt={image.alt} style={Boxstyle} />
    </button>
  ));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log('good');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#D9D9D9',
            borderRadius: '2%',
            marginBottom: '5%',
          }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* <세줄요약> 텍스트 */}
            <pre
              style={{
                backgroundColor: '#D9D9D9',
                height: '5rem',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                fontSize: '1.4vw',
                fontFamily: 'notoSans',
                fontWeight: '400',
                paddingLeft: '5%', // 왼쪽 패딩 추가\
                borderRadius: '5%',
              }}>
              ...세줄 요약...
            </pre>
            <img
              src={sectiondevider}
              alt={`LineIcon`}
              style={{ width: '90%', height: 'auto', margin: '0 auto 5% auto' }}
            />
            {/* 세줄요약 이미지와 텍스트 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {/* 썸네일과 요약본을 한 행에 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* 썸네일 */}
                <img
                  src={sectionImage}
                  alt={`Thumbnail Icon`}
                  style={{
                    width: '33%',
                    height: '15%',
                    marginLeft: '5%',
                    marginRight: '5%',
                    marginBottom: '5%',
                    alignSelf: 'center',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* 시간버튼과 요약본을 한 열에 */}
                  {/* 시간버튼 */}
                  <button></button>
                  {/* 시간대별 요약본 */}
                  <pre
                    style={{
                      color: 'black',
                      outline: 'none',
                      background: 'transparent',
                      width: '70%',
                      resize: 'none',
                      overflow: 'hidden',
                      fontSize: '1.06vw',
                      marginRight: '2%',
                      fontFamily: 'notoSans',
                      whiteSpace: 'pre-wrap',
                      textOverflow: 'ellipsis',
                      textAlign: 'center',
                      alignSelf: 'center',
                      marginBottom: '5%',
                    }}>
                    - 자기 사운드가 고장났다고 생각하는 경우, 화면도 꺼진 상태라면 사고로 간주될 수 있음 - 온라인
                    강좌에서는 움직이는 그래픽 디자인을 심플하게 하는 것이 시선 집중에 유리함 - 디자인에 요소를 많이
                    넣는 것보다, 깔끔하고 심플한 디자인이 더 좋은 결과물을 얻을 수 있음 - 배경음악과 효과음은 영상의
                    분위기를 크게 바꿀 수 있으므로 중요한 역할을 함
                  </pre>
                  {/* 구분선 */}
                  <img
                    src={sectiondevider}
                    alt={`LineIcon`}
                    style={{ width: '90%', height: 'auto', margin: '0 auto 0 auto' }}
                    //margin값은 수평가운데 정렬을 위함.
                  />
                </div>
              </div>
            </div>
            {/* <시간대별요약> 텍스트 */}
            <pre
              style={{
                backgroundColor: '#D9D9D9',
                height: '5rem',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                fontSize: '1.4vw',
                fontFamily: 'notoSans',
                fontWeight: '400',
                paddingLeft: '5%', // 왼쪽 패딩 추가\
                borderRadius: '5%',
              }}>
              ...시간대별 요약...
            </pre>
            <img
              src={sectiondevider}
              alt={`LineIcon`}
              style={{ width: '90%', height: 'auto', margin: '0 auto 5% auto' }}
            />
          </div>
          {[1, 2, 3, 4].map(index => (
            // 각 섹션들은 열 기준으로 나열
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {/* 썸네일과 요약본을 한 행에 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* 썸네일 */}
                  <img
                    src={sectionImage}
                    alt={`Thumbnail ${index} Icon`}
                    style={{
                      width: '33%',
                      height: '15%',
                      marginLeft: '5%',
                      marginRight: '5%',
                      marginBottom: '5%',
                      alignSelf: 'center',
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* 시간버튼과 요약본을 한 열에 */}
                    {/* 시간버튼 */}
                    <button></button>
                    {/* 시간대별 요약본 */}
                    <pre
                      style={{
                        color: 'black',
                        outline: 'none',
                        background: 'transparent',
                        width: '70%',
                        resize: 'none',
                        overflow: 'hidden',
                        fontSize: '1.06vw',
                        marginRight: '2%',
                        fontFamily: 'notoSans',
                        whiteSpace: 'pre-wrap',
                        textOverflow: 'ellipsis',
                        textAlign: 'center',
                        alignSelf: 'center',
                        marginBottom: '5%',
                      }}>
                      - 자기 사운드가 고장났다고 생각하는 경우, 화면도 꺼진 상태라면 사고로 간주될 수 있음 - 온라인
                      강좌에서는 움직이는 그래픽 디자인을 심플하게 하는 것이 시선 집중에 유리함 - 디자인에 요소를 많이
                      넣는 것보다, 깔끔하고 심플한 디자인이 더 좋은 결과물을 얻을 수 있음 - 배경음악과 효과음은 영상의
                      분위기를 크게 바꿀 수 있으므로 중요한 역할을 함
                    </pre>
                    {/* 구분선 */}
                    <img
                      src={sectiondevider}
                      alt={`LineIcon`}
                      style={{ width: '80%', height: 'auto', margin: '0 auto 5% auto' }}
                      //margin값은 수평가운데 정렬을 위함.
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <div
        className="main-container"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50vh' }}>
        {/*화면 이동 / 삼항연산*/}
        <div
          className={`main-content ${selectedCategory ? 'search-visible' : ''}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/*각 각 다른 함수의 두 개의 차트이미지 표시*/}
          {currentPage === 'main' && (
            <div>
              <button onClick={switchToNewPage}>
                <img
                  src={chart}
                  alt="chart box"
                  style={{
                    position: 'absolute',
                    width: selectedCategory ? '40px' : '50px', // 조건부로 크기 지정
                    height: selectedCategory ? '40px' : '50px',
                    top: selectedCategory ? 120 : 60,
                    right: selectedCategory ? 30 : 290,
                  }}
                />
              </button>
            </div>
          )}
          {currentPage === 'newPage' && (
            <div>
              <button onClick={switchToMainPage}>
                <img
                  src={category}
                  alt="category box"
                  style={{
                    position: 'absolute',
                    width: selectedCategory ? '40px' : '50px', // 조건부로 크기 지정
                    height: selectedCategory ? '40px' : '50px',
                    top: selectedCategory ? 120 : 60,
                    right: selectedCategory ? 30 : 290,
                  }}
                />
              </button>
            </div>
          )}
          {/*전체 프레임 div*/}
          {currentPage === 'main' && (
            <div
              className="frame-container"
              style={{
                marginTop: selectedCategory ? '150px' : '100px',
              }}>
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
          {/* {currentPage === 'newPage' && <ChartComponent />} */}
          {currentPage === 'main' && (
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
                  top: selectedCategory ? 570 : 640,
                  right: selectedCategory ? 30 : 290,
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
                  top: selectedCategory ? 570 : 640,
                  right: selectedCategory ? 30 : 290,
                }}
              />
            </div>
          )}
        </div>
        <SummaryPage selectedCategory={selectedCategory} openModalA={openModal} />
        <div className={`main-content ${selectedCategory ? 'search-visible' : ''}`}></div>
        {/* B 웹페이지의 모달을 열기 위한 버튼 */}
      </div>
    </div>
  );
};
export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
