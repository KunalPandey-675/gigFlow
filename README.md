# GigFlow

Full-stack lead management app with role-based access, lead tracking, and a React dashboard.

## Stack
- Client: React 19, Vite, TypeScript, Tailwind
- Server: Node.js, Express 5, TypeScript, MongoDB
- State/data: TanStack Query, Zustand

## Features
- Role-based access for admin and sales users
- Lead CRUD with status/source, search, and pagination
- Auth flows with protected routes
- Admin-only seed endpoints for demo data

## Project Structure
- client/ - React SPA
- server/ - Express API
- docs/ - API documentation

## Environment Variables
Client env (copy from [client/.env.example](client/.env.example)):
- VITE_API_BASE_URL=http://localhost:5000/api/v1

Server env (copy from [server/.env.example](server/.env.example)). `CLIENT_URL` supports multiple origins as a comma-separated list:
- NODE_ENV=development
- PORT=5000
- MONGODB_URI=mongodb://127.0.0.1:27017/gigflow
- JWT_SECRET=replace_with_secure_secret
- JWT_EXPIRES_IN=1d
- CLIENT_URL=http://localhost:5173,https://gig-flow-delta-lake.vercel.app

## Local Setup
Prereqs: Node.js 18+ and MongoDB running locally.

For local dev, use [client/.env](client/.env) with the localhost API and set `CLIENT_URL=http://localhost:5173` in your server env.

For hosted builds, use [client/.env.production](client/.env.production) with the hosted API URL.

Server:
1. cd server
2. npm install
3. npm run dev

Client:
1. cd client
2. npm install
3. npm run dev

Open http://localhost:5173

## API Documentation
See [docs/API.md](docs/API.md).

## Docker Setup (Dev)
Uses Docker Compose to run MongoDB, the API, and the client dev server.

1. docker compose up --build
2. Open http://localhost:5173

Ports:
- Client: 5173
- API: 5000
- MongoDB: 27017

To stop and clean volumes:
- docker compose down -v
