# Container (Host App)

Host application that loads the Insurance Details and Premium Payment micro-frontends via Webpack Module Federation. It shows selected policy state and renders both remotes in card-style sections.

## Prerequisites

- Node 18+ (or 20+ recommended)

## Tech stack

- React, Webpack 5, Module Federation, Sass

## Remotes

| Remote | URL | Port |
|--------|-----|------|
| Insurance Details | `insuranceDetails@http://localhost:3001/remoteEntry.js` | 3001 |
| Premium Payment | `premiumPayment@http://localhost:3002/remoteEntry.js` | 3002 |

## How to run

**Run remotes first**, then the container:

```bash
# Terminal 1: Insurance Details
cd mfe-insurance-details && npm install && npm start

# Terminal 2: Premium Payment
cd mfe-premium-payment && npm install && npm start

# Terminal 3: Container
cd container && npm install && npm start
```

Container runs at **http://localhost:3000**.

## Build

```bash
npm run build
```
