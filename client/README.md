# GigFlow Client

React SPA for the GigFlow lead management platform.

## Features
- Role-based UI for admin and sales users
- Lead listing with filters, pagination, and details
- Auth flows (login/register) with protected routes

## Setup
This client is part of the full-stack repo. Follow the root README for end-to-end setup:

- Local dev, environment variables, and Docker workflow live in [README.md](../README.md)

If you want to run the client only:

1. Create `client/.env` using the values documented in the root README.
2. Install and start:

```bash
cd client
npm install
npm run dev
```

Then open http://localhost:5173
