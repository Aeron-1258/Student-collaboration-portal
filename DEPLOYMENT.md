# Deployment Guide - Student Collaboration Portal

## 🚀 Quick Deploy to Vercel

### Step 1: Set Up PostgreSQL Database (Neon - Recommended)

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up/Login with GitHub
3. Click **"Create a project"**
4. Choose a project name (e.g., "student-portal")
5. Select a region close to your users
6. Copy the **Connection String** (it looks like: `postgresql://username:password@host/database`)

### Step 2: Deploy to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Migrate to PostgreSQL for deployment"
   git push origin main
   ```

2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your GitHub repository
4. Add Environment Variables:
   - `DATABASE_URL`: Paste your Neon connection string
   - `AUTH_SECRET`: Use the value from your local `.env` file
5. Click **Deploy**

### Step 3: Initialize Database

After deployment, run migrations:
```bash
npx prisma migrate deploy
```

Or use Vercel CLI:
```bash
vercel env pull .env.production
npx prisma migrate deploy
```

## 🔧 Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your local PostgreSQL or Neon connection string
   - Keep the existing `AUTH_SECRET` or generate a new one

3. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 📝 Environment Variables

Required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `AUTH_SECRET`: Secret key for authentication (generate with `openssl rand -base64 32`)

## 🗄️ Database Providers

### Option 1: Neon (Recommended)
- ✅ Free tier: 0.5GB storage
- ✅ Serverless PostgreSQL
- ✅ Auto-scaling
- 🔗 [neon.tech](https://neon.tech)

### Option 2: Supabase
- ✅ Free tier: 500MB storage
- ✅ Includes auth & storage
- 🔗 [supabase.com](https://supabase.com)

### Option 3: Vercel Postgres
- ✅ Free tier: 256MB storage
- ✅ Integrated with Vercel
- 🔗 [vercel.com/storage/postgres](https://vercel.com/storage/postgres)

## 🐛 Troubleshooting

### Build fails on Vercel
- Check that `DATABASE_URL` is set in Vercel environment variables
- Ensure `AUTH_SECRET` is configured
- Check build logs for specific errors

### Database connection errors
- Verify connection string format
- Check database provider dashboard for connection limits
- Ensure IP allowlist includes Vercel (usually 0.0.0.0/0 for serverless)

### Migration errors
- Run `npx prisma generate` locally
- Push schema: `npx prisma db push` (for development)
- For production: `npx prisma migrate deploy`
