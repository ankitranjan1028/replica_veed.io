"use client";
import { createContext, useContext, useState } from "react";

const SizeContext = createContext();

export const SizeProvider = ({ children }) => {
  const [width, setWidth] = useState(290);
  const [height, setHeight] = useState(290);

  return (
    <SizeContext.Provider value={{ width, setWidth, height, setHeight }}>
      {children}
    </SizeContext.Provider>
  );
};

export const useSizeContext = () => useContext(SizeContext);
