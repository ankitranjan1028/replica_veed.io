// "use client";
// import { useState, useEffect } from "react";
// import { Stack, Box, Slider, NumberInput } from "@mantine/core";
// import "./Footer.css";
// import { FiScissors } from "react-icons/fi";
// import { FaForward, FaPlus, FaBackward, FaPlay, FaPause } from "react-icons/fa";
// import { FaMagnifyingGlassPlus, FaMagnifyingGlassMinus } from "react-icons/fa6";
// import { useTimeContext } from "@/app/contexts/TimeContext";

// const Footer = ({
//   setAddFileWindow,
//   fileType,
//   videoRef,
//   audioUrl,
//   mediaProperties,
//   setMediaProperties,
//   setCurrentTime,
//   setIsPlaying,
// }) => {
//   const { duration, setDuration, currentTime: contextTime, setCurrentTime: setContextTime } = useTimeContext();
//   const [currentVideoTime, setCurrentVideoTime] = useState(0);
//   const [isUpdatingDimensions, setIsUpdatingDimensions] = useState(false);
//   const [playState, setPlayState] = useState(false);

//   const formatTime = (time) => {
//     if (isNaN(time) || time === undefined) return "00:00";
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
//   };

//   const handlePlayPause = () => {
//     const video = videoRef?.current;
//     if (video && fileType === "video") {
//       if (video.paused) {
//         const playPromise = video.play();
//         if (playPromise !== undefined) {
//           playPromise.catch((error) => {
//             console.error("Error playing video:", error);
//           });
//         }
//         setPlayState(true);
//         setIsPlaying(true);
//       } else {
//         video.pause();
//         setPlayState(false);
//         setIsPlaying(false);
//       }
//     }
//   };

//   const handleForward = () => {
//     const video = videoRef?.current;
//     if (video && fileType === "video") {
//       const newTime = Math.min(video.currentTime + 10, video.duration);
//       video.currentTime = newTime;
//       setCurrentVideoTime(newTime);
//       setCurrentTime(newTime);
//       setContextTime(newTime);
//     }
//   };

//   const handleBackward = () => {
//     const video = videoRef?.current;
//     if (video && fileType === "video") {
//       const newTime = Math.max(video.currentTime - 10, 0);
//       video.currentTime = newTime;
//       setCurrentVideoTime(newTime);
//       setCurrentTime(newTime);
//       setContextTime(newTime);
//     }
//   };

//   const handleTimelineChange = (value) => {
//     const video = videoRef?.current;
//     if (video && fileType === "video" && duration > 0) {
//       const newTime = (value / 100) * duration;
//       video.currentTime = newTime;
//       setCurrentVideoTime(newTime);
//       setCurrentTime(newTime);
//       setContextTime(newTime);
//     }
//   };


//   // Handle width change with debouncing
//   const handleWidthChange = (value) => {
//     if (mediaProperties && setMediaProperties) {
//       setIsUpdatingDimensions(true);

//       // Store current play state before dimension change (only for videos)
//       const wasPlaying = fileType === "video" && videoRef?.current && !videoRef.current.paused;

//       // Pause video during resizing to prevent flickering (only for videos)
//       if (wasPlaying && videoRef?.current) {
//         videoRef.current.pause();
//       }

//       // Update width for any media type
//       setMediaProperties(prev => ({
//         ...prev,
//         width: value
//       }));

//       // Reset the updating flag after a short delay
//       setTimeout(() => {
//         setIsUpdatingDimensions(false);

//         // Restore play state if it was playing (only for videos)
//         if (wasPlaying && videoRef?.current && fileType === "video") {
//           const playPromise = videoRef.current.play();
//           if (playPromise !== undefined) {
//             playPromise.catch(error => {
//               console.error("Error resuming after width change:", error);
//             });
//           }
//         }
//       }, 100);
//     }
//   };

//   // Similarly update the handleHeightChange function
//   const handleHeightChange = (value) => {
//     if (mediaProperties && setMediaProperties) {
//       setIsUpdatingDimensions(true);

//       // Store current play state before dimension change (only for videos)
//       const wasPlaying = fileType === "video" && videoRef?.current && !videoRef.current.paused;

