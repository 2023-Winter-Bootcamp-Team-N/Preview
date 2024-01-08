import React from 'react';
import { createRoot } from 'react-dom/client';
import MainPage from '@pages/newtab/MainPage';
import '@pages/newtab/index.css';
import './index.css';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';

refreshOnUpdate('pages/newtab');

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(<MainPage />);
}

init();
