// import { auth } from "./Config";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import TrendyVideos from "./TrendyVideos";

// const Dashboard = ({ userPhoto, userName, userEmail }) => {
//   const [channelInput, setChannelInput] = useState("");
//   const [channelDetails, setChannelDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (event) => {
//     const input = event.target.value;
//     setChannelInput(input);

//     // Check if the input is empty, and if so, clear the fetched details
//     if (!input.trim()) {
//       fetchChannelDetails("");
//     }
//   };

//   const getChannelIdFromInput = async (input) => {
//     // Match full channel URL with ID
//     const urlMatch = input.match(
//       /(?:youtube\.com\/(?:channel\/|c\/|user\/)?|youtu\.be\/)([a-zA-Z0-9_-]{24})/
//     );

//     // Match direct channel ID input
//     const directIdMatch = input.match(/^[a-zA-Z0-9_-]{24}$/);

//     // Match URL with username
//     const usernameMatch = input.match(/youtube\.com\/(?:@)?([^/]+)/);

//     if (urlMatch) {
//       return urlMatch[1];
//     } else if (directIdMatch) {
//       return directIdMatch[0];
//     } else if (usernameMatch) {
//       const username = usernameMatch[1];
//       return await fetchChannelIdByUsername(username);
//     }

//     return null;
//   };

//   const fetchChannelIdByUsername = async (username) => {
//     // fetching channel details by username, the channel id is assigned to newChannelId
//     try {
//       const responseByUsername = await axios.get(
//         `https://www.googleapis.com/youtube/v3/search?part=id&snippet&q=${username}&type=channel&key=AIzaSyC1CN584v8ZttfySu4Y9GWifChM05C4qbA`
//       );

//       console.log("Username response", responseByUsername);
//       // console.log(responseByUsername);
//       const newChannelId = await responseByUsername.data.items[0].id.channelId;
//       console.log("ID fetched from username", newChannelId);

//       if (newChannelId) {
//         return newChannelId;
//       } else {
//         setError("No channel ID found for the provided username");
//         return null;
//       }
//     } catch (error) {
//       console.error("Error fetching channel ID by username:", error);
//       return null;
//     }
//   };

//   const fetchChannelDetails = async () => {
//     try {
//       setError(null);
//       setLoading(true);

//       // Extract channel ID from the input
//       const channelId = await getChannelIdFromInput(channelInput);

//       //   console.log("channelId", channelId);

//       if (!channelId) {
//         setError("Failed to fetch channel details");
//         setChannelDetails(null);
//         return;
//       }

//       // Make API request to get channel details using the channel id entered directly by the user or extracted from the url input

//       const response = await axios.get(
//         `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=AIzaSyC1CN584v8ZttfySu4Y9GWifChM05C4qbA`
//       );

//       console.log("ID response", response.data);

//       if (
//         !response.data ||
//         !response.data.items ||
//         response.data.items.length === 0
//       ) {
//         setError("No channel details found for the provided input");
//         setChannelDetails(null);
//         return;
//       }

//       setChannelDetails(response.data.items[0]);
//     } catch (error) {
//       setError("Error fetching channel details");
//       setChannelDetails(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogOut = () => {
//     // Use Firebase auth to sign out
//     auth
//       .signOut()
//       .then(() => {
//         // Clear local storage and reload the page
//         localStorage.clear();
//         window.location.reload();
//       })
//       .catch((error) => {
//         // Handle any logout errors
//         console.error("Error logging out:", error);
//       });
//   };

//   const handleClick = () => {
//     fetchChannelDetails();
//     // console.log("Rich");
//   };

//   return (
//     <div className="container w-full h-full py-4 mx-auto">
//       {/* heading */}
//       <div className="flex justify-between items-center ">
//         {/* logo */}
//         <div>
//           <img src="./imgs/youtube.png" alt="" className="h-25 w-40" />
//         </div>

//         {/* user-info */}
//         <div className="flex items-center justify-between py-2 px-4 bg-red rounded-3xl">
//           <img
//             src={userPhoto}
//             alt="user-photo"
//             className="h-8 w-8 rounded-full mr"
//           />
//           <p className="text-white mx-3">{userName}</p>

//           <button onClick={handleLogOut} className="text-white">
//             Log out
//           </button>
//         </div>
//       </div>

//       {/* channel-search */}
//       <div className="flex justify-center items-center mb-5">
//         <input
//           type="text"
//           aria-label="input"
//           value={channelInput}
//           className="rounded-3xl py-2 px-4 bg-white mr-8 w-1/2 outline-none"
//           placeholder="Enter channel url"
//           onChange={handleInputChange}
//         />
//         <button
//           className="rounded-3xl py-2 bg-white w-60 hover:bg-limeGreen hover:text-white"
//           onClick={handleClick}
//         >
//           Get channel info
//         </button>
//       </div>

