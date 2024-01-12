import React, { useState , useEffect } from 'react';
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
import youtubeicon from '../../assets/img/youtubeicon.svg';
import PieChart from '../../assets/img/PieChart.svg';

import ChartComponent from './ChartComponent';
import SubscribePage from './SubscribePage';
import SummaryPage from './SummaryPage';
import PieChart from './PieChart';

import { relative } from 'path';
import axios from 'axios';


const Newtab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'main' | 'newPage' | 'SubPage'>('main');
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/summary/maincategory?user_id=1'); 
        const data = response.data; 
        setCategories(data); 
        console.log('카테고리 목록을 가져왔습니다:', data);
      } catch (error) {
        console.error('카테고리 목록을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchData(); 
  }, []);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  const handleCategoryChange = (category: string) => {
      if (category === selectedCategory) {
      setSelectedCategory(null);
      }
      else {
      setSelectedCategory(category);
      }
      };
  const switchToNewPage = () => {
        setCurrentPage('newPage');
      };
  const switchToMainPage = () => {
        setCurrentPage('main');
      };
  const switchToSubscribePage = () => {
        setCurrentPage('SubPage');
      };    

  const Boxstyle = {
    margin: '2px',
    width: '10vw',   
  };
  const Frame = [
    { src: health, alt:'health box' , id:health },
    { src: game, alt: 'Game box' , id:game },
    { src: economy, alt: 'economy box', id:economy },
    { src: science, alt: 'science box', id:science },
    { src: edu, alt: 'ede box', id:edu } ,
  ]
  const Frame2 = [
    { src: animal, alt: 'animal box', id:animal},
    { src: social, alt: 'social box' , id:social},
    { src: sport, alt: 'sport box' , id:sport},
    { src: travel, alt: 'travel box', id:travel},
    { src: enter, alt: 'enter box', id:enter},
  ]
  const Frame3 = [
    { src: art, alt: 'art box' , id:art},
    { src: cook, alt: 'cook box' , id:cook},
    { src: music, alt: 'music box', id:music},
    { src: smile, alt: 'smile box' , id:smile},
    { src: stc, alt: 'stc box' , id:stc},
  ]
  const FrameComponents = Frame.map((image) => (
    <button key={image.id} onClick={() => handleCategoryChange(image.id)} className="hover-effect" >
      <img src={image.src} alt={image.alt}  style={{ 
              position:'relative', //zIndex를 설정해도 position:static 면 작동하지 않는다!!!
              ...Boxstyle, // 기존 스타일을 가져옴
              transform: selectedCategory === image.id ? 'scale(1.2)' : 'scale(1)', // 선택된 카테고리에 대해 크기 확대
              zIndex: selectedCategory === image.id ? '2' : '-1',//호버가 풀리는 순간에 zIndex 값이 0이 되기 때문에 선택되지 않았을때 -1 값을 줘야 안겹치게 된다
              boxShadow: selectedCategory === image.id ? '0 0 20px' : 'none', // 선택된 카테고리에 대해 가장자리에 색깔 나타냄
            }} />
    </button>
  ));
  const FrameComponents2 = Frame2.map((image) => (
    <button key={image.id} onClick={() => handleCategoryChange(image.id)} className="hover-effect">
      <img src={image.src} alt={image.alt}  style={{
              ...Boxstyle, // 기존 스타일을 가져옴
              position:'relative', //zIndex를 설정해도 position:static 면 작동하지 않는다!!!
              transform: selectedCategory === image.id ? 'scale(1.2)' : 'scale(1)', // 선택된 카테고리에 대해 크기 확대
              zIndex: selectedCategory === image.id ? '2' : '-1' ,  //호버가 풀리는 순간에 zIndex 값이 0이 되기 때문에 선택되지 않았을때 -1 값을 줘야 안겹치게 된다
              boxShadow: selectedCategory === image.id ? '0 0 20px' : 'none', // 선택된 카테고리에 대해 가장자리에 색깔 나타냄
              
            }} />
    </button>
  ));
  const FrameComponents3 = Frame3.map((image) => (
    <button key={image.id} onClick={()=> handleCategoryChange(image.id)} className="hover-effect">
      <img key={image.id} src={image.src} alt={image.alt}  style={{
              ...Boxstyle, // 기존 스타일을 가져옴
              position:'relative',//zIndex를 설정해도 position:static 면 작동하지 않는다!!!
              transform: selectedCategory === image.id ? 'scale(1.2)' : 'scale(1)', // 선택된 카테고리에 대해 크기 확대
              zIndex: selectedCategory === image.id ? '2' : '-1',//호버가 풀리는 순간에 zIndex 값이 0이 되기 때문에 선택되지 않았을때 -1 값을 줘야 안겹치게 된다
              boxShadow: selectedCategory === image.id ? '0 0 20px' : 'none', // 선택된 카테고리에 대해 가장자리에 색깔 나타냄
            }}  />
    </button>
  ));
  return (
    <div className="main-container">
      {/*화면 이동 / 삼항연산*/}
      <div className={`main-content ${selectedCategory ? 'search-visible' : ''}`} style={{position : 'relative'}} >


      {currentPage === 'main' && (
          <div>
            <button onClick={switchToSubscribePage}>
              <img src={youtubeicon} alt="youtubeicon"
              style={{ position: 'absolute' ,
              width: '4%' ,
              height: '40px' ,
              top: '-1.5%' ,
              right: '4.5%'}} />
              </button>
          </div>
          )}




        {/*각 각 다른 함수의 3 개의 차트이미지 표시*/}
        {currentPage === 'main' && (
          <div>
            <button onClick={switchToNewPage}>
              <img src={chart} alt="chart box"
              style={{ position: 'absolute' ,
              width: '4%', // 부모요소 기준으로 모든 크기 맞추기
              height: '40px',
              top: '-2%' ,
              right: 0}} />
            </button>
          </div>)}
        {currentPage === 'newPage' && (
          <div>
            <button onClick={switchToMainPage}>
              <img src={category} alt="category box"
              style={{ position: 'absolute' ,
              width: selectedCategory ? '40px' : '50px', // 조건부로 크기 지정
              height: selectedCategory ? '40px' : '50px',
              top: selectedCategory ? 120 : -40 ,
              right: selectedCategory ? 30 : 0}} />
            </button>
          </div>)} 
        {currentPage === 'SubPage' && (
          <div>
            <button onClick={switchToMainPage}>
              <img src={category} alt="category box"
              style={{  
              width: selectedCategory ? '40px' : '50px', // 조건부로 크기 지정
              height: selectedCategory ? '40px' : '50px',
              top: selectedCategory ? 120 : -40 ,
              right: selectedCategory ? 30 : 0}} />
            </button>
          </div>)}  
        
          

        
        
        
        {/*전체 프레임 div*/}
        {currentPage === 'main' && (
            <div className="frame-container">
              <div style={{ display: 'flex', flexDirection: 'row' }}> {/*첫번째 프레임*/}
                {FrameComponents}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}> {/*두번째 프레임*/}
                {FrameComponents2}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}> {/*세번째 프레임*/}
                {FrameComponents3}
              </div>
            </div>
        )}

        {currentPage === 'newPage' && <ChartComponent/>}
        {currentPage === 'SubPage' && <SubscribePage />}

        {currentPage === 'main' && (
          <div> {/*팀 로고 표시*/}
            <img src={TeamN} alt="logo box" style={{ position: 'absolute' ,
            width: '10%', // 조건부로 크기 지정
            bottom: '-5.5%' ,
            right: 0}} />
            </div>)}
        {currentPage === 'newPage' && (
          <div> {/*팀 로고 표시*/}
            <img src={TeamN} alt="logo box" style={{ position: 'absolute' ,
            width: selectedCategory ? '80px' : '100px', // 조건부로 크기 지정
            height: selectedCategory ? '40px' : '50px',
            top: selectedCategory ? 570 : 640 ,
            right: selectedCategory ? 30 : 290}} />
            </div>)}
        {currentPage === 'SubPage' && (
          <div>
            <img src={TeamN} alt="logo box" style={{ position: 'absolute' ,
            width: '10%', // 조건부로 크기 지정
            bottom: '-5.5%' ,
            right: 0}} />
          </div>
        )}



      </div>








      <SummaryPage selectedCategory={selectedCategory} />
      <div className={`main-content ${selectedCategory ? 'search-visible' : ''}`}>
      </div>
    </div>
  );
};
export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
