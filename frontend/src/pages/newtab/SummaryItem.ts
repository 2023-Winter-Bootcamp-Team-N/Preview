interface SummaryItem {

  
  summary: {
    summary_id: number;
    youtube_title: string;
    youtube_channel: string;
    youtube_url: string;
    youtube_thumbnail: string;
    content: string;
    created_at: string; // 정확한 날짜 포맷 사용 (예: "YYYY-MM-DD")
  };

  categories:{
    category: string;
  }[];

  summary_by_times: {
      start_time: string;
      image_url: string;
      content: string;
  }[];
}

// SummaryItem을 내보내기 (export)
export default SummaryItem;