//       {channelDetails && (
//         <div className="grid grid-cols-5  mb-4 gap-10">
//           {/* channel-info */}
//           <div className="bg-white rounded-md py-8 px-6  flex flex-col items-center col-span-1">
//             {/* channel-image */}
//             <div className="mb-4 flex justify-center">
//               <img
//                 src={channelDetails.snippet.thumbnails.default.url}
//                 alt="channel-img"
//                 className="h-16 w-16 rounded-full "
//               />
//             </div>

//             {/* channel--name */}
//             <div className="flex py-2 px-4 rounded-3xl w-full bg-red">
//               {/* <img src="./imgs/channel.png" alt="youtube-icon" /> */}
//               <span className="text-white ml-2 text-sm">
//                 {channelDetails.snippet.title}
//               </span>
//             </div>

//           </div>

//           {/* channel-stats */}
//           <div className="bg-white rounded-md py-2 px-4 w-full col-span-4">
//             <h3>Channel overview</h3>

//             {/* channel--stats--data */}
//             <div className="grid grid-cols-4 py-4 gap-6">
//               {/* videos*/}
//               <div className="py-3 px-10 rounded-md shadow-md hover:shadow-lg flex items-center justify-center flex-col ">
//                 <img src="./imgs/youtube-icon.png" alt="videos" />
//                 <h1 className="text-black text-2xl font-semibold mb-1 mt-1">
//                   {channelDetails.statistics.videoCount}
//                 </h1>
//                 <p className="text-red">VIDEOS</p>
//               </div>

//               {/* subscribers*/}
//               <div className="py-3 px-10 rounded-md shadow-md hover:shadow-lg flex items-center justify-center flex-col">
//                 <img src="./imgs/group.png" alt="" />
//                 <h1 className="text-black text-2xl font-semibold mb-1 mt-3">
//                   {channelDetails.statistics.subscriberCount}
//                 </h1>
//                 <p className="text-red">SUBSCRIBERS</p>
//               </div>

//               {/* views*/}
//               <div className="py-3 px-10 rounded-md shadow-md hover:shadow-lg flex items-center justify-center flex-col">
//                 <img src="./imgs/eye.png" alt="" />
//                 <h1 className="text-black text-2xl font-semibold mb-1 mt-3">
//                   {channelDetails.statistics.viewCount}
//                 </h1>
//                 <p className="text-red">VIEWS</p>
//               </div>

//               {/* date--created*/}
//               <div className="py-3 px-10 rounded-md shadow-md hover:shadow-lg flex items-center justify-center flex-col">
//                 <img src="./imgs/history.png" alt="" />
//                 <h1 className="text-black text-2xl font-semibold mb-1 mt-3">
//                   Joined
//                 </h1>
//                 <p className="text-red">
//                   {""}

//                   {channelDetails.snippet.publishedAt
//                     ? new Date(
//                         channelDetails.snippet.publishedAt
//                       ).toLocaleDateString()
//                     : "No creation date available"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* trendy-videos */}
//       <TrendyVideos />
//     </div>
//   );
// };

// export default Dashboard;



import { auth } from "./Config";
import { useState, useEffect } from "react";
import axios from "axios";
import TrendyVideos from "./TrendyVideos";

