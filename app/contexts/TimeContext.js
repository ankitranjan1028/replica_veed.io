"use client";
import React, { createContext, useState, useContext } from "react";

const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Add a reset function to properly clear all time-related state
  const resetTimeContext = () => {
    setStartTime(0);
    setEndTime(0);
    setCurrentTime(0);
    setDuration(0);
  };

  return (
    <TimeContext.Provider
      value={{
        startTime, setStartTime,
        endTime, setEndTime,
        currentTime, setCurrentTime,
        duration, setDuration,
        resetTimeContext
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export const useTimeContext = () => useContext(TimeContext);