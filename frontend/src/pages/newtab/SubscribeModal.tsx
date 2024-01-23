import React from 'react';
import './SubscribeModal.css';

const SubscribeModal = ({ isOpen, onClose, onChannelSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          X
        </span>
        <h3>구독할 채널을 입력하세요.</h3>
        <div>
          <input type="text" placeholder="Enter YouTube Channel" />
          <span className="search-icon">&#128269;</span>
        </div>
        <button>Submit</button>
      </div>
    </div>
  );
};

export default SubscribeModal;