const Dashboard = ({ userPhoto, userName, userEmail }) => {
  const [channelInput, setChannelInput] = useState("");
  const [channelDetails, setChannelDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const input = event.target.value;
    setChannelInput(input);

    if (!input.trim()) {
      setChannelDetails(null);
    }
  };

  const getChannelIdFromInput = async (input) => {
    // Match full channel URL with ID
    const urlMatch = input.match(
      /(?:youtube\.com\/(?:channel\/|c\/|user\/)?|youtu\.be\/)([a-zA-Z0-9_-]{24})/
    );

    // Match direct channel ID input
    const directIdMatch = input.match(/^[a-zA-Z0-9_-]{24}$/);

    // Match URL with username
    const usernameMatch = input.match(/youtube\.com\/(?:@)?([^/]+)/);

    if (urlMatch) {
      return urlMatch[1];
    } else if (directIdMatch) {
      return directIdMatch[0];
    } else if (usernameMatch) {
      const username = usernameMatch[1];
      return await fetchChannelIdByUsername(username);
    }

    return null;
  };

  const fetchChannelIdByUsername = async (username) => {
    // fetching channel details by username, the channel id is assigned to newChannelId
    try {
      const responseByUsername = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=id&snippet&q=${username}&type=channel&key=AIzaSyC1CN584v8ZttfySu4Y9GWifChM05C4qbA`
      );

      console.log("Username response", responseByUsername);
      // console.log(responseByUsername);
      const newChannelId = await responseByUsername.data.items[0].id.channelId;
      console.log("ID fetched from username", newChannelId);

      if (newChannelId) {
        return newChannelId;
      } else {
        setError("No channel ID found for the provided username");
        return null;
      }
    } catch (error) {
      console.error("Error fetching channel ID by username:", error);
      return null;
    }
  };

  const fetchChannelDetails = async () => {
    try {
      setError(null);
      setLoading(true);

      const channelId = await getChannelIdFromInput(channelInput);

      if (!channelId) {
        setError("Failed to fetch channel details");
        setChannelDetails(null);
        return;
      }

      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=AIzaSyC1CN584v8ZttfySu4Y9GWifChM05C4qbA`
      );

      if (
        !response.data ||
        !response.data.items ||
        response.data.items.length === 0
      ) {
        setError("No channel details found for the provided input");
        setChannelDetails(null);
        return;
      }

      setChannelDetails(response.data.items[0]);
    } catch (error) {
      setError("Error fetching channel details");
      setChannelDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = () => {
    // Use Firebase auth to sign out
    auth
      .signOut()
      .then(() => {
        // Clear local storage and reload the page
        localStorage.clear();
        window.location.reload();
      })
      .catch((error) => {
        // Handle any logout errors
        console.error("Error logging out:", error);
      });
  };

  const handleClick = async () => {
    setError(null);
    setLoading(true);

    await fetchChannelDetails();

    // Fetch trendy videos only if channel details were successfully fetched
    if (!error) {
      // You can pass the channel ID or other relevant details to TrendyVideos component
      // for more dynamic behavior
    }

    setLoading(false);
  };

  return (
    <div className="container w-full h-full py-4 mx-auto">
      <div className="flex justify-between items-center ">
        <div>
          <img src="./imgs/youtube.png" alt="" className="h-25 w-40" />
        </div>
        <div className="flex items-center justify-between py-2 px-4 bg-red rounded-3xl">
          <img
            src={userPhoto}
            alt="user-photo"
            className="h-8 w-8 rounded-full mr"
          />
          <p className="text-white mx-3">{userName}</p>
          <button onClick={handleLogOut} className="text-white">
            Log out
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center mb-5">
        <input
          type="text"
          aria-label="input"
          value={channelInput}
          className="rounded-3xl py-2 px-4 bg-white mr-8 w-1/2 outline-none"
          placeholder="Enter channel url"
          onChange={handleInputChange}
        />
        <button
          className="rounded-3xl py-2 bg-white w-60 hover:bg-limeGreen hover:text-white"
          onClick={handleClick}
        >
          Get channel info
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {channelDetails && (

        // channel-about
        <div className="grid grid-cols-5 mb-4 gap-10">
          <div className="bg-white rounded-md py-8 px-6  flex flex-col items-center col-span-1">
            <div className="mb-4 flex justify-center">
              <img
                src={channelDetails.snippet.thumbnails.default.url}
                alt="channel-img"
                className="h-16 w-16 rounded-full "
              />
            </div>
            <div className="py-2 px-4 rounded-3xl w-full bg-red text-center">
              <span className="text-white text-sm">
                {channelDetails.snippet.title}
              </span>
            </div>
          </div>

          {/* channel-stats */}
          <div className="bg-white rounded-md py-2 px-6 w-full col-span-4">
            <h3>Channel overview</h3>
            <div className="grid grid-cols-4 py-4 gap-6">
              <div className="py-3 px-10 rounded-md shadow-md hover:shadow-lg flex items-center justify-center flex-col ">
                <img src="./imgs/youtube-icon.png" alt="videos" />
                <h1 className="text-black text-2xl font-semibold mb-1 mt-1">
                  {channelDetails.statistics.videoCount}
                </h1>
                <p className="text-red">VIDEOS</p>
              </div>
              <div className="py-3 px-10 rounded-md shadow-md hover:shadow-lg flex items-center justify-center flex-col">
                <img src="./imgs/group.png" alt="" />
                <h1 className="text-black text-2xl font-semibold mb-1 mt-3">
                  {channelDetails.statistics.subscriberCount}
                </h1>
                <p className="text-red">SUBSCRIBERS</p>
              </div>
              <div className="py-3 px-10 rounded-md shadow-md hover:shadow-lg flex items-center justify-center flex-col">
                <img src="./imgs/eye.png" alt="" />
                <h1 className="text-black text-2xl font-semibold mb-1 mt-3">
                  {channelDetails.statistics.viewCount}
                </h1>
                <p className="text-red">VIEWS</p>
              </div>
              <div className="py-3 px-10 rounded-md shadow-md hover:shadow-lg flex items-center justify-center flex-col">
                <img src="./imgs/history.png" alt="" />
                <h1 className="text-black text-2xl font-semibold mb-1 mt-3">
                  Joined
                </h1>
                <p className="text-red">
                  {channelDetails.snippet.publishedAt
                    ? new Date(
                        channelDetails.snippet.publishedAt
                      ).toLocaleDateString()
                    : "No creation date available"}
                </p>
              </div>
            </div>
          </div>

        </div>
      )}
      <TrendyVideos channelDetails={channelDetails} />
    </div>
  );
};

export default Dashboard;

