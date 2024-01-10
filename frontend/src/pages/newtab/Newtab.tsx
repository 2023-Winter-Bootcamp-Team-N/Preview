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
import SummaryPage from './SummaryPage';



const Newtab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handleCategoryChange = (category: string) => {
    
   
      if (category === selectedCategory) {
      setSelectedCategory(null);
      } 
      else {
      setSelectedCategory(category);
      }
      };

  const Boxstyle = { 
    margin: '8px',
    width: selectedCategory ? '530px' : '750px', // 조건부로 크기 지정
    height: selectedCategory ? '530px' : '750px', // 조건부로 크기 지정
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
    <button key={image.id} onClick={() => handleCategoryChange(image.id)}>
      <img src={image.src} alt={image.alt} style={Boxstyle} />
    </button>
  ));
  const FrameComponents2 = Frame2.map((image) => (
    <button key={image.id} onClick={() => handleCategoryChange(image.id)}>
      <img src={image.src} alt={image.alt} style={Boxstyle} />
    </button>
  ));
  const FrameComponents3 = Frame3.map((image) => (
    <button key={image.id} onClick={()=> handleCategoryChange(image.id)}>
    <img key={image.id} src={image.src} alt={image.alt} style={Boxstyle} />
    </button>
  ));

  return (
    <div className="main-container" style={{ display: 'flex', flexDirection: 'column' , alignItems: 'center' , height: '50vh',}}>
      
      {/*화면 이동 / 삼항연산*/}
      
      <div className={`main-content ${selectedCategory ? 'search-visible' : ''}`} style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        
        }}>
        
        {/*차트이미지 표시*/}
        <div>
          <button>
            <img src={chart} alt="chart box" 
            style={{ position: 'absolute' , 
        
            width: selectedCategory ? '150px' : '200px', // 조건부로 크기 지정
            height: selectedCategory ? '150px' : '200px',

            top: selectedCategory ? 350 : 100 ,  
            right: selectedCategory ? 100 : 950}} />
          </button>  
        </div>




        {/*전체 프레임 div*/}
      
        
            <div className="frame-container" style={{
              marginTop: selectedCategory ? '500px' : '300px'}}>
          
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

        
      

        <div> {/*팀 로고 표시*/}
          <img src={TeamN} alt="logo box" style={{ position: 'absolute' , 
        
          width: selectedCategory ? '250px' : '400px', // 조건부로 크기 지정
          height: selectedCategory ? '100px' : '200px',

          bottom: selectedCategory ? -100 : -200 ,  
          right: selectedCategory ? 100 : 950}} />
          </div>
        </div>
          <SummaryPage selectedCategory={selectedCategory} />
      <div className={`main-content ${selectedCategory ? 'search-visible' : ''}`}>
      
      </div>
    </div>

      
  );
};
export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
