// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Stack, Box, Slider } from "@mantine/core";
// import "./Footer.css";
// import { FiScissors } from "react-icons/fi";
// import { CiMicrophoneOn } from "react-icons/ci";
// import { FaForward, FaPlus, FaBackward, FaPlay, FaPause } from "react-icons/fa";
// import { FaMagnifyingGlassPlus, FaMagnifyingGlassMinus } from "react-icons/fa6";
// import { IoSettingsOutline } from "react-icons/io5";
// // import Card from "./settingCard/Card";
// import WaveSurfer from "wavesurfer.js";

// const Footer = ({ setAddFileWindow, fileType, videoRef, audioUrl }) => {
//   const [settingClicked, setSettingClicked] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const waveformRef = useRef(null);
//   const wavesurferRef = useRef(null);

//   useEffect(() => {
//     const video = videoRef.current;
//     const updateTime = () => setCurrentTime(video.currentTime);
//     const updateDuration = () => setDuration(video.duration);

//     if (video) {
//       updateDuration();
//       video.addEventListener("timeupdate", updateTime);
//       video.addEventListener("durationchange", updateDuration);

//       return () => {
//         video.removeEventListener("timeupdate", updateTime);
//         video.removeEventListener("durationchange", updateDuration);
//       };
//     }
//   }, [videoRef]);

//   useEffect(() => {
//     if (fileType === "audio" && waveformRef.current && audioUrl) {
//       wavesurferRef.current = WaveSurfer.create({
//         container: waveformRef.current,
//         waveColor: "violet",
//         progressColor: "purple",
//         backend: "MediaElement",
//       });
//       wavesurferRef.current.load(audioUrl);

//       wavesurferRef.current.on("ready", () => {
//         setDuration(wavesurferRef.current.getDuration());
//       });

//       wavesurferRef.current.on("audioprocess", () => {
//         setCurrentTime(wavesurferRef.current.getCurrentTime());
//       });

//       wavesurferRef.current.on("seek", () => {
//         setCurrentTime(wavesurferRef.current.getCurrentTime());
//       });

//       return () => {
//         if (wavesurferRef.current) {
//           wavesurferRef.current.destroy();
//         }
//       };
//     }
//   }, [fileType, audioUrl]);

//   const handlePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleForward = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime += 10;
//     }
//   };

//   const handleBackward = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime -= 10;
//     }
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
//   };

//   const handleSliderChange = (value) => {
//     const newTime = (value / 100) * duration;
//     if (videoRef.current) {
//       videoRef.current.currentTime = newTime;
//     }
//     if (wavesurferRef.current) {
//       wavesurferRef.current.seekTo(newTime / duration);
//     }
//     setCurrentTime(newTime);
//   };

//   return (
//     <Stack className="footer" justify="flex-start" gap="0">
//       {settingClicked}
//       <Box className="edit-controls fx">
//         <Box className="edit-buttons fx">
//           <Box className="fx">
//             <FiScissors />
//             <span>Split</span>
//           </Box>
//           {/* <Box className="fx">
//             <CiMicrophoneOn />
//             <span>Voiceover</span>
//           </Box> */}
//         </Box>
//         <Box className="playAndPause fx">
//           <Box className="fx">
//             <FaBackward onClick={handleBackward} className="play" />
//             {isPlaying ? <FaPause onClick={handlePlayPause} className="play" /> : <FaPlay onClick={handlePlayPause} className="play" />}
//             <FaForward onClick={handleForward} className="play" />
//           </Box>
//           <Box>
//             {formatTime(currentTime)} / {formatTime(duration)}
//           </Box>
//         </Box>
//         <Box className="view-controls fx">
//           <Box className="slider">
//             <FaMagnifyingGlassMinus className="minus-btn" />
//             <Slider className="sld" color="blue" size="sm" />
//             <FaMagnifyingGlassPlus className="plus-btn" />
//           </Box>
//           <Box className="fit">
//             <Box className="fit-text">Fit</Box>
//             {/* <IoSettingsOutline className="setting-icon" onClick={() => setSettingClicked((p) => !p)} /> */}
//           </Box>
//         </Box>
//       </Box>
//       <Box className="edit-area">
//         {fileType === "none" ? (
//           <Box className="edit-none" onClick={() => setAddFileWindow((p) => !p)}>
//             <FaPlus /> Add Media to this Project
//           </Box>
//         ) : fileType === "audio" ? (
//           // <Box className="edit-audio">audio</Box>
//           <Box className="edit-audio" ref={waveformRef}></Box>
//         ) : (
//           <Box className="edit-video">video</Box>
//         )}
//       </Box>
//     </Stack>
//   );
// };

