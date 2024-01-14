import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, closeModal, children }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 페이드 인 효과를 만들기 위해 투명도를 1로 설정하기 전에 작은 지연을 두기
      const timeout = setTimeout(() => {
        setModalVisible(true);
      }, 100);

      return () => clearTimeout(timeout);
    } else {
      setModalVisible(false);
    }
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div
      className="modal-overlay"
      style={{
        zIndex: '1000',
        background: '#D9D9D9',
        top: '50%',
        left: '50%',
        margin: 'auto',
        overflow: 'auto',
        width: '60%', // 모달의 가로 크기
        height: '80%', // 모달의 세로 크기
        position: 'fixed', // 고정 위치로 설정
        transform: 'translate(-50%, -50%)', // 중앙 정렬을 위해 위치 조정
        padding: '0 2%',
        paddingBottom: '2%',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // 그림자 효과 추가
        opacity: modalVisible ? '1' : '0', // 상태에 따른 투명도 설정
        transition: 'opacity 0.3s ease-in-out', // 트랜지션 적용
        borderRadius: '30px', // 둥근 테두리 설정
      }}>
      <div className="modal" style={{ display: 'flex' }}>
        <button
          className="text-black px-4 py-0 modal-close"
          style={{
            marginLeft: 'auto',
            marginBottom: '0.2rem',
            marginRight: '1rem',
            width: '1.5rem', // 원하는 가로 크기
            fontSize: '1.5rem', // 원하는 텍스트 크기
          }}
          onClick={closeModal} // 창 닫기 버튼을 눌렀을 때 동작(모달창 닫음)을 설정
        >
          X
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
};
export default Modal;