//       // Pause video during resizing to prevent flickering (only for videos)
//       if (wasPlaying && videoRef?.current) {
//         videoRef.current.pause();
//       }

//       // Update height for any media type
//       setMediaProperties(prev => ({
//         ...prev,
//         height: value
//       }));

//       // Reset the updating flag after a short delay
//       setTimeout(() => {
//         setIsUpdatingDimensions(false);

//         // Restore play state if it was playing (only for videos)
//         if (wasPlaying && videoRef?.current && fileType === "video") {
//           const playPromise = videoRef.current.play();
//           if (playPromise !== undefined) {
//             playPromise.catch(error => {
//               console.error("Error resuming after height change:", error);
//             });
//           }
//         }
//       }, 100);
//     }
//   };

//   useEffect(() => {
//     const video = videoRef?.current;

//     if (!video || fileType !== "video") return;

//     const updateTime = () => {
//       if (video.currentTime !== undefined) {
//         const currentTime = video.currentTime;
//         setCurrentVideoTime(currentTime);
//         setCurrentTime(currentTime);
//         setContextTime(currentTime);
//         // Update play state in case it was changed externally
//         setPlayState(!video.paused);
//       }
//     };

//     const handleLoadedMetadata = () => {
//       if (video.duration && !isNaN(video.duration)) {
//         setDuration(video.duration);
//       }
//     };

//     // Ensure duration is captured when video is ready
//     if (video.readyState >= 1) {
//       handleLoadedMetadata();
//     }

//     // Ensure event listeners are added properly
//     video.addEventListener("timeupdate", updateTime);
//     video.addEventListener("loadedmetadata", handleLoadedMetadata);
//     video.addEventListener("play", () => setPlayState(true));
//     video.addEventListener("pause", () => setPlayState(false));

//     return () => {
//       video.removeEventListener("timeupdate", updateTime);
//       video.removeEventListener("loadedmetadata", handleLoadedMetadata);
//       video.removeEventListener("play", () => setPlayState(true));
//       video.removeEventListener("pause", () => setPlayState(false));
//     };
//   }, [videoRef, fileType, setCurrentTime, setDuration, setContextTime]);

//   // Calculate progress percentage for slider
//   const progressPercentage = duration > 0 ? (currentVideoTime / duration) * 100 : 0;

//   return (
//     <Stack className="footer" justify="flex-start" gap="0">
//       <Box className="edit-controls fx">
//         <Box className="edit-buttons fx">
//           <Box className="fx">
//             <FiScissors />
//             <span>Split</span>
//           </Box>
//         </Box>

//         <Box className="fit">
//           <NumberInput
//             className="dimension-input"
//             placeholder="Width"
//             label="Width"
//             min={50}
//             max={2000}
//             step={10}
//             value={mediaProperties ? Math.round(mediaProperties.width) : 0}
//             onChange={handleWidthChange}
//             hideControls={false}
//             styles={{
//               input: { textAlign: 'center' },
//               wrapper: { width: '80px' }
//             }}
//           />
//         </Box>

//         <Box className="fit">
//           <NumberInput
//             className="dimension-input"
//             placeholder="Height"
//             label="Height"
//             min={50}
//             max={2000}
//             step={10}
//             value={mediaProperties ? Math.round(mediaProperties.height) : 0}
//             onChange={handleHeightChange}
//             hideControls={false}
//             styles={{
//               input: { textAlign: 'center' },
//               wrapper: { width: '80px' }
//             }}
//           />
//         </Box>

//         <Box className="playAndPause fx">
//           <Box className="fx">
//             <FaBackward onClick={handleBackward} className="play" />
//             {!playState ? (
//               <FaPlay onClick={handlePlayPause} className="play" />
//             ) : (
//               <FaPause onClick={handlePlayPause} className="play" />
//             )}
//             <FaForward onClick={handleForward} className="play" />
//           </Box>
//           <Box>
//             {formatTime(currentVideoTime)} / {formatTime(duration)}
//           </Box>
//         </Box>

//         <Box className="view-controls fx">
//           <Box className="slider">
//             <FaMagnifyingGlassMinus className="minus-btn" />
//             <Slider className="sld" color="blue" size="sm" value={progressPercentage} />
//             <FaMagnifyingGlassPlus className="plus-btn" />
//           </Box>
//         </Box>

