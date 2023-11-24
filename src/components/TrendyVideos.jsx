import React, { useState, useEffect } from "react";
import axios from "axios";

const TrendyVideos = ({ channelDetails }) => {
  const [videoDetails, setVideoDetails] = useState([]);
  const [countryRegion, setCountryRegion] = useState("us");
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // New state to track selected video

  const fetchVideoDetails = async () => {
    try {
      const response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=8&regionCode=${countryRegion}&key=AIzaSyC1CN584v8ZttfySu4Y9GWifChM05C4qbA`
      );

      setVideoDetails(response.data.items);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  const handleModalDismiss = () => {
    setShowModal(false);
  };

  const handleShowKeywords = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  useEffect(() => {
    if (channelDetails) {
      fetchVideoDetails();
    }
  }, [channelDetails, countryRegion]);

  return (
    <div className="w-full">
      {channelDetails && (
        <div className="relative w-full">
          {showModal && selectedVideo && (
  <div className="fixed inset-0 z-10 flex items-center justify-center bg-grayishBlack bg-opacity-75 transition-opacity duration-500 ease-in-out backdrop-blur-sm">
    <div className="bg-white w-1/2 h-auto py-4 px-2 rounded-lg shadow-xl">
      <img
        src="./imgs/close.png"
        alt="close-icon"
        className=""
        onClick={handleModalDismiss}
      />
      <div className="rounded-sm p-2">
        <div className="text-sm text-clip overflow-wrap-break-word ">
          {selectedVideo.snippet.tags && selectedVideo.snippet.tags.length > 0 ? (
            selectedVideo.snippet.tags.map((tag, index) => (
              <span key={index} className="font-light border-black bg-white text-center" >{tag} </span>
            ))
          ) : (
            <p>No keywords available.</p>
          )}
        </div>
        <button
          className="p-1 bg-limeGreen text-white rounded-sm hover:shadow-sm mt-2 text-sm"
          onClick={() => {
            if (selectedVideo.snippet.tags) {
              navigator.clipboard.writeText(
                selectedVideo.snippet.tags.join(" ")
              );
            }
          }}
        >
          Copy keywords
        </button>
      </div>
    </div>
  </div>
)}


          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl">
              Top 10 trendy youtube videos in{" "}
              <span>{countryRegion === "" ? "the world" : countryRegion}</span>
            </h1>
          </div>

          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3 w-full">
              {videoDetails.length > 0 ? (
                videoDetails.map((video, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-md hover:shadow-xl shadow-md p-4 relative"
                  >
                    <h1
                      style={{ marginBottom: 10 }}
                      className="text-lg text-almostBlack font-semibold"
                    >
                      {index + 1}
                    </h1>
                    <img
                      src={video.snippet.thumbnails.high.url}
                      alt="channel logo"
                      className=" w-full"
                    />

                    <h2
                      className="font-semibold leading-tight"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 2,
                      }}
                    >
                      {video.snippet.title}
                    </h2>

                    <p>Views: {video.statistics.viewCount}</p>
                    <p>Likes: {video.statistics.likeCount}</p>

                    <div className="p-1 my-1">
                      <button
                        className="p-1 bg-limeGreen text-white rounded-sm hover:shadow-sm text-sm mt-2"
                        onClick={() => handleShowKeywords(video)}
                      >
                        Show keywords
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No videos found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendyVideos;
