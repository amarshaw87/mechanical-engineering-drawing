import React, { useRef, useEffect, useState } from 'react';
import { useDrawing } from '../context/DrawingContext';
import useDrawingEngine from '../hooks/useDrawingEngine';

export default function DrawingSheet() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Pull functions directly from your Context Provider
  const { activeMode, updateTelemetry, incrementVectorCount } = useDrawing();
  
  // Pull functions directly from your Drawing Engine Hook
  const { 
    shapes,              // Matched to your exact variable name
    setShapes,           // Matched to your exact variable name
    currentDraftShapeRef, 
    drawAllVectorsToCanvas 
  } = useDrawingEngine();

  // Redraw the canvas whenever your shapes database changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    drawAllVectorsToCanvas(context);
  }, [shapes, drawAllVectorsToCanvas]); // Redraw on shape changes

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Calculate canvas bounding area to fix the coordinate offset bug
    const rect = canvas.getBoundingClientRect();
    const calibratedX = e.clientX - rect.left;
    const calibratedY = e.clientY - rect.top;

    setIsDrawing(true);
    setStartPos({ x: calibratedX, y: calibratedY });

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

    // Send coordinates to the dark telemetry monitor screen block
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
      // Add the finished draft into your shape history array
      setShapes((prev) => [...prev, currentDraftShapeRef.current]);
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