//       </Box>
//     </Stack>
//   );
// };

// export default Footer;






"use client";
import { useState, useEffect } from "react";
import { Stack, Box, Slider, NumberInput } from "@mantine/core";
import "./Footer.css";
import { FiScissors } from "react-icons/fi";
import { FaForward, FaPlus, FaBackward, FaPlay, FaPause } from "react-icons/fa";
import { FaMagnifyingGlassPlus, FaMagnifyingGlassMinus } from "react-icons/fa6";
import { useTimeContext } from "@/app/contexts/TimeContext";

const Footer = ({
  setAddFileWindow,
  fileType,
  videoRef,
  audioUrl,
  mediaProperties,
  setMediaProperties,
  setCurrentTime,
  setIsPlaying,
}) => {
  const { duration, setDuration, currentTime: contextTime, setCurrentTime: setContextTime } = useTimeContext();
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [isUpdatingDimensions, setIsUpdatingDimensions] = useState(false);
  const [playState, setPlayState] = useState(false);

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    // Only allow play/pause for video files
    if (fileType !== "video") return;
    
    const video = videoRef?.current;
    if (video) {
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Error playing video:", error);
          });
        }
        setPlayState(true);
        setIsPlaying(true);
      } else {
        video.pause();
        setPlayState(false);
        setIsPlaying(false);
      }
    }
  };

  const handleForward = () => {
    // Only allow seeking for video files
    if (fileType !== "video") return;
    
    const video = videoRef?.current;
    if (video) {
      const newTime = Math.min(video.currentTime + 10, video.duration);
      video.currentTime = newTime;
      setCurrentVideoTime(newTime);
      setCurrentTime(newTime);
      setContextTime(newTime);
    }
  };

  const handleBackward = () => {
    // Only allow seeking for video files
    if (fileType !== "video") return;
    
    const video = videoRef?.current;
    if (video) {
      const newTime = Math.max(video.currentTime - 10, 0);
      video.currentTime = newTime;
      setCurrentVideoTime(newTime);
      setCurrentTime(newTime);
      setContextTime(newTime);
    }
  };

  const handleTimelineChange = (value) => {
    // Only allow timeline changes for video files
    if (fileType !== "video") return;
    
    const video = videoRef?.current;
    if (video && duration > 0) {
      const newTime = (value / 100) * duration;
      video.currentTime = newTime;
      setCurrentVideoTime(newTime);
      setCurrentTime(newTime);
      setContextTime(newTime);
    }
  };

  // Handle width change with debouncing
  const handleWidthChange = (value) => {
    if (mediaProperties && setMediaProperties) {
      setIsUpdatingDimensions(true);

      // Store current play state before dimension change (only for videos)
      const wasPlaying = fileType === "video" && videoRef?.current && !videoRef.current.paused;

      // Pause video during resizing to prevent flickering (only for videos)
      if (wasPlaying && videoRef?.current) {
        videoRef.current.pause();
      }

      // Update width for any media type
      setMediaProperties(prev => ({
        ...prev,
        width: value
      }));

      // Reset the updating flag after a short delay
      setTimeout(() => {
        setIsUpdatingDimensions(false);

        // Restore play state if it was playing (only for videos)
        if (wasPlaying && videoRef?.current && fileType === "video") {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Error resuming after width change:", error);
            });
          }
        }
      }, 100);
    }
  };

  // Similarly update the handleHeightChange function
  const handleHeightChange = (value) => {
    if (mediaProperties && setMediaProperties) {
      setIsUpdatingDimensions(true);

      // Store current play state before dimension change (only for videos)
      const wasPlaying = fileType === "video" && videoRef?.current && !videoRef.current.paused;

      // Pause video during resizing to prevent flickering (only for videos)
      if (wasPlaying && videoRef?.current) {
        videoRef.current.pause();
      }

      // Update height for any media type
      setMediaProperties(prev => ({
        ...prev,
        height: value
      }));

      // Reset the updating flag after a short delay
      setTimeout(() => {
        setIsUpdatingDimensions(false);

        // Restore play state if it was playing (only for videos)
        if (wasPlaying && videoRef?.current && fileType === "video") {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Error resuming after height change:", error);
            });
          }
        }
      }, 100);
    }
  };

  // Effect to reset state when fileType changes
  useEffect(() => {
    // Reset timer and play state when switching between file types
    if (fileType !== "video") {
      setCurrentVideoTime(0);
      setCurrentTime(0);
      setContextTime(0);
      setDuration(0);
      setPlayState(false);
      setIsPlaying(false);
    }
  }, [fileType, setCurrentTime, setContextTime, setDuration, setIsPlaying]);

  useEffect(() => {
    const video = videoRef?.current;

    // Early return if not a video file or no video ref
    if (!video || fileType !== "video") return;

    const updateTime = () => {
      if (video.currentTime !== undefined) {
        const currentTime = video.currentTime;
        setCurrentVideoTime(currentTime);
        setCurrentTime(currentTime);
        setContextTime(currentTime);
        // Update play state in case it was changed externally
        setPlayState(!video.paused);
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    // Ensure duration is captured when video is ready
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    // Ensure event listeners are added properly
    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", () => setPlayState(true));
    video.addEventListener("pause", () => setPlayState(false));

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", () => setPlayState(true));
      video.removeEventListener("pause", () => setPlayState(false));
    };
  }, [videoRef, fileType, setCurrentTime, setDuration, setContextTime]);

  // Calculate progress percentage for slider
  const progressPercentage = duration > 0 ? (currentVideoTime / duration) * 100 : 0;

  // Determine if playback controls should be enabled
  const playbackEnabled = fileType === "video";

  return (
    <Stack className="footer" justify="flex-start" gap="0">
      <Box className="edit-controls fx">
        <Box className="edit-buttons fx">
          <Box className="fx">
            <FiScissors />
            <span>Split</span>
          </Box>
        </Box>

        <Box className="fit">
          <NumberInput
            className="dimension-input"
            placeholder="Width"
            label="Width"
            min={50}
            max={2000}
            step={10}
            value={mediaProperties ? Math.round(mediaProperties.width) : 0}
            onChange={handleWidthChange}
            hideControls={false}
            styles={{
              input: { textAlign: 'center' },
              wrapper: { width: '80px' }
            }}
          />
        </Box>

        <Box className="fit">
          <NumberInput
            className="dimension-input"
            placeholder="Height"
            label="Height"
            min={50}
            max={2000}
            step={10}
            value={mediaProperties ? Math.round(mediaProperties.height) : 0}
            onChange={handleHeightChange}
            hideControls={false}
            styles={{
              input: { textAlign: 'center' },
              wrapper: { width: '80px' }
            }}
          />
        </Box>

        <Box className={`playAndPause fx ${!playbackEnabled ? 'disabled' : ''}`}>
          <Box className="fx">
            <FaBackward 
              onClick={handleBackward} 
              className={`play ${!playbackEnabled ? 'disabled-control' : ''}`} 
            />
            {!playState ? (
              <FaPlay 
                onClick={handlePlayPause} 
                className={`play ${!playbackEnabled ? 'disabled-control' : ''}`}
              />
            ) : (
              <FaPause 
                onClick={handlePlayPause} 
                className="play" 
              />
            )}
            <FaForward 
              onClick={handleForward} 
              className={`play ${!playbackEnabled ? 'disabled-control' : ''}`}
            />
          </Box>
          <Box>
            {playbackEnabled ? (
              `${formatTime(currentVideoTime)} / ${formatTime(duration)}`
            ) : (
              "00:00 / 00:00"
            )}
          </Box>
        </Box>

        <Box className="view-controls fx">
          <Box className="slider">
            <FaMagnifyingGlassMinus className="minus-btn" />
            <Slider 
              className="sld" 
              color="blue" 
              size="sm" 
              value={playbackEnabled ? progressPercentage : 0}
              onChange={handleTimelineChange}
              disabled={!playbackEnabled}
            />
            <FaMagnifyingGlassPlus className="plus-btn" />
          </Box>
        </Box>

      </Box>
    </Stack>
  );
};

export default Footer;