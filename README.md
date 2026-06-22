# PipelineIQ — Mini CRM

PipelineIQ is a premium, production-ready full-stack MERN application designed for tracking CRM opportunities. It provides a beautiful interface with Kanban and List views, robust filtering, and strict ownership validation on the backend.

## Live Demo
*Link to live demo will be added here after deployment*

## Features
- **Premium UI/UX:** Built with Tailwind CSS, featuring micro-animations, glassmorphism elements, and a responsive design.
- **Authentication:** JWT-based authentication with auto-logout on expiration.
- **Kanban Board & List View:** Manage opportunities via a drag-and-drop Kanban board or a detailed list view.
- **Strict Security:** Backend ownership validation ensures users can only edit or delete their own opportunities. Never accepts `user_id` from the frontend body.
- **Filtering & Searching:** Instantly filter opportunities by stage, priority, and search by company name.
- **Dashboard Summaries:** Quick metrics showing total pipeline value, won deals, and follow-ups.

## Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, Axios, react-router-dom, react-hot-toast, lucide-react, date-fns.
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, express-validator.
- **Database:** MongoDB Atlas.

## Architecture Overview
The application follows a standard client-server architecture:
- **Client (Frontend):** A Single Page Application (SPA) built with React. Uses Context API for state management (Auth) and Axios for API communication. Implements request interceptors for JWT injection and response interceptors for global 401 handling.
- **Server (Backend):** A RESTful API built with Express.js. Implements robust middleware for authentication, request validation, and central error handling. MongoDB is used for persistent storage.

## Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PipelineIQ
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Add your MongoDB URI to the .env file
   node src/seed.js # Optional: Seed database with test users and data
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```

## Test Credentials
- User 1: `test@pipelineiq.com` / `test123`
- User 2: `demo@pipelineiq.com` / `demo123`

## API Documentation

### Auth Routes
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate user & get token
- `GET /api/auth/me`: Get current user profile (Protected)

### Opportunity Routes (All Protected)
- `GET /api/opportunities`: Get all opportunities (supports query params: `stage`, `priority`, `search`, `sortBy`, `order`)
- `POST /api/opportunities`: Create a new opportunity (owner implicitly set from JWT)
- `GET /api/opportunities/:id`: Get a specific opportunity by ID
- `PUT /api/opportunities/:id`: Update an opportunity (ownership validated)
- `DELETE /api/opportunities/:id`: Delete an opportunity (ownership validated)

## Security Implementation
- **JWT:** Extracted strictly from the `Authorization: Bearer <token>` header.
- **Passwords:** Hashed using `bcrypt` before storing in MongoDB.
- **Ownership Validation:** The backend explicitly checks `if (opportunity.owner.toString() !== req.user._id.toString())` before allowing updates or deletes.
- **Input Sanitization:** Uses `express-validator` to ensure required fields are present and correctly formatted. The backend strips `owner` or `user_id` fields from request bodies to prevent manipulation.
- **Secrets:** Environment variables used for all sensitive configuration.

## Known Limitations
- Pagination is implemented in the backend API but the frontend currently fetches all opportunities for seamless Kanban board operation. In a massive scale application, the Kanban board would need virtualization or lazy loading per column.
- Real-time updates (WebSockets) are not currently implemented.

## Deployment Guide

### Database (MongoDB Atlas)
1. Create a free M0 cluster on MongoDB Atlas.
2. Obtain the connection string and replace `<username>` and `<password>`.

### Backend (Render)
1. Connect your GitHub repository to Render.
2. Select the `backend` folder as the Root Directory.
3. Use `npm install` as the Build Command and `node server.js` as the Start Command.
4. Add Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN=2h`
   - `NODE_ENV=production`

### Frontend (Vercel)
1. Import your GitHub repository to Vercel.
2. Select the `frontend` folder as the Root Directory.
3. Vercel will automatically detect Vite and configure the build settings.
4. Add Environment Variables:
   - `VITE_API_URL=https://your-render-url.onrender.com/api` (Replace with actual backend URL)
