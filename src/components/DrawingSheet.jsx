import React, { useRef, useEffect, useState } from 'react';
import { useDrawing } from '../context/DrawingContext';
import useDrawingEngine from '../hooks/useDrawingEngine';

export default function DrawingSheet() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const { 
    activeMode, 
    updateTelemetry, 
    incrementVectorCount, 
    shapesHistory, 
    setShapesHistory 
  } = useDrawing();
  
  const { currentDraftShapeRef, drawAllVectorsToCanvas } = useDrawingEngine();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    drawAllVectorsToCanvas(context, shapesHistory);
  }, [shapesHistory, drawAllVectorsToCanvas]);

  // 🧲 SNAP FILTER: Math rounding equation forces pixels to align to the 20px grid layout squares
  const snapToGridValue = (value, gridSize = 20) => {
    return Math.round(value / gridSize) * gridSize;
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    
    // Apply snapping to the starting anchor point click!
    const calibratedX = snapToGridValue(e.clientX - rect.left);
    const calibratedY = snapToGridValue(e.clientY - rect.top);

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
    drawAllVectorsToCanvas(context, shapesHistory);
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    
    // Continuous grid mapping calibration alignment filter 
    const calibratedX = snapToGridValue(e.clientX - rect.left);
    const calibratedY = snapToGridValue(e.clientY - rect.top);

    updateTelemetry(calibratedX, calibratedY);

    if (!isDrawing) return;

    currentDraftShapeRef.current = {
      ...currentDraftShapeRef.current,
      endX: calibratedX,
      endY: calibratedY,
    };

    const context = canvas.getContext('2d');
    drawAllVectorsToCanvas(context, shapesHistory);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentDraftShapeRef.current) {
      const completedShapeSnapshot = { ...currentDraftShapeRef.current };
      setShapesHistory((prev) => [...prev, completedShapeSnapshot]);
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
