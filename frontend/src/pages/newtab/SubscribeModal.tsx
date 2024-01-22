/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */

import React, { useState } from 'react';
import './SubscribeModal.css'; // CSS 파일 import

// eslint-disable-next-line react/prop-types
const SubscribeModal = ({ isOpen, onClose, onChannelSubmit }) => {
  const [channelInput, setChannelInput] = useState('');

  const handleSubmit = () => {
    onChannelSubmit(channelInput);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          X
        </span>
        <h3>구독할 채널을 입력하세요.</h3> {/* 메시지 추가 */}
        <div>
          <input
            type="text"
            placeholder="Enter YouTube Channel"
            value={channelInput}
            onChange={e => setChannelInput(e.target.value)}
          />
          <span className="search-icon">&#128269;</span> {/* 검색 아이콘 추가 */}
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default SubscribeModal;
