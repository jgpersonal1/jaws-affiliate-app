# JAWS Affiliate App (scaffold)

This repository contains a scaffold for a single-page React + TypeScript app that lists JAWS-related items from Amazon and eBay, builds affiliate links, and is backed by Azure Functions + Cosmos DB with a daily Refresh Timer.

## Structure
- backend/ : Azure Functions (TypeScript)
- frontend/: React app (TypeScript)
- azure-deploy/: sample deploy scripts

## Next steps
1. Fill in real credentials in `backend/local.settings.json` (or in Azure Function App settings).
2. Install dependencies:
   - `cd backend && npm install`
   - `cd frontend && npm install`
3. Run locally:
   - `func start` in backend
   - `npm start` in frontend (add proxy to package.json for local API)
4. Deploy to Azure (see `azure-deploy/deploy.sh` or use GitHub Actions)

Important: Do NOT commit secrets into git.
