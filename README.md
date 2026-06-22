# PipelineIQ - Mini CRM Opportunity Tracker

### 🚀 Live Application
**Live URL:** [Paste your deployed Vercel URL here]

### 🔑 Test Credentials (Evaluator Login)
**Email:** test@example.com
**Password:** password123

---
## Project Overview
PipelineIQ is a secure, full-stack MERN web application designed to act as a shared CRM-style sales opportunity pipeline. It serves as an internal tool for a startup, sales team, or SME to effortlessly track leads, follow-ups, and deal stages. 

The application implements a robust authentication and authorization system. While the entire team can view the shared pipeline to avoid duplicating efforts, strict backend ownership validations ensure that users can only edit or delete the opportunities they personally created. 

## Tech Stack Used
**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Axios (API Client)
- React Router DOM
- Lucide React (Icons)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT) for Authentication
- bcryptjs for Password Hashing
- dotenv for Environment Variables

## Environment Variables Required
To run this project, you will need to create `.env` files in both the frontend and backend directories.

### Backend (`backend/.env`)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:5000/api
```

## Backend Setup Instructions
1. Navigate to the backend directory: `cd backend`
2. Install the dependencies: `npm install`
3. Create a `.env` file and add the required environment variables.
4. Start the development server: `npm run dev`
*(The backend will run on `http://localhost:5000`)*

## Frontend Setup Instructions
1. Navigate to the frontend directory: `cd frontend`
2. Install the dependencies: `npm install`
3. Create a `.env` file and add the `VITE_API_URL`.
4. Start the development server: `npm run dev`
*(The frontend will run on `http://localhost:5173`)*

## API Details
All endpoints are prefixed with `/api`.

### Authentication
- `POST /auth/register` - Register a new user (Name, Email, Password).
- `POST /auth/login` - Authenticate a user and return a JWT token.
- `GET /auth/me` - Get the currently logged-in user profile.

### Opportunities (Protected Routes - Requires Bearer Token)
- `GET /opportunities` - Get all opportunities in the shared pipeline.
- `POST /opportunities` - Create a new opportunity. The owner is securely derived from the JWT.
- `GET /opportunities/:id` - Get details of a specific opportunity.
- `PUT /opportunities/:id` - Update an opportunity (Owner restricted).
- `DELETE /opportunities/:id` - Delete an opportunity (Owner restricted).

## Deployment Steps
### Backend (Render / Railway)
1. Push the repository to GitHub.
2. Create a new Web Service on Render.
3. Connect the GitHub repository and set the Root Directory to `backend`.
4. Set Build Command: `npm install`
5. Set Start Command: `npm start` (or `node src/server.js`).
6. Add the environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`).
7. Deploy and copy the live API URL.

### Frontend (Vercel / Netlify)
1. Create a new project on Vercel and import the GitHub repository.
2. Set the Root Directory to `frontend`.
3. Vercel will automatically detect the Vite framework (`npm run build`).
4. Add the `VITE_API_URL` environment variable using the live URL from the deployed backend.
5. Deploy the application.

## Known Limitations or Pending Improvements
- **Pagination & Infinite Scroll:** While backend limits/skips can be configured, adding infinite scroll to the frontend UI would improve performance for massive datasets.
- **Advanced Filtering:** Adding multi-select filters (e.g., filtering for both "New" and "Contacted" stages simultaneously) could enhance the user experience.
- **Admin Roles:** Implementing a Super Admin role that can override ownership locks and delete any card in the company pipeline for moderation purposes.
- **Email Notifications:** Integrating Nodemailer or SendGrid to automatically notify users when their "Next Follow-Up Date" approaches.
