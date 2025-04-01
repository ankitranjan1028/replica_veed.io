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
  const { fileUrl, setFileUrl, fileType: contextFileType, setFileType: setContextFileType, fileName, setFileName } = useFileContext();
  const { width, setWidth, height, setHeight } = useSizeContext();
  const { currentTime, setCurrentTime, duration, setDuration, resetTimeContext } = useTimeContext();
  const { isPlaying, setIsPlaying } = usePlaybackContext();

  const [activeCard, setActiveCard] = useState(false);
  const [fileType, setFileType] = useState("none");
  const [aspectRatio, setAspectRatio] = useState("16/9");
  const [color, setColor] = useState("#000000");
  const [file, setFile] = useState(null);
  const mediaRef = useRef(null);
  const [mediaProperties, setMediaProperties] = useState({
    x: 0,
    y: 0,
    width: 640, // Default width
    height: 360, // Default height
    startTime: 0,
    endTime: Infinity
  });

  // Reset state completely when switching file types
  const resetAllStates = () => {
    setIsPlaying(false);
    resetTimeContext();
    // Small delay to ensure contexts are reset before new media loads
    setTimeout(() => {
      if (mediaRef.current && typeof mediaRef.current.getVideoElement === 'function') {
        const videoEl = mediaRef.current.getVideoElement();
        if (videoEl) {
          videoEl.currentTime = 0;
        }
      }
    }, 50);
  };

  // Sync file type between local state and context
  useEffect(() => {
    if (fileType !== contextFileType) {
      setContextFileType(fileType);
    }
  }, [fileType, contextFileType, setContextFileType]);

  // Update size context when media properties change
  useEffect(() => {
    setWidth(mediaProperties.width.toString());
    setHeight(mediaProperties.height.toString());
  }, [mediaProperties.width, mediaProperties.height, setWidth, setHeight]);

  // Handle file type change from Addmedia component
  const handleFileTypeChange = (type) => {
    // Reset all playback and time state when changing file type
    resetAllStates();
    setFileType(type);
    setContextFileType(type);
  };

  // Handle file change 
  const handleFileChange = (newFile) => {
    // Clean up previous file URL if exists
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    
    // Reset contexts when changing file
    resetAllStates();
    
    setFile(newFile);
    if (newFile) {
      const url = URL.createObjectURL(newFile);
      setFileUrl(url);
      
      // Update file name in context
      setFileName(newFile.name);
      
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
      setFileName(null);
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
          mediaProperties={mediaProperties}
          setMediaProperties={setMediaProperties}
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