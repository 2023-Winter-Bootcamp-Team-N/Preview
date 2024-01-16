interface SummaryItem {
    summary: {
      summary_id: number;
      youtube_title: string;
      youtube_channel: string;
      youtube_url: string;
      youtube_thumbnail: string;
      content: string;
      created_at: string; // 날짜에 대한 정확한 포맷 사용
    };
  }
  
  export default SummaryItem;