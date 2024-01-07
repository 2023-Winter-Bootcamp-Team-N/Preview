import React, { useState } from 'react';
import '@pages/newtab/Newtab.css';
import '@pages/newtab/Newtab.scss';
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
import SearchComponent from './SearchComponent';
const Newtab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}>
      <div>
        <img src={chart} alt="" style={{ width: '300px', height: '400px', margin: '50vh auto auto 57vw' }} />
      </div>
      {/* 첫번째 줄 프레임 */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button
          onClick={() => handleCategoryChange('health')}
          className="margin: '8px', width: '700px', height: '700px'">
          <img src={health} alt="health" />
        </button>
        <img src={game} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
        <img src={economy} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
        <img src={science} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
        <img src={edu} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
      </div>
      {/* 두번째 줄 프레임 */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <img src={animal} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
        <img src={social} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
        <img src={sport} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
        <img src={travel} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
        <img src={enter} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
      </div>
      {/* 세번째 줄 프레임 */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <img src={art} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
        <img src={cook} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
        <img src={music} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
        <img src={smile} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
        <img src={stc} alt="" style={{ margin: '8px', width: '700px', height: '700px' }} />
      </div>
      <div>
        <img src={TeamN} alt="" style={{ width: '500px', height: '200px', marginLeft: '3250px' }} />
      </div>
      <SearchComponent selectedCategory={selectedCategory} />
    </div>
  );
};
export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);