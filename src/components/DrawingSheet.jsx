import React, { useRef, useEffect, useState } from 'react';
import { useDrawing } from '../context/DrawingContext';
import useDrawingEngine from '../hooks/useDrawingEngine';

export default function DrawingSheet() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 1. Extract values safely from your Global Context
  const contextData = useDrawing() || {};
  const activeMode = contextData.activeMode || 'LINE';
  const updateTelemetry = contextData.updateTelemetry || (() => {});
  const incrementVectorCount = contextData.incrementVectorCount || (() => {});
  
  // 2. Extract tools safely from your Drawing Engine Hook
  const engine = useDrawingEngine() || {};
  const setShapes = engine.setShapes || engine.setShapesHistory || (() => {});
  const currentDraftShapeRef = engine.currentDraftShapeRef || { current: null };
  const drawAllVectorsToCanvas = engine.drawAllVectorsToCanvas;

  // 3. FIX THE LOOP: Use a single, simplified useEffect to draw on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof drawAllVectorsToCanvas !== 'function') return;
    
    const context = canvas.getContext('2d');
    if (context) {
      drawAllVectorsToCanvas(context);
    }
    // We only trigger updates based on raw list mutations, breaking the loop!
  }, [engine.shapes, engine.shapesHistory]);

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
    if (context && typeof drawAllVectorsToCanvas === 'function') {
      drawAllVectorsToCanvas(context);
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const calibratedX = e.clientX - rect.left;
    const calibratedY = e.clientY - rect.top;

    updateTelemetry(calibratedX, calibratedY);

    if (!isDrawing || !currentDraftShapeRef.current) return;

    currentDraftShapeRef.current = {
      ...currentDraftShapeRef.current,
      endX: calibratedX,
      endY: calibratedY,
    };

    const context = canvas.getContext('2d');
    if (context && typeof drawAllVectorsToCanvas === 'function') {
      drawAllVectorsToCanvas(context);
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentDraftShapeRef.current) {
      setShapes((prev) => [...(prev || []), currentDraftShapeRef.current]);
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
