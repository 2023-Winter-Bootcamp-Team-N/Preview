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
    <div className="rounded-lg bg-color p-4 space-y-4 border-none side-panel">
      {/* 상단 로고, 서비스명, 버튼 영역 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={teamlogo} alt="teamlogo" className="w-8 h-8" />
          <span className="font-semibold text-xl">요약 서비스</span>
        </div>
        <div className="flex -space-x-1">
          <button className="p-2 rounded">
            <img src={save} alt="logo" className="w-5 h-5 " />
          </button>
          <button className="p-2 rounded">
            <img src={mypage} alt="logo" className="w-5 h-5 " />
          </button>
          <button className="p-2 rounded">
            <img src={copy} alt="logo" className="w-5 h-5" />
          </button>
        </div>
      </div>
      <hr className="stroke" />
      {/* 하단 텍스트 영역 */}
      <div>
        <p className="text-sm">텍스트</p>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
