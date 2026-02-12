# The Arsenal — Hitman-style Portfolio (Starter)

A minimalist, old-school Hitman-inspired "weapon selection" portfolio:
- Floating 3D items in a horizontal lineup
- Center item highlighted
- Mousewheel / trackpad scroll selects items
- Vertical scroll also controls camera push-in (subtle zoom)
- Bottom-left "stats panel" UI overlay

## Requirements
- Node.js 18+ recommended

## Run in VS Code
1. Open this folder in VS Code
2. In terminal:

```bash
npm install
npm run dev
```

Then open the URL shown (usually http://localhost:5173).

## Customize
Edit:
- `src/data/items.js` (your projects/skills)
- `src/components/HUD.jsx` (panel text / buttons)
- `src/scene/ArsenalScene.jsx` (3D spacing, lights, materials)

## Add real 3D models
Put `.glb` files into `public/models/` and update `ArsenalItem.jsx` to load them using `useGLTF`.
