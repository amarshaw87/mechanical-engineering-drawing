import React, { useRef, useEffect, useState } from 'react';
import { useDrawing } from '../context/DrawingContext';

export default function DrawingSheet({ drawAllVectorsToCanvas, currentDraftShapeRef, setShapesHistory }) {
  const sheetRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  const { activeTool, updateTelemetry } = useDrawing();

  // Initialize and scale the HTML5 2D render context
  useEffect(() => {
    const sheet = sheetRef.current;
    sheet.width = sheet.parentElement.clientWidth;
    sheet.height = 450; // Standard layout pixel boundary

    const context = sheet.getContext('2d');
    contextRef.current = context;
    
    // Perform initial clear frame repaint
    drawAllVectorsToCanvas(context);
  }, []);

  // Frame monitor loop: Trigger grid redraw sequence whenever a draft update changes
  const updateDisplayFrame = () => {
    if (contextRef.current) {
      drawAllVectorsToCanvas(contextRef.current);
    }
  };

  // Extract relative localized layout boundaries from raw screen cursor clicks
  const getCoordinates = (e) => {
    const sheet = sheetRef.current;
    const rect = sheet.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  // Mouse Pressed Down Event Sequence Trigger
  const handlePointerDown = (e) => {
    const coords = getCoordinates(e);
    setIsDrawing(true);
    setStartPos(coords);

    // Seed temporary vector reference blueprint values
    currentDraftShapeRef.current = {
      type: activeTool,
      startX: coords.x,
      startY: coords.y,
      endX: coords.x,
      endY: coords.y
    };
    updateDisplayFrame();
  };

  // Mouse Moving Over Grid Event Sequence Trigger
  const handlePointerMove = (e) => {
    const coords = getCoordinates(e);
    updateTelemetry(coords.x, coords.y); // Sync data channel telemetry readout streams

    if (!isDrawing) return;

    // Mutate draft coordinate matrix array variables live on drag
    if (currentDraftShapeRef.current) {
      currentDraftShapeRef.current.endX = coords.x;
      currentDraftShapeRef.current.endY = coords.y;
    }
    updateDisplayFrame();
  };

  // Mouse Released Event Sequence Trigger
  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    // Commit transient draft parameters safely to permanent shapes database history array
    if (currentDraftShapeRef.current) {
      setShapesHistory((prev) => [...prev, currentDraftShapeRef.current]);
      currentDraftShapeRef.current = null; // Clean active reference path register
    }
    updateDisplayFrame();
  };

  return (
    <div className="w-full bg-white border border-gray-300 rounded-lg shadow-inner overflow-hidden relative">
      {/* Absolute layout alignment grid backdrop for clean mechanical drawing context orientation */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:20px_20px] opacity-70"></div>
      
      <canvas
        ref={sheetRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        className="block w-full relative z-10 cursor-crosshair bg-transparent"
      />
    </div>
  );
}
