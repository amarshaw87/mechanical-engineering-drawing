import { useState, useRef } from 'react';

export default function useDrawingEngine() {
  // 1. Array state holding the master list of all permanently drawn geometric shapes
  const [shapesHistory, setShapesHistory] = useState([]);
  
  // 2. Ref tracking temporary drawing shapes during an active drag-and-draw mouse sequence
  // Using useRef here stops React from lagging your computer on every single pixel movement
  const currentDraftShapeRef = useRef(null);

  // 3. Clear the whole drawing database matrix workspace back to zero
  const clearCanvasVectorGrid = () => {
    setShapesHistory([]);
    currentDraftShapeRef.current = null;
  };

  // 4. Mathematical Engine Pipeline: Loops and redraws the whiteboard viewport instantly
  const drawAllVectorsToCanvas = (context2D) => {
    if (!context2D) return;

    // Clear the pixel screen buffer entirely before drawing updates
    const canvasElement = context2D.canvas;
    context2D.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Set professional drafting pen styling profiles
    context2D.strokeStyle = '#1e293b'; // Dark blue-gray charcoal lines
    context2D.lineWidth = 2;
    context2D.lineCap = 'round';

    // A. Cycle and redraw every shape stored in our historical vector list array
    shapesHistory.forEach((shape) => {
      drawIndividualPrimitive(context2D, shape);
    });

    // B. Draw our current mouse drag preview shape on top if one is active
    if (currentDraftShapeRef.current) {
      context2D.strokeStyle = '#2563eb'; // Bright blue vector highlight pen for active drafts
      context2D.setLineDash([4, 4]); // Use dashed line formatting for active previews
      drawIndividualPrimitive(context2D, currentDraftShapeRef.current);
      context2D.setLineDash([]); // Reset line formatting back to solid parameters
    }
  };

  // Helper routine containing explicit raw coordinate matrix math algorithms
  const drawIndividualPrimitive = (ctx, shape) => {
    ctx.beginPath();
    
    if (shape.type === 'LINE') {
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
    } 
    else if (shape.type === 'CIRCLE') {
      // Euclidean Distance formula to calculate precise radius from starting vector anchor
      const radius = Math.sqrt(
        Math.pow(shape.endX - shape.startX, 2) + 
        Math.pow(shape.endY - shape.startY, 2)
      );
      ctx.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
    } 
    else if (shape.type === 'RECTANGLE') {
      const width = shape.endX - shape.startX;
      const height = shape.endY - shape.startY;
      ctx.rect(shape.startX, shape.startY, width, height);
    }
    
    ctx.stroke();
  };

  return {
    shapesHistory,
    setShapesHistory,
    currentDraftShapeRef,
    clearCanvasVectorGrid,
    drawAllVectorsToCanvas
  };
}
