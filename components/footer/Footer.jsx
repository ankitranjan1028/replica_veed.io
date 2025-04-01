"use client";
import { useState, useEffect, useRef } from "react";
import { Stack, Box, Slider, NumberInput } from "@mantine/core";
import "./Footer.css";
import { FiScissors } from "react-icons/fi";
import { FaForward, FaPlus, FaBackward, FaPlay, FaPause } from "react-icons/fa";
import { FaMagnifyingGlassPlus, FaMagnifyingGlassMinus } from "react-icons/fa6";
import { useTimeContext } from "@/app/contexts/TimeContext";
import { usePlaybackContext } from "@/app/contexts/PlaybackContext";

const Footer = ({
  fileType,
  videoRef,
  mediaProperties,
  setMediaProperties,
}) => {
  const { duration, currentTime, setCurrentTime } = useTimeContext();
  const { isPlaying, setIsPlaying } = usePlaybackContext();
  const [isUpdatingDimensions, setIsUpdatingDimensions] = useState(false);
  const [dimensionUpdateTimeout, setDimensionUpdateTimeout] = useState(null);
  const prevFileTypeRef = useRef(fileType);

  // Helper function to safely get the video element
  const getVideoElement = () => {
    // If file type isn't video, we shouldn't try to access video elements
    if (fileType !== "video") return null;
    
    if (!videoRef?.current) return null;
    
    try {
      // Try to use the getVideoElement helper if available
      if (typeof videoRef.current.getVideoElement === 'function') {
        return videoRef.current.getVideoElement();
      }
      
      // Fall back to direct reference if it's a video
      if (videoRef.current.tagName === 'VIDEO') {
        return videoRef.current;
      }
      
      // Otherwise try to get the video element from the ref's current
      if (videoRef.current.current && videoRef.current.current.tagName === 'VIDEO') {
        return videoRef.current.current;
      }
      
      return null;
    } catch (error) {
      console.error("Error accessing video element:", error);
      return null;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    // Only allow play/pause for video files
    if (fileType !== "video") return;
    
    const video = getVideoElement();
    if (video) {
      if (!isPlaying) {
        // Ensure we can actually play the video
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.error("Error playing video:", error);
            setIsPlaying(false);
          });
        }
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleForward = () => {
    // Only allow seeking for video files
    if (fileType !== "video") return;
    
    const video = getVideoElement();
    if (video) {
      try {
        const newTime = Math.min(video.currentTime + 10, video.duration || 0);
        video.currentTime = newTime;
        setCurrentTime(newTime);
      } catch (error) {
        console.error("Error seeking forward:", error);
      }
    }
  };

  const handleBackward = () => {
    // Only allow seeking for video files
    if (fileType !== "video") return;
    
    const video = getVideoElement();
    if (video) {
      try {
        const newTime = Math.max(video.currentTime - 10, 0);
        video.currentTime = newTime;
        setCurrentTime(newTime);
      } catch (error) {
        console.error("Error seeking backward:", error);
      }
    }
  };

  const handleTimelineChange = (value) => {
    // Only allow timeline changes for video files
    if (fileType !== "video") return;
    
    const video = getVideoElement();
    if (video && duration > 0) {
      try {
        const newTime = (value / 100) * duration;
        video.currentTime = newTime;
        setCurrentTime(newTime);
      } catch (error) {
        console.error("Error changing timeline:", error);
      }
    }
  };

  // Improved dimension change handler with debouncing - no play state interruption
  const handleDimensionChange = (dimension, value) => {
    if (mediaProperties && setMediaProperties) {
      // Clear any existing timeout to prevent multiple updates
      if (dimensionUpdateTimeout) {
        clearTimeout(dimensionUpdateTimeout);
      }

      // Update dimensions immediately without pausing video
      setMediaProperties(prev => ({
        ...prev,
        [dimension]: value
      }));

      // Mark as updating dimensions
      setIsUpdatingDimensions(true);
      
      // Reset the updating flag after a short delay
      const timeout = setTimeout(() => {
        setIsUpdatingDimensions(false);
      }, 50);
      
      setDimensionUpdateTimeout(timeout);
    }
  };

  // Handle width change
  const handleWidthChange = (value) => {
    handleDimensionChange('width', value);
  };

  // Handle height change
  const handleHeightChange = (value) => {
    handleDimensionChange('height', value);
  };
  
  // Detect file type changes
  useEffect(() => {
    // If we switched file types
    if (fileType !== prevFileTypeRef.current) {
      // Reset playback state
      if (isPlaying) {
        setIsPlaying(false);
      }
      
      prevFileTypeRef.current = fileType;
    }
  }, [fileType, isPlaying, setIsPlaying]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dimensionUpdateTimeout) {
        clearTimeout(dimensionUpdateTimeout);
      }
    };
  }, [dimensionUpdateTimeout]);

  // Sync video element with playback state when needed
  useEffect(() => {
    if (fileType === "video") {
      // Get the current video element
      const videoEl = getVideoElement();
      if (videoEl) {
        // Update the video element state to match context
        if (isPlaying && videoEl.paused) {
          const playPromise = videoEl.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Error playing video:", error);
              setIsPlaying(false);
            });
          }
        } else if (!isPlaying && !videoEl.paused) {
          videoEl.pause();
        }
      }
    }
  }, [fileType, isPlaying, setIsPlaying]);

  // Calculate progress percentage for slider
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

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

        <Box className={`playAndPause fx ${!playbackEnabled ? 'disabled' : ''}`}>
          <Box className="fx">
            <FaBackward 
              onClick={handleBackward} 
              className={`play ${!playbackEnabled ? 'disabled-control' : ''}`} 
            />
            {!isPlaying ? (
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
              `${formatTime(currentTime)} / ${formatTime(duration)}`
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