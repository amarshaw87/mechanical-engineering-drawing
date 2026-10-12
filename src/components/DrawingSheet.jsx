import React, { useRef, useEffect, useState } from 'react';
import { useDrawing } from '../context/DrawingContext';
import useDrawingEngine from '../hooks/useDrawingEngine';

export default function DrawingSheet() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Access global CAD configuration parameters from React state stream context
  const { activeMode, updateTelemetry, incrementVectorCount } = useDrawing();
  
  // Initialize calculations logic from your mathematical engine hook pipeline
  const { 
    shapesHistory,
    setShapesHistory, 
    currentDraftShapeRef, 
    drawAllVectorsToCanvas 
  } = useDrawingEngine();

  // WATCH FIX: Watch history array directly instead of tracking the drawing engine function itself
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    drawAllVectorsToCanvas(context);
  }, [shapesHistory]); // Safe boundary watch execution 

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const calibratedX = e.clientX - rect.left;
    const calibratedY = e.clientY - rect.top;

    setIsDrawing(true);

    currentDraftShapeRef.current = {
      type: activeMode,
      startX: calibratedX,
      startY: calibratedY,
      endX: calibratedX,
      endY: calibratedY,
    };

    updateTelemetry(calibratedX, calibratedY);
    
    const context = canvas.getContext('2d');
    drawAllVectorsToCanvas(context);
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const calibratedX = e.clientX - rect.left;
    const calibratedY = e.clientY - rect.top;

    updateTelemetry(calibratedX, calibratedY);

    if (!isDrawing) return;

    currentDraftShapeRef.current = {
      ...currentDraftShapeRef.current,
      endX: calibratedX,
      endY: calibratedY,
    };

    const context = canvas.getContext('2d');
    drawAllVectorsToCanvas(context);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentDraftShapeRef.current) {
      setShapesHistory((prev) => [...prev, currentDraftShapeRef.current]);
      incrementVectorCount();
      currentDraftShapeRef.current = null;
    }
  };

  return (
    <div className="flex justify-center my-6">
      <div className="relative border border-slate-200 rounded-lg shadow-inner bg-white overflow-hidden">
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
