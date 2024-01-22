import React, { useState } from 'react';
import axios from 'axios';
import './SubscribeModal.css';

const SubscribeModal = ({ isOpen, onClose, onChannelSubmit }) => {
  const [channelInput, setChannelInput] = useState('');

  const handleSubmit = () => {
    onChannelSubmit(channelInput);

    axios
      .post('http://localhost:8000/api/subscribe', {
        user_id: 1,
        subscribe_channel: channelInput,
      })
      .then(response => {
        console.log('구독 성공:', response.data);
      })
      .catch(error => {
        console.error('구독 오류:', error);
      });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          X
        </span>
        <h3>구독할 채널을 입력하세요.</h3>
        <div>
          <input
            type="text"
            placeholder="Enter YouTube Channel"
            value={channelInput}
            onChange={e => setChannelInput(e.target.value)}
          />
          <span className="search-icon">&#128269;</span>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default SubscribeModal;
