// content/index.ts
/**
 * DO NOT USE import someModule from '...';
 *
 * @issue-url https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/160
 *
 * Chrome extensions don't support modules in content scripts.
 * If you want to use other modules in content scripts, you need to import them via these files.
 *
 */
import('@pages/content/ui');

console.log('content script 실행 됨');

const sendCurrentUrl = () => {
  console.log('Background로 URL 주소 보냄:', window.location.href);
  chrome.runtime.sendMessage({
    action: 'updateUrl',
    url: window.location.href,
  });
};

document.addEventListener('DOMContentLoaded', sendCurrentUrl);

let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl && currentUrl.includes('youtube.com/watch')) {
    lastUrl = currentUrl;
    sendCurrentUrl();
  }
}).observe(document, { subtree: true, childList: true });
