"use client";
import { Box, Group, Stack } from "@mantine/core";
import Navbar from "../components/navbar/Navbar";
import { useState, useRef, useEffect } from "react";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Topbar from "@/components/topbar/Topbar";
import Addmedia from "@/components/addmedia/Addmedia";
import "@mantine/carousel/styles.css";
import Editor from "@/components/editor/Editor";

// Import context providers
import { FileProvider, useFileContext } from "@/app/contexts/FileContext";
import { SizeProvider, useSizeContext } from "@/app/contexts/SizeContext";
import { TimeProvider, useTimeContext } from "@/app/contexts/TimeContext";
import { PlaybackProvider, usePlaybackContext } from "@/app/contexts/PlaybackContext";

const EditorWithContexts = () => {
  // Access contexts
  const { fileUrl, setFileUrl, fileType: contextFileType, setFileType: setContextFileType } = useFileContext();
  const { width, setWidth, height, setHeight } = useSizeContext();
  const { currentTime: contextTime, setCurrentTime: setContextTime, duration, setDuration, resetTimeContext } = useTimeContext();
  const { isPlaying: contextIsPlaying, setIsPlaying: setContextIsPlaying } = usePlaybackContext();

  const [activeCard, setActiveCard] = useState(false);
  const [fileType, setFileType] = useState("none");
  const [aspectRatio, setAspectRatio] = useState("16/9");
  const [color, setColor] = useState("#000000");
  const [file, setFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRef = useRef(null);
  const [mediaProperties, setMediaProperties] = useState({
    x: 0,
    y: 0,
    width: 640, // Default width
    height: 360, // Default height
    startTime: 0,
    endTime: Infinity
  });

  // Sync context values with local state
  useEffect(() => {
    if (fileType !== contextFileType) {
      setContextFileType(fileType);
    }
  }, [fileType, contextFileType, setContextFileType]);

  useEffect(() => {
    if (file && !fileUrl) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  }, [file, fileUrl, setFileUrl]);

  useEffect(() => {
    setWidth(mediaProperties.width.toString());
    setHeight(mediaProperties.height.toString());
  }, [mediaProperties.width, mediaProperties.height, setWidth, setHeight]);

  useEffect(() => {
    setContextTime(currentTime);
  }, [currentTime, setContextTime]);

  useEffect(() => {
    setContextIsPlaying(isPlaying);
  }, [isPlaying, setContextIsPlaying]);

  // Sync video duration with context when loaded
  useEffect(() => {
    const video = mediaRef?.current;
    if (video && fileType === "video") {
      const updateDuration = () => {
        if (video.duration && !isNaN(video.duration)) {
          setDuration(video.duration);
        }
      };
      
      // Check if already loaded
      if (video.readyState >= 1 && video.duration && !isNaN(video.duration)) {
        updateDuration();
      }
      
      video.addEventListener('loadedmetadata', updateDuration);
      return () => {
        video.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [mediaRef?.current, fileType, setDuration]);

  // Handle file type change from Addmedia component
  const handleFileTypeChange = (type) => {
    setFileType(type);
    setContextFileType(type);
    
    // Reset playback state when changing file type
    setIsPlaying(false);
    setContextIsPlaying(false);
    setCurrentTime(0);
    setContextTime(0);
  };

  // Handle file change 
  const handleFileChange = (newFile) => {
    // Clean up previous file URL if exists
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    
    // Reset contexts when changing file
    resetTimeContext();
    setCurrentTime(0);
    setIsPlaying(false);
    setContextIsPlaying(false);
    
    setFile(newFile);
    if (newFile) {
      const url = URL.createObjectURL(newFile);
      setFileUrl(url);
      
      // Reset media properties to default when a new file is loaded
      const defaultWidth = 640;
      const defaultHeight = 360;
      
      setMediaProperties({
        x: 0,
        y: 0,
        width: defaultWidth,
        height: defaultHeight,
        startTime: 0,
        endTime: Infinity
      });
    } else {
      setFileUrl(null);
    }
  };

  return (
    <Group className="main-window" gap="0">
      <Navbar activeCard={activeCard} setActiveCard={setActiveCard} />
      <Box className="edit-window">
        <Box className="edit-grp" gap="0">
          <Box className="add-media">
            <Addmedia
              setFileType={handleFileTypeChange}
              setFile={handleFileChange}
            />
          </Box>
          <Box className="video-section">
            <Topbar />
            <Stack className="video-container" align="center">
              {fileType === "video" && file ? (
                <Editor
                  media={{
                    type: 'video',
                    url: fileUrl
                  }}
                  mediaProperties={mediaProperties}
                  setMediaProperties={setMediaProperties}
                  isPlaying={isPlaying}
                  currentTime={currentTime}
                  ref={mediaRef}
                />
              ) : fileType === "image" && file ? (
                <Editor
                  media={{
                    type: 'image',
                    url: fileUrl
                  }}
                  mediaProperties={mediaProperties}
                  setMediaProperties={setMediaProperties}
                  ref={mediaRef}
                />
              ) : (
                // Default placeholder when no file is uploaded
                <Box
                  className="video"
                  style={{
                    aspectRatio: aspectRatio,
                    backgroundColor: color,
                    width: '100%',
                    maxWidth: '640px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                  }}
                >
                  {!file && "Media Preview"}
                </Box>
              )}
            </Stack>
          </Box>
        </Box>
        <Footer
          fileType={fileType}
          videoRef={mediaRef}
          audioUrl={audioUrl}
          mediaProperties={mediaProperties}
          setMediaProperties={setMediaProperties}
          setCurrentTime={setCurrentTime}
          setIsPlaying={setIsPlaying}
        />
      </Box>
    </Group>
  );
};

export default function Home() {
  return (
    <FileProvider>
      <SizeProvider>
        <TimeProvider>
          <PlaybackProvider>
            <EditorWithContexts />
          </PlaybackProvider>
        </TimeProvider>
      </SizeProvider>
    </FileProvider>
  );
}