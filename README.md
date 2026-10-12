# ⚙️ Mechanical Engineering Drawing Workspace

A high-performance, precision 2D CAD Vector Drafting Web Application built with **React**, **HTML5 Canvas**, and **Tailwind CSS**. This software provides engineers and designers with a clean, low-latency browser blueprint interface to draft, track, and analyze geometric primitives down to the individual pixel.

🚀 **Live Production Link:** [mechanical-engineering-drawing.vercel.app](https://vercel.app)

---

## 🎨 Interactive Application Features

* **Precision 2D CAD Engine:** Draft lines, circles, and rectangles smoothly at 60 FPS using an isolated structural rendering pipeline.
* **🧲 Smart Snap-to-Grid Array:** Mouse movements and click vectors automatically snap to the nearest `20px` layout intersection for flawless vertical, horizontal, and parallel alignments.
* **🖥️ Real-Time Telemetry Monitor:** A dark-themed diagnostic panel streams live cursor crosshair coordinate metrics (`POINTER_X`, `POINTER_Y`) and tracks the total active `VECTOR_COUNT`.
* **Asynchronous Buffer Protection:** Shallow structural memory snapshot cloning isolates draft preview paths from permanent historical databases, preventing vanished layers or data leakage.
* **Zero-Lag Architecture:** Uses React memoized callbacks (`useCallback`) and system memory refs (`useRef`) to bypass traditional rendering updates and prevent UI browser lag during drafting.

---

## 🏗️ Core Architecture & File Mapping

```text
├── public/
│   └── index.html      # Main viewport DOM mounting node & Tailwind engine injector
├── src/
│   ├── components/
│   │   ├── DrawingSheet.js  # Calibrated canvas sheet layer with grid-snap calculations
│   │   ├── ToolBar.js       # Functional tool selectors & blueprint flushing commands
│   │   └── Inspector.js     # Dark-themed mono-spaced telemetry monitoring dashboard
│   ├── context/
│   │   └── DrawingContext.js # Global context highway providing synchronized data states
│   ├── hooks/
│   │   └── useDrawingEngine.js # Mathematical core executing Euclidean geometry math
│   ├── App.js           # Core layout orchestrator and provider root wrapper
│   └── index.js         # React runtime bootstrap entry gate
├── package.json         # Automation compilation dependencies and script bindings
└── .gitignore           # Excludes development modules from version tracking
```

---

## 💻 Tech Stack & Geometry Math

* **Frontend Library:** React (Functional Architecture & Hooks)
* **Graphics Rendering:** HTML5 Canvas API (2D Context Context Rendering)
* **Styling Framework:** Tailwind CSS (Utility Layout Configuration)
* **Automation Hosting Platform:** Vercel (Continuous Deployment CI/CD Pipeline)
* **Radius Calculation Theorem:** Implicit Euclidean Distance Formula:
  $$\text{Radius} = \sqrt{(X_{\text{end}} - X_{\text{start}})^2 + (Y_{\text{end}} - Y_{\text{start}})^2}$$

---

## 🔧 Local Development Installation Guide

Follow these simple steps to run this drawing desk locally on your computer:

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd mechanical-engineering-drawing
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Launch the development server:**
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your web browser to view your local engine workspace.

---

## 🚧 Project Status & Future Engineering Research

⚠️ **Notice:** This application is **currently under active development**. Core vector drawing, layout synchronization, and grid-snapping are fully operational, but further research is ongoing to introduce deeper industrial CAD functionalities.

### 📐 Active Research & Upcoming Pipeline Upgrades:
1. **Live Dimensional Labeling:** Integrating dynamic trigonometry text overlays to display active lengths, widths, and arc angles in metric/imperial values during click-drags.
2. **CAD Blueprint Export Controls:** Researching data parsing structures to translate internal JSON shape configurations into exportable **Vector SVG** elements and raw manufacturing **DXF/DWG file strings** readable by AutoCAD and SolidWorks.
3. **Layer Control Dashboard:** Engineering an object tree timeline to let creators name, color-code, show, hide, or selectively delete individual shape indices from the master matrix array.

---
*Designed & Engineered with 💡 by [Amar Shaw](https://github.com) | Mechanical Engineering Student, Batch 2015 - 2018, VMIT Ranchi.*

