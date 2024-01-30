import React from 'react';
import logo from '@assets/img/logo.svg';
import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const Popup = () => {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <p>유튜브 영상 요약 서비스 Preview입니다.</p>
      <p></p>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
