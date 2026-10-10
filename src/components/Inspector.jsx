import React from 'react';
import { useDrawing } from '../context/DrawingContext';

export default function Inspector({ totalShapes }) {
  const { activeTool, pointerCoordinates } = useDrawing();

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-gray-200 shadow-md font-mono text-xxs w-full max-w-xs mx-auto">
      <div className="flex items-center gap-1.5 border-b border-gray-800 pb-2 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
        <h4 className="font-bold text-gray-400 tracking-wider uppercase">CAD Telemetry Monitor</h4>
      </div>

      <div className="space-y-2">
        {/* Active Operational Modality */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">ACTIVE_MODE:</span>
          <span className="text-blue-400 font-bold bg-blue-950/50 px-2 py-0.5 rounded border border-blue-900/50">
            {activeTool}
          </span>
        </div>

        {/* Live Vector Coordinates */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">POINTER_X:</span>
          <span className="text-green-400 font-bold">{pointerCoordinates.x} px</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">POINTER_Y:</span>
          <span className="text-green-400 font-bold">{pointerCoordinates.y} px</span>
        </div>

        {/* Local Memory Entity Count */}
        <div className="flex justify-between items-center border-t border-gray-800 pt-2 mt-2">
          <span className="text-gray-500">VECTOR_COUNT:</span>
          <span className="text-orange-400 font-bold">{totalShapes} Objects</span>
        </div>
      </div>
    </div>
  );
}
