// "use client";
// import { useState, useEffect } from "react";
// import { Stack, Box, Slider } from "@mantine/core";
// import "./Footer.css";
// import { FiScissors } from "react-icons/fi";
// import { FaForward, FaPlus, FaBackward, FaPlay, FaPause } from "react-icons/fa";
// import { FaMagnifyingGlassPlus, FaMagnifyingGlassMinus } from "react-icons/fa6";

// const Footer = ({
//   setAddFileWindow,
//   fileType,
//   videoRef,
//   audioUrl,
//   mediaProperties,
//   setCurrentTime,
//   setIsPlaying,
// }) => {
//   const [currentVideoTime, setCurrentVideoTime] = useState(0);
//   const [videoDuration, setVideoDuration] = useState(0);

//   const formatTime = (time) => {
//     if (isNaN(time) || time === undefined) return "00:00";
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
//   };

//   const handlePlayPause = () => {
//     const video = videoRef?.current;
//     if (video) {
//       if (video.paused) {
//         video.play().catch((error) => {
//           console.error("Error playing video:", error);
//         });
//         setIsPlaying(true);
//       } else {
//         video.pause();
//         setIsPlaying(false);
//       }
//     }
//   };

//   const handleForward = () => {
//     const video = videoRef?.current;
//     if (video) {
//       video.currentTime = Math.min(video.currentTime + 10, video.duration);
//     }
//   };

//   const handleBackward = () => {
//     const video = videoRef?.current;
//     if (video) {
//       video.currentTime = Math.max(video.currentTime - 10, 0);
//     }
//   };

//   const handleTimelineChange = (value) => {
//     const video = videoRef?.current;
//     if (video) {
//       video.currentTime = (value / 100) * video.duration;
//     }
//   };

//   useEffect(() => {
//     const video = videoRef?.current;

//     if (!video) return;

//     const updateTime = () => {
//       setCurrentVideoTime(video.currentTime);
//       setCurrentTime(video.currentTime);
//     };

//     const handleLoadedMetadata = () => {
//       setVideoDuration(video.duration);
//     };

//     // Ensure duration is captured when video is ready
//     if (video.readyState >= 1) {
//       handleLoadedMetadata();
//     }

//     video.addEventListener("timeupdate", updateTime);
//     video.addEventListener("loadedmetadata", handleLoadedMetadata);

//     return () => {
//       video.removeEventListener("timeupdate", updateTime);
//       video.removeEventListener("loadedmetadata", handleLoadedMetadata);
//     };
//   }, [videoRef, setCurrentTime]);

//   useEffect(() => {
//     const video = videoRef?.current;
//     if (video) {
//       const checkDuration = setInterval(() => {
//         if (video.duration && !isNaN(video.duration)) {
//           setVideoDuration(video.duration);
//           clearInterval(checkDuration);
//         }
//       }, 500);

//       return () => clearInterval(checkDuration);
//     }
//   }, [videoRef?.current?.src]);

//   // Ensure video resumes from the paused position
//   useEffect(() => {
//     const video = videoRef?.current;
//     if (video && !video.paused) {
//       video.currentTime = currentVideoTime;
//     }
//   }, [videoRef]);

//   // Calculate progress percentage for slider
//   const progressPercentage = videoDuration > 0 ? (currentVideoTime / videoDuration) * 100 : 0;

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
//           <Box className="fit-text">
//             {mediaProperties ? `width: ${Math.round(mediaProperties.width)}` : "Fit"}
//           </Box>
//         </Box>

//         <Box className="fit">
//           <Box className="fit-text">
//             {mediaProperties ? `height: ${Math.round(mediaProperties.height)}` : "Fit"}
//           </Box>
//         </Box>

//         <Box className="playAndPause fx">
//           <Box className="fx">
//             <FaBackward onClick={handleBackward} className="play" />
//             {videoRef?.current?.paused ? (
//               <FaPlay onClick={handlePlayPause} className="play" />
//             ) : (
//               <FaPause onClick={handlePlayPause} className="play" />
//             )}
//             <FaForward onClick={handleForward} className="play" />
//           </Box>
//           <Box>
//             {formatTime(currentVideoTime)} / {formatTime(videoDuration)}
//           </Box>
//         </Box>

//         <Box className="view-controls fx">
//           <Box className="slider">
//             <FaMagnifyingGlassMinus className="minus-btn" />
//             <Slider
//               className="sld"
//               color="blue"
//               size="sm"
//               value={progressPercentage}
//               // onChange={handleTimelineChange}
//             />
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
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    const video = videoRef?.current;
    if (video) {
      if (video.paused) {
        video.play().catch((error) => {
          console.error("Error playing video:", error);
        });
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleForward = () => {
    const video = videoRef?.current;
    if (video) {
      video.currentTime = Math.min(video.currentTime + 10, video.duration);
    }
  };

  const handleBackward = () => {
    const video = videoRef?.current;
    if (video) {
      video.currentTime = Math.max(video.currentTime - 10, 0);
    }
  };

  const handleTimelineChange = (value) => {
    const video = videoRef?.current;
    if (video) {
      video.currentTime = (value / 100) * video.duration;
    }
  };

  // Handle width change
  const handleWidthChange = (value) => {
    if (mediaProperties && setMediaProperties) {
      setMediaProperties(prev => ({
        ...prev,
        width: value
      }));
    }
  };

  // Handle height change
  const handleHeightChange = (value) => {
    if (mediaProperties && setMediaProperties) {
      setMediaProperties(prev => ({
        ...prev,
        height: value
      }));
    }
  };

  useEffect(() => {
    const video = videoRef?.current;

    if (!video) return;

    const updateTime = () => {
      setCurrentVideoTime(video.currentTime);
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
    };

    // Ensure duration is captured when video is ready
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoRef, setCurrentTime]);

  useEffect(() => {
    const video = videoRef?.current;
    if (video) {
      const checkDuration = setInterval(() => {
        if (video.duration && !isNaN(video.duration)) {
          setVideoDuration(video.duration);
          clearInterval(checkDuration);
        }
      }, 500);

      return () => clearInterval(checkDuration);
    }
  }, [videoRef?.current?.src]);

  // Ensure video resumes from the paused position
  useEffect(() => {
    const video = videoRef?.current;
    if (video && !video.paused) {
      video.currentTime = currentVideoTime;
    }
  }, [videoRef]);

  // Calculate progress percentage for slider
  const progressPercentage = videoDuration > 0 ? (currentVideoTime / videoDuration) * 100 : 0;

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
            step={1}
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
            step={1}
            value={mediaProperties ? Math.round(mediaProperties.height) : 0}
            onChange={handleHeightChange}
            hideControls={false}
            styles={{
              input: { textAlign: 'center' },
              wrapper: { width: '80px' }
            }}
          />
        </Box>

        <Box className="playAndPause fx">
          <Box className="fx">
            <FaBackward onClick={handleBackward} className="play" />
            {videoRef?.current?.paused ? (
              <FaPlay onClick={handlePlayPause} className="play" />
            ) : (
              <FaPause onClick={handlePlayPause} className="play" />
            )}
            <FaForward onClick={handleForward} className="play" />
          </Box>
          <Box>
            {formatTime(currentVideoTime)} / {formatTime(videoDuration)}
          </Box>
        </Box>

        <Box className="view-controls fx">
          <Box className="slider">
            <FaMagnifyingGlassMinus className="minus-btn" />
            <Slider
              className="sld"
              color="blue"
              size="sm"
              value={progressPercentage}
              onChange={handleTimelineChange}
            />
            <FaMagnifyingGlassPlus className="plus-btn" />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default Footer;
