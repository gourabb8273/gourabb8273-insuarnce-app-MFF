# MFE: Insurance Details

Micro-frontend that lists policies from localStorage and lets the user select one to share with the container and Premium Payment MFE. Renders policies in a card-style list.

## Prerequisites

- Node 18+ (or 20+ recommended)

## Tech stack

- React, Webpack 5, Module Federation, Sass

## Data

- Policies are read from **localStorage** key `"policies"`.
- The container app seeds this data (e.g. sample policies) if it’s missing when you use the host at port 3000.

## Exposed module

- `./InsuranceDetailsApp` — consumed by the container as `insuranceDetails/InsuranceDetailsApp`.

## How to run

```bash
npm install
npm start
```

Runs at **http://localhost:3001**. Works standalone or when consumed by the container at port 3000.

## Build

```bash
npm run build
```
