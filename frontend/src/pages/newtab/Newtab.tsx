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
import SubscribePage from './SubscribePage';
import SummaryPage from './SummaryPage';

import { relative } from 'path';
import axios from 'axios';

import game2 from '../../assets/img/Convert/game2.svg';
import economy2 from '../../assets/img/Convert/economy2.svg';
import edu2 from '../../assets/img/Convert/edu2.svg';
import health2 from '../../assets/img/Convert/health2.svg';
import science2 from '../../assets/img/Convert/science2.svg';
import animal2 from '../../assets/img/Convert/animal2.svg';
import social2 from '../../assets/img/Convert/social2.svg';
import sport2 from '../../assets/img/Convert/sport2.svg';
import travel2 from '../../assets//img/Convert/travel2.svg';
import enter2 from '../../assets/img/Convert/enter2.svg';
import art2 from '../../assets/img/Convert/art2.svg';
import cook2 from '../../assets/img/Convert/cook2.svg';
import smile2 from '../../assets/img/Convert/smile2.svg';
import music2 from '../../assets/img/Convert/music2.svg';







const Newtab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'main' | 'newPage' | 'SubPage'>('main');

  
  
  
  const [categories, setCategories] = useState<string[]>([]);
  
 /* useEffect(() => {
    
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
  }, []);*/
  
  
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
    width: '10vw',   
  };
  const Frame = [
    { src: health, alt:'health box' , id:health , convert:health2 },
    { src: game, alt: 'Game box' , id:game , convert:game2 },
    { src: economy, alt: 'economy box', id:economy , convert:economy2 },
    { src: science, alt: 'science box', id:science, convert:science2 },
    { src: edu, alt: 'ede box', id:edu , convert:edu2 } ,
  ]
  const Frame2 = [
    { src: animal, alt: 'animal box', id:animal , convert:animal2},
    { src: social, alt: 'social box' , id:social ,convert:social2},
    { src: sport, alt: 'sport box' , id:sport ,convert:sport2},
    { src: travel, alt: 'travel box', id:travel ,convert:travel2},
    { src: enter, alt: 'enter box', id:enter ,convert:enter2},
  ]
  const Frame3 = [
    { src: art, alt: 'art box' , id:art ,convert:art2},
    { src: cook, alt: 'cook box' , id:cook ,convert:cook2},
    { src: music, alt: 'music box', id:music ,convert:music2},
    { src: smile, alt: 'smile box' , id:smile ,convert:smile2},
    { src: stc, alt: 'stc box' , id:stc ,convert:stc},
  ]
  
  
  const FrameComponents = Frame.map((image) => (
    <button
      key={image.id}
      onClick={() => handleCategoryChange(image.id)}
      className={`hover-effect ${selectedCategory === image.id ? 'active' : ''}`}
    >
      {selectedCategory === image.id ? (
        // 선택된 카테고리에 대한 특정 이미지
        <img
          key={image.id}
          src={image.convert}
          alt={image.alt}
          style={{
            ...Boxstyle,
            transform: selectedCategory === image.id ? 'scale(1.1)' : 'scale(1)',
            zIndex: selectedCategory === image.id ? '2' : '-1',
          }}
        />
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          style={{
            ...Boxstyle,
            transform: selectedCategory === image.id ? 'scale(1.1)' : 'scale(1)',
            zIndex: selectedCategory === image.id ? '2' : '-1',
          }}
        />
      )}
    </button>
  ));
  
  
  const FrameComponents2 = Frame2.map((image) => (
    <button
      key={image.id}
      onClick={() => handleCategoryChange(image.id)}
      className={`hover-effect ${selectedCategory === image.id ? 'active' : ''}`}
    >
      {selectedCategory === image.id ? (
        // 선택된 카테고리에 대한 특정 이미지
        <img
          key={image.id}
          src={image.convert}
          alt={image.alt}
          style={{
            ...Boxstyle,
            transform: selectedCategory === image.id ? 'scale(1.1)' : 'scale(1)',
            zIndex: selectedCategory === image.id ? '2' : '-1',
          }}
        />
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          style={{
            ...Boxstyle,
            transform: selectedCategory === image.id ? 'scale(1.1)' : 'scale(1)',
            zIndex: selectedCategory === image.id ? '2' : '-1',

          }}
        />
      )}
    </button>
  ));
  
      
  const FrameComponents3 = Frame3.map((image) => (
    <button
      key={image.id}
      onClick={() => handleCategoryChange(image.id)}
      className={`hover-effect ${selectedCategory === image.id ? 'active' : ''}`}
    >
      {selectedCategory === image.id ? (
        // 선택된 카테고리에 대한 특정 이미지
        <img
          key={image.id}
          src={image.convert}
          alt={image.alt}
          style={{
            ...Boxstyle,
            transform: selectedCategory === image.id ? 'scale(1.1)' : 'scale(1)',
            zIndex: selectedCategory === image.id ? '2' : '-1',
          }}
        />
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          style={{
            ...Boxstyle,
            transform: selectedCategory === image.id ? 'scale(1.1)' : 'scale(1)',
            zIndex: selectedCategory === image.id ? '2' : '-1',
          }}
        />
      )}
    </button>
  ));
  
  
  
  
  
  return (
    <div className="main-container">
        {/*화면 이동 / 삼항연산*/}
        <div className={`main-content ${selectedCategory ? 'search-visible' : ''}`} style={{position : 'relative'}} >

        {/*각 각 다른 함수의 3 개의 차트이미지 표시*/}
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
                  position: 'absolute' ,  
                  width: selectedCategory ? '40px' : '50px', // 조건부로 크기 지정
                  height: selectedCategory ? '40px' : '50px',
                  top: selectedCategory ? 120 : -40 ,
                  right: 0}} />
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
              right: 0}} />
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
   </div>
  );
};
export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
