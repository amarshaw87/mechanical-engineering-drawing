import React from 'react';
import { useDrawing } from '../context/DrawingContext';

export default function Inspector() {
  const { activeMode, telemetry, shapesHistory } = useDrawing();

  // Safely fallback to 0 if history doesn't exist yet, protecting against length crashes!
  const currentCount = Array.isArray(shapesHistory) ? shapesHistory.length : 0;

  return (
    <div className="w-64 bg-slate-900 text-slate-100 p-4 rounded-lg shadow-md font-mono text-xs border border-slate-800">
      <h3 className="text-sm font-bold border-b border-slate-700 pb-2 mb-3 text-slate-400">
        • CAD TELEMETRY MONITOR
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-500">ACTIVE_MODE:</span>
          <span className="text-blue-400 font-bold bg-blue-950/50 px-1.5 py-0.5 rounded border border-blue-900/50">
            {activeMode}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">POINTER_X:</span>
          <span className="text-green-400">{Math.round(telemetry.x)} px</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">POINTER_Y:</span>
          <span className="text-green-400">{Math.round(telemetry.y)} px</span>
        </div>
        <div className="flex justify-between border-t border-slate-800 pt-2 mt-2">
          <span className="text-slate-500">VECTOR_COUNT:</span>
          <span className="text-orange-400 font-bold">{currentCount} Objects</span>
        </div>
      </div>
    </div>
  );
}
