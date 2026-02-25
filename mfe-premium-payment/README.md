# MFE: Premium Payment

Micro-frontend for paying the selected policy’s premium. Uses a web worker when run standalone (port 3002) to simulate payment processing; in the container it falls back to a timeout-based flow to avoid cross-origin worker issues.

## How to run

```bash
npm install
npm start
```

Runs at **http://localhost:3002**. Select a policy in the Insurance Details MFE (standalone or in the container) to see payment options.

## Build

```bash
npm run build
```
