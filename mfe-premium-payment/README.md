# MFE: Premium Payment

Micro-frontend for paying the selected policy’s premium. When run **standalone** (port 3002) it uses a web worker to simulate payment processing; when run **inside the container** (port 3000) it uses a timeout-based fallback to avoid cross-origin worker restrictions.

## Prerequisites

- Node 18+ (or 20+ recommended)

## Tech stack

- React, Webpack 5, Module Federation, Sass, Web Worker (standalone only)

## Web worker

- **Standalone (localhost:3002):** Payment processing runs in `paymentWorker.js`; UI stays responsive.
- **In container (localhost:3000):** Worker is not created (cross-origin); a simple timeout simulates processing. Receipt and success flow are the same.

## Receipt

- On success, the receipt is stored in **localStorage** key `"lastReceipt"` (JSON).

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
