import React, { useState } from 'react';
import test1 from '../../assets/img/test1.svg';
import test2 from '../../assets/img/test2.svg';
import test3 from '../../assets/img/test3.svg';
import test4 from '../../assets/img/test4.svg';
import test5 from '../../assets/img/test5.svg';
import test6 from '../../assets/img/test6.svg';

const ImageStyle = {
  width: '10vw',
  margin: '60px',
};

const Thumbnail1 = [
  { src: test1, alt: 'test1', id: 1 },
  { src: test2, alt: 'test2', id: 2 },
];

const Thumbnail2 = [
  { src: test3, alt: 'test3', id: 3 },
  { src: test4, alt: 'test4', id: 4 },
];

const Thumbnail3 = [
  { src: test5, alt: 'test5', id: 5 },
  { src: test6, alt: 'test6', id: 6 },
];

const SubscribePage = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = buttonId => {
    setHoveredButton(buttonId);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <div>
      <div style={{ background: 'grey', borderRadius: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {Thumbnail1.map(image => (
            <button key={image.id}>
              <img
                src={image.src}
                alt={image.alt}
                style={{ width: '180px', height: '180px', borderRadius: '120px', margin: '30px' }}
              />
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '700px', left: 0 }}>
          {Thumbnail2.map(image => (
            <button key={image.id}>
              <img
                src={image.src}
                alt={image.alt}
                style={{ width: '180px', height: '180px', borderRadius: '120px', margin: '10px' }}
              />
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {Thumbnail3.map(image => (
            <button key={image.id}>
              <img
                src={image.src}
                alt={image.alt}
                style={{ width: '180px', height: '180px', borderRadius: '120px', margin: '30px' }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
