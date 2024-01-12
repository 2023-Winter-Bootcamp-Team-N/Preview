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

console.log('content loaded');

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.href.includes('youtube.com/watch')) {
    chrome.runtime.sendMessage({
      action: 'youtubeVideoDetected',
      url: window.location.href,
    });
  }
});
