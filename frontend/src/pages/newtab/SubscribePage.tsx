import React from 'react';

const SubscribePage = () => {
  // 무작위 이미지 데이터 배열
  const randomImageData = [
    { id: 1, src: 'url-to-image-1', alt: 'Image 1' },
    { id: 2, src: 'url-to-image-2', alt: 'Image 2' },
    { id: 3, src: 'url-to-image-3', alt: 'Image 3' },
    // ... 더 많은 이미지 데이터
  ];

  return (
    <div>
      <h1>안녕하세요</h1>
      {/* 이미지 데이터 배열을 사용하여 이미지 렌더링 */}
      {randomImageData.map((image) => (
        <img key={image.id} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
};

export default SubscribePage;