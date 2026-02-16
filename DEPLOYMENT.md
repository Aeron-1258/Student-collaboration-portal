# Deployment Guide - Student Collaboration Portal (MongoDB)

## 🚀 Quick Deploy to Vercel

### Step 1: Set Up MongoDB Database (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Create a **Free Shared Cluster**
4. Create a Database User (username/password)
5. Whitelist IP Address (Allow Access from Anywhere / `0.0.0.0/0` for Vercel)
6. Get **Connection String** (Driver: Node.js)

### Step 2: Deploy to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Migrate to MongoDB"
   git push origin main
   ```

2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your GitHub repository
4. Add Environment Variables:
   - `DATABASE_URL`: Your MongoDB Atlas connection string
   - `AUTH_SECRET`: Use the value from your local `.env` file
5. Click **Deploy**

## 🔧 Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Update `.env` with `DATABASE_URL="mongodb://localhost:27017/student-portal"` for local Compass usage.

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
