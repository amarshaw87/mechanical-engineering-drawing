import React from 'react';
import { useDrawing } from '../context/DrawingContext';

export default function ToolBar({ onClearCanvas }) {
  const { activeTool, setActiveTool } = useDrawing();

  // List of primitive drawing shapes matching our database context
  const primitiveTools = [
    { id: 'LINE', label: '✏️ Draw Line' },
    { id: 'CIRCLE', label: '⭕ Draw Circle' },
    { id: 'RECTANGLE', label: '⬜ Draw Rectangle' }
  ];

  return (
    <div className="flex flex-wrap items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm max-w-4xl mx-auto gap-3 text-xs">
      {/* Primitive Geometric Selector Suite */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-500 uppercase text-xxs tracking-wider mr-2">Geometric Tools:</span>
        {primitiveTools.map((tool) => {
          const isSelected = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`py-1.5 px-3 rounded font-bold transition uppercase tracking-wide text-xxs border
                ${isSelected 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                  : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                }
              `}
            >
              {tool.label}
            </button>
          );
        })}
      </div>

      {/* Global Canvas Utility Override Commands */}
      <div className="flex items-center border-l border-gray-200 pl-3">
        <button
          onClick={onClearCanvas}
          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold py-1.5 px-3 rounded text-xxs uppercase tracking-wide transition"
        >
          🗑️ Clear Blueprint
        </button>
      </div>
    </div>
  );
}
