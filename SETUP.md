# 🚀 Quick Setup Guide (MongoDB Edition)

## 1. Install & Run MongoDB

You need MongoDB running locally.

1. **Download & Install MongoDB Compass/Server** if you haven't already.
2. Open **MongoDB Compass**.
3. Connect to: `mongodb://localhost:27017`
4. That's it! (The database `student-portal` will be created automatically when you run the app).

## 2. Initialize the App

Running this command updates the database client:

```bash
npx prisma generate
```

## 3. Run the App

```bash
npm run dev
```

Visit http://localhost:3000

## 4. Deploying to Vercel (Production)

For the live website, you cannot use "localhost". You need a cloud MongoDB.

1. Create a free account on **MongoDB Atlas**.
2. Create a Cluster (Free Tier).
3. Get the connection string (it looks like `mongodb+srv://user:pass@cluster0...`).
4. In Vercel Environment Variables, set `DATABASE_URL` to this Atlas connection string.
