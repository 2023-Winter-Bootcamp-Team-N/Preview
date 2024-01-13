import React, { useState } from 'react';

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        zIndex: 1000,
        background: 'transparent',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
      }}>
      <div className="modal">
        <button className="modal-close" onClick={closeModal}>
          닫기
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
