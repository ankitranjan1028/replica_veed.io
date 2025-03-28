"use client";
import React, { useState } from "react";
import { Box, Stack, Center } from "@mantine/core";
import "./Navbar.css";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { TbLetterV } from "react-icons/tb";
import { IoVideocamOutline } from "react-icons/io5";
import { LiaFileAudioSolid } from "react-icons/lia";
import { PiSubtitlesLight } from "react-icons/pi";
import { CiText } from "react-icons/ci";
import { LiaElementor } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { TbBrandPagekit } from "react-icons/tb";
// import Card from "./HamburgerCard/Card";



const Navbar = ({ activeCard, setActiveCard }) => {
  const [activeIcon, setActiveIcon] = useState("");

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };

  return (
    <Stack className="navbar">
      <Box className="top">
        <Center className="icon-container" onClick={() => setActiveCard((prev) => !prev)}>
          <img src="/assets/images.jpeg" style={{ width: "50px", height: "50px", borderRadius: "20%"}}/>
        </Center>
        <Center className={`icon-container ${activeIcon === "brand-kit" ? "active" : ""}`} onClick={() => handleIconClick("brand-kit")}>
          <Box className="circle">
            <TbBrandPagekit className="icon" />
          </Box>
          <span>Brand Kit</span>
        </Center>
        <Center className={`icon-container ${activeIcon === "video" ? "active" : ""}`} onClick={() => handleIconClick("video")}>
          <Box className="circle">
            <IoVideocamOutline className="icon" />
          </Box>
          <span>Video</span>
        </Center>
        <Center className={`icon-container ${activeIcon === "audio" ? "active" : ""}`} onClick={() => handleIconClick("audio")}>
          <Box className="circle">
            <LiaFileAudioSolid className="icon" />
          </Box>
          <span>Audio</span>
        </Center>
        <Center className={`icon-container ${activeIcon === "subtitles" ? "active" : ""}`} onClick={() => handleIconClick("subtitles")}>
          <Box className="circle">
            <PiSubtitlesLight className="icon" />
          </Box>
          <span>Subtitles</span>
        </Center>
        <Center className={`icon-container ${activeIcon === "text" ? "active" : ""}`} onClick={() => handleIconClick("text")}>
          <Box className="circle">
            <CiText className="icon" />
          </Box>
          <span>Text</span>
        </Center>
        <Center className={`icon-container ${activeIcon === "elements" ? "active" : ""}`} onClick={() => handleIconClick("elements")}>
          <Box className="circle">
            <LiaElementor className="icon" />
          </Box>
          <span>Elements</span>
        </Center>
        <Center className={`icon-container ${activeIcon === "settings" ? "active" : ""}`} onClick={() => handleIconClick("settings")}>
          <Box className="circle">
            <IoSettingsOutline className="icon" />
          </Box>
          <span>Settings</span>
        </Center>
      </Box>
    </Stack>
  );
};

export default Navbar;
