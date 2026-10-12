import React from 'react';
import { DrawingProvider, useDrawing } from './context/DrawingContext';
import useDrawingEngine from './hooks/useDrawingEngine';
import ToolBar from './components/ToolBar';
import DrawingSheet from './components/DrawingSheet';
import Inspector from './components/Inspector';

function MechanicalDrawingWorkspace() {
  // 1. Pull the master shape database directly out of your global context manager
  const { shapesHistory } = useDrawing();

  // 2. Pull calculations handlers out of your engine hook layout cleanly
  const { drawAllVectorsToCanvas, currentDraftShapeRef } = useDrawingEngine();

  // Safely calculate array length with a fallback to protect against empty arrays
  const totalShapesCount = Array.isArray(shapesHistory) ? shapesHistory.length : 0;

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
        <ToolBar />

        {/* Primary Functional Interface Split Row Layout */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* Main Layout Drawing Sheet Element Layer */}
          <div className="flex-1 w-full">
            <DrawingSheet
              drawAllVectorsToCanvas={drawAllVectorsToCanvas}
              currentDraftShapeRef={currentDraftShapeRef}
            />
          </div>

          {/* Side Structural Metadata Telemetry Panel */}
          <div className="w-full md:w-auto">
            {/* Pass the safe length tracker right into the monitor card block */}
            <Inspector totalShapes={totalShapesCount} />
          </div>

        </div>

      </div>
    </div>
  );
}

// Final wrapper layer joining your components with the global context provider framework
export default function App() {
  return (
    <DrawingProvider>
      <MechanicalDrawingWorkspace />
    </DrawingProvider>
  );
}
