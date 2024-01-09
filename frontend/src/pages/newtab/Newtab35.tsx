import React, { useState } from 'react';
import '@pages/newtab/Newtab35.css';
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
import SearchComponent from './SearchComponent';


const Newtab35: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const Boxstyle = { 
    margin: '8px',
    width: '530px',
    height: '530px',
  };

  const Frame = [
    { src: health, alt:'health box' , id:health },
    { src: game, alt: 'Game box' , id:game },
    { src: economy, alt: 'economy box', id:economy },
  ] 
  const Frame2 = [
    { src: science, alt: 'science box', id:science },
    { src: edu, alt: 'ede box', id:edu } ,     
    { src: animal, alt: 'animal box', id:animal},
  ]

  const Frame3 = [
    { src: social, alt: 'social box' , id:social},
    { src: sport, alt: 'sport box' , id:sport},
    { src: travel, alt: 'travel box', id:travel},
  ]

  const Frame4 = [
    { src: enter, alt: 'enter box', id:enter}, 
    { src: art, alt: 'art box' , id:art},
    { src: cook, alt: 'cook box' , id:cook},
 ]

 const Frame5 = [
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
  const FrameComponents4 = Frame4.map((image) => (
    <button key={image.id} onClick={()=> handleCategoryChange(image.id)}>
    <img key={image.id} src={image.src} alt={image.alt} style={Boxstyle} />
    </button>
  ));
  const FrameComponents5 = Frame5.map((image) => (
    <button key={image.id} onClick={()=> handleCategoryChange(image.id)}>
    <img key={image.id} src={image.src} alt={image.alt} style={Boxstyle} />
    </button>
  ));

  return (
    <div className="main-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      
      {/*화면 이동 / 삼항연산*/}
      
      <div className={`main-content ${selectedCategory ? 'search-visible' : ''}`} style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100vw'
        }}>
        
        {/*차트이미지 표시*/}
        

        {/*전체 프레임 div*/}
      
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

          <div style={{ display: 'flex', flexDirection: 'row' }}> {/*네번째 프레임*/}
            {FrameComponents4}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}> {/*다섯번째 프레임*/}
            {FrameComponents5}
          </div>

        </div>
      

        
      </div>
      
      
      
      <SearchComponent selectedCategory={selectedCategory} />
      <div className={`main-content ${selectedCategory ? 'search-visible' : ''}`}>
      
      </div>
    </div>

      
  );
};
export default withErrorBoundary(withSuspense(Newtab35, <div> Loading ... </div>), <div> Error Occur </div>);
