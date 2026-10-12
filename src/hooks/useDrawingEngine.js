import React, { useRef, useEffect, useState } from 'react';
import { useDrawing } from '../context/DrawingContext';
import useDrawingEngine from '../hooks/useDrawingEngine';

export default function DrawingSheet() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Access global CAD configuration parameters from React state stream context
  const { activeMode, updateTelemetry, incrementVectorCount } = useDrawing();
  
  // Initialize calculations logic from your mathematical engine hook pipeline
  const { 
    setShapesHistory, 
    currentDraftShapeRef, 
    drawAllVectorsToCanvas 
  } = useDrawingEngine();

  // Watch for history array database adjustments to update pixels instantly
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    drawAllVectorsToCanvas(context);
  }, [drawAllVectorsToCanvas]);

  // Handle initial mouse click (Vector Start Anchor)
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // FIX: Calculate boundaries relative strictly to your grid canvas container box
    const rect = canvas.getBoundingClientRect();
    const calibratedX = e.clientX - rect.left;
    const calibratedY = e.clientY - rect.top;

    setIsDrawing(true);
    setStartPos({ x: calibratedX, y: calibratedY });

    // Initialize temporary blueprint line properties
    currentDraftShapeRef.current = {
      type: activeMode,
      startX: calibratedX,
      startY: calibratedY,
      endX: calibratedX,
      endY: calibratedY,
    };

    updateTelemetry(calibratedX, calibratedY);
    
    // Draw initial click reference point
    const context = canvas.getContext('2d');
    drawAllVectorsToCanvas(context);
  };

  // Handle active mouse movement (Dashed Drafting Preview Paths)
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // FIX: Calibrate current positions by subtracting outside margins and layouts
    const rect = canvas.getBoundingClientRect();
    const calibratedX = e.clientX - rect.left;
    const calibratedY = e.clientY - rect.top;

    // Update real-time telemetry positions in the dark monitor control block
    updateTelemetry(calibratedX, calibratedY);

    if (!isDrawing) return;

    // Update coordinates for dynamic calculations (Radius / Width Matrix)
    currentDraftShapeRef.current = {
      ...currentDraftShapeRef.current,
      endX: calibratedX,
      endY: calibratedY,
    };

    const context = canvas.getContext('2d');
    drawAllVectorsToCanvas(context);
  };

  // Handle mouse release (Commit Permanent Shape Object Vector)
  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentDraftShapeRef.current) {
      // Append completed draft primitive into historical vector database array
      setShapesHistory((prev) => [...prev, currentDraftShapeRef.current]);
      incrementVectorCount();
      
      // Flush draft layer memory to prepare for next shape initialization
      currentDraftShapeRef.current = null;
    }
  };

  return (
    <div className="flex justify-center my-6">
      <div className="relative border border-slate-200 rounded-lg shadow-inner bg-white overflow-hidden">
        {/* HTML5 CAD Drawing Sheet Grid */}
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="cursor-crosshair block"
          style={{
            backgroundImage: 'linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>
    </div>
  );
}
