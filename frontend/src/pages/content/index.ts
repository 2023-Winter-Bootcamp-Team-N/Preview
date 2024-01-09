/**
 * DO NOT USE import someModule from '...';
 *
 * @issue-url https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/160
 *
 * Chrome extensions don't support modules in content scripts.
 * If you want to use other modules in content scripts, you need to import them via these files.
 *
 */

console.log('content loaded');

// YouTube 동영상 페이지인지 확인
const isYouTubeVideoPage = window.location.href.includes('https://www.youtube.com/watch');

if (isYouTubeVideoPage) {
  // YouTube 동영상 페이지에 삽입될 UI 컴포넌트
  const YouTubeBox = document.createElement('div');
  YouTubeBox.style.position = 'fixed';
  YouTubeBox.style.top = '10px';
  YouTubeBox.style.right = '10px';
  YouTubeBox.style.width = '100px';
  YouTubeBox.style.height = '100px';
  YouTubeBox.style.backgroundColor = 'black';
  YouTubeBox.style.zIndex = '9999';
  YouTubeBox.style.padding = '10px';
  YouTubeBox.style.borderRadius = '5px';
  YouTubeBox.innerHTML = '<p>박스</p>';

  // 실제 YouTube 동영상 페이지에 UI 삽입
  document.body.appendChild(YouTubeBox);
}
