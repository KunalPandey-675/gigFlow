# GigFlow API

Base URL (local): http://localhost:5000/api/v1

## Auth
Use the `Authorization: Bearer <token>` header for protected routes.

### Register
POST /auth/register

Body:
- name (string, min 2, max 60)
- email (string, valid email)
- password (string, 8-72 chars)
- role ("admin" | "sales", optional)

Response 201:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "admin",
      "createdAt": "2026-05-17T00:00:00.000Z",
      "updatedAt": "2026-05-17T00:00:00.000Z"
    },
    "accessToken": "string"
  }
}
```

### Login
POST /auth/login

Body:
- email (string)
- password (string)

Response 200: same shape as register.

### Current User
GET /auth/me

Response 200:
```json
{
  "success": true,
  "message": "Current user fetched successfully",
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "sales",
      "createdAt": "2026-05-17T00:00:00.000Z",
      "updatedAt": "2026-05-17T00:00:00.000Z"
    }
  }
}
```

### Admin Only
GET /auth/admin-only

Response 200:
```json
{
  "success": true,
  "message": "Admin access granted",
  "data": { "scope": "admin" }
}
```

## Leads
Lead status: new | contacted | qualified | lost
Lead source: website | instagram | referral

### Create Lead (admin)
POST /leads

Body:
- name (string, min 2, max 100)
- email (string, valid email)
- status (optional)
- source (required)

Response 201:
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "lead": {
      "_id": "string",
      "name": "string",
      "email": "string",
      "status": "new",
      "source": "website",
      "createdAt": "2026-05-17T00:00:00.000Z",
      "updatedAt": "2026-05-17T00:00:00.000Z"
    }
  }
}
```

### List Leads
GET /leads

Query params:
- status (optional)
- source (optional)
- search (optional, text search over name/email)
- page (optional, default 1)
- limit (optional, default 10, max 100)
- sort (optional: latest | oldest)

Response 200:
```json
{
  "success": true,
  "message": "Leads fetched successfully",
  "data": {
    "leads": [
      {
        "_id": "string",
        "name": "string",
        "email": "string",
        "status": "new",
        "source": "website",
        "createdAt": "2026-05-17T00:00:00.000Z",
        "updatedAt": "2026-05-17T00:00:00.000Z"
      }
    ]
  },
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

### Get Lead by ID
GET /leads/:id

Response 200:
```json
{
  "success": true,
  "message": "Lead fetched successfully",
  "data": {
    "lead": {
      "_id": "string",
      "name": "string",
      "email": "string",
      "status": "new",
      "source": "website",
      "createdAt": "2026-05-17T00:00:00.000Z",
      "updatedAt": "2026-05-17T00:00:00.000Z"
    }
  }
}
```

### Update Lead (admin)
PATCH /leads/:id

Body (any of): name, email, status, source

Response 200: same shape as get by id.

### Delete Lead (admin)
DELETE /leads/:id

Response 200:
```json
{ "success": true, "message": "Lead deleted successfully" }
```

## Seed (no auth)
### Seed Leads
POST /seed/leads

Response 201:
```json
{ "success": true, "message": "Successfully seeded 20 leads", "data": { "count": 20 } }
```

### Clear Leads
DELETE /seed/leads

Response 200:
```json
{ "success": true, "message": "Cleared 20 leads", "data": { "count": 20 } }
```

## Health
GET /health

Response 200:
```json
{
  "success": true,
  "message": "GigFlow API is healthy",
  "data": { "uptime": 123.45, "timestamp": "2026-05-17T00:00:00.000Z" }
}
```

## Error Format
Validation errors (400):
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "path": "email", "message": "Invalid email format" }
  ]
}
```

Generic error:
```json
{ "success": false, "message": "Internal server error" }
```
