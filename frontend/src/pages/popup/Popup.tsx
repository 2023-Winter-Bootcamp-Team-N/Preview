import React from 'react';
import logo from '@assets/img/logo.svg';
import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const Popup = () => {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/pages/popup/Popup.tsx</code> and save to reload.
      </p>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
