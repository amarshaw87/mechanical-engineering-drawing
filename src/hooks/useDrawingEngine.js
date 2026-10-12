import { useRef, useCallback } from 'react';

export default function useDrawingEngine() {
  // We remove the internal useState to let your Canvas handle the master list tracking directly
  const currentDraftShapeRef = useRef(null);

  // Core geometric primitive mathematical algorithms
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

  // Exposed rendering handler: accepts your live canvas layout shape lists directly
  const drawAllVectorsToCanvas = useCallback((context2D, structuralHistoryArray = []) => {
    if (!context2D) return;

    const canvasElement = context2D.canvas;
    context2D.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Set professional vector pen styling profiles
    context2D.strokeStyle = '#1e293b'; 
    context2D.lineWidth = 2;
    context2D.lineCap = 'round';

    // A. Cycle and redraw every shape from the live active workspace history list
    structuralHistoryArray.forEach((shape) => {
      drawIndividualPrimitive(context2D, shape);
    });

    // B. Draw our current mouse drag preview shape on top if one is active
    if (currentDraftShapeRef.current) {
      context2D.strokeStyle = '#2563eb'; 
      context2D.setLineDash([4, 4]); // Restored your professional dashed drafting path previews!
      drawIndividualPrimitive(context2D, currentDraftShapeRef.current);
      context2D.setLineDash([]); 
    }
  }, [drawIndividualPrimitive]);

  return {
    currentDraftShapeRef,
    drawAllVectorsToCanvas
  };
}
