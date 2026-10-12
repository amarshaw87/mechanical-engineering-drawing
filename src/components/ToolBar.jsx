import React from 'react';
import { useDrawing } from '../context/DrawingContext';

export default function ToolBar() {
  // Pull shapesHistory along with your active tool modes from context
  const { activeMode, setActiveMode, clearGlobalWorkspace, shapesHistory } = useDrawing();

  const tools = [
    { id: 'LINE', label: 'Draw Line', icon: '✏️' },
    { id: 'CIRCLE', label: 'Draw Circle', icon: '⭕' },
    { id: 'RECTANGLE', label: 'Draw Rectangle', icon: '📊' },
  ];

  // 💾 EXPORTER ALGORITHM: Converts vector coordinate objects into a raw downloadable SVG file
  const handleExportSVG = () => {
    if (!shapesHistory || shapesHistory.length === 0) {
      alert("Please draw an engineering shape on the workspace before exporting!");
      return;
    }

    // Initialize SVG wrapper shell matching your exact 800x450 dark AutoCAD dimensions
    let svgString = `<svg xmlns="http://w3.org" viewBox="0 0 800 450" width="800" height="450" style="background:#1e232d;">`;

    // Loop through your database records and convert them into raw XML tags
    shapesHistory.forEach((shape) => {
      if (shape.type === 'LINE') {
        svgString += `\n  <line x1="${shape.startX}" y1="${shape.startY}" x2="${shape.endX}" y2="${shape.endY}" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>`;
      } 
      else if (shape.type === 'CIRCLE') {
        const radius = Math.sqrt(
          Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2)
        );
        svgString += `\n  <circle cx="${shape.startX}" cy="${shape.startY}" r="${radius}" stroke="#ffffff" stroke-width="2" fill="none"/>`;
      } 
      else if (shape.type === 'RECTANGLE') {
        const x = Math.min(shape.startX, shape.endX);
        const y = Math.min(shape.startY, shape.endY);
        const width = Math.abs(shape.endX - shape.startX);
        const height = Math.abs(shape.endY - shape.startY);
        svgString += `\n  <rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="#ffffff" stroke-width="2" fill="none"/>`;
      }
    });

    svgString += `\n</svg>`;

    // Generate a secure local browser memory blob stream to execute the file download download
    const fileBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const downloadBlobUrl = URL.createObjectURL(fileBlob);
    
    const operationalLink = document.createElement('a');
    operationalLink.href = downloadBlobUrl;
    operationalLink.download = 'cad-blueprint-export.svg';
    
    document.body.appendChild(operationalLink);
    operationalLink.click();
    
    // Cleanup temporary browser memory pointers
    document.body.removeChild(operationalLink);
    URL.revokeObjectURL(downloadBlobUrl);
  };

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

      {/* Action Utility Buttons Tray */}
      <div className="flex items-center gap-2">
        {/* New 💾 Export SVG Trigger Button */}
        <button
          onClick={handleExportSVG}
          className="px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
        >
          💾 Export SVG Blueprint
        </button>

        <button
          onClick={clearGlobalWorkspace}
          className="px-4 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5"
        >
          🗑️ Clear Blueprint
        </button>
      </div>
    </div>
  );
}
