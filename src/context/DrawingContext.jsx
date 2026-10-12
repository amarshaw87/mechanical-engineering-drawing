import React, { createContext, useContext, useState } from 'react';

const DrawingContext = createContext();

export function DrawingProvider({ children }) {
  const [activeMode, setActiveMode] = useState('LINE');
  const [telemetry, setTelemetry] = useState({ x: 0, y: 0 });
  const [vectorCount, setVectorCount] = useState(0);
  
  // 🟢 FIXED: The master vector list lives here now so all components can access it safely!
  const [shapesHistory, setShapesHistory] = useState([]);

  const updateTelemetry = (x, y) => {
    setTelemetry({ x, y });
  };

  const incrementVectorCount = () => {
    setVectorCount((prev) => prev + 1);
  };

  const clearGlobalWorkspace = () => {
    setShapesHistory([]);
    setVectorCount(0);
  };

  return (
    <DrawingContext.Provider
      value={{
        activeMode,
        setActiveMode,
        telemetry,
        updateTelemetry,
        vectorCount,
        incrementVectorCount,
        shapesHistory,
        setShapesHistory,
        clearGlobalWorkspace
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
}

export function useDrawing() {
  return useContext(DrawingContext);
}
