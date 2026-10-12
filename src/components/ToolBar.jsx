import React from 'react';
import { useDrawing } from '../context/DrawingContext';

export default function ToolBar() {
  const { activeMode, setActiveMode, clearGlobalWorkspace } = useDrawing();

  const tools = [
    { id: 'LINE', label: 'Draw Line', icon: '✏️' },
    { id: 'CIRCLE', label: 'Draw Circle', icon: '⭕' },
    { id: 'RECTANGLE', label: 'Draw Rectangle', icon: '📊' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200 max-w-4xl mx-auto my-4 gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-400 tracking-wider uppercase mr-2">
          Geometric Tools:
        </span>
        <div className="flex bg-slate-100 p-1 rounded-lg gap-1">
          {tools.map((tool) => {
            const isActive = activeMode === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveMode(tool.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm scale-105'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{tool.icon}</span>
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={clearGlobalWorkspace}
        className="px-4 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5"
      >
        🗑️ Clear Blueprint
      </button>
    </div>
  );
}
