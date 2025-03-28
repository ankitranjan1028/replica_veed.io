"use client"; 
import { Box, Group, Stack } from "@mantine/core"; 
import Navbar from "../components/navbar/Navbar"; 
import { useState, useRef } from "react"; 
import "./globals.css"; 
import Footer from "@/components/footer/Footer"; 
import Topbar from "@/components/topbar/Topbar"; 
import Addmedia from "@/components/addmedia/Addmedia"; 
import "@mantine/carousel/styles.css"; 
import Editor from "@/components/editor/Editor"; 
import Addfile from "@/components/addfile/Addfile";

export default function Home() {
  const [activeCard, setActiveCard] = useState(false);
  const [addFileWindow, setAddFileWindow] = useState(false);
  const [fileType, setFileType] = useState("none");
  const [aspectRatio, setAspectRatio] = useState("16/9");
  const [color, setColor] = useState("#000000");
  const [file, setFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [mediaProperties, setMediaProperties] = useState({
    x: 0,
    y: 0,
    width: 640,
    height: 360,
    startTime: 0,
    endTime: Infinity
  });

  return (
    <Group className="main-window" gap="0">
      {addFileWindow && (
        <Addfile
          setAddFileWindow={setAddFileWindow}
          setFileType={setFileType}
          setFile={setFile}
          setAudioUrl={setAudioUrl}
        />
      )}
      <Navbar activeCard={activeCard} setActiveCard={setActiveCard} />
      <Box className="edit-window">
        <Box className="edit-grp" gap="0">
          <Box className="add-media">
            <Addmedia
              setFileType={setFileType} 
              setFile={setFile}
            />
          </Box>
          <Box className="video-section">
            <Topbar />
            <Stack className="video-container" align="center">
              {fileType === "video" && file ? (
                <Editor
                  media={{
                    type: 'video',
                    url: URL.createObjectURL(file)
                  }}
                  mediaProperties={mediaProperties}
                  setMediaProperties={setMediaProperties}
                  isPlaying={isPlaying}
                  currentTime={currentTime}
                  ref={videoRef}
                />
              ) : (
                <Box
                  className="video"
                  style={{
                    aspectRatio: aspectRatio,
                    backgroundColor: color
                  }}
                >
                  {!file && "Video"}
                </Box>
              )}
            </Stack>
          </Box>
        </Box>
        <Footer
          setAddFileWindow={setAddFileWindow}
          fileType={fileType}
          videoRef={videoRef}
          audioUrl={audioUrl}
          mediaProperties={mediaProperties}
          setCurrentTime={setCurrentTime}
          setIsPlaying={setIsPlaying}
        />
      </Box>
    </Group>
  );
}