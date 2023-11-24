import React, { useState, useEffect } from "react";
import axios from "axios";

const TrendyVideos = ({ channelDetails }) => {
  const [videoDetails, setVideoDetails] = useState([]);
  const [countryRegion, setCountryRegion] = useState("us");
  const [revealKeyword, setRevealKeyword] = useState(false);

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

  useEffect(() => {
    // Call fetchVideoDetails() only if channelDetails is available
    if (channelDetails) {
      fetchVideoDetails();
    }
  }, [channelDetails, countryRegion]);

  return (
    <div className="p-2">
      {channelDetails && (
        <div className="block">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl">
              Top 10 trendy youtube videos in{" "}
              <span>{countryRegion === "" ? "the world" : countryRegion}</span>
            </h1>

         {/* select country code  */}

          </div>

          <div>
                        {/* trendy-videos */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            {videoDetails.length > 0 ? (
              videoDetails.map((video, index) => (
                <div key={index} className="bg-white rounded-md hover:shadow-xl shadow-md p-4 relative">
                  <h1 style={{ marginBottom: 10 }} className="text-lg text-almostBlack font-semibold">{index + 1}</h1>
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt="channel logo"
                    className=" w-full"
                  />

                  <h2 className="font-semibold leading-tight" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 2 }}>
                    {video.snippet.title}
                  </h2>

                  <p>Views: {video.statistics.viewCount}</p>
                  <p>Likes: {video.statistics.likeCount}</p>
                  {/* <p>Channel: {video.snippet.channelTitle}</p> */}

                  {revealKeyword && (
                    <div key={index} className="p-1 my-1">
                        <p style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 2}}>{video.snippet.tags+""}</p>

              <button className="p-1 bg-limeGreen text-white rounded-sm hover:shadow-sm text-sm mt-2"
                    onClick={() => {
                        navigator.clipboard.writeText(
                          videoDetails.map((video) => video.snippet.tags+"")
                        );
                      } }
               >
                 Copy keywords
               </button>
                    </div>
                  )}

            {!revealKeyword && (
                <button className="p-1 bg-limeGreen text-white rounded-sm hover:shadow-sm text-sm mt-2"
                onClick={() => { setRevealKeyword(true)} } > Show keywords </button>
            )}
                  
                </div>
              ))
            ) : (
              <p>No videos found.</p>
            )}
          </div>

            {/* keywords container */}
          
          </div>

        </div>
      )}
    </div>
  );
};

export default TrendyVideos;
