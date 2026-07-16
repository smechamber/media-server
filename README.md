# SME Media Server

A self-hosted media management service designed to replace Cloudinary.

The server provides secure APIs for uploading, managing, and serving images, videos, and documents across all SME applications.

---

# Features

- Image Upload
- Multiple Image Upload
- Video Upload
- Document Upload
- Automatic Image Compression
- Automatic WebP Conversion
- Delete Single File
- Delete Multiple Files
- Secure Token Authentication
- Docker Support
- Nginx Reverse Proxy
- HTTPS
- SDK Support
- Long-term Static File Caching

---

# Project Architecture

```

Applications

↓

SME Media SDK

↓

SME Media Server API

↓

Uploads Storage

↓

Nginx

↓

HTTPS

↓

Users

```

---

# Folder Structure

```

media-server/

├── src/

│ ├── controllers/

│ ├── middleware/

│ ├── routes/

│ ├── services/

│ ├── utils/

│ ├── types/

│ ├── app.ts

│ └── server.ts

│

├── uploads/

│ ├── images/

│ ├── videos/

│ └── documents/

│

├── Dockerfile

├── docker-compose.yml

├── package.json

├── tsconfig.json

└── README.md

```

---

# Supported File Types

## Images

- JPG
- JPEG
- PNG
- WEBP
- AVIF

Automatically converted to WebP.

---

## Videos

- MP4
- MOV
- AVI
- WEBM

---

## Documents

- PDF
- DOC
- DOCX
- XLS
- XLSX
- PPT
- PPTX

---

# Environment Variables

```

PORT=5000

MEDIA_BASE_URL=https://media.smebusinessforum.com

MEDIA_SERVER_SECRET=YOUR_SECRET_KEY

```

---

# Running Locally

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build

```bash
npm run build
```

Production

```bash
npm start
```

---

# Docker

Start

```bash
docker compose up -d --build
```

Stop

```bash
docker compose down
```

Restart

```bash
docker compose restart
```

---

# Production Deployment

The Media Server should never be exposed directly to the internet.

Docker

```

127.0.0.1:5000:5000

```

Use Nginx as the only public entry point.

```

Internet

↓

Nginx

↓

127.0.0.1:5000

↓

Media Server

```

---

# Nginx

The Media Server is exposed through

```

https://media.smebusinessforum.com

```

Responsibilities

- SSL
- Reverse Proxy
- Static File Cache
- Compression
- Security Headers

---

# Security

Helmet configuration

```ts
helmet({
crossOriginResourcePolicy: {
policy: "cross-origin",
},
});
```

Authentication

```

Authorization: Bearer YOUR_SECRET

```

Every upload and delete endpoint requires authentication.

---

# Storage Structure

```

uploads/

├── images/

├── videos/

└── documents/

```

---

# REST API

## Health

```

GET /api/v1/health

```

Response

```json
{
"success": true
}
```

---

## Upload

```

POST /api/v1/upload

```

Body

```

multipart/form-data

file

```

Response

```json
{
"success": true,
"id": "...",
"resourceType": "image",
"filename": "...",
"url": "...",
"secureUrl": "..."
}
```

---

## Multiple Upload

```

POST /api/v1/upload/multiple

```

Body

```

multipart/form-data

files

```

---

## Delete

```

POST /api/v1/delete

```

```json
{
"url":"..."
}
```

---

## Multiple Delete

```

POST /api/v1/delete/multiple

```

```json
{
"urls":[]
}
```

---

# SDK

Install

```bash
npm install github:smechamber/sme-media-sdk
```

Create Client

```ts
import { MediaClient } from "@sme/media-sdk";

const media = new MediaClient({
baseUrl: process.env.MEDIA_SERVER_URL!,
token: process.env.MEDIA_SERVER_SECRET!,
});
```

---

## Upload

```ts
const result = await media.upload(file);

console.log(result.secureUrl);
```

---

## Upload Multiple

```ts
const result = await media.uploadMultiple(files);

console.log(result.files);
```

---

## Delete

```ts
await media.delete(url);
```

---

## Delete Multiple

```ts
await media.deleteMultiple(urls);
```

---

# Next.js Configuration

```ts
images: {
remotePatterns: [
{
protocol: "https",
hostname: "media.smebusinessforum.com",
},
],
}
```

---

# Database

Always store

```

https://media.smebusinessforum.com/uploads/images/....

```

Never store

```

/uploads/images/...

http://localhost...

C:\...

```

---

# Cloudinary Migration

Remove

- cloudinary
- upload_stream()
- cloudinary.config()
- secure_url
- public_id
- resource_type

Replace with

```ts
media.upload(file);

media.uploadMultiple(files);

media.delete(url);

media.deleteMultiple(urls);
```

---

# Performance

- Automatic Image Compression
- Automatic WebP Conversion
- Long-Term Cache Headers
- Static File Serving
- Reverse Proxy
- HTTPS
- Browser Caching

---

# Production Checklist

- HTTPS Enabled
- Nginx Configured
- Docker Running
- SDK Installed
- Image Upload
- Multiple Upload
- Video Upload
- Document Upload
- Delete API
- Multiple Delete API
- Authentication
- Static File Cache
- Security Headers
- Cross-Origin Support
- Health Endpoint

---

# Future Roadmap

- Signed URLs
- Private Media
- Image Resize API
- Thumbnail Generation
- Metadata API
- File Search API
- Admin Dashboard
- Storage Analytics
- Background Jobs
- Multipart Uploads
- S3 Backend Support
- Object Storage Support
- CDN Integration

---

# License

Private Project

© SME Business Forum

All Rights Reserved.