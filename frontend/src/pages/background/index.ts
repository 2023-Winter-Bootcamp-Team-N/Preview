import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');
reloadOnUpdate('pages/content/style.scss');
reloadOnUpdate('pages/sidepanel');

console.log('background loaded');

// 유튜브 URL을 백엔드로 전송하는 함수
const sendYouTubeUrlToBackend = url => {
  // 백엔드 API 호출
  // 예: axios.post('your-backend-api-endpoint', { url: url })
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'youtubeVideoDetected') {
    console.log('YouTube Video URL:', message.url);
    sendYouTubeUrlToBackend(message.url); // URL을 백엔드로 전송

    // SidePanel에 메시지 전송
    chrome.runtime.sendMessage({
      action: 'sendToSidePanel',
      url: message.url,
    });
  }
});
