# GigFlow

A full-stack lead management platform built with the MERN stack and TypeScript, featuring role-based access control, lead tracking, advanced filtering, pagination, CSV export, and a responsive dashboard UI.

## Table of Contents
- Live Demo
- Demo Credentials
- Features
- Tech Stack
- Architecture
- Project Structure
- Quick Start
- Environment Variables
- Local Development
- Docker Setup
- API Documentation
- Hiring Workflow
- Author

## Live Demo
- Frontend: https://gig-flow-delta-lake.vercel.app
- Backend API: https://gigflow-23s8.onrender.com
- Loom Demo: 

## Demo Credentials
Admin
- Email: admin@gigflow.com
- Password: admin@123

Sales
- Email: sales@gigflow.com
- Password: sales@123

## Features
- JWT-based authentication
- Role-based access control (Admin and Sales)
- Lead CRUD operations
- Advanced filtering by status and source
- Debounced search by name or email
- Pagination with backend support
- Sorting by latest and oldest
- CSV export functionality
- Protected routes and authorization middleware
- Responsive dashboard UI
- Dockerized development setup

## Tech Stack
Frontend
- React 19
- Vite
- TypeScript
- TailwindCSS
- TanStack Query
- Zustand
- React Hook Form
- Zod

Backend
- Node.js
- Express 5
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication

## Architecture
- Client: React SPA with role-based routing and protected pages
- Server: RESTful Express API with centralized error handling
- Database: MongoDB with Mongoose schemas and query-based filtering
- Authentication: JWT-based auth with middleware authorization
- Deployment: Vercel (Frontend) and Render (Backend)

## Project Structure
```
gigflow/
|
|-- client/          # React frontend
|-- server/          # Express backend
|-- docs/            # API documentation
|-- docker-compose.yml
|-- README.md
```

## Quick Start
Prerequisites
- Node.js 18+
- MongoDB running locally
- Docker Desktop (optional)

## Environment Variables
Client

Copy from [client/.env.example](client/.env.example)

```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Server

Copy from [server/.env.example](server/.env.example)

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/gigflow
JWT_SECRET=replace_with_secure_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

For production builds, update `VITE_API_BASE_URL` and `CLIENT_URL` with deployed frontend and backend URLs.

## Local Development
Start Backend
```
cd server
npm install
npm run dev
```

Start Frontend
```
cd client
npm install
npm run dev
```

Frontend: http://localhost:5173

Backend: http://localhost:5000

## Docker Setup
Run the complete application using Docker Compose:
```
docker compose up --build
```

Services
- Client: 5173
- API: 5000
- MongoDB: 27017

To stop containers and remove volumes:
```
docker compose down -v
```

## API Documentation
API documentation is available in [docs/API.md](docs/API.md).

## Hiring Workflow
Admin
- Create, update, delete, and manage leads
- Access export functionality
- Manage complete lead pipeline

Sales
- View and filter leads
- Track lead progress
- Restricted from administrative actions

## Author
Kunal Pandey

pandeylkunal2084@gmail.com