// export default Footer;



// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Stack, Box, Slider } from "@mantine/core";
// import "./Footer.css";
// import { FiScissors } from "react-icons/fi";
// import { CiMicrophoneOn } from "react-icons/ci";
// import { FaForward, FaPlus, FaBackward, FaPlay, FaPause } from "react-icons/fa";
// import { FaMagnifyingGlassPlus, FaMagnifyingGlassMinus } from "react-icons/fa6";
// import { IoSettingsOutline } from "react-icons/io5";
// import WaveSurfer from "wavesurfer.js";

// const Footer = ({ setAddFileWindow, fileType, videoRef, audioUrl }) => {
//   const [settingClicked, setSettingClicked] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const waveformRef = useRef(null);
//   const wavesurferRef = useRef(null);

//   useEffect(() => {
//     const video = videoRef.current;
    
//     const updateTime = () => setCurrentTime(video.currentTime);
    
//     const updateDuration = () => {
//       // Multiple checks to ensure duration is set
//       if (video && video.duration && !isNaN(video.duration)) {
//         setDuration(video.duration);
//       }
//     };

//     if (video) {
//       // Try multiple ways to set duration
//       video.addEventListener("loadedmetadata", updateDuration);
//       video.addEventListener("canplay", updateDuration);
//       video.addEventListener("durationchange", updateDuration);
//       video.addEventListener("timeupdate", updateDuration);

//       // Initial check
//       if (video.duration && !isNaN(video.duration)) {
//         setDuration(video.duration);
//       }

//       video.addEventListener("timeupdate", updateTime);

//       return () => {
//         video.removeEventListener("loadedmetadata", updateDuration);
//         video.removeEventListener("canplay", updateDuration);
//         video.removeEventListener("durationchange", updateDuration);
//         video.removeEventListener("timeupdate", updateDuration);
//         video.removeEventListener("timeupdate", updateTime);
//       };
//     }
//   }, [videoRef, fileType]);

//   // Rest of the component remains the same as in the previous version
//   const handlePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleForward = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime += 10;
//     }
//   };

//   const handleBackward = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime -= 10;
//     }
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
//   };

//   const handleSliderChange = (value) => {
//     const newTime = (value / 100) * duration;
//     if (videoRef.current) {
//       videoRef.current.currentTime = newTime;
//     }
//     if (wavesurferRef.current) {
//       wavesurferRef.current.seekTo(newTime / duration);
//     }
//     setCurrentTime(newTime);
//   };

//   return (
//     <Stack className="footer" justify="flex-start" gap="0">
//       {settingClicked}
//       <Box className="edit-controls fx">
//         <Box className="edit-buttons fx">
//           <Box className="fx">
//             <FiScissors />
//             <span>Split</span>
//           </Box>
//         </Box>
//         <Box className="playAndPause fx">
//           <Box className="fx">
//             <FaBackward onClick={handleBackward} className="play" />
//             {isPlaying ? <FaPause onClick={handlePlayPause} className="play" /> : <FaPlay onClick={handlePlayPause} className="play" />}
//             <FaForward onClick={handleForward} className="play" />
//           </Box>
//           <Box>
//             {formatTime(currentTime)} / {formatTime(duration)}
//           </Box>
//         </Box>
//         <Box className="view-controls fx">
//           <Box className="slider">
//             <FaMagnifyingGlassMinus className="minus-btn" />
//             <Slider className="sld" color="blue" size="sm" />
//             <FaMagnifyingGlassPlus className="plus-btn" />
//           </Box>
//           <Box className="fit">
//             <Box className="fit-text">Fit</Box>
//           </Box>
//         </Box>
//       </Box>
//       <Box className="edit-area">
//         {fileType === "none" ? (
//           <Box className="edit-none" onClick={() => setAddFileWindow((p) => !p)}>
//             <FaPlus /> Add Media to this Project
//           </Box>
//         ) : fileType === "audio" ? (
//           <Box className="edit-audio" ref={waveformRef}></Box>
//         ) : (
//           <Box className="edit-video">video</Box>
//         )}
//       </Box>
//     </Stack>
//   );
// };

// export default Footer;






// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Stack, Box, Slider } from "@mantine/core";
// import "./Footer.css";
// import { FiScissors } from "react-icons/fi";
// import { FaForward, FaPlus, FaBackward, FaPlay, FaPause } from "react-icons/fa";
// import { FaMagnifyingGlassPlus, FaMagnifyingGlassMinus } from "react-icons/fa6";
// import WaveSurfer from "wavesurfer.js";

