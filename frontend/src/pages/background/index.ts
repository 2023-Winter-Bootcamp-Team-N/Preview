import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');
console.log('background script 실행 됨');

chrome.runtime.onMessage.addListener(message => {
  if (message.action === 'updateUrl') {
    console.log('content script로부터 URL 받음:', message.url);
    // 메시지를 SidePanel로 전송
    chrome.runtime.sendMessage({
      action: 'sendToSidePanel',
      url: message.url,
    });
  }
});
