import React from 'react';
import '@pages/sidepanel/SidePanel.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import save from '@assets/img/savebutton.svg';
import mypage from '@assets/img/mypagebutton.svg';
import copy from '@assets/img/copybutton.svg';
import teamlogo from '@assets/img/teamlogo.svg';

const SidePanel = () => {
  return (
    <div className="rounded-lg bg-gray-200 p-4 space-y-4">
      {/* 상단 로고, 서비스명, 버튼 영역 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={teamlogo} alt="teamlogo" className="w-8 h-8" />
          <span className="font-bold text-lg">TEAM-N</span>
        </div>
        <div className="flex space-x-2">
          <button className="margin: '8px', width: '700px', height: '700px'">
            <img src={save} alt="logo" />
          </button>
          <button className="margin: '8px', width: '700px', height: '700px'">
            <img src={mypage} alt="logo" />
          </button>
          <button className="margin: '8px', width: '700px', height: '700px'">
            <img src={copy} alt="logo" />
          </button>
        </div>
      </div>

      {/* 하단 텍스트 영역 */}
      <div>
        <p className="text-sm">
          아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주아주
          긴 텍스트
        </p>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
