"use client";
import { Box, Button, Autocomplete, Group, ColorInput } from "@mantine/core";
import "./Buttons.css";
import { BsThreeDots } from "react-icons/bs";
import { FaVolumeDown } from "react-icons/fa";
import { RiSpeedUpLine } from "react-icons/ri";
import { MdAnimation } from "react-icons/md";
import { TbTransitionRightFilled } from "react-icons/tb";
import { SiCodemagic } from "react-icons/si";
import { useState } from "react";

const Buttons = ({ setAspectRatio, setColor, fileType }) => {
  const [selectedOption, setSelectedOption] = useState("Wide Landscape (16:9)");
  const data = ["YouTube (16:9)", "YouTube Short (9:16)", "TikTok (9:16)", "Instagram Post (1:1)", "Instagram Story (9:16)", "Instagram Reel (9:16)", "LinkedIn (1:1)", "X (Twitter) (1:1)", "Facebook Post (1:1)", "Facebook Story (9:16)", "Facebook Video (1:1)", "Snapchat (9:16)", "Tall Potrait (9:16)", "Potrait (4:5)", "Square (1:1)", "Landscape (5:4)", "Wide Landscape (16:9)"];

  const handleOptionChange = (option) => {
    // console.log("option", option);
    setSelectedOption(option);
    const aspectRatio = option.split("(")[1]?.split(")")[0]?.replace(":", "/");
    // console.log("aspectratio: ", aspectRatio);
    if (aspectRatio) {
      const [a, b] = aspectRatio.split("/");
      if ((a > 1 && b > 1) || (a == 1 && b == 1)) {
        setAspectRatio(aspectRatio);
      }
    }
  };
  return (
    <Box className="buttons">
      <Box className={`none ${fileType === "none" ? "" : "hidden"}`}>
        <Box className="none-btn">
          <Autocomplete className="autocomplete" placeholder="Pick value or enter anything" data={data} withScrollArea={false} styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }} comboboxProps={{ dropdownPadding: 10 }} value={selectedOption} onChange={handleOptionChange} />
        </Box>
        <Box className="none-btn">
          <ColorInput placeholder="Background" onChangeEnd={setColor} />
        </Box>
      </Box>
      <Box className={`audio ${fileType !== "none" ? "" : "hidden"}`}>
        <Box className="magictools">
          <SiCodemagic /> Magic Tools
        </Box>
        <Group gap="0" className="at">
          <Box className="animations">
            <MdAnimation /> Animations
          </Box>
          <Box className="transitions">
            <TbTransitionRightFilled /> Transitions
          </Box>
        </Group>
        <Group gap="0">
          <Box className="vol">
            <FaVolumeDown /> Volume
          </Box>
          <Box className="speed">
            <RiSpeedUpLine /> Speed
          </Box>
        </Group>
        <Box className="audio-dots">
          <BsThreeDots className="dots" />
        </Box>
      </Box>
    </Box>
  );
};

export default Buttons;
