# Insurance MFE

Monorepo with one host (container) and two micro-frontends: **Insurance Details** (policy list) and **Premium Payment**. The container loads both remotes via Webpack Module Federation and shares selected policy state between them.

## Repo layout

| Folder | Role | Port |
|--------|------|------|
| `container/` | Host app | 3000 |
| `mfe-insurance-details/` | Remote: policy list & selection | 3001 |
| `mfe-premium-payment/` | Remote: pay premium for selected policy | 3002 |

## Quick start

1. **Start remotes first** (in separate terminals):

   ```bash
   cd mfe-insurance-details && npm install && npm start
   cd mfe-premium-payment  && npm install && npm start
   ```

2. **Start the container:**

   ```bash
   cd container && npm install && npm start
   ```

3. Open **http://localhost:3000**. Select a policy in Insurance Details, then use Premium Payment to pay.

Each app can also run standalone (see each module’s README).
