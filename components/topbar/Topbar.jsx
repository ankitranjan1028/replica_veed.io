"use client";
import "./Topbar.css";
import { Group, Input, Box, NavLink, Button } from "@mantine/core";
import { IoCloudOfflineOutline } from "react-icons/io5";
import { LuUndo } from "react-icons/lu";
import { LuRedo } from "react-icons/lu";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { useFileContext } from "@/app/contexts/FileContext";

const Topbar = () => {
  const { fileName } = useFileContext();
  
  return (
    <Group className="topbar" gap="0">
      <Group className="top-left" gap="6">
        <Group className="lgintoprog" gap="6">
          <IoCloudOfflineOutline />
        </Group>
        <Input 
          className="project-name" 
          placeholder="Project Name"
          value={fileName || ""}
        />
        <Group gap="20" ml="auto" mr="20px">
          <LuUndo className="undo" />
          <LuRedo className="redo" />
        </Group>
      </Group>
      <Group className="top-right">
        <a href="">Sign Up</a>
        <a href="">Log In</a>
        <button className="upgrade">
          Upgrade
          <Box className="icon-bg">
            <AiOutlineThunderbolt />
          </Box>
        </button>
        <button className="done">
          Done <FaCheck className="check-icon" />
        </button>
      </Group>
    </Group>
  );
};

export default Topbar;