import React, { createContext, useState, useContext } from 'react';

// 1. Initializing the global Drawing state channel
const DrawingContext = createContext();

// 2. The Provider component wrapping our drawing board workspace
export function DrawingProvider({ children }) {
  // State tracking the active drawing selection tool ('LINE', 'CIRCLE', 'RECTANGLE', 'SELECT')
  const [activeTool, setActiveTool] = useState('LINE');
  
  // Telemetry state to monitor live mouse coordinates
  const [pointerCoordinates, setPointerCoordinates] = useState({ x: 0, y: 0 });

  // Function to update coordinates on high-frequency mouse movements
  const updateTelemetry = (x, y) => {
    setPointerCoordinates({ x: Math.round(x), y: Math.round(y) });
  };

  // Reset operation tool setting back to default select mode
  const resetActiveTool = () => {
    setActiveTool('SELECT');
  };

  return (
    <DrawingContext.Provider value={{
      activeTool,
      setActiveTool,
      pointerCoordinates,
      updateTelemetry,
      resetActiveTool
    }}>
      {children}
    </DrawingContext.Provider>
  );
}

// 3. Custom hook wrapper for immediate extraction across layout modules
export function useDrawing() {
  return useContext(DrawingContext);
}