// const Footer = ({ 
//   setAddFileWindow, 
//   fileType, 
//   videoRef, 
//   audioUrl, 
//   mediaProperties, 
//   setCurrentTime,
//   setIsPlaying 
// }) => {
//   const [isAudioPlaying, setIsAudioPlaying] = useState(false);
//   const [currentAudioTime, setCurrentAudioTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const waveformRef = useRef(null);
//   const wavesurferRef = useRef(null);

//   // Existing audio-related useEffect and handlers remain the same

//   const handlePlayPause = () => {
//     if (videoRef.current) {
//       if (videoRef.current.current) {
//         const video = videoRef.current.current;
//         if (video.paused) {
//           video.play();
//           setIsPlaying(true);
//         } else {
//           video.pause();
//           setIsPlaying(false);
//         }
//       }
//     }
//   };

//   const handleForward = () => {
//     if (videoRef.current?.current) {
//       videoRef.current.current.currentTime += 10;
//     }
//   };

//   const handleBackward = () => {
//     if (videoRef.current?.current) {
//       videoRef.current.current.currentTime -= 10;
//     }
//   };

//   useEffect(() => {
//     const video = videoRef.current?.current;
//     if (video) {
//       const updateTime = () => {
//         setCurrentTime(video.currentTime);
//         setDuration(video.duration);
//       };

//       video.addEventListener('timeupdate', updateTime);
      
//       return () => {
//         video.removeEventListener('timeupdate', updateTime);
//       };
//     }
//   }, [videoRef, setCurrentTime]);

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
//   };

//   return (
//     <Stack className="footer" justify="flex-start" gap="0">
//       <Box className="edit-controls fx">
//         {/* Existing controls remain the same */}
//         <Box className="edit-buttons fx">
//           <Box className="fx">
//             <FiScissors />
//             <span>Split</span>
//           </Box>
//         </Box>
//         <Box className="playAndPause fx">
//           <Box className="fx">
//             <FaBackward onClick={handleBackward} className="play" />
//             {videoRef.current?.current?.paused ? 
//               <FaPlay onClick={handlePlayPause} className="play" /> : 
//               <FaPause onClick={handlePlayPause} className="play" />
//             }
//             <FaForward onClick={handleForward} className="play" />
//           </Box>
//           <Box>
//             {formatTime(videoRef.current?.current?.currentTime || 0)} / {formatTime(duration)}
//           </Box>
//         </Box>
//         <Box className="view-controls fx">
//           <Box className="slider">
//             <FaMagnifyingGlassMinus className="minus-btn" />
//             <Slider className="sld" color="blue" size="sm" />
//             <FaMagnifyingGlassPlus className="plus-btn" />
//           </Box>
//           <Box className="fit">
//             <Box className="fit-text">
//               {mediaProperties ? 
//                 `${Math.round(mediaProperties.width)}x${Math.round(mediaProperties.height)}` : 
//                 'Fit'}
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//       {/* Rest of the component remains the same */}
//     </Stack>
//   );
// };

// export default Footer;


"use client";
import { useState, useEffect, useRef } from "react";
import { Stack, Box, Slider } from "@mantine/core";
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
  setCurrentTime,
  setIsPlaying 
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
        video.play().catch(error => {
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

  useEffect(() => {
    const video = videoRef?.current;
    if (video) {
      const updateTime = () => {
        setCurrentVideoTime(video.currentTime);
        setCurrentTime(video.currentTime);
      };

      const handleLoadedMetadata = () => {
        setVideoDuration(video.duration);
      };

      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [videoRef, setCurrentTime]);

  // Calculate progress percentage for slider
  const progressPercentage = videoDuration > 0 
    ? (currentVideoTime / videoDuration) * 100 
    : 0;

  return (
    <Stack className="footer" justify="flex-start" gap="0">
      <Box className="edit-controls fx">
        <Box className="edit-buttons fx">
          <Box className="fx">
            <FiScissors />
            <span>Split</span>
          </Box>
        </Box>
        <Box className="playAndPause fx">
          <Box className="fx">
            <FaBackward onClick={handleBackward} className="play" />
            {videoRef?.current?.paused ? 
              <FaPlay onClick={handlePlayPause} className="play" /> : 
              <FaPause onClick={handlePlayPause} className="play" />
            }
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
          <Box className="fit">
            <Box className="fit-text">
              {mediaProperties ? 
                `${Math.round(mediaProperties.width)}x${Math.round(mediaProperties.height)}` : 
                'Fit'}
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default Footer;