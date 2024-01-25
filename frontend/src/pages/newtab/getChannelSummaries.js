import axios from 'axios';

const getChannelSummaries = async selectedChannel => {
  const userID = '1'; // 고정된 userID
  try {
    const url = `http://localhost:8000/api/v1/search/channel`; // API 엔드포인트
    const response = await axios.get(url, {
      params: {
        userID: 1,
        channelName: selectedChannel, // 선택된 채널명
      },
    });

    console.log('요약본 정보:', response.data);
    return response.data; // 요약본 정보 반환
  } catch (error) {
    console.error('Error fetching channel summaries:', error);
    throw error;
  }
};
