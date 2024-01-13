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
  { src: test1, alt:'test1' , id:1 },
  { src: test2, alt: 'test2' , id:2 },
  { src: test3, alt: 'test3', id:3 },
];

const Thumbnail2 = [
  { src: test4, alt:'test4' , id:4 },
  { src: test5, alt: 'test5' , id:5 },
  { src: test6, alt: 'test6', id:6 },
];

const SubscribePage = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (buttonId) => {
    setHoveredButton(buttonId);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <div>

        <div 
        style={{background: 'linear-gradient(to right, #CCCCCC, #333333)' , 
        borderRadius:'100px',
        }}>
          <div>
            {Thumbnail1.map((image) => (
              <button
                key={image.id}
                onMouseEnter={() => handleMouseEnter(image.id)}
                onMouseLeave={handleMouseLeave}
                style={{
                  width:'50vw' ,
                  ...ImageStyle,
                  position: 'relative',
                  transition: 'top 0.5s ease-in-out',
                  top: hoveredButton === image.id ? '-30px' : '0',
                  borderRadius: '120px', // borderRadius 적용
                }}
              >
                <img src={image.src} alt={image.alt} style={{ display: 'flex', borderRadius: '120px' }} />
                {hoveredButton === image.id && (
                  <div style={{ position: 'absolute', top: '100%', right: 0, transform: 'translateX(-50%)', background: 'grey', borderRadius: '10px' }}>
                    {/* 정보 창 내용 */}
                  </div>
                )}
              </button>
            ))}
          </div>

          <div>
            {Thumbnail2.map((image) => (
              <button
                key={image.id}
                onMouseEnter={() => handleMouseEnter(image.id)}
                onMouseLeave={handleMouseLeave}
                style={{
                  width:'50vw',
                  ...ImageStyle,
                  position: 'relative',
                  transition: 'top 0.5s ease-in-out',
                  top: hoveredButton === image.id ? '-30px' : '0',
                  borderRadius: '120px', // borderRadius 적용
                }}
              >
                <img src={image.src} alt={image.alt} style={{ borderRadius: '120px' }} />
                {hoveredButton === image.id && (
                  <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', borderRadius: '10px' }}>
                    {/* 정보 창 내용 */}
                    Information for {image.alt}
                  </div>
                )}
          </button>
        ))}
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;