

const sendScheduleInfo = (iso8601Date) => {
  const youtube = {
    youtube_rtmp: localStorage.getItem("youtube_rtmp"),
    youtubeLiveUrl: localStorage.getItem("youtubeLiveUrl"),
    YT_liveChatId: localStorage.getItem("youtubeLiveUrl"),
  };
  const facebook = {
    facebook_rtmp: localStorage.getItem("facebook_rtmp"),
    facebook_liveVideoId: localStorage.getItem("facebook_liveVideoId"),
    facebook_accesstoken: localStorage.getItem("facebook_accesstoken"),
  };

};
export { sendScheduleInfo };
