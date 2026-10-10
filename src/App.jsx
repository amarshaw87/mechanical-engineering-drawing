import React, { useEffect } from 'react';
import { DrawingProvider } from './context/DrawingContext';
import useDrawingEngine from './hooks/useDrawingEngine';
import ToolBar from './components/ToolBar';
import DrawingSheet from './components/DrawingSheet';
import Inspector from './components/Inspector';

function MechanicalDrawingWorkspace() {
  // Extract hook capabilities to bind downstream layouts natively
  const {
    shapesHistory,
    setShapesHistory,
    currentDraftShapeRef,
    clearCanvasVectorGrid,
    drawAllVectorsToCanvas
  } = useDrawingEngine();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans text-xs">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Workspace Heading Title Branding Layout */}
        <header className="text-center border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Mechanical Engineering Drawing Workspace
          </h1>
          <p className="text-slate-600 mt-1">
            Precision 2D Vector Engine • Blueprint Layout Drafting Algorithm • Designed by Amar Shaw
          </p>
        </header>

        {/* Operational Task Controller Strip */}
        <ToolBar onClearCanvas={clearCanvasVectorGrid} />

        {/* Primary Functional Interface Split Row Layout */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* Main Layout Drawing Sheet Element Layer */}
          <div className="flex-1 w-full">
            <DrawingSheet
              drawAllVectorsToCanvas={drawAllVectorsToCanvas}
              currentDraftShapeRef={currentDraftShapeRef}
              setShapesHistory={setShapesHistory}
            />
          </div>

          {/* Side Structural Metadata Telemetry Panel */}
          <div className="w-full md:w-auto">
            <Inspector totalShapes={shapesHistory.length} />
          </div>

        </div>

      </div>
    </div>
  );
}

// Final wrapper layer joining your components with the global context highway mesh
export default function App() {
  return (
    <DrawingProvider>
      <MechanicalDrawingWorkspace />
    </DrawingProvider>
  );
}
