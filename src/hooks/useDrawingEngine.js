import { useState, useRef, useCallback } from 'react';

export default function useDrawingEngine() {
  // Array state holding the master list of all permanently drawn geometric shapes
  const [shapesHistory, setShapesHistory] = useState([]);
  
  // Ref tracking temporary drawing shapes during an active drag-and-draw mouse sequence
  const currentDraftShapeRef = useRef(null);

  // Clear the whole drawing database matrix workspace back to zero
  const clearCanvasVectorGrid = useCallback(() => {
    setShapesHistory([]);
    currentDraftShapeRef.current = null;
  }, []);

  // Helper routine containing explicit raw coordinate matrix math algorithms
  const drawIndividualPrimitive = useCallback((ctx, shape) => {
    if (!shape) return;
    ctx.beginPath();
    
    if (shape.type === 'LINE') {
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
    } 
    else if (shape.type === 'CIRCLE') {
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
  }, []);

  // PERFORMANCE PROTECTION: Wrapped inside a memoized callback to prevent infinite render loops
  const drawAllVectorsToCanvas = useCallback((context2D) => {
    if (!context2D) return;

    const canvasElement = context2D.canvas;
    context2D.clearRect(0, 0, canvasElement.width, canvasElement.height);

    context2D.strokeStyle = '#1e293b'; 
    context2D.lineWidth = 2;
    context2D.lineCap = 'round';

    // A. Cycle and redraw every shape stored in our historical vector list array
    shapesHistory.forEach((shape) => {
      drawIndividualPrimitive(context2D, shape);
    });

    // B. Draw our current mouse drag preview shape on top if one is active
    if (currentDraftShapeRef.current) {
      context2D.strokeStyle = '#2563eb'; 
      context2D.setLineDash([4, 4]); 
      drawIndividualPrimitive(context2D, currentDraftShapeRef.current);
      context2D.setLineDash([]); 
    }
  }, [shapesHistory, drawIndividualPrimitive]);

  return {
    shapesHistory,
    setShapesHistory,
    currentDraftShapeRef,
    clearCanvasVectorGrid,
    drawAllVectorsToCanvas
  };
}
