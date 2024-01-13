import React, { useState } from 'react';

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        zIndex: 1000,
        background: '#506DBF',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        overflow: 'auto',
      }}>
      <div className="modal">
        <button
          className="text-black px-4 py-2 modal-close"
          style={{
            marginLeft: 'auto',
            marginRight: '1rem',
            width: '1.5rem', // 원하는 가로 크기
            fontSize: '1.5rem', // 원하는 텍스트 크기
          }}
          onClick={closeModal} // 창 닫기 버튼을 눌렀을 때 동작(모달창 닫음)을 설정
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
